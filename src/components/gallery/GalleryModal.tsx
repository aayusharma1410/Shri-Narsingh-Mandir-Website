
import { DialogContent } from "@/components/ui/dialog";
import { GalleryImage } from "@/types/gallery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface GalleryModalProps {
  image: GalleryImage;
  allImages: GalleryImage[];
}

const GalleryModal = ({ image, allImages }: GalleryModalProps) => {
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState<GalleryImage>(image);
  const currentIndex = allImages.findIndex(img => img.id === currentImage.id);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentImage(allImages[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentImage(allImages[prevIndex]);
  };

  return (
    <DialogContent className="sm:max-w-[80vw] h-[80vh] p-0 bg-black/95 border-none overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
        {currentImage.media_type === 'video' ? (
          <video
            src={currentImage.image_url}
            className="max-w-full max-h-full object-contain"
            controls
            autoPlay
            loop
          />
        ) : (
          <img
            src={currentImage.image_url}
            alt={currentImage.title || "Gallery image"}
            className="max-w-full max-h-full object-contain"
            style={{ margin: 'auto' }}
          />
        )}
        
        {allImages.length > 1 && (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 border-none z-10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 border-none z-10"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
        
        {currentImage.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 z-10">
            <h3 className="text-lg font-medium">{currentImage.title}</h3>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default GalleryModal;
