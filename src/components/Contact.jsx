"use client";
import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
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
    serviceRequired: 'Fabrication Works',
    projectDetails: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number format';
    }
    if (!formData.projectDetails.trim()) errors.projectDetails = 'Project details are required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
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
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          company: formData.companyName,
          message: formData.projectDetails,
          service: formData.serviceRequired
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          serviceRequired: 'Fabrication Works',
          projectDetails: ''
        });
      }
    } catch (error) {
      console.error('Network error', error);
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
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-white tracking-tight mb-6">
            Let's Build Together
          </h2>
          <p className="text-lg text-secondary font-light leading-relaxed max-w-2xl">
            Contact our project management team to discuss your engineering layouts, fabrication timelines, or request an initial project estimate.
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
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">ADDRESS</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      Plot No. 45, Industrial Suburb, 2nd Phase,<br />
                      Peenya Industrial Area, Bengaluru, KA 560058
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">PHONE</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      +91 80 4928 3000 / +91 98450 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">EMAIL</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      info@sterlingindustrial.com<br/>projects@sterlingindustrial.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest mb-1">BUSINESS HOURS</h4>
                    <p className="text-white/80 text-sm font-light leading-relaxed">
                      Monday – Saturday: 08:30 AM – 06:00 PM (IST)
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
                <h3 className="text-2xl font-light text-white mb-4">Inquiry Submitted Successfully</h3>
                <p className="text-secondary text-sm font-light mb-8">
                  Thank you for contacting Sterling Industrial Solutions. Our regional project estimator will review your parameters and get in touch with your team shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 border border-white/20 text-white font-heading text-xs tracking-widest uppercase hover:bg-white hover:text-primary transition-colors duration-300"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <h3 className="text-2xl font-light text-white mb-2">
                  Request a Quote
                </h3>

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
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading tracking-widest text-secondary uppercase">Company</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                </div>

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
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-heading tracking-widest text-secondary uppercase">Service Required</label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full bg-primary-light border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm appearance-none"
                  >
                    <option value="Fabrication Works">Fabrication Works</option>
                    <option value="Erection Works">Erection & Installation Works</option>
                    <option value="Electrical Works">Electrical Works</option>
                    <option value="Medical Infrastructure">Medical Infrastructure Solutions</option>
                    <option value="Industrial Maintenance">Industrial Maintenance & Overhaul</option>
                    <option value="Other">Other Solutions</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-heading tracking-widest text-secondary uppercase">Requirements *</label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full bg-white/5 border ${formErrors.projectDetails ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 focus:outline-none focus:border-white/30 transition-colors font-light text-sm resize-y`}
                    placeholder="Briefly describe your required work parameters, schedules, or specifications..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 bg-white text-primary font-heading tracking-widest uppercase text-sm font-medium flex items-center justify-center gap-3 hover:bg-white/90 transition-colors duration-300"
                >
                  {isSubmitting ? 'Processing...' : (
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
