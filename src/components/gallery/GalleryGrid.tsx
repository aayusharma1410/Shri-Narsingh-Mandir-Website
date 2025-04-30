
import { useState } from "react";
import { GalleryImage } from "@/types/gallery";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import GalleryActions from "./GalleryActions";
import { Dialog } from "@/components/ui/dialog";
import GalleryModal from "./GalleryModal";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageDeleted?: () => void;
}

const GalleryGrid = ({ images: initialImages, onImageDeleted }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAdminStatus();
  const [images, setImages] = useState<GalleryImage[]>(initialImages);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleImageDeleted = (deletedId: string) => {
    setImages(prevImages => prevImages.filter(image => image.id !== deletedId));
    if (onImageDeleted) {
      onImageDeleted();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="relative group aspect-square overflow-hidden rounded-lg border border-gray-300 cursor-pointer"
          >
            <div 
              onClick={() => handleImageClick(image)}
              className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-100"
            >
              {image.media_type === 'video' ? (
                <video 
                  src={image.image_url} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              ) : (
                <img 
                  src={image.image_url} 
                  alt={image.title || 'Gallery image'} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              )}
              {image.media_type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-lg font-medium">Play Video</span>
                </div>
              )}
              
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-medium truncate">{image.title}</p>
                </div>
              )}
            </div>
            
            <GalleryActions 
              imageId={image.id}
              imageUrl={image.image_url}
              isDarshan={image.is_darshan}
              isAdmin={isAdmin}
              onDelete={() => handleImageDeleted(image.id)}
            />
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedImage && (
          <GalleryModal 
            image={selectedImage} 
            allImages={images}
          />
        )}
      </Dialog>
    </>
  );
};

export default GalleryGrid;
