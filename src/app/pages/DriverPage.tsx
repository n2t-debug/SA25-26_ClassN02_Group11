import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { 
  Package, 
  Navigation, 
  Phone, 
  CheckCircle,
  XCircle,
  Camera,
  MapPin,
  Clock,
  DollarSign,
  User,
  AlertCircle,
  TrendingUp,
  Lock
} from "lucide-react";

interface DeliveryOrder {
  id: string;
  type: "pickup" | "delivery";
  recipient: string;
  phone: string;
  address: string;
  distance: string;
  cod: number;
  status: "assigned" | "picked" | "delivering" | "delivered" | "failed";
  deadline: string;
  packageInfo: string;
}

export function DriverPage() {
  const { t, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"today" | "completed" | "stats">("today");
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  // Check if user is logged in and is a driver
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?role=driver");
    } else if (user && user.role !== "driver") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  // If not authenticated or not a driver, show nothing while redirecting
  if (!isAuthenticated || !user || user.role !== "driver") {
    return null;
  }

  const todayOrders: DeliveryOrder[] = [
    {
      id: "VTP123456789",
      type: "pickup",
      recipient: "Nguyễn Văn A",
      phone: "0912345678",
      address: "123 Trần Hưng Đạo, Q1, TP.HCM",
      distance: "2.3 km",
      cod: 0,
      status: "assigned",
      deadline: "10:00 AM",
      packageInfo: "Quần áo - 1.5kg",
    },
    {
      id: "VTP987654321",
      type: "delivery",
      recipient: "Trần Thị B",
      phone: "0987654321",
      address: "456 Nguyễn Trãi, Q5, TP.HCM",
      distance: "3.8 km",
      cod: 250000,
      status: "delivering",
      deadline: "2:00 PM",
      packageInfo: "Điện tử - 2kg",
    },
    {
      id: "VTP456789123",
      type: "delivery",
      recipient: "Lê Văn C",
      phone: "0901234567",
      address: "789 Lê Lợi, Q3, TP.HCM",
      distance: "1.5 km",
      cod: 150000,
      status: "picked",
      deadline: "3:30 PM",
      packageInfo: "Thực phẩm - 3kg",
    },
  ];

  const completedOrders = 15;
  const todayRevenue = 1250000;
  const pendingCOD = 400000;

  const handleUpdateStatus = (newStatus: string) => {
    alert(`Đã cập nhật trạng thái: ${newStatus}`);
    setShowActionModal(false);
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title={language === "vi" ? "Chi tiết đơn hàng" : "Order Details"} />
        
        <div className="px-4 py-4">
          <button
            onClick={() => setSelectedOrder(null)}
            className="text-sm text-red-600 hover:text-red-700 mb-4"
          >
            ← {language === "vi" ? "Quay lại" : "Back"}
          </button>

          {/* Order Type Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
              selectedOrder.type === "pickup"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}>
              <Package className="w-4 h-4" />
              {selectedOrder.type === "pickup" 
                ? (language === "vi" ? "Lấy hàng" : "Pickup")
                : (language === "vi" ? "Giao hàng" : "Delivery")
              }
            </span>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-600 mb-1">
                  {language === "vi" ? "Mã vận đơn" : "Tracking Code"}
                </p>
                <p className="text-sm">{selectedOrder.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600 mb-1">
                  {language === "vi" ? "Thời hạn" : "Deadline"}
                </p>
                <p className="text-sm text-orange-600">{selectedOrder.deadline}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-0.5">
                    {language === "vi" ? "Khách hàng" : "Customer"}
                  </p>
                  <p className="text-sm">{selectedOrder.recipient}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${selectedOrder.phone}`} className="text-sm text-blue-600">
                  {selectedOrder.phone}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{selectedOrder.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {language === "vi" ? "Khoảng cách:" : "Distance:"} {selectedOrder.distance}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-600 mb-0.5">
                    {language === "vi" ? "Hàng hóa" : "Package"}
                  </p>
                  <p className="text-sm">{selectedOrder.packageInfo}</p>
                </div>
              </div>

              {selectedOrder.cod > 0 && (
                <div className="flex items-center gap-3 bg-green-50 -mx-4 px-4 py-3">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-xs text-green-600 mb-0.5">
                      {language === "vi" ? "Thu hộ COD" : "Collect COD"}
                    </p>
                    <p className="text-base text-green-700">
                      {selectedOrder.cod.toLocaleString()}₫
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedOrder.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 mb-3"
          >
            <Navigation className="w-5 h-5" />
            {language === "vi" ? "Chỉ đường" : "Navigate"}
          </a>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <a
              href={`tel:${selectedOrder.phone}`}
              className="bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {language === "vi" ? "Gọi điện" : "Call"}
            </a>
            <button
              onClick={() => setShowActionModal(true)}
              className="bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              {language === "vi" ? "Chụp ảnh" : "Take Photo"}
            </button>
          </div>

          {/* Status Update Buttons */}
          <div className="space-y-3">
            {selectedOrder.type === "pickup" && selectedOrder.status === "assigned" && (
              <button
                onClick={() => handleUpdateStatus("picked")}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {language === "vi" ? "Đã lấy hàng" : "Picked Up"}
              </button>
            )}

            {selectedOrder.type === "delivery" && selectedOrder.status !== "delivered" && (
              <>
                <button
                  onClick={() => handleUpdateStatus("delivered")}
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {language === "vi" ? "Giao thành công" : "Delivered Successfully"}
                </button>
                <button
                  onClick={() => handleUpdateStatus("failed")}
                  className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  {language === "vi" ? "Giao không thành công" : "Failed to Deliver"}
                </button>
              </>
            )}
          </div>

          {showActionModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                <h3 className="text-lg mb-4">
                  {language === "vi" ? "Chụp ảnh xác nhận" : "Confirmation Photo"}
                </h3>
                <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowActionModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg"
                  >
                    {language === "vi" ? "Hủy" : "Cancel"}
                  </button>
                  <button
                    onClick={() => setShowActionModal(false)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                  >
                    {language === "vi" ? "Xác nhận" : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={language === "vi" ? "Tài xế" : "Driver"} />
      
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-30">
        <div className="flex max-w-screen-xl mx-auto">
          <button
            onClick={() => setSelectedTab("today")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "today"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            {language === "vi" ? "Hôm nay" : "Today"}
          </button>
          <button
            onClick={() => setSelectedTab("completed")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "completed"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            {language === "vi" ? "Đã hoàn thành" : "Completed"}
          </button>
          <button
            onClick={() => setSelectedTab("stats")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "stats"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            {language === "vi" ? "Thống kê" : "Stats"}
          </button>
        </div>
      </div>

      {selectedTab === "today" && (
        <div className="px-4 py-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              <p className="text-xs text-gray-600 mb-1">
                {language === "vi" ? "Tổng đơn" : "Total"}
              </p>
              <p className="text-2xl text-red-600">{todayOrders.length}</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              <p className="text-xs text-gray-600 mb-1">
                {language === "vi" ? "Đã hoàn thành" : "Completed"}
              </p>
              <p className="text-2xl text-green-600">0</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm text-center">
              <p className="text-xs text-gray-600 mb-1">
                {language === "vi" ? "COD" : "COD"}
              </p>
              <p className="text-base text-blue-600">{pendingCOD.toLocaleString()}₫</p>
            </div>
          </div>

          {/* Orders List */}
          <div className="mb-4">
            <h3 className="text-base mb-3">
              {language === "vi" ? "Đơn hàng hôm nay" : "Today's Orders"}
            </h3>
            <div className="space-y-3">
              {todayOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-lg h-fit ${
                      order.type === "pickup" ? "bg-blue-100" : "bg-green-100"
                    }`}>
                      <Package className={`w-5 h-5 ${
                        order.type === "pickup" ? "text-blue-600" : "text-green-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm mb-1">{order.recipient}</p>
                          <p className="text-xs text-gray-500">{order.id}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.type === "pickup"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {order.type === "pickup"
                            ? (language === "vi" ? "Lấy" : "Pickup")
                            : (language === "vi" ? "Giao" : "Delivery")
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="flex-1 truncate">{order.address}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-gray-600">
                            📍 {order.distance}
                          </span>
                          <span className="text-orange-600">
                            ⏰ {order.deadline}
                          </span>
                        </div>
                        {order.cod > 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            COD: {order.cod.toLocaleString()}₫
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === "completed" && (
        <div className="px-4 py-4">
          <div className="bg-white rounded-xl p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-700 mb-1">
              {language === "vi" ? "Đã hoàn thành" : "Completed"}
            </p>
            <p className="text-2xl text-green-600 mb-2">{completedOrders} {language === "vi" ? "đơn" : "orders"}</p>
            <p className="text-sm text-gray-500">
              {language === "vi" ? "Tổng COD đã thu:" : "Total COD collected:"} {todayRevenue.toLocaleString()}₫
            </p>
          </div>
        </div>
      )}

      {selectedTab === "stats" && (
        <div className="px-4 py-4">
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white mb-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-base">
                {language === "vi" ? "Thống kê tháng này" : "This Month Stats"}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-red-100 mb-1">
                  {language === "vi" ? "Tổng đơn" : "Total Orders"}
                </p>
                <p className="text-2xl">156</p>
              </div>
              <div>
                <p className="text-xs text-red-100 mb-1">
                  {language === "vi" ? "Doanh thu" : "Revenue"}
                </p>
                <p className="text-2xl">12.5M₫</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {language === "vi" ? "Tỷ lệ giao thành công" : "Success Rate"}
                </span>
                <span className="text-sm">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {language === "vi" ? "Đánh giá trung bình" : "Average Rating"}
                </span>
                <span className="text-sm">4.8/5.0</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
}