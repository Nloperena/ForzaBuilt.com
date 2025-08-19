import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Linkedin } from 'lucide-react';
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
            <h1 className="text-4xl md:text-4xl font-black text-white mb-4 leading-none font-kallisto">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 font-poppins">
              Ready to discuss your project? Let's find the right solution together.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-b from-[#1B3764] via-[#1B3764]/95 to-[#1B3764] relative overflow-hidden sticky top-0">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#F2611D]/10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-300/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div className="shadow-2xl border-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#1B3764] to-[#F2611D] text-white p-6">
                  <h3 className="text-2xl font-black font-kallisto">
                    Get In Touch
                  </h3>
                  <p className="text-white/90 font-poppins">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>
                <div className="p-8">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-semibold text-white font-poppins">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-white placeholder-white/50"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-semibold text-white font-poppins">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-white placeholder-white/50"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-white font-poppins">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-white placeholder-white/50"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold text-white font-poppins">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-white placeholder-white/50"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-white font-poppins">
                        Message *
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent resize-none transition-all duration-200 font-poppins text-white placeholder-white/50"
                        placeholder="Tell us about your project and how we can help..."
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#F2611D] to-[#F2611D]/90 hover:from-[#F2611D]/80 hover:to-[#F2611D]/70 text-white py-3 px-6 rounded-lg font-bold transition-all duration-200 font-poppins text-lg shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-black text-white mb-6 font-kallisto">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins text-base">HQ Address</h4>
                        <p className="text-white/90 font-poppins text-sm">
                          <span className="font-bold text-[#F2611D]">Forza</span><br />
                          3211 Nebraska Ave, Suite 300<br />
                          Council Bluffs, Iowa 51501
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <Phone className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins text-base">Phone</h4>
                        <p className="text-white/90 font-poppins text-sm">
                          <span className="font-bold">O. 402.731.9300</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins text-base">Email</h4>
                        <p className="text-white/90 font-poppins text-sm">
                                      <a href="mailto:info@forza.com" className="text-[#F2611D] hover:text-[#F2611D]/80 underline font-semibold">
              info@forza.com
            </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins text-base">Business Hours</h4>
                        <p className="text-white/90 font-poppins text-sm">
                          <span className="font-bold">Mon – Fri | 8:00 AM – 4:30 PM CST</span><br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-poppins text-base">Sales Inquiries</h4>
                        <p className="text-white/90 font-poppins text-sm">
                          <a href="mailto:sales@forzabuilt.com" className="text-[#F2611D] hover:text-[#F2611D]/80 underline font-semibold">
                            sales@forzabuilt.com
                          </a><br />
                          <span className="text-xs">For optimization inquiries and working with us</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#F2611D] to-[#F2611D]/80 p-6 rounded-xl shadow-2xl text-white border border-white/20">
                  <h4 className="font-bold text-xl mb-4 font-kallisto">Why Choose ForzaBuilt?</h4>
                  <ul className="space-y-2 text-white/90 font-poppins text-sm">
                    <li className="flex items-center space-x-3">
                      <span className="text-white text-lg font-bold">•</span>
                      <span>Expert technical support & application engineering</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-white text-lg font-bold">•</span>
                      <span>Custom solutions for your specific needs</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-white text-lg font-bold">•</span>
                      <span>Fast response times within 24 hours</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-white text-lg font-bold">•</span>
                      <span>Industry-leading adhesive & sealant products</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-white text-lg font-bold">•</span>
                      <span>Made in America quality & reliability</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="text-white text-lg font-bold">•</span>
                      <span>30+ years of proven expertise</span>
                    </li>
                  </ul>
                </div>

                {/* Social Media */}
                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-white/20 text-center">
                  <h4 className="font-bold text-lg mb-3 font-kallisto text-white">Connect With Us</h4>
                  <div className="flex justify-center">
                    <a 
                      href="https://www.linkedin.com/company/forza-built/posts/?feedView=all" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  </div>
                  <p className="text-white/80 text-xs mt-2 font-poppins">
                    Follow us on LinkedIn for industry insights and company updates
                  </p>
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