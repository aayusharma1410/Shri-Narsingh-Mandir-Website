
import { useState } from "react";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const suggestionSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  message: z.string().min(10, {
    message: "Suggestion must be at least 10 characters.",
  }).max(500, {
    message: "Suggestion cannot exceed 500 characters.",
  }),
});

type SuggestionFormValues = z.infer<typeof suggestionSchema>;

const SuggestionForm = () => {
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
      // Explicitly log what we're submitting for debugging
      console.log("Submitting suggestion:", data);
      
      // Insert data into the suggestions table
      const { data: result, error } = await supabase
        .from("suggestions")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Submission result:", result);

      toast.success(
        language === "en"
          ? "Your suggestion has been submitted successfully!"
          : "आपका सुझाव सफलतापूर्वक जमा कर दिया गया है!"
      );

      // Reset form fields
      form.reset();
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      toast.error(
        language === "en"
          ? "Failed to submit suggestion. Please try again."
          : "सुझाव जमा करने में विफल। कृपया पुनः प्रयास करें।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg shadow">
      <h3 className="text-xl font-serif mb-4">
        {language === "en" ? "Send Your Suggestion" : "अपना सुझाव भेजें"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  {language === "en" ? "Name" : "नाम"}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={language === "en" ? "Your name" : "आपका नाम"} 
                    className="bg-white/20 placeholder:text-gray-300 text-white border-temple-gold/30 focus:border-temple-gold" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  {language === "en" ? "Email" : "ईमेल"}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={language === "en" ? "Your email" : "आपका ईमेल"} 
                    className="bg-white/20 placeholder:text-gray-300 text-white border-temple-gold/30 focus:border-temple-gold" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  {language === "en" ? "Phone Number" : "फोन नंबर"}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder={language === "en" ? "Your phone number" : "आपका फोन नंबर"} 
                    className="bg-white/20 placeholder:text-gray-300 text-white border-temple-gold/30 focus:border-temple-gold" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  {language === "en" ? "Suggestion" : "सुझाव"}
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={language === "en" ? "Your suggestion or feedback..." : "आपका सुझाव या प्रतिक्रिया..."} 
                    className="bg-white/20 placeholder:text-gray-300 text-white min-h-[100px] border-temple-gold/30 focus:border-temple-gold" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </form>
      </Form>
    </div>
  );
};

export default SuggestionForm;
