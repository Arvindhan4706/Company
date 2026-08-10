"use client";
import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Upload, Calendar } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectLocation: '',
    serviceRequired: 'Fabrication Works',
    projectDescription: '',
    expectedTimeline: '',
    documentUpload: null
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // File validation constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const validateForm = () => {
    const errors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    // Company
    if (!formData.companyName.trim()) {
      errors.companyName = 'Company is required';
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    // Phone
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number format';
    }

    // Project Location
    if (!formData.projectLocation.trim()) {
      errors.projectLocation = 'Project location is required';
    }

    // Service Required
    if (!formData.serviceRequired) {
      errors.serviceRequired = 'Service is required';
    }

    // Project Description
    if (!formData.projectDescription.trim()) {
      errors.projectDescription = 'Project description is required';
    }

    // Expected Timeline
    if (!formData.expectedTimeline.trim()) {
      errors.expectedTimeline = 'Expected timeline is required';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        return;
      }

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setUploadError('Only PDF, JPG, PNG, DOC, and DOCX files are allowed');
        return;
      }

      setFormData(prev => ({ ...prev, documentUpload: file }));
      setUploadError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setUploadError('');

    try {
      // Create FormData for file upload
      const formDataObj = new FormData();
      formDataObj.append('fullName', formData.fullName);
      formDataObj.append('companyName', formData.companyName);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('projectLocation', formData.projectLocation);
      formDataObj.append('serviceRequired', formData.serviceRequired);
      formDataObj.append('projectDescription', formData.projectDescription);
      formDataObj.append('expectedTimeline', formData.expectedTimeline);

      if (formData.documentUpload) {
        formDataObj.append('documentUpload', formData.documentUpload);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          projectLocation: '',
          serviceRequired: 'Fabrication Works',
          projectDescription: '',
          expectedTimeline: '',
          documentUpload: null
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      // Don't set form submitted on error - keep form active for correction
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    gsap.fromTo('.contact-left',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );
    gsap.fromTo('.contact-right',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="py-24 lg:py-32 bg-primary-light border-y border-white/5">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-secondary text-sm font-heading tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:top-1/2 after:-right-12 after:w-8 after:h-[1px] after:bg-secondary/50">
            Start Your Industrial Project
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-white tracking-tight mb-6">
            REQUEST A QUOTE
          </h2>
          <p className="text-lg text-secondary font-light leading-relaxed max-w-2xl">
            Tell us about your requirements and our team will review your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Contact Details & Map */}
          <div className="contact-left flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-light text-white mb-8">
                Sterling Industrial Solutions LLP
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">HEADQUARTERS</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      Bengaluru, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">CONTACT NUMBER</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      Available upon request through form submission
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">EMAIL ADDRESS</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      Contact via secure website form
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">OPERATIONS</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      Standard business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Styled Map Container */}
            <div className="w-full h-64 border border-white/5 overflow-hidden filter grayscale contrast-125 opacity-80">
              <iframe
                title="Sterling Industrial Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=250&amp;hl=en&amp;q=Peenya%20Industrial%20Area,%20Bengaluru+(Sterling%20Industrial%20Solutions%20LLP)&amp;t=m&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="invert hue-rotate-180"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-right p-8 lg:p-12 bg-white/[0.02] border border-white/5">
            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="inline-flex text-accent mb-6">
                  <CheckCircle size={64} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-light text-white mb-4">REQUEST RECEIVED</h3>
                <p className="text-secondary text-sm font-light mb-8">
                  Thank you. Our engineering team will review your requirements and contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 border border-white/20 text-white font-heading text-xs tracking-widest uppercase hover:bg-white hover:text-primary transition-colors duration-300"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <h3 className="text-2xl font-light text-white mb-2">
                  REQUEST A QUOTE
                </h3>

                {/* Row 1: Full Name and Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${formErrors.fullName ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm`}
                      placeholder="e.g. John Doe"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Company *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm"
                      placeholder="e.g. Acme Corp"
                    />
                    {formErrors.companyName && <p className="text-red-500 text-xs mt-1">{formErrors.companyName}</p>}
                  </div>
                </div>

                {/* Row 2: Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${formErrors.email ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm`}
                      placeholder="e.g. john@acme.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Phone *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${formErrors.phone ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm`}
                      placeholder="e.g. +91 98450 12345"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                {/* Row 3: Project Location and Service Required */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Project Location *</label>
                    <input
                      type="text"
                      name="projectLocation"
                      value={formData.projectLocation}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm"
                      placeholder="e.g. Mumbai, Maharashtra"
                    />
                    {formErrors.projectLocation && <p className="text-red-500 text-xs mt-1">{formErrors.projectLocation}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Service Required *</label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full bg-primary-light border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm appearance-none"
                    >
                      <option value="">Select Service Required</option>
                      <option value="Fabrication Works">Fabrication Works</option>
                      <option value="Erection Works">Erection & Installation Works</option>
                      <option value="Electrical Works">Electrical Works</option>
                      <option value="Medical Infrastructure">Medical Infrastructure Solutions</option>
                      <option value="Industrial Maintenance">Industrial Maintenance & Overhaul</option>
                      <option value="Other">Other Solutions</option>
                    </select>
                    {formErrors.serviceRequired && <p className="text-red-500 text-xs mt-1">{formErrors.serviceRequired}</p>}
                  </div>
                </div>

                {/* Row 4: Expected Timeline and Document Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Expected Timeline *</label>
                    <input
                      type="text"
                      name="expectedTimeline"
                      value={formData.expectedTimeline}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm"
                      placeholder="e.g. 3-4 months"
                    />
                    {formErrors.expectedTimeline && <p className="text-red-500 text-xs mt-1">{formErrors.expectedTimeline}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Document Upload (Optional)</label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        id="documentUpload"
                        name="documentUpload"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm"
                      />
                      {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
                      <p className="text-secondary text-xs font-light">
                        Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB)
                      </p>
                      {formData.documentUpload && (
                        <p className="text-secondary text-xs font-light mt-1">
                          Selected: {formData.documentUpload.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Description (Full width) */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-heading tracking-widest text-secondary uppercase">Project Description *</label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full bg-white/5 border ${formErrors.projectDetails ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm resize-y`}
                    placeholder="Describe your project requirements, scope, specifications, and any special considerations..."
                  />
                  {formErrors.projectDescription && <p className="text-red-500 text-xs mt-1">{formErrors.projectDescription}</p>}
                </div>

                {uploadError && <p className="text-red-500 text-xs mt-4">{uploadError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 bg-white text-primary font-heading tracking-widest uppercase text-sm font-medium flex items-center justify-center gap-3 hover:bg-white/90 transition-colors duration-300"
                >
                  {isSubmitting ? (
                    <>
                      Submitting... <Send size={16} />
                    </>
                  ) : (
                    <>
                      Submit Request <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;