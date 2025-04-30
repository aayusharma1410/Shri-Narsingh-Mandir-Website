
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader, Upload, Image as ImageIcon, Video } from "lucide-react";
import { format } from 'date-fns';
import { useAuth } from "@/contexts/AuthContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface DarshanUploaderProps {
  onUploadSuccess: () => void;
}

const DarshanUploader = ({ onUploadSuccess }: DarshanUploaderProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  
  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    // Store selected files for later processing
    setSelectedFiles(Array.from(event.target.files));
    setShowDialog(true);
  };
  
  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      setShowDialog(false);
      return;
    }
    
    try {
      setUploading(true);
      setUploadProgress(0);
      setShowDialog(false);
      
      const files = selectedFiles;
      const totalFiles = files.length;
      let completedFiles = 0;
      
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
        
        // Add debug log
        console.log('Uploading darshan media with title:', displayTitle, 'URL:', publicUrl);
        
        // Create an insertion object for darshan_media table
        const darshanObj = {
          title: displayTitle,
          title_hi: title_hi || displayTitle,
          image_url: publicUrl,
          media_type: fileType,
          uploaded_by: user?.id || null,
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
          uploaded_by: user?.id || null,
          media_type: fileType === 'video' ? 'video' : 'image',
          is_darshan: true
        };
        
        console.log('Saving to gallery_images:', galleryObj);
        
        const { error: galleryError } = await supabase
          .from('gallery_images')
          .insert([galleryObj]);
        
        if (galleryError) {
          console.error('Gallery database insert error:', galleryError);
          // Non-blocking error, just log it
        }
        
        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
      }
      
      if (completedFiles > 0) {
        toast.success(language === 'en' 
          ? `${completedFiles} files uploaded successfully`
          : `${completedFiles} फ़ाइलें सफलतापूर्वक अपलोड की गईं`
        );
        
        // Clear selected files
        setSelectedFiles([]);
        setTitle("");
        
        // Call the callback to refresh the darshan media
        onUploadSuccess();
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error(language === 'en'
        ? 'Failed to upload files. Please try again.'
        : 'फ़ाइलें अपलोड करने में विफल। कृपया पुन: प्रयास करें।'
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  
  return (
    <div className="mb-4">
      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelection}
        multiple
        disabled={uploading}
        className="hidden"
        id="darshan-upload"
      />
      <label htmlFor="darshan-upload">
        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-6 hover:bg-temple-gold/10"
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
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Add title (optional)' : 'शीर्षक जोड़ें (वैकल्पिक)'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? `You've selected ${selectedFiles.length} file(s). Add a title or leave blank.` 
                : `आपने ${selectedFiles.length} फ़ाइल(ें) चुनी हैं। एक शीर्षक जोड़ें या खाली छोड़ दें।`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {language === 'en' ? 'Title' : 'शीर्षक'}
              </Label>
              <Input
                id="title"
                placeholder={language === 'en' ? "Enter title (optional)" : "शीर्षक दर्ज करें (वैकल्पिक)"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              {language === 'en' ? 'Cancel' : 'रद्द करें'}
            </Button>
            <Button onClick={handleFileUpload}>
              {language === 'en' ? 'Upload' : 'अपलोड करें'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DarshanUploader;
