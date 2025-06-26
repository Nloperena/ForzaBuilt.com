
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      id: 'construction',
      title: 'Construction Management',
      icon: '🏗️',
      features: [
        'End-to-end project oversight',
        'Quality control & safety standards', 
        'On-time delivery guaranteed'
      ],
      buttonText: 'Start project',
      technologies: ['AutoCAD', 'Revit', 'SketchUp'],
      supportedTech: ['BIM', 'CAD', '3D Modeling', 'Drone Survey', 'AR/VR'],
      specialties: ['Residential', 'Commercial', 'Industrial', 'Infrastructure']
    },
    {
      id: 'design',
      title: 'Architectural Design',
      icon: '📐',
      features: [
        'Custom architectural solutions',
        'Sustainable design practices',
        'Code compliance expertise'
      ],
      buttonText: 'Get design',
      model: 'Modern Minimalist',
      modelDesc: 'Contemporary design with clean lines',
      storyPrompt: 'Tell me about your dream home.',
      storyText: `Imagine walking into a space where every corner tells a story of thoughtful design and meticulous craftsmanship. Floor-to-ceiling windows flood the open-concept living area with natural light, while exposed steel beams add an industrial elegance. The kitchen island, crafted from locally sourced granite, serves as both a functional workspace and a gathering point for family and friends. This isn't just a house—it's a carefully orchestrated symphony of form and function, designed to enhance every moment of daily life.`
    },
    {
      id: 'renovation',
      title: 'Home Renovation',
      icon: '🔨',
      features: [
        'Complete home transformations',
        'Budget-friendly solutions',
        'Licensed & insured contractors'
      ],
      buttonText: 'Start renovation',
      projectOptions: [
        { name: 'Kitchen Remodel', location: 'Austin, TX', price: '$25K - $50K', duration: '6-8 weeks', flag: '🏠' },
        { name: 'Bathroom Upgrade', location: 'Houston, TX', price: '$15K - $30K', duration: '4-6 weeks', flag: '🛁' },
        { name: 'Basement Finish', location: 'Dallas, TX', price: '$20K - $40K', duration: '8-10 weeks', flag: '🏡' },
        { name: 'Whole House', location: 'San Antonio, TX', price: '$75K - $150K', duration: '12-16 weeks', flag: '🏘️' }
      ]
    }
  ];

  // Calculate where the cards section starts (after the 3 placeholder components)
  const cardsStartOffset = 3 * window.innerHeight;

  return (
    <div className="relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-slate-800">ForzaBuilt</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-600 hover:text-slate-800 transition-colors">Services</button>
            <button className="text-slate-600 hover:text-slate-800 transition-colors">Portfolio</button>
            <Button className="bg-slate-800 hover:bg-slate-700">Get Quote</Button>
          </div>
        </div>
      </div>

      {/* Top Placeholder Components */}
      <div className="w-full h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-slate-800">Welcome to ForzaBuilt</h1>
          <p className="text-xl text-slate-600 max-w-2xl">Building dreams with precision and passion</p>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
            Start Building
          </Button>
        </div>
      </div>

      <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <h2 className="text-5xl font-bold text-slate-800">Why Choose ForzaBuilt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-semibold">Expert Craftsmanship</h3>
              <p className="text-slate-600">20+ years of building excellence</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-slate-600">Only the finest materials and finishes</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-semibold">On-Time Delivery</h3>
              <p className="text-slate-600">Your project completed when promised</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <h2 className="text-5xl font-bold text-slate-800">Trusted by Texas Families</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['The Johnsons', 'Smith Family', 'Miller Estate', 'Davis Home'].map((client, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-slate-200 rounded-lg mx-auto mb-4"></div>
                <p className="font-semibold text-slate-700">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Card Stack */}
      <div className="relative">
        {cards.map((card, index) => {
          const cardHeight = window.innerHeight;
          const cardStart = cardsStartOffset + (index * cardHeight);
          const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / cardHeight));
          const nextCardProgress = Math.max(0, Math.min(1, (scrollY - cardStart - cardHeight) / cardHeight));
          
          // Calculate transforms
          const currentScale = 1 - progress * 0.05;
          const currentTranslateY = progress * -50;
          const isVisible = scrollY >= cardStart - cardHeight && scrollY < cardStart + cardHeight * 2;
          
          return (
            <div
              key={card.id}
              className="sticky top-0 w-full h-screen flex items-center justify-center"
              style={{
                zIndex: 40 + index,
              }}
            >
              <div 
                className="w-full h-full"
                style={{
                  transform: `translateY(${currentTranslateY}px) scale(${currentScale})`,
                  opacity: isVisible ? 1 - nextCardProgress : 0,
                }}
              >
                <Card className="w-full h-full bg-white/95 backdrop-blur-lg border-slate-200 shadow-2xl overflow-hidden rounded-none">
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Left Panel */}
                    <div className="p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
                      
                      {card.id === 'construction' && (
                        <div className="space-y-8 w-full">
                          {/* Technologies */}
                          <div className="flex items-center space-x-4 mb-8">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white text-xs">A</span>
                              </div>
                              <span className="text-sm font-medium">AutoCAD</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                                <span className="text-white text-xs">R</span>
                              </div>
                              <span className="text-sm font-medium">Revit</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                                <span className="text-white text-xs">S</span>
                              </div>
                              <span className="text-sm font-medium">SketchUp</span>
                            </div>
                          </div>

                          {/* Service Badge */}
                          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
                            <span className="text-orange-500">+</span>
                            <span>Project Management Service</span>
                          </div>

                          {/* Supported Technologies */}
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                              {card.supportedTech.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 border border-slate-200">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Specialties */}
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Specialties</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs">🏠</span>
                                </div>
                                <span className="font-semibold">Residential</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs">🏢</span>
                                </div>
                                <span className="font-semibold">Commercial</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs">🏭</span>
                                </div>
                                <span className="font-semibold">Industrial</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs">🌉</span>
                                </div>
                                <span className="font-semibold">Infrastructure</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {card.id === 'design' && (
                        <div className="space-y-6 w-full">
                          {/* Model Header */}
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">M</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{card.model}</h3>
                              <p className="text-slate-600">{card.modelDesc}</p>
                            </div>
                          </div>

                          {/* Consultation Interface */}
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

                          {/* Story Example */}
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

                      {card.id === 'renovation' && (
                        <div className="space-y-6 w-full">
                          {/* Project Type Toggle */}
                          <div className="flex space-x-1 bg-slate-200 rounded-lg p-1 w-fit">
                            <button className="px-4 py-2 rounded-md bg-white shadow-sm text-sm font-medium">Residential</button>
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-slate-600">Commercial</button>
                          </div>

                          {/* Project Options */}
                          <div className="space-y-3">
                            {card.projectOptions.map((project, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <span className="text-orange-600 text-lg">{project.flag}</span>
                                  </div>
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

                          {/* Indicator */}
                          <div className="flex justify-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Panel */}
                    <div className="p-8 lg:p-16 flex flex-col justify-center bg-white">
                      <div className="space-y-8">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                        </div>

                        {/* Title */}
                        <h2 className="text-5xl font-bold text-slate-800 leading-tight">
                          {card.title}
                        </h2>

                        {/* Features */}
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

                        {/* CTA Button */}
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
            </div>
          );
        })}
      </div>

      {/* Bottom Placeholder Components */}
      <div className="w-full h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <h2 className="text-5xl font-bold text-slate-800">Ready to Build Your Dream?</h2>
          <p className="text-xl text-slate-600">Join hundreds of satisfied homeowners across Texas</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
              Get Free Quote
            </Button>
            <Button variant="outline" className="border-2 border-slate-300 px-8 py-4 rounded-xl text-lg font-semibold">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Services</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Construction</li>
                <li>Renovation</li>
                <li>Design</li>
                <li>Consultation</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Projects</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Custom Homes</li>
                <li>Kitchen Remodels</li>
                <li>Bathroom Upgrades</li>
                <li>Additions</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Company</h3>
              <ul className="space-y-2 text-slate-600">
                <li>About</li>
                <li>Team</li>
                <li>Portfolio</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Process</li>
                <li>Warranty</li>
                <li>Financing</li>
                <li>Reviews</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500">© 2024 ForzaBuilt. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Spacer to allow scrolling */}
      <div style={{ height: `${(cards.length + 5) * window.innerHeight}px` }} />
    </div>
  );
};

export default Index;
