
import { DialogContent } from "@/components/ui/dialog";
import { GalleryImage } from "@/types/gallery";

interface GalleryModalProps {
  image: GalleryImage;
  allImages: GalleryImage[];
}

const GalleryModal = ({ image, allImages }: GalleryModalProps) => {
  return (
    <DialogContent className="sm:max-w-[80vw] h-[80vh] p-0 bg-black/95 border-none">
      <div className="relative w-full h-full flex items-center justify-center">
        {image.media_type === 'video' ? (
          <video
            src={image.image_url}
            className="max-w-full max-h-full"
            controls
            autoPlay
          />
        ) : (
          <img
            src={image.image_url}
            alt={image.title || "Gallery image"}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
    </DialogContent>
  );
};

export default GalleryModal;
