import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const galleryImages: GalleryImage[] = [
    { 
      id: 1, 
      src: "/lovable-uploads/1dda7531-87ab-45fc-a698-3d3a28d25d05.png", 
      alt: "Morning Darshan", 
      category: "darshan"
    },
    { 
      id: 2, 
      src: "/lovable-uploads/9f9d2654-52ad-44c3-92d3-8f92b067dade.png", 
      alt: "Afternoon Darshan", 
      category: "darshan"
    },
    { 
      id: 3, 
      src: "/lovable-uploads/0dc387c4-682c-498b-a4d8-b35159ef10a5.png", 
      alt: "Evening Darshan", 
      category: "darshan"
    },
    { 
      id: 4, 
      src: "/lovable-uploads/59c90dc9-6fec-4f74-a458-7573dc0b2660.png", 
      alt: "Shri Narsingh Darshan", 
      category: "events"
    },
    { 
      id: 5, 
      src: "/lovable-uploads/ffb05434-b184-4e59-93f8-647c06a8aff2.png", 
      alt: "Decorated Shrine", 
      category: "shringar"
    },
    { 
      id: 6, 
      src: "/lovable-uploads/9c54aa51-bfcf-4b94-999a-c9c11234b671.png", 
      alt: "Festival Celebration", 
      category: "events"
    },
    { 
      id: 7, 
      src: "/lovable-uploads/166a1ead-58e9-4b31-b8b2-e3b6e755e204.png", 
      alt: "Special Darshan", 
      category: "shringar"
    },
    { 
      id: 8, 
      src: "/lovable-uploads/32711294-0b7d-4321-876d-b1f8608239ef.png", 
      alt: "Shri Narsingh Dev", 
      category: "shringar"
    },
    { 
      id: 9, 
      src: "/lovable-uploads/8004559d-4885-4064-a334-9c67a69b8f1b.png", 
      alt: "Temple Interior", 
      category: "mandir"
    },
    { 
      id: 10, 
      src: "/lovable-uploads/aa5bf370-ee00-4613-93a3-805c90a67e20.png", 
      alt: "Sacred Murti", 
      category: "darshan"
    }
  ];
  
  const categories = [
    { id: 'all', name: 'सभी' },
    { id: 'darshan', name: 'दर्शन' },
    { id: 'shringar', name: 'श्रृंगार' },
    { id: 'events', name: 'उत्सव' },
    { id: 'mandir', name: 'मंदिर' }
  ];
  
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
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

  const ImageModal = ({ image }: { image: GalleryImage }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(galleryImages.findIndex(img => img.id === image.id));
    
    const goToNextImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };
    
    const goToPrevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };
    
    const currentImage = galleryImages[currentImageIndex];
    
    return (
      <DialogContent className="sm:max-w-3xl p-0 border-none bg-transparent backdrop-blur-2xl">
        <div className="relative w-full overflow-hidden rounded-lg">
          <img 
            src={currentImage.src} 
            alt={currentImage.alt} 
            className="w-full h-auto max-h-[80vh] object-contain bg-black"
          />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
            onClick={goToPrevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 rounded-full"
            onClick={goToNextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
            <p className="text-white font-serif text-lg">{currentImage.alt}</p>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <section id="gallery" className="section-container bg-white" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">दिव्य दर्शन</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">मंदिर गैलरी</h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          श्री नरसिंह मंदिर हसमपुर के सुंदर दृश्यों, भव्य उत्सवों और आध्यात्मिक क्षणों की झलक देखें।
        </p>
      </div>
      
      <div className="mb-8 opacity-0 animate-on-scroll">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={activeCategory === category.id 
                ? "bg-temple-gold hover:bg-temple-gold/80 text-white" 
                : "border-temple-gold/30 text-temple-maroon hover:bg-temple-lightgold/50"
              }
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <div 
            key={image.id} 
            className="opacity-0 animate-on-scroll"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <div className="overflow-hidden rounded-xl shadow-lg cursor-pointer group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-medium">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <ImageModal image={image} />
            </Dialog>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center opacity-0 animate-on-scroll">
        <Button 
          variant="outline" 
          className="border-temple-gold text-temple-maroon hover:bg-temple-lightgold/50"
        >
          और देखें
        </Button>
      </div>
    </section>
  );
};

export default GallerySection;
