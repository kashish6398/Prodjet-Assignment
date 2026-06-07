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
    const baseClass = "w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all duration-200";
    if (errors[fieldName]) {
      return `${baseClass} border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20`;
    }
    return `${baseClass} border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between pt-2 h-full">
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-4 select-none">
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
          <div className="w-8"></div>
        </div>

        {/* Stepper Dots (Matches Mockup Screen 2) */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center gap-1.5">
            {/* Dot 1 */}
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary"></div>
            {/* Line 1 */}
            <div className="w-8 h-[2px] bg-brand-primary rounded-full"></div>
            {/* Dot 2 */}
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary ring-4 ring-brand-primary/25"></div>
            {/* Line 2 */}
            <div className="w-8 h-[2px] bg-slate-200 rounded-full"></div>
            {/* Dot 3 */}
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            {/* Line 3 */}
            <div className="w-8 h-[2px] bg-slate-200 rounded-full"></div>
            {/* Dot 4 */}
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          </div>
        </div>

        {/* Titles */}
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Details
        </h2>
        <p className="text-slate-400 text-xs mt-1 mb-6 font-medium">
          Please fill in your details
        </p>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Common Fields */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
              className={getInputClassName("fullName")}
            />
            {errors.fullName && (
              <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.fullName}</span>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={handleChange}
              className={getInputClassName("email")}
            />
            {errors.email && (
              <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.email}</span>
            )}
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              className={getInputClassName("phone")}
            />
            {errors.phone && (
              <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.phone}</span>
            )}
          </div>

          {/* Student Fields */}
          {userType === "student" && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  College Name
                </label>
                <input
                  type="text"
                  name="collegeName"
                  placeholder="ABC College of Engineering"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className={getInputClassName("collegeName")}
                />
                {errors.collegeName && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.collegeName}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Course / Degree
                </label>
                <div className="relative">
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.course && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.course}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Graduation Year
                </label>
                <div className="relative">
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.graduationYear && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.graduationYear}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Bangalore"
                  value={formData.city}
                  onChange={handleChange}
                  className={getInputClassName("city")}
                />
                {errors.city && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.city}</span>
                )}
              </div>
            </>
          )}

          {/* Brand Fields */}
          {userType === "brand" && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  placeholder="Acme Corp"
                  value={formData.brandName}
                  onChange={handleChange}
                  className={getInputClassName("brandName")}
                />
                {errors.brandName && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.brandName}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Industry
                </label>
                <div className="relative">
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.industry && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.industry}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Company Size
                </label>
                <div className="relative">
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.companySize && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.companySize}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Website URL
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder="acme.com"
                  value={formData.website}
                  onChange={handleChange}
                  className={getInputClassName("website")}
                />
                {errors.website && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.website}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Sarah Connor"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={getInputClassName("contactPerson")}
                />
                {errors.contactPerson && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.contactPerson}</span>
                )}
              </div>
            </>
          )}

          {/* College Fields */}
          {userType === "college" && (
            <>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  College Name
                </label>
                <input
                  type="text"
                  name="collegeName"
                  placeholder="BITS Pilani"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className={getInputClassName("collegeName")}
                />
                {errors.collegeName && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.collegeName}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Your Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Head of Placements"
                  value={formData.designation}
                  onChange={handleChange}
                  className={getInputClassName("designation")}
                />
                {errors.designation && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.designation}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Approx. Number of Students
                </label>
                <div className="relative">
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.numberOfStudents && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.numberOfStudents}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Pilani"
                  value={formData.city}
                  onChange={handleChange}
                  className={getInputClassName("city")}
                />
                {errors.city && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.city}</span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Official College Email
                </label>
                <input
                  type="email"
                  name="officialEmail"
                  placeholder="contact@bits-pilani.ac.in"
                  value={formData.officialEmail}
                  onChange={handleChange}
                  className={getInputClassName("officialEmail")}
                />
                {errors.officialEmail && (
                  <span className="text-rose-500 text-xs mt-1 block font-medium">{errors.officialEmail}</span>
                )}
              </div>
            </>
          )}

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center shadow-[0_4px_16px_rgba(92,53,205,0.25)] hover:shadow-[0_6px_20px_rgba(92,53,205,0.35)] active:scale-[0.98]"
            >
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DynamicForm;