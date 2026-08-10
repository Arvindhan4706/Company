"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

import TextReveal from './animations/TextReveal';

const Industries = () => {
  const containerRef = useRef(null);

  const industries = [
    {
      id: '01',
      title: 'Manufacturing',
      desc: 'Precision fabrication, machine foundations, automation and industrial infrastructure.',
      image: '/images/project-fabrication.png', // Using fabrication project image as representative
      capabilities: [
        'Precision Fabrication',
        'Machine Foundations',
        'Automation',
        'Industrial Infrastructure'
      ]
    },
    {
      id: '02',
      title: 'Energy',
      desc: 'Industrial structures, equipment installation and supporting infrastructure.',
      image: '/images/project-electrical.png', // Using electrical project image
      capabilities: [
        'Substation Erection',
        'Transmission Lines',
        'Power Distribution',
        'Renewable Energy Structures'
      ]
    },
    {
      id: '03',
      title: 'Healthcare',
      desc: 'Medical infrastructure, cleanroom systems and specialized installations.',
      image: '/images/project-medical.png', // Using medical project image
      capabilities: [
        'Medical Gas Systems',
        'Cleanroom Installation',
        'HVAC for Healthcare',
        'Pipeline Systems'
      ]
    },
    {
      id: '04',
      title: 'Construction',
      desc: 'Structural fabrication and mechanical/electrical infrastructure.',
      image: '/images/project-erection.png', // Using erection project image
      capabilities: [
        'Structural Steel Erection',
        'Roof Trusses',
        'Modular Construction',
        'Mechanical Installation'
      ]
    },
    {
      id: '05',
      title: 'Logistics',
      desc: 'Industrial facilities, equipment installation and warehouse infrastructure.',
      image: '/images/project-maintenance.png', // Using maintenance project image (logistics facilities)
      capabilities: [
        'Warehouse Structures',
        'Racking Systems',
        'Portal Frames',
        'Material Handling Systems'
      ]
    },
    {
      id: '06',
      title: 'Commercial',
      desc: 'Specialized engineering and infrastructure solutions.',
      image: '/images/project-commercial.png', // Using commercial project image
      capabilities: [
        'Architectural Steel',
        'Glass Support Systems',
        'Facade Engineering',
        'Custom Fabrication'
      ]
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
            <div key={index} className="ind-card group flex flex-col bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-500">
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-primary-light">
                <Image
                  src={ind.image}
                  alt={`${ind.title} industry`}
                  fill
                  className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-primary/90 border border-white/10 text-white px-3 py-1 text-xs font-heading tracking-widest uppercase z-20 backdrop-blur-md">
                  {ind.id}
                </span>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-light text-white mb-3">
                  {ind.title}
                </h3>
                <p className="text-secondary text-sm flex-grow leading-relaxed mb-4">
                  {ind.desc}
                </p>

                {/* Capability Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {ind.capabilities.map((capability, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-heading tracking-widest uppercase bg-white/[0.03] border border-white/10 rounded">
                      {capability}
                    </span>
                  ))}
                </div>

                {/* Explore Button */}
                <a href="/projects" className="self-start text-secondary-dark font-heading text-sm tracking-widest uppercase hover:text-white transition-colors duration-500">
                  Explore {ind.title.toLowerCase()} Projects
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;