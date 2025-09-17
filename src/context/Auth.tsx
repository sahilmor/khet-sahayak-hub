import { supabase } from '@/lib/supabase';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
// import { supabase } from '@/lib/supabase'; // Uncomment this line after setting up Supabase

interface AuthContextType {
  user: { name: string, avatar: string, email: string} | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Replace with a real user object from Supabase session
  const [user, setUser] = useState<{ name: string, avatar: string, email: string } | null>(null);

  // Example: Fetching the current user session
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser({
          name: session.user.user_metadata.full_name || 'User',
          avatar: session.user.user_metadata.full_name?.charAt(0) || 'U',
          email: session.user.user_metadata.email || ''
        });
      } else {
        setUser(null);
      }
    };
    fetchSession();
  }, []);

  const login = () => {
    // This is a demo. In a real app, you would fetch user data from Supabase.
    setUser({ name: 'Sahil', avatar: 'SM', email: ''});
    // This is where you would handle Supabase login logic
  };

  const logout = async () => {
    // This is a demo. In a real app, you would call supabase.auth.signOut().
    // await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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