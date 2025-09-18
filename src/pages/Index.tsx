// src/pages/Index.tsx
import { Link } from 'react-router-dom';
import { Book, MessageCircle, Newspaper, ShoppingCart, ArrowRight, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuickActionCard } from '@/components/QuickActionCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { useLanguageStore } from '@/store/language';
import { translations } from '@/translations';

const Index = () => {
  const { language } = useLanguageStore();
  const t = translations.homepage;
  
  // Refactor services to pass bilingual text objects
  const services = [
    {
      icon: MessageCircle,
      title: t.services.aiAssistant.title,
      description: t.services.aiAssistant.description,
      link: "/chatbot"
    },
    {
      icon: Newspaper,
      title: t.services.farmingGuidance.title,
      description: t.services.farmingGuidance.description,
      link: "/articles"
    },
    {
      icon: Book,
      title: t.services.labTest.title,
      description: t.services.labTest.description,
      link: "/lab-booking"
    },
    {
      icon: ShoppingCart,
      title: t.services.marketplace.title,
      description: t.services.marketplace.description,
      link: "/marketplace"
    }
  ];

  const testimonial = {
    quote: t.testimonial.quote,
    name: t.testimonial.name,
    location: t.testimonial.location[language],
    avatar: "/rajesh-sharma-avatar.jpg" // Placeholder for avatar
  };

  const footerLinks = [
    { to: '/', text: translations.header.home[language] },
    { to: '/articles', text: translations.header.articles[language] },
    { to: '/lab-booking', text: translations.header.labTest[language] },
    { to: '/marketplace', text: translations.header.marketplace[language] },
    { to: '/chatbot', text: translations.header.aiAssistant[language] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden min-h-screen flex items-center">
        {/* Hero Background Image */}
        <img
          src="/hero-farming.jpg"
          alt="Indian farmer working in lush green fields during golden hour"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        <div className="container mx-auto px-4 z-10 grid lg:grid-cols-5 items-center gap-16 py-32 min-h-screen">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-3 text-white">
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              {t.mission.label[language]}
            </Badge>
            
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance mb-8 leading-[1.1]">
              Bringing Innovation to{' '}
              <span className="text-accent">Your Farming Journey</span>
            </h1>
            
            <p className="text-xl leading-relaxed text-white/90 max-w-2xl mb-12">
              {t.hero.description[language]}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/chatbot">
                <Button size="lg" variant="hero" className="text-lg px-8 py-4 h-auto font-semibold">
                  {t.hero.cta[language]}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/articles">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right Column: Mission Card */}
          <div className="lg:col-span-2 relative flex justify-center lg:justify-end">
            <Card className="p-8 max-w-sm w-full bg-white/95 backdrop-blur-sm shadow-hero border-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Sprout className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {t.mission.title[language]}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.mission.description[language]}
              </p>
              <Link to="/articles" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200">
                {t.mission.learnMore[language]}
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
              {t.mission.title[language]}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.mission.description[language]}
            </p>
            <Link to="/articles" className="mt-6 inline-block">
              <Button variant="outline" className="gap-2">
                {t.mission.learnMore[language]}
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
              {t.services.title[language]}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.services.description[language]}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Link to={service.link} key={index}>
                <QuickActionCard
                  icon={service.icon}
                  title={service.title[language]}
                  titleHindi={service.title.hi}
                  description={service.description[language]}
                  descriptionHindi={service.description.hi}
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
              "{testimonial.quote[language]}"
            </p>
            <div className="mt-6 flex flex-col items-center justify-center">
              <Avatar className="h-16 w-16 mb-2">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {testimonial.name[language].charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-foreground">{testimonial.name[language]}</p>
              <p className="text-sm text-muted-foreground">{testimonial.location}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Final Call to Action Section */}
      <div className="container mx-auto px-4 pb-16 lg:pb-24">
        <Card className="p-8 md:p-12 text-center bg-primary text-primary-foreground shadow-elevated">
          <h2 className="text-3xl font-bold tracking-tight">
            {t.finalCta.title[language]}
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
            {t.finalCta.description[language]}
          </p>
          <div className="mt-8">
            <Link to="/chatbot">
              <Button size="xl" variant="accent" className="font-semibold">
                {t.finalCta.cta[language]}
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
            {translations.homepage.footer.tagline[language]}
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
              © {new Date().getFullYear()} FasalGuru. {translations.homepage.footer.copyright[language]}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;