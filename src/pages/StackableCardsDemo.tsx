import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  MarineStackableCards,
  TransportationStackableCards,
  ConstructionStackableCards,
  IndustrialStackableCards,
  FoamStackableCards,
  CompositesStackableCards,
  InsulationStackableCards
} from '../components/StackableCards/IndustryStackableCards';

const StackableCardsDemo = () => {
  const handleCardClick = (cardId: string) => {
    console.log('Card clicked:', cardId);
    // Handle card clicks - could navigate to specific product pages
  };

  return (
    <div className="min-h-screen bg-[#1b3764]">
      <Header />
      
      {/* Navigation to different industry demos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-[#1b3764] mb-8 text-center font-kallisto">
            StackableCards Demo
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-4xl mx-auto">
            This page demonstrates the reusable StackableCards component for different industries. 
            Each section shows industry-specific cards with appropriate themes and content.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Link 
              to="#marine" 
              className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              Marine
            </Link>
            <Link 
              to="#transportation" 
              className="bg-gray-600 text-white p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
            >
              Transportation
            </Link>
            <Link 
              to="#construction" 
              className="bg-orange-600 text-white p-4 rounded-lg text-center hover:bg-orange-700 transition-colors"
            >
              Construction
            </Link>
            <Link 
              to="#industrial" 
              className="bg-gray-600 text-white p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
            >
              Industrial
            </Link>
            <Link 
              to="#foam" 
              className="bg-orange-600 text-white p-4 rounded-lg text-center hover:bg-orange-700 transition-colors"
            >
              Foam
            </Link>
            <Link 
              to="#composites" 
              className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
            >
              Composites
            </Link>
            <Link 
              to="#insulation" 
              className="bg-orange-600 text-white p-4 rounded-lg text-center hover:bg-orange-700 transition-colors"
            >
              Insulation
            </Link>
          </div>
        </div>
      </section>

      {/* Marine Section */}
      <section id="marine" className="py-8">
        <MarineStackableCards onCardClick={handleCardClick} />
      </section>

      {/* Transportation Section */}
      <section id="transportation" className="py-8">
        <TransportationStackableCards onCardClick={handleCardClick} />
      </section>

      {/* Construction Section */}
      <section id="construction" className="py-8">
        <ConstructionStackableCards onCardClick={handleCardClick} />
      </section>

      {/* Industrial Section */}
      <section id="industrial" className="py-8">
        <IndustrialStackableCards onCardClick={handleCardClick} />
      </section>

      {/* Foam Section */}
      <section id="foam" className="py-8">
        <FoamStackableCards onCardClick={handleCardClick} />
      </section>

      {/* Composites Section */}
      <section id="composites" className="py-8">
        <CompositesStackableCards onCardClick={handleCardClick} />
      </section>

      {/* Insulation Section */}
      <section id="insulation" className="py-8">
        <InsulationStackableCards onCardClick={handleCardClick} />
      </section>

      <Footer />
    </div>
  );
};

export default StackableCardsDemo; 