
import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Lock, User, UserCheck, Phone, MapPin } from 'lucide-react';
import { useAuthFormValidation } from '@/hooks/useAuthFormValidation';

interface SignupFormProps {
  onSwitchMode: () => void;
}

const SignupForm = ({ onSwitchMode }: SignupFormProps) => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();

  // Refs for form fields
  const emailRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  
  const {
    values,
    errors,
    register,
    validateForm,
    focusFirstError
  } = useAuthFormValidation({
    email: '',
    fullName: '',
    username: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      focusFirstError();
      return;
    }
    
    setLoading(true);

    try {
      await signUp(
        values.email,
        values.password,
        values.username,
        values.fullName,
        values.phoneNumber,
        values.city,
        values.state,
        values.country
      );
      
      toast({
        title: language === 'en' ? 'Account created successfully!' : 'खाता सफलतापूर्वक बनाया गया!',
        description: language === 'en' ? 'Please check your email to verify your account.' : 'अपने खाते को सत्यापित करने के लिए कृपया अपना ईमेल जांचें।',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Register fields with validation rules
  const emailProps = register('email', { required: true, email: true }, emailRef);
  const fullNameProps = register('fullName', { required: true }, fullNameRef);
  const usernameProps = register('username', { required: true }, usernameRef);
  const phoneProps = register('phoneNumber', {}, phoneRef);
  const countryProps = register('country', {});
  const stateProps = register('state', {});
  const cityProps = register('city', {});
  const passwordProps = register('password', { required: true, minLength: 6 }, passwordRef);
  const confirmPasswordProps = register('confirmPassword', { required: true, match: 'password' }, confirmPasswordRef);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            ref={emailRef}
            type="email"
            placeholder={language === 'en' ? "Email" : "ईमेल"}
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              errors.email ? 'border-red-500' : ''
            }`}
            {...emailProps}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <UserCheck className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            ref={fullNameRef}
            type="text"
            placeholder={language === 'en' ? "Full Name" : "पूरा नाम"}
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              errors.fullName ? 'border-red-500' : ''
            }`}
            {...fullNameProps}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            ref={usernameRef}
            type="text"
            placeholder={language === 'en' ? "Username" : "उपयोगकर्ता नाम"}
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              errors.username ? 'border-red-500' : ''
            }`}
            {...usernameProps}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            ref={phoneRef}
            type="tel"
            placeholder={language === 'en' ? "Phone Number" : "फ़ोन नंबर"}
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              errors.phoneNumber ? 'border-red-500' : ''
            }`}
            {...phoneProps}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="text"
            placeholder={language === 'en' ? "Country" : "देश"}
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              errors.country ? 'border-red-500' : ''
            }`}
            {...countryProps}
          />
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Input
              type="text"
              placeholder={language === 'en' ? "State" : "राज्य"}
              className={`border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
                errors.state ? 'border-red-500' : ''
              }`}
              {...stateProps}
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
          
          <div>
            <Input
              type="text"
              placeholder={language === 'en' ? "City" : "शहर"}
              className={`border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
                errors.city ? 'border-red-500' : ''
              }`}
              {...cityProps}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            ref={passwordRef}
            type="password"
            placeholder={language === 'en' ? "Password" : "पासवर्ड"}
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              errors.password ? 'border-red-500' : ''
            }`}
            {...passwordProps}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            ref={confirmPasswordRef}
            type="password"
            placeholder={language === 'en' ? "Confirm Password" : "पासवर्ड की पुष्टि करें"}
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
            {...confirmPasswordProps}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-temple-maroon to-temple-gold hover:opacity-90 transition-all text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        disabled={loading}
      >
        {loading 
          ? (language === 'en' ? 'Loading...' : 'लोड हो रहा है...') 
          : (language === 'en' ? 'Sign Up' : 'साइन अप करें')}
      </Button>

      <div className="mt-6 text-center">
        <Button
          variant="link"
          onClick={onSwitchMode}
          className="text-temple-maroon hover:text-temple-gold transition-colors font-medium"
        >
          {language === 'en' ? 'Already have an account? Sign In' : 'पहले से ही खाता है? साइन इन करें'}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
