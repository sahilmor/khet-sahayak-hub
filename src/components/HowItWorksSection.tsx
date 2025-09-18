import { Smartphone, MessageSquare, Lightbulb, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguageStore } from '@/store/language';

const HowItWorksSection = () => {
  const { language } = useLanguageStore();
  
  const steps = [
    {
      icon: Smartphone,
      title: language === 'hi' ? 'ऐप डाउनलोड करें' : 'Download the App',
      description: language === 'hi' ? 'FasalGuru ऐप को डाउनलोड करें और अपना अकाउंट बनाएं।' : 'Download FasalGuru app and create your account.',
      step: '01'
    },
    {
      icon: MessageSquare,
      title: language === 'hi' ? 'समस्या बताएं' : 'Share Your Problem',
      description: language === 'hi' ? 'अपनी फसल की समस्या को AI असिस्टेंट के साथ साझा करें।' : 'Share your crop problem with our AI assistant.',
      step: '02'
    },
    {
      icon: Lightbulb,
      title: language === 'hi' ? 'समाधान पाएं' : 'Get Solutions',
      description: language === 'hi' ? 'तुरंत विशेषज्ञों द्वारा सुझाए गए समाधान प्राप्त करें।' : 'Get instant expert-recommended solutions.',
      step: '03'
    },
    {
      icon: TrendingUp,
      title: language === 'hi' ? 'बेहतर फसल' : 'Better Harvest',
      description: language === 'hi' ? 'अपनी फसल की उत्पादकता और गुणवत्ता में सुधार देखें।' : 'See improvement in crop productivity and quality.',
      step: '04'
    }
  ];

  return (
    <div className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {language === 'hi' ? 'यह कैसे काम करता है?' : 'How It Works?'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'hi' 
              ? 'सिर्फ 4 आसान चरणों में अपनी खेती को बेहतर बनाएं।'
              : 'Transform your farming in just 4 simple steps.'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0 bg-card/80 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;