import { supabase } from '@/lib/supabase';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: { name: string, avatar: string, email: string, role?: string } | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string, avatar: string, email: string, role?: string } | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Fetch user profile to get role information  
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('user_id', session.user.id)
            .single();

          setUser({
            name: profile?.full_name || session.user.user_metadata.full_name || 'User',
            avatar: (profile?.full_name || session.user.user_metadata.full_name)?.charAt(0) || 'U',
            email: session.user.email || '',
            role: profile?.role || session.user.user_metadata.role
          });

          // Redirect based on role
          if (profile?.role === 'laboratory') {
            window.location.href = '/lab-dashboard';
          } else if (profile?.role === 'farmer') {
            window.location.href = '/';
          }
        }, 0);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};