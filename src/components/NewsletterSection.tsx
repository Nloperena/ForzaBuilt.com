import React from 'react';
import NewsletterSignup from './NewsletterSignup';

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-[#1b3764] w-full">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 tracking-tight font-kallisto">Subscribe to Our Newsletter</h2>
        <NewsletterSignup />
      </div>
    </section>
  );
};

export default NewsletterSection; 