
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GalleryActionsProps {
  imageId: string;
  imageUrl: string;
  isDarshan?: boolean;
  onDelete: () => void;
  isAdmin: boolean;
}

const GalleryActions = ({ imageId, imageUrl, isDarshan, onDelete, isAdmin }: GalleryActionsProps) => {
  const { language } = useLanguage();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAdmin) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Extract the file path from the URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // First, delete from the appropriate table
      if (isDarshan) {
        // Delete from darshan_media
        const { error: darshanError } = await supabase
          .from('darshan_media')
          .delete()
          .eq('id', imageId);
        
        if (darshanError) {
          console.error('Error deleting from darshan_media:', darshanError);
          throw darshanError;
        }
      }
      
      // Delete from gallery_images (for both gallery and darshan images)
      const { error: galleryError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId);
      
      if (galleryError) {
        console.error('Error deleting from gallery_images:', galleryError);
        throw galleryError;
      }
      
      // Attempt to delete the actual file from storage
      try {
        const { error: storageError } = await supabase.storage
          .from('gallery')
          .remove([fileName]);
          
        if (storageError) {
          console.warn('Warning: Could not delete file from storage:', storageError);
        }
      } catch (storageErr) {
        // Don't fail the entire operation if storage delete fails
        console.warn('Storage delete failed, but database record was removed:', storageErr);
      }
      
      toast.success(
        language === 'en' 
          ? 'Image deleted successfully' 
          : 'छवि सफलतापूर्वक हटा दी गई'
      );
      
      // Call the onDelete callback to update the UI
      onDelete();
    } catch (error) {
      console.error('Error deleting image:', error);
      
      toast.error(
        language === 'en' 
          ? 'Failed to delete image. Please try again.' 
          : 'छवि हटाने में विफल। कृपया पुनः प्रयास करें।'
      );
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        size="sm" 
        className="absolute top-2 right-2 opacity-80 hover:opacity-100"
        onClick={() => setIsDeleteDialogOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'en' ? 'Confirm Deletion' : 'हटाने की पुष्टि करें'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'en' 
                ? 'Are you sure you want to delete this image? This action cannot be undone.' 
                : 'क्या आप वाकई इस छवि को हटाना चाहते हैं? यह क्रिया रद्द नहीं की जा सकती।'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'en' ? 'Cancel' : 'रद्द करें'}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting 
                ? (language === 'en' ? 'Deleting...' : 'हटा रहा है...') 
                : (language === 'en' ? 'Delete' : 'हटाएं')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GalleryActions;
