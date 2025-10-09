"use client";

import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";

type Item = { src: string; alt: string; width?: number; height?: number };
type Props = {
  items: Item[];
  /** pixels per second (logical speed) */
  speed?: number;
  /** "left" | "right" */
  direction?: "left" | "right";
  /** Tailwind height classes per breakpoint */
  className?: string;
  /** Gap between items (Tailwind gap-x-?) */
  gapClass?: string;
};

export default function ProductImageTicker({
  items,
  speed = 60,
  direction = "left",
  className,
  gapClass = "gap-4 md:gap-6 lg:gap-8",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate once to achieve seamless loop
  const loopItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const el = trackRef.current;
    const root = containerRef.current;
    if (!el || !root) return;

    // Compute duration from content width and desired speed
    const resize = () => {
      const total = el.scrollWidth / 2; // width of one set
      const pxPerSec = speed; // pixels per second
      const duration = Math.max(6, total / pxPerSec); // seconds
      root.style.setProperty("--marquee-duration", `${duration}s`);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        root.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0.01 }
    );
    io.observe(root);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [speed]);

  return (
    <section
      aria-label="Product image ticker"
      className={clsx(
        "relative w-full py-8 md:py-12",
        "bg-white",
        className
      )}
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, #fff 50%, #fff 100%)'
      }}
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden"
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 [mask-image:linear-gradient(to_right,rgba(0,0,0,0),#000_40%)]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 [mask-image:linear-gradient(to_left,rgba(0,0,0,0),#000_40%)]"></div>
        
        <div
          ref={trackRef}
          className={clsx(
            "flex items-center whitespace-nowrap will-change-transform gap-0",
            // Motion-safe animation; direction controlled by variant
            "motion-safe:[animation-duration:var(--marquee-duration)] motion-safe:animate-marquee",
            direction === "right" && "motion-safe:animate-marquee-reverse",
            // Pause on hover for mouse/trackpad users
            "hover:[animation-play-state:paused]"
          )}
          // Make it scrollable when reduced motion is preferred
          style={{ animationDuration: "var(--marquee-duration)" }}
        >
          {loopItems.map((it, i) => (
            <figure key={`${it.src}-${i}`} className="shrink-0">
              <div className="relative" style={{ 
                width: 'clamp(4.5rem, 14vw, 18rem)', 
                height: 'clamp(4.5rem, 14vw, 18rem)',
                aspectRatio: '1 / 1'
              }}>
                <img
                  src={it.src}
                  alt={it.alt}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  loading={i < 6 ? "eager" : "lazy"}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Reduced motion fallback: horizontal scroll row */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          [aria-label='Product image ticker'] div[class*='animate-'] {
            animation: none !important;
          }
          [aria-label='Product image ticker'] > div {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }
          [aria-label='Product image ticker'] figure {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
}