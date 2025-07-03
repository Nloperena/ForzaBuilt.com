import React, { useState } from 'react';

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
    <div className="w-full max-w-4xl mx-auto mt-16 flex gap-8 items-start">
      {/* Disclaimer Text */}
      <div className="w-1/3 p-6 bg-white/5 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Newsletter Signup</h3>
        <p className="text-white/80 text-sm leading-relaxed">
          Stay updated with the latest industry insights, product innovations, and technical solutions from Forza Built.
        </p>
      </div>

      {/* Form */}
      <div className="w-2/3 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
        <p className="text-white/80 mb-6">
          Subscribe to our newsletter for the latest industry insights and updates.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *"
                className={`w-full px-4 py-2 rounded-lg bg-white/5 border ${
                  errors.name ? 'border-red-400' : 'border-white/20'
                } text-white placeholder-white/50 focus:outline-none focus:border-white/40`}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className={`w-full px-4 py-2 rounded-lg bg-white/5 border ${
                  errors.email ? 'border-red-400' : 'border-white/20'
                } text-white placeholder-white/50 focus:outline-none focus:border-white/40`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                className={`w-full px-4 py-2 rounded-lg bg-white/5 border ${
                  errors.phone ? 'border-red-400' : 'border-white/20'
                } text-white placeholder-white/50 focus:outline-none focus:border-white/40`}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name (Optional)"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-white text-[#1b3764] rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
          
          {status === 'success' && (
            <p className="text-green-400 text-sm text-center">Thank you for subscribing! We'll be in touch soon.</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup; 