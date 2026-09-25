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
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `calc(${HIGHLIGHTS.length} * 100svh)` }}
      >
        <div
          ref={stageRef}
          className="sticky top-14 sm:top-16 h-[calc(100svh-3.5rem)] sm:h-[calc(100svh-4rem)] max-h-[920px] flex flex-col justify-start px-4 sm:px-8 lg:px-12 pt-3 sm:pt-5 pb-3 sm:pb-5"
        >
          {/* Section Heading closely attached to the showcase */}
          <div className="mx-auto w-full max-w-7xl shrink-0 pb-2.5 sm:pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight text-[#1d1d1f]">
              Get the highlights.
            </h2>
          </div>

          {/* Highlights Stage Container */}
          <div className="relative mx-auto w-full max-w-7xl flex-1 min-h-0 overflow-hidden rounded-2xl md:rounded-3xl bg-white/70 border border-slate-200/80 shadow-xs">
            {layers.map(({ highlight, index, opacity, y, scale }) => {
              const isHardware = highlight.id === 'hardware';
              return (
                <article
                  key={highlight.id}
                  aria-hidden={index !== displayIndex}
                  inert={index !== displayIndex}
                  className="absolute inset-0 grid h-full w-full grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[0.82fr_1.18fr] gap-0"
                  style={{ opacity, transform: `translate3d(0, ${y}px, 0) scale(${scale})`, pointerEvents: index === displayIndex ? 'auto' : 'none', willChange: 'opacity, transform' }}
                >
                  <div className="highlights-panel-enter flex min-h-0 flex-col justify-center px-5 sm:px-8 py-4 sm:py-6 md:py-8 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10">
                    <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.16em] text-brand-blue">{highlight.eyebrow}</p>
                    <h3 className="mt-1.5 sm:mt-2 max-w-xl text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-heading font-bold tracking-tight leading-[1.1] text-brand-navy">{highlight.title}</h3>
                    <p className="mt-2 sm:mt-3 max-w-lg text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600">{highlight.description}</p>

                    <div className="mt-4 sm:mt-6 flex items-end justify-between gap-3 border-t border-black/10 pt-3 sm:pt-4">
                      <div className="min-w-0">
                        <p className="text-base sm:text-lg lg:text-xl font-heading font-bold tracking-tight text-brand-navy">{highlight.stat}</p>
                        <p className="mt-0.5 text-xs sm:text-sm leading-snug text-slate-600">{highlight.statLabel}</p>
                      </div>
                      <button onClick={onOpenQuote} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1d1d1f] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-brand-blue">
                        Inquire <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-2.5 hidden text-xs text-slate-500 font-medium md:block">{highlight.tagline}</p>
                  </div>

                  <div className={`highlights-panel-enter relative min-h-0 ${isHardware ? 'bg-[#eaf1f6]' : 'bg-slate-900'}`}>
                    {isHardware ? (
                      <div className="flex h-full w-full items-center justify-center p-3 sm:p-4 lg:p-6">
                        <div className="grid w-full max-w-2xl grid-cols-1 gap-2.5 sm:gap-3.5 md:grid-cols-[1.4fr_1fr] md:items-stretch">
                          {/* Main Business Laptop (Dell) */}
                          <div className="relative flex aspect-[4/3] sm:aspect-[16/11] md:aspect-auto md:h-full w-full items-center justify-center overflow-hidden rounded-xl md:rounded-2xl bg-white p-2.5 sm:p-4 shadow-xs">
                            <img
                              src={HARDWARE_PRODUCTS[0].src}
                              alt={HARDWARE_PRODUCTS[0].alt}
                              className="h-full w-full object-contain object-center"
                              loading="eager"
                              decoding="async"
                            />
                            <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-white shadow-xs">
                              {HARDWARE_PRODUCTS[0].label}
                            </span>
                          </div>

                          {/* Right Column: Performance Laptop & Workstations */}
                          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-1 md:gap-3">
                            {HARDWARE_PRODUCTS.slice(1).map((product) => (
                              <div
                                key={product.label}
                                className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl md:rounded-2xl bg-slate-900 shadow-xs"
                              >
                                <img
                                  src={product.src}
                                  alt={product.alt}
                                  className="h-full w-full object-contain object-center"
                                  loading="eager"
                                  decoding="async"
                                />
                                <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-white shadow-xs">
                                  {product.label}
                                </span>
                              </div>
                            ))}
                          </div>
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
