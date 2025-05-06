
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthPageLayoutProps {
  title: string;
  showAlert?: boolean;
  alertContent?: string;
  children: ReactNode;
}

const AuthPageLayout = ({ title, showAlert, alertContent, children }: AuthPageLayoutProps) => {
  const { language } = useLanguage();
  
  return (
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
              {title}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {showAlert && (
              <Alert className="mb-6 bg-temple-cream/40 border-temple-gold/50 animate-fade-in">
                <InfoIcon className="h-4 w-4 text-temple-maroon" />
                <AlertDescription className="text-sm">
                  {alertContent || (language === 'en' 
                    ? "After signing up, you will receive a verification link on your email from Supabase. Click on that link to verify your email, and then come back to log in. You will be successfully logged in."
                    : "साइन अप करने के बाद, आपको Supabase की तरफ से एक ईमेल पर वेरिफिकेशन लिंक मिलेगा। उस लिंक पर क्लिक करके अपनी ईमेल को वेरिफाई करें, और फिर वापस आकर लॉगिन करें। इसके बाद आप सफलतापूर्वक लॉगिन हो जाएंगे।"
                  )}
                </AlertDescription>
              </Alert>
            )}
            
            {children}
            
            <div className="mt-6 text-center relative">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-temple-gold/20"></div>
              <span className="relative bg-white px-4 text-sm text-temple-maroon/70">
                {language === 'en' ? 'or' : 'या'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPageLayout;
