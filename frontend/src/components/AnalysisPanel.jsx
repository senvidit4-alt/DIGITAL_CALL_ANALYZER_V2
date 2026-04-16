import RiskMeter from './RiskMeter';
import TerminalText from './TerminalText';
import SignalList from './SignalList';

const META_EMPTY = [
  { label: 'Word Count',   value: '—' },
  { label: 'Byte Depth',   value: '—' },
  { label: 'Lead Signals', value: '—' },
  { label: 'Time Sig',     value: '—' },
];

function formatTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function AnalysisPanel({ result, loading }) {
  const risk      = result?.verdict?.risk || 'idle';
  const score     = result?.score         || 0;
  const segments  = result?.segments      || [];
  const signals   = result?.signals       || [];

  const meta = result
    ? [
        { label: 'Word Count',   value: result.wordCount },
        { label: 'Byte Depth',   value: `${result.charCount} B` },
        { label: 'Lead Signals', value: result.flaggedScam.length + result.flaggedSuspicious.length },
        { label: 'Time Sig',     value: formatTime(result.analyzedAt) },
      ]
    : META_EMPTY;

  return (
    <div className="flex flex-col gap-8">

      {/* Primary Diagnostic Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-reveal">
        
        {/* Risk Metrics Card */}
        <div className="gov-card p-10 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <RiskMeter score={score} risk={risk} loading={loading} />
        </div>

        {/* Intelligence Meta Card */}
        <div className="gov-card p-10 flex flex-col">
          <p className="pro-label mb-8 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
             Core Intelligence Metadata
          </p>
          <div className="grid grid-cols-2 gap-y-10 gap-x-14 flex-1">
            {meta.map((m) => (
              <div key={m.label} className="group">
                <p className="pro-label !text-[9px] opacity-40 group-hover:opacity-100 transition-opacity">{m.label}</p>
                <p className="font-outfit text-2xl font-bold text-white mt-1 tracking-tight">
                  {loading ? (
                    <span className="text-slate-800 animate-pulse">•••</span>
                  ) : (
                    m.value
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Forensic Verdict Text */}
          {result && !loading && (
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                 <p className="pro-label !text-[9px]">Final Forensic Verdict</p>
                 <span className="text-[9px] text-slate-700 font-mono tracking-tighter">CERT-CERTIFIED ANALYSIS</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className={`w-2.5 h-2.5 rounded-full animate-pulse`} style={{ backgroundColor: result.verdict.color, boxShadow: `0 0 10px ${result.verdict.color}40` }} />
                 <p className="font-outfit text-base font-extrabold uppercase tracking-[0.2em]" style={{ color: result.verdict.color }}>
                    {result.verdict.label}
                 </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Signal Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-reveal [animation-delay:150ms]">
        
        {/* Source Text Highlighting (2/3 width) */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="pro-label flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
               Source Text Forensics
            </p>
            {result && (
              <div className="flex items-center gap-3">
                 <span className="pro-label text-rose-400 !text-[10px]">
                   {result.flaggedScam.length + result.flaggedSuspicious.length} Indicators Detected
                 </span>
              </div>
            )}
          </div>
          <div className="flex-1">
             <TerminalText segments={segments} loading={loading} />
          </div>
        </div>

        {/* Intelligence Signal List (1/3 width) */}
        <div className="flex flex-col gap-4">
          <p className="pro-label px-1">Risk Signal Profile</p>
          <div className="gov-card p-8 flex-1 overflow-y-auto custom-scroll min-h-[300px]">
            <SignalList signals={signals} loading={loading} />
          </div>
        </div>
      </div>

      {/* Logic Breakdown Section */}
      {result && !loading && (
        <div className="gov-card p-10 animate-reveal [animation-delay:300ms] shadow-inner bg-gradient-to-br from-[#0c1424] to-[#040810]">
          <div className="flex items-center justify-between mb-8">
             <p className="pro-label">Indicator Frequency Breakdown</p>
             <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-slate-400 font-mono">CODE: SCAN_RES_0x3F</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Confirmed High Risk */}
            <div>
              <p className="pro-label !text-[10px] text-rose-500 mb-5 flex items-center gap-2">
                 <span className="w-4 h-px bg-rose-500/30" />
                 Confirmed High-Risk Patterns
              </p>
              <div className="flex flex-wrap gap-2.5">
                {result.flaggedScam.length > 0 ? (
                  result.flaggedScam.map((kw) => (
                    <span
                      key={kw}
                      className="px-4 py-2 rounded-lg text-[10px] font-outfit font-bold tracking-wider uppercase border border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-[0_4px_12px_rgba(244,63,94,0.1)] hover:border-rose-500/50 transition-colors"
                    >
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-600 italic">No high-risk literal patterns detected</span>
                )}
              </div>
            </div>

            {/* Probable Indicators */}
            <div>
              <p className="pro-label !text-[10px] text-rose-400/80 mb-5 flex items-center gap-2">
                 <span className="w-4 h-px bg-rose-400/30" />
                 Probable Suspicious Markers
              </p>
              <div className="flex flex-wrap gap-2.5">
                {result.flaggedSuspicious.length > 0 ? (
                  result.flaggedSuspicious.map((kw) => (
                    <span
                      key={kw}
                      className="px-4 py-2 rounded-lg text-[10px] font-outfit font-bold tracking-wider uppercase border border-rose-400/20 bg-rose-400/5 text-rose-300 hover:border-rose-400/40 transition-colors"
                    >
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-600 italic">No medium-risk markers detected</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clean Idle / Waiting State */}
      {!result && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-16 opacity-30 select-none">
          <div className="w-16 h-16 rounded-3xl border border-white/10 flex items-center justify-center bg-white/[0.02] rotate-12">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944 
                   11.955 11.955 0 01.382 7.984l-.083 1.06A11.978 11.978 0 
                   0012 22c5.963 0 10.92-4.354 11.701-10.017l-.083-1.06z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="pro-label tracking-[0.2em]">Diagnostic Engine Clear</p>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">AWAITING SOURCE DATA INPUT...</p>
          </div>
        </div>
      )}
    </div>
  );
}
