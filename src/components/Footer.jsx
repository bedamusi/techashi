import React from 'react';
import { ArrowUp, Globe, ShieldCheck } from 'lucide-react';
import TechashiLogo from './TechashiLogo';
import { COMPANY_INFO } from '../data/techashiData';

const SOCIAL_PLATFORMS = [
  { name: 'Facebook', mark: 'facebook' },
  { name: 'Instagram', mark: 'instagram' },
  { name: 'LinkedIn', mark: 'linkedin' },
  { name: 'TikTok', mark: 'tiktok' },
];

function SocialIcon({ mark }) {
  if (mark === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
      </svg>
    );
  }

  if (mark === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.6" cy="6.7" r="1" className="fill-current stroke-none" />
      </svg>
    );
  }

  if (mark === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.3 18H5.7V9.5h2.6V18ZM7 8.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18.3 18h-2.6v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.1V18h-2.6V9.5h2.5v1.2h.1a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.2 1.8 3.2 4V18Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M14.2 3.2c.4 2.4 1.7 3.8 4.1 4v3.1a8 8 0 0 1-4.1-1.2v6.3a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v3.3a2.2 2.2 0 1 0 1 1.9V3.2h3.1Z" fill="#25F4EE" transform="translate(-1.1 .6)" />
      <path d="M14.2 3.2c.4 2.4 1.7 3.8 4.1 4v3.1a8 8 0 0 1-4.1-1.2v6.3a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v3.3a2.2 2.2 0 1 0 1 1.9V3.2h3.1Z" fill="#FE2C55" transform="translate(1 -.4)" />
      <path d="M14.2 3.2c.4 2.4 1.7 3.8 4.1 4v3.1a8 8 0 0 1-4.1-1.2v6.3a5.3 5.3 0 1 1-5.3-5.3c.4 0 .8 0 1.2.1v3.3a2.2 2.2 0 1 0 1 1.9V3.2h3.1Z" fill="currentColor" />
    </svg>
  );
}

export default function Footer({ onOpenQuote }) {
  return (
    <footer className="min-h-screen min-h-[100svh] bg-slate-900 text-slate-300 py-10 sm:py-16 border-t border-slate-800 text-sm flex flex-col justify-between">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        
        {/* Apple-Style Footnotes & Disclaimers */}
        <div className="pb-8 border-b border-slate-800 text-xs sm:text-[13px] text-slate-300 space-y-2.5 leading-relaxed">
          <p>
            1. Refurbished computing systems undergo thorough multi-point hardware diagnostic inspection, thermal cleaning, and component benchmarking prior to delivery. Warranty terms apply per product specification.
          </p>
          <p>
            2. CCTV remote smartphone viewing requires an active broadband internet connection at the premises and mobile data or WiFi connectivity on the viewing device.
          </p>
          <p>
            3. Microsoft 365 cloud features, including Teams collaboration, SharePoint intranets, and OneDrive storage, are provided under official Microsoft business licensing plans.
          </p>
          <p>
            4. Structured cabling installations adhere to international Cat6 / Cat6A telecommunications wiring standards and best practices.
          </p>
          <p>
            5. Hardware sales, availability, warranty periods, and tailored service quotes are subject to final commercial confirmation.
          </p>
        </div>

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 py-8 lg:py-12 border-b border-slate-800 my-auto">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <TechashiLogo
              variant="dark"
              className="h-10"
            />

            <p className="text-sm font-medium text-slate-200 max-w-sm leading-relaxed">
              Technology. Solutions. Support.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {COMPANY_INFO.description}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="px-5 py-2.5 rounded-full bg-brand-blue text-white font-heading font-semibold text-xs sm:text-sm hover:bg-brand-blue-hover transition-colors shadow-sm"
              >
                Inquire With Our Specialists
              </button>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3.5">
            <p className="font-heading font-bold text-white uppercase tracking-wider text-xs sm:text-sm">
              Solutions
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li><a href="/products/networking" className="hover:text-white transition-colors">Networking</a></li>
              <li><a href="/products/cctv" className="hover:text-white transition-colors">CCTV Installation</a></li>
              <li><a href="/solutions" className="hover:text-white transition-colors">Website Development</a></li>
              <li><a href="/solutions" className="hover:text-white transition-colors">Microsoft 365</a></li>
              <li><a href="/support" className="hover:text-white transition-colors">IT Consultancy</a></li>
              <li><a href="/support" className="hover:text-white transition-colors">PC Maintenance</a></li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="space-y-3.5">
            <p className="font-heading font-bold text-white uppercase tracking-wider text-xs sm:text-sm">
              Products
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li><a href="/products/laptops" className="hover:text-white transition-colors">Laptops</a></li>
              <li><a href="/products/desktops" className="hover:text-white transition-colors">Desktops</a></li>
              <li><a href="/products/servers" className="hover:text-white transition-colors">Servers & Storage</a></li>
              <li><a href="/products/refurbished" className="hover:text-white transition-colors">Refurbished PCs</a></li>
              <li><a href="/products/accessories" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="/products/cctv" className="hover:text-white transition-colors">CCTV Equipment</a></li>
              <li><a href="/products/networking" className="hover:text-white transition-colors">Networking</a></li>
            </ul>
          </div>

          {/* Company & Social Column */}
          <div className="space-y-5">
            <div className="space-y-3.5">
              <p className="font-heading font-bold text-white uppercase tracking-wider text-xs sm:text-sm">
                Company
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li><a href="/solutions" className="hover:text-white transition-colors">Insights</a></li>
                <li><button onClick={onOpenQuote} className="hover:text-white transition-colors text-left">Contact & Quotes</button></li>
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <p className="font-heading font-bold text-white uppercase tracking-wider text-xs sm:text-sm">
                Social
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                {SOCIAL_PLATFORMS.map(({ name, mark }) => (
                  <span
                    key={name}
                    role="img"
                    aria-label={name}
                    title={name}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800/70 transition-colors hover:border-slate-500 hover:bg-slate-700 ${
                      mark === 'facebook' ? 'text-[#1877F2]' : mark === 'instagram' ? 'text-[#E66C9B]' : mark === 'linkedin' ? 'text-[#0A66C2]' : 'text-white'
                    }`}
                  >
                    <SocialIcon mark={mark} />
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <p>© {new Date().getFullYear()} TECHASHI SOLUTIONS L.T.D. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Official Domain: <a href="https://techashisolutions.com/" className="text-slate-300 hover:text-white transition-colors">techashisolutions.com</a></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
