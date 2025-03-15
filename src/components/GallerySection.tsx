
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
      src: "https://i.ibb.co/1fq3Z7v/temple-exterior-1.jpg", 
      alt: "Temple Front View", 
      category: "temple"
    },
    { 
      id: 2, 
      src: "https://i.ibb.co/3mmqk0J/temple-exterior-2.jpg", 
      alt: "Temple Side View", 
      category: "temple" 
    },
    { 
      id: 3, 
      src: "https://i.ibb.co/xSkMDRt/temple-interior-1.jpg", 
      alt: "Temple Inner Sanctum", 
      category: "interior" 
    },
    { 
      id: 4, 
      src: "https://i.ibb.co/zWCcZpr/event-celebration-1.jpg", 
      alt: "Festival Celebration", 
      category: "events" 
    },
    { 
      id: 5, 
      src: "https://i.ibb.co/wNFnfqh/devotees-gathering-1.jpg", 
      alt: "Devotees Gathering", 
      category: "devotees" 
    },
    { 
      id: 6, 
      src: "https://i.ibb.co/9kGp5MG/temple-grounds-1.jpg", 
      alt: "Temple Grounds", 
      category: "temple" 
    },
    { 
      id: 7, 
      src: "https://i.ibb.co/LXRY1wf/aarti-ceremony-1.jpg", 
      alt: "Aarti Ceremony", 
      category: "events" 
    },
    { 
      id: 8, 
      src: "https://i.ibb.co/JwL0rQt/temple-idol-1.jpg", 
      alt: "Temple Idol", 
      category: "interior" 
    }
  ];
  
  const categories = [
    { id: 'all', name: 'सभी' },
    { id: 'temple', name: 'मंदिर' },
    { id: 'interior', name: 'अंदरूनी' },
    { id: 'events', name: 'उत्सव' },
    { id: 'devotees', name: 'भक्तगण' },
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
