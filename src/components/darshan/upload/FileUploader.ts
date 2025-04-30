
import { format } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadOptions {
  files: File[];
  title: string;
  userId: string | undefined;
  language: string;
  onProgress: (progress: number) => void;
}

export async function uploadDarshanFiles({
  files,
  title,
  userId,
  language,
  onProgress
}: UploadOptions): Promise<boolean> {
  try {
    const totalFiles = files.length;
    let completedFiles = 0;
    let success = false;
    
    for (const file of files) {
      // Validate file type
      const fileType = file.type.split('/')[0];
      if (fileType !== 'image' && fileType !== 'video') {
        toast.error(language === 'en' 
          ? `${file.name} is not an image or video file`
          : `${file.name} कोई छवि या वीडियो फ़ाइल नहीं है`
        );
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
        toast.error(language === 'en' 
          ? `Failed to upload ${file.name}`
          : `${file.name} अपलोड करने में विफल`
        );
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);
      
      // Format current date for title
      const currentDate = new Date();
      const formattedDate = format(currentDate, language === 'en' ? 'MMMM d, yyyy' : 'd MMMM, yyyy');
      
      // Use custom title if provided, otherwise use default
      const displayTitle = title || (language === 'en' 
        ? `Today's Darshan - ${formattedDate}`
        : `आज का दर्शन - ${formattedDate}`);
      
      const title_hi = language === 'en'
        ? `आज का दर्शन - ${formattedDate}`
        : null;
      
      // Create an insertion object for darshan_media table
      const darshanObj = {
        title: displayTitle,
        title_hi: title_hi || displayTitle,
        image_url: publicUrl,
        media_type: fileType,
        uploaded_by: userId || null,
        display_date: currentDate.toISOString().split('T')[0]
      };
      
      // Save to darshan_media table
      const { error: darshanError } = await supabase
        .from('darshan_media')
        .insert([darshanObj]);
      
      if (darshanError) {
        console.error('Darshan database insert error:', darshanError);
        toast.error(language === 'en' 
          ? `Failed to save darshan to database`
          : `दर्शन को डेटाबेस में सहेजने में विफल`
        );
        continue;
      }
      
      // Also save to gallery_images for the main gallery
      const galleryObj = {
        title: displayTitle,
        image_url: publicUrl,
        category: 'darshan',
        uploaded_by: userId || null,
        media_type: fileType === 'video' ? 'video' : 'image',
        is_darshan: true
      };
      
      const { error: galleryError } = await supabase
        .from('gallery_images')
        .insert([galleryObj]);
      
      if (galleryError) {
        console.error('Gallery database insert error:', galleryError);
        // Non-blocking error, just log it
      }
      
      completedFiles++;
      onProgress(Math.round((completedFiles / totalFiles) * 100));
    }
    
    if (completedFiles > 0) {
      toast.success(language === 'en' 
        ? `${completedFiles} files uploaded successfully`
        : `${completedFiles} फ़ाइलें सफलतापूर्वक अपलोड की गईं`
      );
      success = true;
    }
    
    return success;
  } catch (error) {
    console.error('Error uploading files:', error);
    toast.error(language === 'en'
      ? 'Failed to upload files. Please try again.'
      : 'फ़ाइलें अपलोड करने में विफल। कृपया पुन: प्रयास करें।'
    );
    return false;
  }
}
