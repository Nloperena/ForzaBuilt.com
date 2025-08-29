import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faqData from '@/data/faqData.json';

const ShinyFaqSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = useMemo(() => faqData as Array<{ question: string; answer: string }>, []);

  return (
    <section className="relative z-10 w-full bg-[#115B87] text-white py-14 md:py-20 overflow-hidden">
      {/* soft glow background that can layer over neighbors */}
      <div className="pointer-events-none absolute -inset-y-20 inset-x-0 opacity-40">
        <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-cyan-300/18 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-sky-500/12 blur-3xl" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6">
        <h2 className="text-center font-kallisto font-extrabold text-2xl sm:text-3xl md:text-5xl mb-6 md:mb-10">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <motion.div
                key={idx}
                className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* sheen */}
                <div className="pointer-events-none absolute inset-x-0 -top-20 h-24 bg-gradient-to-b from-white/20 to-transparent rounded-b-[100%]" />

                <button
                  className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 md:px-6 md:py-5 hover:bg-white/5 transition-colors"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm md:text-base leading-snug">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 md:h-6 md:w-6 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="px-5 md:px-6 pb-4 md:pb-5"
                    >
                      <p className="text-xs md:text-sm text-white/90 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShinyFaqSection;


