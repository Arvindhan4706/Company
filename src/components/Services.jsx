"use client";
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight, Wrench, Hammer, Droplets, Zap, Clock, Battery, Wind, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    icon: Hammer,
    title: 'Industrial Erection',
    slug: 'industrial-erection',
    description: 'Industrial equipment erection, installation, alignment and commissioning support.',
    capabilities: ['Equipment Erection', 'Machinery Installation', 'Structural Erection', 'Alignment'],
  },
  {
    id: '02',
    icon: Wrench,
    title: 'Industrial Fabrication',
    slug: 'industrial-fabrication',
    description: 'Industrial fabrication and custom mechanical fabrication services.',
    capabilities: ['Structural Fabrication', 'Industrial Assemblies', 'Welding', 'Mechanical Fabrication'],
  },
  {
    id: '03',
    icon: Droplets,
    title: 'Hydraulic & Pneumatic System Overhauling',
    slug: 'hydraulic-pneumatic-overhauling',
    description: 'Inspection, servicing, troubleshooting and overhauling of hydraulic and pneumatic systems.',
    capabilities: ['Hydraulic Systems', 'Pneumatic Systems', 'Cylinders', 'Valves'],
  },
  {
    id: '04',
    icon: Zap,
    title: 'Industrial Generator Spare Parts',
    slug: 'generator-spare-parts',
    description: 'Supply of genuine spare parts for industrial generators.',
    capabilities: ['Engine Components', 'Filters', 'Electrical Components', 'Fuel System'],
  },
  {
    id: '05',
    icon: Clock,
    title: 'AMC — Annual Maintenance Contract',
    slug: 'amc-maintenance',
    description: 'Annual maintenance and service contracts for industrial equipment and generator systems.',
    capabilities: ['Preventive Maintenance', 'Scheduled Inspections', 'Breakdown Support', 'Service Visits'],
  },
  {
    id: '06',
    icon: Battery,
    title: 'Industrial Generator Rental',
    slug: 'generator-rental',
    description: 'Industrial generator rental services for temporary and emergency power requirements.',
    capabilities: ['Generator Rental', 'Temporary Power', 'Industrial Applications', 'Installation Support'],
  },
  {
    id: '07',
    icon: Wind,
    title: 'Air Compressor Rental',
    slug: 'air-compressor-rental',
    description: 'Air compressor rental services for industrial and construction requirements.',
    capabilities: ['Compressor Rental', 'Temporary Air Supply', 'Industrial Site Support'],
  },
  {
    id: '08',
    icon: Settings,
    title: 'Turbocharger Services',
    slug: 'turbocharger-services',
    description: 'Turbocharger inspection, servicing, repair and overhauling for industrial engines.',
    capabilities: ['Inspection', 'Servicing', 'Overhauling', 'Component Replacement'],
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useGSAP(() => {
    gsap.fromTo('.svc-eyebrow',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
    gsap.fromTo('.svc-heading',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
    gsap.fromTo('.svc-row',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-list', start: 'top 85%' },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="py-28 lg:py-36 bg-black border-t border-white/5">
      <div className="container mx-auto px-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="svc-eyebrow flex items-center gap-3 mb-5 opacity-0">
              <div className="w-5 h-[1px] bg-white/30" />
              <span className="text-white/40 text-[10px] font-heading tracking-[0.3em] uppercase">Our Capabilities</span>
            </div>
            <h2 className="svc-heading text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white tracking-tight leading-tight opacity-0">
              Eight Disciplines.<br />
              <span className="text-white/35 italic font-serif">One Partner.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="svc-eyebrow group self-start md:self-end inline-flex items-center gap-3 px-6 py-3 border border-white/15 text-white/50 font-heading text-xs tracking-[0.2em] uppercase hover:border-white/40 hover:text-white transition-all duration-300 opacity-0"
          >
            View All Services
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Services List */}
        <div className="svc-list flex flex-col">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredId === service.id;
            return (
              <div
                key={service.id}
                className="svc-row group border-t border-white/5 last:border-b opacity-0"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex items-stretch gap-0 py-7 transition-all duration-500">

                  {/* Number */}
                  <div className="w-16 flex-shrink-0 flex items-start pt-1">
                    <span className="text-xs font-heading text-white/20 group-hover:text-white/50 transition-colors duration-500 tracking-widest">
                      {service.id}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 flex-shrink-0 flex items-start pt-0.5">
                    <div className="w-9 h-9 flex items-center justify-center border border-white/8 group-hover:border-white/25 bg-white/[0.02] group-hover:bg-white/[0.06] transition-all duration-500">
                      <Icon size={15} className="text-white/35 group-hover:text-white/80 transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-heading font-light text-white/70 group-hover:text-white tracking-tight mb-2 transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/30 group-hover:text-white/55 font-light leading-relaxed max-w-lg transition-colors duration-500">
                        {service.description}
                      </p>
                    </div>

                    {/* Tags — show on hover */}
                    <div className={`hidden md:flex flex-wrap gap-2 items-start max-w-xs transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      {service.capabilities.map((cap) => (
                        <span key={cap} className="px-2.5 py-1 text-[10px] font-heading tracking-widest uppercase border border-white/10 text-white/40">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow CTA */}
                  <div className="flex-shrink-0 flex items-center pl-8">
                    <Link
                      href="/contact"
                      className={`flex items-center justify-center w-10 h-10 border border-white/10 group-hover:border-white/40 group-hover:bg-white group-hover:text-black text-white/30 transition-all duration-500`}
                    >
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;