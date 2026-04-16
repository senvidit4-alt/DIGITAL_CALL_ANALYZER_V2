import { useEffect, useState } from 'react';
import { getStats } from '../services/mockApi';

const STAT_ITEMS = [
  { key: 'totalScanned',  label: 'Total Scanned' },
  { key: 'scamsDetected', label: 'Scams Found'   },
  { key: 'safeMessages',  label: 'Safe'           },
  { key: 'accuracy',      label: 'Accuracy',  suffix: '%' },
];

function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!value || value === 0) {
      setDisplay(0);
      return;
    }
    const steps = 40;
    const duration = 900;
    const step = (Number(value) || 0) / steps;
    let current = 0;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      current = Math.min(current + step, value);
      setDisplay(typeof value === 'number' && !Number.isInteger(value)
        ? parseFloat(current.toFixed(1))
        : Math.round(current));
      if (count >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {typeof value === 'number' && !Number.isInteger(value)
        ? display.toFixed(1)
        : display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBar({ stats }) {
  return (
    <header className="sticky top-0 z-50 w-full shadow-2xl flex flex-col">
      {/* Tier 1: GOI Accessibility Utility Bar */}
      <div className="w-full bg-[#050810] border-b border-[#ffffff10] backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-8 h-[28px] flex items-center justify-between text-[10px] font-medium tracking-[0.08em] text-slate-400">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-amber-400 transition-colors uppercase">भारत सरकार / Government of India</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="#" className="hover:text-amber-400 transition-colors uppercase">गृह मंत्रालय / Ministry of Home Affairs</a>
          </div>
          <div className="flex items-center gap-4 uppercase font-outfit">
            <button className="hover:text-white transition-colors">Skip to Main Content</button>
            <span className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5 font-mono text-[9px]">
              <button className="w-4 h-4 flex items-center justify-center hover:bg-white/10 rounded transition-colors focus:ring-1 ring-amber-400/50">A-</button>
              <button className="w-4 h-4 flex items-center justify-center hover:bg-white/10 rounded transition-colors focus:ring-1 ring-amber-400/50">A</button>
              <button className="w-4 h-4 flex items-center justify-center hover:bg-white/10 rounded transition-colors focus:ring-1 ring-amber-400/50">A+</button>
            </div>
            <span className="w-px h-3 bg-white/10" />
            <button className="hover:text-white transition-colors font-bold text-amber-500">ENG</button>
            <span className="line-through opacity-50">HIN</span>
          </div>
        </div>
      </div>

      {/* Tier 2: Ministry Branding Ribbon */}
      <div className="w-full bg-gradient-to-r from-[#0d1627] via-[#111d36] to-[#0a1120] border-b border-[#ffffff0a] relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBWMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBWMzBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoMTBWMDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTMwIDQwaDEwViwwSDMweiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAzdjFoNDBWM3pNMCAzdjFoNDBWM3oiIGZpbGw9IiNmZmZmZmYwNCIvPgo8L3N2Zz4=')] opacity-20 mix-blend-overlay" />
        
        <div className="max-w-[1600px] mx-auto px-8 w-full flex items-center justify-between relative z-10 h-[84px]">
          {/* Emblem & Ministry Name */}
          <div className="flex items-center gap-6">
            <div className="h-[52px] w-[52px] flex items-center justify-center bg-gradient-to-b from-amber-500/20 to-amber-900/20 rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md relative overflow-hidden">
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50" />
               {/* Pure CSS styling to mimic a royal crest/emblem */}
               <div className="flex items-end justify-center gap-[2px] pb-[4px]">
                  <div className="w-1.5 h-3 bg-amber-400 rounded-t-sm shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
                  <div className="w-2.5 h-4 bg-amber-400 rounded-t-sm shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
                  <div className="w-1.5 h-3 bg-amber-400 rounded-t-sm shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
               </div>
               <div className="absolute bottom-[14px] w-5 h-1 bg-amber-500/80 rounded border-y border-amber-300/30" />
               <div className="absolute bottom-[8px] w-7 h-0.5 bg-amber-600/60 rounded-full" />
            </div>
            
            <div className="h-12 w-px bg-white/10 hidden md:block" />
            
            <div className="flex flex-col justify-center">
              <h1 className="text-[19px] font-black text-white tracking-wide leading-tight font-outfit uppercase drop-shadow-md">
                Indian Cyber Crime Coordination Centre <span className="text-amber-400 ml-1 tracking-widest">(I4C)</span>
              </h1>
              <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-[0.15em] flex items-center gap-2 mt-1">
                National Cyber Security &amp; Intelligence <span className="w-1 h-1 bg-amber-500 rounded-full animate-pulse" /> Threat Analysis Platform
              </p>
            </div>
          </div>

           {/* Right side Logos & Helpline */}
           <div className="flex items-center gap-8">
            <div className="text-right flex flex-col justify-center bg-[#00000040] py-2 px-4 rounded-xl border border-red-900/30 shadow-inner">
              <p className="text-[9px] font-bold text-red-300 uppercase tracking-[0.2em] mb-0.5">National Cyber Helpline</p>
              <div className="flex items-center gap-2 justify-end">
                 <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                 </div>
                 <p className="text-[26px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 leading-none" style={{ textShadow: "0 2px 10px rgba(225,29,72,0.3)" }}>
                    1930
                 </p>
              </div>
            </div>
            
            <div className="h-12 w-px bg-white/10 hidden lg:block" />
            
            {/* Ecosystem Logos - Typographic styling to avoid broken external links */}
            <div className="hidden lg:flex items-center gap-4">
              {/* CSS Digital India Logo */}
              <div className="flex flex-col items-center justify-center h-[42px] px-2">
                 <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[12px] font-black tracking-[0.15em] text-white">DIGITAL</span>
                    <span className="text-[12px] font-black tracking-[0.15em] text-amber-400">INDIA</span>
                 </div>
                 <div className="flex gap-1 w-full justify-center">
                    <div className="h-[2px] w-4 bg-[#ff9933]" />
                    <div className="h-[2px] w-4 bg-white" />
                    <div className="h-[2px] w-4 bg-[#138808]" />
                 </div>
              </div>
              
              <div className="h-8 w-px bg-white/5" />

              {/* CSS NIC Logo */}
              <div className="flex items-center gap-2 h-[42px] px-2 pl-1">
                 <div className="flex flex-col items-end leading-[0.85]">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">National</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Informatics</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Centre</span>
                 </div>
                 <div className="w-[2px] h-6 bg-blue-500" />
                 <span className="text-[18px] font-black tracking-widest text-white">NIC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 3: Main App Functional Bar */}
      <div className="w-full bg-[#060a12]/95 backdrop-blur-xl border-b border-[#ffffff10] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-8 h-[52px] max-w-[1600px] mx-auto">
        
          {/* Internal Portal Identity */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1.5 items-center justify-center h-8 w-8 bg-[#101b30] rounded-md border border-[#1e293b]">
              <div className="w-4 h-[2px] bg-[#ff9933] rounded-full" />
              <div className="w-4 h-[2px] bg-white rounded-full" />
              <div className="w-4 h-[2px] bg-[#138808] rounded-full" />
            </div>
            <div>
              <h2 className="font-outfit text-[16px] font-extrabold tracking-tight text-slate-100 uppercase leading-none">
                CYBER FRAUD <span className="text-[#3b82f6] ml-1">ANALYST INTERFACE</span>
              </h2>
            </div>
          </div>

          {/* Live Statistics Pill */}
          <div className="hidden lg:flex items-center gap-8 px-6 h-full border-x border-[#ffffff0a] bg-gradient-to-b from-[#ffffff03] to-transparent">
            {STAT_ITEMS.map(({ key, label, suffix }) => (
              <div key={key} className="flex flex-col items-center justify-center">
                <span className="text-[7.5px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-[2px]">{label}</span>
                <div className="font-mono text-[14px] font-bold text-slate-200 leading-none">
                  {stats ? (
                    <AnimatedNumber value={stats[key] || 0} suffix={suffix || ''} />
                  ) : (
                    <span className="text-slate-800">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* System Status Node */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/5 h-full">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded bg-emerald-950/20 border border-emerald-900/30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-emerald-400 tracking-wider uppercase leading-tight">System Validated</p>
                <p className="text-[8px] text-slate-500 font-mono tracking-widest">TLS 1.3 · AES-256-GCM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
