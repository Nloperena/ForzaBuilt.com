import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });

    } catch (error: any) {
      console.error('Contact form error:', error);
      toast({
        title: "Error sending message",
        description: "Failed to submit form. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handleError = () => {
      console.error('Video failed to load');
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B3764]/90 to-[#09668D]/70 z-10"></div>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: isVideoLoaded ? 1 : 0, zIndex: 1 }}
          >
            <source 
              src="https://forzabuilt.com/wp-content/uploads/2024/12/ForzaLionLoop-1-2.mp4" 
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          
          <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-none font-kallisto">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 font-poppins">
              Ready to discuss your project? Let's find the right solution together.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[#1B3764] to-[#09668D] text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-black font-kallisto">
                    Get In Touch
                  </CardTitle>
                  <p className="text-white/90 font-poppins">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-semibold text-[#1B3764] font-poppins">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200 font-poppins"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-semibold text-[#1B3764] font-poppins">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200 font-poppins"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-[#1B3764] font-poppins">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200 font-poppins"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold text-[#1B3764] font-poppins">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent transition-all duration-200 font-poppins"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-[#1B3764] font-poppins">
                        Message *
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F16022] focus:border-transparent resize-none transition-all duration-200 font-poppins"
                        placeholder="Tell us about your project and how we can help..."
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#F16022] to-[#D35127] hover:from-[#F16022]/90 hover:to-[#D35127]/90 text-white py-3 px-6 rounded-lg font-bold transition-all duration-200 font-poppins text-lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-black text-[#1B3764] mb-8 font-kallisto">
                    Contact Information
                  </h3>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                      <div className="flex-shrink-0">
                        <MapPin className="w-8 h-8 text-[#F16022]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg">Address</h4>
                        <p className="text-[#09668D] font-poppins">
                          123 Industrial Way<br />
                          Manufacturing District<br />
                          City, State 12345
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                      <div className="flex-shrink-0">
                        <Phone className="w-8 h-8 text-[#F16022]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg">Phone</h4>
                        <p className="text-[#09668D] font-poppins">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                      <div className="flex-shrink-0">
                        <Mail className="w-8 h-8 text-[#F16022]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg">Email</h4>
                        <p className="text-[#09668D] font-poppins">info@forzabuilt.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white/20">
                      <div className="flex-shrink-0">
                        <Clock className="w-8 h-8 text-[#F16022]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg">Business Hours</h4>
                        <p className="text-[#09668D] font-poppins">
                          Monday - Friday: 8:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 2:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#1B3764] to-[#09668D] p-8 rounded-xl shadow-xl text-white">
                  <h4 className="font-bold text-2xl mb-6 font-kallisto">Why Choose ForzaBuilt?</h4>
                  <ul className="space-y-3 text-white/90 font-poppins">
                    <li className="flex items-center space-x-3">
                      <span className="text-[#F16022] text-xl">•</span>
                      <span>Expert technical support</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-[#F16022] text-xl">•</span>
                      <span>Custom solutions for your needs</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-[#F16022] text-xl">•</span>
                      <span>Fast response times</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-[#F16022] text-xl">•</span>
                      <span>Industry-leading products</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-[#F16022] text-xl">•</span>
                      <span>Made in America quality</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact; 