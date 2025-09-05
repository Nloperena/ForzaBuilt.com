import React, { useState } from 'react';
import faqData from '../data/faqData.json';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-[#115B87] to-[#1B3764]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-center mb-8 md:mb-12 tracking-tight font-kallisto">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {(faqData as any[]).map((faq, idx) => (
            <div key={idx} className="w-full max-w-3xl">
              <button
                className="w-full flex items-center justify-between text-white font-bold text-lg md:text-xl lg:text-2xl py-4 md:py-6 px-4 md:px-6 rounded-lg bg-transparent hover:bg-[#234072] transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-left pr-4">{faq.question}</span>
                <svg
                  className={`w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="bg-[#234072] text-white text-sm md:text-base lg:text-lg px-4 md:px-8 pb-4 md:pb-6 pt-2 rounded-b-lg animate-fade-in leading-relaxed">
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