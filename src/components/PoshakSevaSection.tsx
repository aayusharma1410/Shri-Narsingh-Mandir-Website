
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().min(10, 'Invalid mobile number'),
  sevaDate: z.string().min(1, 'Please select a date'),
  poshakType: z.string().min(1, 'Please select poshak type'),
  occasion: z.string().optional(),
  additionalNotes: z.string().optional(),
});

const poshakTypes = [
  'Silk', // सिल्क
  'Cotton', // कॉटन
  'Floral', // फूलों वाला
  'Silver', // चांदी
  'Designer' // डिजाइनर
];

const PoshakSevaSection = () => {
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      sevaDate: '',
      poshakType: '',
      occasion: '',
      additionalNotes: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', values);
      
      // Check if the table exists first
      const { error: checkError } = await supabase
        .from('poshak_seva_bookings')
        .select('id')
        .limit(1);
        
      if (checkError && checkError.code === '42P01') {
        throw new Error('The poshak_seva_bookings table does not exist in the database. Please run the SQL setup script first.');
      }
      
      const { error } = await supabase
        .from('poshak_seva_bookings')
        .insert([{
          full_name: values.fullName,
          email: values.email,
          mobile_number: values.mobileNumber,
          seva_date: values.sevaDate,
          poshak_type: values.poshakType,
          occasion: values.occasion || null,
          additional_notes: values.additionalNotes || null,
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to submit booking');
      }

      setShowSuccess(true);
      form.reset();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: language === 'en' ? 'Error' : 'त्रुटि',
        description: error.message || (language === 'en' ? 'Failed to submit booking' : 'बुकिंग जमा करने में विफल'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get reasons based on current language
  const reasons = language === 'en' 
    ? t('poshakSeva.reasons').split(',').map(item => item.trim())
    : t('poshakSeva.reasons').split(',').map(item => item.trim());

  return (
    <div className="container mx-auto px-4 space-y-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">{t('poshakSeva.title')}</h1>
        <p className="text-lg mb-4">
          {t('poshakSeva.description')}
        </p>
        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('poshakSeva.whyImportant')}</h2>
          <ul className="list-disc text-left pl-6 space-y-2">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">{t('poshakSeva.bookTitle')}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('poshakSeva.formLabels.fullName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('poshakSeva.formLabels.fullName')} {...field} />
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
                  <FormLabel>{t('poshakSeva.formLabels.email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('poshakSeva.formLabels.mobile')}</FormLabel>
                  <FormControl>
                    <Input placeholder="9XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sevaDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('poshakSeva.formLabels.date')}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="poshakType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('poshakSeva.formLabels.poshakType')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? "Select poshak type" : "पोशाक प्रकार चुनें"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {poshakTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('poshakSeva.formLabels.occasion')}</FormLabel>
                  <FormControl>
                    <Input placeholder={language === 'en' ? "e.g., Birthday, Anniversary" : "जैसे, जन्मदिन, वर्षगांठ"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('poshakSeva.formLabels.notes')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={language === 'en' ? "Any special requests or notes" : "कोई विशेष अनुरोध या नोट्स"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('poshakSeva.submitting') : t('poshakSeva.submitButton')}
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('poshakSeva.successTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{t('poshakSeva.successMessage')}</p>
            <p>{t('poshakSeva.blessing')}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PoshakSevaSection;
