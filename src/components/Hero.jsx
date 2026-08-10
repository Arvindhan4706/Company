"use client";
import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRefs = useRef([]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    // Parallax background
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      animation: gsap.to(bgRef.current, { y: '20%', ease: 'none' }),
      scrub: true,
    });

    // Text Reveal Masking Animation for headline and subtext
    gsap.fromTo(
      textRefs.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.3,
      }
    );

    // Subtle floating particles (less intense than before)
    if (bgRef.current) {
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full bg-white/10 blur-[0.5px]';
        particle.style.left = `${gsap.utils.random(0, 100)}%`;
        particle.style.top = `${gsap.utils.random(0, 100)}%`;
        particle.style.width = `${gsap.utils.random(1, 3)}px`;
        particle.style.height = `${gsap.utils.random(1, 3)}px`;

        bgRef.current.appendChild(particle);

        gsap.to(particle, {
          y: `-=${gsap.utils.random(80, 150)}`,
          x: `+=${gsap.utils.random(-40, 40)}`,
          rotation: gsap.utils.random(-30, 30),
          opacity: gsap.utils.random(0.05, 0.2),
          duration: gsap.utils.random(8, 15),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 5),
        });
      }
    }

    // CTA button pulse animation
    gsap.fromTo('.hero-cta-primary',
      { scale: 0.95, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 }
    );

    // Scroll indicator line
    gsap.fromTo('.scroll-indicator',
      { height: 0, opacity: 0 },
      { height: 100, opacity: 0.7, duration: 1.5, delay: 1.8, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Industrial Background Image */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
      >
        <Image
          src="/images/hero-bg.png"
          alt="Industrial engineering background"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Subheadline / Intro */}
        <div className="mb-8">
          <div
            ref={(el) => (textRefs.current[0] = el)}
            className="font-heading uppercase tracking-wider text-sm text-secondary-dark"
          >
            Sterling Industrial Solutions
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight tracking-tighter mb-6 mb-8 leading-[1.1]">
          <div className="overflow-hidden">
            <span ref={(el) => (textRefs.current[1] = el)} className="block">ENGINEERING</span>
          </div>
          <div className="overflow-hidden">
            <span ref={(el) => (textRefs.current[2] = el)} className="block">BUILT TO PERFORM.</span>
          </div>
        </h1>

        {/* Supporting Text */}
        <div className="mb-10">
          <p
            ref={(el) => (textRefs.current[3] = el)}
            className="text-base md:text-lg text-secondary-dark max-w-2xl mx-auto font-light leading-relaxed"
          >
            Precision fabrication, industrial automation, equipment erection and infrastructure solutions engineered for demanding environments.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Primary CTA: Request a Quote */}
          <Link
            href="/contact"
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-accent-blue/90 border border-accent-blue/80 text-white font-body tracking-widest uppercase text-sm rounded-full overflow-hidden hover:bg-accent/100 transition-all duration-500 hero-cta-primary"
          >
            <span className="relative z-10">REQUEST A QUOTE</span>
            <ArrowRight size={16} strokeWidth={1.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>

          {/* Secondary CTA: Explore Projects */}
          <Link
            href="/projects"
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-body tracking-widest uppercase text-sm rounded-full overflow-hidden hover:border-white/40 transition-all duration-500"
          >
            <span className="relative z-10">EXPLORE PROJECTS</span>
            <ArrowRight size={16} strokeWidth={1.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>

        {/* Scroll indicator line */}
        <div className="scroll-indicator absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/50 to-transparent z-20" />
      </div>
    </section>
  );
};

export default Hero;