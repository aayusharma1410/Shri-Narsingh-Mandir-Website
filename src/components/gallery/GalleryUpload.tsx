
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const GalleryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(data?.is_admin || false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      
      if (!file) return;
      
      // Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // Save to gallery_images table
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([
          {
            title: file.name,
            image_url: publicUrl,
            category: 'general',
            uploaded_by: user?.id
          }
        ]);

      if (dbError) throw dbError;

      toast({
        title: language === 'en' ? 'Success' : 'सफल',
        description: language === 'en' 
          ? 'Image uploaded successfully'
          : 'छवि सफलतापूर्वक अपलोड की गई',
      });

      // Refresh the page to show new image
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'त्रुटि',
        description: language === 'en'
          ? 'Failed to upload image'
          : 'छवि अपलोड करने में विफल',
      });
    } finally {
      setUploading(false);
    }
  };

  // Don't render anything if user is not admin
  if (!isAdmin) return null;

  return (
    <div className="mb-6">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
        id="gallery-upload"
      />
      <label htmlFor="gallery-upload">
        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-6"
          disabled={uploading}
          asChild
        >
          <span>
            <Upload className="mr-2 h-4 w-4" />
            {language === 'en' 
              ? uploading ? 'Uploading...' : 'Upload Image'
              : uploading ? 'अपलोड हो रहा है...' : 'छवि अपलोड करें'}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default GalleryUpload;
