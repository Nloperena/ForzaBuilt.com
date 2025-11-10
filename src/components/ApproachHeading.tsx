import React from 'react';

const ApproachHeading = () => {
  return (
    <section className="relative z-20 bg-white pt-8 md:pt-12 lg:pt-16">
      <div className="w-full px-[clamp(14px,4vw,32px)] pb-6 md:pb-8">
        <div className="inline-flex flex-col items-start gap-2">
          <h2 
            className="font-normal font-poppins leading-tight" 
            style={{
              fontSize: 'clamp(28px, 3vw, 56px)',
              lineHeight: '1.1',
              textAlign: 'left',
              color: '#2c476e'
            }}
          >
            Powerful Approach To Customer Success
          </h2>
          <div className="h-1 bg-[#F2611D]" style={{ width: 'clamp(60px, 15%, 120px)' }} />
        </div>
      </div>
    </section>
  );
};

export default ApproachHeading;

