"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import TextReveal from './animations/TextReveal';

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray('.about-animate');
    
    gsap.fromTo(elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-primary border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-8 max-w-4xl text-center">
        
        <div className="about-animate inline-block text-secondary text-sm font-heading tracking-widest uppercase mb-8 relative after:content-[''] after:absolute after:top-1/2 after:-right-12 after:w-8 after:h-[1px] after:bg-secondary/50">
          Our Foundation
        </div>
        
        <h2 className="about-animate text-3xl md:text-5xl lg:text-6xl font-heading font-light text-white leading-tight tracking-tight mb-12">
          Precision engineering for a <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-secondary">kinetic world</span>.
        </h2>

        <TextReveal 
          as="p" 
          delay={0.1}
          className="text-lg md:text-xl text-secondary font-light leading-relaxed mb-8 max-w-3xl mx-auto"
        >
          Sterling Industrial Solutions LLP is a premier industrial engineering and infrastructure solutions partner. Founded by leading mechanical and mechatronics engineers, we specialize in the intersection of heavy structural fabrication, automated systems, and high-precision electromechanical integration.
        </TextReveal>

        <TextReveal 
          as="p" 
          delay={0.2}
          className="text-lg md:text-xl text-secondary font-light leading-relaxed mb-16 max-w-3xl mx-auto"
        >
          Our expertise spans end-to-end heavy metal fabrication, rigorous structural erection, high-voltage power distribution networks, and the integration of highly complex, compliant medical pipeline systems. We do not just build facilities; we engineer automated, fault-tolerant ecosystems designed to maximize uptime and operational efficiency for the most demanding industries.
        </TextReveal>
        
        <div className="about-animate text-white text-base md:text-lg font-light uppercase tracking-widest border-y border-white/10 py-8 mt-16">
          Building Trust. Delivering Quality. Driving Progress.
        </div>

      </div>
    </section>
  );
};

export default About;
