import React from 'react';
import ScrollReveal from './ScrollReveal';
import ChemistryMoleculeV2 from './ChemistryMoleculeV2';
import ScrollFloatHeading from './ScrollFloatHeading';
import ScrollFloatParagraph from './ScrollFloatParagraph';

const ScrollSections = () => {
  return (
    <div className="relative min-h-[600vh] bg-[#115B87]">
      <ChemistryMoleculeV2 strokeWidth={8} moleculeColor="#00aaff" />
      
      <div className="relative z-20 bg-transparent">
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-4 flex flex-col items-center justify-center">
            <ScrollFloatHeading
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="text-center"
              textClassName="font-bold text-white"
            >
              GREENER CHEMISTRIES
            </ScrollFloatHeading>
            <ScrollFloatParagraph
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="max-w-[600px] text-center"
              textClassName="text-white"
            >
              We're continuously researching innovative, cutting-edge technologies & improving our chemistries for safer & greener products.
            </ScrollFloatParagraph>
          </div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-4 flex flex-col items-center justify-center">
            <ScrollFloatHeading
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="text-center"
              textClassName="font-bold text-white"
            >
              PRODUCT OPTIMIZATION
            </ScrollFloatHeading>
            <ScrollFloatParagraph
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="max-w-[600px] text-center"
              textClassName="text-white"
            >
              Our holistic diagnostic process delivers a solution optimized & customized for you.
            </ScrollFloatParagraph>
          </div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6 text-center pl-8 space-y-4 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                IN-HOUSE R&D +
              </ScrollFloatHeading>
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                MANUFACTURING
              </ScrollFloatHeading>
            </div>
            <ScrollFloatParagraph
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="max-w-[600px] text-center"
              textClassName="text-white"
            >
              We know our chemistries. Solutions are developed & produced in-house through rigorous testing & analysis, then benchmarked against the best.
            </ScrollFloatParagraph>
          </div>
          <div className="col-span-6"></div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6 text-center pl-8 space-y-4 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                HYPER FOCUSED
              </ScrollFloatHeading>
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                CUSTOMER ATTENTION
              </ScrollFloatHeading>
            </div>
            <ScrollFloatParagraph
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="max-w-[600px] text-center"
              textClassName="text-white"
            >
              In the age of tech portals & AI, we are singularly focused on personal, knowledgeable service that provides a legendary experience.
            </ScrollFloatParagraph>
          </div>
          <div className="col-span-6"></div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-4 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                50+ YEARS OF
              </ScrollFloatHeading>
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                INDUSTRY KNOWLEDGE
              </ScrollFloatHeading>
            </div>
            <ScrollFloatParagraph
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="max-w-[600px] text-center"
              textClassName="text-white"
            >
              We never just guess. Our core subject matter experts have 30+ years of tenure at Forza, so we actually understand you.
            </ScrollFloatParagraph>
          </div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-4 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                DEEP PRODUCT
              </ScrollFloatHeading>
              <ScrollFloatHeading
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white"
              >
                PORTFOLIO
              </ScrollFloatHeading>
            </div>
            <ScrollFloatParagraph
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={6}
              containerClassName="max-w-[600px] text-center"
              textClassName="text-white"
            >
              We have the world's most comprehensive portfolio of adhesives, tapes & sealants under one roof - saving you time, money, & the risk of an incorrect product fit.
            </ScrollFloatParagraph>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScrollSections; 