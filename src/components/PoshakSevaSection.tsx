
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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

// Define the reasons array separately to avoid the issue
const reasonsEn = [
  'Offering new garments to the deity is a time-honored tradition that signifies respect, devotion, and reverence.',
  'It is believed that Poshak Seva helps in fulfilling wishes, removing obstacles, and bringing divine blessings.',
  'Devotees perform this seva to mark special occasions in their lives, such as birthdays, anniversaries, or spiritual milestones.',
  'Bhagwan Narsingh is known as the divine protector. Offering poshak is a way to seek his blessings for strength, courage, and protection from all forms of negativity.',
  'Performing this seva not only pleases the deity but also purifies the heart of the devotee and strengthens the connection between the soul and the divine.'
];

const reasonsHi = [
  'देवता को नए वस्त्र अर्पित करना एक समय-सम्मानित परंपरा है जो सम्मान, भक्ति और श्रद्धा का प्रतीक है।',
  'यह माना जाता है कि पोशाक सेवा इच्छाओं को पूरा करने, बाधाओं को दूर करने और दिव्य आशीर्वाद लाने में मदद करती है।',
  'भक्त अपने जीवन के विशेष अवसरों, जैसे जन्मदिन, वर्षगांठ, या आध्यात्मिक मील के पत्थर पर यह सेवा करते हैं।',
  'भगवान नरसिंह को दिव्य रक्षक के रूप में जाना जाता है। पोशाक चढ़ाना शक्ति, साहस और सभी प्रकार की नकारात्मकता से सुरक्षा के लिए उनका आशीर्वाद लेने का एक तरीका है।',
  'इस सेवा को करने से न केवल देवता प्रसन्न होते हैं बल्कि भक्त का हृदय भी शुद्ध होता है और आत्मा और दिव्य के बीच संबंध मजबूत होता है।'
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
        throw error;
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

  // Use the appropriate reasons array based on current language
  const reasons = language === 'en' ? reasonsEn : reasonsHi;

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
