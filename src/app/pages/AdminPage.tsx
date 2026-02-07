import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import {
  BarChart3,
  Package,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export function AdminPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"overview" | "orders" | "drivers">("overview");

  // Check if user is logged in and is an admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?role=admin");
    } else if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  // If not authenticated or not an admin, show nothing while redirecting
  if (!isAuthenticated || !user || user.role !== "admin") {
    return null;
  }

  const stats = [
    {
      label: language === "vi" ? "Tổng đơn hàng" : "Total Orders",
      value: "1,247",
      change: "+12%",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: language === "vi" ? "Tài xế hoạt động" : "Active Drivers",
      value: "48",
      change: "+3",
      icon: Truck,
      color: "bg-green-100 text-green-600",
    },
    {
      label: language === "vi" ? "Khách hàng" : "Customers",
      value: "892",
      change: "+24",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: language === "vi" ? "Doanh thu" : "Revenue",
      value: "245M₫",
      change: "+18%",
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const recentOrders = [
    {
      id: "VTP123456789",
      customer: "Nguyễn Văn A",
      driver: "Trần Văn B",
      status: "delivering",
      statusText: language === "vi" ? "Đang giao" : "Delivering",
      time: "14:30",
    },
    {
      id: "VTP987654321",
      customer: "Trần Thị C",
      driver: "Lê Văn D",
      status: "delivered",
      statusText: language === "vi" ? "Đã giao" : "Delivered",
      time: "12:15",
    },
    {
      id: "VTP456789123",
      customer: "Phạm Văn E",
      driver: language === "vi" ? "Chưa gán" : "Unassigned",
      status: "pending",
      statusText: language === "vi" ? "Chờ lấy" : "Pending",
      time: "16:00",
    },
  ];

  const activeDrivers = [
    {
      name: "Nguyễn Văn Tài",
      phone: "0912345678",
      orders: 12,
      rating: 4.8,
      status: "active",
    },
    {
      name: "Trần Văn Minh",
      phone: "0987654321",
      orders: 8,
      rating: 4.9,
      status: "active",
    },
    {
      name: "Lê Thị Hương",
      phone: "0901234567",
      orders: 15,
      rating: 5.0,
      status: "active",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "delivering":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={language === "vi" ? "Quản trị hệ thống" : "Admin Dashboard"} />

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-30">
        <div className="flex max-w-screen-xl mx-auto">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "overview"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            {language === "vi" ? "Tổng quan" : "Overview"}
          </button>
          <button
            onClick={() => setSelectedTab("orders")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "orders"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            {language === "vi" ? "Đơn hàng" : "Orders"}
          </button>
          <button
            onClick={() => setSelectedTab("drivers")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "drivers"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            {language === "vi" ? "Tài xế" : "Drivers"}
          </button>
        </div>
      </div>

      {selectedTab === "overview" && (
        <div className="px-4 py-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                {language === "vi" ? "Hiệu suất tuần này" : "This Week Performance"}
              </h3>
              <span className="text-xs text-green-600">
                +25% {language === "vi" ? "so với tuần trước" : "vs last week"}
              </span>
            </div>
            <div className="space-y-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                const percentage = [65, 78, 85, 72, 90, 68, 45][index];
                return (
                  <div key={day}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">{day}</span>
                      <span className="text-xs text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition text-sm">
              {language === "vi" ? "📊 Xuất báo cáo" : "📊 Export Report"}
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition text-sm">
              {language === "vi" ? "⚙️ Cài đặt" : "⚙️ Settings"}
            </button>
          </div>
        </div>
      )}

      {selectedTab === "orders" && (
        <div className="px-4 py-6">
          <div className="mb-4">
            <h3 className="text-base mb-3">
              {language === "vi" ? "Đơn hàng gần đây" : "Recent Orders"}
            </h3>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm mb-1">{order.customer}</p>
                      <p className="text-xs text-gray-500 mb-2">{order.id}</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="text-xs text-gray-700">{order.statusText}</span>
                        <span className="text-xs text-gray-400">• {order.time}</span>
                      </div>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-700">
                      {language === "vi" ? "Chi tiết" : "Details"}
                    </button>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-600">
                      {language === "vi" ? "Tài xế:" : "Driver:"}{" "}
                      <span className="text-gray-900">{order.driver}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition">
            {language === "vi" ? "Xem tất cả đơn hàng" : "View All Orders"}
          </button>
        </div>
      )}

      {selectedTab === "drivers" && (
        <div className="px-4 py-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 text-white mb-6">
            <h3 className="text-base mb-3">
              {language === "vi" ? "Tài xế hoạt động" : "Active Drivers"}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl mb-1">{activeDrivers.length}</p>
                <p className="text-xs text-green-100">
                  {language === "vi" ? "Đang online" : "Online"}
                </p>
              </div>
              <div className="border-l border-green-500 pl-4">
                <p className="text-2xl mb-1">35</p>
                <p className="text-xs text-green-100">
                  {language === "vi" ? "Đơn đang giao" : "Delivering"}
                </p>
              </div>
              <div className="border-l border-green-500 pl-4">
                <p className="text-2xl mb-1">4.8</p>
                <p className="text-xs text-green-100">
                  {language === "vi" ? "Đánh giá TB" : "Avg Rating"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-base mb-3">
              {language === "vi" ? "Danh sách tài xế" : "Driver List"}
            </h3>
            <div className="space-y-3">
              {activeDrivers.map((driver, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm mb-1">{driver.name}</p>
                        <p className="text-xs text-gray-500">{driver.phone}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {language === "vi" ? "Hoạt động" : "Active"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-600">
                        {language === "vi" ? "Đơn hôm nay" : "Today's Orders"}
                      </p>
                      <p className="text-sm">{driver.orders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">
                        {language === "vi" ? "Đánh giá" : "Rating"}
                      </p>
                      <p className="text-sm">⭐ {driver.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full border border-red-600 text-red-600 py-3 rounded-xl hover:bg-red-50 transition">
            {language === "vi" ? "Thêm tài xế mới" : "Add New Driver"}
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
