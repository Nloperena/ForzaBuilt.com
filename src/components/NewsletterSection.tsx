import React from 'react';
import NewsletterSignup from './NewsletterSignup';

const NewsletterSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1b3764] via-[#234072] to-[#1b3764] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight font-kallisto">
            Stay Connected
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Get the latest industry insights, product innovations, and technical solutions delivered directly to your inbox.
          </p>
        </div>
        
        <NewsletterSignup />
      </div>
    </section>
  );
};

export default NewsletterSection; 