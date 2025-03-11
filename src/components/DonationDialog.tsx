
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { HandCoins, CreditCard, Heart, PiggyBank } from 'lucide-react';

const DonationDialog = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [amount, setAmount] = useState(101);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to a payment processor
    toast({
      title: t('donation.success'),
      description: t('donation.thankYou', { amount }),
    });
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
              className="border-temple-gold text-temple-maroon hover:bg-temple-lightgold/50 justify-start"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {t('donation.card')}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-temple-gold text-temple-maroon hover:bg-temple-lightgold/50 justify-start"
            >
              <PiggyBank className="h-4 w-4 mr-2" />
              UPI
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="submit" 
            className="w-full bg-temple-gold hover:bg-temple-gold/80 text-white"
          >
            <Heart className="h-4 w-4 mr-2" />
            {t('donation.donate')}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default DonationDialog;
