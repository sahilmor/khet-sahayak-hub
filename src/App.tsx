// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Sprout, Menu, Book, ShoppingCart, MessageCircle, Newspaper } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { LanguageToggle } from './components/LanguageToggle';

import Articles from './pages/Articles';
import ChatBot from './pages/ChatBot';
import LabBooking from './pages/LabBooking';
import Marketplace from './pages/Marketplace';
import NotFound from './pages/NotFound';
import Index from './pages/Index';

// This is a placeholder component for the main layout.
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const navLinks = [
    { to: '/', text: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', icon: Sprout },
    { to: '/articles', text: language === 'hi' ? 'कृषि मार्गदर्शन' : 'Articles', icon: Newspaper },
    { to: '/lab-booking', text: language === 'hi' ? 'लैब टेस्ट' : 'Lab Test', icon: Book },
    { to: '/marketplace', text: language === 'hi' ? 'फसल बाजार' : 'Marketplace', icon: ShoppingCart },
    { to: '/chatbot', text: language === 'hi' ? 'एआई सहायक' : 'AI Assistant', icon: MessageCircle },
  ];

  const onLanguageChange = (lang: 'en' | 'hi') => {
    setLanguage(lang);
  };

  return (
    <>
      <Header onLanguageChange={onLanguageChange} language={language} navLinks={navLinks} />
      <main className="min-h-screen bg-background">
        {children}
      </main>
    </>
  );
};

// This is the Header component with navigation links.
function Header({ onLanguageChange, language = 'en', navLinks }: { onLanguageChange?: (lang: 'en' | 'hi') => void; language?: 'en' | 'hi'; navLinks: { to: string; text: string; icon: any }[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              FasalGuru
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageToggle onLanguageChange={onLanguageChange} className="hidden sm:flex" />
          
          {/* Mobile Drawer */}
          <Drawer direction="right" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 rounded-t-none h-full w-2/3 right-0 left-auto top-0">
              <DrawerHeader className="text-left">
                <DrawerTitle>FasalGuru</DrawerTitle>
                <DrawerDescription>{language === 'hi' ? 'आपका कृषि सहायक' : 'Your Farming Assistant'}</DrawerDescription>
              </DrawerHeader>
              <nav className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <DrawerClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full justify-start gap-3")}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-semibold">{link.text}</span>
                    </Link>
                  </DrawerClose>
                ))}
              </nav>
              <div className="p-4 border-t">
                <LanguageToggle onLanguageChange={onLanguageChange} className="w-full" />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/articles" element={<Layout><Articles /></Layout>} />
        <Route path="/lab-booking" element={<Layout><LabBooking /></Layout>} />
        <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
        <Route path="/chatbot" element={<Layout><ChatBot /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;