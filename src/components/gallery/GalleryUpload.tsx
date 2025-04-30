
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload, FileVideo, Image, Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface GalleryUploadProps {
  onUploadSuccess?: () => void;
}

const GalleryUpload = ({ onUploadSuccess }: GalleryUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    
    // Automatically start upload if files are selected
    if (files.length > 0) {
      handleUpload(files);
    }
  };

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    try {
      setUploading(true);
      setUploadProgress(0);
      
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
        const fileName = `${Math.random()}.${fileExt}`;
        
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

        // Save to gallery_images table
        const { error: dbError } = await supabase
          .from('gallery_images')
          .insert({
            title: file.name,
            image_url: publicUrl,
            category: 'general',
            uploaded_by: user?.id,
            media_type: fileType // Add media type to distinguish between images and videos
          });

        if (dbError) {
          console.error('Database insert error:', dbError);
          toast({
            variant: "destructive",
            title: language === 'en' ? 'Error' : 'त्रुटि',
            description: language === 'en' 
              ? `Failed to save ${file.name} to database`
              : `${file.name} को डेटाबेस में सहेजने में विफल`,
          });
          continue;
        }
        
        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
      }
      
      if (completedFiles > 0) {
        toast({
          title: language === 'en' ? 'Success' : 'सफल',
          description: language === 'en' 
            ? `${completedFiles} of ${totalFiles} files uploaded successfully`
            : `${totalFiles} में से ${completedFiles} फ़ाइलें सफलतापूर्वक अपलोड की गईं`,
        });
        
        // Call onUploadSuccess callback if provided
        if (onUploadSuccess) {
          onUploadSuccess();
        }
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
      setSelectedFiles([]);
      setUploadProgress(0);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="mb-6">
      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelect}
        multiple
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
                <Image className="mr-2 h-4 w-4" />
                <FileVideo className="mr-2 h-4 w-4" />
                <span>
                  {language === 'en' 
                    ? 'Upload Images or Videos (Multiple files)' 
                    : 'छवियां या वीडियो अपलोड करें (कई फ़ाइलें)'}
                </span>
              </>
            )}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default GalleryUpload;
