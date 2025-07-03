import React, { useState } from 'react';
import faqData from '../data/faqData.json';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#1b3764]">
      <h2 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-14 tracking-tight font-kallisto">Frequently Asked Questions</h2>
      <div className="flex flex-col items-center gap-6">
        {(faqData as any[]).map((faq, idx) => (
          <div key={idx} className="w-full max-w-2xl">
            <button
              className="w-full flex items-center justify-between text-white font-bold text-2xl md:text-3xl py-4 px-6 rounded-lg bg-transparent hover:bg-[#234072] transition group focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-8 h-8 ml-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="bg-[#234072] text-white text-lg px-8 pb-6 pt-2 rounded-b-lg animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection; 