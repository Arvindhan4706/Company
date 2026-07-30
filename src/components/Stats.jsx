import React, { useContext, useEffect, useState, useRef } from 'react';
import { CMSContext } from '../context/CMSContext';
import { motion, useInView } from 'framer-motion';

const CounterItem = ({ targetValue, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(targetValue, 10) || 0;
    if (end === 0) return;

    // Adjust duration based on value size
    const duration = 2; // seconds
    const totalFrames = 60 * duration;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad formula: progress * (2 - progress)
      const currentCount = Math.round(end * (progress * (2 - progress)));
      
      setCount(currentCount);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [targetValue, isInView]);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '1rem' }}>
      <div
        style={{
          fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
          fontWeight: 800,
          color: 'var(--accent)',
          fontFamily: 'var(--font-heading)',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#94A3B8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const { stats } = useContext(CMSContext);

  const statsItems = [
    { key: 'projectsCompleted', label: 'Projects Completed', value: stats.projectsCompleted, suffix: '+' },
    { key: 'industrialClients', label: 'Industrial Clients', value: stats.industrialClients, suffix: '+' },
    { key: 'serviceCategories', label: 'Service Categories', value: stats.serviceCategories, suffix: '' },
    { key: 'safetyCompliance', label: 'Safety Compliance', value: stats.safetyCompliance, suffix: '%' },
  ];

  return (
    <section
      id="statistics"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #070B13 0%, #0d1527 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        padding: '5rem 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {statsItems.map((item) => (
            <CounterItem
              key={item.key}
              targetValue={item.value}
              label={item.label}
              suffix={item.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
