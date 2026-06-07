import { useState } from "react";

function DynamicForm({
  userType,
  formData,
  setFormData,
  setStep,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{8,15}$/;

    // Common validations
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Invalid email format";
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Enter a valid phone number (8-15 digits)";
    }

    // Student specific validations
    if (userType === "student") {
      if (!formData.collegeName.trim()) tempErrors.collegeName = "College Name is required";
      if (!formData.course) tempErrors.course = "Course / Degree is required";
      if (!formData.graduationYear) tempErrors.graduationYear = "Graduation Year is required";
      if (!formData.city.trim()) tempErrors.city = "City is required";
    }

    // Brand specific validations
    if (userType === "brand") {
      if (!formData.brandName.trim()) tempErrors.brandName = "Brand Name is required";
      if (!formData.industry) tempErrors.industry = "Industry is required";
      if (!formData.companySize) tempErrors.companySize = "Company Size is required";
      if (!formData.website.trim()) {
        tempErrors.website = "Website URL is required";
      } else if (!formData.website.includes(".")) {
        tempErrors.website = "Enter a valid website URL (e.g. acme.com)";
      }
      if (!formData.contactPerson.trim()) tempErrors.contactPerson = "Contact Person Name is required";
    }

    // College specific validations
    if (userType === "college") {
      if (!formData.collegeName.trim()) tempErrors.collegeName = "College Name is required";
      if (!formData.designation.trim()) tempErrors.designation = "Designation is required";
      if (!formData.numberOfStudents) tempErrors.numberOfStudents = "Number of Students is required";
      if (!formData.city.trim()) tempErrors.city = "City is required";
      if (!formData.officialEmail.trim()) {
        tempErrors.officialEmail = "Official Email is required";
      } else if (!emailRegex.test(formData.officialEmail)) {
        tempErrors.officialEmail = "Invalid email format";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setStep(3);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full bg-[#f8fafc] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-404 focus:outline-none focus:bg-white transition-all duration-200";
    if (errors[fieldName]) {
      return `${baseClass} border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20`;
    }
    return `${baseClass} border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between pt-2 h-full overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 select-none shrink-0 h-8">
        <button
          onClick={() => setStep(1)}
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="font-extrabold text-base tracking-wider uppercase text-slate-950">
          PRODJET
        </span>
        
        <div className="shrink-0">
          <span className="text-[10px] font-bold text-brand-primary bg-indigo-50/60 border border-indigo-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Step 2 of 3
          </span>
        </div>
      </div>

      {/* Titles */}
      <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none text-left shrink-0">
        {userType === "student" ? "Student Details" : userType === "brand" ? "Brand Details" : "College Details"}
      </h2>
      <p className="text-slate-400 text-xs mt-1 mb-6 font-medium text-left shrink-0">
        Please fill in your details
      </p>

      {/* Dynamic Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* Scrollable Fields */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 -mr-1 scrollbar-none py-1">
          
          {/* Common Fields */}
          <div className="text-left">
            <label className="text-xs font-semibold text-slate-500 mb-1 block">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Rahul Sharma"
                value={formData.fullName}
                onChange={handleChange}
                className={getInputClassName("fullName")}
              />
            </div>
            {errors.fullName && (
              <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.fullName}</span>
            )}
          </div>

          <div className="text-left">
            <label className="text-xs font-semibold text-slate-500 mb-1 block">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
                className={getInputClassName("email")}
              />
            </div>
            {errors.email && (
              <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.email}</span>
            )}
          </div>

          <div className="text-left">
            <label className="text-xs font-semibold text-slate-500 mb-1 block">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                className={getInputClassName("phone")}
              />
            </div>
            {errors.phone && (
              <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.phone}</span>
            )}
          </div>

          {/* Student Fields */}
          {userType === "student" && (
            <>
              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  College Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="collegeName"
                    placeholder="ABC College of Engineering"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className={getInputClassName("collegeName")}
                  />
                </div>
                {errors.collegeName && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.collegeName}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Course / Degree
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`${getInputClassName("course")} appearance-none pr-10`}
                  >
                    <option value="">Select Course</option>
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                    <option value="BCA / MCA">BCA / MCA</option>
                    <option value="MBA / BBA">MBA / BBA</option>
                    <option value="Other Degree">Other Degree</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-404">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.course && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.course}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Graduation Year
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className={`${getInputClassName("graduationYear")} appearance-none pr-10`}
                  >
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-404">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.graduationYear && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.graduationYear}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="city"
                    placeholder="Bangalore"
                    value={formData.city}
                    onChange={handleChange}
                    className={getInputClassName("city")}
                  />
                </div>
                {errors.city && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.city}</span>
                )}
              </div>
            </>
          )}

          {/* Brand Fields */}
          {userType === "brand" && (
            <>
              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Brand Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="brandName"
                    placeholder="Acme Corp"
                    value={formData.brandName}
                    onChange={handleChange}
                    className={getInputClassName("brandName")}
                  />
                </div>
                {errors.brandName && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.brandName}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Industry
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`${getInputClassName("industry")} appearance-none pr-10`}
                  >
                    <option value="">Select Industry</option>
                    <option value="Tech / SaaS">Tech / SaaS</option>
                    <option value="E-Commerce / Retail">E-Commerce / Retail</option>
                    <option value="Finance / FinTech">Finance / FinTech</option>
                    <option value="Education / EdTech">Education / EdTech</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Marketing / Creator">Marketing / Creator</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-404">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.industry && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.industry}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Company Size
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className={`${getInputClassName("companySize")} appearance-none pr-10`}
                  >
                    <option value="">Select Size</option>
                    <option value="1-10">1-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="201-500">201-500 Employees</option>
                    <option value="500+">500+ Employees</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-404">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.companySize && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.companySize}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Website URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9c1.657 0 3 2.51 3 6s-1.343 6-3 6m0-12c-1.657 0-3 2.51-3 6s1.343 6 3 6m-9-6h9" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="website"
                    placeholder="acme.com"
                    value={formData.website}
                    onChange={handleChange}
                    className={getInputClassName("website")}
                  />
                </div>
                {errors.website && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.website}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Contact Person Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a3 3 0 100-6 3 3 0 000 6zm5 6a7 7 0 00-10 0" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="Sarah Connor"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className={getInputClassName("contactPerson")}
                  />
                </div>
                {errors.contactPerson && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.contactPerson}</span>
                )}
              </div>
            </>
          )}

          {/* College Fields */}
          {userType === "college" && (
            <>
              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  College Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="collegeName"
                    placeholder="BITS Pilani"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className={getInputClassName("collegeName")}
                  />
                </div>
                {errors.collegeName && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.collegeName}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Your Designation
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a3 3 0 100-6 3 3 0 000 6zm5 6a7 7 0 00-10 0" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="designation"
                    placeholder="Head of Placements"
                    value={formData.designation}
                    onChange={handleChange}
                    className={getInputClassName("designation")}
                  />
                </div>
                {errors.designation && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.designation}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Approx. Number of Students
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <select
                    name="numberOfStudents"
                    value={formData.numberOfStudents}
                    onChange={handleChange}
                    className={`${getInputClassName("numberOfStudents")} appearance-none pr-10`}
                  >
                    <option value="">Select Count</option>
                    <option value="1-500">1-500 Students</option>
                    <option value="501-2000">501-2000 Students</option>
                    <option value="2001-5000">2001-5000 Students</option>
                    <option value="5000+">5000+ Students</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-404">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.numberOfStudents && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.numberOfStudents}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="city"
                    placeholder="Pilani"
                    value={formData.city}
                    onChange={handleChange}
                    className={getInputClassName("city")}
                  />
                </div>
                {errors.city && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.city}</span>
                )}
              </div>

              <div className="text-left">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Official College Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-404">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="officialEmail"
                    placeholder="contact@bits-pilani.ac.in"
                    value={formData.officialEmail}
                    onChange={handleChange}
                    className={getInputClassName("officialEmail")}
                  />
                </div>
                {errors.officialEmail && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.officialEmail}</span>
                )}
              </div>
            </>
          )}

        </div>

        {/* Fixed Submit Button at the bottom */}
        <div className="pt-4 mt-2 border-t border-slate-100 shrink-0 bg-white">
          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center shadow-[0_4px_16px_rgba(92,53,205,0.2)] active:scale-[0.98]"
          >
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default DynamicForm;