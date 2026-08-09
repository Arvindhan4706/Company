"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const SplashIntro = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after 0.8 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.1,
            x: '-45vw',
            y: '-45vh',
            transition: { duration: 1.2, ease: "easeInOut" }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#070B13',
            zIndex: 9999, // ensures it sits above everything
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Logo Reveal Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <motion.img
              src="/images/logo.jpg"
              alt="Sterling Industrial Solutions Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;
