import React from 'react';

export default function Hero({ onOpenQuote }) {
  return (
    <section className="relative w-full min-h-[92svh] bg-[#fbfbfd] text-brand-charcoal overflow-hidden pt-20 sm:pt-24 pb-0 flex flex-col items-center justify-between">
      
      {/* Apple Marquee Header (Matches exact Apple 64px / 48px / 36px typography scale) */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center shrink-0 pt-1 sm:pt-2">
        
        {/* Eyebrow */}
        <h2 className="text-[14px] sm:text-[17px] md:text-[19px] font-heading font-semibold text-[#1d1d1f] tracking-tight">
          Techashi Solutions
        </h2>

        {/* Main Headline */}
        <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-heading font-bold text-[#1d1d1f] tracking-[-0.015em] leading-[1.0625] mt-1 sm:mt-1.5">
          Hello, Techashi.
        </h1>

        {/* Apple-Style Pill CTA */}
        <div className="mt-3 sm:mt-4">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full bg-[#1d1d1f] hover:bg-[#333336] text-white text-[13px] sm:text-[14px] font-sans font-medium transition-colors shadow-2xs cursor-pointer active:scale-98"
          >
            Get a quote
          </button>
        </div>

      </div>

      {/* Hero Asset Container: Large, prominent, immersive, with dedicated breathing room below CTA */}
      <div className="relative z-10 w-full h-[58svh] sm:h-[64svh] lg:h-[68svh] min-h-[360px] max-h-[820px] flex items-end justify-center overflow-hidden mt-5 sm:mt-7 md:mt-9 pb-0">
        <img
          src="/assets/hero-laptop.png"
          alt="Techashi Solutions — Technology Platform"
          className="hero-product-reveal w-full h-full max-w-[min(96vw,1500px)] object-contain object-bottom select-none pointer-events-none drop-shadow-none"
          loading="eager"
        />
      </div>

    </section>
  );
}
