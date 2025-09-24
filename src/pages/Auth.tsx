// src/pages/Auth.tsx
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { supabase } from '@/lib/supabase';
import Login from '@/hero-farming.jpg'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [village, setVillage] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect away from auth page if already signed in
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phoneNumber,
              village,
              city,
            },
          },
        });
        if (error) throw error;
        setMessage(language === 'hi' ? 'साइन अप सफल! कृपया अपने ईमेल की पुष्टि करें।' : 'Signup successful! Please check your email to confirm.');
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Optional social login handlers (stubbed). Wire real providers as needed.
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      setLoading(true);
      setError('');
      await supabase.auth.signInWithOAuth({ provider });
      // Supabase will redirect for OAuth by default (if configured).
    } catch (err: any) {
      setError(err?.message || 'Social login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-50 via-white to-gray-100 p-6">
      {/* Back button */}
      <button
        aria-label={language === 'hi' ? 'वापस जाएं' : 'Go back'}
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 rounded-md p-2 hover:bg-gray-100 text-gray-700"
        title={language === 'hi' ? 'वापस जाएं' : 'Go back'}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Card */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-white flex flex-col md:flex-row">
        {/* Image panel */}
        <div
          className={`hidden md:block md:w-1/2 lg:w-2/3 bg-cover bg-center relative`}
          style={{
            backgroundImage: Login,
            order: isLogin ? 2 : 1,
          }}
        >
          {/* Outer rounded white border "card" effect (like design) */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-bl-3xl rounded-br-3xl" />
          {/* optional subtle overlay content (map pins/labels) could go here */}
        </div>

        {/* Form panel */}
        <div
          className="w-full md:w-1/2 lg:w-1/3 px-8 py-10 sm:px-10 sm:py-12 flex flex-col justify-center"
          style={{ order: isLogin ? 1 : 2 }}
        >
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold">
              {isLogin ? (language === 'hi' ? 'लॉग इन करें' : 'Start your perfect trip') : (language === 'hi' ? 'साइन अप करें' : 'Sign Up')}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isLogin
                ? (language === 'hi' ? 'आगे बढ़ने के लिए लॉग इन करें।' : 'Login to continue to your account.')
                : (language === 'hi' ? 'एक नया खाता बनाने के लिए साइन अप करें।' : 'Create a new account to get started.')}
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="flex items-center justify-center h-10 w-10 rounded-full border hover:shadow-sm"
              title="Sign in with Apple"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16.365 1.43c0 1.02-.39 2.043-1.05 2.8-.68.78-1.82 1.61-2.9 1.34-.14-.04-.29-.08-.42-.12-.38-.11-.98-.12-1.36 0-.13.04-.27.08-.42.12-1.08.27-2.22-.56-2.9-1.34C6.02 3.473 5.63 2.45 5.63 1.43 5.63.63 6.07 0 6.88 0c.7 0 1.5.34 2.2.34.03 0 .06 0 .09-.01.62-.04 1.27-.34 1.9-.34.82 0 1.26.63 1.26 1.43zM12 6.5c-2.91 0-4.9 2.15-4.9 5.2 0 2.03 1.01 4.06 2.81 5.37 1.2.9 2.7 1.53 4.09 1.53s2.9-.63 4.09-1.53c1.8-1.31 2.81-3.34 2.81-5.37C16.9 8.65 14.91 6.5 12 6.5z"/></svg>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center h-10 w-10 rounded-full border hover:shadow-sm"
              title="Sign in with Google"
            >
              <svg width="16" height="16" viewBox="0 0 533.5 544.3" aria-hidden>
                <path d="M533.5 278.4c0-17.4-1.6-34.2-4.7-50.4H272v95.4h146.9c-6.4 34.5-25.8 63.9-55.1 83.5v69.5h88.9c52-48 82.8-118.4 82.8-198z" fill="#4285f4"/>
                <path d="M272 544.3c74.1 0 136.3-24.6 181.7-66.8l-88.9-69.5c-24.7 16.6-56.6 26.4-92.8 26.4-71.4 0-132-48.2-153.6-113.1H28.6v70.9C74.2 482.9 167.1 544.3 272 544.3z" fill="#34a853"/>
                <path d="M118.4 325.3c-5.6-16.6-8.8-34.3-8.8-52.3s3.2-35.8 8.8-52.3V150h-89.4C11.6 201.4 0 240.6 0 272.9s11.6 71.5 29 122.9l89.4-70.5z" fill="#fbbc04"/>
                <path d="M272 107.1c39 0 74 13.4 101.6 39.5l76.2-76.2C407.9 24.6 345.7 0 272 0 167.1 0 74.2 61.4 28.6 150l89.4 70.9C140 155.3 200.6 107.1 272 107.1z" fill="#ea4335"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center justify-center h-10 w-10 rounded-full border hover:shadow-sm"
              title="Sign in with Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.4c0-2.2 1.3-3.4 3.3-3.4.96 0 1.97.17 1.97.17v2.2h-1.12c-1.1 0-1.45.69-1.45 1.4v1.68h2.47l-.39 2.9h-2.08v7A10 10 0 0022 12z"/></svg>
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground mb-4">or</p>

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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="village">{language === 'hi' ? 'गांव' : 'Village'}</Label>
                    <Input
                      id="village"
                      type="text"
                      placeholder={language === 'hi' ? 'गांव का नाम' : 'Village'}
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
                      placeholder={language === 'hi' ? 'शहर का नाम' : 'City'}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
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

            <div className="relative">
              <Label htmlFor="password">{language === 'hi' ? 'पासवर्ड' : 'Password'}</Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />}
              {isLogin ? (language === 'hi' ? 'लॉग इन करें' : 'Login') : (language === 'hi' ? 'साइन अप करें' : 'Sign Up')}
            </Button>
          </form>

          {message && <p className="mt-4 text-sm text-center text-green-600">{message}</p>}
          {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? (language === 'hi' ? 'अकाउंट नहीं है?' : "Don't have an account?") : (language === 'hi' ? 'पहले से ही अकाउंट है?' : 'Already have an account?')}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-sm font-medium underline underline-offset-2"
            >
              {isLogin ? (language === 'hi' ? 'साइन अप करें' : 'Sign Up') : (language === 'hi' ? 'लॉग इन करें' : 'Login')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;