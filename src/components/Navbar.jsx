"use client";
import { useState, useRef } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const navRef = useRef(null);
  const menuDrawerRef = useRef(null);

  const navLinks = [
    { name: t('nav.home', 'Home'), id: '' },
    { name: t('nav.about', 'About'), id: 'about' },
    { name: t('nav.services', 'Services'), id: 'services' },
    { name: t('nav.industries', 'Industries'), id: 'industries' },
    { name: t('nav.projects', 'Projects'), id: 'projects' },
    { name: t('nav.contact', 'Contact Us'), id: 'contact' },
  ];

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    // Scroll effect (transparent to glassmorphism)
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      onEnter: () => {
        if (navRef.current) {
          navRef.current.classList.add('bg-primary/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
          gsap.to(navRef.current, { padding: '1rem 0', duration: 0.5, ease: 'power2.out' });
        }
      },
      onLeaveBack: () => {
        if (navRef.current) {
          navRef.current.classList.remove('bg-primary/80', 'backdrop-blur-xl', 'border-b', 'border-white/5');
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
      className="fixed top-0 left-0 right-0 z-50 py-8 transition-all duration-500"
    >
      <div className="container flex items-center justify-between mx-auto px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-heading font-light tracking-widest text-xl text-white uppercase">
            Sterling
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/${link.id}`}
              className="relative group text-sm uppercase tracking-widest"
            >
              <span className={`transition-colors duration-300 ${pathname === `/${link.id}` ? 'text-white' : 'text-secondary hover:text-white'}`}>
                {link.name}
              </span>
              <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${pathname === `/${link.id}` ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
          
          <div className="flex items-center gap-2 pl-6 border-l border-white/10 text-white">
            <Globe size={16} />
            <select 
              value={i18n.language} 
              onChange={changeLanguage}
              className="bg-transparent text-white border-none outline-none cursor-pointer text-sm font-light focus:ring-0 uppercase tracking-widest"
            >
              <option value="en" className="text-black">EN</option>
              <option value="es" className="text-black">ES</option>
              <option value="de" className="text-black">DE</option>
            </select>
          </div>
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

export default Navbar;
