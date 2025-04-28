
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { GalleryImage } from "@/types/gallery";
import { Dialog } from "@/components/ui/dialog";
import GalleryModal from "./GalleryModal";
import { Video } from "lucide-react";

interface GalleryGridProps {
  images: GalleryImage[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((media) => (
          <div
            key={media.id}
            className="bg-white rounded-lg shadow hover:scale-105 transition-transform cursor-pointer overflow-hidden relative"
            onClick={() => setSelectedImage(media)}
          >
            {media.media_type === 'video' ? (
              <div className="relative w-full h-44 sm:h-52 md:h-60 lg:h-64">
                <video
                  src={media.image_url}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Video className="w-12 h-12 text-white" />
                </div>
              </div>
            ) : (
              <img
                src={media.image_url}
                alt={media.title || "Gallery image"}
                className="w-full h-44 sm:h-52 md:h-60 lg:h-64 object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>

      <Dialog 
        open={!!selectedImage} 
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        {selectedImage && (
          <GalleryModal 
            image={selectedImage} 
            allImages={images} 
          />
        )}
      </Dialog>
    </div>
  );
};

export default GalleryGrid;
