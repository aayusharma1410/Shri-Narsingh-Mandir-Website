
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-temple-maroon text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">श्री नरसिंह मंदिर</h3>
            <p className="mb-4">
              200 वर्षों से अधिक पुराना, श्री नरसिंह मंदिर हसमपुर एक प्राचीन मंदिर है जो भगवान नरसिंह को समर्पित है।
            </p>
            <div className="flex items-center mt-6">
              <Heart className="w-5 h-5 mr-2 text-temple-gold" />
              <p>आपके सहयोग से संचालित</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">संपर्क करें</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="w-5 h-5 mr-3 text-temple-gold" />
                <span>श्री नरसिंह मंदिर, हसमपुर गांव, उत्तर प्रदेश, भारत</span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 mr-3 text-temple-gold" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 mr-3 text-temple-gold" />
                <span>info@narsinghmandir.org</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">त्वरित लिंक</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-temple-gold transition-colors">होम</a>
              </li>
              <li>
                <a href="#about" className="hover:text-temple-gold transition-colors">हमारे बारे में</a>
              </li>
              <li>
                <a href="#live-aarti" className="hover:text-temple-gold transition-colors">लाइव आरती</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-temple-gold transition-colors">गैलरी</a>
              </li>
              <li>
                <a href="#timings" className="hover:text-temple-gold transition-colors">समय</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">अपडेट पाएं</h3>
            <p className="mb-4">
              मंदिर के उत्सवों और गतिविधियों के बारे में नवीनतम जानकारी प्राप्त करने के लिए नीचे अपना ईमेल दर्ज करें।
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="आपका ईमेल" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-temple-gold"
              />
              <Button className="bg-temple-gold hover:bg-temple-gold/80 text-white">
                सबस्क्राइब
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-white/20" />
        
        <div className="text-center text-white/70">
          <p>
            &copy; {currentYear} श्री नरसिंह मंदिर हसमपुर। सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
