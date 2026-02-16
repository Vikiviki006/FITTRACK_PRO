import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/gym';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'member') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_USERS = {
  admin: { email: 'admin@gym.com', password: 'admin123' },
  member: { email: 'member@gym.com', password: 'member123' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'admin' | 'member'): boolean => {
    const demoUser = DEMO_USERS[role];
    if (email === demoUser.email && password === demoUser.password) {
      setUser({
        id: role === 'admin' ? 'admin-1' : 'member-1',
        email,
        role,
        memberId: role === 'member' ? 'MEM-001' : undefined,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
