
import { useEffect, useState } from "react";
import GalleryGrid from "./gallery/GalleryGrid";
import GalleryUpload from "./gallery/GalleryUpload";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { GalleryImage } from "@/types/gallery";
import { Loader } from "lucide-react";
import { useToast } from "./ui/use-toast";

const GallerySection = () => {
  const { language } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery images:', error);
        toast({
          variant: "destructive",
          title: language === 'en' ? 'Error' : 'त्रुटि',
          description: language === 'en'
            ? 'Failed to load gallery images'
            : 'गैलरी छवियां लोड करने में विफल',
        });
        return;
      }

      // Convert the generic media_type to the specific union type
      const typedData = data?.map(item => ({
        ...item,
        media_type: (item.media_type === 'video' ? 'video' : 'image') as 'image' | 'video'
      })) || [];
      
      setImages(typedData);
    } catch (error) {
      console.error('Error in gallery fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, [language, toast]);

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-temple-maroon mb-2">
          {language === "en" ? "Temple Gallery" : "मंदिर गैलरी"}
        </h2>
        <p className="text-lg text-neutral-600">
          {language === "en"
            ? "View beautiful glimpses from the temple."
            : "यहाँ मंदिर से जुड़ी सुंदर झलकियाँ देखें।"}
        </p>
      </div>
      <GalleryUpload onUploadSuccess={fetchGalleryImages} />
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-temple-maroon" />
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "Loading gallery..." : "गैलरी लोड हो रही है..."}
            </p>
          </div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            {language === "en" 
              ? "No images or videos available yet" 
              : "अभी तक कोई छवि या वीडियो उपलब्ध नहीं है"}
          </p>
        </div>
      ) : (
        <GalleryGrid images={images} onImageDeleted={fetchGalleryImages} />
      )}
    </section>
  );
};

export default GallerySection;
