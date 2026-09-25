"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 * ─────────────────────────────────────────────────────────────── */

export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 32 */
  perspective?: number;
  /** Card width in world units (percentage of container). @default 32 */
  cardWidth?: number;
  /** Card height in world units (percentage of container). @default 22 */
  cardHeight?: number;
  /** Corner radius applied to each card in cqw. @default 1.2 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 3.2 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 52 */
  exitHeight?: number;
  /**
   * Lateral offset at birth. Negative starts the card across the axis so the
   * centre never opens up. @default -10
   */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 46 */
  railExit?: number;
  /** How front-loaded the opening is. >1 opens early then holds. @default 3.2 */
  fan?: number;
  /** Y-rotation at birth, degrees. @default 5 */
  turnBirth?: number;
  /** Y-rotation at exit, degrees. @default 24 */
  turnExit?: number;
  /** Keyframe stops used to trace the curve. Raise only if motion looks faceted. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 32,
  cardWidth: 32,
  cardHeight: 22,
  cardRadius: 1.2,
  birthHeight: 3.2,
  exitHeight: 52,
  railBirth: -10,
  railExit: 46,
  fan: 3.2,
  turnBirth: 5,
  turnExit: 24,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;

    // Smooth opacity fade so cards emerge naturally and dissolve before container clipping
    let opacity = 1;
    if (u < 0.12) {
      opacity = Math.max(0, u / 0.12);
    } else if (u > 0.74) {
      opacity = Math.max(0, (0.96 - u) / 0.22);
    }

    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg);opacity:${opacity.toFixed(3)};}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  alt?: string;
};

export type ImageStreamHeroProps = {
  images: StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: CorridorPath;
  imageFit?: "cover" | "contain";
  cardClassName?: string;
  children?: React.ReactNode;
  className?: string;
};

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 36,
  axis = 52,
  path,
  imageFit = "contain",
  cardClassName,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name, railIdx) =>
            Array.from({ length: cards }, (_, i) => {
              // Use a global slot index across both rails so images never repeat
              const globalIdx = railIdx * cards + i;
              const img = images[globalIdx % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(
                    card,
                    "absolute flex items-center justify-center pointer-events-none",
                    cardClassName
                  )}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "w-full h-full select-none",
                        imageFit === "contain"
                          ? "object-contain"
                          : "object-cover"
                      )}
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
