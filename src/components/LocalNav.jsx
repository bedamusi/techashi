import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LocalNav({ onOpenQuote }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      // Show localnav after scrolling past top 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Overview', href: '/' },
    { label: 'Highlights', href: '/highlights' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Ecosystem', href: '/ecosystem' },
    { label: 'Products', href: '/products' },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-12 left-0 right-0 z-30 transition-all duration-300 animate-fadeIn">
      <div className="bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-2xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Local Brand Identity */}
          <a
            href="/"
            className="text-xs sm:text-sm font-heading font-bold text-brand-navy hover:text-brand-blue transition-colors truncate"
          >
            Techashi Solutions
          </a>

          {/* Subnav Links */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm font-sans font-medium text-slate-700">
            <div className="hidden md:flex items-center space-x-6 text-xs sm:text-sm">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={(window.location.pathname === link.href || (link.href === '/products' && window.location.pathname.startsWith('/products/'))) ? 'page' : undefined}
                  className={`transition-colors ${(window.location.pathname === link.href || (link.href === '/products' && window.location.pathname.startsWith('/products/'))) ? 'font-bold text-brand-blue' : 'hover:text-brand-blue'}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Quick Action Pill Button */}
            <button
              onClick={onOpenQuote}
              className="px-4 py-1.5 rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-heading font-semibold transition-all shadow-2xs"
            >
              Get a Quote
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
