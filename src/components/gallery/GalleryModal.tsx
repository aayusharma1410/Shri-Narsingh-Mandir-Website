
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from "@/types/gallery";
import { useState } from "react";

interface GalleryModalProps {
  image: GalleryImage;
  allImages: GalleryImage[];
}

const GalleryModal = ({ image, allImages }: GalleryModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    allImages.findIndex(img => img.id === image.id)
  );
  
  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  
  const currentImage = allImages[currentImageIndex];
  
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

export default GalleryModal;
