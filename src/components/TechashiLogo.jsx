import React from 'react';

/**
 * Official Techashi Solutions L.T.D Logo Component
 * Horizontal lockup: icon mark on left, company name text on right.
 * Variants:
 * - 'light': for white/light backgrounds (blue & green text)
 * - 'dark':  for dark navy/blue backgrounds (white & green text)
 * - 'mark':  emblem mark only (no text)
 */
export default function TechashiLogo({
  variant = 'light',
  className = '',
  alt = 'Techashi Solutions L.T.D',
}) {
  /* ── mark-only ─────────────────────────────────────────────── */
  if (variant === 'mark') {
    return (
      <img
        src="/assets/logo-mark.png"
        alt={alt}
        className={`object-contain select-none ${className || 'h-8 w-auto'}`}
        loading="eager"
        draggable={false}
      />
    );
  }

  /* ── shared text colours ────────────────────────────────────── */
  const nameColor  = variant === 'dark' ? 'text-white'        : 'text-[#1a5fa8]';
  const subColor   = variant === 'dark' ? 'text-[#8dc63f]'    : 'text-[#6ab023]';

  /* ── horizontal lockup ──────────────────────────────────────── */
  return (
    <div className={`flex items-center gap-3.5 select-none shrink-0 ${className}`}>
      {/* Icon mark */}
      <img
        src="/assets/logo-mark.png"
        alt=""
        aria-hidden="true"
        className="h-[1.8em] w-auto shrink-0 object-contain"
        loading="eager"
        draggable={false}
      />

      {/* Text stack */}
      <div className="flex h-[1.8em] flex-col justify-center leading-none">
        <span className={`font-heading font-extrabold tracking-wider uppercase ${nameColor}`}
              style={{ fontSize: '0.92em', letterSpacing: '0.08em' }}>
          TECHASHI
        </span>
        <span className={`font-sans font-semibold uppercase ${subColor}`}
              style={{ fontSize: '0.58em', letterSpacing: '0.12em', marginTop: '0.2em' }}>
          SOLUTIONS L.T.D
        </span>
      </div>
    </div>
  );
}
