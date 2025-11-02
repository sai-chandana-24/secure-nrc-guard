import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance'; // Adjust path if needed

// User interface remains the same, it's a good data structure
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
  // 3. REMOVED Supabase-specific session
  // session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // 4. REMOVED session state
  // const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 5. REPLACED auth listener with a "check auth status" on load
  useEffect(() => {
    // This function runs once on app load to check if a token exists
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Your axios interceptor automatically adds the token to this request
          // This endpoint should return the user object if the token is valid
          const response = await axiosInstance.get('/auth/me');
          
          // Assuming your backend returns { user: User }
          setUser(response.data.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token'); // Token is invalid or expired
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
    // The empty dependency array ensures this runs only once on mount
  }, []);

  // 6. REMOVED fetchUserProfile, as login/auth check now handle this
  // const fetchUserProfile = async (userId: string) => { ... }

  // 7. REPLACED login logic to use Axios
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // This now hits your backend at /api/auth/login
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      // Assuming your backend returns { user: User, token: string }
      const { user, token } = response.data;

      // Store the token for the interceptor to use
      localStorage.setItem('token', token);
      
      // Set the user in context
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 8. REPLACED signup logic to use Axios
  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // This hits your backend at /api/auth/signup
      await axiosInstance.post('/auth/register', {
        email,
        password,
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: error.response?.data?.message || 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // 9. REPLACED logout logic
  const logout = async () => {
    // Notify backend (fire-and-forget)
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Backend logout failed:', error);
    }
    
    // Clear local state and token
    localStorage.removeItem('token');
    setUser(null);
  };

  // 10. REPLACED updateProfile logic to use Axios
  const updateProfile = async (userData: Partial<User>) => {
    if (user) {
      try {
        // This hits your backend at /api/profile (or similar)
        const response = await axiosInstance.patch('/profile', userData);
        
        // Assuming backend returns the updated user object
        setUser(response.data.user);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const value = {
    user,
    // 11. REMOVED session from context value
    // session,
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

// useAuth hook remains the same
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}