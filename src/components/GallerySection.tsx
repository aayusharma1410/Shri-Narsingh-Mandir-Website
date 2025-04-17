
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import GalleryGrid from './gallery/GalleryGrid';

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const childElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      childElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="gallery" className="section-container bg-white" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">दिव्य दर्शन</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">मंदिर गैलरी</h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          श्री नृसिंह मंदिर हसामपुर के सुंदर दृश्यों, भव्य उत्सवों और आध्यात्मिक क्षणों की झलक देखें।
        </p>
      </div>
      
      <GalleryGrid />
      
      <div className="mt-10 text-center opacity-0 animate-on-scroll">
        <Button 
          variant="outline" 
          className="border-temple-gold text-temple-maroon hover:bg-temple-lightgold/50"
        >
          और देखें
        </Button>
      </div>
    </section>
  );
};

export default GallerySection;
