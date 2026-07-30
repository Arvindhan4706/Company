import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowUpRight, Zap, HeartPulse, HardHat } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Wrench size={32} style={{ color: 'var(--accent)' }} />,
      title: 'Fabrication Works',
      description: 'End-to-end heavy metal and structural steel fabrication services. We build custom-engineered building frameworks, industrial machinery platforms, heavy piping systems, ducting networks, and specialized metal enclosures. All components undergo rigorous ultrasonic and magnetic particle quality testing.',
      bullets: ['Heavy Structural Steelwork', 'Custom Machinery Platforms', 'Piping & Vessel Fabrication', 'Pressure Vessel Welding']
    },
    {
      icon: <HardHat size={32} style={{ color: 'var(--accent)' }} />,
      title: 'Erection & Installation Works',
      description: 'Safe and precise onsite erection and alignment of heavy structural elements, overhead cranes, manufacturing equipment, and mechanical systems. Our rigging experts and engineers ensure that all equipment is placed, balanced, and secured to millwright-grade tolerances.',
      bullets: ['Structural Columns & Trusses', 'Equipment & Machinery Rigging', 'Millwright Alignment Services', 'High-Rise Steel Erection']
    },
    {
      icon: <Zap size={32} style={{ color: 'var(--accent)' }} />,
      title: 'Electrical Works',
      description: 'Comprehensive industrial and commercial electrical contracting. We install high-voltage and low-voltage substations, main distribution boards, motor control centers (MCC), cable tray grids, cable terminations, facility illumination, and state-of-the-art automation systems.',
      bullets: ['Power Distribution Substations', 'Motor Control Centers (MCC)', 'Industrial Cable Trays & Routing', 'Emergency Generator Systems']
    },
    {
      icon: <HeartPulse size={32} style={{ color: 'var(--accent)' }} />,
      title: 'Medical Infrastructure Solutions',
      description: 'Highly specialized, compliant clinical and healthcare engineering. We design and install certified Medical Gas Pipeline Systems (MGPS), medical-grade air Compressors, vacuum stations, modular ICU/OT cleanrooms, ceiling pendants, and backup nurse call electrical integration.',
      bullets: ['Medical Gas Pipeline Systems (MGPS)', 'Sterile ICU & OT Cleanrooms', 'Anesthesia Scavenging Systems', 'Pendant & Ward Utilities Setup']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="section section-bg-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Core Capabilities</span>
          <h2 className="section-title">Professional Industrial Solutions</h2>
          <p className="section-subtitle">
            Providing integrated, engineering-led infrastructure and construction services across diverse industrial sectors.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-panel hover-lift"
              style={{
                padding: '2.5rem',
                textAlign: 'left',
                background: 'rgba(21, 48, 91, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }} className="card-top-accent" />

              <div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(16, 185, 129, 0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(16, 185, 129, 0.15)'
                }}>
                  {service.icon}
                </div>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {service.title}
                </h3>

                <p style={{ color: '#94A3B8', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {service.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem', marginTop: 'auto' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} style={{ color: '#E2E8F0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .glass-panel:hover .card-top-accent {
          background-color: var(--accent) !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Services;
