
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader, Upload, Image as ImageIcon, Video } from "lucide-react";

interface UploadButtonProps {
  uploading: boolean;
  uploadProgress: number;
  htmlFor: string;
}

const UploadButton = ({ uploading, uploadProgress, htmlFor }: UploadButtonProps) => {
  const { language } = useLanguage();

  return (
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
  );
};

export default UploadButton;
