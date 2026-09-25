import React from 'react';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function FinalCTA({ onOpenQuote }) {
  return (
    <section className="py-16 sm:py-36 bg-brand-navy-deep text-white relative overflow-hidden">
      
      {/* Background Glow Accents - Desktop only to preserve mobile 60fps scrolling */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-blue/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-brand-green/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Architectural Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-green text-xs font-heading font-semibold tracking-widest uppercase mb-6 sm:mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your Project</span>
        </div>

        {/* Master Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight leading-tight">
          TECHNOLOGY SHOULD<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-white to-slate-200">
            MOVE YOU FORWARD.
          </span>
        </h2>

        {/* Preserved Authentic Copy */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          From technology products and infrastructure to digital solutions and professional IT services, Techashi helps individuals and businesses find the right technology for their needs.
        </p>

        {/* CTAs */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-brand-green hover:bg-brand-green-hover text-brand-navy font-heading font-bold text-sm transition-all duration-200 shadow-glow-green hover:scale-102 active:scale-98"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-heading font-semibold text-sm transition-all duration-200 backdrop-blur-sm active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-brand-green" />
            <span>TALK TO TECHASHI</span>
          </button>
        </div>

        {/* Secondary assurance */}
        <div className="mt-8 sm:mt-12 text-[11px] sm:text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <span>✓ Free Initial Consultation</span>
          <span>✓ Certified Technicians</span>
          <span>✓ Transparent Proposals</span>
        </div>

      </div>
    </section>
  );
}
