import { Home, Package, MapPin, Wallet, Gift, Search, Truck, BarChart3, Users } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  // Navigation items for different roles
  const customerNavItems = [
    { path: "/", icon: Home, label: t("nav.home") },
    { path: "/create-order", icon: Package, label: t("nav.createOrder") },
    { path: "/track", icon: MapPin, label: t("nav.track") },
    { path: "/cod", icon: Wallet, label: t("nav.cod") },
    { path: "/promotions", icon: Gift, label: t("nav.promotions") },
  ];

  const driverNavItems = [
    { path: "/driver", icon: Truck, label: t("nav.driver") },
    { path: "/driver/history", icon: Package, label: t("nav.track") },
    { path: "/driver/earnings", icon: Wallet, label: t("nav.cod") },
    { path: "/lookup", icon: Search, label: t("nav.lookup") },
  ];

  const adminNavItems = [
    { path: "/admin", icon: BarChart3, label: t("nav.home") },
    { path: "/admin/orders", icon: Package, label: "Orders" },
    { path: "/admin/drivers", icon: Truck, label: "Drivers" },
    { path: "/admin/customers", icon: Users, label: "Customers" },
    { path: "/lookup", icon: Search, label: t("nav.lookup") },
  ];

  // Select nav items based on user role
  let navItems = customerNavItems;
  if (user?.role === "driver") {
    navItems = driverNavItems;
  } else if (user?.role === "admin") {
    navItems = adminNavItems;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-red-600" : "text-gray-600 hover:text-red-500"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}