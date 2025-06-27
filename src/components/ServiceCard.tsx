
/**
 * ServiceCard Component
 * 
 * Individual service card component that renders different layouts based on card type.
 * This component is data-driven and handles three different card types:
 * 1. Construction Management - Shows technologies and specialties
 * 2. Architectural Design - Shows design models and storytelling interface
 * 3. Home Renovation - Shows project options with pricing
 * 
 * The component uses conditional rendering to display appropriate content
 * based on the card's ID and available data properties.
 */

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ServiceCardProps } from '../types/ServiceCard';

const ServiceCard = ({ card, transform, opacity }: ServiceCardProps) => {
  return (
    <div 
      className="w-full h-full"
      style={{
        transform, // Applied transform for scroll animations
        opacity,   // Applied opacity for fade effects
      }}
    >
      {/* Main card container with glassmorphism effect */}
      <Card className="w-full h-full bg-white/95 backdrop-blur-lg border-slate-200 shadow-2xl overflow-hidden rounded-none">
        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          
          {/* Left Panel - Dynamic content based on card type */}
          <div className="p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
            
            {/* Construction Management Card Layout */}
            {card.id === 'construction' && (
              <div className="space-y-8 w-full">
                {/* Technology badges - displays primary technologies */}
                <div className="flex items-center space-x-4 mb-8">
                  {card.technologies?.map((tech, i) => {
                    // Dynamic color assignment for technology badges
                    const colors = ['bg-blue-500', 'bg-green-600', 'bg-red-600'];
                    const color = colors[i % colors.length];
                    
                    return (
                      <div key={tech} className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center`}>
                          <span className="text-white text-xs">{tech[0]}</span>
                        </div>
                        <span className="text-sm font-medium">{tech}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Service identification badge */}
                <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
                  <span className="text-orange-500">+</span>
                  <span>Project Management Service</span>
                </div>

                {/* Supported technologies tags */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {card.supportedTech?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialty areas grid */}
                <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Specialties</p>
                  <div className="grid grid-cols-2 gap-4">
                    {card.specialties?.map((specialty, i) => {
                      // Icon mapping for different specialty types
                      const icons = ['🏠', '🏢', '🏭', '🌉'];
                      const colors = ['bg-blue-600', 'bg-green-600', 'bg-orange-600', 'bg-purple-600'];
                      
                      return (
                        <div key={specialty} className="flex items-center space-x-2">
                          <div className={`w-8 h-8 ${colors[i % colors.length]} rounded flex items-center justify-center`}>
                            <span className="text-white text-xs">{icons[i % icons.length]}</span>
                          </div>
                          <span className="font-semibold">{specialty}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Architectural Design Card Layout */}
            {card.id === 'design' && (
              <div className="space-y-6 w-full">
                {/* Design model header */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">M</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{card.model}</h3>
                    <p className="text-slate-600">{card.modelDesc}</p>
                  </div>
                </div>

                {/* Consultation interface mockup */}
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-500">Start your consultation</span>
                    <button className="text-orange-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Story/consultation example */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium">{card.storyPrompt}</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start space-x-2 mb-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-sm text-slate-700 leading-relaxed">{card.storyText}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Home Renovation Card Layout */}
            {card.id === 'renovation' && (
              <div className="space-y-6 w-full">
                {/* Project type toggle */}
                <div className="flex space-x-1 bg-slate-200 rounded-lg p-1 w-fit">
                  <button className="px-4 py-2 rounded-md bg-white shadow-sm text-sm font-medium">Residential</button>
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-slate-600">Commercial</button>
                </div>

                {/* Project options list */}
                <div className="space-y-3">
                  {card.projectOptions?.map((project, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-center space-x-4">
                        {/* Project type icon */}
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-orange-600 text-lg">{project.flag}</span>
                        </div>
                        {/* Project details */}
                        <div>
                          <h4 className="font-semibold">{project.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                            <span>{project.location}</span>
                            <span>|</span>
                            <span>{project.price}</span>
                            <span>|</span>
                            <span>{project.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visual indicator */}
                <div className="flex justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Consistent across all card types */}
          <div className="p-8 lg:p-16 flex flex-col justify-center bg-white">
            <div className="space-y-8">
              {/* Service icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
              </div>

              {/* Service title */}
              <h2 className="text-5xl font-bold text-slate-800 leading-tight">
                {card.title}
              </h2>

              {/* Feature list with numbered items */}
              <div className="space-y-6">
                {card.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-orange-600 font-semibold text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-xl text-slate-600 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Call-to-action button */}
              <div className="pt-4">
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  {card.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;
