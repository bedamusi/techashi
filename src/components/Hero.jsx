import React from 'react';
import { ArrowDown, ArrowRight, Cloud, Globe2, Laptop, MessageCircle, Network, Wrench } from 'lucide-react';
import { COMPANY_INFO } from '../data/techashiData';

const services = [
  { label: 'Computing hardware', Icon: Laptop },
  { label: 'Networking & CCTV', Icon: Network },
  { label: 'Web & cloud', Icon: Globe2 },
  { label: 'Ongoing support', Icon: Wrench },
];

export default function Hero({ onOpenQuote }) {
  return (
    <section className="relative isolate flex h-[100svh] w-full flex-col justify-center overflow-hidden bg-brand-navy px-5 pb-24 pt-24 text-white sm:px-8 sm:pb-28 sm:pt-28">
      <img
        src="/assets/optimized/workstations.webp"
        alt=""
        aria-hidden="true"
        className="home-hero-photo absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,25,43,0.58)_0%,rgba(6,47,85,0.72)_48%,rgba(4,25,43,0.94)_100%)]" aria-hidden="true" />

      <div className="home-hero-copy relative z-10 mx-auto w-full max-w-7xl text-center">
        <p className="mx-auto inline-flex items-center rounded-sm bg-brand-green px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-navy sm:text-xs">
          {COMPANY_INFO.eyebrow}
        </p>

        <h1 className="mx-auto mt-5 max-w-6xl font-heading text-[clamp(2rem,4.2vw,4rem)] font-medium leading-[0.96] tracking-[-0.035em] text-balance sm:mt-6">
          Techashi supplies, installs, and supports the technology businesses rely on.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:text-lg">
          Hardware sales, installation, and professional IT services—brought together by one trusted partner.
        </p>

        <ul className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:mt-6 sm:gap-x-5 sm:text-xs lg:text-sm" aria-label="Main Techashi services">
          {services.map(({ label, Icon }, index) => (
            <li key={label} className="inline-flex items-center gap-2 sm:gap-3">
              {index > 0 && <span className="hidden h-4 w-px bg-brand-green/70 sm:block" aria-hidden="true" />}
              <Icon className="h-3.5 w-3.5 text-brand-green sm:h-4 sm:w-4" strokeWidth={1.8} aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
          <button
            type="button"
            onClick={onOpenQuote}
            className="group inline-flex min-h-12 items-center justify-center gap-3 border border-brand-green bg-brand-green px-6 text-sm font-bold text-brand-navy transition-colors duration-200 hover:bg-[#c7f780] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            Get a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <a
            href="/support"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/50 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Talk to Us
          </a>
        </div>
      </div>

      <a
        href="#techashi-result"
        className="absolute bottom-16 right-5 z-10 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green lg:bottom-8 lg:right-8 lg:text-xs"
      >
        <span>Scroll to discover</span>
        <span className="grid h-7 w-7 place-items-center rounded-full border border-white/45">
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
