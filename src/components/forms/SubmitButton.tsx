
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  const { language } = useLanguage();
  
  return (
    <Button 
      type="submit" 
      disabled={isSubmitting} 
      className="bg-temple-gold hover:bg-temple-gold/80 text-temple-maroon font-medium w-full"
    >
      {isSubmitting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Send className="mr-2 h-4 w-4" />
      )}
      {language === "en" ? "Submit Suggestion" : "सुझाव जमा करें"}
    </Button>
  );
};

export default SubmitButton;
