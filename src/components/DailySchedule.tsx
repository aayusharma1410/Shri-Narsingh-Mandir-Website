
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DailyScheduleProps {
  isSummerTimings: boolean;
}

const DailySchedule = ({ isSummerTimings }: DailyScheduleProps) => {
  const { language } = useLanguage();
  
  const summerSchedule = [
    { 
      event: "पट खुलने का समय", 
      event_en: "Temple Opening Time", 
      time: "4:30 AM" 
    },
    { 
      event: "अभिषेक", 
      event_en: "Abhishek (Bathing Ceremony)", 
      time: "4:30 AM-4:45 AM" 
    },
    { 
      event: "श्रृंगार", 
      event_en: "Shringar (Decoration)", 
      time: "4:45 AM-5:00 AM" 
    },
    { 
      event: "बाल भोग", 
      event_en: "Bal Bhog (Morning Offering)", 
      time: "5:00 AM-5:15 AM" 
    },
    { 
      event: "मंगला आरती", 
      event_en: "Mangla Aarti", 
      time: "5:15 AM-5:30 AM" 
    },
    { 
      event: "राज भोग", 
      event_en: "Raj Bhog (Afternoon Offering)", 
      time: "11:15 AM-11:30 AM" 
    },
    { 
      event: "शयन", 
      event_en: "Shayan (Rest Period)", 
      time: "12:30 PM-5:00 PM" 
    },
    { 
      event: "पट खुलने का समय", 
      event_en: "Temple Opening Time", 
      time: "5:00 PM" 
    },
    { 
      event: "संध्या आरती", 
      event_en: "Sandhya Aarti (Evening Aarti)", 
      time: "7:15 PM-7:30 PM" 
    },
    { 
      event: "शयन भोग", 
      event_en: "Shayan Bhog (Night Offering)", 
      time: "8:15 PM" 
    },
    { 
      event: "रात्री शयन", 
      event_en: "Night Rest", 
      time: "9:00 PM-4:30 AM" 
    }
  ];

  const winterSchedule = [
    { 
      event: "पट खुलने का समय", 
      event_en: "Temple Opening Time", 
      time: "5:00 AM" 
    },
    { 
      event: "अभिषेक", 
      event_en: "Abhishek (Bathing Ceremony)", 
      time: "5:00 AM-5:15 AM" 
    },
    { 
      event: "श्रृंगार", 
      event_en: "Shringar (Decoration)", 
      time: "5:15 AM-5:20 AM" 
    },
    { 
      event: "बाल भोग", 
      event_en: "Bal Bhog (Morning Offering)", 
      time: "5:20 AM-5:30 AM" 
    },
    { 
      event: "मंगला आरती", 
      event_en: "Mangla Aarti", 
      time: "5:30 AM-5:45 AM" 
    },
    { 
      event: "राज भोग", 
      event_en: "Raj Bhog (Afternoon Offering)", 
      time: "10:15 AM-10:30 AM" 
    },
    { 
      event: "शयन", 
      event_en: "Shayan (Rest Period)", 
      time: "11:00 PM-5:00 PM" 
    },
    { 
      event: "पट खुलने का समय", 
      event_en: "Temple Opening Time", 
      time: "5:00 PM" 
    },
    { 
      event: "संध्या आरती", 
      event_en: "Sandhya Aarti (Evening Aarti)", 
      time: "6:15 PM-6:30 PM" 
    },
    { 
      event: "शयन भोग", 
      event_en: "Shayan Bhog (Night Offering)", 
      time: "7:15 PM-7:30 PM" 
    },
    { 
      event: "रात्री शयन", 
      event_en: "Night Rest", 
      time: "8:00 PM-5:00 AM" 
    }
  ];

  const schedule = isSummerTimings ? summerSchedule : winterSchedule;

  return (
    <Card className="glass-card opacity-0 animate-on-scroll">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Clock className="w-6 h-6 text-temple-gold mr-2" />
          <h3 className="font-serif text-xl font-semibold text-temple-maroon">
            {language === 'en' ? 'Daily Schedule' : 'दैनिक कार्यक्रम'}
            <span className="text-sm ml-2 text-muted-foreground font-normal">
              {language === 'en' ? 'Hasampur, Sikar, Rajasthan, India' : 'हासमपुर, सीकर, राजस्थान, भारत'}
            </span>
          </h3>
          <span className="ml-2 text-sm text-temple-gold font-medium px-2 py-1 bg-temple-gold/10 rounded">
            {isSummerTimings ? 
              (language === 'en' ? 'Summer' : 'ग्रीष्मकालीन') : 
              (language === 'en' ? 'Winter' : 'शीतकालीन')}
          </span>
        </div>
        <div className="divide-y divide-temple-gold/10">
          {schedule.map((item, index) => (
            <div key={index} className="py-3 flex justify-between items-center">
              <span className="font-medium text-temple-maroon">
                {language === 'en' ? item.event_en : item.event}
              </span>
              <span className="text-gray-600">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySchedule;
