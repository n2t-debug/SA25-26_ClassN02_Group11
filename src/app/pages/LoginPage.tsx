import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Truck, 
  Shield, 
  User,
  AlertCircle,
  ArrowLeft
} from "lucide-react";

type UserRole = "customer" | "driver" | "admin";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { t, language } = useLanguage();
  
  const defaultRole = (searchParams.get("role") as UserRole) || "customer";
  
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    {
      id: "customer" as UserRole,
      name: language === "vi" ? "Khách hàng" : "Customer",
      icon: User,
      color: "green",
      description: language === "vi" ? "Gửi hàng" : "Send Packages"
    },
    {
      id: "driver" as UserRole,
      name: language === "vi" ? "Tài xế" : "Driver",
      icon: Truck,
      color: "blue",
      description: language === "vi" ? "Lấy và giao hàng" : "Pickup & Delivery"
    },
    {
      id: "admin" as UserRole,
      name: language === "vi" ? "Quản trị" : "Admin",
      icon: Shield,
      color: "purple",
      description: language === "vi" ? "Quản lý hệ thống" : "System Management"
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password, selectedRole);
      
      if (success) {
        // Redirect based on role
        if (selectedRole === "driver") {
          navigate("/driver");
        } else if (selectedRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(
          language === "vi"
            ? "Email hoặc mật khẩu không chính xác"
            : "Invalid email or password"
        );
      }
    } catch (err) {
      setError(
        language === "vi"
          ? "Có lỗi xảy ra, vui lòng thử lại"
          : "An error occurred, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const getDemoCredentials = () => {
    switch (selectedRole) {
      case "driver":
        return {
          email: "driver@viettelpost.vn",
          password: "driver123"
        };
      case "admin":
        return {
          email: "admin@viettelpost.vn",
          password: "admin123"
        };
      case "customer":
        return {
          email: "customer@example.com",
          password: "customer123"
        };
    }
  };

  const fillDemoCredentials = () => {
    const creds = getDemoCredentials();
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="text-white mb-6 flex items-center gap-2 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">
            {language === "vi" ? "Quay lại trang chủ" : "Back to Home"}
          </span>
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl font-bold text-red-600">QS</span>
          </div>
          <h1 className="text-2xl text-white mb-2">Quickship - Logistics</h1>
          <p className="text-red-100 text-sm">
            {language === "vi" 
              ? "Đăng nhập để tiếp tục"
              : "Login to continue"
            }
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-sm text-gray-700 mb-3 block">
              {language === "vi" ? "Chọn vai trò" : "Select Role"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? `border-${role.color}-600 bg-${role.color}-50`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-1 ${
                      isSelected ? `text-${role.color}-600` : "text-gray-400"
                    }`} />
                    <p className={`text-xs ${
                      isSelected ? `text-${role.color}-700` : "text-gray-600"
                    }`}>
                      {role.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === "vi" ? "Nhập email" : "Enter email"}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">
                {language === "vi" ? "Mật khẩu" : "Password"}
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === "vi" ? "Nhập mật khẩu" : "Enter password"}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {language === "vi" ? "Đang đăng nhập..." : "Logging in..."}
                </>
              ) : (
                language === "vi" ? "Đăng nhập" : "Login"
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={fillDemoCredentials}
              className="w-full text-sm text-gray-600 hover:text-gray-800 mb-2"
            >
              {language === "vi" 
                ? "📝 Sử dụng tài khoản demo"
                : "📝 Use demo account"
              }
            </button>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
              <p className="mb-1">
                <strong>{language === "vi" ? "Tài khoản demo:" : "Demo credentials:"}</strong>
              </p>
              <p>Email: {getDemoCredentials().email}</p>
              <p>Password: {getDemoCredentials().password}</p>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="block text-sm text-red-600 hover:text-red-700">
              {language === "vi" ? "Quên mật khẩu?" : "Forgot password?"}
            </a>
            <p className="text-xs text-gray-500">
              {language === "vi"
                ? "Chưa có tài khoản?"
                : "Don't have an account?"
              }{" "}
              <a href="#" className="text-red-600 hover:text-red-700">
                {language === "vi" ? "Đăng ký ngay" : "Sign up"}
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-red-100 text-xs mt-6">
          {language === "vi"
            ? "© 2026 Quickship - Logistics. Bảo lưu mọi quyền."
            : "© 2026 Quickship - Logistics. All rights reserved."
          }
        </p>
      </div>
    </div>
  );
}