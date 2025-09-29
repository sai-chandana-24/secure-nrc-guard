import React, { createContext, useContext, useState, useEffect } from 'react';

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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    
    // Mock authentication - replace with real authentication logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users for different roles
    const mockUsers: { [key: string]: User } = {
      'admin@chhattisgarh.gov.in': {
        id: '1',
        name: 'Dr. Rajesh Kumar Sharma',
        email: 'admin@chhattisgarh.gov.in',
        role: 'admin',
        department: 'State NRC Administration',
        designation: 'State Program Director',
        profilePhoto: '/src/assets/admin-profile.jpg',
        phone: '+91-9876543210',
        district: 'Raipur',
        permissions: ['all'],
        lastLogin: '2024-01-19 09:30:00',
        isActive: true,
        avatar: '/src/assets/admin-profile.jpg',
        location: 'Raipur, Chhattisgarh'
      },
      'district@chhattisgarh.gov.in': {
        id: '2',
        name: 'Mrs. Sunita Verma',
        email: 'district@chhattisgarh.gov.in',
        role: 'district',
        department: 'District Health Office',
        designation: 'District Officer',
        profilePhoto: '/src/assets/admin-profile.jpg',
        phone: '+91-9876543211',
        district: 'Raipur',
        permissions: ['district_management'],
        lastLogin: '2024-01-19 08:15:00',
        isActive: true,
        location: 'Raipur District'
      },
      'block@chhattisgarh.gov.in': {
        id: '3',
        name: 'Mr. Prakash Singh',
        email: 'block@chhattisgarh.gov.in',
        role: 'block',
        department: 'Block Development Office',
        designation: 'Block Officer',
        profilePhoto: '/src/assets/admin-profile.jpg',
        phone: '+91-9876543212',
        district: 'Raipur',
        permissions: ['block_management'],
        lastLogin: '2024-01-19 07:45:00',
        isActive: true,
        location: 'Raipur Block'
      },
      'supervisor@chhattisgarh.gov.in': {
        id: '4',
        name: 'Mrs. Meera Patel',
        email: 'supervisor@chhattisgarh.gov.in',
        role: 'supervisor',
        department: 'Field Supervision',
        designation: 'Supervisor',
        profilePhoto: '/src/assets/admin-profile.jpg',
        phone: '+91-9876543213',
        district: 'Raipur',
        permissions: ['supervisor_access'],
        lastLogin: '2024-01-19 06:30:00',
        isActive: true,
        location: 'Raipur Block'
      },
      'teacher@chhattisgarh.gov.in': {
        id: '5',
        name: 'Ms. Kamala Bai',
        email: 'teacher@chhattisgarh.gov.in',
        role: 'teacher',
        department: 'Anganwadi Center',
        designation: 'Anganwadi Teacher',
        profilePhoto: '/src/assets/admin-profile.jpg',
        phone: '+91-9876543214',
        district: 'Raipur',
        permissions: ['data_entry'],
        lastLogin: '2024-01-19 05:15:00',
        isActive: true,
        location: 'AWC Raipur-001'
      },
      'nrc@chhattisgarh.gov.in': {
        id: '6',
        name: 'Dr. Ravi Kumar',
        email: 'nrc@chhattisgarh.gov.in',
        role: 'nrc',
        department: 'NRC Medical Team',
        designation: 'NRC Medical Officer',
        profilePhoto: '/src/assets/admin-profile.jpg',
        phone: '+91-9876543215',
        district: 'Raipur',
        permissions: ['nrc_management'],
        lastLogin: '2024-01-19 04:00:00',
        isActive: true,
        location: 'NRC Raipur'
      },
      'public@example.com': {
        id: '7',
        name: 'General Public',
        email: 'public@example.com',
        role: 'public',
        department: 'Public Access',
        designation: 'Citizen',
        profilePhoto: '/src/assets/admin-profile.jpg',
        phone: '+91-9876543216',
        district: 'Chhattisgarh',
        permissions: ['public_view'],
        lastLogin: '2024-01-19 03:30:00',
        isActive: true,
        location: 'Chhattisgarh'
      }
    };
    
    const user = mockUsers[email];
    if (user && password === 'admin123') {
      setUser(user);
      localStorage.setItem('nrc_user', JSON.stringify(user));
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