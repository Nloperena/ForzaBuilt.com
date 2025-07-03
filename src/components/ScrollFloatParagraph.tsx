import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatParagraphProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloatParagraph: React.FC<ScrollFloatParagraphProps> = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "top bottom-=300px",
  scrollEnd = "center center",
  stagger = 0.02
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const animationsRef = useRef<{ float?: gsap.core.Tween }>({});

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span 
        className="inline-block char-span" 
        key={index}
        style={{ 
          whiteSpace: char === " " ? "pre" : "normal",
          willChange: "opacity, transform"
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll(".char-span");

    gsap.set(charElements, {
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: "50% 0%"
    });

    animationsRef.current.float = gsap.to(charElements, {
      duration: animationDuration,
      ease: ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: stagger,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: scrollStart,
        end: scrollEnd,
        scrub: true,
        refreshPriority: 1
      },
    });

    return () => {
      if (animationsRef.current.float) {
        animationsRef.current.float.kill();
      }
      
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger
  ]);

  return (
    <p
      ref={containerRef}
      className={`overflow-visible text-white ${containerClassName}`}
    >
      <span
        className={`inline-block text-lg leading-relaxed ${textClassName}`}
        style={{ 
          wordBreak: "keep-all",
          willChange: "transform"
        }}
      >
        {splitText}
      </span>
    </p>
  );
};

export default ScrollFloatParagraph; 