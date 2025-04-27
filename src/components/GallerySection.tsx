
import { useEffect, useState } from "react";
import GalleryGrid from "./gallery/GalleryGrid";
import GalleryUpload from "./gallery/GalleryUpload";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { GalleryImage } from "@/types/gallery";

const GallerySection = () => {
  const { language } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery images:', error);
        return;
      }

      setImages(data || []);
    };

    fetchGalleryImages();
  }, []);

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
      <GalleryUpload />
      <GalleryGrid images={images} />
    </section>
  );
};

export default GallerySection;
