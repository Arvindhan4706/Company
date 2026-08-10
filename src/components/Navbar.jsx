"use client";
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
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

    // Scroll effect (transparent to dark solid/blurred background)
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      onEnter: () => {
        if (navRef.current) {
          navRef.current.classList.add('bg-primary/90', 'backdrop-blur-xl', 'border-b', 'border-white/5');
          gsap.to(navRef.current, { padding: '1rem 0', duration: 0.5, ease: 'power2.out' });
        }
      },
      onLeaveBack: () => {
        if (navRef.current) {
          navRef.current.classList.remove('bg-primary/90', 'backdrop-blur-xl', 'border-b', 'border-white/5');
          gsap.to(navRef.current, { padding: '2rem 0', duration: 0.5, ease: 'power2.out' });
        }
      }
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.fromTo(menuDrawerRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-nav-link',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gsap.to(menuDrawerRef.current, {
        yPercent: -100, opacity: 0, duration: 0.4, ease: 'power3.in'
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="container flex items-center justify-between mx-auto px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-heading font-light tracking-widest text-2xl text-white uppercase">
            Sterling
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
              <span className={`transition-colors duration-300 ${pathname === `/${link.id}` ? 'text-white' : 'text-secondary-300 hover:text-white'}`}>
                {link.name}
              </span>
              <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${pathname === `/${link.id}` ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}

        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white hover:text-accent transition-colors"
        >
          {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        ref={menuDrawerRef}
        className="absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-2xl border-b border-white/5 px-8 py-8 flex-col gap-6 -translate-y-full opacity-0 pointer-events-none lg:hidden"
        style={{ display: isOpen ? 'flex' : 'none', pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={`/${link.id}`}
            onClick={() => toggleMenu()}
            className="mobile-nav-link text-white font-light text-lg tracking-widest uppercase"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

// Navbar component for Sterling Industrial Solutions
export default Navbar;