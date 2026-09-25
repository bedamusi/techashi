import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Cloud,
  Globe,
  Laptop,
  Network,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { ECOSYSTEM_CAPABILITIES } from '../data/techashiData';

// Documentary technology photography strictly preserved
const CAPABILITY_VISUALS = {
  networking: {
    src: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1800&q=85',
    alt: 'Network servers installed in a data centre',
    position: 'center',
    accentColor: '#075293',
  },
  security: {
    src: 'https://images.unsplash.com/photo-1757323148943-2ae82a19ec9f?auto=format&fit=crop&w=1800&q=85',
    alt: 'Security cameras mounted on a building',
    position: 'center',
    accentColor: '#15803d',
  },
  hardware: {
    src: 'https://images.unsplash.com/photo-1650919031731-0a1ffb23285a?auto=format&fit=crop&w=1800&q=85',
    alt: 'Laptop computer on a desk',
    position: 'center',
    accentColor: '#0284c7',
  },
  digital: {
    src: 'https://images.unsplash.com/photo-1778146476147-5f8d4bd03c79?auto=format&fit=crop&w=1800&q=85',
    alt: 'Laptop and phone displaying software on a desk',
    position: 'center',
    accentColor: '#6366f1',
  },
  productivity: {
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85',
    alt: 'Colleagues collaborating around a table',
    position: 'center',
    accentColor: '#0ea5e9',
  },
  support: {
    src: '/assets/expert-assistance-revendo.jpg',
    alt: 'Technician opening a laptop to inspect its internal hardware',
    position: 'center',
    accentColor: '#d97706',
  },
};

const ICONS = { Network, ShieldCheck, Laptop, Globe, Cloud, Wrench };

function ChapterVisual({ item, index, animated = false }) {
  const ItemIcon = ICONS[item.iconName] || Network;
  const visual = CAPABILITY_VISUALS[item.key];

  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_-32px_rgba(6,47,85,0.35)] ring-1 ring-slate-200/80 sm:rounded-3xl lg:rounded-[2rem] ${animated ? 'ecosystem-performance-image' : ''}`}>
      <picture className="relative block overflow-hidden bg-slate-100">
        <img
          src={visual.src}
          alt={visual.alt}
          loading={animated || index === 0 || item.key === 'support' ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={animated || item.key === 'support' ? 'high' : 'auto'}
          className="h-[260px] w-full object-cover sm:h-[420px] lg:h-[min(62svh,560px)] lg:min-h-[400px]"
          style={{ objectPosition: visual.position }}
        />
      </picture>
      <div className="flex items-center gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-blue sm:text-[11px]">{item.badge}</p>
          <p className="mt-1 truncate text-xs font-semibold text-slate-700 sm:text-sm">{item.short} · {item.tagline}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * A story row stays in the normal document flow while the shared media stage
 * updates to match the story crossing the viewport's reading line.
 */
function ChapterBlock({ item, index, isActive, onOpenQuote }) {
  const ItemIcon = ICONS[item.iconName] || Network;

  return (
    <article
      id={`chapter-${item.key}`}
      aria-current={isActive ? 'step' : undefined}
      className={`chapter relative flex min-h-[76svh] items-center py-14 sm:py-20 lg:py-24 ${isActive ? 'ecosystem-story-active' : ''}`}
    >
      <div className="grid w-full grid-cols-1 items-center gap-8 sm:gap-12">
        <div className="chapter-image lg:hidden">
          <ChapterVisual item={item} index={index} />
        </div>

        {/* Chapter Text Column */}
        <div
          className={`chapter-text flex flex-col justify-center transition-[transform,color] duration-700 ease-out ${isActive ? 'translate-y-0' : 'translate-y-1'}`}
        >
          {/* Eyebrow & Category Metadata */}
          <div className="mb-3.5 flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-2xs transition-colors duration-500 ${isActive ? 'bg-brand-navy text-white' : 'bg-brand-soft-blue text-brand-blue'}`}>
              <ItemIcon className={`h-3.5 w-3.5 ${isActive ? 'text-brand-green' : 'text-brand-blue'}`} aria-hidden="true" />
              {item.badge}
            </span>
          </div>

          {/* A clean editorial headline leads each scroll chapter. */}
          <h3 className="text headline typography-ps-callout font-heading text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.75rem] font-bold leading-[1.05] tracking-tight text-brand-navy">
            {item.tagline}
          </h3>

          {/* Summary Narrative */}
          <p className="copy typography-ps-callout mt-4 text-sm sm:text-base lg:text-lg leading-[1.45] text-slate-600 max-w-xl">
            {item.summary}
          </p>

          {/* Key Deliverables Feature Matrix */}
          <div className="mt-7 border-t border-slate-200/90 pt-5">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Capabilities & Deliverables
            </p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {item.items.map((deliverable) => (
                <li
                  key={deliverable}
                  className="flex items-start gap-2.5 text-[11px] sm:text-xs leading-[1.35] text-slate-700"
                >
                  <span
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-soft-green text-brand-green shadow-2xs"
                    aria-hidden="true"
                  >
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive CTA Trigger */}
          <div className="mt-8 flex items-center gap-5">
            <button
              type="button"
              onClick={onOpenQuote}
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-navy/15 transition-all duration-300 hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-navy/25 hover:gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <span>Request a quote</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Sparkles className="h-4 w-4 text-brand-green" />
              <span>Tailored for your business</span>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}

export default function InteractiveEcosystem({ onOpenQuote }) {
  const capabilities = useMemo(() => ECOSYSTEM_CAPABILITIES, []);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Warm the locally hosted support photo on first mount so it is ready when
  // its chapter becomes active, including after client-side route navigation.
  useEffect(() => {
    const supportImage = new Image();
    supportImage.src = CAPABILITY_VISUALS.support.src;
  }, []);

  // Update active chapter index as user scrolls to drive the sticky media stage
  useEffect(() => {
    let frameId = 0;
    const updateActiveChapter = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.45;
        const index = capabilities.findIndex((item) => {
          const element = document.getElementById(`chapter-${item.key}`);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return rect.top <= marker && rect.bottom >= marker;
        });
        if (index >= 0) setActiveChapterIndex(index);
      });
    };

    updateActiveChapter();
    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    window.addEventListener('resize', updateActiveChapter);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateActiveChapter);
      window.removeEventListener('resize', updateActiveChapter);
    };
  }, [capabilities]);

  return (
    <section
      id="ecosystem"
      className="section section-performance section-product-stories relative bg-[#f8fafc] text-brand-navy selection:bg-brand-blue selection:text-white"
      data-anim-scroll-group="Performance"
      aria-label="Interactive Ecosystem"
    >
      {/* Section Header: Apple ps-section-header typography */}
      <div className="viewport-content max-w-7xl mx-auto px-4 sm:px-8 pt-20 sm:pt-28 lg:pt-36 pb-10 sm:pb-14">
        <header
          className="ps-section-header text-large-center text-small-start flex flex-col gap-4 border-b border-slate-200/80 pb-10 sm:pb-16"
          data-component-list="StaggeredFadeIn"
        >
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(142,198,65,0.7)]" aria-hidden="true" />
            <h2 className="ps-headline-eyebrow typography-ps-body text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
              Interactive Ecosystem
            </h2>
          </div>

          <p className="ps-headline-elevated ps-spacing-large-10 ps-spacing-small-8 large-centered small-uncentered ric-large-10 ric-small-10 ric-xsmall-12 typography-ps-headline-standalone font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-brand-navy leading-[1.1]">
            Technology, built around your business.
          </p>

          <p className="ps-header-description ric-large-8 ric-medium-10 ric-small-12 large-centered typography-ps-body text-sm sm:text-base lg:text-lg leading-[1.45] text-slate-600 max-w-2xl">
            Explore Techashi’s connected technology capabilities.
          </p>
        </header>
      </div>

      {/* Normal-flow story chapters drive the shared, sticky media stage on desktop. */}
      <div className="chapters-wrapper mx-auto max-w-7xl px-4 pb-16 sm:px-8 sm:pb-28">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="chapters divide-y divide-slate-200/70 lg:col-span-5">
            {capabilities.map((item, index) => (
              <ChapterBlock
                key={item.key}
                item={item}
                index={index}
                isActive={index === activeChapterIndex}
                onOpenQuote={onOpenQuote}
              />
            ))}
          </div>

          <aside className="relative hidden lg:col-span-7 lg:block" aria-label="Active ecosystem capability image">
            <div className="sticky top-[12vh] pt-5">
              <ChapterVisual
                key={capabilities[activeChapterIndex].key}
                item={capabilities[activeChapterIndex]}
                index={activeChapterIndex}
                animated
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
