import { supabase } from '@/integrations/supabase/client';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: { name: string, avatar: string, email: string, role?: string } | null;
  session: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string, avatar: string, email: string, role?: string } | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      
      if (session) {
        // Defer profile fetching to avoid blocking auth state
        setTimeout(async () => {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role, full_name')
              .eq('user_id', session.user.id)
              .maybeSingle();

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
          } catch (error) {
            console.error('Error fetching profile:', error);
            // Set user with basic info if profile fetch fails
            setUser({
              name: session.user.user_metadata.full_name || 'User',
              avatar: (session.user.user_metadata.full_name)?.charAt(0) || 'U',
              email: session.user.email || '',
              role: session.user.user_metadata.role
            });
          }
        }, 0);
      } else {
        setUser(null);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Let the auth state change handler deal with user setup
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, logout }}>
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