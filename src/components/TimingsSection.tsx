import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import DailySchedule from './DailySchedule';
import { useLanguage } from '@/contexts/LanguageContext';

const TimingsSection = () => {
  const { language } = useLanguage();
  const [isSummerTimings, setIsSummerTimings] = useState(true);
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
  
  const summerRegularTimings = [
    { day: language === 'en' ? "Monday to Saturday" : "सोमवार से शनिवार", 
      morning: "05:00 AM - 12:00 PM", 
      evening: "04:00 PM - 09:00 PM" },
    { day: language === 'en' ? "Sunday and Holidays" : "रविवार और छुट्टियां", 
      morning: "04:30 AM - 01:00 PM", 
      evening: "03:30 PM - 10:00 PM" },
  ];
  
  const winterRegularTimings = [
    { day: language === 'en' ? "Monday to Saturday" : "सोमवार से शनिवार", 
      morning: "05:30 AM - 12:30 PM", 
      evening: "04:30 PM - 09:30 PM" },
    { day: language === 'en' ? "Sunday and Holidays" : "रविवार और छुट्टियां", 
      morning: "05:00 AM - 01:30 PM", 
      evening: "04:00 PM - 10:30 PM" },
  ];
  
  const specialTimings = [
    { name: language === 'en' ? "Navratri" : "नवरात्रि", 
      time: isSummerTimings ? "03:30 AM - 11:00 PM" : "04:00 AM - 11:30 PM" },
    { name: language === 'en' ? "Krishna Janmashtami" : "कृष्ण जन्माष्टमी", 
      time: language === 'en' ? "Open 24 hours" : "24 घंटे खुला" },
    { name: language === 'en' ? "Shivratri" : "शिवरात्रि", 
      time: language === 'en' ? "Open 24 hours" : "24 घंटे खुला" },
    { name: language === 'en' ? "Holi" : "होली", 
      time: isSummerTimings ? "06:00 AM - 10:00 PM" : "06:30 AM - 10:30 PM" },
  ];
  
  const upcomingEvents = [
    { name: language === 'en' ? "Navratri Festival" : "नवरात्रि उत्सव", 
      date: language === 'en' ? "October 15 - October 24, 2023" : "15 अक्टूबर - 24 अक्टूबर, 2023" },
    { name: language === 'en' ? "Annakut" : "अन्नकूट", 
      date: language === 'en' ? "November 13, 2023" : "13 नवंबर, 2023" },
    { name: language === 'en' ? "Gita Jayanti" : "गीता जयंती", 
      date: language === 'en' ? "December 23, 2023" : "23 दिसंबर, 2023" },
  ];

  const chaturdashiDates = [
    { name: "11 April 2025", day: "Friday" },
    { 
      name: "11 May 2025", 
      day: "Sunday", 
      isSpecial: true, 
      note: "श्री नृसिंह चतुर्दशी",
      highlight: true 
    },
    { name: "10 June 2025", day: "Tuesday" },
    { name: "9 July 2025", day: "Wednesday" },
    { name: "8 August 2025", day: "Friday" },
    { name: "6 September 2025", day: "Saturday" },
    { name: "6 October 2025", day: "Monday" },
    { name: "4 November 2025", day: "Tuesday" },
    { name: "4 December 2025", day: "Thursday" },
    { name: "2 January 2026", day: "Friday" },
    { name: "2 February 2026", day: "Sunday" },
    { name: "2 March 2026", day: "Monday" }
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
            : 'श्री नृसिंह मंदिर के दर्शन और पूजा के समय की जानकारी प्राप्त करें।'}
        </p>
        
        <div className="flex items-center justify-center mt-6 opacity-0 animate-on-scroll">
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${!isSummerTimings ? 'text-temple-maroon font-bold' : 'text-gray-500'}`}>
              {language === 'en' ? 'Winter Timings' : 'शीतकालीन समय'}
            </span>
            <Switch 
              checked={isSummerTimings}
              onCheckedChange={setIsSummerTimings}
              className="data-[state=checked]:bg-temple-gold"
            />
            <span className={`text-sm ${isSummerTimings ? 'text-temple-maroon font-bold' : 'text-gray-500'}`}>
              {language === 'en' ? 'Summer Timings' : 'ग्रीष्मकालीन समय'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DailySchedule isSummerTimings={isSummerTimings} />
        </div>
        
        <div>
          <Card className="glass-card sticky top-20 opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-temple-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-temple-maroon">
                  {language === 'en' ? 'Chaturdashi Dates 2082' : 'चतुर्दशी तिथियाँ 2082'}
                </h3>
              </div>
              
              <div className="space-y-4">
                {chaturdashiDates.map((date, index) => (
                  <div key={index} className={`border-b border-temple-gold/20 pb-4 last:border-0 ${
                    date.isSpecial ? 'bg-temple-gold/10 p-3 rounded-lg' : ''
                  }`}>
                    <p className={`font-medium text-temple-maroon ${date.isSpecial ? 'font-bold' : ''}`}>
                      {date.name} - {date.day}
                      {date.isSpecial && (
                        <span className="ml-2 text-temple-gold">({date.note})</span>
                      )}
                    </p>
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
                    <span className="font-medium">{isSummerTimings ? "5:30 AM" : "6:00 AM"}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Afternoon Aarti:' : 'मध्याह्न आरती:'}</span>
                    <span className="font-medium">{isSummerTimings ? "12:00 PM" : "12:30 PM"}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Evening Aarti:' : 'संध्या आरती:'}</span>
                    <span className="font-medium">{isSummerTimings ? "6:30 PM" : "7:00 PM"}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Night Aarti:' : 'शयन आरती:'}</span>
                    <span className="font-medium">{isSummerTimings ? "8:00 PM" : "8:30 PM"}</span>
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
