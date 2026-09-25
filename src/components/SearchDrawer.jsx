import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Laptop, ShieldCheck, Network, Wrench, Globe, Cloud } from 'lucide-react';
import { PRODUCT_CATEGORIES, SERVICES } from '../data/techashiData';

export default function SearchDrawer({ isOpen, onClose, onSelectCategory, onOpenQuote }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter items matching query
  const searchResults = query.trim() === '' ? [] : [
    ...PRODUCT_CATEGORIES.map(p => ({
      type: 'Product',
      title: p.name,
      description: p.tagline,
      category: p.id,
      action: () => {
        onClose();
        window.location.assign(`/products/${p.id}`);
      }
    })),
    ...SERVICES.map(s => ({
      type: 'Solution & Service',
      title: s.title,
      description: s.subtitle,
      category: s.id,
      action: () => {
        onClose();
        window.location.assign('/solutions');
      }
    })),
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const quickLinks = [
    { label: 'Laptops', id: 'laptops' },
    { label: 'Refurbished PCs', id: 'refurbished' },
    { label: 'CCTV Surveillance', id: 'cctv' },
    { label: 'Networking Equipment', id: 'networking' },
    { label: 'Microsoft 365', id: 'digital' },
    { label: 'PC Maintenance & Repair', id: 'support' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Frosted Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide-Down Apple-Style Search Surface */}
      <div className="relative bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-2xl transition-all max-w-4xl mx-auto rounded-b-3xl">
        <div className="px-6 sm:px-10 pt-8 pb-10">
          
          {/* Search Header Bar */}
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, networking, CCTV, laptops, support..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-base sm:text-lg font-heading text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Links / Suggestions when empty */}
          {query.trim() === '' ? (
            <div className="mt-8 space-y-4">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
                Quick Product Links
              </p>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((ql) => (
                  <button
                    key={ql.label}
                    onClick={() => {
                      onClose();
                      const destination = ql.id === 'support'
                        ? '/support'
                        : ql.id === 'digital'
                          ? '/solutions'
                          : `/products/${ql.id}`;
                      window.location.assign(destination);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-brand-soft-blue hover:text-brand-blue text-xs font-heading font-medium text-slate-700 transition-colors"
                  >
                    <span>{ql.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Live Search Results */
            <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-2 pr-1">
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-3">
                Found {searchResults.length} matching results
              </p>
              {searchResults.length > 0 ? (
                searchResults.map((res, idx) => (
                  <div
                    key={idx}
                    onClick={res.action}
                    className="p-3.5 rounded-2xl border border-slate-100 hover:border-brand-blue/30 hover:bg-brand-soft-blue/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                        {res.type}
                      </span>
                      <h4 className="text-sm font-heading font-bold text-slate-800 group-hover:text-brand-blue transition-colors">
                        {res.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 mt-0.5">
                        {res.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-slate-500">
                  No matching products or services found for "{query}".
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
