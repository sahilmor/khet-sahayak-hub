// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sprout, Book, ShoppingCart, MessageCircle, Newspaper } from 'lucide-react';
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
import { Header } from './components/Header';
import Auth from './pages/Auth';
import Articles from './pages/Articles';
import ChatBot from './pages/ChatBot';
import LabBooking from './pages/LabBooking';
import Marketplace from './pages/Marketplace';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import { AuthProvider } from './context/Auth';

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
      <main className="min-h-screen bg-background pt-16">
        {children}
      </main>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/articles" element={<Layout><Articles /></Layout>} />
          <Route path="/lab-booking" element={<Layout><LabBooking /></Layout>} />
          <Route path="/marketplace" element={<Layout><Marketplace /></Layout>} />
          <Route path="/chatbot" element={<Layout><ChatBot /></Layout>} />
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;