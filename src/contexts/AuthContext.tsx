import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'district' | 'block' | 'supervisor' | 'teacher' | 'nrc' | 'public';
  department: string;
  designation: string;
  profilePhoto: string;
  phone: string;
  district?: string;
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
  avatar?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Defer fetching profile to avoid blocking
          setTimeout(async () => {
            await fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      // Fetch roles
      const { data: userRoles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      const role = userRoles?.[0]?.role || 'public';

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.full_name,
          email: profile.email,
          role: role as any,
          department: profile.department || 'NRC Department',
          designation: profile.designation || 'Government Official',
          profilePhoto: '/src/assets/admin-profile.jpg',
          phone: profile.phone || '',
          district: profile.district,
          permissions: [role],
          lastLogin: new Date().toISOString(),
          isActive: true,
          location: profile.district || 'Chhattisgarh'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Demo-mode login: bypass backend for known demo accounts
      const demoUsers: Record<string, { full_name: string; role: User['role']; designation: string; department: string; district?: string }> = {
        'admin@chhattisgarh.gov.in': { full_name: 'Administrator', role: 'admin', designation: 'Administrator', department: 'NRC HQ' },
        'district@chhattisgarh.gov.in': { full_name: 'District Officer', role: 'district', designation: 'District Officer', department: 'District Administration' },
        'block@chhattisgarh.gov.in': { full_name: 'Block Officer', role: 'block', designation: 'Block Officer', department: 'Block Administration' },
        'supervisor@chhattisgarh.gov.in': { full_name: 'Field Supervisor', role: 'supervisor', designation: 'Supervisor', department: 'Field Operations' },
        'teacher@chhattisgarh.gov.in': { full_name: 'Teacher', role: 'teacher', designation: 'Teacher', department: 'Education' },
        'nrc@chhattisgarh.gov.in': { full_name: 'NRC Officer', role: 'nrc', designation: 'NRC Officer', department: 'NRC Center' },
        'public@example.com': { full_name: 'Public User', role: 'public', designation: 'Citizen', department: 'Public' },
      };

      const key = email.trim().toLowerCase();
      if (password === 'admin123' && demoUsers[key]) {
        const info = demoUsers[key];
        const demoUser: User = {
          id: `demo-${key}`,
          name: info.full_name,
          email: key,
          role: info.role,
          department: info.department,
          designation: info.designation,
          profilePhoto: '/src/assets/admin-profile.jpg',
          phone: '',
          district: info.district,
          permissions: [info.role],
          lastLogin: new Date().toISOString(),
          isActive: true,
          location: info.district || 'Chhattisgarh',
        };

        setUser(demoUser);
        setSession(null);
        return true;
      }

      // Fallback to real auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        await fetchUserProfile(data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            designation: 'Government Official',
            department: 'NRC Department'
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      if (data.user) {
        return { success: true };
      }
      
      return { success: false, error: 'Signup failed' };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: error.message || 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (user && session) {
      try {
        await supabase
          .from('profiles')
          .update({
            full_name: userData.name,
            phone: userData.phone,
            designation: userData.designation,
            department: userData.department,
            district: userData.district
          })
          .eq('id', user.id);
        
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}