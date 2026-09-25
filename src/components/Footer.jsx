import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TechashiLogo from './TechashiLogo';
import { COMPANY_INFO } from '../data/techashiData';

const footerGroups = [
  {
    title: 'Products',
    links: [
      { label: 'Laptops', href: '/products/laptops' },
      { label: 'Desktops', href: '/products/desktops' },
      { label: 'Servers & storage', href: '/products/servers' },
      { label: 'CCTV & security', href: '/products/cctv' },
      { label: 'Networking', href: '/products/networking' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'IT services & support', href: '/support' },
      { label: 'Networking & installation', href: '/support' },
      { label: 'Web & digital solutions', href: '/solutions' },
      { label: 'Microsoft 365', href: '/solutions' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Highlights', href: '/highlights' },
      { label: 'Our solutions', href: '/solutions' },
      { label: 'Connected ecosystem', href: '/ecosystem' },
      { label: 'All products', href: '/products' },
    ],
  },
];

export default function Footer({ onOpenQuote }) {
  const footerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const video = videoRef.current;
    if (!footer || !video) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = (isVisible) => {
      if (reducedMotion.matches || !isVisible) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => syncPlayback(entry.isIntersecting), { rootMargin: '160px 0px' });
    observer.observe(footer);
    const handleMotionPreference = () => syncPlayback(footer.getBoundingClientRect().top < window.innerHeight && footer.getBoundingClientRect().bottom > 0);
    reducedMotion.addEventListener?.('change', handleMotionPreference);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener?.('change', handleMotionPreference);
      video.pause();
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative isolate flex min-h-screen min-h-[100svh] flex-col overflow-hidden bg-brand-navy-deep text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/footer-network-video.mp4"
        poster="/assets/footer-network-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,26,45,0.72)_0%,rgba(4,26,45,0.82)_42%,rgba(3,20,35,0.96)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,rgba(25,111,177,0.24),transparent_58%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 sm:px-8 lg:px-10">
        <div className="grid gap-x-10 gap-y-10 border-b border-white/20 py-12 sm:py-14 md:grid-cols-3 lg:grid-cols-[1.45fr_repeat(4,minmax(0,1fr))] lg:gap-10 lg:py-16">
          <div className="space-y-4 md:col-span-3 lg:col-span-1">
            <a href="/" aria-label="Techashi home" className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">
              <TechashiLogo variant="dark" className="h-10" />
            </a>
            <p className="font-heading text-sm font-semibold text-white">{COMPANY_INFO.tagline}</p>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">{COMPANY_INFO.description}</p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green">{group.title}</h2>
              <ul className="space-y-3 text-sm text-white/80">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <a href={link.href} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="space-y-4 md:col-span-3 lg:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green">Start a conversation</h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">Tell us what you need. We’ll help you find a practical next step.</p>
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={COMPANY_INFO.domain} className="transition-colors hover:text-white">techashisolutions.com</a>
            <a href="https://www.pexels.com/video/a-close-up-video-of-cable-wires-connected-on-a-motherboard-7140937/" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Footage: MrColo / Pexels</a>
            <a href="/" className="transition-colors hover:text-white">Back to home ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
