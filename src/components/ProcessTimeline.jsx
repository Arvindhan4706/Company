"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessTimeline = () => {
  const containerRef = useRef(null);

  const stages = [
    {
      id: '01',
      title: 'Discover',
      description: 'Understand requirements, site conditions and project constraints.'
    },
    {
      id: '02',
      title: 'Engineer',
      description: 'Develop designs, calculations and execution plans.'
    },
    {
      id: '03',
      title: 'Fabricate',
      description: 'Precision fabrication under controlled processes.'
    },
    {
      id: '04',
      title: 'Install',
      description: 'Professional erection and equipment installation.'
    },
    {
      id: '05',
      title: 'Test',
      description: 'Inspection, testing and validation.'
    },
    {
      id: '06',
      title: 'Commission',
      description: 'Final commissioning and project handover.'
    }
  ];

  useGSAP(() => {
    // Header animation
    gsap.fromTo('.process-header-badge',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    );

    // Stage animations
    const stageElements = gsap.utils.toArray('.process-stage');
    stageElements.forEach((stage, index) => {
      gsap.fromTo(stage,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="process" className="py-24 lg:py-32 bg-primary-light border-t border-white/5">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="mb-20 text-center">
          <span className="process-header-badge inline-block text-secondary text-sm font-heading tracking-widest uppercase mb-6 relative after:content-[''] after:absolute after:top-1/2 after:-right-12 after:w-8 after:h-[1px] after:bg-secondary/50">
            Our Engineering Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white tracking-tight">
            From Concept to Commissioning
          </h2>
          <p className="text-lg text-secondary font-light leading-relaxed max-w-2xl mx-auto">
            A proven six-stage approach ensuring precision, safety, and successful project delivery
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - Mobile */}
          <div className="hidden lg:block absolute inset-0 w-[2px] bg-white/20"></div>
          {/* Horizontal Line - Desktop */}
          <div className="lg:hidden h-[2px] bg-white/20"></div>

          {/* Stages Container */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
              {stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="process-stage relative flex flex-col items-start px-4 py-8"
                >
                  {/* Stage Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-sm text-secondary-dark font-light w-8">
                      {stage.id}
                    </span>
                    <h3 className="text-xl font-heading font-light text-white">
                      {stage.title}
                    </h3>
                  </div>

                  {/* Stage Description */}
                  <p className="text-secondary text-sm font-light leading-relaxed text-center max-w-xs">
                    {stage.description}
                  </p>

                  {/* Connector Line (except for last stage) */}
                  {index < stages.length - 1 && (
                    <>
                      {/* Vertical connector - Mobile */}
                      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-0 w-[2px] h-[60px] bg-white/20"></div>
                      {/* Horizontal connector - Desktop */}
                      <div className="lg:hidden h-[2px] w-[120px] bg-white/20"></div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;