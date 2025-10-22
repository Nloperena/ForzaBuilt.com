import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoSkeleton from '@/components/common/VideoSkeleton';
import { useGradientMode } from '@/contexts/GradientModeContext';
import DynamicMetaTags from '@/components/DynamicMetaTags';

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
    <div className={`min-h-screen flex flex-col ${mode === 'light' || mode === 'light2' ? 'bg-white' : ''}`}>
      <DynamicMetaTags
        title="Contact ForzaBuilt - Get Expert Industrial Solutions"
        description="Contact ForzaBuilt for expert guidance on industrial adhesives, sealants, and tapes. Our team provides technical support and custom solutions for your manufacturing needs."
        url="/contact"
        type="website"
      />
      <Header />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#293350]/90 to-[#4a5a7a]/70 z-10"></div>
          
          {/* Video Skeleton Loading State */}
          {!isVideoLoaded && (
            <VideoSkeleton />
          )}
          
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isVideoLoaded ? 1 : 0, zIndex: 1 }}
          >
            <source 
              src="https://video-previews.elements.envatousercontent.com/adba67ed-69e8-4b91-8b79-f03dbf259b24/watermarked_preview/watermarked_preview.mp4" 
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          
          <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-none ${
              mode === 'light2' ? 'font-poppins text-[#293350]' : 'font-kallisto text-white'
            }`}>
              Contact Us
            </h1>
            <p className={`text-xl md:text-2xl ${
              mode === 'light2' ? 'text-[#293350]/80 font-poppins' : 'text-white/90 font-poppins'
            }`}>
              Ready to discuss your project? Let's find the right solution together.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative isolate overflow-visible py-20">
          {/* Background halves */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2 -z-10">
            <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50" />
            <div className="bg-gradient-to-r from-[#293350] to-[#4a5a7a]" />
          </div>

          <div className="relative overflow-visible z-0">
            {/* Two scalable squares */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden relative z-0">
              {/* LEFT SQUARE - Contact Form */}
              <div className="
                relative
                min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh]
                px-[clamp(14px,4vw,32px)] py-[clamp(32px,6vw,64px)]
                flex items-center justify-center
                [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
              ">
                <div className="w-full max-w-lg">
                  <div className="space-y-[var(--gap)] mb-[var(--gap)]">
                    <h2 className={`text-[clamp(32px,4vw,48px)] font-bold leading-[var(--lh-head)] tracking-[-0.01em] ${
                      mode === 'light2' ? 'font-poppins text-[#293350]' : 'font-kallisto text-white'
                    }`}>
                      Get In Touch
                    </h2>
                    <p className={`text-[clamp(16px,1.8vw,20px)] leading-relaxed ${
                      mode === 'light2' ? 'font-poppins text-[#293350]/80' : 'text-white/80 font-poppins'
                    }`}>
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className={`text-sm font-semibold ${
                          mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                        }`}>
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins ${
                            mode === 'light2' 
                              ? 'bg-white/80 border border-[#293350]/30 text-[#293350] placeholder-[#293350]/50' 
                              : 'bg-white/20 border border-white/30 text-white placeholder-white/50'
                          }`}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className={`text-sm font-semibold ${
                          mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                        }`}>
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins ${
                            mode === 'light2' 
                              ? 'bg-white/80 border border-[#293350]/30 text-[#293350] placeholder-[#293350]/50' 
                              : 'bg-white/20 border border-white/30 text-white placeholder-white/50'
                          }`}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className={`text-sm font-semibold ${
                        mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                      }`}>
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins ${
                          mode === 'light2' 
                            ? 'bg-white/80 border border-[#293350]/30 text-[#293350] placeholder-[#293350]/50' 
                            : 'bg-white/20 border border-white/30 text-white placeholder-white/50'
                        }`}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className={`text-sm font-semibold ${
                        mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                      }`}>
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent transition-all duration-200 font-poppins ${
                          mode === 'light2' 
                            ? 'bg-white/80 border border-[#293350]/30 text-[#293350] placeholder-[#293350]/50' 
                            : 'bg-white/20 border border-white/30 text-white placeholder-white/50'
                        }`}
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className={`text-sm font-semibold ${
                        mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                      }`}>
                        Message *
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2611D] focus:border-transparent resize-none transition-all duration-200 font-poppins ${
                          mode === 'light2' 
                            ? 'bg-white/80 border border-[#293350]/30 text-[#293350] placeholder-[#293350]/50' 
                            : 'bg-white/20 border border-white/30 text-white placeholder-white/50'
                        }`}
                        placeholder="Tell us about your project and how we can help..."
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white py-4 px-6 rounded-xl font-bold transition-all duration-200 font-poppins text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
                </div>
              </div>

              {/* RIGHT SQUARE - Contact Information */}
              <div className="
                relative
                min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh]
                px-[clamp(14px,4vw,32px)] py-[clamp(32px,6vw,64px)]
                flex items-center justify-center
                [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
              ">
                <div className="w-full">
                  <div className="space-y-[var(--gap)] mb-[var(--gap)]">
                    <h2 className={`text-[clamp(32px,4vw,48px)] font-bold leading-[var(--lh-head)] tracking-[-0.01em] ${
                      mode === 'light2' ? 'font-poppins text-[#293350]' : 'font-kallisto text-white'
                    }`}>
                      Contact Information
                    </h2>
                    <p className={`text-[clamp(16px,1.8vw,20px)] leading-relaxed ${
                      mode === 'light2' ? 'font-poppins text-[#293350]/80' : 'text-white/80 font-poppins'
                    }`}>
                      Get in touch with our team for expert guidance and support.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className={`flex items-start space-x-4 p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      mode === 'light2' 
                        ? 'bg-white/80 border-[#293350]/20 hover:bg-white/90' 
                        : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'
                    }`}>
                      <div className="flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-base ${
                          mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                        }`}>
                          HQ Address
                        </h4>
                        <p className={`text-sm mt-1 ${
                          mode === 'light2' ? 'text-[#293350]/80 font-poppins' : 'text-white/90 font-poppins'
                        }`}>
                          <span className="font-bold text-[#F2611D]">Forza</span><br />
                          3211 Nebraska Ave, Suite 300<br />
                          Council Bluffs, Iowa 51501
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start space-x-4 p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      mode === 'light2' 
                        ? 'bg-white/80 border-[#293350]/20 hover:bg-white/90' 
                        : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'
                    }`}>
                      <div className="flex-shrink-0">
                        <Phone className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-base ${
                          mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                        }`}>
                          Phone
                        </h4>
                        <p className={`text-sm mt-1 ${
                          mode === 'light2' ? 'text-[#293350]/80 font-poppins' : 'text-white/90 font-poppins'
                        }`}>
                          <span className="font-bold">O. 402.731.9300</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start space-x-4 p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      mode === 'light2' 
                        ? 'bg-white/80 border-[#293350]/20 hover:bg-white/90' 
                        : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'
                    }`}>
                      <div className="flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-base ${
                          mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                        }`}>
                          Email
                        </h4>
                        <p className={`text-sm mt-1 ${
                          mode === 'light2' ? 'text-[#293350]/80 font-poppins' : 'text-white/90 font-poppins'
                        }`}>
                          <a href="mailto:support@forzabuilt.com" className="text-[#F2611D] hover:text-[#F2611D]/80 underline font-semibold">
                            support@forzabuilt.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start space-x-4 p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      mode === 'light2' 
                        ? 'bg-white/80 border-[#293350]/20 hover:bg-white/90' 
                        : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'
                    }`}>
                      <div className="flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-base ${
                          mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                        }`}>
                          Business Hours
                        </h4>
                        <p className={`text-sm mt-1 ${
                          mode === 'light2' ? 'text-[#293350]/80 font-poppins' : 'text-white/90 font-poppins'
                        }`}>
                          <span className="font-bold">Mon – Fri | 8:00 AM – 4:30 PM CST</span><br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-start space-x-4 p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      mode === 'light2' 
                        ? 'bg-white/80 border-[#293350]/20 hover:bg-white/90' 
                        : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'
                    }`}>
                      <div className="flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#F2611D]" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-base ${
                          mode === 'light2' ? 'text-[#293350] font-poppins' : 'text-white font-poppins'
                        }`}>
                          Sales Inquiries
                        </h4>
                        <p className={`text-sm mt-1 ${
                          mode === 'light2' ? 'text-[#293350]/80 font-poppins' : 'text-white/90 font-poppins'
                        }`}>
                          <a href="mailto:sales@forzabuilt.com" className="text-[#F2611D] hover:text-[#F2611D]/80 underline font-semibold">
                            sales@forzabuilt.com
                          </a><br />
                          <span className="text-xs">For optimization inquiries and working with us</span>
                        </p>
                      </div>
                    </div>
                  </div>
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