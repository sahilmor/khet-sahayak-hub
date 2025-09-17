import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Clock, 
  Volume2, 
  ThumbsUp, 
  Bug, 
  Droplets, 
  Sprout, 
  Sun,
  Mic
} from 'lucide-react';

const Articles = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { icon: Bug, name: 'Pests', nameHindi: 'कीट', color: 'bg-destructive/10 text-destructive' },
    { icon: Droplets, name: 'Soil', nameHindi: 'मिट्टी', color: 'bg-primary/10 text-primary' },
    { icon: Sprout, name: 'Seeds', nameHindi: 'बीज', color: 'bg-success/10 text-success' },
    { icon: Sun, name: 'Weather', nameHindi: 'मौसम', color: 'bg-warning/10 text-warning' }
  ];

  const articles = [
    {
      id: 1,
      title: "Cotton Bollworm Management",
      titleHindi: "कपास के बॉलवर्म का प्रबंधन",
      category: "Pests",
      categoryHindi: "कीट",
      readTime: "5 min",
      readTimeHindi: "5 मिनट",
      summary: "Learn effective methods to identify and control cotton bollworm infestations.",
      summaryHindi: "कपास में बॉलवर्म की पहचान और नियंत्रण के प्रभावी तरीके सीखें।",
      author: "Dr. Priya Sharma",
      likes: 124
    },
    {
      id: 2,
      title: "Soil pH Testing at Home",
      titleHindi: "घर पर मिट्टी का pH परीक्षण",
      category: "Soil",
      categoryHindi: "मिट्टी",
      readTime: "3 min",
      readTimeHindi: "3 मिनट",
      summary: "Simple methods to test your soil pH using household items.",
      summaryHindi: "घरेलू सामान का उपयोग करके मिट्टी का pH टेस्ट करने के आसान तरीके।",
      author: "Rakesh Kumar",
      likes: 89
    },
    {
      id: 3,
      title: "Monsoon Seed Selection",
      titleHindi: "मानसून के लिए बीज चयन",
      category: "Seeds",
      categoryHindi: "बीज",
      readTime: "7 min",
      readTimeHindi: "7 मिनट",
      summary: "Choose the right seeds for monsoon planting to maximize your harvest.",
      summaryHindi: "अधिकतम फसल के लिए मानसून की बुवाई हेतु सही बीज चुनें।",
      author: "Anjali Patel",
      likes: 156
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onLanguageChange={setLanguage} language={language} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {language === 'hi' ? 'कृषि मार्गदर्शन' : 'Farming Guidance'}
          </h1>
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'hi' ? 'खोजें...' : 'Search articles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Mic className="h-4 w-4" />
              <span className="sr-only">Voice search</span>
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            {language === 'hi' ? 'श्रेणियां' : 'Categories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="p-4 cursor-pointer hover:shadow-card transition-all">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-foreground">
                    {language === 'hi' ? category.nameHindi : category.name}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'hi' ? 'नवीनतम लेख' : 'Latest Articles'}
          </h2>
          
          {articles.map((article) => (
            <Card key={article.id} className="p-6 hover:shadow-card transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="secondary" className="text-xs">
                  {language === 'hi' ? article.categoryHindi : article.category}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{language === 'hi' ? article.readTimeHindi : article.readTime}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {language === 'hi' ? article.titleHindi : article.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {language === 'hi' ? article.summaryHindi : article.summary}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {language === 'hi' ? 'लेखक:' : 'By'} {article.author}
                </span>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm">{article.likes}</span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Volume2 className="h-4 w-4" />
                    {language === 'hi' ? 'सुनें' : 'Listen'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;