import { useState } from "react";
import UserTypeSelection from "./components/UserTypeSelection";
import DynamicForm from "./components/DynamicForm";
import SuccessScreen from "./components/SuccessScreen";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");

  const [formData, setFormData] = useState({
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

  return (
    <div className="relative min-h-screen bg-slate-900 md:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] md:from-slate-950 md:via-slate-900 md:to-indigo-950 flex items-center justify-center p-0 md:py-8 md:px-4 overflow-y-auto select-none font-sans">
      
      {/* Decorative desktop gradients */}
      <div className="hidden md:block absolute top-10 left-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] animate-pulse-slow-reverse pointer-events-none"></div>

      {/* iPhone Smartphone Frame Container */}
      <div className="w-full min-h-screen md:w-[375px] md:h-[812px] md:min-h-0 bg-white rounded-none md:rounded-[48px] md:border-[12px] md:border-slate-950 shadow-none md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col shrink-0">
        
        {/* Physical Camera Notch (iPhone Style) */}
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6.5 bg-slate-950 rounded-b-3xl z-50 items-center justify-center gap-1.5">
          <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
          <div className="w-2 h-2 bg-slate-900 rounded-full border border-slate-800"></div>
        </div>

        {/* iPhone status bar inside container */}
        <div className="absolute top-0 left-0 right-0 h-12 px-6 pt-3 flex items-center justify-between z-40 bg-white text-slate-900 text-[11px] font-bold select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular signal bars SVG */}
            <svg className="w-3.5 h-3.5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 19h2v-2H2v2zm4 0h2v-4H6v4zm4 0h2v-6h-2v6zm4 0h2v-9h-2v9zm4 0h2V5h-2v14z" />
            </svg>
            {/* Wifi SVG */}
            <svg className="w-3.5 h-3.5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.01l.01-.011M12 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0-8c-3.866 0-7 3.134-7 7 0 1.933.784 3.683 2.05 4.95M19 13.95A6.953 6.953 0 0019 9c0-3.866-3.134-7-7-7" />
            </svg>
            {/* Battery level SVG */}
            <div className="w-5.5 h-3 border border-slate-800 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-slate-800 rounded-[1px]"></div>
              <div className="w-[1.5px] h-1.2 bg-slate-800 rounded-r-xs ml-0.5"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Body */}
        <div className="flex-1 bg-white text-slate-800 px-6 pt-12 pb-8 overflow-y-auto scrollbar-none flex flex-col relative">
          {step === 1 && (
            <UserTypeSelection
              userType={userType}
              setUserType={setUserType}
              setStep={setStep}
            />
          )}

          {step === 2 && (
            <DynamicForm
              userType={userType}
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
            />
          )}

          {step === 3 && (
            <SuccessScreen
              setStep={setStep}
              setFormData={setFormData}
              setUserType={setUserType}
            />
          )}
        </div>

        {/* Simulated Smartphone Home Indicator */}
        <div className="hidden md:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-950 rounded-full z-50"></div>
      </div>
    </div>
  );
}

export default App;