import { LanguageToggle } from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Sprout, Menu } from 'lucide-react';

interface HeaderProps {
  onLanguageChange?: (lang: 'en' | 'hi') => void;
  language?: 'en' | 'hi';
}

export function Header({ onLanguageChange, language = 'en' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              FasalGuru
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageToggle 
            onLanguageChange={onLanguageChange}
            className="hidden sm:flex"
          />
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}