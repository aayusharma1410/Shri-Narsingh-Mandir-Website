
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for today's darshan and recent events
const darshanImages = [
  {
    id: 1,
    title: "Morning Darshan",
    titleHi: "प्रातः दर्शन",
    image: "https://images.unsplash.com/photo-1609696503575-30032d28e10d?q=80&w=1000",
    time: "07:30 AM",
    date: "2023-08-15"
  },
  {
    id: 2,
    title: "Afternoon Darshan",
    titleHi: "दोपहर दर्शन",
    image: "https://images.unsplash.com/photo-1609696503575-30032d28e10d?q=80&w=1000",
    time: "12:00 PM",
    date: "2023-08-15"
  },
  {
    id: 3,
    title: "Evening Darshan",
    titleHi: "सायं दर्शन",
    image: "https://images.unsplash.com/photo-1609696503575-30032d28e10d?q=80&w=1000",
    time: "06:30 PM",
    date: "2023-08-15"
  }
];

const recentEvents = [
  {
    id: 1,
    title: "Janmashtami Celebration",
    titleHi: "जन्माष्टमी समारोह",
    image: "https://images.unsplash.com/photo-1621376225368-8e59be8612c3?q=80&w=1000",
    date: "2023-08-12",
    description: "Celebrating the birth of Lord Krishna with devotion and joy.",
    descriptionHi: "भगवान कृष्ण के जन्म का भक्ति और आनंद के साथ उत्सव।"
  },
  {
    id: 2,
    title: "Temple Anniversary",
    titleHi: "मंदिर वर्षगांठ",
    image: "https://images.unsplash.com/photo-1621376225368-8e59be8612c3?q=80&w=1000",
    date: "2023-08-05",
    description: "Celebrating 25 years of our temple's spiritual journey.",
    descriptionHi: "हमारे मंदिर की आध्यात्मिक यात्रा के 25 वर्ष पूरे होने का उत्सव।"
  },
  {
    id: 3,
    title: "Navratri Festival",
    titleHi: "नवरात्रि उत्सव",
    image: "https://images.unsplash.com/photo-1621376225368-8e59be8612c3?q=80&w=1000",
    date: "2023-07-25",
    description: "Nine nights of devotion, dance, and celebration.",
    descriptionHi: "भक्ति, नृत्य और उत्सव की नौ रातें।"
  }
];

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  const [currentDarshanIndex, setCurrentDarshanIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextDarshan = () => {
    setCurrentDarshanIndex((prevIndex) => 
      prevIndex === darshanImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevDarshan = () => {
    setCurrentDarshanIndex((prevIndex) => 
      prevIndex === 0 ? darshanImages.length - 1 : prevIndex - 1
    );
  };

  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) => 
      prevIndex === recentEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevEvent = () => {
    setCurrentEventIndex((prevIndex) => 
      prevIndex === 0 ? recentEvents.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="darshan-slideshow" className="py-16 bg-gradient-to-b from-background to-muted">
      <div className="container px-6 mx-auto">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-heading mb-4 text-4xl text-center">
            {language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {language === 'en' ? 
              "Experience the divine presence through today's darshan images" : 
              "आज के दर्शन छवियों के माध्यम से दिव्य उपस्थिति का अनुभव करें"}
          </p>

          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Today's Darshan Slideshow */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg shadow-lg bg-card">
                <div className="relative h-96">
                  <img 
                    src={darshanImages[currentDarshanIndex].image} 
                    alt={language === 'en' ? darshanImages[currentDarshanIndex].title : darshanImages[currentDarshanIndex].titleHi}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold">
                      {language === 'en' ? darshanImages[currentDarshanIndex].title : darshanImages[currentDarshanIndex].titleHi}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-temple-gold" />
                      <span>{darshanImages[currentDarshanIndex].time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between p-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={prevDarshan}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-1">
                    {darshanImages.map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-2 h-2 rounded-full ${currentDarshanIndex === index ? 'bg-temple-gold' : 'bg-muted'}`}
                      ></div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={nextDarshan}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Events Slideshow */}
            <div className="relative">
              <Card className="overflow-hidden h-full">
                <div className="relative h-64">
                  <img 
                    src={recentEvents[currentEventIndex].image} 
                    alt={language === 'en' ? recentEvents[currentEventIndex].title : recentEvents[currentEventIndex].titleHi}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 text-temple-gold" />
                    <span>{formatDate(recentEvents[currentEventIndex].date)}</span>
                  </div>
                  <CardTitle className="text-2xl text-temple-maroon">
                    {language === 'en' ? recentEvents[currentEventIndex].title : recentEvents[currentEventIndex].titleHi}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {language === 'en' ? 
                      recentEvents[currentEventIndex].description : 
                      recentEvents[currentEventIndex].descriptionHi}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={prevEvent}
                    className="rounded-full hover:bg-temple-gold/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-1">
                    {recentEvents.map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-2 h-2 rounded-full ${currentEventIndex === index ? 'bg-temple-gold' : 'bg-muted'}`}
                      ></div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={nextEvent}
                    className="rounded-full hover:bg-temple-gold/10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Separator className="mb-10 bg-temple-gold/20" />
          
          {/* Removed "View All Darshans" button */}
        </div>
      </div>
    </section>
  );
};

export default DarshanSlideshow;
