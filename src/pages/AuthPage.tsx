
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, User, Mail, Lock, Phone, MapPin, UserCheck } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  // Check if passwords match
  useEffect(() => {
    if (!isLogin && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match for signup
    if (!isLogin && password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: language === 'en' ? 'Passwords do not match' : 'पासवर्ड मेल नहीं खाते',
        description: language === 'en' ? 'Please ensure both passwords match.' : 'कृपया सुनिश्चित करें कि दोनों पासवर्ड एक समान हैं।',
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        // Make sure all values are passed correctly to the signUp function
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
      }
      navigate('/');
      toast({
        title: isLogin ? 'Welcome back!' : 'Account created successfully!',
        description: isLogin ? 'You have been logged in.' : 'Please check your email to verify your account.',
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-temple-cream/30 to-temple-gold/10 flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-temple-gold/20 animate-pulse hidden md:block" />
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-temple-maroon/10 animate-pulse hidden md:block" />
          
          <Card className="w-full backdrop-blur-sm border-temple-gold/30 shadow-lg shadow-temple-gold/10 overflow-hidden relative z-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-temple-gold/5 rounded-bl-full -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-temple-maroon/5 rounded-tr-full -z-10" />
            
            <CardHeader className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-temple-maroon via-temple-gold to-temple-cream" />
              <CardTitle className="text-3xl font-serif text-center text-temple-maroon py-2">
                {isLogin ? (language === 'en' ? 'Welcome Back' : 'वापस स्वागत है') : (language === 'en' ? 'Create Account' : 'खाता बनाएं')}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {!isLogin && (
                <Alert className="mb-6 bg-temple-cream/40 border-temple-gold/50 animate-fade-in">
                  <InfoIcon className="h-4 w-4 text-temple-maroon" />
                  <AlertDescription className="text-sm">
                    {language === 'en' 
                      ? "After signing up, you will receive a verification link on your email from Supabase. Click on that link to verify your email, and then come back to log in. You will be successfully logged in."
                      : "साइन अप करने के बाद, आपको Supabase की तरफ से एक ईमेल पर वेरिफिकेशन लिंक मिलेगा। उस लिंक पर क्लिक करके अपनी ईमेल को वेरिफाई करें, और फिर वापस आकर लॉगिन करें। इसके बाद आप सफलतापूर्वक लॉगिन हो जाएंगे।"
                    }
                  </AlertDescription>
                </Alert>
              )}
              
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
                
                {!isLogin && (
                  <>
                    <div className="space-y-3 animate-fade-in">
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

                    <div className="space-y-3 animate-fade-in">
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
                  </>
                )}
                
                {!isLogin && (
                  <div className="space-y-3 animate-fade-in">
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
                )}
                
                {!isLogin && (
                  <div className="grid grid-cols-1 gap-3 animate-fade-in">
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
                )}
                
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
                
                {!isLogin && (
                  <div className="space-y-3 animate-fade-in">
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
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-temple-maroon to-temple-gold hover:opacity-90 transition-all text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  disabled={loading || (!isLogin && !passwordMatch)}
                >
                  {loading ? (language === 'en' ? 'Loading...' : 'लोड हो रहा है...') : (isLogin ? (language === 'en' ? 'Sign In' : 'साइन इन करें') : (language === 'en' ? 'Sign Up' : 'साइन अप करें'))}
                </Button>
              </form>
              
              <div className="mt-6 text-center relative">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-temple-gold/20"></div>
                <span className="relative bg-white px-4 text-sm text-temple-maroon/70">
                  {language === 'en' ? 'or' : 'या'}
                </span>
              </div>
              
              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-temple-maroon hover:text-temple-gold transition-colors font-medium"
                >
                  {isLogin ? 
                    (language === 'en' ? "Don't have an account? Sign Up" : "खाता नहीं है? साइन अप करें") : 
                    (language === 'en' ? 'Already have an account? Sign In' : 'पहले से ही खाता है? साइन इन करें')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
