
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GalleryModal from "./GalleryModal";
import { supabase } from "@/lib/supabase";

interface GalleryImage {
  id: number;
  image_url: string;
  title: string;
  created_at: string;
}

const GalleryGrid = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform the data to match the expected format
          const transformedData = data.map(item => ({
            id: item.id,
            src: item.image_url,
            alt: item.title,
            category: 'all'
          }));
          setImages(transformedData);
        } else {
          // Use fallback to static data if the database is empty
          console.log('No gallery images found in the database. Using static data.');
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
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
            <GalleryModal image={image} allImages={images} />
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
