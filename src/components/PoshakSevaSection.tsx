import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
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
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Shirt, Star, Calendar, HandHeart } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(15, 'Mobile number must not exceed 15 digits')
    .regex(/^[0-9]+$/, 'Mobile number must contain only digits'),
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
      console.log('Form data submitted:', values);
      
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('poshak_seva_bookings')
        .insert([
          {
            full_name: values.fullName,
            email: values.email,
            mobile_number: values.mobileNumber,
            seva_date: values.sevaDate,
            poshak_type: values.poshakType,
            occasion: values.occasion || null,
            additional_notes: values.additionalNotes || null,
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Booking saved successfully:', data);
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

  const reasons = language === 'en' 
    ? t('poshakSeva.reasons').split(',').map(item => item.trim())
    : t('poshakSeva.reasons').split(',').map(item => item.trim());

  return (
    <div className="container mx-auto px-4 space-y-12 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-temple-gold/30 to-amber-100/50 rounded-full shadow-inner">
            <Shirt size={32} className="text-temple-gold drop-shadow-sm" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-temple-maroon">{t('poshakSeva.title')}</h1>
        <p className="text-lg mb-8 leading-relaxed text-gray-700">
          {t('poshakSeva.description')}
        </p>
        <Card className="bg-gradient-to-r from-amber-50/80 to-white border border-amber-100/50 shadow-xl mb-12 transform hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-temple-gold/10 rounded-full mr-2">
                <HandHeart className="text-temple-maroon" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-temple-maroon">{t('poshakSeva.whyImportant')}</h2>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-none text-left space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start group">
                  <span className="inline-block w-7 h-7 bg-gradient-to-br from-temple-gold/20 to-amber-100/50 rounded-full flex items-center justify-center mr-3 mt-0.5 text-temple-maroon font-semibold text-sm group-hover:from-temple-gold/30 group-hover:to-amber-100/70 transition-colors duration-300">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-amber-100/80 animate-fade-in hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center justify-center mb-8">
          <div className="p-3 bg-gradient-to-br from-temple-maroon/20 to-temple-maroon/5 rounded-full">
            <Calendar size={28} className="text-temple-maroon" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-8 text-center text-temple-maroon">{t('poshakSeva.bookTitle')}</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">{t('poshakSeva.formLabels.fullName')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t('poshakSeva.formLabels.fullName')} 
                      {...field} 
                      className="border-amber-200 focus:border-temple-gold focus:ring-temple-gold/20 transition-shadow duration-200 hover:shadow-sm" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">{t('poshakSeva.formLabels.email')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="example@mail.com" 
                        {...field} 
                        className="border-amber-200 focus:border-temple-gold focus:ring-temple-gold/20 transition-shadow duration-200 hover:shadow-sm" 
                      />
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
                    <FormLabel className="font-medium text-gray-700">{t('poshakSeva.formLabels.mobile')}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="9XXXXXXXXX" 
                        {...field} 
                        className="border-amber-200 focus:border-temple-gold focus:ring-temple-gold/20 transition-shadow duration-200 hover:shadow-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sevaDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">{t('poshakSeva.formLabels.date')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="border-amber-200 focus:border-temple-gold focus:ring-temple-gold/20 transition-shadow duration-200 hover:shadow-sm" 
                      />
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
                    <FormLabel className="font-medium text-gray-700">{t('poshakSeva.formLabels.poshakType')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-amber-200 focus:ring-temple-gold/20 transition-shadow duration-200 hover:shadow-sm">
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
            </div>

            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">{t('poshakSeva.formLabels.occasion')}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={language === 'en' ? "e.g., Birthday, Anniversary" : "जैसे, जन्मदिन, वर्षगांठ"} 
                      {...field} 
                      className="border-amber-200 focus:border-temple-gold focus:ring-temple-gold/20 transition-shadow duration-200 hover:shadow-sm" 
                    />
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
                  <FormLabel className="font-medium text-gray-700">{t('poshakSeva.formLabels.notes')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={language === 'en' ? "Any special requests or notes" : "कोई विशेष अनुरोध या नोट्स"} 
                      {...field} 
                      className="min-h-[100px] border-amber-200 focus:border-temple-gold focus:ring-temple-gold/20 transition-shadow duration-200 hover:shadow-sm" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-temple-gold to-amber-500 hover:from-amber-500 hover:to-temple-gold text-primary-foreground transition-all duration-300 hover:shadow-md py-6 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('poshakSeva.submitting') : t('poshakSeva.submitButton')}
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md border-temple-gold/30 bg-gradient-to-b from-white/80 to-amber-50/90 backdrop-blur-sm">
          <DialogHeader>
            <div className="mx-auto p-4 bg-gradient-to-br from-temple-gold/20 to-amber-100/50 rounded-full mb-4">
              <Star size={26} className="text-temple-gold drop-shadow-sm" />
            </div>
            <DialogTitle className="text-center text-temple-maroon text-xl font-serif">{t('poshakSeva.successTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p className="text-gray-700">{t('poshakSeva.successMessage')}</p>
            <p className="text-temple-maroon font-serif text-lg">{t('poshakSeva.blessing')}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PoshakSevaSection;
