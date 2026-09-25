import React from 'react';
import { ArrowUpRight, Check, Wrench } from 'lucide-react';
import { SERVICES } from '../data/techashiData';

export default function ServiceDirectory({ onOpenQuote }) {
  return (
    <section className="min-h-screen bg-[#f7f8fa] px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl border-b border-slate-200 pb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">Services & support</p>
          <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight text-brand-navy">Technology that keeps work moving.</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">Practical expertise from planning and installation through ongoing care.</p>
        </div>
        <div className="mt-6 divide-y divide-slate-200">
          {SERVICES.map((service) => (
            <article key={service.id} className="grid gap-6 py-8 sm:py-10 lg:grid-cols-[100px_1fr_1fr_auto] lg:items-start lg:gap-10">
              <span className="font-heading text-4xl font-bold text-brand-blue/35">{service.number}</span>
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-blue">{service.category}</p>
                <h2 className="mt-2 text-2xl font-heading font-bold text-brand-navy">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.subtitle}</p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-600">{service.detailedText}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.items.map((item) => <li key={item} className="flex gap-2 text-xs sm:text-sm text-slate-700"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />{item}</li>)}
                </ul>
              </div>
              <button onClick={onOpenQuote} className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-brand-blue"><Wrench className="h-3.5 w-3.5" /> Get support <ArrowUpRight className="h-3.5 w-3.5" /></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
