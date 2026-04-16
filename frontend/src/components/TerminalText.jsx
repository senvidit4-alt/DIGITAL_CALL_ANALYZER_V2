/**
 * Terminal-style text box with highlighted spans.
 * segments: Array<{ text: string, type: 'normal' | 'danger' | 'warn' }>
 */
export default function TerminalText({ segments = [], loading = false }) {
  if (loading) {
    return (
      <div className="bg-[#060b14]/40 border border-white/5 rounded-xl p-6 min-h-[160px] flex flex-col gap-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/[0.03] to-transparent -translate-x-full animate-wave" />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-white/[0.02] animate-pulse"
            style={{ width: `${65 + Math.random() * 30}%`, animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    );
  }

  if (!segments.length) {
    return (
      <div className="bg-[#060b14]/40 border border-white/5 rounded-xl p-8 min-h-[160px] flex items-center justify-center opacity-10">
        <span className="pro-label tracking-widest uppercase">System Idle // Awaiting Source</span>
      </div>
    );
  }

  return (
    <div className="bg-[#060b14]/60 border border-white/5 rounded-xl p-6 leading-relaxed break-words min-h-[160px] relative overflow-hidden">
      {/* Official Intake Badge */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
           <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
           </svg>
           <span className="pro-label !text-[10px]">INTELLIGENCE_SOURCE_ALPHA</span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-400 uppercase tracking-tighter">
           Verified Integrity
        </div>
      </div>

      {/* Forensic Intelligence Content */}
      <p className="font-inter text-[13.5px] text-slate-300 leading-[1.8] break-words selection:bg-blue-500/40">
        {segments.map((seg, idx) => {
          if (seg.type === 'danger') {
            return (
              <mark
                key={idx}
                className="rounded px-1.5 py-0.5 mx-0.5 font-bold text-white shadow-[0_2px_10px_rgba(225,29,72,0.2)] animate-reveal inline-block"
                style={{
                  backgroundColor: '#e11d48cc',
                  color: '#ffffff',
                  textDecoration: 'none',
                }}
              >
                {seg.text}
              </mark>
            );
          }
          if (seg.type === 'warn') {
            return (
              <mark
                key={idx}
                className="rounded px-1.5 py-0.5 mx-0.5 font-bold text-white border border-rose-500/20 animate-reveal inline-block"
                style={{
                  backgroundColor: 'rgba(225,29,72,0.15)',
                  color: '#fb7185',
                  textDecoration: 'none',
                }}
              >
                {seg.text}
              </mark>
            );
          }
          return <span key={idx} className="animate-fade_in">{seg.text}</span>;
        })}
      </p>

      {/* Forensic Intelligence Key */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.5)]" />
          <span className="pro-label !text-[9px]">Confirmed Pattern</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/50" />
          <span className="pro-label !text-[9px] opacity-60">Probable Indicator</span>
        </div>
      </div>
    </div>
  );
}
