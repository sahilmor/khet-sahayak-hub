import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '@/store/language';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={cn("gap-2", className)}
      aria-label="Toggle language between English and Hindi"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
    </Button>
  );
}