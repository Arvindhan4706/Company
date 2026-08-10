"use client";

const TrustSection = () => {
  return (
    <section className="py-20 lg:py-24 bg-primary border-t border-white/5">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center text-center">
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-heading text-sm text-secondary-dark font-light tracking-widest uppercase">
              QUALITY MANAGEMENT
            </h3>
            <p className="text-base font-light text-white">
              ISO 9001:2015 Certified
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-heading text-sm text-secondary-dark font-light tracking-widest uppercase">
              SAFETY FIRST
            </h3>
            <p className="text-base font-light text-white">
              Safety-led Execution
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-heading text-sm text-secondary-dark font-light tracking-widest uppercase">
              PRECISION ENGINEERING
            </h3>
            <p className="text-base font-light text-white">
              Controlled Fabrication & Installation
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-heading text-sm text-secondary-dark font-light tracking-widest uppercase">
              PROJECT DELIVERY
            </h3>
            <p className="text-base font-light text-white">
              End-to-end Engineering Capability
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;