import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Hospital, Construction, Zap, Building2, HardHat, Warehouse, Landmark } from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      icon: <Factory size={28} />,
      title: 'Manufacturing Industries',
      desc: 'Process piping, heavy machine platforms, and industrial fabrication works.'
    },
    {
      icon: <Hospital size={28} />,
      title: 'Healthcare Facilities',
      desc: 'Certified medical gas piping systems, cleanrooms, and ward infrastructure.'
    },
    {
      icon: <Construction size={28} />,
      title: 'Construction Projects',
      desc: 'High-strength structural steel erection, roof trusses, and modular frames.'
    },
    {
      icon: <Zap size={28} />,
      title: 'Energy and Utilities',
      desc: 'Substations, transmission grid cable trays, and electrical layouts.'
    },
    {
      icon: <Building2 size={28} />,
      title: 'Commercial Infrastructure',
      desc: 'Techno-parks, glass-fronted offices, and architectural metal support systems.'
    },
    {
      icon: <HardHat size={28} />,
      title: 'Industrial Plants',
      desc: 'Full-scale erection, pipeline networks, and plant maintenance shutdowns.'
    },
    {
      icon: <Warehouse size={28} />,
      title: 'Warehouses & Logistics',
      desc: 'Wide-span steel portal frames, racking structures, and logistics yards.'
    },
    {
      icon: <Landmark size={28} />,
      title: 'Government Projects',
      desc: 'Public utility structures, medical wards, and grid-tier electrical works.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="industries" className="section section-bg-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Markets We Serve</span>
          <h2 className="section-title">Industries We Support</h2>
          <p className="section-subtitle">
            Providing custom, high-durability infrastructure and fabrication solutions designed for specialized sector regulations.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {industries.map((ind, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-panel"
              style={{
                position: 'relative',
                padding: '2rem',
                textAlign: 'left',
                background: 'linear-gradient(135deg, rgba(21, 48, 91, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                transition: 'var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                const overlay = e.currentTarget.querySelector('.glow-overlay');
                if (overlay) overlay.style.opacity = '0.15';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)';
                const overlay = e.currentTarget.querySelector('.glow-overlay');
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              {/* Radial glow effect */}
              <div
                className="glow-overlay"
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, var(--accent) 0%, transparent 60%)',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity 0.5s ease',
                  zIndex: 0
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  color: 'var(--accent)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(16, 185, 129, 0.15)'
                }}>
                  {ind.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--white)' }}>
                  {ind.title}
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
