const SIGNAL_THEMES = {
  danger: { text: 'text-rose-400',  dot: 'bg-rose-500',  bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  warn:   { text: 'text-rose-200',  dot: 'bg-rose-400',  bg: 'bg-rose-400/5',  border: 'border-rose-400/10' }, // User requested red-spectrum for warning
  safe:   { text: 'text-emerald-400', dot: 'bg-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

export default function SignalList({ signals = [], loading = false }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="h-10 rounded-xl bg-white/[0.02] border border-white/5 animate-shimmer overflow-hidden relative"
            style={{ animationDelay: `${i * 150}ms` }}
          >
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-wave" />
          </div>
        ))}
      </div>
    );
  }

  if (!signals.length) {
    return (
      <div className="py-8 flex flex-col items-center justify-center opacity-20 text-slate-500">
         <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
         </svg>
         <p className="pro-label !text-[9px]">Awaiting Signal Input</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {signals.map((sig, idx) => {
        const t = SIGNAL_THEMES[sig.risk] || SIGNAL_THEMES.safe;
        return (
          <div
            key={idx}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border ${t.border} ${t.bg} transition-all duration-500 hover:scale-[1.01] hover:brightness-110`}
            style={{ animation: 'fade-in-up 0.5s ease forwards', animationDelay: `${idx * 80}ms`, opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <span className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)] ${t.dot}`} />
              <span className={`text-[11px] font-outfit font-extrabold tracking-wide uppercase ${t.text}`}>
                {sig.label}
              </span>
            </div>
            <span className={`text-[12px] font-inter font-bold ${t.text} opacity-80 tabular-nums`}>
              {sig.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
