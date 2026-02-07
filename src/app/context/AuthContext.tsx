import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserRole = "customer" | "driver" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS = {
  driver: {
    email: "driver@viettelpost.vn",
    password: "driver123",
    user: {
      id: "d1",
      name: "Nguyễn Văn Tài",
      email: "driver@viettelpost.vn",
      role: "driver" as UserRole,
      phone: "0912345678"
    }
  },
  admin: {
    email: "admin@viettelpost.vn",
    password: "admin123",
    user: {
      id: "a1",
      name: "Trần Thị Quản",
      email: "admin@viettelpost.vn",
      role: "admin" as UserRole,
      phone: "0987654321"
    }
  },
  customer: {
    email: "customer@example.com",
    password: "customer123",
    user: {
      id: "c1",
      name: "Lê Văn Khách",
      email: "customer@example.com",
      role: "customer" as UserRole,
      phone: "0901234567"
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("viettelpost_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("viettelpost_user");
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check credentials
    const mockUser = MOCK_USERS[role];
    if (mockUser && mockUser.email === email && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem("viettelpost_user", JSON.stringify(mockUser.user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("viettelpost_user");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
