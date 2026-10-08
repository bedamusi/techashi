import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

const HIGHLIGHTS = [
  {
    id: 'hardware',
    title: 'Enterprise PCs & Laptops',
    category: 'Hardware',
    description: 'Brand-new enterprise laptops and rigorously benchmarked refurbished desktop workstations with multi-point quality testing.',
    image: '/assets/optimized/real-laptop-4.webp',
  },
  {
    id: 'networking',
    title: 'High-Throughput Networking',
    category: 'Networking',
    description: 'Cat6 structured cabling, enterprise WiFi 6 roaming, managed switching, and hardware firewalls engineered for zero downtime.',
    image: '/assets/optimized/highlight-networking.webp',
  },
  {
    id: 'cctv',
    title: 'Commercial CCTV & Remote Access',
    category: 'Security',
    description: 'High-definition optical camera installations with dedicated NVR storage and encrypted smartphone live view anywhere on iOS and Android.',
    image: '/assets/optimized/surveillance-cameras-upload.webp',
  },
  {
    id: 'cloud',
    title: 'Microsoft 365 & Cloud Solutions',
    category: 'Cloud',
    description: 'Official enterprise licensing, zero-downtime mail migration, Teams collaboration, OneDrive cloud storage, and secure intranets.',
    image: '/assets/optimized/highlight-cloud.webp',
  },
  {
    id: 'digital',
    title: 'Web Platforms & Digital Branding',
    category: 'Digital',
    description: 'Bespoke corporate web platforms, e-commerce stores, brand logos, profiles, and digital transformation architectures.',
    image: '/assets/optimized/highlight-digital-brand.webp',
  },
];

export default function HighlightsSection({ onOpenQuote }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="highlights" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-navy/10 text-brand-navy text-xs sm:text-sm font-semibold rounded-full mb-3 tracking-wide">
            Get The Highlights
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight mb-4">
            Showcase & Infrastructure
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Take a look inside the enterprise hardware, structured cabling, optical surveillance, and cloud systems we deploy for our clients.
          </p>
        </div>

        {/* Gallery Grid - Exact Cybertech style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedItem(item)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedItem(item); }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer select-none bg-slate-900 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none"
              />

              {/* Hover Overlay: dark gradient with bottom category and title */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-left">
                  <span className="text-xs text-brand-green font-medium block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-white font-heading font-semibold text-base sm:text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {/* 6th Slot CTA Card completing the 3-column grid cleanly */}
          <div className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 text-white p-6 sm:p-7 flex flex-col justify-between border border-slate-800 shadow-sm">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-brand-green text-xs font-semibold mb-3">
                Custom Systems
              </span>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                Need a tailored infrastructure setup?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                We supply hardware, run structured cabling, and configure end-to-end office environments.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-xs sm:text-sm font-bold text-brand-navy shadow-sm transition hover:bg-[#a2db4f]"
            >
              Request a Fast Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Cybertech Style Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            {/* Close Button above modal */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Modal Image */}
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl bg-black"
            />

            {/* Modal Bottom Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent rounded-b-xl flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-sm text-brand-green font-medium block mb-1">
                  {selectedItem.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {selectedItem.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                  {selectedItem.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedItem(null);
                  onOpenQuote();
                }}
                className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-xs sm:text-sm font-bold text-brand-navy shadow-sm transition hover:bg-[#a2db4f]"
              >
                Inquire About This <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
