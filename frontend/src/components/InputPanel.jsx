import { useState } from 'react';
import StageTracker from './StageTracker';

// Real-world GOI scheme fraud cases used for system verification
const FRAUD_SCENARIOS = [
  {
    category: 'PM Kisan',
    label: 'PM Kisan Samman Nidhi Fraud',
    scheme: 'Pradhan Mantri Kisan Samman Nidhi',
    text: 'Congratulations! Your PM Kisan 16th installment of Rs.6000 is on hold. Your Aadhaar-linked bank account verification is pending. Please send your Aadhaar number, bank account details and OTP to helpline 9876543210 immediately to avoid cancellation of your subsidy.',
  },
  {
    category: 'Aadhaar/UIDAI',
    label: 'Fake UIDAI Deactivation Alert',
    scheme: 'Aadhaar Identity Services',
    text: 'UIDAI Alert: Your Aadhaar number 1234-5678-9012 has been flagged for suspicious activity and will be permanently deactivated in 24 hours. Click http://uidai-verify.online/update to complete biometric re-authentication and prevent account lock.',
  },
  {
    category: 'PMAY',
    label: 'PM Awas Yojana Housing Scam',
    scheme: 'Pradhan Mantri Awas Yojana',
    text: 'Dear Beneficiary, you have been selected under PMAY Urban 2024 for a FREE home. Your application reference: PMAY/URB/2024/88823. Pay a refundable processing fee of Rs.2500 to confirm your slot. Transfer to UPI: pmay-official@ybl',
  },
  {
    category: 'Banking/KYC',
    label: 'RBI/Bank KYC Phishing',
    scheme: 'RBI Regulated KYC Compliance',
    text: 'Your SBI/HDFC account has been temporarily suspended due to incomplete KYC. To restore full access, visit http://sbi-kyc-update.net and enter your Customer ID, Password and OTP within 48 hours to avoid permanent deactivation.',
  },
  {
    category: 'Safe Reference',
    label: 'Authentic PFMS Status Message',
    scheme: 'Public Financial Management System',
    text: 'Your application under National Social Assistance Programme has been approved. Reference No: NSAP/2024/981234. Benefit of Rs.500 per month will be credited directly to your registered bank account via PFMS on 1st of every month. For details visit nsap.nic.in.',
  },
];

export default function InputPanel({ onAnalyze, loading, stage }) {
  const [text, setText] = useState('');
  const [inputType, setInputType] = useState('message'); // 'message' | 'url' | 'email'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < 5 || loading) return;
    onAnalyze(text.trim());
  };

  const handleExample = (t) => {
    setText(t);
  };

  const charCount    = text.length;
  const canSubmit    = charCount >= 5 && !loading;
  const charWarning  = charCount > 1800;

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* GOI Portal Section Header */}
      <div>
        <h1 className="font-outfit text-base font-bold text-white tracking-tight">
          Complaint Submission
        </h1>
        <p className="text-[10px] text-slate-600 mt-0.5 uppercase tracking-widest font-semibold">
          Submit suspected fraud content for I4C analysis
        </p>
      </div>

      {/* Content Type Selector */}
      <div className="flex gap-1 p-1 bg-[#0d1930]/60 rounded-lg border border-[#ffffff08]">
        {[
          { id: 'message', label: 'SMS / Call' },
          { id: 'email',   label: 'Email'      },
          { id: 'url',     label: 'Website URL' },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setInputType(tab.id)}
            className={[
              'flex-1 py-2 rounded text-[10px] font-outfit font-bold tracking-widest uppercase transition-all duration-200',
              inputType === tab.id
                ? 'bg-[#1a3a6b] text-white border border-[#2a5aab]/60'
                : 'text-slate-600 hover:text-slate-400',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Forensic Input Area */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 min-h-[300px]">
        <div className="relative flex-1 gov-card-inset p-1 group transition-all duration-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <textarea
            id="analysis-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              inputType === 'url'
                ? 'Enter suspicious website / link for verification...'
                : inputType === 'email'
                ? 'Paste complete email including sender address...'
                : 'Paste the SMS, call transcript, or chat message here...'
            }
            disabled={loading}
            maxLength={2000}
            className={[
              'w-full bg-transparent border-none resize-none h-full p-4 text-sm leading-relaxed text-slate-200 placeholder-slate-700 focus:ring-0',
              charWarning ? 'text-rose-400' : '',
            ].join(' ')}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
             <span
              className={[
                'text-[10px] font-outfit font-bold opacity-40',
                charWarning ? 'text-rose-500 opacity-100' : 'text-slate-400',
              ].join(' ')}
            >
              {charCount.toLocaleString()} / 2,000
            </span>
          </div>
        </div>

        {/* Investigative Controls */}
        <div className="flex gap-3">
          <button
            id="btn-analyze"
            type="submit"
            disabled={!canSubmit}
            className="flex-1 gov-btn-primary overflow-hidden group"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                Analysing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Submit for Verification
              </span>
            )}
          </button>
          
          <button
            id="btn-clear"
            type="button"
            disabled={loading || !text}
            onClick={() => setText('')}
            className="gov-btn-ghost !px-4"
            title="Reset Database Case"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </form>

      {/* Analysis Verification Sequence */}
      <div className="bg-[#0d1930]/50 border border-[#ffffff06] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verification Sequence</p>
          <span className="text-[9px] font-mono text-slate-700">I4C/CFIP/v2.1</span>
        </div>
        <StageTracker stage={stage} />
      </div>

      {/* Fraud Scenario Reference Bank */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fraud Scenario Reference Bank</p>
          <span className="text-[9px] text-slate-700 font-mono">MHA/I4C Verified</span>
        </div>
        <div className="flex flex-col gap-2">
          {FRAUD_SCENARIOS.map((ex) => (
            <button
              key={ex.label}
              id={`scenario-${ex.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => handleExample(ex.text)}
              disabled={loading}
              className="group text-left px-4 py-3 border border-[#ffffff06] bg-[#0d1930]/30 hover:bg-[#0d1930]/60 hover:border-[#2a5aab]/40 rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-blue-500/70">{ex.category}</span>
                <span className="text-[8px] text-slate-700 font-mono opacity-0 group-hover:opacity-100 transition-opacity">LOAD →</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-200 transition-colors leading-snug">{ex.label}</p>
              <p className="text-[9px] text-slate-700 mt-0.5 font-mono">{ex.scheme}</p>
            </button>
          ))}
        </div>
        <p className="text-[9px] text-slate-700 mt-3 text-center font-mono">Reference cases sourced from I4C fraud database. For awareness only.</p>
      </div>
    </div>
  );
}
