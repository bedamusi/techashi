import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const HARDWARE_PRODUCTS = [
  { src: '/assets/laptops/real-laptop-4.jpg', alt: 'Enterprise business laptop', label: 'Business laptops' },
  { src: '/assets/laptops/real-laptop-6.jpg', alt: 'High performance laptop', label: 'Performance' },
  { src: '/assets/workstations.jpg', alt: 'Multi-monitor workstation setup with desktop computers', label: 'Workstations' },
];

const HIGHLIGHTS = [
  {
    id: 'hardware',
    eyebrow: 'Computing Hardware',
    title: 'PCs & Laptops. Tested. Verified. Warranty backed.',
    description: 'Brand-new enterprise laptops and rigorously benchmarked refurbished desktop workstations suited for every workload.',
    image: '/assets/laptops/real-laptop-4.jpg',
    stat: 'Quality Tested',
    statLabel: 'Multi-point hardware inspection on all refurbished units',
    tagline: 'Hardware Sales • Installation • Support',
  },
  {
    id: 'networking',
    eyebrow: 'Infrastructure',
    title: 'Networking that never skips a beat.',
    description: 'Cat6 structured cabling, enterprise WiFi 6 roaming, managed switching, and hardware firewalls engineered for zero downtime.',
    image: '/assets/highlight-networking.jpg',
    stat: 'Gigabit Ready',
    statLabel: 'Engineered for high throughput and clean cable management',
    tagline: 'Hardware Sales • Installation • Support',
  },
  {
    id: 'cctv',
    eyebrow: 'Surveillance & Security',
    title: 'Watch over what matters, from anywhere.',
    description: 'Commercial CCTV camera installations with dedicated NVR storage and secure live smartphone remote viewing on iOS and Android.',
    image: '/assets/surveillance-cameras-upload.png',
    stat: 'HD & 4K',
    statLabel: 'Day & night optical surveillance with motion detection',
    tagline: 'Hardware Sales • Installation • Support',
  },
  {
    id: 'cloud',
    eyebrow: 'Productivity Suite',
    title: 'Microsoft 365, integrated effortlessly.',
    description: 'Official licensing, zero-downtime email migration, Teams collaboration, SharePoint intranets, and user onboarding.',
    image: '/assets/highlight-cloud.jpg',
    stat: 'Cloud First',
    statLabel: 'Collaborate securely with anywhere file access',
    tagline: 'Hardware Sales • Installation • Support',
  },
  {
    id: 'digital',
    eyebrow: 'Web & Visual Identity',
    title: 'From idea to a commanding online presence.',
    description: 'Bespoke corporate websites, e-commerce stores, brand logos, company profiles, and marketing collateral.',
    image: '/assets/highlight-digital-brand.jpg',
    stat: 'End-to-End',
    statLabel: 'Design, development, hosting, and maintenance',
    tagline: 'Hardware Sales • Installation • Support',
  },
];

export default function HighlightsSection({ onOpenQuote }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const trackRef = useRef(null);
  const stageRef = useRef(null);

  // The page remains the scroll container. Progress is sampled only while this
  // section's track is moving past its own sticky stage.
  useEffect(() => {
    let frame = 0;
    const updateActiveHighlight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (!track || !stage) return;

        const top = parseFloat(window.getComputedStyle(stage).top) || 0;
        const travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
        const moved = top - track.getBoundingClientRect().top;
        const progress = Math.min(0.99999, Math.max(0, moved / travel));
        setScrollPosition(Math.min(HIGHLIGHTS.length - 1, Math.max(0, progress * HIGHLIGHTS.length)));
      });
    };

    updateActiveHighlight();
    window.addEventListener('scroll', updateActiveHighlight, { passive: true });
    window.addEventListener('resize', updateActiveHighlight);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveHighlight);
      window.removeEventListener('resize', updateActiveHighlight);
    };
  }, []);

  // Switch the composition only at the midpoint of the scroll interval. A
  // single visible panel avoids ghosted text and double-exposed product art.
  const displayIndex = Math.min(HIGHLIGHTS.length - 1, Math.round(scrollPosition));
  const distanceFromActive = Math.abs(scrollPosition - displayIndex);
  const layers = [{
    highlight: HIGHLIGHTS[displayIndex],
    index: displayIndex,
    opacity: 1,
    y: (scrollPosition - displayIndex) * 10,
    scale: 1 - Math.min(0.005, distanceFromActive * 0.01),
  }];

  return (
    <section id="highlights" className="border-t border-[#dbe8f2] bg-[#f0f6fb] text-[#1d1d1f]">
      <header className="px-5 pt-20 pb-8 sm:px-8 sm:pt-24 sm:pb-10 lg:px-12">
        <h2 className="mx-auto max-w-7xl text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight leading-[1.08]">
          Get the highlights.
        </h2>
      </header>

      <div
        ref={trackRef}
        className="relative"
        style={{ height: `calc(${HIGHLIGHTS.length} * 100svh)` }}
      >
        <div
          ref={stageRef}
          className="sticky top-16 h-[calc(100svh-4rem)] min-h-[560px] max-h-[900px] sm:top-20 sm:h-[calc(100svh-5rem)]"
        >
          <div className="relative h-full w-full">
            {layers.map(({ highlight, index, opacity, y, scale }) => {
              const isHardware = highlight.id === 'hardware';
              return (
                <article
                  key={highlight.id}
                  aria-hidden={index !== displayIndex}
                  inert={index !== displayIndex}
                  className="absolute inset-0 grid h-full w-full grid-cols-1 gap-3 pt-3 pb-14 md:grid-cols-[0.82fr_1.18fr] md:gap-0 md:py-0 md:pb-0"
                  style={{ opacity, transform: `translate3d(0, ${y}px, 0) scale(${scale})`, pointerEvents: index === displayIndex ? 'auto' : 'none', willChange: 'opacity, transform' }}
                >
                  <div className="highlights-panel-enter flex min-h-0 flex-col justify-center px-5 sm:px-8 md:py-8 md:pl-10 md:pr-8 lg:pl-16 lg:pr-12">
                    <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-brand-blue sm:text-xs">{highlight.eyebrow}</p>
                    <h3 className="mt-2 max-w-xl text-[26px] font-heading font-semibold tracking-tight leading-[1.08] sm:text-3xl lg:text-[42px]">{highlight.title}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#6e6e73] sm:mt-4 sm:text-base">{highlight.description}</p>

                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-black/10 pt-3 sm:mt-8 sm:pt-4">
                      <div className="min-w-0">
                        <p className="text-lg font-heading font-bold tracking-tight sm:text-xl">{highlight.stat}</p>
                        <p className="mt-0.5 text-[11px] leading-snug text-[#86868b] sm:text-xs">{highlight.statLabel}</p>
                      </div>
                      <button onClick={onOpenQuote} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1d1d1f] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#333336] sm:px-5">
                        Inquire <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-3 hidden text-[10px] text-[#86868b] md:block">{highlight.tagline}</p>
                  </div>

                  <div className={`highlights-panel-enter relative min-h-0 bg-[#eaf1f6] ${isHardware ? 'overflow-hidden md:rounded-l-2xl' : 'overflow-hidden rounded-none bg-slate-900'}`}>
                    {isHardware ? (
                      <div className="grid h-full min-h-[300px] grid-cols-1 items-center gap-3 p-3 sm:min-h-[390px] sm:p-5 md:min-h-0 md:grid-cols-[1.55fr_0.85fr] md:gap-4 lg:gap-6 lg:p-6">
                        <div className="flex h-[210px] min-h-0 items-center justify-center rounded-xl bg-white/65 p-3 sm:h-[270px] md:h-full md:min-h-[350px] md:p-5">
                          <img src={HARDWARE_PRODUCTS[0].src} alt={HARDWARE_PRODUCTS[0].alt} className="h-full w-full object-contain object-center" loading="eager" decoding="async" />
                        </div>
                        <div className="grid min-h-0 grid-cols-2 gap-3 md:h-full md:grid-cols-1 md:grid-rows-2">
                          {HARDWARE_PRODUCTS.slice(1).map((product) => (
                            <div key={product.label} className="relative flex min-h-[120px] items-center justify-center rounded-xl bg-white/65 p-3 sm:min-h-[150px] md:min-h-0 md:p-4">
                              <img src={product.src} alt={product.alt} className="h-full w-full object-contain object-center" loading="eager" decoding="async" />
                              <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-slate-600 sm:text-xs">{product.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <img src={highlight.image} alt={highlight.title} className="h-full w-full object-cover object-center" loading="eager" decoding="async" fetchPriority="high" />
                    )}
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
