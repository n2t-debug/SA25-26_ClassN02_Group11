import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { DollarSign, TrendingUp, Clock, CheckCircle, Wallet } from "lucide-react";

export function DriverEarningsPage() {
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

  const earnings = [
    {
      date: "06/02/2026",
      orders: 12,
      codCollected: 1250000,
      earnings: 240000,
      status: "completed",
    },
    {
      date: "05/02/2026",
      orders: 15,
      codCollected: 2100000,
      earnings: 300000,
      status: "completed",
    },
    {
      date: "04/02/2026",
      orders: 10,
      codCollected: 850000,
      earnings: 200000,
      status: "completed",
    },
  ];

  const totalEarnings = earnings.reduce((sum, e) => sum + e.earnings, 0);
  const totalCOD = earnings.reduce((sum, e) => sum + e.codCollected, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={language === "vi" ? "Thu nhập" : "Earnings"} />

      <div className="px-4 py-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-6 h-6" />
            <h3 className="text-base">
              {language === "vi" ? "Tổng thu nhập tuần này" : "This Week's Earnings"}
            </h3>
          </div>
          <p className="text-4xl mb-4">{totalEarnings.toLocaleString()}₫</p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-orange-500">
            <div>
              <p className="text-xs text-orange-100 mb-1">
                {language === "vi" ? "COD đã thu" : "COD Collected"}
              </p>
              <p className="text-lg">{totalCOD.toLocaleString()}₫</p>
            </div>
            <div>
              <p className="text-xs text-orange-100 mb-1">
                {language === "vi" ? "Tổng đơn" : "Total Orders"}
              </p>
              <p className="text-lg">{earnings.reduce((sum, e) => sum + e.orders, 0)}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                +15%
              </span>
            </div>
            <p className="text-2xl mb-1">240K₫</p>
            <p className="text-xs text-gray-600">
              {language === "vi" ? "Hôm nay" : "Today"}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                Avg
              </span>
            </div>
            <p className="text-2xl mb-1">20K₫</p>
            <p className="text-xs text-gray-600">
              {language === "vi" ? "Trung bình/đơn" : "Per Order"}
            </p>
          </div>
        </div>

        {/* Earnings History */}
        <div className="mb-4">
          <h3 className="text-base mb-3">
            {language === "vi" ? "Lịch sử thu nhập" : "Earnings History"}
          </h3>
          <div className="space-y-3">
            {earnings.map((earning, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">{earning.date}</p>
                      <p className="text-xs text-gray-500">
                        {earning.orders} {language === "vi" ? "đơn hoàn thành" : "orders completed"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base text-green-600 mb-1">
                      +{earning.earnings.toLocaleString()}₫
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === "vi" ? "Thu nhập" : "Earnings"}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      {language === "vi" ? "COD đã thu:" : "COD Collected:"}
                    </span>
                    <span className="text-gray-900">{earning.codCollected.toLocaleString()}₫</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw Button */}
        <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition flex items-center justify-center gap-2">
          <Wallet className="w-5 h-5" />
          {language === "vi" ? "Rút tiền" : "Withdraw"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
