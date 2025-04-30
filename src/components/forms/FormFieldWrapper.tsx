
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface FormFieldWrapperProps {
  form: UseFormReturn<any>;
  name: string;
  label: {
    en: string;
    hi: string;
  };
  placeholder: {
    en: string;
    hi: string;
  };
  type?: "text" | "email" | "tel" | "textarea";
  className?: string;
}

const FormFieldWrapper = ({
  form,
  name,
  label,
  placeholder,
  type = "text",
  className = "",
}: FormFieldWrapperProps) => {
  const { language } = useLanguage();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">
            {language === "en" ? label.en : label.hi}
          </FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={language === "en" ? placeholder.en : placeholder.hi}
                className={`bg-white/20 placeholder:text-gray-300 text-white border-temple-gold/30 focus:border-temple-gold ${className}`}
                {...field}
              />
            ) : (
              <Input
                type={type}
                placeholder={language === "en" ? placeholder.en : placeholder.hi}
                className={`bg-white/20 placeholder:text-gray-300 text-white border-temple-gold/30 focus:border-temple-gold ${className}`}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWrapper;
