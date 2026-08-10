"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);

  const services = [
    {
      id: '01',
      title: 'Structural Fabrication',
      description: 'Heavy structural steel fabrication, precision machining and custom industrial assemblies.',
      capabilities: [
        'CNC Machining',
        'MIG/TIG Welding',
        'Structural Steel',
        'Industrial Assemblies'
      ]
    },
    {
      id: '02',
      title: 'Equipment Erection',
      description: 'Mechanical installation, alignment, erection and commissioning of industrial equipment.',
      capabilities: [
        'Machine Installation',
        'Equipment Alignment',
        'Rigging',
        'Commissioning'
      ]
    },
    {
      id: '03',
      title: 'Electrical & Automation',
      description: 'Industrial electrical systems, control panels and automation integration.',
      capabilities: [
        'PLC',
        'SCADA',
        'Control Panels',
        'Industrial Networking'
      ]
    },
    {
      id: '04',
      title: 'Medical Infrastructure',
      description: 'Specialized infrastructure for healthcare and controlled environments.',
      capabilities: [
        'MGPS',
        'Cleanroom Infrastructure',
        'HVAC',
        'Medical Systems'
      ]
    }
  ];

  useGSAP(() => {
    // Header animation
    gsap.fromTo('.services-header-badge',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Staggered service rows
    const rows = gsap.utils.toArray('.service-row');
    rows.forEach((row, index) => {
      gsap.fromTo(row,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32 bg-primary border-t border-white/5">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="max-w-3xl mb-20 text-center">
          <span className="services-header-badge inline-block text-secondary text-sm font-heading tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:top-1/2 after:-right-12 after:w-8 after:h-[1px] after:bg-secondary/50">
            Our Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white tracking-tight">
            Precision Engineered Solutions
          </h2>
          <p className="text-lg text-secondary font-light leading-relaxed max-w-2xl mx-auto">
            Comprehensive industrial engineering services designed for demanding environments
          </p>
        </div>

        <div className="grid gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-row group flex flex-col bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Service Header */}
              <div className="flex gap-4 items-start p-6">
                <span className="font-heading text-lg text-secondary-dark font-light flex-shrink-0">
                  {service.id}
                </span>
                <div className="flex-1">
                  <h3 className="text-3xl font-heading font-light text-white tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-secondary text-base font-light leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {service.capabilities.map((capability, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-heading tracking-widest uppercase bg-white/[0.03] border border-white/10 rounded">
                        {capability}
                      </span>
                    ))}
                  </div>

                  {/* CTA with Arrow */}
                  <Link href="#contact" className="flex items-center gap-3 text-secondary-dark font-heading text-sm tracking-widest uppercase hover:text-white transition-colors duration-500">
                    Learn More
                    <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;