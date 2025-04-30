
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { suggestionSchema, SuggestionFormValues } from "@/schemas/suggestionSchema";

export const useSuggestionForm = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: SuggestionFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Submitting suggestion:", data);
      
      // Attempt to insert the data into Supabase with the phone column
      const { error } = await supabase
        .from("suggestions")
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }]);
      
      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      console.log("Suggestion submitted successfully");
      
      // Show success message
      toast.success(
        language === "en"
          ? "Suggestion submitted successfully!"
          : "सुझाव सफलतापूर्वक जमा किया गया!",
        {
          duration: 5000,
        }
      );

      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      
      // Show error message
      toast.error(
        language === "en"
          ? "Failed to submit suggestion. Please try again."
          : "सुझाव जमा करने में विफल। कृपया पुनः प्रयास करें।",
        {
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
