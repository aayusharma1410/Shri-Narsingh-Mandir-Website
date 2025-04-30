
import { Loader } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DarshanImage } from '@/types/gallery';
import { useAdminStatus } from "@/hooks/useAdminStatus";
import GalleryActions from "../gallery/GalleryActions";
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DarshanMediaProps {
  darshanMedia: DarshanImage[];
  loading: boolean;
  onImageDeleted?: () => void;
}

const DarshanMedia = ({ darshanMedia: initialDarshanMedia, loading, onImageDeleted }: DarshanMediaProps) => {
  const { language } = useLanguage();
  const { isAdmin } = useAdminStatus();
  const [darshanMedia, setDarshanMedia] = useState<DarshanImage[]>(initialDarshanMedia);
  
  const handleImageDeleted = (deletedId: string) => {
    setDarshanMedia(prevMedia => prevMedia.filter(media => media.id !== deletedId));
    if (onImageDeleted) {
      onImageDeleted();
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader className="h-8 w-8 animate-spin text-temple-maroon" />
      </div>
    );
  }
  
  if (darshanMedia.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
        <p className="text-gray-500">
          {language === 'en' ? "No darshan images available" : "कोई दर्शन छवियां उपलब्ध नहीं है"}
        </p>
      </div>
    );
  }
  
  if (darshanMedia.length === 1) {
    const media = darshanMedia[0];
    return (
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden 
        border-4 border-temple-gold 
        shadow-lg transition-all duration-300 
        hover:shadow-2xl hover:border-temple-maroon/70">
        {media.media_type === 'video' ? (
          <video
            src={media.image_url}
            controls
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <img
            src={media.image_url}
            alt={media.title}
            className="w-full h-full object-contain rounded-lg"
          />
        )}
        
        <GalleryActions 
          imageId={media.id}
          imageUrl={media.image_url}
          isDarshan={true}
          isAdmin={isAdmin}
          onDelete={() => handleImageDeleted(media.id)}
        />
      </div>
    );
  }
  
  // Multiple media items - use carousel
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {darshanMedia.map((media) => (
          <CarouselItem key={media.id}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden 
              border-4 border-temple-gold 
              shadow-lg transition-all duration-300 
              hover:shadow-2xl hover:border-temple-maroon/70 p-1">
              {media.media_type === 'video' ? (
                <video
                  src={media.image_url}
                  controls
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <img
                  src={media.image_url}
                  alt={media.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              )}
              
              <GalleryActions 
                imageId={media.id}
                imageUrl={media.image_url}
                isDarshan={true}
                isAdmin={isAdmin}
                onDelete={() => handleImageDeleted(media.id)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};

export default DarshanMedia;
