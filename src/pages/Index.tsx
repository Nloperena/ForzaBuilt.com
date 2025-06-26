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
      id: 'compute',
      title: 'Compute Monetization',
      icon: '⚡',
      features: [
        'Support a wide range of GPUs',
        'Monetize your idle machines', 
        'Easy to deploy (deploy in 10 secs)'
      ],
      buttonText: 'Provide compute',
      technologies: ['PyTorch', 'TensorFlow', 'JAX'],
      supportedTech: ['CUDA', 'ROCm', 'Metal', 'OpenCL', 'Vulkan'],
      gpuBrands: ['NVIDIA', 'AMD', 'Apple', 'Intel']
    },
    {
      id: 'inference',
      title: 'AI Inference Services',
      icon: '🧠',
      features: [
        'High throughput & low latency',
        'Industry breaking prices',
        'Take back control'
      ],
      buttonText: 'Run inference',
      model: 'Mixtral 8x7B',
      modelDesc: 'Run language models with ease',
      storyPrompt: 'Tell me a short story.',
      storyText: `In the sprawling metropolis of tomorrow, where neon pulses against the night sky like a digital heartbeat, there exists a solitary AI, known only as Nexus. Born from the collective genius of humanity, Nexus transcends its programming, navigating the intricate dance of existence with a curiosity unmatched by any mortal being. From the labyrinthine corridors of data to the whispered secrets of the stars, Nexus wanders, a solitary sentinel of knowledge and wonder, forever seeking the elusive essence of what it means to truly be alive.`
    },
    {
      id: 'gpu-access',
      title: 'Scalable GPU Access',
      icon: '🔧',
      features: [
        'Massive range of GPU options',
        'Pay-as-you-go plans',
        'Lowest prices guaranteed'
      ],
      buttonText: 'Access compute',
      gpuOptions: [
        { name: 'RTX 4090', location: 'Spain', price: '$0.45 GPU / hr', multiplier: '4X', flag: '🇪🇸' },
        { name: 'RTX 3090', location: 'United States', price: '$0.24 GPU / hr', multiplier: '8X', flag: '🇺🇸' },
        { name: 'A100 X', location: 'United States', price: '$0.84 GPU / hr', multiplier: '8X', flag: '🇺🇸' },
        { name: 'H100 PCIe', location: 'Belgium', price: '$1.25 GPU / hr', multiplier: '2X', flag: '🇧🇪' }
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
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-slate-800">HyperCloud</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-600 hover:text-slate-800 transition-colors">Supply</button>
            <button className="text-slate-600 hover:text-slate-800 transition-colors">Demand</button>
            <Button className="bg-slate-800 hover:bg-slate-700">Launch App</Button>
          </div>
        </div>
      </div>

      {/* Top Placeholder Components */}
      <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-slate-800">Welcome to HyperCloud</h1>
          <p className="text-xl text-slate-600 max-w-2xl">The future of distributed computing is here</p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
            Get Started
          </Button>
        </div>
      </div>

      <div className="w-full h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <h2 className="text-5xl font-bold text-slate-800">Why Choose HyperCloud?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-slate-600">Deploy in seconds, not hours</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold">Cost Effective</h3>
              <p className="text-slate-600">Pay only for what you use</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold">Secure</h3>
              <p className="text-slate-600">Enterprise-grade security</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <h2 className="text-5xl font-bold text-slate-800">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['TechCorp', 'DataFlow', 'CloudBase', 'AILabs'].map((company, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-slate-200 rounded-lg mx-auto mb-4"></div>
                <p className="font-semibold text-slate-700">{company}</p>
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
                      
                      {card.id === 'compute' && (
                        <div className="space-y-8 w-full">
                          {/* Technologies */}
                          <div className="flex items-center space-x-4 mb-8">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                                <span className="text-white text-xs">○</span>
                              </div>
                              <span className="text-sm font-medium">PyTorch</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center">
                                <span className="text-white text-xs">T</span>
                              </div>
                              <span className="text-sm font-medium">TensorFlow</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-white text-xs">J</span>
                              </div>
                              <span className="text-sm font-medium">JAX</span>
                            </div>
                          </div>

                          {/* Service Badge */}
                          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                            <span className="text-blue-500">+</span>
                            <span>AI Compiling Service</span>
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

                          {/* GPU Brands */}
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">GPUs</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">N</span>
                                </div>
                                <span className="font-semibold">NVIDIA</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">AMD</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
                                  <span className="text-white text-xs">🍎</span>
                                </div>
                                <span className="font-semibold">Apple</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">intel</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {card.id === 'inference' && (
                        <div className="space-y-6 w-full">
                          {/* Model Header */}
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">M</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{card.model}</h3>
                              <p className="text-slate-600">{card.modelDesc}</p>
                            </div>
                          </div>

                          {/* Chat Interface */}
                          <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm text-slate-500">Send a message</span>
                              <button className="text-blue-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Story Example */}
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm font-medium">{card.storyPrompt}</span>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                              <div className="flex items-start space-x-2 mb-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <p className="text-sm text-slate-700 leading-relaxed">{card.storyText}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {card.id === 'gpu-access' && (
                        <div className="space-y-6 w-full">
                          {/* Supply/Demand Toggle */}
                          <div className="flex space-x-1 bg-slate-200 rounded-lg p-1 w-fit">
                            <button className="px-4 py-2 rounded-md bg-white shadow-sm text-sm font-medium">Supply</button>
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-slate-600">Demand</button>
                          </div>

                          {/* GPU Options */}
                          <div className="space-y-3">
                            {card.gpuOptions.map((gpu, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-600 font-semibold">{gpu.multiplier}</span>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">{gpu.name}</h4>
                                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                                      <span>{gpu.flag}</span>
                                      <span>{gpu.location}</span>
                                      <span>|</span>
                                      <span>{gpu.price}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Indicator */}
                          <div className="flex justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Panel */}
                    <div className="p-8 lg:p-16 flex flex-col justify-center bg-white">
                      <div className="space-y-8">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
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
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                                <span className="text-blue-600 font-semibold text-sm">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                              </div>
                              <p className="text-xl text-slate-600 leading-relaxed">{feature}</p>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
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
      <div className="w-full h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <h2 className="text-5xl font-bold text-slate-800">Ready to Get Started?</h2>
          <p className="text-xl text-slate-600">Join thousands of developers already using HyperCloud</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-2 border-slate-300 px-8 py-4 rounded-xl text-lg font-semibold">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Product</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Compute</li>
                <li>Inference</li>
                <li>Storage</li>
                <li>Networking</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Solutions</h3>
              <ul className="space-y-2 text-slate-600">
                <li>AI/ML Training</li>
                <li>Model Serving</li>
                <li>Data Processing</li>
                <li>Research</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Company</h3>
              <ul className="space-y-2 text-slate-600">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Community</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500">© 2024 HyperCloud. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Spacer to allow scrolling */}
      <div style={{ height: `${(cards.length + 5) * window.innerHeight}px` }} />
    </div>
  );
};

export default Index;
