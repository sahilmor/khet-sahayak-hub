import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguageStore } from '@/store/language';

const FAQSection = () => {
  const { language } = useLanguageStore();
  
  const faqs = [
    {
      question: language === 'hi' ? 'FasalGuru ऐप कैसे काम करता है?' : 'How does FasalGuru app work?',
      answer: language === 'hi' 
        ? 'FasalGuru एक AI-आधारित प्लेटफॉर्म है जो किसानों को फसल की समस्याओं का तुरंत समाधान प्रदान करता है। आप अपनी समस्या बताएं और हमारा AI असिस्टेंट आपको विशेषज्ञों द्वारा सत्यापित समाधान देगा।'
        : 'FasalGuru is an AI-powered platform that provides instant solutions to farmers for crop problems. Simply describe your issue and our AI assistant will provide you with expert-verified solutions.'
    },
    {
      question: language === 'hi' ? 'क्या यह ऐप मुफ्त है?' : 'Is this app free to use?',
      answer: language === 'hi'
        ? 'जी हां, FasalGuru के बुनियादी फीचर्स बिल्कुल मुफ्त हैं। कुछ एडवांस फीचर्स के लिए प्रीमियम प्लान भी उपलब्ध है।'
        : 'Yes, FasalGuru\'s basic features are completely free to use. We also offer premium plans for advanced features.'
    },
    {
      question: language === 'hi' ? 'क्या मैं हिंदी में सवाल पूछ सकता हूं?' : 'Can I ask questions in Hindi?',
      answer: language === 'hi'
        ? 'बिल्कुल! FasalGuru हिंदी और अंग्रेजी दोनों भाषाओं को सपोर्ट करता है। आप अपनी सुविधा के अनुसार किसी भी भाषा का उपयोग कर सकते हैं।'
        : 'Absolutely! FasalGuru supports both Hindi and English. You can use whichever language you are comfortable with.'
    },
    {
      question: language === 'hi' ? 'लैब टेस्ट कैसे बुक करें?' : 'How do I book lab tests?',
      answer: language === 'hi'
        ? 'ऐप में "लैब टेस्ट" सेक्शन में जाएं, अपना स्थान चुनें, और पास की प्रमाणित प्रयोगशालाओं की सूची देखें। फिर अपनी सुविधा के अनुसार टेस्ट बुक करें।'
        : 'Go to the "Lab Test" section in the app, select your location, and browse certified laboratories near you. Then book your test at your convenience.'
    },
    {
      question: language === 'hi' ? 'मार्केटप्लेस कैसे काम करता है?' : 'How does the marketplace work?',
      answer: language === 'hi'
        ? 'हमारे मार्केटप्लेस में आप अपनी फसल सीधे खरीदारों को बेच सकते हैं। फसल की तस्वीर, कीमत और विवरण अपलोड करें, और इच्छुक खरीदार आपसे संपर्क करेंगे।'
        : 'In our marketplace, you can sell your crops directly to buyers. Upload photos, price, and details of your crop, and interested buyers will contact you.'
    },
    {
      question: language === 'hi' ? 'क्या मुझे इंटरनेट कनेक्शन चाहिए?' : 'Do I need internet connection?',
      answer: language === 'hi'
        ? 'जी हां, FasalGuru के अधिकांश फीचर्स के लिए इंटरनेट कनेक्शन आवश्यक है। हालांकि, कुछ बुनियादी जानकारी ऑफलाइन भी उपलब्ध होती है।'
        : 'Yes, internet connection is required for most features of FasalGuru. However, some basic information is available offline as well.'
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'hi'
              ? 'FasalGuru के बारे में आपके सवालों के जवाब यहां हैं।'
              : 'Find answers to common questions about FasalGuru.'
            }
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;