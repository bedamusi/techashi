import React, { useState, useEffect } from 'react';
import { Users, Laptop, Database, Cpu, Building2, Sparkles } from 'lucide-react';

export default function CinematicBrandMoment() {
  const [activeElement, setActiveElement] = useState(0);

  const pillars = [
    { title: 'People', icon: Users, desc: 'Your team, clients, and students' },
    { title: 'Devices', icon: Laptop, desc: 'Laptops, PCs, cameras & gadgets' },
    { title: 'Data', icon: Database, desc: 'Secure cloud, storage & backups' },
    { title: 'Systems', icon: Cpu, desc: 'Networks, firewalls & M365 suites' },
    { title: 'Business', icon: Building2, desc: 'Growth, speed & customer trust' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveElement((prev) => (prev + 1) % pillars.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [pillars.length]);

  return (
    <section className="relative min-h-0 py-16 sm:py-32 sm:min-h-screen bg-brand-navy-deep text-white flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Subtle Gradient Blobs - Hidden or reduced on mobile to prevent GPU scroll lag */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 right-10 w-[300px] h-[300px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-green text-xs font-heading font-semibold tracking-widest uppercase mb-6 sm:mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Techashi Synergy</span>
        </div>

        {/* Master Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight leading-tight">
          WE CONNECT<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white/60">
            THE PIECES.
          </span>
        </h2>

        {/* Interactive Connection Strip */}
        <div className="mt-10 sm:mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-4 relative">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeElement === idx;
              return (
                <div
                  key={item.title}
                  onClick={() => setActiveElement(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
                    isActive
                      ? 'bg-brand-blue/40 border-brand-green/60 shadow-lg scale-102 sm:scale-105'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5 sm:mb-3 transition-colors ${
                    isActive ? 'bg-brand-green text-brand-navy shadow-glow-green' : 'bg-white/10 text-slate-300'
                  }`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-heading font-bold text-white">
                    {item.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-300 mt-1 leading-tight">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Climax Signature Statement */}
        <div className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-white/10 max-w-3xl mx-auto">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2 sm:mb-3">
            The Core Truth
          </p>
          <h3 className="text-xl sm:text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight leading-snug">
            EVERYTHING WORKS BETTER<br />
            WHEN IT WORKS TOGETHER.
          </h3>
          <p className="text-xs sm:text-base text-slate-400 mt-3 sm:mt-4 max-w-xl mx-auto font-normal leading-relaxed">
            Hardware without dependable cabling stalls. Great software without secure hardware falters. We unify every layer so your technology is an accelerator, never an obstacle.
          </p>
        </div>

      </div>

    </section>
  );
}
