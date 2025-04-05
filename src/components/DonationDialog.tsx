
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
  const { language, t } = useLanguage();
  const [amount, setAmount] = useState(101);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const qrRef = useRef<HTMLDivElement>(null);

  // Generate a unique transaction ID
  const transactionId = `TRX${Date.now()}`;
  const qrValue = `upi://pay?pa=templedonation@upi&pn=Temple%20Donation&am=${amount}&tr=${transactionId}&cu=INR`;

  // Store donation in Supabase
  const storeDonation = async (donationData: {
    user_id?: string;
    email: string;
    name?: string;
    amount: number;
    transaction_id: string;
    payment_method: string;
    anonymous: boolean;
  }) => {
    try {
      const { data, error } = await supabase
        .from('donors')
        .insert([donationData]);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error storing donation:', error);
      return false;
    }
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would connect to a payment processor
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get email from authenticated user or input field
      const recipientEmail = user?.email || email;
      const donorName = user?.user_metadata?.username || name || "Anonymous";
      
      if (!recipientEmail) {
        toast({
          title: language === 'en' ? "Email Required" : "ईमेल आवश्यक",
          description: language === 'en' 
            ? "Please provide an email to receive your receipt" 
            : "अपनी रसीद प्राप्त करने के लिए कृपया एक ईमेल प्रदान करें",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Store donation in Supabase
      const donationData = {
        user_id: user?.id,
        email: recipientEmail,
        name: isAnonymous ? "Anonymous" : donorName,
        amount,
        transaction_id: transactionId,
        payment_method: paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI',
        anonymous: isAnonymous,
      };
      
      const stored = await storeDonation(donationData);
      
      if (!stored) {
        throw new Error("Failed to record donation");
      }
      
      // Show success toast
      toast({
        title: t('donation.success'),
        description: language === 'en' 
          ? `Thank you for your generous donation of ₹${amount}. Your contribution is greatly appreciated.`
          : `आपके ₹${amount} के उदार दान के लिए धन्यवाद। आपके योगदान की बहुत सराहना की जाती है।`
      });
      
      // Show email receipt confirmation
      toast({
        title: language === 'en' ? "Receipt Sent" : "रसीद भेज दी गई",
        description: language === 'en' 
          ? `A receipt has been sent to ${recipientEmail}`
          : `एक रसीद ${recipientEmail} पर भेज दी गई है`,
      });
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: language === 'en' ? "Donation Failed" : "दान विफल",
        description: language === 'en' 
          ? "There was a problem processing your donation"
          : "आपके दान को संसाधित करने में एक समस्या थी",
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
              {language === 'en' 
                ? `Scan with any UPI app to donate ₹${amount}`
                : `₹${amount} का दान करने के लिए किसी भी यूपीआई ऐप से स्कैन करें`}
            </p>
          </div>
        )}
        
        {!user && (
          <>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-temple-maroon">
                {language === 'en' ? "Email for Receipt" : "रसीद के लिए ईमेल"}
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
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-temple-maroon">
                {language === 'en' ? "Your Name (Optional)" : "आपका नाम (वैकल्पिक)"}
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'en' ? "Your name" : "आपका नाम"}
                className="border-temple-gold/50 focus-visible:ring-temple-gold"
              />
            </div>
          </>
        )}
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="rounded border-temple-gold/50 text-temple-gold focus:ring-temple-gold"
          />
          <Label htmlFor="anonymous" className="text-sm text-temple-maroon">
            {language === 'en' ? "Make donation anonymous" : "दान अनाम करें"}
          </Label>
        </div>

        <DialogFooter>
          <Button 
            type="submit" 
            className="w-full bg-temple-gold hover:bg-temple-gold/80 text-white"
            disabled={isSubmitting}
          >
            <Heart className="h-4 w-4 mr-2" />
            {isSubmitting 
              ? (language === 'en' ? "Processing..." : "प्रोसेसिंग...")
              : t('donation.donate')}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default DonationDialog;
