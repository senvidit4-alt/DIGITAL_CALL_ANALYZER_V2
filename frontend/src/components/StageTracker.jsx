const STAGES = [
  { id: 0, label: 'Receipt',   short: '01' },
  { id: 1, label: 'Parsing',   short: '02' },
  { id: 2, label: 'Screening', short: '03' },
  { id: 3, label: 'Grading',   short: '04' },
  { id: 4, label: 'Outcome',   short: '05' },
];

export default function StageTracker({ stage }) {
  return (
    <div className="flex items-center gap-0 w-full select-none" role="progressbar" aria-valuenow={stage} aria-valuemax={4}>
      {STAGES.map((s, idx) => {
        const isActive   = s.id === stage;
        const isComplete = s.id < stage;
        const isFuture   = s.id > stage;

        return (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            {/* Investigative Node */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={[
                  'relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-700 font-outfit text-[11px] font-bold',
                  isComplete ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : '',
                  isActive   ? 'bg-[#060b14] border-white text-white scale-125 z-10' : '',
                  isFuture   ? 'bg-[#0c1424] border-slate-800 text-slate-600' : '',
                ].join(' ')}
              >
                {isComplete ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.short
                )}
                
                {/* Active Pulse Aura */}
                {isActive && (
                  <>
                    <span className="absolute inset-0 rounded-full border border-white/50 animate-ping" />
                    <span className="absolute -inset-1 rounded-full border border-white/10 animate-pulse" />
                  </>
                )}
              </div>
              <span
                className={[
                  'text-[9px] font-outfit font-bold tracking-[0.15em] uppercase transition-all duration-500',
                  isComplete ? 'text-blue-400/80' : '',
                  isActive   ? 'text-white' : '',
                  isFuture   ? 'text-slate-700' : '',
                ].join(' ')}
              >
                {s.label}
              </span>
            </div>

            {/* Seamless Intelligence Connector */}
            {idx < STAGES.length - 1 && (
              <div className="flex-1 mx-2 h-[2px] relative overflow-hidden bg-slate-900 rounded-full">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 origin-left ease-in-out"
                  style={{ transform: `scaleX(${isComplete ? 1 : 0})` }}
                />
                {isActive && (
                   <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
