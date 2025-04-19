
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GalleryModal from "./GalleryModal";
import { supabase } from "@/lib/supabase";
import { GalleryImage } from "@/types/gallery";
import { galleryImages } from "@/data/galleryData"; // Import static gallery data

const GalleryGrid = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        // First try to fetch from gallery_images table in Supabase
        const { data: dbImages, error: dbError } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (dbError) {
          console.error('Error fetching gallery images from DB:', dbError);
        }
        
        // Then try to fetch images from gallery storage bucket
        const { data: storageImages, error: storageError } = await supabase
          .storage
          .from('gallery')
          .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });
          
        if (storageError) {
          console.error('Error fetching gallery images from storage:', storageError);
        }
        
        // Combine images from different sources
        let allImages: GalleryImage[] = [...galleryImages]; // Start with static images
        
        // Add database images if any
        if (dbImages && dbImages.length > 0) {
          dbImages.forEach((dbImage) => {
            // Convert database image to our format if needed
            if (!allImages.some(img => img.id === dbImage.id)) {
              allImages.push(dbImage as GalleryImage);
            }
          });
        }
        
        // Add storage images if any
        if (storageImages && storageImages.length > 0) {
          const storageBaseUrl = supabase.storage.from('gallery').getPublicUrl('').data.publicUrl;
          
          storageImages.forEach((file, index) => {
            if (!file.name.includes('.')) return; // Skip folders
            
            const fileUrl = `${storageBaseUrl}/${file.name}`;
            // Avoid duplicates by checking if URL already exists
            if (!allImages.some(img => img.image_url === fileUrl)) {
              allImages.push({
                id: 10000 + index, // Use high IDs to avoid conflicts
                image_url: fileUrl,
                title: file.name.split('.')[0],
                alt: file.name.split('.')[0],
                category: "mandir",
                created_at: file.created_at || new Date().toISOString()
              });
            }
          });
        }
        
        // Sort by created_at
        allImages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        setImages(allImages);
      } catch (error) {
        console.error('Error in fetchGalleryImages:', error);
        // Fallback to static data
        setImages(galleryImages);
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
