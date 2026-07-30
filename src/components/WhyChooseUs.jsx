import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldAlert, Users, Calendar, Heart, Lightbulb } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <CheckCircle size={24} style={{ color: 'var(--accent)' }} />,
      title: 'Quality-Driven Execution',
      desc: 'Zero tolerance for substandard workmanship. We deploy strict in-house inspection standards and structural verification procedures.'
    },
    {
      icon: <ShieldAlert size={24} style={{ color: 'var(--accent)' }} />,
      title: 'Safety-First Approach',
      desc: 'All projects are strictly planned and overseen under rigorous health and safety directives to ensure accident-free jobsites.'
    },
    {
      icon: <Users size={24} style={{ color: 'var(--accent)' }} />,
      title: 'Skilled Workforce',
      desc: 'Our staff consists of certified riggers, coded welders, electrical supervisors, and engineers trained in specialized services.'
    },
    {
      icon: <Calendar size={24} style={{ color: 'var(--accent)' }} />,
      title: 'On-Time Project Delivery',
      desc: 'Utilizing strict CPM/PERT scheduling and real-time reporting to guarantee construction milestones are hit right on target.'
    },
    {
      icon: <Heart size={24} style={{ color: 'var(--accent)' }} />,
      title: 'Customer-Centric Solutions',
      desc: 'We tailor our layouts, material specifications, and installation workflows to align with our clients budgetary and schedule goals.'
    },
    {
      icon: <Lightbulb size={24} style={{ color: 'var(--accent)' }} />,
      title: 'Innovative Engineering',
      desc: 'Leveraging structural software planning, modular pre-fabrication, and advanced electrical/medical test equipment.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="why-choose-us" className="section section-bg-light">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Why Choose Sterling</span>
          <h2 className="section-title">Partnering in Professionalism</h2>
          <p className="section-subtitle">
            We deliver on our commitments. Our clients rely on our safety protocols, engineering excellence, and transparent client engagement.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-panel"
              style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '2rem',
                textAlign: 'left',
                background: 'rgba(15, 23, 42, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                transition: 'var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                flexShrink: 0,
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {reason.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--white)' }}>
                  {reason.title}
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
