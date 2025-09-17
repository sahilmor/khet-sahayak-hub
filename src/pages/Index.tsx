// src/pages/Index.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, MessageCircle, Newspaper, ShoppingCart, ArrowRight, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuickActionCard } from '@/components/QuickActionCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const services = [
    {
      icon: MessageCircle,
      title: "AI Assistant",
      titleHindi: "एआई सहायक",
      description: "Get instant advice on your crop problems from our smart AI chatbot.",
      descriptionHindi: "हमारे स्मार्ट एआई चैटबॉट से अपनी फसल की समस्याओं पर तुरंत सलाह लें।",
      link: "/chatbot"
    },
    {
      icon: Newspaper,
      title: "Farming Guidance",
      titleHindi: "कृषि मार्गदर्शन",
      description: "Read expert articles on pest control, soil health, and best farming practices.",
      descriptionHindi: "कीट नियंत्रण, मिट्टी के स्वास्थ्य और खेती के सर्वोत्तम तरीकों पर विशेषज्ञों के लेख पढ़ें।",
      link: "/articles"
    },
    {
      icon: Book,
      title: "Book Lab Test",
      titleHindi: "लैब टेस्ट बुक करें",
      description: "Easily book soil and water tests at certified labs near you.",
      descriptionHindi: "अपने पास की प्रमाणित प्रयोगशालाओं में आसानी से मिट्टी और पानी का परीक्षण बुक करें।",
      link: "/lab-booking"
    },
    {
      icon: ShoppingCart,
      title: "Crop Marketplace",
      titleHindi: "फसल बाजार",
      description: "Sell your produce directly to buyers and get better prices.",
      descriptionHindi: "अपनी फसल सीधे खरीदारों को बेचें और बेहतर दाम पाएं।",
      link: "/marketplace"
    }
  ];

  const testimonial = {
    quote: "FasalGuru has been a game-changer for me. I can now solve my crop issues instantly with the AI assistant and get better prices for my harvest on the marketplace.",
    quoteHindi: "फसल गुरु ने मेरे लिए सब कुछ बदल दिया है। मैं अब एआई सहायक से अपनी फसल की समस्याओं को तुरंत हल कर पाता हूं और बाजार में अपनी फसल के लिए बेहतर दाम भी पाता हूं।",
    name: "Rajesh Sharma",
    nameHindi: "राजेश शर्मा",
    location: "Gohana, Haryana",
    avatar: "/rajesh-sharma-avatar.jpg" // Placeholder for avatar
  };

  const footerLinks = [
    { to: '/', text: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home' },
    { to: '/articles', text: language === 'hi' ? 'कृषि मार्गदर्शन' : 'Articles' },
    { to: '/lab-booking', text: language === 'hi' ? 'लैब टेस्ट' : 'Lab Test' },
    { to: '/marketplace', text: language === 'hi' ? 'फसल बाजार' : 'Marketplace' },
    { to: '/chatbot', text: language === 'hi' ? 'एआई सहायक' : 'AI Assistant' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden min-h-screen flex items-center">
        {/* Replace the src with a local image path like /hero-background.jpg */}
        <img
          src="https://i.pinimg.com/1200x/d3/64/91/d36491a34ee31579c229ba444bdf5c27.jpg"
          alt="An Indian farmer in a field of crops"
          className="absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-warm opacity-80" />
        <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 items-center gap-12 py-24 md:py-0">
          {/* Left Column: Headline and CTA */}
          <div>
            <Badge variant="secondary" className="mb-4">
              {language === 'hi' ? 'स्मार्ट कृषि तकनीक' : 'Sustainable Farming Tech'}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance mb-4">
              {language === 'hi' ? 'आपकी कृषि यात्रा में नवाचार लाते हुए' : 'Bringing Innovation to Your Farming Journey'}
            </h1>
            <p className="text-lg leading-8 text-muted-foreground max-w-xl mb-8">
              {language === 'hi'
                ? 'सटीक कृषि से लेकर टिकाऊ तरीकों तक, हम आपको अधिक कुशलता और लाभ के साथ खेती करने में मदद करते हैं।'
                : 'From precision agriculture to sustainable practices, we help you grow more efficiently and profitably.'}
            </p>
            <Link to="/chatbot">
              <Button size="lg" variant="hero" className="shadow-elevated">
                {language === 'hi' ? 'एआई सहायक से बात करें' : 'Chat with AI Assistant'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Right Column: Mission Block */}
          <div className="relative md:flex md:justify-end">
            <Card className="p-6 md:p-8 max-w-sm w-full bg-card/70 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Sprout className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">
                  {language === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'hi'
                  ? 'हम किसानों को अभिनव उपकरणों और प्रौद्योगिकी के साथ सशक्त बनाने के लिए हैं जो उत्पादकता, स्थिरता और दक्षता को बढ़ाते हैं, खेती के भविष्य को आकार देते हैं।'
                  : 'We aim to empower farmers with innovative tools and technology that enhance productivity, sustainability, and efficiency, shaping the future of farming.'}
              </p>
              <Link to="/articles" className="mt-4 text-primary text-sm font-semibold flex items-center gap-1 hover:underline transition-colors">
                {language === 'hi' ? 'और जानें' : 'Learn More'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Problem & Solution Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {language === 'hi' ? 'किसानों के लिए बनाया गया' : 'Built for Farmers'}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {language === 'hi'
                ? 'भारतीय कृषि की जटिलताओं को समझते हुए, हमने एक ऐसा मंच बनाया है जो हर किसान को सशक्त बनाता है। अपनी फसल को कीटों से बचाएं, मिट्टी के स्वास्थ्य की जांच करें, और सही दाम पर बेचें, यह सब एक ही जगह पर।'
                : 'Understanding the complexities of Indian agriculture, we have built a platform that empowers every farmer. Protect your crops from pests, check soil health, and sell at fair prices, all in one place.'}
            </p>
            <Link to="/articles" className="mt-6 inline-block">
              <Button variant="outline" className="gap-2">
                {language === 'hi' ? 'और जानें' : 'Learn More'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-card">
            <AspectRatio ratio={16 / 9}>
              {/* Placeholder for a relevant farming image */}
              <img src="/app-screenshot.png" alt="FasalGuru app interface on a mobile device" className="object-cover w-full h-full" />
            </AspectRatio>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {language === 'hi' ? 'हमारी सेवाएं' : 'Our Services'}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {language === 'hi' ? 'आपकी हर समस्या का समाधान, एक ही जगह पर।' : 'Solutions for every challenge, all in one place.'}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Link to={service.link} key={index}>
                <QuickActionCard
                  icon={service.icon}
                  title={service.title}
                  titleHindi={service.titleHindi}
                  description={service.description}
                  descriptionHindi={service.descriptionHindi}
                  language={language}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12 shadow-card bg-card">
            <p className="text-xl italic text-muted-foreground max-w-2xl mx-auto">
              "{language === 'hi' ? testimonial.quoteHindi : testimonial.quote}"
            </p>
            <div className="mt-6 flex flex-col items-center justify-center">
              {/* Placeholder for testimonial avatar */}
              <Avatar className="h-16 w-16 mb-2">
                {/* <AvatarImage src={testimonial.avatar} alt={testimonial.name} /> */}
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {testimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-foreground">{language === 'hi' ? testimonial.nameHindi : testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Final Call to Action Section */}
      <div className="container mx-auto px-4 pb-16 lg:pb-24">
        <Card className="p-8 md:p-12 text-center bg-primary text-primary-foreground shadow-elevated">
          <h2 className="text-3xl font-bold tracking-tight">
            {language === 'hi' ? 'आज ही शुरुआत करें!' : 'Start Your Journey Today!'}
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
            {language === 'hi' ? 'स्मार्ट खेती की दुनिया में कदम रखें और अपनी फसल को नई ऊंचाइयों पर ले जाएं।' : 'Step into the world of smart farming and take your harvest to the next level.'}
          </p>
          <div className="mt-8">
            <Link to="/chatbot">
              <Button size="xl" variant="accent" className="font-semibold">
                {language === 'hi' ? 'फसल गुरु से जुड़ें' : 'Join FasalGuru'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="w-full bg-card border-t border-border/50 py-8">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">FasalGuru</h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            {language === 'hi' ? 'आपकी फसल के लिए सहायता, जब आपको जरूरत हो।' : 'Help for your crops, right when you need it.'}
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {link.text}
              </Link>
            ))}
          </div>

          <div className="w-full border-t border-border/50 pt-6 mt-6">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} FasalGuru. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;