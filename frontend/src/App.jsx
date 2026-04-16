import { useEffect, useState, useCallback } from 'react';
import StatsBar from './components/StatsBar';
import InputPanel from './components/InputPanel';
import AnalysisPanel from './components/AnalysisPanel';
import DividerGlow from './components/DividerGlow';
import { analyzeText, getStats } from './services/mockApi';

// Stage IDs: 0=Input, 1=Parsing, 2=Scanning, 3=Scoring, 4=Report
const STAGE_TIMINGS = [0, 300, 700, 1100]; // ms into the request each stage activates

export default function App() {
  const [stats,   setStats]   = useState(null);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [stage,   setStage]   = useState(0);
  const [error,   setError]   = useState(null);

  // Fetch global stats on mount
  useEffect(() => {
    getStats().then(setStats).catch(console.error);
  }, []);

  const handleAnalyze = useCallback(async (text) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setStage(1);

    // Advance stages on a timer to simulate pipeline
    const timers = STAGE_TIMINGS.slice(1).map((delay, i) =>
      setTimeout(() => setStage(i + 2), delay)
    );

    try {
      const data = await analyzeText(text);
      setResult(data);
      setStage(4); // Report

      // Update live stats
      setStats((prev) =>
        prev
          ? {
              ...prev,
              totalScanned:  prev.totalScanned + 1,
              scamsDetected: data.verdict.risk === 'danger' ? prev.scamsDetected + 1 : prev.scamsDetected,
              safeMessages:  data.verdict.risk === 'safe'   ? prev.safeMessages  + 1 : prev.safeMessages,
            }
          : prev
      );
    } catch (err) {
      setError('Analysis failed. Please try again.');
      setStage(0);
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
    }
  }, []);

  const risk = result?.verdict?.risk || 'idle';

  return (
    <div className="flex flex-col h-screen bg-[#060b14] overflow-hidden font-inter selection:bg-blue-500/30">
      {/* Top Professional Header */}
      <StatsBar stats={stats} />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden px-8 py-6 gap-6 max-w-[1600px] mx-auto w-full">

        {/* ── LEFT ANALYTICS INPUT (35%) ── */}
        <div
          className="flex-shrink-0 flex flex-col overflow-hidden"
          style={{ width: '35%', minWidth: 380 }}
        >
          <div className="flex-1 overflow-y-auto pr-2 custom-scroll">
            <InputPanel
              onAnalyze={handleAnalyze}
              loading={loading}
              stage={stage}
            />
          </div>
        </div>

        {/* ── RIGHT INVESTIGATIVE REPORT (fluid) ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          <div className="gov-card flex-1 flex flex-col overflow-hidden relative glow-border">
            {/* Report Header Overlay */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
              <div>
                <h2 className="font-outfit text-sm font-bold text-white tracking-tight uppercase">
                  Digital Fraud Analysis Report
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-slate-600">I4C/CFIP</span>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <p className="text-[9px] text-slate-600 font-mono">
                    {result
                      ? `Case Ref: CFIP-${new Date(result.analyzedAt).toISOString().slice(0,10).replace(/-/g,'')}-${String(Math.abs(result.score * 97 % 9999)).padStart(4,'0')}`
                      : 'Awaiting Submission — No Active Case'}
                  </p>
                </div>
              </div>

              {/* High-End Risk Indicator */}
              {(result || loading) && (
                <div
                  className="px-4 py-2 rounded-lg border text-[10px] font-outfit font-bold tracking-widest uppercase transition-all duration-700 shadow-xl"
                  style={{
                    color: risk === 'danger' || risk === 'warn' ? '#fb7185' : risk === 'safe' ? '#34d399' : '#94a3b8',
                    borderColor: risk === 'danger' || risk === 'warn' ? '#be123c50' : risk === 'safe' ? '#065f4650' : '#1e293b',
                    background: risk === 'danger' || risk === 'warn' ? 'rgba(159,18,57,0.1)' : risk === 'safe' ? 'rgba(6,95,70,0.1)' : 'rgba(30,41,59,0.2)',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                       Parallel Scanning...
                    </span>
                  ) : (
                    result?.verdict?.label
                  )}
                </div>
              )}
            </div>

            {/* Scrollable Report Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scroll">
              <AnalysisPanel result={result} loading={loading} />
            </div>
          </div>
        </div>
      </div>

      {/* GOI Portal Footer */}
      <div className="flex-shrink-0 border-t border-[#ffffff06] bg-[#0a0f1e] px-8 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="text-[9px] text-slate-600 font-mono">
              © 2024 &nbsp;<span className="text-slate-500">Ministry of Home Affairs, Government of India</span>
            </span>
            <div className="h-3 w-px bg-white/5" />
            <span className="text-[9px] text-slate-600 font-mono">
              Indian Cyber Crime Coordination Centre (I4C)
            </span>
            <div className="h-3 w-px bg-white/5" />
            <span className="text-[9px] text-slate-700 font-mono">
              Designed &amp; Developed by NIC
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${loading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-[9px] font-mono text-slate-600">
                {loading ? 'Analysing...' : 'Portal Active'}
              </span>
            </div>
            <div className="h-3 w-px bg-white/5" />
            <span className="text-[9px] font-bold text-amber-500/80 font-mono tracking-wide">
              Cyber Helpline: 1930
            </span>
            <div className="h-3 w-px bg-white/5" />
            <span className="text-[9px] text-slate-700 font-mono">CFIP v2.1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
