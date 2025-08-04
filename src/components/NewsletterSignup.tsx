import React, { useState } from 'react';
import { Mail, User, Phone, Building, Send } from 'lucide-react';

interface FormData {
  email: string;
  name: string;
  phone: string;
  company: string;
}

const NewsletterSignup = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    phone: '',
    company: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Successfully subscribed to newsletter');
      setStatus('success');
      
      setFormData({
        email: '',
        name: '',
        phone: '',
        company: ''
      });
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 shadow-xl md:shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left Side - Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-white/10 rounded-full">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">Join Our Community</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#F2611D] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base">
                    Exclusive access to industry insights and technical solutions
                  </p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#F2611D] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base">
                    Early access to new product launches and innovations
                  </p>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#F2611D] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base">
                    Expert tips and best practices for your applications
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4">Get Started Today</h4>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white/10 border text-sm sm:text-base backdrop-blur-sm ${
                      errors.name ? 'border-red-400' : 'border-white/20'
                    } text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white/10 border text-sm sm:text-base backdrop-blur-sm ${
                      errors.email ? 'border-red-400' : 'border-white/20'
                    } text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white/10 border text-sm sm:text-base backdrop-blur-sm ${
                      errors.phone ? 'border-red-400' : 'border-white/20'
                    } text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name (Optional)"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 rounded-lg bg-white/10 border border-white/20 text-sm sm:text-base text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all backdrop-blur-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-[#F2611D] to-[#F2611D]/90 text-white rounded-lg font-semibold text-sm sm:text-base py-2.5 sm:py-3 md:py-4 hover:from-[#F2611D]/90 hover:to-[#F2611D] transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}</span>
                </button>
                
                {status === 'success' && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 sm:p-4">
                    <p className="text-green-400 text-xs sm:text-sm text-center">Thank you for subscribing! We'll be in touch soon.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 sm:p-4">
                    <p className="text-red-400 text-xs sm:text-sm text-center">Something went wrong. Please try again.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup; 