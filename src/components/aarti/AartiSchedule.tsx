
import { Button } from "@/components/ui/button";
import { Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate, formatTime } from '@/utils/aartiTimeUtils';

interface AartiScheduleProps {
  nextScheduledTime: Date;
  onWatchLive: () => void;
}

const AartiSchedule = ({ nextScheduledTime, onWatchLive }: AartiScheduleProps) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-temple-gold/20">
      <h3 className="font-serif text-xl font-bold mb-4 text-temple-maroon">
        {language === 'en' ? 'Aarti Schedule' : 'आरती समय सूची'}
      </h3>
      
      <div className="space-y-4">
        <div className="border-b border-temple-gold/20 pb-3">
          <p className="font-medium">{language === 'en' ? 'Morning Aarti' : 'मंगला आरती'}</p>
          <p className="text-sm text-gray-600">{language === 'en' ? '5:15 AM' : 'सुबह 5:15 बजे'}</p>
        </div>
        
        <div className="border-b border-temple-gold/20 pb-3">
          <p className="font-medium">{language === 'en' ? 'Bhog Aarti' : 'भोग आरती'}</p>
          <p className="text-sm text-gray-600">{language === 'en' ? '11:15 PM' : 'दोपहर 11:15 बजे'}</p>
        </div>
        
        <div className="border-b border-temple-gold/20 pb-3">
          <p className="font-medium">{language === 'en' ? 'Evening Aarti' : 'संध्या आरती'}</p>
          <p className="text-sm text-gray-600">{language === 'en' ? '7:15 PM' : 'शाम 7:15 बजे'}</p>
        </div>
        
        <div>
          <p className="font-medium">{language === 'en' ? 'Shayan Bhog Aarti' : 'शयन भोग आरती'}</p>
          <p className="text-sm text-gray-600">{language === 'en' ? '8:15 PM' : 'रात 8:15 बजे'}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-2">{language === 'en' ? 'Next Aarti' : 'अगली आरती'}</h4>
        <div className="bg-temple-lightgold rounded-lg p-3">
          <p className="font-medium text-temple-maroon">{formatDate(nextScheduledTime)}</p>
          <p className="text-sm">{formatTime(nextScheduledTime)}</p>
        </div>
      </div>
      
      <Button 
        onClick={onWatchLive}
        className="w-full mt-6 bg-temple-gold hover:bg-temple-gold/80 text-white flex items-center justify-center gap-2"
      >
        <Facebook className="h-4 w-4" />
        {language === 'en' ? 'Watch Live on Facebook' : 'फेसबुक पर लाइव देखें'}
      </Button>
    </div>
  );
};

export default AartiSchedule;
