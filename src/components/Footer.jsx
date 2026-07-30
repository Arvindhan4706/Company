import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#070B13',
        color: '#94A3B8',
        padding: '5rem 0 2rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'left'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <img
                src="/images/logo.jpg"
                alt="Sterling Industrial Solutions LLP Logo"
                style={{
                  height: '52px',
                  borderRadius: '4px',
                  backgroundColor: '#FFFFFF',
                  padding: '4px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Engineering reliable solutions for industrial growth. Serving fabrication, erection, power distribution, and clinical medical utility setups across India.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = '#94A3B8';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = '#94A3B8';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = '#94A3B8';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
              Navigation Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => handleNavClick('about')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  About Company
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Core Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('why-choose-us')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Why Choose Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('industries')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Industries We Serve
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('projects')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Featured Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Industry Services */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
              Services Details
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Industrial Fabrication
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Equipment Erection
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Electrical Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Medical Piping Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('quality-safety')} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                  Quality & Safety Audits
                </button>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
              Regulatory Indices
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ padding: '0.5rem 0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <div style={{ color: 'var(--white)', fontWeight: 600 }}>ISO 9001:2015</div>
                <div>Quality Management Certified</div>
              </div>
              <div style={{ padding: '0.5rem 0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                <div style={{ color: 'var(--white)', fontWeight: 600 }}>ISO 45001:2018</div>
                <div>Occupational Health & Safety</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Sterling Industrial Solutions LLP. All rights reserved. Registered Office Peenya, Bengaluru.
          </div>
          <button
            onClick={handleScrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              color: 'var(--white)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)')}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
