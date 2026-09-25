import React, { useState } from 'react';
import { WORK_PORTFOLIO } from '../data/techashiData';
import { ArrowUpRight, Network, ShieldCheck, Laptop, Globe, Cloud, Wrench } from 'lucide-react';

export default function OurWork({ onOpenQuote }) {
  const [filter, setFilter] = useState('All');

  const categoryIcons = {
    'Infrastructure': Network,
    'Security': ShieldCheck,
    'Hardware': Laptop,
    'Digital': Globe,
    'Cloud': Cloud,
    'Maintenance': Wrench,
  };

  const tags = ['All', 'Infrastructure', 'Security', 'Hardware', 'Digital', 'Cloud', 'Maintenance'];

  const filteredWork = filter === 'All' 
    ? WORK_PORTFOLIO 
    : WORK_PORTFOLIO.filter(w => w.tag === filter);

  return (
    <section id="our-work" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-blue mb-3">
              Portfolio
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-tight">
              SEE TECHNOLOGY IN ACTION.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore how Techashi implements structured cabling, high-definition security, hardware fleets, and cloud suites.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${
                  filter === t
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWork.map((project, idx) => {
            const Icon = categoryIcons[project.tag] || Network;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-slate-50 border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-premium hover:border-slate-300 transition-all duration-300"
              >
                {/* Visual Architectural Canvas */}
                <div className="aspect-[16/10] bg-gradient-to-br from-brand-navy to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden text-white">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/10 backdrop-blur-md text-brand-green">
                      {project.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:bg-brand-green group-hover:text-brand-navy transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-brand-green">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-slate-300 uppercase">{project.category}</p>
                      <p className="text-xs font-semibold text-white">Verified Deployment</p>
                    </div>
                  </div>

                  {/* Watermark Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-lg font-heading font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {project.scope}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Project Scope</span>
                    <button
                      onClick={onOpenQuote}
                      className="text-brand-blue font-semibold hover:underline"
                    >
                      Inquire Similar →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
