
import * as React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LocationOption } from "@/data/locationData";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationDropdownProps {
  options: LocationOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: {
    en: string;
    hi: string;
  };
  className?: string;
}

const LocationDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  className = "",
}: LocationDropdownProps) => {
  const { language } = useLanguage();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`bg-white/80 border-temple-gold/30 focus:border-temple-gold ${className}`}>
        <SelectValue placeholder={language === "en" ? placeholder.en : placeholder.hi} />
      </SelectTrigger>
      <SelectContent className="max-h-[200px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;
