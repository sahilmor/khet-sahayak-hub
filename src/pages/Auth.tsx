// src/pages/Auth.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { supabase } from '@/lib/supabase';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [village, setVillage] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  useEffect(() => {
    // If the user is already logged in, redirect them away from the auth page
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // This is the page to which the user will be redirected.
    // It defaults to the home page if there's no `from` state.
    const from = location.state?.from?.pathname || '/';
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage(language === 'hi' ? 'लॉग इन सफल!' : 'Login successful!');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phoneNumber,
              village: village,
              city: city
            }
          }
        });
        if (error) throw error;
        setMessage(language === 'hi' ? 'साइन अप सफल! कृपया अपने ईमेल की पुष्टि करें।' : 'Signup successful! Please check your email to confirm.');
      }
      // Redirect to a dashboard or home page after success
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
    
    // Simulating API call for demonstration
    setTimeout(() => {
        setLoading(false);
        if (isLogin) {
          login(); // Simulate login and set user state
          setMessage(language === 'hi' ? 'डेमो: लॉग इन सफल!' : 'Demo: Login successful!');
          navigate(from, { replace: true }); // Redirect to the previous page
        } else {
          console.log('New User Details:', { fullName, phoneNumber, village, city });
          setMessage(language === 'hi' ? 'डेमो: साइन अप सफल!' : 'Demo: Signup successful!');
        }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        onClick={() => navigate(-1)}
        aria-label={language === 'hi' ? 'वापस जाएं' : 'Go back'}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {isLogin ? (language === 'hi' ? 'लॉग इन करें' : 'Login') : (language === 'hi' ? 'साइन अप करें' : 'Sign Up')}
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            {isLogin 
              ? (language === 'hi' ? 'आगे बढ़ने के लिए लॉग इन करें।' : 'Login to continue to your account.')
              : (language === 'hi' ? 'एक नया खाता बनाने के लिए साइन अप करें।' : 'Create a new account to get started.')
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="fullName">{language === 'hi' ? 'पूरा नाम' : 'Full Name'}</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">{language === 'hi' ? 'फ़ोन नंबर' : 'Phone Number'}</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder={language === 'hi' ? 'अपना फ़ोन नंबर दर्ज करें' : 'Enter your phone number'}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="village">{language === 'hi' ? 'गांव' : 'Village'}</Label>
                  <Input
                    id="village"
                    type="text"
                    placeholder={language === 'hi' ? 'अपने गांव का नाम दर्ज करें' : 'Enter your village name'}
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">{language === 'hi' ? 'शहर' : 'City'}</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder={language === 'hi' ? 'अपने शहर का नाम दर्ज करें' : 'Enter your city name'}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">{language === 'hi' ? 'ईमेल' : 'Email'}</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{language === 'hi' ? 'पासवर्ड' : 'Password'}</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? (language === 'hi' ? 'लॉग इन करें' : 'Login') : (language === 'hi' ? 'साइन अप करें' : 'Sign Up')}
            </Button>
          </form>
          
          {message && (
            <p className="mt-4 text-sm text-center font-medium text-success">
              {message}
            </p>
          )}

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin 
                ? (language === 'hi' ? 'अकाउंट नहीं है?' : 'Don\'t have an account?')
                : (language === 'hi' ? 'पहले से ही अकाउंट है?' : 'Already have an account?')
              }
            </span>
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="px-1"
            >
              {isLogin ? (language === 'hi' ? 'साइन अप करें' : 'Sign Up') : (language === 'hi' ? 'लॉग इन करें' : 'Login')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;