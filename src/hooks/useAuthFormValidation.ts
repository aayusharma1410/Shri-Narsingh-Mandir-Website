
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  email?: boolean;
  match?: string;
}

interface FieldValidation {
  value: string;
  rules: ValidationRules;
  touched: boolean;
  error: string;
  ref?: React.RefObject<HTMLInputElement>;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useAuthFormValidation = (initialValues: { [key: string]: string }) => {
  const { language } = useLanguage();
  const [values, setValues] = useState(initialValues);
  const [fields, setFields] = useState<{ [key: string]: FieldValidation }>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Register a field for validation
  const register = (name: string, rules: ValidationRules = {}, ref?: React.RefObject<HTMLInputElement>) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        value: values[name] || '',
        rules,
        touched: false,
        error: '',
        ref
      }
    }));

    return {
      name,
      value: values[name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(name, e.target.value),
      onBlur: () => handleBlur(name),
    };
  };

  // Handle input change
  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Handle field blur
  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  };

  // Validate a single field
  const validateField = (name: string, value: string) => {
    const field = fields[name];
    if (!field) return '';
    
    let error = '';
    const { rules } = field;
    
    if (rules.required && !value) {
      error = language === 'en' ? 'This field is required' : 'यह फ़ील्ड आवश्यक है';
    } else if (rules.minLength && value.length < rules.minLength) {
      error = language === 'en' 
        ? `Minimum ${rules.minLength} characters required` 
        : `न्यूनतम ${rules.minLength} अक्षर आवश्यक हैं`;
    } else if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
      error = language === 'en' ? 'Invalid email address' : 'अमान्य ईमेल पता';
    } else if (rules.match && value !== values[rules.match]) {
      error = language === 'en' ? 'Fields do not match' : 'फ़ील्ड मेल नहीं खाते';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    let formIsValid = true;
    
    Object.keys(fields).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName] || '');
      newErrors[fieldName] = error;
      if (error) formIsValid = false;
    });
    
    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  // Focus the first field with an error
  const focusFirstError = () => {
    const fieldNames = Object.keys(fields);
    for (const name of fieldNames) {
      if (errors[name] && fields[name].ref?.current) {
        fields[name].ref.current.focus();
        break;
      }
    }
  };

  useEffect(() => {
    // Revalidate form when values change
    const formIsValid = !Object.values(errors).some(error => error);
    setIsValid(formIsValid);
  }, [errors, values]);

  return {
    values,
    errors,
    touched,
    isValid,
    register,
    handleChange,
    handleBlur,
    validateForm,
    focusFirstError,
    setValues,
  };
};
