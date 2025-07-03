import React from 'react';
import ScrollReveal from './ScrollReveal';
import VerticalScrollCurveFull from './VerticalScrollCurveFull';
import ScrollFloatParagraph from './ScrollFloatParagraph';

const ScrollSections = () => {
  return (
    <div className="relative min-h-[600vh] bg-[#1b3764]">
      <VerticalScrollCurveFull strokeWidth={4} />
      
      <div className="relative z-20 bg-transparent">
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-8 flex flex-col items-center justify-center">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="text-center"
              textClassName="font-bold text-white font-kallisto"
            >
              GREENER CHEMISTRIES
            </ScrollReveal>
            <ScrollFloatParagraph
              containerClassName="max-w-[calc(20rem+600px)] text-center"
            >
              We're continuously researching innovative, cutting-edge technologies & improving our chemistries for safer & greener products.
            </ScrollFloatParagraph>
          </div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-8 flex flex-col items-center justify-center">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="text-center"
              textClassName="font-bold text-white font-kallisto"
            >
              PRODUCT OPTIMIZATION
            </ScrollReveal>
            <ScrollFloatParagraph
              containerClassName="max-w-[calc(20rem+600px)] text-center"
            >
              Our holistic diagnostic process delivers a solution optimized & customized for you.
            </ScrollFloatParagraph>
          </div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6 text-center pl-8 space-y-8 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                IN-HOUSE R&D +
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                MANUFACTURING
              </ScrollReveal>
            </div>
            <ScrollFloatParagraph
              containerClassName="max-w-[calc(20rem+600px)] text-center"
            >
              We know our chemistries. Solutions are developed & produced in-house through rigorous testing & analysis, then benchmarked against the best.
            </ScrollFloatParagraph>
          </div>
          <div className="col-span-6"></div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6 text-center pl-8 space-y-8 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                HYPER FOCUSED
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                CUSTOMER ATTENTION
              </ScrollReveal>
            </div>
            <ScrollFloatParagraph
              containerClassName="max-w-[calc(20rem+600px)] text-center"
            >
              In the age of tech portals & AI, we are singularly focused on personal, knowledgeable service that provides a legendary experience.
            </ScrollFloatParagraph>
          </div>
          <div className="col-span-6"></div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-8 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                50+ YEARS OF
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                INDUSTRY KNOWLEDGE
              </ScrollReveal>
            </div>
            <ScrollFloatParagraph
              containerClassName="max-w-[calc(20rem+600px)] text-center"
            >
              We never just guess. Our core subject matter experts have 30+ years of tenure at Forza, so we actually understand you.
            </ScrollFloatParagraph>
          </div>
        </section>
        
        <section className="min-h-screen grid grid-cols-12 items-center">
          <div className="col-span-6"></div>
          <div className="col-span-6 text-center pr-8 space-y-8 flex flex-col items-center justify-center">
            <div className="text-center">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                DEEP PRODUCT
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                containerClassName="text-center"
                textClassName="font-bold text-white font-kallisto"
              >
                PORTFOLIO
              </ScrollReveal>
            </div>
            <ScrollFloatParagraph
              containerClassName="max-w-[calc(20rem+600px)] text-center"
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