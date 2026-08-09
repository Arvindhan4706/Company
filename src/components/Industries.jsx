"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import TextReveal from './animations/TextReveal';

const Industries = () => {
  const containerRef = useRef(null);

  const industries = [
    {
      id: '01',
      title: 'Manufacturing',
      desc: 'Process piping, heavy machine platforms, and industrial fabrication works engineered for efficiency.'
    },
    {
      id: '02',
      title: 'Healthcare',
      desc: 'Certified medical gas piping systems, cleanrooms, and critical ward infrastructure.'
    },
    {
      id: '03',
      title: 'Construction',
      desc: 'High-strength structural steel erection, roof trusses, and modular frames.'
    },
    {
      id: '04',
      title: 'Energy',
      desc: 'Substations, transmission grid cable trays, and electrical layouts for utilities.'
    },
    {
      id: '05',
      title: 'Commercial',
      desc: 'Techno-parks, glass-fronted offices, and architectural metal support systems.'
    },
    {
      id: '06',
      title: 'Logistics',
      desc: 'Wide-span steel portal frames, racking structures, and logistics yards.'
    }
  ];

  useGSAP(() => {
    // Header reveal
    gsap.fromTo('.ind-header-badge',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    );

    // Cards staggered reveal
    gsap.fromTo('.ind-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: {
          trigger: '.ind-grid',
          start: 'top 85%'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="industries" className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="max-w-3xl mb-20">
          <span className="ind-header-badge inline-block text-secondary text-sm font-heading tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:top-1/2 after:-right-12 after:w-8 after:h-[1px] after:bg-secondary/50">
            Markets We Serve
          </span>
          <TextReveal as="h2" splitType="char" className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-white tracking-tight">
            Industries
          </TextReveal>
        </div>

        <div className="ind-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 border-t border-white/5 pt-16">
          {industries.map((ind, index) => (
            <div key={index} className="ind-card flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-heading text-sm text-secondary-dark font-light">
                  {ind.id}
                </span>
                <h3 className="text-2xl font-light text-white">
                  {ind.title}
                </h3>
              </div>
              <p className="text-secondary text-sm md:text-base leading-relaxed font-light">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
