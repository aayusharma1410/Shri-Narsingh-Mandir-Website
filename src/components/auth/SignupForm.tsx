
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Lock, User, UserCheck, Phone, MapPin } from 'lucide-react';

interface SignupFormProps {
  onSwitchMode: () => void;
}

const SignupForm = ({ onSwitchMode }: SignupFormProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  
  const { signUp } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();

  // Check if passwords match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: language === 'en' ? 'Passwords do not match' : 'पासवर्ड मेल नहीं खाते',
        description: language === 'en' ? 'Please ensure both passwords match.' : 'कृपया सुनिश्चित करें कि दोनों पासवर्ड एक समान हैं।',
      });
      setLoading(false);
      return;
    }

    try {
      console.log("Signing up with these details:", {
        email, username, fullName, phoneNumber, city, state, country
      });
      
      await signUp(
        email,
        password,
        username,
        fullName,
        phoneNumber,
        city,
        state,
        country
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
          <UserCheck className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="text"
            placeholder={language === 'en' ? "Full Name" : "पूरा नाम"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="text"
            placeholder={language === 'en' ? "Username" : "उपयोगकर्ता नाम"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="tel"
            placeholder={language === 'en' ? "Phone Number" : "फ़ोन नंबर"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="text"
            placeholder={language === 'en' ? "Country" : "देश"}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            type="text"
            placeholder={language === 'en' ? "State" : "राज्य"}
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
          />
          
          <Input
            type="text"
            placeholder={language === 'en' ? "City" : "शहर"}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80"
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
      
      <div className="space-y-3">
        <div className="relative">
          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-temple-maroon/70" />
          <Input
            type="password"
            placeholder={language === 'en' ? "Confirm Password" : "पासवर्ड की पुष्टि करें"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`pl-10 border-temple-gold/30 focus:border-temple-gold transition-all duration-300 bg-white/80 ${
              !passwordMatch && confirmPassword ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
        </div>
        {!passwordMatch && confirmPassword && (
          <p className="text-red-500 text-xs">
            {language === 'en' ? "Passwords do not match" : "पासवर्ड मेल नहीं खाते"}
          </p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-temple-maroon to-temple-gold hover:opacity-90 transition-all text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        disabled={loading || !passwordMatch}
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
