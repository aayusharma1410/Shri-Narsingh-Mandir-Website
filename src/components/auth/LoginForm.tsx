
import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Lock } from 'lucide-react';
import { useAuthFormValidation } from '@/hooks/useAuthFormValidation';

interface LoginFormProps {
  onSwitchMode: () => void;
}

const LoginForm = ({ onSwitchMode }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const {
    values,
    errors,
    register,
    validateForm,
    focusFirstError
  } = useAuthFormValidation({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      focusFirstError();
      return;
    }
    
    setLoading(true);

    try {
      await signIn(values.email, values.password);
      toast({
        title: language === 'en' ? 'Welcome back!' : 'वापस स्वागत है!',
        description: language === 'en' ? 'You have been logged in.' : 'आप लॉग इन हो गए हैं।',
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

  const emailProps = register('email', { required: true, email: true }, emailRef);
  const passwordProps = register('password', { required: true }, passwordRef);

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
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-temple-maroon to-temple-gold hover:opacity-90 transition-all text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        disabled={loading}
      >
        {loading 
          ? (language === 'en' ? 'Loading...' : 'लोड हो रहा है...') 
          : (language === 'en' ? 'Sign In' : 'साइन इन करें')}
      </Button>

      <div className="mt-6 text-center">
        <Button
          variant="link"
          onClick={onSwitchMode}
          className="text-temple-maroon hover:text-temple-gold transition-colors font-medium"
        >
          {language === 'en' ? "Don't have an account? Sign Up" : "खाता नहीं है? साइन अप करें"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
