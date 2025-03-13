
import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, MapPin } from 'lucide-react';
import DailySchedule from './DailySchedule';

const TimingsSection = () => {
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
    { day: "सोमवार से शनिवार", morning: "05:00 AM - 12:00 PM", evening: "04:00 PM - 09:00 PM" },
    { day: "रविवार और छुट्टियां", morning: "04:30 AM - 01:00 PM", evening: "03:30 PM - 10:00 PM" },
  ];
  
  const specialTimings = [
    { name: "नवरात्रि", time: "03:30 AM - 11:00 PM" },
    { name: "कृष्ण जन्माष्टमी", time: "24 घंटे खुला" },
    { name: "शिवरात्रि", time: "24 घंटे खुला" },
    { name: "होली", time: "06:00 AM - 10:00 PM" },
  ];
  
  const upcomingEvents = [
    { name: "नवरात्रि उत्सव", date: "15 अक्टूबर - 24 अक्टूबर, 2023" },
    { name: "अन्नकूट", date: "13 नवंबर, 2023" },
    { name: "गीता जयंती", date: "23 दिसंबर, 2023" },
  ];

  return (
    <section id="timings" className="section-container bg-temple-cream/50" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">दर्शन समय</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">मंदिर समय</h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          श्री लक्ष्मी नरसिंह मंदिर के दर्शन और पूजा के समय की जानकारी प्राप्त करें।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DailySchedule />
          
          <Card className="glass-card mt-6 opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-temple-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-temple-maroon">पहुंचने का मार्ग</h3>
              </div>
              
              <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.6839773988823!2d77.45014591493774!3d28.760255482371196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf41afb11a607%3A0x97c2713eff3d574e!2sShree%20Narsingh%20Temple!5e0!3m2!1sen!2sin!4v1693996060311!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="श्री नरसिंह मंदिर हसमपुर का स्थान"
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div className="mt-4">
                <p className="font-medium">पता:</p>
                <p>श्री लक्ष्मी नरसिंह मंदिर</p>
                <p>हसमपुर गांव,</p>
                <p>उत्तर प्रदेश, भारत</p>
                
                <Separator className="my-4 bg-temple-gold/20" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">निकटतम रेलवे स्टेशन:</p>
                    <p className="text-sm">हसमपुर रेलवे स्टेशन (2 किमी)</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">निकटतम बस स्टॉप:</p>
                    <p className="text-sm">हसमपुर बस स्टैंड (1 किमी)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card sticky top-20 opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-temple-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-temple-maroon">आगामी उत्सव</h3>
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
                <h4 className="font-medium mb-2 text-temple-maroon">आरती समय</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>प्रातः आरती:</span>
                    <span className="font-medium">5:30 AM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>मध्याह्न आरती:</span>
                    <span className="font-medium">12:00 PM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>संध्या आरती:</span>
                    <span className="font-medium">6:30 PM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>शयन आरती:</span>
                    <span className="font-medium">8:00 PM</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-temple-gold/20" />
              
              <div>
                <h4 className="font-medium mb-2 text-temple-maroon">संपर्क विवरण</h4>
                
                <div className="space-y-2">
                  <p>फोन: <span className="font-medium">+91 8955672580</span></p>
                  <p>ईमेल: <span className="font-medium">shrilakshminarsinghhasampur@gmail.com</span></p>
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
