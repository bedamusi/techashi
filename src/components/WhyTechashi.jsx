import React from 'react';
import { WHY_TECHASHI } from '../data/techashiData';
import { ShieldCheck, Award, Wrench, Layers, Tag, CheckCircle } from 'lucide-react';

export default function WhyTechashi({ onOpenQuote }) {
  const pillarIcons = [Layers, Award, ShieldCheck, Tag, Wrench];

  return (
    <section id="why-techashi" className="py-24 sm:py-32 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-blue mb-3">
            Why Choose Us
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-tight">
            BUILT FOR THE LONG RUN.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Five core principles that guide how Techashi delivers technology, protects your investment, and supports your team.
          </p>
        </div>

        {/* 5 Authentic Value Pillars Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-7">
          {WHY_TECHASHI.map((pillar, index) => {
            const Icon = pillarIcons[index] || ShieldCheck;
            return (
              <div
                key={pillar.id}
                className={`bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between group ${index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-heading font-extrabold text-brand-blue/20 group-hover:text-brand-blue/60 transition-colors">
                      {pillar.id}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue group-hover:bg-brand-soft-blue transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold tracking-widest uppercase text-brand-green">
                    {pillar.highlight}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mt-1.5 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-brand-blue">
                  <CheckCircle className="w-4 h-4 text-brand-green" />
                  <span>Techashi Standard</span>
                </div>
              </div>
            );
          })}

          {/* 6th Complementary Anchor Card */}
          <div className="md:col-span-2 lg:col-span-6 bg-gradient-to-br from-brand-navy to-brand-navy-deep rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between shadow-xl sm:flex-row sm:items-center sm:gap-10">
            <div className="max-w-3xl">
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-green">
                Our Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-2 leading-tight">
                Single Point of Accountability.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                When you partner with Techashi, you get honest advice, transparent pricing, verified hardware, and skilled technicians who stay engaged long after the job is complete.
              </p>
            </div>

            <div className="pt-6 sm:w-auto sm:shrink-0 sm:pt-0">
              <button
                onClick={onOpenQuote}
                className="w-full rounded-xl bg-brand-green py-3.5 px-6 text-xs font-heading font-bold text-brand-navy shadow-md transition-colors hover:bg-brand-green-hover sm:w-auto"
              >
                Experience the Difference
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
