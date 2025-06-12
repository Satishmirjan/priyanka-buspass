import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'user' | 'admin';
  age?: number;
  address?: string;
  mobile?: string;
  passType?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'user' | 'admin') => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userType: 'user' | 'admin'): Promise<boolean> => {
    // Demo login logic
    if (userType === 'admin' && email === 'admin@buspass.com' && password === 'admin123') {
      setUser({
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@buspass.com',
        userType: 'admin'
      });
      return true;
    } else if (userType === 'user' && email === 'user@demo.com' && password === 'user123') {
      setUser({
        id: 'user1',
        name: 'John Doe',
        email: 'user@demo.com',
        userType: 'user',
        age: 25,
        address: '123 Main St, City',
        mobile: '+1234567890',
        passType: 'Student'
      });
      return true;
    }
    return false;
  };

  const signup = async (userData: any): Promise<boolean> => {
    // Demo signup logic
    setUser({
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      userType: 'user',
      age: userData.age,
      address: userData.address,
      mobile: userData.mobile,
      passType: userData.passType
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};