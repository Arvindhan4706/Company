"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import TextReveal from './animations/TextReveal';

const Services = () => {
  const sectionRef = useRef(null);

  const services = [
    {
      id: '01',
      title: 'Heavy Structural Fabrication',
      description: 'End-to-end heavy metal and structural steel fabrication engineered for absolute structural integrity. We design, weld, and construct custom frameworks, industrial machinery platforms, and complex heavy piping systems tested to withstand extreme kinetic and thermal tolerances.',
      features: ['CNC Precision Machining', 'Certified TIG/MIG Welding', 'Industrial Boiler & Tank Fabrication', 'Non-Destructive Testing (NDT)']
    },
    {
      id: '02',
      title: 'Kinematic Erection & Installation',
      description: 'Safe, millwright-grade precision for onsite erection and alignment of heavy structural elements, overhead cranes, and rotating mechanical systems. We execute complex rigging and heavy-lifting protocols to ensure zero-variance alignment.',
      features: ['Heavy Machinery Rigging', 'Overhead Crane Alignment', 'Conveyor System Assembly', 'Vibration Analysis & Calibration']
    },
    {
      id: '03',
      title: 'Mechatronics & Electrical Automation',
      description: 'Complete high-voltage and low-voltage infrastructure solutions integrated with state-of-the-art industrial automation. We engineer power distribution networks designed to support heavy mechanical loads and autonomous robotics.',
      features: ['PLC Automation & SCADA', 'Motor Control Centers (MCC)', 'HT/LT Substation Design', 'Fail-safe Backup Grids']
    },
    {
      id: '04',
      title: 'Medical & Cleanroom Infrastructure',
      description: 'Highly specialized, clinically compliant engineering for healthcare environments. We deliver flawlessly audited fluid dynamics networks, ultra-sterile cleanrooms, and life-critical electrical integrations.',
      features: ['Medical Gas Pipeline Systems (MGPS)', 'ISO-Certified Modular Cleanrooms', 'Critical Care HVAC & Ventilation', 'Redundant Life-Safety Power Systems']
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
    <section ref={sectionRef} id="services" className="py-24 lg:py-40 bg-primary-light">
      <div className="container mx-auto px-8 max-w-7xl">
        
        <div className="max-w-3xl mb-24">
          <span className="services-header-badge inline-block text-secondary text-sm font-heading tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:top-1/2 after:-right-12 after:w-8 after:h-[1px] after:bg-secondary/50">
            Core Capabilities
          </span>
          <TextReveal as="h2" splitType="char" className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-white tracking-tight">
            Industrial Solutions
          </TextReveal>
        </div>

        <div className="border-t border-white/5">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-row group py-16 border-b border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="flex gap-6 items-baseline px-4">
                <span className="font-heading text-lg text-secondary-dark font-light transition-colors duration-500 group-hover:text-white/20">
                  {service.id}
                </span>
                <h3 className="text-3xl md:text-4xl font-heading font-light text-white tracking-tight">
                  {service.title}
                </h3>
              </div>
              
              <div className="px-4 lg:px-0">
                <p className="text-secondary text-lg font-light leading-relaxed mb-8 max-w-xl">
                  {service.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white text-sm font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
