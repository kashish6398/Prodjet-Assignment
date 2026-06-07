import { useState } from "react";
import UserTypeSelection from "./components/UserTypeSelection";
import DynamicForm from "./components/DynamicForm";
import SuccessScreen from "./components/SuccessScreen";

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
    <div className="relative min-h-screen bg-[#F8FAFC] flex items-center justify-center p-0 md:py-10 md:px-4 overflow-y-auto select-none font-sans">
      
      {/* Premium Light Theme Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-60"></div>
      
      {/* Trendy Light-Mesh Gradient Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[55%] bg-indigo-200/30 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[50%] bg-purple-200/35 rounded-full blur-[130px] pointer-events-none"></div>

      {/* iPhone Smartphone Frame Container */}
      <div className="w-full min-h-screen md:w-[375px] md:h-[740px] md:min-h-0 bg-white rounded-none md:rounded-[48px] md:border-10 md:border-slate-900 shadow-none md:shadow-[0_25px_60px_-15px_rgba(92,53,205,0.06),0_15px_30px_rgba(15,23,42,0.04)] relative overflow-hidden flex flex-col shrink-0 transition-all duration-300">
        
        {/* Modern Dynamic Island Notch */}
        <div className="hidden md:flex absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-50 items-center justify-end px-3">
          {/* Simulated tiny camera lens dot */}
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800/80 shadow-inner"></div>
        </div>

        {/* iPhone status bar inside container */}
        <div className="absolute top-0 left-0 right-0 h-12 px-6 pt-3.5 flex items-center justify-between z-40 bg-white text-slate-900 text-[11px] font-bold select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular signal bars SVG */}
            <svg className="w-3.5 h-3.5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 19h2v-2H2v2zm4 0h2v-4H6v4zm4 0h2v-6h-2v6zm4 0h2v-9h-2v9zm4 0h2V5h-2v14z" />
            </svg>
            {/* Battery level SVG */}
            <div className="w-5.5 h-3 border border-slate-800 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-slate-800 rounded-[1px]"></div>
              <div className="w-[1.5px] h-1.2 bg-slate-800 rounded-r-xs ml-0.5"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Content Body */}
        <div className="flex-1 bg-white text-slate-800 px-6 pt-12 pb-8 overflow-hidden flex flex-col relative">
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