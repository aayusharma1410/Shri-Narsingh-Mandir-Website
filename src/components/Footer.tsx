import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-temple-maroon text-white pt-10">
      {/* Small map for footer */}
      <div className="w-full md:w-96 max-w-xl mx-auto mb-8 px-2">
        <div className="rounded-lg shadow bg-white p-2">
          <iframe
            title="Footer Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.9459708397293!2d75.86830677541354!3d27.673900876194365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cb5251085f91b%3A0x333f18db169ffacf!2sHasampur%2C%20Rajasthan%20332502!5e0!3m2!1sen!2sin!4v1681559233761!5m2!1sen!2sin"
            width="100%"
            height="110"
            allowFullScreen
            loading="lazy"
            className="border-0 w-full h-[88px] rounded"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">
              {language === 'en' ? "Quick Links" : "त्वरित लिंक्स"}
            </h4>
            <ul className="list-none pl-0">
              <li className="mb-2">
                <Link to="/" className="hover:text-temple-gold">
                  {language === 'en' ? "Home" : "होम"}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:text-temple-gold">
                  {language === 'en' ? "About Us" : "हमारे बारे में"}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/live-aarti" className="hover:text-temple-gold">
                  {language === 'en' ? "Live Aarti" : "लाइव आरती"}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/gallery" className="hover:text-temple-gold">
                  {language === 'en' ? "Gallery" : "गेलरी"}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/timings" className="hover:text-temple-gold">
                  {language === 'en' ? "Temple Timings" : "मंदिर समय"}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/policies" className="hover:text-temple-gold">
                  {language === 'en' ? "Policies" : "नीतियाँ"}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/poshak-seva" className="hover:text-temple-gold">
                  {language === 'en' ? "Poshak Seva" : "पोशाक सेवा"}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">
              {language === 'en' ? "Contact Us" : "संपर्क करें"}
            </h4>
            <p>
              {language === 'en'
                ? "Shri Narsingh Temple, Hasampur, Sikar, Rajasthan"
                : "श्री नृसिंह मंदिर, हासमपुर, सीकर, राजस्थान"}
            </p>
            <p>
              {language === 'en'
                ? "Email: shrilakshminarsinghhasampur@gmail.com"
                : "ईमेल: shrilakshminarsinghhasampur@gmail.com"}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">
              {language === 'en' ? "Follow Us" : "हमें फॉलो करें"}
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-temple-gold">
                {language === 'en' ? "Facebook" : "फेसबुक"}
              </a>
              <a href="#" className="hover:text-temple-gold">
                {language === 'en' ? "Twitter" : "ट्विटर"}
              </a>
              <a href="#" className="hover:text-temple-gold">
                {language === 'en' ? "Instagram" : "इंस्टाग्राम"}
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 border-temple-gold/50" />
        <p className="text-center">
          {language === 'en'
            ? `© ${new Date().getFullYear()} Shri Narsingh Temple. All rights reserved.`
            : `© ${new Date().getFullYear()} श्री नृसिंह मंदिर। सर्वाधिकार सुरक्षित।`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
