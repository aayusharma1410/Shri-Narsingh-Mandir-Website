
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader, Upload, Image as ImageIcon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GalleryImage } from '@/types/gallery';

interface DarshanMedia {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
  media_type: 'image' | 'video';
}

const DarshanSlideshow = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [darshanMedia, setDarshanMedia] = useState<DarshanMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  useEffect(() => {
    fetchDarshanMedia();
    checkAdminStatus();
  }, [user]);
  
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
  
  const fetchDarshanMedia = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('darshan_images')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching darshan media:', error);
        toast({
          variant: "destructive",
          title: language === 'en' ? 'Error' : 'त्रुटि',
          description: language === 'en' 
            ? 'Failed to load darshan images'
            : 'दर्शन छवियां लोड करने में विफल',
        });
        return;
      }
      
      setDarshanMedia(data || []);
    } catch (error) {
      console.error('Error in darshan fetch:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user?.id) return;
    
    try {
      setUploading(true);
      setUploadProgress(0);
      
      const files = Array.from(event.target.files);
      const totalFiles = files.length;
      let completedFiles = 0;
      
      for (const file of files) {
        // Validate file type
        const fileType = file.type.split('/')[0];
        if (fileType !== 'image' && fileType !== 'video') {
          toast({
            variant: "destructive",
            title: language === 'en' ? 'Error' : 'त्रुटि',
            description: language === 'en' 
              ? `${file.name} is not an image or video file`
              : `${file.name} कोई छवि या वीडियो फ़ाइल नहीं है`,
          });
          continue;
        }
        
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `darshan_${Math.random()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('gallery')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          toast({
            variant: "destructive",
            title: language === 'en' ? 'Error' : 'त्रुटि',
            description: language === 'en' 
              ? `Failed to upload ${file.name}`
              : `${file.name} अपलोड करने में विफल`,
          });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);
        
        // Format current date for title
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        const title = language === 'en' 
          ? `Today's Darshan - ${formattedDate}`
          : `आज का दर्शन - ${formattedDate}`;
        
        // Save to darshan_images table
        const { error: darshanError } = await supabase
          .from('darshan_images')
          .insert([
            {
              title: title,
              image_url: publicUrl,
              uploaded_by: user.id,
              media_type: fileType as 'image' | 'video'
            }
          ]);

        if (darshanError) {
          console.error('Darshan database insert error:', darshanError);
          toast({
            variant: "destructive",
            title: language === 'en' ? 'Error' : 'त्रुटि',
            description: language === 'en' 
              ? `Failed to save darshan to database`
              : `दर्शन को डेटाबेस में सहेजने में विफल`,
          });
          continue;
        }
        
        // Also save to gallery_images table for automatic syncing
        const { error: galleryError } = await supabase
          .from('gallery_images')
          .insert([
            {
              title: title,
              image_url: publicUrl,
              category: 'darshan',
              uploaded_by: user.id,
              media_type: fileType as 'image' | 'video'
            }
          ]);
        
        if (galleryError) {
          console.error('Gallery database insert error:', galleryError);
          // Continue even if gallery sync fails, just log the error
        }
        
        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
      }
      
      if (completedFiles > 0) {
        toast({
          title: language === 'en' ? 'Success' : 'सफल',
          description: language === 'en' 
            ? `${completedFiles} files uploaded successfully`
            : `${completedFiles} फ़ाइलें सफलतापूर्वक अपलोड की गईं`,
        });
        
        // Refresh the darshan media
        fetchDarshanMedia();
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'त्रुटि',
        description: language === 'en'
          ? 'Failed to upload files. Please try again.'
          : 'फ़ाइलें अपलोड करने में विफल। कृपया पुन: प्रयास करें।',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  
  const renderMedia = () => {
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    );
  };
  
  return (
    <div id="darshan-slideshow" className="w-full max-w-2xl mx-auto mb-4">
      <h2 className="text-2xl font-serif text-center mb-4">
        {language === 'en' ? "Today's Darshan" : "आज का दर्शन"}
      </h2>
      
      {isAdmin && (
        <div className="mb-4">
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            multiple
            disabled={uploading}
            className="hidden"
            id="darshan-upload"
          />
          <label htmlFor="darshan-upload">
            <Button
              variant="outline"
              className="w-full border-dashed border-2 py-6"
              disabled={uploading}
              asChild
            >
              <span className="flex items-center justify-center">
                {uploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <Loader className="animate-spin h-4 w-4" />
                      <span>
                        {language === 'en' 
                          ? `Uploading... ${uploadProgress}%` 
                          : `अपलोड हो रहा है... ${uploadProgress}%`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    <ImageIcon className="mr-2 h-4 w-4" />
                    <Video className="mr-2 h-4 w-4" />
                    <span>
                      {language === 'en' 
                        ? "Upload Today's Darshan (Images or Videos)" 
                        : "आज का दर्शन अपलोड करें (छवियां या वीडियो)"}
                    </span>
                  </>
                )}
              </span>
            </Button>
          </label>
        </div>
      )}
      
      {renderMedia()}
    </div>
  );
};

export default DarshanSlideshow;
