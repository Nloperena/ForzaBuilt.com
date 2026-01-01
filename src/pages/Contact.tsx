import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HeaderV2 from '@/components/Header/HeaderV2';
import FooterV2 from '@/components/FooterV2';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import { motion } from 'framer-motion';
import VideoSkeleton from '@/components/common/VideoSkeleton';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

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
    // Force video to load when component mounts or sources change
    if (videoRef.current) {
    const video = videoRef.current;
      // Reset video state
      video.load();
      
      // Try to play after a short delay
      const playTimeout = setTimeout(() => {
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA
          video.play().catch((err) => {
            console.warn('Video autoplay failed:', err);
          });
        }
      }, 100);
      
      return () => clearTimeout(playTimeout);
    }
  }, []);

  const handleVideoLoad = () => {
    console.log('Contact page video loaded successfully');
      setIsVideoLoaded(true);
    };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.currentTarget;
    const error = videoElement.error;
    if (error) {
      console.error('Video error details:', {
        code: error.code,
        message: error.message,
        networkState: videoElement.networkState,
        readyState: videoElement.readyState,
        currentSrc: videoElement.currentSrc
      });
    }
    console.warn('Contact page video failed to load, showing fallback', e);
    setVideoError(true);
    setIsVideoLoaded(true);
    };

  return (
    <div className="bg-white min-h-screen flex flex-col relative overflow-x-hidden">
      <DynamicMetaTags
        title="Contact ForzaBuilt - Get Expert Industrial Solutions"
        description="Contact ForzaBuilt for expert guidance on industrial adhesives, sealants, and tapes. Our team provides technical support and custom solutions for your manufacturing needs."
        url="/contact"
        type="website"
      />
      <HeaderV2 />
      
      <div className="flex-1 relative">
        {/* Hero Section - Eagle Video */}
        <section className="relative h-[60vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] md:pt-12 2xl:pt-0">
          {!isVideoLoaded && <VideoSkeleton />}
          
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onCanPlayThrough={handleVideoLoad}
            onError={handleVideoError}
            onLoadStart={() => console.log('Contact page video loading started')}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              zIndex: 1,
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
          >
            <source src="/videos/backgrounds/Eagle Header Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e]/60 to-[#81899f]/60" style={{ zIndex: 2 }} />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ zIndex: 10 }}>
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <h3 
                className="font-regular text-center leading-tight font-poppins text-white"
                style={{ 
                  fontSize: 'clamp(1rem, 2vw + 0.5rem, 2.5rem)',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}
              >
              Ready to discuss your project<br />Let's find the right solution together
            </h3>
          </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-12 md:py-20 lg:py-24 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div 
                className="bg-[#f5f7fa] rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 md:mb-8">
                  <h2 
                    className="font-poppins text-[#1B3764] mb-3 md:mb-4 tracking-tight"
                    style={{ fontSize: 'clamp(24px, 2.5vw + 0.5rem, 40px)' }}
                  >
                    Get In Touch
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg font-poppins text-[#1B3764]/70">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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
                    className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white py-4 px-6 rounded-xl font-bold transition-all duration-200 font-poppins text-base shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
                <motion.div 
                className="flex flex-col justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                >
                <div className="mb-6 md:mb-8">
                  <h2 
                    className="font-poppins text-[#1B3764] mb-3 md:mb-4 tracking-tight"
                    style={{ fontSize: 'clamp(24px, 2.5vw + 0.5rem, 40px)' }}
                  >
                      Contact Information
                    </h2>
                  <p className="text-sm md:text-base lg:text-lg font-poppins text-[#1B3764]/70">
                      Get in touch with our team for expert guidance and support.
                    </p>
                  </div>

                <div className="space-y-4 md:space-y-5">
                  <div className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <MapPin className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                      <h4 className="text-[#1B3764] font-poppins text-base md:text-lg mb-2 font-semibold">HQ Address</h4>
                      <p className="text-[#1B3764]/70 font-poppins text-sm md:text-base leading-relaxed">
                          <span className="font-bold text-[#1B3764]">Forza</span><br />
                          3211 Nebraska Ave, Suite 300<br />
                          Council Bluffs, Iowa 51501
                        </p>
                      </div>
                    </div>
                    
                  <div className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Phone className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                      <h4 className="text-[#1B3764] font-poppins text-base md:text-lg mb-2 font-semibold">Phone</h4>
                      <p className="text-[#1B3764]/70 font-poppins text-sm md:text-base">
                        <a href="tel:4027319300" className="font-bold text-[#1B3764] hover:text-[#F2611D] transition-colors">
                          O. 402.731.9300
                        </a>
                        </p>
                      </div>
                    </div>
                    
                  <div className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                      <h4 className="text-[#1B3764] font-poppins text-base md:text-lg mb-2 font-semibold">Email</h4>
                      <p className="text-[#1B3764]/70 font-poppins text-sm md:text-base">
                          <a href="mailto:support@forzabuilt.com" className="text-[#F2611D] hover:text-[#F2611D]/80 underline font-semibold">
                            support@forzabuilt.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                  <div className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Clock className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                      <h4 className="text-[#1B3764] font-poppins text-base md:text-lg mb-2 font-semibold">Business Hours</h4>
                      <p className="text-[#1B3764]/70 font-poppins text-sm md:text-base leading-relaxed">
                          <span className="font-bold">Mon – Fri | 8:00 AM – 4:30 PM CST</span><br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </div>

                  <div className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#1B3764]/5 rounded-full flex items-center justify-center group-hover:bg-[#1B3764]/10 transition-colors">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                      <h4 className="text-[#1B3764] font-poppins text-base md:text-lg mb-2 font-semibold">Sales Inquiries</h4>
                      <p className="text-[#1B3764]/70 font-poppins text-sm md:text-base leading-relaxed">
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
        </section>
      </div>
      
      <FooterV2 />
    </div>
  );
};

export default Contact;
