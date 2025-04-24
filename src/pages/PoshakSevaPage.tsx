
import Navbar from '@/components/Navbar';
import PoshakSevaSection from '@/components/PoshakSevaSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import PraktotsavScheduleDialog from '@/components/PraktotsavScheduleDialog';

const PoshakSevaPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <PraktotsavScheduleDialog />
      <div className="pt-24 pb-12">
        <PoshakSevaSection />
      </div>
      <Footer />
    </div>
  );
};

export default PoshakSevaPage;
