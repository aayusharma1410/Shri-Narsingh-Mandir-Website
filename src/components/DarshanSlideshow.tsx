
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';

interface DarshanImage {
  id: number;
  title: string;
  title_hi: string;
  image_url: string;
  time: string;
  date: string;
}

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  const [currentDarshanIndex, setCurrentDarshanIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [darshanImages, setDarshanImages] = useState<DarshanImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDarshanImages = async () => {
      try {
        const { data, error } = await supabase
          .from('darshan_images')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setDarshanImages(data);
        } else {
          // Use default images if no data in the database
          setDarshanImages([
            {
              id: 1,
              title: "Morning Darshan",
              title_hi: "प्रातः दर्शन",
              image_url: "/lovable-uploads/1dda7531-87ab-45fc-a698-3d3a28d25d05.png",
              time: "05:00 AM",
              date: "2025-04-14"
            },
            {
              id: 2,
              title: "Afternoon Darshan",
              title_hi: "दोपहर दर्शन",
              image_url: "/lovable-uploads/9f9d2654-52ad-44c3-92d3-8f92b067dade.png",
              time: "11:15 AM",
              date: "2025-04-14"
            },
            {
              id: 3,
              title: "Evening Darshan",
              title_hi: "सायं दर्शन",
              image_url: "/lovable-uploads/0dc387c4-682c-498b-a4d8-b35159ef10a5.png",
              time: "07:15 PM",
              date: "2025-04-14"
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching darshan images:', error);
        // Set default images on error
        setDarshanImages([
          {
            id: 1,
            title: "Morning Darshan",
            title_hi: "प्रातः दर्शन",
            image_url: "/lovable-uploads/1dda7531-87ab-45fc-a698-3d3a28d25d05.png",
            time: "05:00 AM",
            date: "2025-04-14"
          },
          {
            id: 2,
            title: "Afternoon Darshan",
            title_hi: "दोपहर दर्शन",
            image_url: "/lovable-uploads/9f9d2654-52ad-44c3-92d3-8f92b067dade.png",
            time: "11:15 AM",
            date: "2025-04-14"
          },
          {
            id: 3,
            title: "Evening Darshan",
            title_hi: "सायं दर्शन",
            image_url: "/lovable-uploads/0dc387c4-682c-498b-a4d8-b35159ef10a5.png",
            time: "07:15 PM",
            date: "2025-04-14"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDarshanImages();
    setIsLoaded(true);
  }, []);

  const nextDarshan = () => {
    if (darshanImages.length === 0) return;
    setCurrentDarshanIndex((prevIndex) => 
      prevIndex === darshanImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevDarshan = () => {
    if (darshanImages.length === 0) return;
    setCurrentDarshanIndex((prevIndex) => 
      prevIndex === 0 ? darshanImages.length - 1 : prevIndex - 1
    );
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

          <div className="max-w-3xl mx-auto">
            {isLoading ? (
              <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
            ) : darshanImages.length > 0 ? (
              <div className="overflow-hidden rounded-lg shadow-lg bg-card">
                <div className="relative h-96">
                  <img 
                    src={darshanImages[currentDarshanIndex]?.image_url} 
                    alt={language === 'en' ? darshanImages[currentDarshanIndex]?.title : darshanImages[currentDarshanIndex]?.title_hi}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold">
                      {language === 'en' ? darshanImages[currentDarshanIndex]?.title : darshanImages[currentDarshanIndex]?.title_hi}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-temple-gold" />
                      <span>{darshanImages[currentDarshanIndex]?.time}</span>
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
            ) : (
              <div className="h-96 bg-gray-100 flex items-center justify-center rounded-lg">
                <p className="text-muted-foreground">No darshan images available</p>
              </div>
            )}
          </div>

          <Separator className="my-10 bg-temple-gold/20" />
        </div>
      </div>
    </section>
  );
};

export default DarshanSlideshow;
