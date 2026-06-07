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
    <div className="flex-1 flex flex-col justify-between pt-6 h-full text-center">
      <div className="flex flex-col items-center">
        {/* Circle Check Badge (Screen 3) */}
        <div className="w-16 h-16 bg-[#eafaf1] rounded-full flex items-center justify-center text-[#10b981] mb-5 border border-emerald-100 shadow-[0_4px_12px_rgba(16,185,129,0.1)]">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Text Headers */}
        <h1 className="text-[25px] font-extrabold text-slate-900 tracking-tight leading-none mb-2.5">
          Registration Complete!
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          You are on the PRODJET waitlist.
        </p>

        {/* Boarding Waitlist Card (Screen 3) */}
        <div className="w-full bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[22px] p-6 text-center mt-6 select-none relative overflow-hidden">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Waitlist Number
          </span>
          <span className="text-4xl font-extrabold text-brand-primary tracking-tight block mb-5">
            #757
          </span>

          <div className="w-full border-t border-slate-100 mb-5"></div>

          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Referral Code
          </span>
          <span className="text-3xl font-extrabold text-brand-primary tracking-tight block mb-4 uppercase">
            {referralCode}
          </span>

          {/* Click to Copy link container */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              copied
                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                : "bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-600"
            }`}
          >
            <span className="text-[11px] font-mono select-all truncate">
              {referralLink}
            </span>
            <span className="text-[10px] font-bold shrink-0 ml-2 text-brand-primary">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>
        </div>

        {/* Refer Friends Message (Screen 3) */}
        <div className="flex items-center justify-center gap-2 mt-6 px-4 py-2 bg-[#f5f3ff] rounded-full border border-indigo-50/10">
          {/* Share/Referral SVG Icon */}
          <svg className="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-slate-600 text-xs font-semibold tracking-tight">
            Refer friends and move ahead in the queue!
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <button
          onClick={handleGoToHome}
          className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(92,53,205,0.2)] active:scale-[0.98]"
        >
          <span>Go to Home</span>
        </button>
      </div>
    </div>
  );
}

export default SuccessScreen;