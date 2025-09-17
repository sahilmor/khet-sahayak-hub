import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { QuickActionCard } from '@/components/QuickActionCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageCircle, 
  TestTube, 
  ShoppingCart, 
  Bug, 
  Droplets, 
  MapPin,
  TrendingUp,
  Mic
} from 'lucide-react';
import heroImage from '@/assets/hero-farming.jpg';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const quickActions = [
    {
      icon: Bug,
      title: "Pest Help",
      titleHindi: "कीट सहायता",
      description: "Identify and treat crop pests quickly",
      descriptionHindi: "फसल के कीटों को जल्दी पहचानें और उनका इलाज करें"
    },
    {
      icon: TestTube,
      title: "Soil Tests",
      titleHindi: "मिट्टी परीक्षण",
      description: "Book lab tests for your soil health",
      descriptionHindi: "अपनी मिट्टी के स्वास्थ्य के लिए लैब टेस्ट बुक करें"
    },
    {
      icon: MapPin,
      title: "Nearby Labs",
      titleHindi: "नजदीकी लैब",
      description: "Find testing facilities near you",
      descriptionHindi: "अपने पास के परीक्षण केंद्र खोजें"
    },
    {
      icon: TrendingUp,
      title: "Market Requests",
      titleHindi: "बाजार मांग",
      description: "See what buyers want to purchase",
      descriptionHindi: "देखें कि खरीदार क्या खरीदना चाहते हैं"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Header onLanguageChange={setLanguage} language={language} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Indian farmers working in green fields with traditional tools"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/30" />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {language === 'hi' 
                ? 'FasalGuru — आपकी फसल के लिए सहायता, जब आपको जरूरत हो'
                : 'FasalGuru — Help for your crops, right when you need it'
              }
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {language === 'hi'
                ? 'व्यावहारिक सलाह, लैब टेस्ट, और बाजार से जुड़ाव - सब कुछ एक ही जगह।'
                : 'Practical guidance, lab testing, and market connections - all in one place.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="lg" className="gap-3">
                <Link to="/chat">
                  <MessageCircle className="h-5 w-5" />
                  {language === 'hi' ? 'FasalGuru से पूछें' : 'Ask FasalGuru'}
                </Link>
              </Button>
              
              <Button asChild variant="accent" size="lg" className="gap-3">
                <Link to="/lab-booking">
                  <TestTube className="h-5 w-5" />
                  {language === 'hi' ? 'लैब टेस्ट बुक करें' : 'Book Lab Test'}
                </Link>
              </Button>
              
              <Button asChild variant="secondary" size="lg" className="gap-3">
                <Link to="/marketplace">
                  <ShoppingCart className="h-5 w-5" />
                  {language === 'hi' ? 'फसल बेचें' : 'List Crop'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Assistant Card */}
      <section className="container mx-auto px-4 py-8">
        <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-accent/20">
                <Mic className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {language === 'hi' ? 'बोलकर पूछें' : 'Ask by Voice'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'हिंदी या अंग्रेजी में अपनी समस्या बताएं'
                    : 'Tell us your problem in Hindi or English'
                  }
                </p>
              </div>
            </div>
            <Button variant="accent" size="sm">
              {language === 'hi' ? 'शुरू करें' : 'Start'}
            </Button>
          </div>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {language === 'hi' ? 'तुरंत सहायता' : 'Quick Help'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'hi'
              ? 'अपनी जरूरत के अनुसार सेवा चुनें और तुरंत शुरुआत करें।'
              : 'Choose the service you need and get started immediately.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              {...action}
              language={language}
            />
          ))}
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="p-4 rounded-full bg-success/10 inline-block mb-4">
              <Droplets className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              {language === 'hi' ? 'सटीक सलाह' : 'Expert Guidance'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'hi'
                ? 'विशेषज्ञों की जांची गई जानकारी और व्यावहारिक समाधान।'
                : 'Verified expert information and practical solutions for your crops.'
              }
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-4 rounded-full bg-primary/10 inline-block mb-4">
              <TestTube className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              {language === 'hi' ? 'आसान टेस्टिंग' : 'Easy Testing'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'hi'
                ? 'नजदीकी लैब में मिट्टी और फसल का परीक्षण बुक करें।'
                : 'Book soil and crop testing at nearby certified laboratories.'
              }
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="p-4 rounded-full bg-accent/10 inline-block mb-4">
              <ShoppingCart className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              {language === 'hi' ? 'बेहतर कमाई' : 'Better Earnings'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'hi'
                ? 'होटल और रेस्टोरेंट को सीधे अपनी फसल बेचें।'
                : 'Sell your produce directly to hotels and restaurants.'
              }
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
