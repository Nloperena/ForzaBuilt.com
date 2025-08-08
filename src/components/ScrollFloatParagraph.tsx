import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatParagraphProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollFloatParagraph: React.FC<ScrollFloatParagraphProps> = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  rotationEnd = "center center",
  wordAnimationEnd = "center center"
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span 
          className="inline-block word" 
          key={index}
          style={{
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            willChange: 'opacity, filter, transform'
          }}
        >
          {word}
        </span>
      );
    });
  }, [children, baseOpacity, enableBlur, blurStrength]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      const wordElements = el.querySelectorAll<HTMLElement>(".word");

      const scroller =
        scrollContainerRef && scrollContainerRef.current
          ? scrollContainerRef.current
          : window;

      gsap.fromTo(
        el,
        { 
          transformOrigin: "0% 50%",
          rotate: baseRotation 
        },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=100px",
            end: rotationEnd,
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=200px",
            end: wordAnimationEnd,
            scrub: 1,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=200px",
              end: wordAnimationEnd,
              scrub: 1,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <p 
      ref={containerRef} 
      className={`${containerClassName}`}
      style={{
        transformOrigin: "0% 50%",
        transform: `rotate(${baseRotation}deg)`
      }}
    >
      <span
        className={`text-[clamp(1rem,2vw,1.125rem)] leading-[1.4] font-normal ${textClassName}`}
      >
        {splitText}
      </span>
    </p>
  );
};

export default ScrollFloatParagraph; 