import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'district' | 'block' | 'ngo' | 'monitor';
  department: string;
  designation: string;
  profilePhoto: string;
  phone: string;
  district?: string;
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user data
const mockAdminUser: User = {
  id: 'admin_001',
  name: 'Dr. Rajesh Kumar Sharma',
  email: 'admin.nrc@chhattisgarh.gov.in',
  role: 'admin',
  department: 'Women & Child Development',
  designation: 'Director - NRC Program',
  profilePhoto: '/src/assets/admin-profile.jpg',
  phone: '+91-9876543210',
  permissions: [
    'fund_allocation',
    'user_management', 
    'system_audit',
    'reports_analytics',
    'performance_monitoring',
    'alerts_management'
  ],
  lastLogin: new Date().toISOString(),
  isActive: true
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('nrc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app this would call your backend
    if (email === 'admin@chhattisgarh.gov.in' && password === 'admin123') {
      const updatedUser = {
        ...mockAdminUser,
        lastLogin: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('nrc_user', JSON.stringify(updatedUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nrc_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('nrc_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
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