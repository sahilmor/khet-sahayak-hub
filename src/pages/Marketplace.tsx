import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  MapPin, 
  Calendar, 
  IndianRupee,
  Star,
  Filter,
  Truck,
  ShoppingCart
} from 'lucide-react';

interface Listing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerNameHindi: string;
  cropType: string;
  cropTypeHindi: string;
  quantity: number;
  unit: string;
  unitHindi: string;
  price: number;
  priceType: 'fixed' | 'negotiable';
  harvestDate: string;
  location: string;
  locationHindi: string;
  images: string[];
  rating: number;
  verified: boolean;
  description: string;
  descriptionHindi: string;
}

const Marketplace = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [userType, setUserType] = useState<'farmer' | 'buyer'>('buyer');

  const listings: Listing[] = [
    {
      id: '1',
      farmerId: 'farmer1',
      farmerName: 'Rajesh Kumar',
      farmerNameHindi: 'राजेश कुमार',
      cropType: 'Organic Tomatoes',
      cropTypeHindi: 'जैविक टमाटर',
      quantity: 500,
      unit: 'kg',
      unitHindi: 'किलो',
      price: 25,
      priceType: 'fixed',
      harvestDate: '2024-03-15',
      location: 'Pune, Maharashtra',
      locationHindi: 'पुणे, महाराष्ट्र',
      images: ['/placeholder-tomato.jpg'],
      rating: 4.8,
      verified: true,
      description: 'Fresh organic tomatoes, pesticide-free, ready for harvest',
      descriptionHindi: 'ताजे जैविक टमाटर, कीटनाशक मुक्त, कटाई के लिए तैयार'
    },
    {
      id: '2',
      farmerId: 'farmer2',
      farmerName: 'Priya Patel',
      farmerNameHindi: 'प्रिया पटेल',
      cropType: 'Fresh Spinach',
      cropTypeHindi: 'ताजा पालक',
      quantity: 100,
      unit: 'kg',
      unitHindi: 'किलो',
      price: 15,
      priceType: 'negotiable',
      harvestDate: '2024-03-20',
      location: 'Ahmedabad, Gujarat',
      locationHindi: 'अहमदाबाद, गुजरात',
      images: ['/placeholder-spinach.jpg'],
      rating: 4.6,
      verified: true,
      description: 'Tender fresh spinach leaves, grown without chemicals',
      descriptionHindi: 'कोमल ताजी पालक की पत्तियां, रसायन रहित उगाई गई'
    }
  ];

  const cropCategories = [
    { name: 'Vegetables', nameHindi: 'सब्जियां' },
    { name: 'Fruits', nameHindi: 'फल' },
    { name: 'Grains', nameHindi: 'अनाज' },
    { name: 'Herbs', nameHindi: 'जड़ी-बूटी' }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {language === 'hi' ? 'फसल बाजार' : 'Crop Marketplace'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'hi'
                ? 'सीधे किसानों से ताजी फसल खरीदें या अपनी फसल बेचें'
                : 'Buy fresh produce directly from farmers or sell your crops'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={userType === 'buyer' ? 'default' : 'outline'}
              onClick={() => setUserType('buyer')}
              size="sm"
            >
              {language === 'hi' ? 'खरीदार' : 'Buyer'}
            </Button>
            <Button
              variant={userType === 'farmer' ? 'default' : 'outline'}
              onClick={() => setUserType('farmer')}
              size="sm"
            >
              {language === 'hi' ? 'किसान' : 'Farmer'}
            </Button>
          </div>
        </div>

        {/* Add Listing Button for Farmers */}
        {userType === 'farmer' && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {language === 'hi' ? 'अपनी फसल बेचें' : 'Sell Your Produce'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi'
                    ? 'होटल और रेस्टोरेंट को सीधे अपनी फसल बेचकर बेहतर दाम पाएं'
                    : 'Get better prices by selling directly to hotels and restaurants'
                  }
                </p>
              </div>
              <Button variant="hero" className="gap-2">
                <Plus className="h-4 w-4" />
                {language === 'hi' ? 'लिस्टिंग जोड़ें' : 'Add Listing'}
              </Button>
            </div>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'hi' ? 'फसल खोजें...' : 'Search crops...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            {language === 'hi' ? 'श्रेणियां' : 'Categories'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {cropCategories.map((category, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 p-3 text-sm"
              >
                {language === 'hi' ? category.nameHindi : category.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-card transition-all cursor-pointer">
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {language === 'hi' ? listing.cropTypeHindi : listing.cropType}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="h-6 w-6 bg-primary/10">
                        <span className="text-xs text-primary">
                          {listing.farmerName.charAt(0)}
                        </span>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {language === 'hi' ? listing.farmerNameHindi : listing.farmerName}
                      </span>
                      {listing.verified && (
                        <Badge variant="secondary" className="text-xs px-1">
                          ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-warning text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{listing.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {language === 'hi' ? listing.descriptionHindi : listing.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {language === 'hi' ? 'मात्रा:' : 'Quantity:'}
                    </span>
                    <span className="font-medium text-foreground">
                      {listing.quantity} {language === 'hi' ? listing.unitHindi : listing.unit}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {language === 'hi' ? 'स्थान:' : 'Location:'}
                    </span>
                    <span className="text-foreground text-xs flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {language === 'hi' ? listing.locationHindi : listing.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {language === 'hi' ? 'कटाई:' : 'Harvest:'}
                    </span>
                    <span className="text-foreground text-xs flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(listing.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold text-primary">
                      {listing.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{language === 'hi' ? listing.unitHindi : listing.unit}
                    </span>
                    {listing.priceType === 'negotiable' && (
                      <Badge variant="outline" className="text-xs ml-2">
                        {language === 'hi' ? 'मोल-भाव' : 'Negotiable'}
                      </Badge>
                    )}
                  </div>
                  
                  {userType === 'buyer' && (
                    <Button size="sm" className="gap-1">
                      <Truck className="h-3 w-3" />
                      {language === 'hi' ? 'ऑर्डर करें' : 'Order'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for Farmers */}
        {userType === 'farmer' && listings.length === 0 && (
          <Card className="p-12 text-center">
            <div className="p-4 rounded-full bg-muted/20 inline-block mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === 'hi' ? 'कोई लिस्टिंग नहीं' : 'No Listings Yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'hi'
                ? 'अपनी पहली फसल लिस्ट करें और बेहतर दाम पाएं'
                : 'List your first crop and get better prices'
              }
            </p>
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              {language === 'hi' ? 'पहली लिस्टिंग जोड़ें' : 'Add First Listing'}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Marketplace;