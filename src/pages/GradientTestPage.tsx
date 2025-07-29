import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  MarineStackableCards,
  TransportationStackableCards,
  ConstructionStackableCards,
  IndustrialStackableCards,
  // FoamStackableCards,
  CompositesStackableCards,
  InsulationStackableCards
} from '../components/StackableCards/IndustryStackableCards';

const GradientTestPage: React.FC = () => {
  const handleCardClick = (cardId: string) => {
    console.log('Card clicked:', cardId);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="space-y-8">
        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Marine Gradient Test</h2>
          <MarineStackableCards onCardClick={handleCardClick} />
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Transportation Gradient Test</h2>
          <TransportationStackableCards onCardClick={handleCardClick} />
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Construction Gradient Test</h2>
          <ConstructionStackableCards onCardClick={handleCardClick} />
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Industrial Gradient Test</h2>
          <IndustrialStackableCards onCardClick={handleCardClick} />
        </section>

        {/* <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Foam Gradient Test</h2>
          <FoamStackableCards onCardClick={handleCardClick} />
        </section> */}

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Composites Gradient Test</h2>
          <CompositesStackableCards onCardClick={handleCardClick} />
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-4">Insulation Gradient Test</h2>
          <InsulationStackableCards onCardClick={handleCardClick} />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default GradientTestPage; 