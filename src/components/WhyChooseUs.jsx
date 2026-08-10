"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ShieldAlert, Users, Calendar, Heart, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import TextReveal from './animations/TextReveal';

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  const reasons = [
    {
      icon: <CheckCircle size={20} className="text-white" />,
      title: 'Precision Quality Control',
      desc: 'We deploy strict Six Sigma inspection protocols and continuous Non-Destructive Testing (NDT) to ensure every weld, joint, and circuit operates reliably under maximum stress.'
    },
    {
      icon: <ShieldAlert size={20} className="text-white" />,
      title: 'Safety-Focused Approach',
      desc: 'Our kinematic jobsites follow ISO 45001 occupational health guidelines. We utilize predictive safety analysis to enhance safety in operational zones.'
    },
    {
      icon: <Users size={20} className="text-white" />,
      title: 'Elite Engineering Teams',
      desc: 'Our workforce consists of elite mechanical engineers, certified Master Riggers, coded TIG welders, and PLC automation specialists trained for critical environments.'
    },
    {
      icon: <Calendar size={20} className="text-white" />,
      title: 'Coordinated Delivery',
      desc: 'We use CPM/PERT algorithmic scheduling and real-time telemetry to coordinate multi-disciplinary workflows and track project milestones.'
    },
    {
      icon: <Heart size={20} className="text-white" />,
      title: 'Customized Solutions',
      desc: 'We engineer layouts, select materials, and design workflows specifically matched to your facility\'s operational requirements.'
    },
    {
      icon: <Lightbulb size={20} className="text-white" />,
      title: 'Advanced Automation',
      desc: 'We integrate legacy heavy machinery with modern IoT sensor grids, smart electrical panels, and predictive maintenance algorithms to future-proof your infrastructure.'
    }
  ];

  useGSAP(() => {
    // Parallax Background
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      animation: gsap.fromTo(bgRef.current, { y: '-10%' }, { y: '15%', ease: 'none' }),
      scrub: true,
    });

    // Staggered reveals for badge and subtitle
    gsap.fromTo('.wcu-header-element',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Staggered reveals for cards
    gsap.fromTo('.wcu-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: {
          trigger: '.wcu-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="why-choose-us" className="relative py-24 lg:py-40 bg-primary overflow-hidden">
      {/* Parallax Radial Glow Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 scale-150"
        style={{ background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.15) 0%, transparent 60%)' }}
      />

      <div className="container relative z-10 mx-auto px-8 max-w-7xl">
        <div className="max-w-3xl mb-20">
          <span className="wcu-header-element inline-block text-secondary text-sm font-heading tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:top-1/2 after:-right-12 after:w-8 after:h-[1px] after:bg-secondary/50">
            Why Choose Sterling
          </span>
          <div className="mb-8">
            <TextReveal as="h2" splitType="word" className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-white tracking-tight mb-2">
              Partnering in
            </TextReveal>
            <TextReveal as="h2" splitType="char" delay={0.2} className="text-4xl md:text-5xl lg:text-7xl font-heading font-light text-white tracking-tight italic font-serif opacity-90">
              Professionalism
            </TextReveal>
          </div>
          <p className="wcu-header-element text-lg text-secondary font-light leading-relaxed max-w-2xl">
            We deliver on our commitments. Our clients rely on our safety protocols, engineering excellence, and transparent client engagement.
          </p>
        </div>

        <div className="wcu-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="wcu-card group p-8 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col gap-6"
            >
              <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-colors duration-500">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-heading font-light text-white mb-3 tracking-wide">
                  {reason.title}
                </h3>
                <p className="text-secondary text-sm font-light leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
