import React, { useState } from 'react';
import faqData from '../data/faqData.json';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#1b3764]">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-extrabold text-white text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 tracking-tight font-kallisto">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {(faqData as any[]).map((faq, idx) => (
            <div key={idx} className="w-full max-w-2xl sm:max-w-2xl md:max-w-3xl">
              <button
                className="w-full flex items-center justify-between text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl py-3 sm:py-4 md:py-5 lg:py-6 px-3 sm:px-4 md:px-5 lg:px-6 rounded-lg bg-transparent hover:bg-[#234072] transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-left pr-2 sm:pr-3 md:pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ml-1 sm:ml-2 md:ml-3 lg:ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="bg-[#234072] text-white text-sm sm:text-base md:text-lg lg:text-xl px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-5 lg:pb-6 pt-2 rounded-b-lg animate-fade-in leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 