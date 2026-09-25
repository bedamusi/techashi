import React from 'react';
import { WORKFLOW_STEPS } from '../data/techashiData';
import { Compass, PenTool, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HowWeWork({ onOpenQuote }) {
  const stepIcons = [Compass, PenTool, CheckCircle2, ShieldCheck];

  return (
    <section className="py-24 sm:py-32 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-16 sm:mb-20 max-w-4xl text-center">
          <p className="text-xs font-heading font-bold uppercase tracking-widest text-brand-blue mb-3">
            Execution Process
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-[1.04] text-balance">
            TECHNOLOGY SHOULDN'T BE COMPLICATED.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
            From your initial inquiry to long-term maintenance, our straightforward engagement keeps your projects on schedule and within budget.
          </p>
        </div>

        {/* 4-Step Linear Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = stepIcons[index] || Compass;
            return (
              <div
                key={step.step}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-blue/30 group-hover:text-brand-blue transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-brand-soft-blue group-hover:text-brand-blue transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold tracking-widest uppercase text-brand-green">
                    Stage {step.step}
                  </span>
                  
                  <h3 className="text-xl font-heading font-bold text-brand-navy mt-1">
                    {step.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-700 mt-2 font-heading">
                    {step.heading}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-brand-blue transition-colors">
                  <span>Transparent Delivery</span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Action Prompt */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-heading font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <span>Start Step 01 With Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
