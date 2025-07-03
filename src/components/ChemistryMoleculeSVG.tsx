import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';

interface ChemistryMoleculeSVGProps {
  className?: string;
  strokeWidth?: number;
}

const ChemistryMoleculeSVG: React.FC<ChemistryMoleculeSVGProps> = ({
  className = '',
  strokeWidth = 3,
}) => {
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* ---------- scroll → progress 0-1 ---------- */
  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;

    const { top, height } = containerRef.current.getBoundingClientRect();
    const winH = window.innerHeight;

    if (top > winH) return setScrollProgress(0);

    const p = (winH - top) / height;
    setScrollProgress(Math.min(Math.max(p, 0), 1));
  }, []);

  /* ---------- listeners ---------- */
  useEffect(() => {
    const onScroll = () => requestAnimationFrame(updateProgress);
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateProgress]);

  /* ---------- fetch SVG once ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          'https://images.ctfassets.net/hdznx4p7ef81/2FBZwopwkVeqsT7zBpyPOt/b2fd02312589d1052d6899ee7197a623/Chemistry_Molecule.svg'
        );
        const raw = await res.text();
        // strip hard-coded fills so we control stroke only
        setSvgMarkup(
          raw
            .replace(/fill="[^"]*"/g, 'fill="none"')
            .replace(/stroke="[^"]*"/g, '') // we'll set stroke ourselves
        );
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  /* ---------- set dash props on every primitive ---------- */
  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const drawables = svgRef.current.querySelectorAll<
      SVGPathElement | SVGLineElement | SVGCircleElement | SVGPolygonElement | SVGRectElement | SVGEllipseElement
    >('path, line, circle, rect, ellipse, polyline, polygon');

    drawables.forEach((el) => {
      const len =
        // @ts-ignore – all listed SVGElement subtypes have getTotalLength
        typeof el.getTotalLength === 'function' ? el.getTotalLength() : 0;

      // base (blue) element keeps 0 offset
      el.style.stroke = '#3b82f6';
      el.style.strokeWidth = String(strokeWidth);
      el.style.fill = 'none';
      el.setAttribute('vector-effect', 'non-scaling-stroke');

      // clone for orange overlay
      const clone = el.cloneNode() as SVGPathElement;
      clone.style.stroke = '#f97316';
      clone.style.strokeWidth = String(strokeWidth);
      clone.style.fill = 'none';
      clone.setAttribute('vector-effect', 'non-scaling-stroke');
      clone.style.strokeDasharray = String(len);
      clone.style.strokeDashoffset = String(len); // start hidden
      clone.setAttribute('data-overlay', ''); // flag for later update

      el.after(clone);
    });
  }, [svgMarkup, strokeWidth]);

  /* ---------- per-scroll dash update ---------- */
  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const overlays = svgRef.current.querySelectorAll('[data-overlay]');
    overlays.forEach((el) => {
      const len = Number((el as SVGPathElement).style.strokeDasharray);
      (el as SVGPathElement).style.strokeDashoffset =
        String(len - scrollProgress * len);
    });
  }, [scrollProgress]);

  /* ---------- render ---------- */
  if (isLoading) {
    return (
      <div className={`w-full h-full bg-[#1b3764] ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-orange-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full bg-[#1b3764] ${className}`}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2611D] via-[#F2611D]/90 to-transparent blur-[80px] pointer-events-none" />
      <svg
        ref={svgRef}
        viewBox="0 0 1627 3192"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMin meet"
        className="relative z-10 block"
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    </div>
  );
};

export default ChemistryMoleculeSVG; 