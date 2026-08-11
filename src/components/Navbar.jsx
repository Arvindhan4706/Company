"use client";
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const menuDrawerRef = useRef(null);

  const navLinks = [
    { name: 'Home', id: '' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Industries', id: 'industries' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    // Scroll effect
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      onEnter: () => {
        if (navRef.current && !isOpen) {
          navRef.current.classList.add('bg-black/90', 'backdrop-blur-xl', 'border-b', 'border-white/5');
          gsap.to(navRef.current, { padding: '1rem 0', duration: 0.5, ease: 'power2.out' });
        }
      },
      onLeaveBack: () => {
        if (navRef.current && !isOpen) {
          navRef.current.classList.remove('bg-black/90', 'backdrop-blur-xl', 'border-b', 'border-white/5');
          gsap.to(navRef.current, { padding: '2rem 0', duration: 0.5, ease: 'power2.out' });
        }
      }
    });
  }, [isOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    
    // Toggle body scroll
    if (nextState) {
      document.body.style.overflow = 'hidden';
      // Animate menu in
      gsap.fromTo(menuDrawerRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-nav-link',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      // Animate menu out
      gsap.to(menuDrawerRef.current, {
        yPercent: -100, opacity: 0, duration: 0.5, ease: 'power3.in'
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${isOpen ? 'bg-black border-b border-white/5' : ''}`}
        style={{ padding: '2rem 0' }}
      >
        <div className="container flex items-center justify-between mx-auto px-8">
          <Link href="/" onClick={() => isOpen && toggleMenu()} className="flex items-center gap-3 relative z-[101]">
            <span className="font-heading font-light tracking-widest text-xl md:text-2xl text-white uppercase">
              MECELFAB
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/${link.id}`}
                className="relative group text-sm uppercase tracking-widest"
              >
                <span className={`transition-colors duration-300 ${pathname === `/${link.id}` ? 'text-white' : 'text-white/60 hover:text-white'}`}>
                  {link.name}
                </span>
                <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${pathname === `/${link.id}` ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
            
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black font-heading text-xs tracking-widest uppercase hover:bg-white/90 transition-colors"
            >
              Request a Service
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-[101] text-white hover:text-white/70 transition-colors p-2 -mr-2"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu Drawer */}
      <div
        ref={menuDrawerRef}
        className="fixed inset-0 bg-black z-[90] flex flex-col justify-center px-8 pb-10 opacity-0 pointer-events-none lg:hidden"
        style={{ display: isOpen ? 'flex' : 'none', pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/${link.id}`}
              onClick={() => toggleMenu()}
              className="mobile-nav-link text-white font-heading font-light text-3xl md:text-4xl tracking-wider uppercase border-b border-white/10 pb-4"
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            href="/contact"
            onClick={() => toggleMenu()}
            className="mobile-nav-link mt-8 flex items-center justify-between px-8 py-5 bg-white text-black font-heading font-medium text-sm tracking-widest uppercase"
          >
            Request a Service
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
