import React from 'react';

const ApproachHeading = () => {
  return (
    <section className="relative bg-white pt-[clamp(20px,4vw,40px)] pb-[clamp(20px,4vw,40px)]">
      <div className="w-full px-[clamp(14px,4vw,32px)]">
        <div className="flex flex-col items-center gap-2">
          <h2 
            className="font-normal font-poppins leading-tight" 
            style={{
              fontSize: 'clamp(28px, 3vw, 56px)',
              lineHeight: '1.1',
              textAlign: 'center',
              color: '#2c476e'
            }}
          >
            Powerful Approach To Customer Success
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ApproachHeading;

