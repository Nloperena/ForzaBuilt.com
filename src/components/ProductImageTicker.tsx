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
  speed = 72,
  direction = "left",
  className,
  gapClass = "gap-4 md:gap-6 lg:gap-8",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Triple the items for extra seamless infinite loop
  const loopItems = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const el = trackRef.current;
    const root = containerRef.current;
    if (!el || !root) return;

    let ro: ResizeObserver | null = null;
    let rafId: number | null = null;
    let isInitialized = false;
    let isVisible = false;
    let startTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let hasEnteredViewport = false;
    let viewportEntryTime: number | null = null;

    // Set initial default values to start animation immediately
    const defaultDuration = 20; // fallback duration
    root.style.setProperty("--marquee-duration", `${defaultDuration}s`);
    root.style.setProperty("--marquee-distance", "0px");
    
    // Start animation paused initially
    el.style.animationPlayState = "paused";

    // Function to start the animation
    const startAnimation = () => {
      el.style.animationPlayState = "running";
      el.classList.add("will-change-transform");
    };

    // Function to check if we should start animation (after delay)
    const checkAndStartAnimation = () => {
      if (isInitialized && isVisible && viewportEntryTime !== null) {
        const timeSinceEntry = Date.now() - viewportEntryTime;
        const delayMs = 200; // 0.2 second delay
        if (timeSinceEntry >= delayMs) {
          // Delay has passed, start immediately
          startAnimation();
        } else {
          // Delay hasn't passed yet, wait for remaining time
          const remainingTime = delayMs - timeSinceEntry;
          if (startTimeoutId) clearTimeout(startTimeoutId);
          startTimeoutId = setTimeout(() => {
            if (isInitialized && isVisible) {
              startAnimation();
            }
          }, remainingTime);
        }
      }
    };

    // Compute duration from content width and desired speed
    const resize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const total = el.scrollWidth / 3; // width of one set (we have 3 copies)
        if (total > 0) {
          const pxPerSec = speed; // pixels per second
          const duration = Math.max(6, total / pxPerSec); // seconds
          
          // Set CSS custom properties for pixel-based animation
          root.style.setProperty("--marquee-duration", `${duration}s`);
          root.style.setProperty("--marquee-distance", `${total}px`);
          
          // Mark as initialized once we have valid dimensions
          if (!isInitialized) {
            isInitialized = true;
            // Check if we should start animation now (delay may have already passed)
            checkAndStartAnimation();
          }
        }
        rafId = null;
      });
    };

    // Use IntersectionObserver to defer setup until visible
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Initialize ResizeObserver only when visible
          if (!ro) {
            ro = new ResizeObserver(resize);
            ro.observe(el);
            // Initial calculation deferred to next frame
            resize();
          }
          
          // Start animation 0.2 seconds after entering viewport (only once)
          if (!hasEnteredViewport) {
            hasEnteredViewport = true;
            viewportEntryTime = Date.now();
            // Clear any existing timeout
            if (startTimeoutId) {
              clearTimeout(startTimeoutId);
            }
            // Start animation after 0.2 second delay
            startTimeoutId = setTimeout(() => {
              if (isInitialized && isVisible) {
                startAnimation();
              }
            }, 200);
          } else if (isInitialized) {
            // If already entered viewport and initialized, check delay
            checkAndStartAnimation();
          }
        } else {
          // Pause animation when leaving viewport
          el.style.animationPlayState = "paused";
          // Clear timeout if component leaves viewport before delay completes
          if (startTimeoutId) {
            clearTimeout(startTimeoutId);
            startTimeoutId = null;
          }
          // Reset viewport entry tracking so delay restarts on re-entry
          hasEnteredViewport = false;
          viewportEntryTime = null;
        }
      },
      { threshold: 0.01 }
    );
    io.observe(root);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (startTimeoutId) clearTimeout(startTimeoutId);
      if (ro) ro.disconnect();
      io.disconnect();
    };
  }, [speed, direction]);

  return (
      <section
      aria-label="Product image ticker"
      className={clsx(
        "relative w-full -mt-16 md:-mt-20 lg:-mt-24 xl:-mt-32 2xl:-mt-36 pb-0 z-20",
        "bg-white",
        className
      )}
      style={{
        background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, #fff 50%, #fff 100%)',
        paddingBottom: 0
      }}
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden mt-6 md:mt-8 lg:mt-9 xl:mt-10 2xl:-mt-16"
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 lg:w-32 xl:w-40 z-10 [mask-image:linear-gradient(to_right,rgba(0,0,0,0),#000_40%)]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 lg:w-32 xl:w-40 z-10 [mask-image:linear-gradient(to_left,rgba(0,0,0,0),#000_40%)]"></div>
        
        <div
          ref={trackRef}
          className={clsx(
            "flex items-center whitespace-nowrap gap-0",
            // Pause on hover for mouse/trackpad users
            "hover:[animation-play-state:paused]"
          )}
          style={{ 
            animation: `marquee-pixel-${direction} var(--marquee-duration, 20s) linear infinite`,
            animationPlayState: "paused",
          }}
        >
          {loopItems.map((it, i) => (
            <figure key={`${it.src}-${i}`} className="shrink-0">
              <div className="relative w-[clamp(8rem,20vw,12rem)] h-[clamp(8rem,20vw,12rem)] md:w-[clamp(10rem,22vw,14rem)] md:h-[clamp(10rem,22vw,14rem)] lg:w-[clamp(6.5rem,16vw,22rem)] lg:h-[clamp(6.5rem,20vw,22rem)] xl:w-[clamp(4.5rem,14vw,18rem)] xl:h-[clamp(4.5rem,18vw,18rem)]" style={{ 
                aspectRatio: '1 / 1'
              }}>
                <img
                  src={it.src}
                  alt={it.alt}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  loading={i < 6 ? "eager" : "lazy"}
                  style={{ transform: it.src.includes("/t") ? "translateY(10%)" : "none" }}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Custom seamless marquee animation */}
      <style>{`
        @keyframes marquee-pixel-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--marquee-distance, 0px)));
          }
        }
        
        @keyframes marquee-pixel-right {
          0% {
            transform: translateX(calc(-1 * var(--marquee-distance, 0px)));
          }
          100% {
            transform: translateX(0);
          }
        }
        
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