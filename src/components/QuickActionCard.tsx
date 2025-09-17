import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  onClick?: () => void;
  className?: string;
  language?: 'en' | 'hi';
}

export function QuickActionCard({
  icon: Icon,
  title,
  titleHindi,
  description,
  descriptionHindi,
  onClick,
  className = "",
  language = 'en'
}: QuickActionCardProps) {
  const currentTitle = language === 'hi' ? titleHindi : title;
  const currentDescription = language === 'hi' ? descriptionHindi : description;

  return (
    <Card className={`p-6 cursor-pointer transition-all hover:shadow-card hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm ${className}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-base mb-2 text-foreground">
            {currentTitle}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {currentDescription}
          </p>
          <Button 
            variant="default" 
            size="sm" 
            onClick={onClick}
            className="w-full"
          >
            {language === 'hi' ? 'शुरू करें' : 'Get Started'}
          </Button>
        </div>
      </div>
    </Card>
  );
}