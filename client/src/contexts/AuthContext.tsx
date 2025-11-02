import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance'; // Adjust path if needed

// User interface (no change)
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
  isAuthenticated: boolean;
  // [STEP 1] Make sure you updated the return type here
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect for checkAuthStatus (no change)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axiosInstance.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // [STEP 2] Use this updated login function
  const login = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    let userToReturn: User | null = null; // Define variable here

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
      
      userToReturn = user; // Set variable on success
    } catch (error) {
      console.error('Login error:', error);
      userToReturn = null; // Set variable on failure
    } finally {
      setIsLoading(false);
    }

    return userToReturn; // Single return statement at the end
  };

  // 8. REPLACED signup logic to use Axios (no change)
  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
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

  // 9. REPLACED logout logic (no change)
  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Backend logout failed:', error);
    }
    
    localStorage.removeItem('token');
    setUser(null);
  };

  // 10. REPLACED updateProfile logic to use Axios (no change)
  const updateProfile = async (userData: Partial<User>) => {
    if (user) {
      try {
        const response = await axiosInstance.patch('/profile', userData);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const value = {
    user,
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

// useAuth hook remains the same (no change)
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}