
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSwitchMode: () => void;
}

const LoginForm = ({ onSwitchMode }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signIn } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="email"
            placeholder={language === 'en' ? "Email" : "ईमेल"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="password"
            placeholder={language === 'en' ? "Password" : "पासवर्ड"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
          />
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
