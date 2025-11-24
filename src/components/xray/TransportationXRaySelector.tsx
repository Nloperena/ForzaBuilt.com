import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RVBusOverlay from './RVBusOverlay';
import TrailerOverlay from './TrailerOverlay';

type XRayVariant = 'rv-bus' | 'trailer';

interface XRayOption {
  id: XRayVariant;
  title: string;
  subtitle: string;
  summary: string;
  previewImage: string;
}

const OPTIONS: XRayOption[] = [
  {
    id: 'rv-bus',
    title: 'RV / Motor Coach Applications',
    subtitle: '',
    summary:
      'Explore RV & motor coach assemblies including structural bonding for slide-outs, roof sealing, and continuous panel builds.',
    previewImage: '/img/transportation/RV Bus Exploded-NEW.png',
  },
  {
    id: 'trailer',
    title: 'Trailer Applications',
    subtitle: '',
    summary:
      'Inspect high-strength trailer assemblies covering walls, floors, and chassis bonding for commercial and specialty builds.',
    previewImage: '/img/transportation/Trailer PostX-Ray.png',
  },
];

const optionVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const TransportationXRaySelector: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<XRayVariant | null>('trailer');

  const SelectedOverlay = useMemo(() => {
    if (!selectedVariant) return null;
    return selectedVariant === 'rv-bus' ? <RVBusOverlay /> : <TrailerOverlay />;
  }, [selectedVariant]);

  const selectedOption = selectedVariant
    ? OPTIONS.find(option => option.id === selectedVariant)
    : null;

  return (
    <section className="relative bg-white z-[30] py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {!selectedVariant ? (
          <div className="relative py-8 sm:py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {OPTIONS.map(option => (
                <motion.button
                  key={option.id}
                  type="button"
                  variants={optionVariants}
                  initial="rest"
                  whileHover="hover"
                  className="relative isolate bg-transparent border-none p-0 focus:outline-none"
                  onClick={() => setSelectedVariant(option.id)}
                >
                  <div className="inline-flex flex-col items-center gap-4">
                    <img
                      src={option.previewImage}
                      alt={option.title}
                      className="w-[240px] sm:w-[280px] lg:w-[340px] object-contain"
                    />
                    <p className="text-base font-semibold text-[#1B3764]">{option.title}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            {/* Left selector column */}
            <div className="flex flex-col gap-5">
              {OPTIONS.map(option => {
                const isSelected = option.id === selectedVariant;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: option.id === 'trailer' ? 0.05 : 0 }}
                    onClick={() => setSelectedVariant(option.id)}
                    className={`rounded-2xl border p-5 text-left transition-all duration-300 flex items-center gap-5 ${
                      isSelected
                        ? 'border-transparent bg-gradient-to-br from-[#1B3764] to-[#263f6b] text-white shadow-[0_20px_45px_rgba(27,55,100,0.3)]'
                        : 'border-[#1B3764]/15 text-[#1B3764] bg-white'
                    }`}
                  >
                    <div className="w-[120px] h-28 rounded-xl bg-[#f1f4fa] overflow-hidden flex-shrink-0">
                      <img
                        src={option.previewImage}
                        alt={option.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p
                      className={`text-lg font-semibold ${
                        isSelected ? 'text-white' : 'text-[#1B3764]'
                      }`}
                    >
                      {option.title}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Center X-ray */}
            <div 
              className="relative rounded-[32px] isolate"
              style={{ minHeight: 'clamp(580px, 72vh, 1500px)' }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={selectedVariant}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-full w-full"
                >
                  {SelectedOverlay}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default TransportationXRaySelector;

