import { Users, Award, Leaf, TrendingUp } from 'lucide-react';
import { useLanguageStore } from '@/store/language';

const StatsSection = () => {
  const { language } = useLanguageStore();
  
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: language === 'hi' ? 'खुश किसान' : 'Happy Farmers',
      description: language === 'hi' ? 'हमारे साथ जुड़े हुए' : 'Using our platform'
    },
    {
      icon: Leaf,
      number: "1M+",
      label: language === 'hi' ? 'फसल की समस्याएं हल' : 'Crop Issues Solved',
      description: language === 'hi' ? 'एआई सहायक द्वारा' : 'Through AI assistance'
    },
    {
      icon: Award,
      number: "98%",
      label: language === 'hi' ? 'सफलता दर' : 'Success Rate',
      description: language === 'hi' ? 'समस्या समाधान में' : 'In problem resolution'
    },
    {
      icon: TrendingUp,
      number: "30%",
      label: language === 'hi' ? 'आय वृद्धि' : 'Income Increase',
      description: language === 'hi' ? 'औसत किसान की' : 'Average farmer income'
    }
  ];

  return (
    <div className="bg-primary text-primary-foreground py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-1 opacity-90">{stat.label}</div>
              <div className="text-sm opacity-75">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;