import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Play, Pause, Volume2, VolumeX, MonitorPlay } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log(err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(circle at center, rgba(15, 30, 60, 0.4) 0%, rgba(7, 11, 19, 0.95) 100%)',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '3rem',
      }}
    >
      {/* Background Image with Dark & Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/images/hero-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: -1,
        }}
      />
      
      {/* Decorative Grid Overlay for Modern Industrial Aesthetic */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          zIndex: -1,
        }}
      />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Side: Headline & Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ textAlign: 'left' }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="section-badge">
              Established 2026
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'var(--white)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              Engineering{' '}
              <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--white)' }}>Reliable</span> Solutions{' '}
              <br />
              for <span style={{ color: 'var(--accent)' }}>Industrial Growth</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                color: '#94A3B8',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
                maxWidth: '650px',
              }}
            >
              Delivering End-to-End Fabrication, Erection, Electrical, and Medical Infrastructure Solutions with Quality, Safety, and Excellence.
            </motion.p>

            {/* Sub-positioning tags from corporate logo */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '2.5rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1.5rem',
                maxWidth: '600px'
              }}
            >
              {['ENGINEERING', 'HYDRAULIC', 'DIESEL', 'INDUSTRIAL SERVICES'].map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#E2E8F0',
                    backgroundColor: 'rgba(21, 48, 91, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '0.4rem 1rem',
                    borderRadius: '4px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
            >
              <button
                onClick={() => handleScroll('contact')}
                className="btn btn-primary"
                style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}
              >
                Request a Quote
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => handleScroll('contact')}
                className="btn btn-secondary"
                style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}
              >
                Contact Our Team
                <Phone size={18} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Engineering Screen Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(7, 11, 19, 0.6)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {/* Video Cropping Box (Hides the watermark at the bottom of the video) */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                backgroundColor: '#070B13',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
              }}
            >
              <video
                ref={videoRef}
                src="/logo-reveal.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '115%', // Increased scale height to hide watermark completely
                  objectFit: 'cover',
                  transform: 'scale(1.15)', // Zoom to trim watermark
                  transformOrigin: 'center 20%', // Shift center up so bottom gets cropped out
                  display: 'block',
                }}
              />

              {/* Custom Overlay Controls */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  display: 'flex',
                  gap: '0.5rem',
                  zIndex: 10,
                }}
              >
                <button
                  onClick={togglePlay}
                  style={{
                    backgroundColor: 'rgba(7, 11, 19, 0.75)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--white)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                
                <button
                  onClick={toggleMute}
                  style={{
                    backgroundColor: 'rgba(7, 11, 19, 0.75)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--white)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Elegant Bottom Border Gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        }}
      />

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .hero-grid > div {
            text-align: center !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
