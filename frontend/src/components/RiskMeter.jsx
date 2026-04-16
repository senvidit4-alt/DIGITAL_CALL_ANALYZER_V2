import { useEffect, useRef } from 'react';

const RISK_CONFIG = {
  danger: { color: '#fb7185', track: '#be123c20', label: 'CRITICAL THREAT' },
  warn:   { color: '#fca5a5', track: '#991b1b20', label: 'MODERATE RISK'  }, // User requested red-spectrum for warning
  safe:   { color: '#34d399', track: '#064e3b20', label: 'VERIFIED SAFE'  },
  idle:   { color: '#475569', track: '#1e293b50', label: 'SYSTEM READY'   },
};

// SVG arc helper
function describeArc(cx, cy, r, startDeg, endDeg) {
  const toRad = (d) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

const START_DEG = 150;
const END_DEG   = 390; // Balanced 240° arc

export default function RiskMeter({ score = 0, risk = 'idle', loading = false }) {
  const arcRef   = useRef(null);
  const scoreRef = useRef(null);

  const cfg = RISK_CONFIG[risk] || RISK_CONFIG.idle;
  const cx = 80, cy = 80, r = 62;
  const totalArc = END_DEG - START_DEG; 
  const filled = (score / 100) * totalArc;

  useEffect(() => {
    const el = arcRef.current;
    if (!el) return;
    const totalLength = (2 * Math.PI * r * totalArc) / 360;
    el.style.strokeDasharray = `${totalLength}`;
    const target = loading ? 0 : (score / 100) * totalLength;
    el.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.strokeDashoffset = `${totalLength - target}`;
    el.style.stroke = cfg.color;
  }, [score, risk, loading]);

  const prevScore = useRef(0);
  useEffect(() => {
    const el = scoreRef.current;
    if (!el) return;
    const target = score;
    const start  = prevScore.current;
    const steps  = 60;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      const val = Math.round(start + ((target - start) * i) / steps);
      el.textContent = val;
      if (i >= steps) { el.textContent = target; prevScore.current = target; clearInterval(timer); }
    }, 1000 / steps);
    return () => clearInterval(timer);
  }, [score]);

  const arcPath   = describeArc(cx, cy, r, START_DEG, END_DEG);
  const totalLen  = (2 * Math.PI * r * totalArc) / 360;

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="relative group" style={{ width: 160, height: 160 }}>
        {/* Background glow for gauge */}
        <div 
           className="absolute inset-4 rounded-full blur-3xl transition-colors duration-1000"
           style={{ backgroundColor: `${cfg.color}10` }}
        />
        
        <svg width="160" height="160" viewBox="0 0 160 160" className="relative z-10">
          {/* Base track */}
          <path
            d={arcPath}
            fill="none"
            stroke={cfg.track}
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Diagnostic Arc */}
          <path
            ref={arcRef}
            d={arcPath}
            fill="none"
            stroke={cfg.color}
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              strokeDasharray: totalLen,
              strokeDashoffset: totalLen,
            }}
          />
        </svg>

        {/* Diagnostic Core */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center">
               <div className="w-8 h-8 rounded-full border-2 border-white/5 border-t-blue-500 animate-spin" />
               <span className="pro-label !text-[8px] mt-2 animate-pulse">Computing</span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline">
                <span
                  ref={scoreRef}
                  className="font-outfit font-extrabold leading-none tracking-tighter"
                  style={{ fontSize: 44, color: '#ffffff' }}
                >
                  {score}
                </span>
              </div>
              <span className="pro-label !text-[10px] opacity-40 -mt-1">P-Index</span>
            </>
          )}
        </div>
      </div>

      {/* Forensic Verdict Badge */}
      <div
        className="px-6 py-2 rounded-xl border font-outfit font-extrabold text-[12px] tracking-[0.1em] uppercase transition-all duration-700 shadow-xl"
        style={{
          color: cfg.color,
          borderColor: `${cfg.color}30`,
          backgroundColor: `${cfg.color}10`,
        }}
      >
        {loading ? 'Processing Pattern...' : cfg.label}
      </div>
    </div>
  );
}
