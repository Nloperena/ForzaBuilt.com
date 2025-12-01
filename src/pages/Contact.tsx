import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HeaderV2 from '@/components/Header/HeaderV2';
import FooterV2 from '@/components/FooterV2';
import VideoSkeleton from '@/components/common/VideoSkeleton';
import { useGradientMode } from '@/contexts/GradientModeContext';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import { motion } from 'framer-motion';

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
  const { mode } = useGradientMode();
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
    <div className="bg-white min-h-screen flex flex-col relative overflow-x-hidden">
      <DynamicMetaTags
        title="Contact ForzaBuilt - Get Expert Industrial Solutions"
        description="Contact ForzaBuilt for expert guidance on industrial adhesives, sealants, and tapes. Our team provides technical support and custom solutions for your manufacturing needs."
        url="/contact"
        type="website"
      />
      <HeaderV2 />
      
      <div className="flex-1">
        {/* Hero Section - Gradient Background */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 text-center z-20 bg-gradient-to-bl from-[#477197] to-[#2c476e]">
          <motion.div 
            className="max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-black mb-0 leading-none font-kallisto text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              CONTACT US
            </h1>
            <h3 className="font-regular text-center leading-tight font-poppins text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mt-4">
              Ready to discuss your project?<br />Let's find the right solution together.
            </h3>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="relative py-16 md:py-24 px-4 bg-white z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div 
                className="bg-[#f5f7fa] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold font-kallisto text-[#1B3764] mb-4">
                    Get In Touch
                  </h2>
                  <p className="text-lg font-poppins text-[#1B3764]/70">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-bold text-[#1B3764] font-poppins">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-[#1B3764] placeholder-gray-400"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-bold text-[#1B3764] font-poppins">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-[#1B3764] placeholder-gray-400"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-[#1B3764] font-poppins">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-[#1B3764] placeholder-gray-400"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-bold text-[#1B3764] font-poppins">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins text-[#1B3764] placeholder-gray-400"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-bold text-[#1B3764] font-poppins">
                      Message *
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent resize-none transition-all duration-200 font-poppins text-[#1B3764] placeholder-gray-400"
                      placeholder="Tell us about your project and how we can help..."
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white py-6 px-6 rounded-xl font-bold transition-all duration-200 font-poppins text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center">
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-kallisto text-[#1B3764] mb-4">
                      Contact Information
                    </h2>
                    <p className="text-lg font-poppins text-[#1B3764]/70">
                      Get in touch with our team for expert guidance and support.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <MapPin className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg mb-1">HQ Address</h4>
                        <p className="text-[#1B3764]/70 font-poppins text-base">
                          <span className="font-bold text-[#1B3764]">Forza</span><br />
                          3211 Nebraska Ave, Suite 300<br />
                          Council Bluffs, Iowa 51501
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Phone className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg mb-1">Phone</h4>
                        <p className="text-[#1B3764]/70 font-poppins text-base">
                          <span className="font-bold">O. 402.731.9300</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg mb-1">Email</h4>
                        <p className="text-[#1B3764]/70 font-poppins text-base">
                          <a href="mailto:support@forzabuilt.com" className="text-[#F2611D] hover:text-[#F2611D]/80 underline font-semibold">
                            support@forzabuilt.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Clock className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg mb-1">Business Hours</h4>
                        <p className="text--[#1B3764]/70 font-poppins text-base">
                          <span className="font-bold">Mon – Fri | 8:00 AM – 4:30 PM CST</span><br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B3764] font-poppins text-lg mb-1">Sales Inquiries</h4>
                        <p className="text-[#1B3764]/70 font-poppins text-base">
                          <a href="mailto:sales@forzabuilt.com" className="text-[#F2611D] hover:text-[#F2611D]/80 underline font-semibold">
                            sales@forzabuilt.com
                          </a><br />
                          <span className="text-xs text-[#1B3764]/50">For optimization inquiries and working with us</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <FooterV2 />
    </div>
  );
};

export default Contact;
