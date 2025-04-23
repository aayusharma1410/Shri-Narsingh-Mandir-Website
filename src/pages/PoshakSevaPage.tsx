
import Navbar from '@/components/Navbar';
import PoshakSevaSection from '@/components/PoshakSevaSection';
import Footer from '@/components/Footer';
import SqlExecutionGuide from '@/components/SqlExecutionGuide';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PoshakSevaPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto mb-6 flex justify-center">
          <SqlExecutionGuide
            trigger={
              <Button variant="outline" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                {language === 'en' ? "Database Setup Instructions" : "डेटाबेस सेटअप निर्देश"}
              </Button>
            }
          />
        </div>
        <PoshakSevaSection />
      </div>
      <Footer />
    </div>
  );
};

export default PoshakSevaPage;
