
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { HandCoins, CreditCard, Heart, PiggyBank, Mail } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const DonationDialog = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [amount, setAmount] = useState(101);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const qrRef = useRef<HTMLDivElement>(null);

  // Generate a unique transaction ID
  const transactionId = `TRX${Date.now()}`;
  const qrValue = `upi://pay?pa=templedonation@upi&pn=Temple%20Donation&am=${amount}&tr=${transactionId}&cu=INR`;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would connect to a payment processor
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get email from authenticated user or input field
      const recipientEmail = user?.email || email;
      
      if (!recipientEmail) {
        toast({
          title: "Email Required",
          description: "Please provide an email to receive your receipt",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Send receipt email using Supabase function (in a real app)
      const timestamp = new Date().toLocaleString();
      const receiptData = {
        email: recipientEmail,
        amount,
        transactionId,
        date: timestamp,
        method: paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI',
      };
      
      // This would be implemented in a real application using a serverless function
      console.log('Sending receipt to:', receiptData);
      
      // Show success toast
      toast({
        title: t('donation.success'),
        description: t('donation.thankYou', { amount }),
      });
      
      // Show email receipt confirmation
      toast({
        title: "Receipt Sent",
        description: `A receipt has been sent to ${recipientEmail}`,
      });
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Donation Failed",
        description: "There was a problem processing your donation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const donationAmounts = [101, 251, 501, 1001, 2100];

  return (
    <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-white to-temple-lightgold/20">
      <DialogHeader>
        <DialogTitle className="text-2xl font-serif text-temple-maroon flex items-center gap-2">
          <HandCoins className="h-5 w-5 text-temple-gold" />
          {t('donation.title')}
        </DialogTitle>
        <DialogDescription>
          {t('donation.description')}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleDonate} className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-temple-maroon">
            {t('donation.amount')}
          </Label>
          
          <div className="grid grid-cols-3 gap-2">
            {donationAmounts.map((value) => (
              <Button
                key={value}
                type="button"
                variant={amount === value ? "default" : "outline"}
                className={`border-temple-gold ${
                  amount === value 
                    ? "bg-temple-gold text-white" 
                    : "text-temple-maroon hover:bg-temple-lightgold/50"
                }`}
                onClick={() => setAmount(value)}
              >
                ₹{value}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Label htmlFor="custom-amount" className="shrink-0">
              {t('donation.custom')}:
            </Label>
            <Input
              id="custom-amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              className="border-temple-gold/50 focus-visible:ring-temple-gold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-temple-maroon">
            {t('donation.paymentMethod')}
          </Label>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              className={`border-temple-gold text-temple-maroon hover:bg-temple-lightgold/50 justify-start ${
                paymentMethod === 'card' ? 'bg-temple-lightgold/30' : ''
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {t('donation.card')}
            </Button>
            <Button
              type="button" 
              variant="outline"
              className={`border-temple-gold text-temple-maroon hover:bg-temple-lightgold/50 justify-start ${
                paymentMethod === 'upi' ? 'bg-temple-lightgold/30' : ''
              }`}
              onClick={() => setPaymentMethod('upi')}
            >
              <PiggyBank className="h-4 w-4 mr-2" />
              UPI
            </Button>
          </div>
        </div>
        
        {paymentMethod === 'upi' && (
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-md">
            <div ref={qrRef} className="mb-2">
              <QRCode
                value={qrValue}
                size={150}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p className="text-sm text-center text-temple-maroon mt-2">
              Scan with any UPI app to donate ₹{amount}
            </p>
          </div>
        )}
        
        {!user && (
          <div className="space-y-2">
            <Label htmlFor="email" className="text-temple-maroon">
              Email for Receipt
            </Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-temple-maroon" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="border-temple-gold/50 focus-visible:ring-temple-gold"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button 
            type="submit" 
            className="w-full bg-temple-gold hover:bg-temple-gold/80 text-white"
            disabled={isSubmitting}
          >
            <Heart className="h-4 w-4 mr-2" />
            {isSubmitting ? "Processing..." : t('donation.donate')}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default DonationDialog;
