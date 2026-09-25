import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA({ onOpenQuote }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy-deep py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(20,104,173,0.38),transparent_62%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green sm:text-sm">A clearer way forward</p>
        <h2 className="mx-auto mt-5 max-w-4xl font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
          Make your next technology move <span className="text-brand-green">work harder.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg">
          From the devices your team relies on to the systems and support behind them, bring every part together with Techashi.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
          <button
            type="button"
            onClick={onOpenQuote}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-brand-green px-7 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-green-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep sm:w-auto"
          >
            Let’s plan your next step <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <a
            href="/support"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green sm:w-auto"
          >
            Explore our services
          </a>
        </div>
      </div>
    </section>
  );
}
