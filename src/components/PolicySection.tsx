
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';

const PolicySection = () => {
  const { language, t } = useLanguage();
  
  const contactEmail = "info@narsinghtemple.org";

  return (
    <div className="bg-temple-lightgold/20 py-16">
      <div className="container mx-auto px-4 space-y-12">
        <h2 className="text-3xl font-serif text-temple-maroon text-center mb-8">
          {language === 'en' ? 'Temple Policies' : 'मंदिर नीतियां'}
        </h2>
        
        {/* Return & Refund Policy */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-serif text-temple-maroon mb-4">
            {language === 'en' ? '1. Return & Refund Policy' : '1. वापसी और धनवापसी नीति'}
          </h3>
          
          {language === 'en' ? (
            <div className="space-y-4">
              <p>Thank you for your generous support and contribution to Shri Narsingh Mandir Hasampur. We deeply appreciate your donations, which help sustain our religious and charitable activities. Please review our refund policy carefully before proceeding with your donation.</p>
              
              <p><strong>Non-Refundable Contributions:</strong> All donations made to Shri Narsingh Mandir Hasampur are considered final and non-refundable.</p>
              
              <p><strong>Exceptional Circumstances:</strong> In the event of an erroneous transaction or technical issue, donors may request a refund within 48 hours of the transaction by contacting us at <a href={`mailto:${contactEmail}`} className="text-temple-gold underline flex items-center inline-flex gap-1"><Mail className="h-4 w-4" />{contactEmail}</a> with valid proof of payment. The final decision regarding refunds shall rest solely with the temple management.</p>
              
              <p><strong>Cancellation Policy:</strong> Once a donation is processed, it cannot be canceled.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>श्री नृसिंह मंदिर हसामपुर को आपके उदार समर्थन और योगदान के लिए धन्यवाद। हम आपके दान की गहराई से सराहना करते हैं, जो हमारी धार्मिक और परोपकारी गतिविधियों को बनाए रखने में मदद करते हैं। अपने दान के साथ आगे बढ़ने से पहले कृपया हमारी धनवापसी नीति को ध्यान से पढ़ें।</p>
              
              <p><strong>गैर-वापसी योग्य योगदान:</strong> श्री नृसिंह मंदिर हसामपुर को किए गए सभी दान अंतिम और गैर-वापसी योग्य माने जाते हैं।</p>
              
              <p><strong>असाधारण परिस्थितियां:</strong> गलत लेनदेन या तकनीकी समस्या की स्थिति में, दाता लेनदेन के 48 घंटों के भीतर <a href={`mailto:${contactEmail}`} className="text-temple-gold underline flex items-center inline-flex gap-1"><Mail className="h-4 w-4" />{contactEmail}</a> पर संपर्क करके वैध भुगतान प्रमाण के साथ धनवापसी का अनुरोध कर सकते हैं। धनवापसी के संबंध में अंतिम निर्णय पूरी तरह से मंदिर प्रबंधन के पास होगा।</p>
              
              <p><strong>रद्दीकरण नीति:</strong> एक बार दान प्रसंस्करण हो जाने के बाद, इसे रद्द नहीं किया जा सकता है।</p>
            </div>
          )}
        </div>
        
        <Separator className="bg-temple-gold/30" />
        
        {/* Privacy Policy */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-serif text-temple-maroon mb-4">
            {language === 'en' ? '2. Privacy Policy' : '2. गोपनीयता नीति'}
          </h3>
          
          {language === 'en' ? (
            <div className="space-y-4">
              <p>Shri Narsingh Mandir Hasampur respects your privacy and is committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.</p>
              
              <p><strong>Information Collection:</strong> We collect donor details, including name, contact information, and payment details, solely for processing donations and maintaining donor records.</p>
              
              <p><strong>Data Security:</strong> We implement strict security measures to protect your personal data and do not share, sell, or disclose it to third parties.</p>
              
              <p><strong>Secure Transactions:</strong> All transactions are processed through secure, industry-standard encryption methods via trusted payment gateways like Razorpay.</p>
              
              <p><strong>Use of Cookies:</strong> Our website may use cookies to enhance user experience and facilitate website functionality.</p>
              
              <p><strong>Contact Information:</strong> For any privacy-related concerns, please reach out to us at <a href={`mailto:${contactEmail}`} className="text-temple-gold underline flex items-center inline-flex gap-1"><Mail className="h-4 w-4" />{contactEmail}</a>.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>श्री नृसिंह मंदिर हसामपुर आपकी गोपनीयता का सम्मान करता है और आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध है। यह नीति बताती है कि हम आपके डेटा को कैसे एकत्र करते हैं, उपयोग करते हैं और सुरक्षित रखते हैं।</p>
              
              <p><strong>सूचना संग्रह:</strong> हम दान प्रसंस्करण और दाता रिकॉर्ड बनाए रखने के लिए केवल नाम, संपर्क जानकारी और भुगतान विवरण सहित दाता विवरण एकत्र करते हैं।</p>
              
              <p><strong>डेटा सुरक्षा:</strong> हम आपके व्यक्तिगत डेटा की सुरक्षा के लिए कड़े सुरक्षा उपाय लागू करते हैं और इसे तीसरे पक्ष के साथ साझा, बेचते या प्रकट नहीं करते हैं।</p>
              
              <p><strong>सुरक्षित लेनदेन:</strong> सभी लेनदेन Razorpay जैसे विश्वसनीय भुगतान गेटवे के माध्यम से सुरक्षित, उद्योग-मानक एन्क्रिप्शन विधियों के माध्यम से संसाधित किए जाते हैं।</p>
              
              <p><strong>कुकीज़ का उपयोग:</strong> हमारी वेबसाइट उपयोगकर्ता अनुभव को बढ़ाने और वेबसाइट की कार्यक्षमता की सुविधा के लिए कुकीज़ का उपयोग कर सकती है।</p>
              
              <p><strong>संपर्क जानकारी:</strong> किसी भी गोपनीयता संबंधी चिंताओं के लिए, कृपया हमसे <a href={`mailto:${contactEmail}`} className="text-temple-gold underline flex items-center inline-flex gap-1"><Mail className="h-4 w-4" />{contactEmail}</a> पर संपर्क करें।</p>
            </div>
          )}
        </div>
        
        <Separator className="bg-temple-gold/30" />
        
        {/* Disclaimer */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-serif text-temple-maroon mb-4">
            {language === 'en' ? '3. Disclaimer' : '3. अस्वीकरण'}
          </h3>
          
          {language === 'en' ? (
            <div className="space-y-4">
              <p>Shri Narsingh Mandir Hasampur is a religious and charitable institution. All funds received are exclusively used for temple maintenance, religious ceremonies, and community service initiatives.</p>
              
              <p>The information provided on our website is intended for general religious and spiritual purposes only. We do not guarantee any specific spiritual or material outcomes.</p>
              
              <p>Any disputes related to donations shall be subject to the jurisdiction of Mathura, Uttar Pradesh courts.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>श्री नृसिंह मंदिर हसामपुर एक धार्मिक और परोपकारी संस्थान है। प्राप्त सभी धनराशि का उपयोग विशेष रूप से मंदिर के रखरखाव, धार्मिक समारोहों और सामुदायिक सेवा पहलों के लिए किया जाता है।</p>
              
              <p>हमारी वेबसाइट पर प्रदान की गई जानकारी केवल सामान्य धार्मिक और आध्यात्मिक उद्देश्यों के लिए है। हम किसी विशेष आध्यात्मिक या भौतिक परिणामों की गारंटी नहीं देते हैं।</p>
              
              <p>दान से संबंधित कोई भी विवाद मथुरा, उत्तर प्रदेश न्यायालयों के अधिकार क्षेत्र के अधीन होगा।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicySection;
