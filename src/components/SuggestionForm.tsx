
import { useLanguage } from "@/contexts/LanguageContext";
import { Form } from "@/components/ui/form";
import { useSuggestionForm } from "@/hooks/useSuggestionForm";
import FormFieldWrapper from "@/components/forms/FormFieldWrapper";
import SubmitButton from "@/components/forms/SubmitButton";

const SuggestionForm = () => {
  const { language } = useLanguage();
  const { form, isSubmitting, onSubmit } = useSuggestionForm();

  return (
    <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg shadow">
      <h3 className="text-xl font-serif mb-4">
        {language === "en" ? "Send Your Suggestion" : "अपना सुझाव भेजें"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormFieldWrapper
            form={form}
            name="name"
            label={{ en: "Name", hi: "नाम" }}
            placeholder={{ en: "Your name", hi: "आपका नाम" }}
          />
          
          <FormFieldWrapper
            form={form}
            name="email"
            label={{ en: "Email", hi: "ईमेल" }}
            placeholder={{ en: "Your email", hi: "आपका ईमेल" }}
            type="email"
          />
          
          <FormFieldWrapper
            form={form}
            name="phone"
            label={{ en: "Phone Number", hi: "फोन नंबर" }}
            placeholder={{ en: "Your phone number", hi: "आपका फोन नंबर" }}
            type="tel"
          />
          
          <FormFieldWrapper
            form={form}
            name="message"
            label={{ en: "Suggestion", hi: "सुझाव" }}
            placeholder={{ 
              en: "Your suggestion or feedback...", 
              hi: "आपका सुझाव या प्रतिक्रिया..." 
            }}
            type="textarea"
            className="min-h-[100px]"
          />
          
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default SuggestionForm;
