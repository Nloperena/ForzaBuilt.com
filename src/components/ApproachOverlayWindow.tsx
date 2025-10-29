import React, { useEffect, useMemo, useRef, useState } from 'react';

type OverlayItem = {
  image: string;
  title: string;
};

type ApproachOverlayWindowProps = {
  items: OverlayItem[];
  selectedIndex: number;
  previousIndex: number;
  /** Element id to observe for visibility */
  targetId: string;
  /** Optional: z-index layer for overlay (default sits above hero video, below content) */
  zIndexClassName?: string; // e.g., "z-[12]"
};

const ApproachOverlayWindow: React.FC<ApproachOverlayWindowProps> = ({
  items,
  selectedIndex,
  previousIndex,
  targetId,
  zIndexClassName = 'z-[12]'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const current = useMemo(() => items[selectedIndex], [items, selectedIndex]);
  const prev = useMemo(() => items[previousIndex], [items, previousIndex]);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Show when at least ~20% of the section is on screen
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.25, 0.5, 0.75, 1] }
    );
    observerRef.current.observe(target);

    return () => observerRef.current?.disconnect();
  }, [targetId]);

  // Only render the overlay while visible to avoid any faded layer covering other sections
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 ${zIndexClassName} pointer-events-none hidden lg:block`}
      aria-hidden="true"
    >
      {/* Two-column overlay mimicking the approach layout */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/* Left: background imagery */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
          {/* Previous image */}
          <img
            src={prev?.image}
            alt={prev?.title || 'Previous'}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center center', transform: 'scale(1.15)' }}
          />
          {/* Current image */}
          <img
            key={selectedIndex}
            src={current?.image}
            alt={current?.title || 'Current'}
            className="absolute inset-0 w-full h-full object-cover animate-in slide-in-from-right duration-700"
            style={{ objectPosition: 'center center', transform: 'scale(1.15)' }}
          />
        </div>
        {/* Right: gradient panel to match text side */}
        <div className="relative bg-gradient-to-r from-[#2c476e] to-[#477197]" />
      </div>
    </div>
  );
};

export default ApproachOverlayWindow;


