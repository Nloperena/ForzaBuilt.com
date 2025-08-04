import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Lock, User, Mail, Eye, EyeOff, ArrowRight, Shield, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import forzaLogo from '@/assets/images/Forza-lion-logo.png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Login failed",
              description: "Invalid email or password. Please check your credentials and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account exists",
              description: "This email is already registered. Please try logging in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Signup failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Account created!",
            description: "Please check your email to confirm your account.",
          });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFieldValidation = (field: string) => {
    switch (field) {
      case 'email':
        return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'valid' : email ? 'invalid' : null;
      case 'password':
        return password && password.length >= 6 ? 'valid' : password ? 'invalid' : null;
      case 'firstName':
        return firstName && firstName.length >= 2 ? 'valid' : firstName ? 'invalid' : null;
      case 'lastName':
        return lastName && lastName.length >= 2 ? 'valid' : lastName ? 'invalid' : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#1b3764] to-[#F2611D] relative overflow-hidden pt-24 pb-16"
        onMouseMove={handleMouseMove}
      >
        <div className="relative z-10 w-full max-w-md px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Logo Section with Typing Effect */}
            <div className="text-center mb-8">
              <motion.div 
                className="inline-flex items-center justify-center w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={forzaLogo} alt="Forza Logo" className="w-full h-full object-contain" />
              </motion.div>
              <motion.h1 
                className="text-4xl font-extrabold text-white font-kallisto mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isLogin ? 'Welcome Back' : 'Join Forza'}
              </motion.h1>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isLogin ? 'Access your account to continue' : 'Create your account to get started'}
              </motion.p>
            </div>

            {/* Auth Card with Interactive Effects */}
            <motion.div
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {!isLogin && (
                        <motion.div
                          key="name-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white/90 text-sm font-medium">
                              First Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                              <Input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onFocus={() => setFocusedField('firstName')}
                                onBlur={() => setFocusedField(null)}
                                required={!isLogin}
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white/20 transition-all duration-300"
                                placeholder="John"
                              />
                              <AnimatePresence>
                                {getFieldValidation('firstName') === 'valid' && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  </motion.div>
                                )}
                                {getFieldValidation('firstName') === 'invalid' && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    <AlertCircle className="w-4 h-4 text-red-400" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-white/90 text-sm font-medium">
                              Last Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                              <Input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onFocus={() => setFocusedField('lastName')}
                                onBlur={() => setFocusedField(null)}
                                required={!isLogin}
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white/20 transition-all duration-300"
                                placeholder="Doe"
                              />
                              <AnimatePresence>
                                {getFieldValidation('lastName') === 'valid' && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  </motion.div>
                                )}
                                {getFieldValidation('lastName') === 'invalid' && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                  >
                                    <AlertCircle className="w-4 h-4 text-red-400" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white/20 transition-all duration-300"
                          placeholder="john@example.com"
                        />
                        <AnimatePresence>
                          {getFieldValidation('email') === 'valid' && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </motion.div>
                          )}
                          {getFieldValidation('email') === 'invalid' && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white/20 transition-all duration-300"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <AnimatePresence>
                          {getFieldValidation('password') === 'valid' && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute right-10 top-1/2 transform -translate-y-1/2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </motion.div>
                          )}
                          {getFieldValidation('password') === 'invalid' && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute right-10 top-1/2 transform -translate-y-1/2"
                            >
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-white hover:bg-white/90 text-[#1b3764] py-6 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group" 
                        disabled={loading}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1b3764]/10 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        {loading ? (
                          <div className="flex items-center justify-center relative z-10">
                            <div className="w-5 h-5 border-2 border-[#1b3764]/30 border-t-[#1b3764] rounded-full animate-spin mr-2" />
                            Please wait...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center relative z-10">
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                  
                  <div className="mt-8 text-center">
                    <motion.button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center justify-center mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Note with Animation */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-white/50 text-xs flex items-center justify-center">
                <Shield className="w-3 h-3 mr-1" />
                Your data is protected with enterprise-grade security
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth; 