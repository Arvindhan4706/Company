"use client";
import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRefs = useRef([]);
  const dustRef = useRef(null);

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
      animation: gsap.to(bgRef.current, { y: '30%', ease: 'none' }),
      scrub: true,
    });

    // Text Reveal Masking Animation
    gsap.fromTo(
      textRefs.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2,
      }
    );

    // Dust particles floating
    if (dustRef.current) {
      const particles = dustRef.current.children;
      gsap.utils.toArray(particles).forEach((particle) => {
        gsap.set(particle, {
          left: gsap.utils.random(0, 100) + '%',
          top: gsap.utils.random(0, 100) + '%',
          width: gsap.utils.random(1, 5) + 'px',
          height: gsap.utils.random(1, 5) + 'px',
        });
        
        gsap.to(particle, {
          y: `-=${gsap.utils.random(100, 200)}`,
          x: `+=${gsap.utils.random(-50, 50)}`,
          rotation: gsap.utils.random(-45, 45),
          opacity: gsap.utils.random(0.1, 0.4),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 5),
        });
      });
    }

    // Scroll indicator line
    gsap.fromTo('.scroll-indicator', 
      { height: 0, opacity: 0 }, 
      { height: 100, opacity: 1, duration: 1.5, delay: 1.5, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Parallax Background Image */}
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 right-0 bottom-0 z-0 h-[120%]" 
        style={{ top: '-10%' }}
      >
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
          alt="Precision Engineering"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
      </div>
      
      {/* Dramatic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary via-primary/60 to-primary/20 pointer-events-none" />

      {/* Floating Dust Particles */}
      <div ref={dustRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 blur-[1px] opacity-0"
          />
        ))}
      </div>

      <div className="container relative z-20 text-center px-4 max-w-5xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Subheadline / Intro */}
          <div className="overflow-hidden mb-6">
            <div 
              ref={(el) => (textRefs.current[0] = el)}
              className="font-heading uppercase tracking-widest text-sm text-secondary"
            >
              Precision Mechatronics
            </div>
          </div>

          {/* Epic Cinematic Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-heading font-light text-white leading-tight tracking-tighter mb-8">
            <div className="overflow-hidden">
              <span ref={(el) => (textRefs.current[1] = el)} className="block">Engineering</span>
            </div>
            <div className="overflow-hidden">
              <span ref={(el) => (textRefs.current[2] = el)} className="block text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                Perfection
              </span>
            </div>
          </h1>

          <div className="overflow-hidden mb-12">
            <p 
              ref={(el) => (textRefs.current[3] = el)}
              className="text-base md:text-xl text-secondary max-w-2xl mx-auto font-light leading-relaxed"
            >
              Advanced fabrication, industrial automation, and high-voltage infrastructure designed with surgical precision.
            </p>
          </div>

          {/* Minimalist CTA */}
          <div className="overflow-hidden">
            <button
              ref={(el) => (textRefs.current[4] = el)}
              onClick={() => handleScroll('about')}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-body tracking-widest uppercase text-sm rounded-full overflow-hidden hover:border-white/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-premium" />
              <span className="relative z-10 group-hover:text-primary transition-colors duration-500">Discover</span>
              <ArrowRight size={16} strokeWidth={1.5} className="relative z-10 group-hover:text-primary transition-colors duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator line */}
      <div className="scroll-indicator absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/50 to-transparent z-20" />
    </section>
  );
};

export default Hero;
