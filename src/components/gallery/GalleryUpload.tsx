
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader, Upload, Image as ImageIcon, Video } from "lucide-react";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface GalleryUploadProps {
  onUploadSuccess: () => void;
}

const GalleryUpload = ({ onUploadSuccess }: GalleryUploadProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { isAdmin } = useAdminStatus();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  
  if (!isAdmin) return null;
  
  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    setSelectedFiles(Array.from(event.target.files));
    setShowDialog(true);
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0 || !user?.id) {
      setShowDialog(false);
      return;
    }
    
    try {
      setUploading(true);
      setUploadProgress(0);
      setShowDialog(false);
      
      const totalFiles = selectedFiles.length;
      let completedFiles = 0;
      
      for (const file of selectedFiles) {
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
        const fileName = `gallery_${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
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
        const { error: galleryError } = await supabase
          .from('gallery_images')
          .insert([
            {
              title: title || null,
              image_url: publicUrl,
              uploaded_by: user.id,
              media_type: fileType === 'video' ? 'video' : 'image',
            }
          ]);
        
        if (galleryError) {
          console.error('Gallery database insert error:', galleryError);
          toast({
            variant: "destructive",
            title: language === 'en' ? 'Error' : 'त्रुटि',
            description: language === 'en' 
              ? `Failed to save to gallery`
              : `गैलरी में सहेजने में विफल`,
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
            ? `${completedFiles} files uploaded successfully`
            : `${completedFiles} फ़ाइलें सफलतापूर्वक अपलोड की गईं`,
        });
        
        // Clear title and selected files
        setTitle("");
        setSelectedFiles([]);
        
        // Call the callback to refresh the gallery
        onUploadSuccess();
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
  
  return (
    <div className="mb-8">
      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileSelection}
        multiple
        disabled={uploading}
        className="hidden"
        id="gallery-upload"
      />
      <label htmlFor="gallery-upload">
        <Button
          variant="outline"
          className="w-full border-dashed border-2 py-6 mb-8 hover:bg-temple-gold/10"
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
                    ? "Upload Images or Videos to Gallery" 
                    : "गैलरी में छवियां या वीडियो अपलोड करें"}
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
              <Label htmlFor="gallery-title">
                {language === 'en' ? 'Title' : 'शीर्षक'}
              </Label>
              <Input
                id="gallery-title"
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

export default GalleryUpload;
