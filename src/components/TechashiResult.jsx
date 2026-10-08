import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { COMPANY_INFO } from '../data/techashiData';

const resultImages = [
  { src: '/assets/optimized/result-workstation.webp', alt: 'A real workstation with a laptop displaying software development tools', className: 'techashi-result-image--workstations aspect-[16/9] w-[34vw] max-w-[240px] sm:w-[22vw] sm:max-w-[300px]', startOffset: [-105, -45], offset: [-475, -235] },
  { src: '/assets/optimized/result-network-rack.webp', alt: 'Network equipment and cabling in a server rack', className: 'techashi-result-image--networking aspect-[4/3] w-[30vw] max-w-[220px] sm:w-[19vw] sm:max-w-[280px]', startOffset: [105, -60], offset: [475, -220] },
  { src: '/assets/optimized/result-security-camera.webp', alt: 'Security cameras installed on an outdoor pole', className: 'techashi-result-image--cctv aspect-[3/4] w-[23vw] max-w-[155px] sm:w-[12vw] sm:max-w-[180px]', startOffset: [-95, 60], offset: [-465, 165] },
  { src: '/assets/optimized/result-collaboration.webp', alt: 'A team collaborating around laptops', className: 'techashi-result-image--cloud aspect-[4/3] w-[28vw] max-w-[205px] sm:w-[17vw] sm:max-w-[250px]', startOffset: [95, 70], offset: [465, 165] },
  { src: '/assets/optimized/result-it-support.webp', alt: 'A technician repairing computer networking hardware', className: 'techashi-result-image--digital aspect-[4/3] w-[31vw] max-w-[220px] sm:w-[18vw] sm:max-w-[260px]', startOffset: [0, -5], offset: [0, 190] },
];

const deliverables = [
  { number: '01', title: 'Computing hardware', description: 'Laptops, desktops, workstations, phones, and accessories.' },
  { number: '02', title: 'Networks & security', description: 'Structured cabling, office WiFi, networking, and CCTV.' },
  { number: '03', title: 'Digital & support', description: 'Websites, Microsoft 365, IT services, and ongoing care.' },
];

function WordReveal({ children, group, start, end }) {
  const words = children.split(/\s+/);
  return (
    <span data-result-word-group={group} data-start={start} data-end={end} aria-label={children}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <React.Fragment key={`${group}-${index}`}>
            {index > 0 && ' '}
            <span data-result-word className="techashi-result-word">{word}</span>
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}

export default function TechashiResult() {
  const journeyRef = useRef(null);

  useEffect(() => {
    const journey = journeyRef.current;
    if (!journey) return undefined;
    const stage = journey.querySelector('[data-result-stage]');
    const images = Array.from(journey.querySelectorAll('[data-result-image]'));
    const wordGroups = Array.from(journey.querySelectorAll('[data-result-word-group]'));
    const panels = Array.from(journey.querySelectorAll('[data-result-panel]'));
    const discoverLink = journey.querySelector('[data-result-discover]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let imageMotion = [];

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      imageMotion = images.map((image) => ({
        image,
        startX: Number(image.dataset.startX) * rect.width / 1265,
        startY: Number(image.dataset.startY) * rect.height / 713,
        endX: Number(image.dataset.offsetX) * rect.width / 1265,
        endY: Number(image.dataset.offsetY) * rect.height / 713,
      }));
    };

    const smooth = (value) => {
      const t = Math.max(0, Math.min(1, value));
      return t * t * (3 - 2 * t);
    };

    const update = () => {
      frame = 0;
      const rect = journey.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const travel = Math.max(1, journey.offsetHeight - stage.offsetHeight);
      const progress = reducedMotion.matches ? 0 : Math.max(0, Math.min(1, -rect.top / travel));
      // Start with a tight image collage, open it to the edges, then fade the
      // photos away as the final Result copy takes over.
      const spread = reducedMotion.matches ? 1 : smooth(progress / 0.32);
      const imageFadeStart = 0.48;
      const imageFadeEnd = 0.78;
      const imageVisibility = reducedMotion.matches
        ? 1
        : 1 - smooth((progress - imageFadeStart) / (imageFadeEnd - imageFadeStart));
      imageMotion.forEach(({ image, startX, startY, endX, endY }) => {
        const x = startX + (endX - startX) * spread;
        const y = startY + (endY - startY) * spread;
        image.style.transform = `translate(-50%, -50%) translateX(${x}px) translateY(${y}px)`;
        image.style.opacity = String(imageVisibility);
      });

      if (discoverLink) {
        const visibility = reducedMotion.matches ? 1 : 1 - smooth((progress - 0.54) / 0.14);
        discoverLink.style.opacity = String(visibility);
        discoverLink.style.pointerEvents = visibility > 0.01 ? 'auto' : 'none';
      }

      wordGroups.forEach((group) => {
        const start = Number(group.dataset.start);
        const end = Number(group.dataset.end);
        const words = Array.from(group.querySelectorAll('[data-result-word]'));
        const groupProgress = reducedMotion.matches ? 1 : Math.max(0, Math.min(1, (progress - start) / (end - start)));
        words.forEach((word, index) => {
          const local = groupProgress * words.length - index;
          const reveal = smooth(local);
          word.style.opacity = String(0.78 + reveal * 0.22);
          word.style.transform = `translate3d(0, ${(1 - reveal) * 0.24}em, 0)`;
        });
      });

      panels.forEach((panel) => {
        const start = Number(panel.dataset.panelStart);
        const end = Number(panel.dataset.panelEnd);
        if (reducedMotion.matches) {
          panel.style.opacity = '1';
          panel.style.visibility = 'visible';
          return;
        }
        const enter = start === 0 ? 1 : smooth((progress - (start - 0.025)) / 0.05);
        const leave = 1 - smooth((progress - (end - 0.035)) / 0.06);
        const opacity = Math.min(enter, leave);
        panel.style.opacity = String(opacity);
        panel.style.visibility = opacity > 0.005 ? 'visible' : 'hidden';
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    measure();
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    const handleResize = () => { measure(); requestUpdate(); };
    window.addEventListener('resize', handleResize);
    reducedMotion.addEventListener?.('change', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', handleResize);
      reducedMotion.removeEventListener?.('change', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="techashi-result" className="relative bg-brand-navy text-white">
      <div ref={journeyRef} className="techashi-result-journey relative h-[300svh]">
        <div data-result-stage className="sticky top-24 flex h-[calc(100svh-6rem)] max-h-[900px] items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {resultImages.map((image) => (
                <img key={image.src} src={image.src} alt="" data-result-image data-start-x={image.startOffset[0]} data-start-y={image.startOffset[1]} data-offset-x={image.offset[0]} data-offset-y={image.offset[1]} className={`story-parallax absolute left-1/2 top-1/2 rounded-xl object-cover ${image.className}`} loading="eager" fetchPriority="low" decoding="async" />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,47,85,0.22)_0%,rgba(6,47,85,0.45)_48%,rgba(6,47,85,0.38)_100%)]" />
          </div>
          <a data-result-discover href="#techashi-delivers" className="absolute bottom-24 right-5 z-20 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green sm:right-8 lg:bottom-8 lg:text-xs">
            <span>Discover what we deliver</span><span className="grid h-7 w-7 place-items-center rounded-full border border-white/45"><ArrowDown className="h-3.5 w-3.5" aria-hidden="true" /></span>
          </a>
        </div>

        <div data-result-panel data-panel-start="0" data-panel-end="0.24" className="techashi-result-panel absolute inset-x-0 top-0 flex h-svh items-center justify-center px-6 text-center sm:px-10">
          <div className="mx-auto w-full max-w-5xl">
            <p className="mx-auto inline-flex rounded-sm bg-brand-green px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-navy sm:text-xs">The result</p>
            <h2 className="mx-auto mt-6 max-w-5xl font-heading text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance sm:mt-8">
              <WordReveal group="result-title" start="0.015" end="0.24">Everything works better when it works together.</WordReveal>
            </h2>
          </div>
        </div>

        <div data-result-panel data-panel-start="0.22" data-panel-end="0.49" className="techashi-result-panel absolute inset-x-0 top-[100svh] flex h-[50svh] items-center justify-center px-6 text-center sm:px-10">
          <p className="mx-auto max-w-4xl font-heading text-[clamp(1.65rem,4.1vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.025em] text-balance text-white">
            <WordReveal group="result-proposition" start="0.24" end="0.49">{COMPANY_INFO.proposition}</WordReveal>
          </p>
        </div>

        <div data-result-panel data-panel-start="0.47" data-panel-end="0.68" className="techashi-result-panel absolute inset-x-0 top-[150svh] flex h-[50svh] items-center justify-center px-6 text-center sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h3 className="font-heading text-[clamp(1.55rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.025em] text-balance">
              <WordReveal group="result-partner" start="0.49" end="0.58">One trusted partner for the technology behind your work.</WordReveal>
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              <WordReveal group="result-description" start="0.58" end="0.68">{COMPANY_INFO.description}</WordReveal>
            </p>
          </div>
        </div>

        <div id="techashi-delivers" data-result-panel data-panel-start="0.66" data-panel-end="1" className="techashi-result-panel absolute inset-x-0 top-[200svh] flex h-svh items-center justify-center px-5 sm:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <ol className="space-y-2">
              {deliverables.map((item, index) => {
                const start = 0.7 + index * 0.09;
                const end = start + 0.05;
                return (
                  <li key={item.number} className="grid grid-cols-[3.5rem_1fr] gap-3 border-t border-white/20 py-4 sm:grid-cols-[4.5rem_1fr] sm:gap-5 sm:py-5">
                    <span className="pt-1 font-heading text-lg font-medium text-brand-green sm:text-xl">{item.number}</span>
                    <div>
                      <h4 className="font-heading text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl"><WordReveal group={`deliverable-${index}-title`} start={String(start)} end={String(start + 0.055)}>{item.title}</WordReveal></h4>
                      <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7"><WordReveal group={`deliverable-${index}-description`} start={String(start + 0.055)} end={String(end)}>{item.description}</WordReveal></p>
                    </div>
                  </li>
                );
              })}
              <li className="border-t border-white/20" aria-hidden="true" />
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
