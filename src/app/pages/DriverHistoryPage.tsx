import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Package, Clock, CheckCircle, DollarSign, TrendingUp } from "lucide-react";

export function DriverHistoryPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?role=driver");
    } else if (user && user.role !== "driver") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user || user.role !== "driver") {
    return null;
  }

  const completedOrders = [
    {
      id: "VTP123456789",
      recipient: "Nguyễn Văn A",
      address: "123 Trần Hưng Đạo, Q1",
      cod: 250000,
      completedTime: "14:30 - 06/02/2026",
      rating: 5,
    },
    {
      id: "VTP987654321",
      recipient: "Trần Thị B",
      address: "456 Nguyễn Trãi, Q5",
      cod: 0,
      completedTime: "12:15 - 06/02/2026",
      rating: 5,
    },
    {
      id: "VTP456789123",
      recipient: "Lê Văn C",
      address: "789 Lê Lợi, Q3",
      cod: 150000,
      completedTime: "10:30 - 06/02/2026",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={language === "vi" ? "Lịch sử giao hàng" : "Delivery History"} />

      <div className="px-4 py-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-base">
              {language === "vi" ? "Thống kê hôm nay" : "Today's Summary"}
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl mb-1">{completedOrders.length}</p>
              <p className="text-xs text-green-100">
                {language === "vi" ? "Đơn hoàn thành" : "Completed"}
              </p>
            </div>
            <div className="border-l border-green-500 pl-4">
              <p className="text-2xl mb-1">
                {completedOrders.reduce((sum, order) => sum + order.cod, 0).toLocaleString()}₫
              </p>
              <p className="text-xs text-green-100">
                {language === "vi" ? "COD thu được" : "COD Collected"}
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

        {/* Orders List */}
        <div className="mb-4">
          <h3 className="text-base mb-3">
            {language === "vi" ? "Đơn đã hoàn thành" : "Completed Orders"}
          </h3>
          <div className="space-y-3">
            {completedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <p className="text-sm">{order.recipient}</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{order.id}</p>
                    <p className="text-xs text-gray-600">{order.address}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        {i < order.rating ? "⭐" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{order.completedTime}</span>
                  </div>
                  {order.cod > 0 && (
                    <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{order.cod.toLocaleString()}₫</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
