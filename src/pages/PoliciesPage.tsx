
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PolicySection from '@/components/PolicySection';
import { useLanguage } from '@/contexts/LanguageContext';

const PoliciesPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-4xl font-serif text-temple-maroon text-center mb-10">
            {language === 'en' ? 'Temple Policies' : 'मंदिर नीतियां'}
          </h1>
        </div>
        <PolicySection />
      </main>
      <Footer />
    </div>
  );
};

export default PoliciesPage;
