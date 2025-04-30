
import { useState } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
  fileCount: number;
}

const UploadDialog = ({ isOpen, onClose, onConfirm, fileCount }: UploadDialogProps) => {
  const { language } = useLanguage();
  const [title, setTitle] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Add title (optional)' : 'शीर्षक जोड़ें (वैकल्पिक)'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? `You've selected ${fileCount} file(s). Add a title or leave blank.` 
              : `आपने ${fileCount} फ़ाइल(ें) चुनी हैं। एक शीर्षक जोड़ें या खाली छोड़ दें।`}
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
          <Button variant="outline" onClick={onClose}>
            {language === 'en' ? 'Cancel' : 'रद्द करें'}
          </Button>
          <Button onClick={() => onConfirm(title)}>
            {language === 'en' ? 'Upload' : 'अपलोड करें'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
