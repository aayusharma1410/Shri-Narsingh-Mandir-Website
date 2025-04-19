import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GalleryModal from "./GalleryModal";
import { supabase } from "@/lib/supabase";
import { GalleryImage } from "@/types/gallery";

const GalleryGrid = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      setIsLoading(true);
      try {
        // First try to fetch from gallery_images table
        const { data: dbImages, error: dbError } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (dbError) {
          console.error('Error fetching gallery images from DB:', dbError);
        }

        // Then fetch images from gallery storage bucket
        const { data: storageImages, error: storageError } = await supabase
          .storage
          .from('gallery')
          .list('', {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (storageError) {
          console.error('Error fetching gallery images from storage:', storageError);
        }

        let allImages: GalleryImage[] = [];

        // Add database images if any
        if (dbImages && dbImages.length > 0) {
          allImages = [...dbImages];
        }

        // Add storage images if any
        if (storageImages && storageImages.length > 0) {
          const storageBaseUrl = supabase.storage.from('gallery').getPublicUrl('').data.publicUrl;
          
          const storageImagesFormatted = storageImages
            .filter(file => !file.name.startsWith('.')) // Filter out hidden files
            .map((file, index) => ({
              id: `storage-${index}`,
              title: file.name.split('.')[0],
              image_url: `${storageBaseUrl}/${file.name}`,
              category: "mandir",
              created_at: file.created_at || new Date().toISOString()
            }));

          allImages = [...allImages, ...storageImagesFormatted];
        }

        setImages(allImages);
      } catch (error) {
        console.error('Error in fetchGalleryImages:', error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="animate-pulse">
            <div className="overflow-hidden rounded-xl shadow-lg bg-gray-200 aspect-[4/3]"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="py-8 text-center">
        <p>No gallery images available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={`${image.id}-${index}`} 
            className="opacity-0 animate-on-scroll"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div 
              onClick={() => {
                setSelectedImage(image);
                setDialogOpen(true);
              }}
              className="overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={image.image_url} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium">{image.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <GalleryModal image={selectedImage} allImages={images} />
        </Dialog>
      )}
    </>
  );
};

export default GalleryGrid;
