
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import UploadDialog from "./upload/UploadDialog";
import UploadButton from "./upload/UploadButton";
import { uploadDarshanFiles } from "./upload/FileUploader";

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
  
  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    // Store selected files for later processing
    setSelectedFiles(Array.from(event.target.files));
    setShowDialog(true);
  };
  
  const handleFileUpload = async (title: string) => {
    if (selectedFiles.length === 0) {
      setShowDialog(false);
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    setShowDialog(false);
    
    const success = await uploadDarshanFiles({
      files: selectedFiles,
      title,
      userId: user?.id,
      language,
      onProgress: setUploadProgress
    });
    
    if (success) {
      // Clear selected files
      setSelectedFiles([]);
      
      // Call the callback to refresh the darshan media
      onUploadSuccess();
    }
    
    setUploading(false);
    setUploadProgress(0);
  };
  
  const closeDialog = () => setShowDialog(false);
  
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
        <UploadButton 
          uploading={uploading}
          uploadProgress={uploadProgress}
          htmlFor="darshan-upload"
        />
      </label>
      
      <UploadDialog
        isOpen={showDialog}
        onClose={closeDialog}
        onConfirm={handleFileUpload}
        fileCount={selectedFiles.length}
      />
    </div>
  );
};

export default DarshanUploader;
