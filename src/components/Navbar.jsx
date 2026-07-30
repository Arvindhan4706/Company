import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CMSContext } from '../context/CMSContext';

const Navbar = () => {
  const { introState } = useContext(CMSContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (!isHome) {
      navigate('/#' + sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Why Choose Us', id: 'why-choose-us' },
    { name: 'Industries', id: 'industries' },
    { name: 'Projects', id: 'projects' },
    { name: 'Quality & Safety', id: 'quality-safety' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '0.8rem 0' : '1.5rem 0',
        transition: 'all 0.4s ease',
        background: isScrolled ? 'rgba(7, 11, 19, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            id="navbar-logo-img"
            src="/images/logo.jpg"
            alt="Sterling Industrial Solutions LLP Logo"
            style={{
              height: '48px',
              borderRadius: '4px',
              backgroundColor: '#FFFFFF',
              padding: '4px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-menu">
          {isHome ? (
            navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}
              >
                {link.name}
              </button>
            ))
          ) : (
            <Link to="/" style={{ color: '#94A3B8', fontWeight: 500, fontSize: '0.9rem' }}>
              Home
            </Link>
          )}

          <Link
            to="/admin"
            className="btn btn-secondary"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Settings size={14} />
            Admin Panel
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white)',
            cursor: 'pointer',
            display: 'block',
          }}
          className="mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(7, 11, 19, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 999,
          }}
        >
          {isHome ? (
            navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textAlign: 'left',
                }}
              >
                {link.name}
              </button>
            ))
          ) : (
            <Link to="/" onClick={() => setIsOpen(false)} style={{ color: '#94A3B8', fontWeight: 600, fontSize: '1.1rem' }}>
              Home
            </Link>
          )}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.5rem',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <Settings size={16} />
            Admin Panel (CMS)
          </Link>
        </div>
      )}

      {/* Injecting media queries styles directly for navbar responsiveness */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
