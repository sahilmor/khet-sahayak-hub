import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  TestTube, 
  Upload,
  CheckCircle,
  IndianRupee
} from 'lucide-react';

interface Lab {
  id: string;
  name: string;
  nameHindi: string;
  distance: string;
  rating: number;
  services: string[];
  servicesHindi: string[];
  price: number;
  openTime: string;
  closeTime: string;
  availableSlots: string[];
  phone: string;
}

const LabBooking = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingStep, setBookingStep] = useState<'labs' | 'booking' | 'confirmation'>('labs');
  const [formData, setFormData] = useState({
    cropType: '',
    fieldSize: '',
    symptoms: '',
    paymentMethod: 'online'
  });

  const labs: Lab[] = [
    {
      id: '1',
      name: 'AgriTest Solutions',
      nameHindi: 'कृषि परीक्षण समाधान',
      distance: '2.5 km',
      rating: 4.8,
      services: ['Soil Testing', 'Water Analysis', 'Seed Quality'],
      servicesHindi: ['मिट्टी परीक्षण', 'पानी विश्लेषण', 'बीज गुणवत्ता'],
      price: 250,
      openTime: '9:00 AM',
      closeTime: '6:00 PM',
      availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Rural Diagnostics Lab',
      nameHindi: 'ग्रामीण निदान प्रयोगशाला',
      distance: '5.1 km',
      rating: 4.6,
      services: ['Soil Testing', 'Plant Disease', 'Nutrient Analysis'],
      servicesHindi: ['मिट्टी परीक्षण', 'पौधे की बीमारी', 'पोषक तत्व विश्लेषण'],
      price: 180,
      openTime: '8:00 AM',
      closeTime: '5:00 PM',
      availableSlots: ['9:00 AM', '11:00 AM', '3:00 PM'],
      phone: '+91 87654 32109'
    }
  ];

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
    setBookingStep('booking');
  };

  const handleBookingSubmit = () => {
    if (!selectedSlot || !formData.cropType) return;
    setBookingStep('confirmation');
  };

  if (bookingStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-background pt-16">
        
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="p-4 rounded-full bg-success/10 inline-block mb-4">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {language === 'hi' ? 'बुकिंग सफल!' : 'Booking Successful!'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'hi' 
                  ? 'आपकी बुकिंग सफल हुई। पुष्टि संदेश भेज दिया गया है।'
                  : 'Your booking has been confirmed. Confirmation message has been sent.'
                }
              </p>
            </div>

            <Card className="p-4 text-left mb-6">
              <h3 className="font-semibold mb-3 text-foreground">
                {language === 'hi' ? 'बुकिंग विवरण' : 'Booking Details'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'hi' ? 'लैब:' : 'Lab:'}
                  </span>
                  <span className="text-foreground">
                    {language === 'hi' ? selectedLab?.nameHindi : selectedLab?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'hi' ? 'दिनांक:' : 'Date:'}
                  </span>
                  <span className="text-foreground">
                    {selectedDate?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'hi' ? 'समय:' : 'Time:'}
                  </span>
                  <span className="text-foreground">{selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'hi' ? 'फसल:' : 'Crop:'}
                  </span>
                  <span className="text-foreground">{formData.cropType}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button variant="hero" size="lg" className="w-full">
                {language === 'hi' ? 'व्हाट्सऐप पर अपडेट पाएं' : 'Get Updates on WhatsApp'}
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                {language === 'hi' ? 'नई बुकिंग करें' : 'Book Another Test'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (bookingStep === 'booking' && selectedLab) {
    return (
      <div className="min-h-screen bg-background pt-16">
        
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => setBookingStep('labs')}
            className="mb-6"
          >
            ← {language === 'hi' ? 'वापस जाएं' : 'Back to Labs'}
          </Button>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">
              {language === 'hi' ? 'बुकिंग विवरण' : 'Booking Details'}
            </h2>

            {/* Lab Info */}
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-foreground">
                {language === 'hi' ? selectedLab.nameHindi : selectedLab.name}
              </h3>
              <p className="text-sm text-muted-foreground">{selectedLab.distance} away</p>
            </div>

            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <Label className="text-base font-medium">
                  {language === 'hi' ? 'दिनांक चुनें' : 'Select Date'}
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border mt-2"
                />
              </div>

              {/* Time Slots */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  {language === 'hi' ? 'समय चुनें' : 'Select Time Slot'}
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedLab.availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedSlot === slot ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSlot(slot)}
                      className="text-sm"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sample Details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cropType" className="text-base font-medium">
                    {language === 'hi' ? 'फसल का प्रकार *' : 'Crop Type *'}
                  </Label>
                  <Input
                    id="cropType"
                    value={formData.cropType}
                    onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                    placeholder={language === 'hi' ? 'जैसे: गेहूं, चावल, कपास' : 'e.g. Wheat, Rice, Cotton'}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="fieldSize" className="text-base font-medium">
                    {language === 'hi' ? 'खेत का आकार' : 'Field Size'}
                  </Label>
                  <Input
                    id="fieldSize"
                    value={formData.fieldSize}
                    onChange={(e) => setFormData({...formData, fieldSize: e.target.value})}
                    placeholder={language === 'hi' ? 'एकड़ में' : 'In acres'}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="symptoms" className="text-base font-medium">
                    {language === 'hi' ? 'समस्या का विवरण' : 'Problem Description'}
                  </Label>
                  <Textarea
                    id="symptoms"
                    value={formData.symptoms}
                    onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                    placeholder={language === 'hi' 
                      ? 'अपनी फसल की समस्या का वर्णन करें...' 
                      : 'Describe the issue with your crop...'}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-2 block">
                    {language === 'hi' ? 'तस्वीर अपलोड करें (वैकल्पिक)' : 'Upload Photo (Optional)'}
                  </Label>
                  <Button variant="outline" className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    {language === 'hi' ? 'तस्वीर चुनें' : 'Choose Photo'}
                  </Button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  {language === 'hi' ? 'भुगतान विधि' : 'Payment Method'}
                </Label>
                <div className="space-y-2">
                  <Button
                    variant={formData.paymentMethod === 'online' ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFormData({...formData, paymentMethod: 'online'})}
                  >
                    <IndianRupee className="h-4 w-4 mr-2" />
                    {language === 'hi' ? 'ऑनलाइन भुगतान' : 'Pay Online'} - ₹{selectedLab.price}
                  </Button>
                  <Button
                    variant={formData.paymentMethod === 'cash' ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                  >
                    {language === 'hi' ? 'लैब पर नकद भुगतान' : 'Pay Cash at Lab'} - ₹{selectedLab.price}
                  </Button>
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleBookingSubmit}
                disabled={!selectedSlot || !formData.cropType}
              >
                {language === 'hi' ? 'बुकिंग पूरी करें' : 'Complete Booking'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {language === 'hi' ? 'लैब टेस्ट बुक करें' : 'Book Lab Test'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'hi' 
              ? 'अपने नजदीकी प्रमाणित प्रयोगशाला में मिट्टी और फसल का परीक्षण कराएं।'
              : 'Book soil and crop testing at nearby certified laboratories.'
            }
          </p>
        </div>

        <div className="grid gap-6">
          {labs.map((lab) => (
            <Card key={lab.id} className="p-6 hover:shadow-card transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {language === 'hi' ? lab.nameHindi : lab.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{lab.distance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-warning" />
                      <span>{lab.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{lab.openTime} - {lab.closeTime}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1"
                >
                  <Phone className="h-4 w-4" />
                  {language === 'hi' ? 'कॉल' : 'Call'}
                </Button>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">
                  {language === 'hi' ? 'उपलब्ध सेवाएं:' : 'Available Services:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(language === 'hi' ? lab.servicesHindi : lab.services).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">
                    ₹{lab.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'से शुरू' : 'onwards'}
                  </span>
                </div>
                <Button 
                  variant="default"
                  onClick={() => handleLabSelect(lab)}
                >
                  {language === 'hi' ? 'बुक करें' : 'Book Now'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabBooking;