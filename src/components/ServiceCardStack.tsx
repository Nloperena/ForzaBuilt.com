
import { useEffect, useState, useRef } from 'react';
import ServiceCard from './ServiceCard';

const ServiceCardStack = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerTop, setContainerTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Calculate the container's position when component mounts or window resizes
    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(rect.top + window.scrollY);
      }
    };

    updateContainerPosition();
    window.addEventListener('resize', updateContainerPosition);
    
    // Use a small delay to ensure all elements are rendered
    const timer = setTimeout(updateContainerPosition, 100);

    return () => {
      window.removeEventListener('resize', updateContainerPosition);
      clearTimeout(timer);
    };
  }, []);

  const cards = [
    {
      id: 'construction',
      title: 'Construction Management',
      icon: '🏗️',
      features: [
        'End-to-end project oversight',
        'Quality control & safety standards', 
        'On-time delivery guaranteed'
      ],
      buttonText: 'Start project',
      technologies: ['AutoCAD', 'Revit', 'SketchUp'],
      supportedTech: ['BIM', 'CAD', '3D Modeling', 'Drone Survey', 'AR/VR'],
      specialties: ['Residential', 'Commercial', 'Industrial', 'Infrastructure']
    },
    {
      id: 'design',
      title: 'Architectural Design',
      icon: '📐',
      features: [
        'Custom architectural solutions',
        'Sustainable design practices',
        'Code compliance expertise'
      ],
      buttonText: 'Get design',
      model: 'Modern Minimalist',
      modelDesc: 'Contemporary design with clean lines',
      storyPrompt: 'Tell me about your dream home.',
      storyText: `Imagine walking into a space where every corner tells a story of thoughtful design and meticulous craftsmanship. Floor-to-ceiling windows flood the open-concept living area with natural light, while exposed steel beams add an industrial elegance. The kitchen island, crafted from locally sourced granite, serves as both a functional workspace and a gathering point for family and friends. This isn't just a house—it's a carefully orchestrated symphony of form and function, designed to enhance every moment of daily life.`
    },
    {
      id: 'renovation',
      title: 'Home Renovation',
      icon: '🔨',
      features: [
        'Complete home transformations',
        'Budget-friendly solutions',
        'Licensed & insured contractors'
      ],
      buttonText: 'Start renovation',
      projectOptions: [
        { name: 'Kitchen Remodel', location: 'Austin, TX', price: '$25K - $50K', duration: '6-8 weeks', flag: '🏠' },
        { name: 'Bathroom Upgrade', location: 'Houston, TX', price: '$15K - $30K', duration: '4-6 weeks', flag: '🛁' },
        { name: 'Basement Finish', location: 'Dallas, TX', price: '$20K - $40K', duration: '8-10 weeks', flag: '🏡' },
        { name: 'Whole House', location: 'San Antonio, TX', price: '$75K - $150K', duration: '12-16 weeks', flag: '🏘️' }
      ]
    }
  ];

  return (
    <div ref={containerRef} className="relative">
      {cards.map((card, index) => {
        const cardHeight = window.innerHeight;
        const cardStart = containerTop + (index * cardHeight);
        const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / cardHeight));
        const nextCardProgress = Math.max(0, Math.min(1, (scrollY - cardStart - cardHeight) / cardHeight));
        
        // Calculate transforms
        const currentScale = 1 - progress * 0.05;
        const currentTranslateY = progress * -50;
        const isVisible = scrollY >= cardStart - cardHeight && scrollY < cardStart + cardHeight * 2;
        
        return (
          <div
            key={card.id}
            className="sticky top-0 w-full h-screen flex items-center justify-center"
            style={{
              zIndex: 40 + index,
            }}
          >
            <ServiceCard
              card={card}
              transform={`translateY(${currentTranslateY}px) scale(${currentScale})`}
              opacity={isVisible ? 1 - nextCardProgress : 0}
            />
          </div>
        );
      })}
      
      {/* Spacer to allow proper scrolling for this stack */}
      <div style={{ height: `${cards.length * window.innerHeight}px` }} />
    </div>
  );
};

export default ServiceCardStack;
