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
      console.log('Auth state changed:', event, session?.user?.id);
      setSession(session);
      
      if (session) {
        // Defer profile fetching to avoid blocking auth state
        setTimeout(async () => {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role, full_name, email')
              .eq('user_id', session.user.id)
              .maybeSingle();

            console.log('Profile fetch result:', profile, profileError);

            const userRole = profile?.role || 'farmer';
            const userName = profile?.full_name || session.user.user_metadata.full_name || session.user.user_metadata.name || 'User';

            setUser({
              name: userName,
              avatar: userName.charAt(0) || 'U',
              email: session.user.email || '',
              role: userRole
            });

            // Only redirect if we're on auth pages
            if (window.location.pathname === '/login' || window.location.pathname === '/auth') {
              setTimeout(() => {
                if (userRole === 'laboratory') {
                  window.location.href = '/lab-dashboard';
                } else {
                  window.location.href = '/';
                }
              }, 100);
            }

          } catch (error) {
            console.error('Error in auth state handler:', error);
            // Set user with basic info if profile operations fail
            setUser({
              name: session.user.user_metadata.full_name || session.user.user_metadata.name || 'User',
              avatar: (session.user.user_metadata.full_name || session.user.user_metadata.name || 'U').charAt(0),
              email: session.user.email || '',
              role: 'farmer'
            });
          }
        }, 100);
      } else {
        setUser(null);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
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