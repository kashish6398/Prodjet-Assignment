import { useState } from "react";

function UserTypeSelection({ userType, setUserType, setStep }) {
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!userType) {
      setError("Please select a user type to continue");
      return;
    }
    setError("");
    setStep(2);
  };

  const options = [
    {
      id: "student",
      title: "Student",
      subtitle: "Join as a student",
      themeClass: "border-brand-primary bg-indigo-50/15 shadow-[0_0_0_1px_#5c35cd]",
      normalClass: "border-slate-200/80 bg-white hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(15,23,42,0.03)]",
      iconBg: "bg-[#f5f3ff] text-brand-primary",
      activeIconBg: "bg-brand-primary text-white",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      id: "brand",
      title: "Brand",
      subtitle: "Join as a brand",
      themeClass: "border-brand-primary bg-indigo-50/15 shadow-[0_0_0_1px_#5c35cd]",
      normalClass: "border-slate-200/80 bg-white hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(15,23,42,0.03)]",
      iconBg: "bg-slate-100 text-slate-600",
      activeIconBg: "bg-brand-primary text-white",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "college",
      title: "College",
      subtitle: "Join as a college",
      themeClass: "border-brand-primary bg-indigo-50/15 shadow-[0_0_0_1px_#5c35cd]",
      normalClass: "border-slate-200/80 bg-white hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(15,23,42,0.03)]",
      iconBg: "bg-emerald-50 text-emerald-600",
      activeIconBg: "bg-brand-primary text-white",
      icon: (
        <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between pt-3 h-full">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-center mb-6 select-none h-8">
          <span className="font-extrabold text-base tracking-wider uppercase text-slate-900">
            PRODJET
          </span>
        </div>

        {/* Dynamic Titles */}
        <h2 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-[1.15] text-left">
          Join the PRODJET <br />Waitlist
        </h2>
        
        <p className="text-slate-500 text-xs mt-2 font-medium leading-relaxed text-left">
          Be the first to access exclusive updates and early access.
        </p>

        {/* Selector Label */}
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-8 mb-3">
          I am a...
        </h3>

        {/* Options List */}
        <div className="space-y-3.5">
          {options.map((opt) => {
            const isSelected = userType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setUserType(opt.id);
                  setError("");
                }}
                className={`w-full flex items-center p-4.5 rounded-2xl border text-left transition-all duration-300 transform cursor-pointer ${
                  isSelected ? opt.themeClass + " scale-[1.02] shadow-[0_8px_25px_rgba(92,53,205,0.08)]" : opt.normalClass
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mr-4 shrink-0 transition-colors duration-300 ${
                  isSelected ? opt.activeIconBg : opt.iconBg
                }`}>
                  {opt.icon}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {opt.title}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                    {opt.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-5">
        {error && (
          <div className="mb-4 flex items-center gap-2 text-rose-500 bg-rose-50 border border-rose-100 px-3.5 py-2.5 rounded-xl text-[11px] font-bold animate-pulse">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(92,53,205,0.2)] hover:shadow-[0_6px_22px_rgba(92,53,205,0.3)] active:scale-[0.98] active:translate-y-0"
        >
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
}

export default UserTypeSelection;