
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/types/gallery";
import { format } from "date-fns";

interface GalleryModalProps {
  image: GalleryImage;
  allImages: GalleryImage[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const GalleryModal = ({ image, allImages, open, onOpenChange }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return allImages.findIndex((img) => img.id === image.id);
  });

  const currentImage = allImages[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Format the date for display
  const formattedDate = currentImage?.created_at 
    ? format(new Date(currentImage.created_at), 'MMMM d, yyyy')
    : '';

  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader className="flex items-center justify-between">
        <DialogTitle className="text-xl">{currentImage?.title}</DialogTitle>
        <DialogDescription className="text-sm mt-0">
          {formattedDate}
        </DialogDescription>
      </DialogHeader>
      
      <div className="relative mt-2">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md">
          <img 
            src={currentImage?.image_url} 
            alt={currentImage?.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {allImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </DialogContent>
  );
};

export default GalleryModal;
