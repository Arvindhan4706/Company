import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate backend submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        serviceRequired: 'Fabrication Works',
        projectDetails: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="section section-bg-light">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">Let's Build Together</h2>
          <p className="section-subtitle">
            Contact our project management team to discuss your engineering layouts, fabrication timelines, or request an initial project estimate.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="contact-layout"
        >
          {/* Contact Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--white)' }}>
                Sterling Industrial Solutions LLP
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <MapPin size={20} style={{ color: 'var(--accent)', marginTop: '0.25rem' }} />
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>ADDRESS</h4>
                    <p style={{ color: '#E2E8F0', fontSize: '0.95rem' }}>
                      Plot No. 45, Industrial Suburb, 2nd Phase,<br />
                      Peenya Industrial Area, Bengaluru, KA 560058
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <Phone size={20} style={{ color: 'var(--accent)', marginTop: '0.25rem' }} />
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>PHONE</h4>
                    <p style={{ color: '#E2E8F0', fontSize: '0.95rem' }}>
                      +91 80 4928 3000 / +91 98450 12345
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <Mail size={20} style={{ color: 'var(--accent)', marginTop: '0.25rem' }} />
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>EMAIL</h4>
                    <p style={{ color: '#E2E8F0', fontSize: '0.95rem' }}>
                      info@sterlingindustrial.com / projects@sterlingindustrial.com
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <Clock size={20} style={{ color: 'var(--accent)', marginTop: '0.25rem' }} />
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>BUSINESS HOURS</h4>
                    <p style={{ color: '#E2E8F0', fontSize: '0.95rem' }}>
                      Monday – Saturday: 08:30 AM – 06:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Styled Map Container */}
            <div
              style={{
                width: '100%',
                height: '250px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative'
              }}
            >
              {/* Using a clean dark styled OpenStreetMap iframe */}
              <iframe
                title="Sterling Industrial Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=250&amp;hl=en&amp;q=Peenya%20Industrial%20Area,%20Bengaluru+(Sterling%20Industrial%20Solutions%20LLP)&amp;t=m&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="glass-panel"
            style={{
              padding: '2.5rem',
              background: 'rgba(21, 48, 91, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.04)'
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ display: 'inline-flex', color: 'var(--accent)', marginBottom: '1.5rem' }}>
                  <CheckCircle size={64} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Inquiry Submitted Successfully</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '2rem' }}>
                  Thank you for contacting Sterling Industrial Solutions. Our regional project estimator will review your parameters and get in touch with your team shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.9rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--white)' }}>
                  Request a Quote / Consultation
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1.25rem',
                    marginBottom: '1.5rem'
                  }}
                  className="form-grid-2"
                >
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. John Doe"
                      style={{ borderColor: formErrors.fullName ? 'var(--error)' : '' }}
                    />
                    {formErrors.fullName && (
                      <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{formErrors.fullName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Acme Corp"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1.25rem',
                    marginBottom: '1.5rem'
                  }}
                  className="form-grid-2"
                >
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. john@acme.com"
                      style={{ borderColor: formErrors.email ? 'var(--error)' : '' }}
                    />
                    {formErrors.email && (
                      <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{formErrors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. +91 98450 12345"
                      style={{ borderColor: formErrors.phone ? 'var(--error)' : '' }}
                    />
                    {formErrors.phone && (
                      <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{formErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Service Required</label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="form-control"
                    style={{
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394A3B8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.25em'
                    }}
                  >
                    <option value="Fabrication Works">Fabrication Works</option>
                    <option value="Erection Works">Erection & Installation Works</option>
                    <option value="Electrical Works">Electrical Works</option>
                    <option value="Medical Infrastructure">Medical Infrastructure Solutions</option>
                    <option value="Industrial Maintenance">Industrial Maintenance & Overhaul</option>
                    <option value="Other">Other Solutions</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label">Project Details & Requirements *</label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Briefly describe your required work parameters, schedules, or specifications..."
                    style={{ borderColor: formErrors.projectDetails ? 'var(--error)' : '' }}
                  />
                  {formErrors.projectDetails && (
                    <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{formErrors.projectDetails}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}
                >
                  {isSubmitting ? (
                    'Processing Inquiry...'
                  ) : (
                    <>
                      Submit Request
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .form-grid-2 {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 992px) {
          .contact-layout {
            grid-template-columns: 1fr 1.25fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
