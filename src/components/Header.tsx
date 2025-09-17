// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { Sprout, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

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
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  onLanguageChange?: (lang: 'en' | 'hi') => void;
  language?: 'en' | 'hi';
  navLinks: { to: string; text: string; icon: any }[];
}

export function Header({ onLanguageChange, language = 'en', navLinks }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
    isScrolled
      ? "bg-background/80 backdrop-blur-sm border-b border-border/50"
      : "bg-transparent border-b-0"
  );

  return (
    <header className={headerClasses}>
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