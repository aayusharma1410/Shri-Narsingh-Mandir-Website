
import Navbar from '@/components/Navbar';
import PoshakSevaSection from '@/components/PoshakSevaSection';
import Footer from '@/components/Footer';
import SqlExecutionGuide from '@/components/SqlExecutionGuide';
import { Button } from '@/components/ui/button';
import { Database, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PoshakSevaPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto mb-6">
          <Alert className="mb-6 border-amber-300 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <AlertTitle className="text-amber-700">
              {language === 'en' ? "Important: Database Setup Required" : "महत्वपूर्ण: डेटाबेस सेटअप आवश्यक"}
            </AlertTitle>
            <AlertDescription className="text-amber-600">
              {language === 'en' 
                ? "Before using Poshak Seva booking, you need to run the SQL setup script. Click the button below for instructions."
                : "पोशाक सेवा बुकिंग का उपयोग करने से पहले, आपको SQL सेटअप स्क्रिप्ट चलाने की आवश्यकता है। निर्देशों के लिए नीचे दिए गए बटन पर क्लिक करें।"}
            </AlertDescription>
            <div className="mt-4 flex justify-center">
              <SqlExecutionGuide
                trigger={
                  <Button variant="default" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    {language === 'en' ? "Database Setup Instructions" : "डेटाबेस सेटअप निर्देश"}
                  </Button>
                }
              />
            </div>
          </Alert>
        </div>
        <PoshakSevaSection />
      </div>
      <Footer />
    </div>
  );
};

export default PoshakSevaPage;
