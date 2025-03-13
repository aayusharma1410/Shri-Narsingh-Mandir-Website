
import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar } from 'lucide-react';
import DailySchedule from './DailySchedule';
import { useLanguage } from '@/contexts/LanguageContext';

const TimingsSection = () => {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const childElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      childElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  const regularTimings = [
    { day: language === 'en' ? "Monday to Saturday" : "सोमवार से शनिवार", 
      morning: "05:00 AM - 12:00 PM", 
      evening: "04:00 PM - 09:00 PM" },
    { day: language === 'en' ? "Sunday and Holidays" : "रविवार और छुट्टियां", 
      morning: "04:30 AM - 01:00 PM", 
      evening: "03:30 PM - 10:00 PM" },
  ];
  
  const specialTimings = [
    { name: language === 'en' ? "Navratri" : "नवरात्रि", 
      time: "03:30 AM - 11:00 PM" },
    { name: language === 'en' ? "Krishna Janmashtami" : "कृष्ण जन्माष्टमी", 
      time: language === 'en' ? "Open 24 hours" : "24 घंटे खुला" },
    { name: language === 'en' ? "Shivratri" : "शिवरात्रि", 
      time: language === 'en' ? "Open 24 hours" : "24 घंटे खुला" },
    { name: language === 'en' ? "Holi" : "होली", 
      time: "06:00 AM - 10:00 PM" },
  ];
  
  const upcomingEvents = [
    { name: language === 'en' ? "Navratri Festival" : "नवरात्रि उत्सव", 
      date: language === 'en' ? "October 15 - October 24, 2023" : "15 अक्टूबर - 24 अक्टूबर, 2023" },
    { name: language === 'en' ? "Annakut" : "अन्नकूट", 
      date: language === 'en' ? "November 13, 2023" : "13 नवंबर, 2023" },
    { name: language === 'en' ? "Gita Jayanti" : "गीता जयंती", 
      date: language === 'en' ? "December 23, 2023" : "23 दिसंबर, 2023" },
  ];

  return (
    <section id="timings" className="section-container bg-temple-cream/50" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">
          {language === 'en' ? 'Darshan Timings' : 'दर्शन समय'}
        </p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">
          {language === 'en' ? 'Temple Timings' : 'मंदिर समय'}
        </h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          {language === 'en'
            ? 'Get information about the darshan and puja timings at Shri Narsingh Temple.'
            : 'श्री नरसिंह मंदिर के दर्शन और पूजा के समय की जानकारी प्राप्त करें।'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DailySchedule />
        </div>
        
        <div>
          <Card className="glass-card sticky top-20 opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-temple-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-temple-maroon">
                  {language === 'en' ? 'Upcoming Festivals' : 'आगामी उत्सव'}
                </h3>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-b border-temple-gold/20 pb-4 last:border-0">
                    <p className="font-medium text-temple-maroon">{event.name}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6 bg-temple-gold/20" />
              
              <div>
                <h4 className="font-medium mb-2 text-temple-maroon">
                  {language === 'en' ? 'Aarti Timings' : 'आरती समय'}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Morning Aarti:' : 'प्रातः आरती:'}</span>
                    <span className="font-medium">5:30 AM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Afternoon Aarti:' : 'मध्याह्न आरती:'}</span>
                    <span className="font-medium">12:00 PM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Evening Aarti:' : 'संध्या आरती:'}</span>
                    <span className="font-medium">6:30 PM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Night Aarti:' : 'शयन आरती:'}</span>
                    <span className="font-medium">8:00 PM</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-temple-gold/20" />
              
              <div>
                <h4 className="font-medium mb-2 text-temple-maroon">
                  {language === 'en' ? 'Contact Details' : 'संपर्क विवरण'}
                </h4>
                
                <div className="space-y-2">
                  <p>{language === 'en' ? 'Phone:' : 'फोन:'} <span className="font-medium">+91 8955672580</span></p>
                  <p>{language === 'en' ? 'Email:' : 'ईमेल:'} <span className="font-medium break-all">shrilakshminarsinghhasampur@gmail.com</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TimingsSection;
