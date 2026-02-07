import { Bell, Menu, User, LogOut } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack = false }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button className="p-1 hover:bg-red-500 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          ) : (
            <Menu className="w-6 h-6" />
          )}
          <h1 className="text-lg">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {user ? (
            <>
              <button className="p-2 hover:bg-red-500 rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="text-right mr-2">
                  <p className="text-xs text-red-100">{user.name}</p>
                  <p className="text-[10px] text-red-200">
                    {user.role === "driver" 
                      ? (language === "vi" ? "Tài xế" : "Driver")
                      : user.role === "admin"
                      ? (language === "vi" ? "Quản trị" : "Admin")
                      : (language === "vi" ? "Khách hàng" : "Customer")
                    }
                  </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-500 rounded-full"
                  title={language === "vi" ? "Đăng xuất" : "Logout"}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <button 
              onClick={handleLogin}
              className="px-3 py-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition text-white text-sm"
            >
              {language === "vi" ? "Đăng nhập" : "Login"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}