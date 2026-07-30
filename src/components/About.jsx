import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Wrench, Users } from 'lucide-react';

const About = () => {
  const pillars = [
    {
      icon: <ShieldCheck size={28} className="icon-emerald" />,
      title: 'Reliability',
      desc: 'Count on us for robust and fail-safe structures engineered to stand the test of time under the most demanding conditions.',
    },
    {
      icon: <Award size={28} className="icon-emerald" />,
      title: 'Quality Assurance',
      desc: 'Adhering to strict international standards and comprehensive QA/QC inspection programs at every construction stage.',
    },
    {
      icon: <Wrench size={28} className="icon-emerald" />,
      title: 'Technical Expertise',
      desc: 'Backed by specialized engineers and highly skilled craftsmen utilizing state-of-the-art machinery and methods.',
    },
    {
      icon: <Users size={28} className="icon-emerald" />,
      title: 'Customer Satisfaction',
      desc: 'Fostering long-term partnerships through client-centric custom solutions, transparent reporting, and dedicated support.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="section section-bg-light">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem', alignItems: 'center' }} className="about-grid">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'left' }}
          >
            <div className="section-badge">Who We Are</div>
            <h2 className="section-title">
              Engineering Reliable Solutions <br />
              <span style={{ color: 'var(--accent)' }}>for Industrial Growth</span>
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 500 }}>
              Sterling Industrial Solutions LLP (established 2026) is a premier industrial engineering and infrastructure solutions partner.
            </p>
            <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
              We provide comprehensive, end-to-end services across industrial fabrication, structural erection, power distribution networks, and critical medical infrastructure. We bridge the gap between architectural plans and structural reality, implementing reliable infrastructure across India's manufacturing and healthcare sectors.
            </p>
            <p style={{ color: '#94A3B8', fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '1rem', margin: '2rem 0' }}>
              "Building Trust. Delivering Quality. Driving Progress." — This is our promise to every client and partner on every project we execute.
            </p>
          </motion.div>

          {/* Pillars Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="glass-panel hover-lift"
                style={{
                  padding: '2rem',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  background: 'rgba(15, 23, 42, 0.4)',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(16, 185, 129, 0.1)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{pillar.title}</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5 }}>{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .icon-emerald {
          color: var(--accent);
        }
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
