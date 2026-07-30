import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Shield, ClipboardCheck, AlertTriangle } from 'lucide-react';

const QualitySafety = () => {
  const complianceCards = [
    {
      icon: <FileCheck size={28} style={{ color: 'var(--accent)' }} />,
      title: 'Industry Standards Compliance',
      desc: 'All engineering blueprints, welding procedures (WPS), and fabrications are executed to meet international ISO and structural steel standards.'
    },
    {
      icon: <Shield size={28} style={{ color: 'var(--accent)' }} />,
      title: 'Safety Protocol Management',
      desc: 'We mandate personal protective equipment (PPE), standard hazard analysis briefings before shifts, and regular site safety compliance audits.'
    },
    {
      icon: <ClipboardCheck size={28} style={{ color: 'var(--accent)' }} />,
      title: 'Quality Inspection Systems',
      desc: 'Integrating rigorous ultrasonic, dye-penetrant, and magnetic particle non-destructive testing (NDT) to audit welding joints.'
    },
    {
      icon: <AlertTriangle size={28} style={{ color: 'var(--accent)' }} />,
      title: 'Risk Assessment Procedures',
      desc: 'Developing method statements and detailed rigging risk assessments (HIRA) for heavy lifting, erection, and complex system installations.'
    }
  ];

  return (
    <section id="quality-safety" className="section section-bg-dark" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem', alignItems: 'center' }} className="qs-grid">
          {/* Text panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'left' }}
          >
            <div className="section-badge">Zero Compromise</div>
            <h2 className="section-title">Committed to Quality & Safety Excellence</h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              At Sterling Industrial Solutions LLP, quality execution and industrial health and safety are core corporate values, not optional checkboxes.
            </p>
            <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
              We enforce an environment of high discipline across fabrication yards and field job sites. Our engineers work hand-in-hand with safety inspectors to ensure all construction works conform to safety indices, reducing risk exposure and ensuring perfect structural compliance.
            </p>

            <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>100%</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', tracking: '0.1em' }}>Safety Adherence</div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>Zero</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', tracking: '0.1em' }}>LTI Incidents</div>
              </div>
            </div>
          </motion.div>

          {/* Cards panel */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {complianceCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  textAlign: 'left',
                  background: 'rgba(21, 48, 91, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.background = 'rgba(21, 48, 91, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.background = 'rgba(21, 48, 91, 0.1)';
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--white)' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .qs-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default QualitySafety;
