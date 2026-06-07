import { useState } from "react";

function SuccessScreen({
  setStep,
  setFormData,
  setUserType,
}) {
  const [copied, setCopied] = useState(false);

  const referralLink = "prodjet.in/join?ref=USR757";
  const referralCode = "USR757";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToHome = () => {
    // Reset form and go back to step 1
    setUserType("");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      collegeName: "",
      course: "",
      graduationYear: "",
      city: "",
      brandName: "",
      industry: "",
      companySize: "",
      website: "",
      contactPerson: "",
      designation: "",
      numberOfStudents: "",
      officialEmail: "",
    });
    setStep(1);
  };

  return (
    <div className="flex-1 flex flex-col justify-between pt-2 h-full text-center overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 select-none shrink-0 h-8">
        <div className="w-8"></div>
        <span className="font-extrabold text-base tracking-wider uppercase text-slate-950">
          PRODJET
        </span>
        <div className="shrink-0">
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Step 3 of 3
          </span>
        </div>
      </div>

      {/* Main Content Area (Scrollable in case height is constrained, but fits nicely) */}
      <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col items-center py-2">
        {/* Circle Check Badge (Screen 3) */}
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100 shadow-[0_4px_12px_rgba(16,185,129,0.1)]">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Text Headers */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-2 select-text">
          Registration Complete!
        </h1>
        <p className="text-slate-500 text-xs font-medium">
          You are on the PRODJET waitlist.
        </p>

        {/* Premium Digital Boarding Pass Ticket */}
        <div className="w-full bg-white border border-slate-100 shadow-[0_12px_35px_rgba(92,53,205,0.04)] rounded-[22px] p-6 text-center mt-5 select-none relative overflow-hidden">
          
          {/* Top gradient accent border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-brand-primary to-indigo-400"></div>

          {/* Dotted cut notches on the sides */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3.5 w-5.5 h-5.5 bg-white border border-slate-100 rounded-full z-10 shadow-inner"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3.5 w-5.5 h-5.5 bg-white border border-slate-100 rounded-full z-10 shadow-inner"></div>

          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Waitlist Number
          </span>
          <span className="text-4xl font-black text-brand-primary tracking-tight block mb-4">
            #757
          </span>

          <div className="w-full border-t border-dashed border-slate-200/80 mb-4"></div>

          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Referral Code
          </span>
          <span className="text-2xl font-extrabold text-slate-800 tracking-wider block mb-4 uppercase">
            {referralCode}
          </span>

          {/* Click to Copy link container */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              copied
                ? "bg-emerald-50 border-emerald-200 text-emerald-600 animate-pulse"
                : "bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-600"
            }`}
          >
            <span className="text-[10px] font-mono select-all truncate">
              {referralLink}
            </span>
            <span className="text-[9px] font-bold shrink-0 ml-2 text-brand-primary">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>

          {/* Simulated Ticket Barcode */}
          <div className="flex items-center justify-center gap-0.75 mt-6 h-8 opacity-65 px-4">
            {[1.5, 3.5, 1, 2, 4.5, 1, 2.5, 3.5, 1, 2, 1.5, 3.5, 1, 4.5, 1.5, 2.5, 1, 3.5].map((w, i) => (
              <div key={i} className="h-full bg-slate-900 rounded-xs" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>

        {/* Refer Friends Message (Screen 3) */}
        <div className="flex items-center justify-center gap-2 mt-5 px-4 py-2 bg-[#f5f3ff] rounded-full border border-indigo-50/10">
          {/* Share/Referral SVG Icon */}
          <svg className="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-slate-600 text-xs font-semibold tracking-tight">
            Refer friends and move ahead in the queue!
          </span>
        </div>
      </div>

      {/* Action Button fixed at bottom */}
      <div className="mt-4 pt-4 border-t border-slate-100 shrink-0 bg-white">
        <button
          onClick={handleGoToHome}
          className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(92,53,205,0.25)] hover:shadow-[0_6px_20px_rgba(92,53,205,0.35)] active:scale-[0.98]"
        >
          <span>Go to Home</span>
        </button>
      </div>
    </div>
  );
}

export default SuccessScreen;