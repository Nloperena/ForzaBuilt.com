
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ServiceCardProps {
  card: {
    id: string;
    title: string;
    icon: string;
    features: string[];
    buttonText: string;
    technologies?: string[];
    supportedTech?: string[];
    specialties?: string[];
    model?: string;
    modelDesc?: string;
    storyPrompt?: string;
    storyText?: string;
    projectOptions?: Array<{
      name: string;
      location: string;
      price: string;
      duration: string;
      flag: string;
    }>;
  };
  transform: string;
  opacity: number;
}

const ServiceCard = ({ card, transform, opacity }: ServiceCardProps) => {
  return (
    <div 
      className="w-full h-full"
      style={{
        transform,
        opacity,
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
                    {card.supportedTech?.map((tech, i) => (
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
                  {card.projectOptions?.map((project, i) => (
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
  );
};

export default ServiceCard;
