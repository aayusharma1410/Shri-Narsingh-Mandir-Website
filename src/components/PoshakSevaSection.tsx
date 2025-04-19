
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  'Silk',
  'Cotton',
  'Floral',
  'Silver',
  'Designer'
];

const PoshakSevaSection = () => {
  const { toast } = useToast();
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
      const { error } = await supabase
        .from('poshak_seva_bookings')
        .insert([{
          full_name: values.fullName,
          email: values.email,
          mobile_number: values.mobileNumber,
          seva_date: values.sevaDate,
          poshak_type: values.poshakType,
          occasion: values.occasion,
          additional_notes: values.additionalNotes,
        }]);

      if (error) throw error;

      setShowSuccess(true);
      form.reset();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit booking',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 space-y-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Poshak Seva</h1>
        <p className="text-lg mb-4">
          Poshak Seva is one of the most sacred and heartfelt offerings a devotee can make at Shri Lakshmi Narsingh Mandir, Hasampur.
        </p>
        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-4">Why Poshak Seva is Important:</h2>
          <ul className="list-disc text-left pl-6 space-y-2">
            <li>Offering new garments to the deity is a time-honored tradition that signifies respect, devotion, and reverence.</li>
            <li>It is believed that Poshak Seva helps in fulfilling wishes, removing obstacles, and bringing divine blessings.</li>
            <li>Devotees perform this seva to mark special occasions in their lives, such as birthdays, anniversaries, or spiritual milestones.</li>
            <li>Bhagwan Narsingh is known as the divine protector. Offering poshak is a way to seek his blessings for strength, courage, and protection from all forms of negativity.</li>
            <li>Performing this seva not only pleases the deity but also purifies the heart of the devotee and strengthens the connection between the soul and the divine.</li>
          </ul>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Book Poshak Seva</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mobile number" {...field} />
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
                  <FormLabel>Date of Seva</FormLabel>
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
                  <FormLabel>Type of Poshak</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select poshak type" />
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
                  <FormLabel>Occasion (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Birthday, Anniversary" {...field} />
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
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any special requests or notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book Poshak Seva"}
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Successful</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Thank you for booking the Poshak Seva. The Shri Lakshmi Narsingh Mandir Committee, Hasampur will contact you soon regarding further details and confirmation.</p>
            <p>May Bhagwan Narsingh bless you and your family with divine grace.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PoshakSevaSection;
