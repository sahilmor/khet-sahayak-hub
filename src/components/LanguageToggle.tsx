import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

type Language = 'en' | 'hi';

interface LanguageToggleProps {
  onLanguageChange?: (lang: Language) => void;
  className?: string;
}

export function LanguageToggle({ onLanguageChange, className = "" }: LanguageToggleProps) {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const handleToggle = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    setCurrentLang(newLang);
    onLanguageChange?.(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className={`gap-2 ${className}`}
      aria-label="Toggle language between English and Hindi"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {currentLang === 'en' ? 'हिंदी' : 'English'}
      </span>
    </Button>
  );
}