import { 
  Brain, 
  Clock, 
  Shield, 
  Smartphone, 
  Users, 
  BarChart3,
  Leaf,
  Globe
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguageStore } from '@/store/language';

const FeaturesSection = () => {
  const { language } = useLanguageStore();
  
  const features = [
    {
      icon: Brain,
      title: language === 'hi' ? 'AI-आधारित समाधान' : 'AI-Powered Solutions',
      description: language === 'hi' 
        ? 'उन्नत कृत्रिम बुद्धिमत्ता से तुरंत और सटीक समाधान पाएं।' 
        : 'Get instant and accurate solutions powered by advanced artificial intelligence.'
    },
    {
      icon: Clock,
      title: language === 'hi' ? '24/7 सपोर्ट' : '24/7 Support',
      description: language === 'hi'
        ? 'दिन-रात किसी भी समय सहायता प्राप्त करें।'
        : 'Get help anytime, day or night, whenever you need it.'
    },
    {
      icon: Globe,
      title: language === 'hi' ? 'स्थानीय भाषा सपोर्ट' : 'Local Language Support',
      description: language === 'hi'
        ? 'हिंदी और अंग्रेजी दोनों भाषाओं में सेवा उपलब्ध।'
        : 'Available in both Hindi and English for your comfort.'
    },
    {
      icon: Smartphone,
      title: language === 'hi' ? 'मोबाइल फ्रेंडली' : 'Mobile Friendly',
      description: language === 'hi'
        ? 'किसी भी डिवाइस पर आसानी से उपयोग करें।'
        : 'Easy to use on any device, anywhere you are.'
    },
    {
      icon: Shield,
      title: language === 'hi' ? 'विश्वसनीय सलाह' : 'Trusted Advice',
      description: language === 'hi'
        ? 'कृषि विशेषज्ञों द्वारा सत्यापित जानकारी।'
        : 'Information verified by agricultural experts.'
    },
    {
      icon: BarChart3,
      title: language === 'hi' ? 'प्रगति ट्रैकिंग' : 'Progress Tracking',
      description: language === 'hi'
        ? 'अपनी खेती की प्रगति को ट्रैक करें और सुधार देखें।'
        : 'Track your farming progress and see improvements over time.'
    },
    {
      icon: Users,
      title: language === 'hi' ? 'किसान समुदाय' : 'Farmer Community',
      description: language === 'hi'
        ? 'हजारों किसानों के साथ जुड़ें और अनुभव साझा करें।'
        : 'Connect with thousands of farmers and share experiences.'
    },
    {
      icon: Leaf,
      title: language === 'hi' ? 'पर्यावरण अनुकूल' : 'Eco-Friendly',
      description: language === 'hi'
        ? 'प्राकृतिक और टिकाऊ कृषि पद्धतियों को बढ़ावा।'
        : 'Promoting natural and sustainable farming practices.'
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {language === 'hi' ? 'हमारी विशेषताएं' : 'Our Features'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'hi'
              ? 'FasalGuru आपको आधुनिक तकनीक और पारंपरिक ज्ञान का बेहतरीन मिश्रण प्रदान करता है।'
              : 'FasalGuru provides you with the perfect blend of modern technology and traditional knowledge.'
            }
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;