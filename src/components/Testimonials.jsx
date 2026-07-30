import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Sterling Industrial Solutions executed our manufacturing plant erection project ahead of schedule. Their rigging safety protocols and technical precision in machinery alignment were outstanding.",
    name: "Rajesh K. Sharma",
    role: "VP of Operations",
    company: "Vanguard Chemical Industries",
    rating: 5
  },
  {
    quote: "We partnered with Sterling for our hospital expansion wing. The execution of certified Medical Gas Pipeline Systems (MGPS) was clean, code-compliant, and audited perfectly on the first pass.",
    name: "Dr. Amit Varma",
    role: "Infrastructure Director",
    company: "Metro Care Healthcare Group",
    rating: 5
  },
  {
    quote: "Their electrical team upgraded our primary high-voltage substations and cable tray grids with zero impact on our existing operations. Professional execution from start to finish.",
    name: "Vikram Sengupta",
    role: "Project Manager",
    company: "Apex Automotive India",
    rating: 5
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  };

  const [[current, direction], setSlide] = useState([0, 0]);

  const paginate = (newDirection) => {
    const nextIndex = (current + newDirection + testimonials.length) % testimonials.length;
    setSlide([nextIndex, newDirection]);
  };

  const activeTestimonial = testimonials[current];

  return (
    <section id="testimonials" className="section section-bg-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Visual background details */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Read comments from project developers, plant managers, and healthcare operators who have worked with us.
          </p>
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', minHeight: '320px' }}>
          {/* Quote Icon Background */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '20px',
            opacity: 0.05,
            color: 'var(--white)',
            pointerEvents: 'none'
          }}>
            <Quote size={120} />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass-panel"
              style={{
                padding: '3.5rem 2.5rem',
                textAlign: 'center',
                background: 'rgba(21, 48, 91, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                lineHeight: 1.6,
                color: 'var(--white)',
                marginBottom: '2rem',
                fontWeight: 400,
                fontStyle: 'italic'
              }}>
                "{activeTestimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>
                  {activeTestimonial.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  {activeTestimonial.role} — <span style={{ fontWeight: 600, color: '#E2E8F0' }}>{activeTestimonial.company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider navigation arrows */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '2rem'
            }}
          >
            <button
              onClick={() => paginate(-1)}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.color = 'var(--white)';
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => paginate(1)}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.color = 'var(--white)';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
