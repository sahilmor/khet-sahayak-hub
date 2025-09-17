import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Menu, Settings, UserCircle, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LanguageToggle } from './LanguageToggle';
import { useAuth } from '@/context/Auth';

interface HeaderProps {
  onLanguageChange?: (lang: 'en' | 'hi') => void;
  language?: 'en' | 'hi';
  navLinks: { to: string; text: string; icon: any }[];
}

export function Header({ onLanguageChange, language = 'en', navLinks }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
    isScrolled
      ? "bg-background/80 backdrop-blur-sm border-b border-border/50"
      : "bg-transparent border-b-0"
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderAuthSection = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="custom" className="relative h-9 rounded-full px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm mr-2">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground pt-1">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>{language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{language === 'hi' ? 'सेटिंग्स' : 'Settings'}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{language === 'hi' ? 'लॉग आउट' : 'Log out'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <Link to="/login">
          <Button variant="default" className="hidden sm:flex">
            {language === 'hi' ? 'लॉग इन' : 'Login'}
          </Button>
        </Link>
      );
    }
  };

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              FasalGuru
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageToggle onLanguageChange={onLanguageChange} className="hidden sm:flex" />
          
          {renderAuthSection()}
          
          {/* Mobile Drawer */}
          <Drawer direction="right" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 rounded-t-none h-full w-2/3 right-0 left-auto top-0">
              <DrawerHeader className="text-left">
                <DrawerTitle>FasalGuru</DrawerTitle>
                <DrawerDescription>{language === 'hi' ? 'आपका कृषि सहायक' : 'Your Farming Assistant'}</DrawerDescription>
              </DrawerHeader>
              <nav className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <DrawerClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "w-full justify-start gap-3")}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-semibold">{link.text}</span>
                    </Link>
                  </DrawerClose>
                ))}
                {!user && (
                    <DrawerClose asChild>
                      <Link
                        to="/login"
                        className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full justify-start gap-3")}
                      >
                        <span className="font-semibold">{language === 'hi' ? 'लॉग इन' : 'Login'}</span>
                      </Link>
                    </DrawerClose>
                )}
              </nav>
              <div className="p-4 border-t">
                <LanguageToggle onLanguageChange={onLanguageChange} className="w-full" />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}