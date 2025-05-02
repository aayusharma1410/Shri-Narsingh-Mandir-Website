
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const { signInWithOtp, verifyOtp, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (showOtpInput) {
        // Verify OTP
        await verifyOtp(email, otp);
        navigate('/');
        toast({
          title: isLogin ? 'Welcome back!' : 'Account created successfully!',
          description: isLogin 
            ? 'You have been logged in successfully.' 
            : 'Your account has been created and you are now logged in.',
        });
      } else if (isLogin) {
        // Request OTP for login
        await signInWithOtp(email);
        setShowOtpInput(true);
        toast({
          title: 'OTP Sent!',
          description: 'Please check your email for the verification code.',
        });
      } else {
        // Request OTP for signup
        await signInWithOtp(email);
        setShowOtpInput(true);
        toast({
          title: 'OTP Sent!',
          description: 'Please check your email for the verification code to complete your registration.',
        });
      }
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

  const resetForm = () => {
    setShowOtpInput(false);
    setOtp('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-temple-gold/10 flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-temple-maroon">
              {showOtpInput ? 'Enter Verification Code' : (isLogin ? 'Welcome Back' : 'Create Account')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!showOtpInput && (
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              {showOtpInput && (
                <div className="space-y-2">
                  <div className="flex justify-center py-4">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} index={index} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                </div>
              )}

              {!showOtpInput && !isLogin && (
                <>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full bg-temple-maroon hover:bg-temple-maroon/90"
                disabled={loading || (showOtpInput && otp.length < 6)}
              >
                {loading ? 'Loading...' : (
                  showOtpInput ? 'Verify' : (isLogin ? 'Send Login Code' : 'Send Signup Code')
                )}
              </Button>
              
              {showOtpInput && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resetForm}
                  className="w-full text-temple-maroon hover:text-temple-gold"
                >
                  Back to {isLogin ? 'login' : 'signup'}
                </Button>
              )}
            </form>
            
            {!showOtpInput && (
              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-temple-maroon hover:text-temple-gold"
                >
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;
