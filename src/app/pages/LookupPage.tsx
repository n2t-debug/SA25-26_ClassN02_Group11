import { useState } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { useLanguage } from "../context/LanguageContext";
import { 
  Search, 
  Package, 
  MapPin,
  Clock,
  Phone,
  User,
  CheckCircle,
  Truck,
  QrCode,
  AlertCircle,
  Share2
} from "lucide-react";

interface OrderInfo {
  id: string;
  status: "pending" | "picked" | "transit" | "delivering" | "delivered" | "returned";
  statusText: string;
  statusColor: string;
  sender: {
    name: string;
    phone: string;
    address: string;
  };
  receiver: {
    name: string;
    phone: string;
    address: string;
  };
  package: {
    weight: string;
    description: string;
  };
  service: string;
  cod: number;
  createdDate: string;
  estimatedDelivery: string;
  timeline: {
    time: string;
    status: string;
    location: string;
    completed: boolean;
  }[];
}

export function LookupPage() {
  const { t, language } = useLanguage();
  const [trackingCode, setTrackingCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data
  const mockOrder: OrderInfo = {
    id: "VTP123456789",
    status: "delivering",
    statusText: language === "vi" ? "Đang giao hàng" : "Out for Delivery",
    statusColor: "text-blue-600",
    sender: {
      name: "Nguyễn Văn A",
      phone: "0912345678",
      address: "123 Trần Hưng Đạo, Q1, TP.HCM"
    },
    receiver: {
      name: "Trần Thị B",
      phone: "0987654321",
      address: "456 Nguyễn Trãi, Đống Đa, Hà Nội"
    },
    package: {
      weight: "1.5 kg",
      description: "Quần áo, giày dép"
    },
    service: language === "vi" ? "Nhanh" : "Fast",
    cod: 250000,
    createdDate: "04/02/2026",
    estimatedDelivery: "05/02/2026",
    timeline: [
      { 
        time: "14:30 - 05/02/2026", 
        status: language === "vi" ? "Đang giao hàng" : "Out for delivery",
        location: language === "vi" ? "Bưu cục Đống Đa, Hà Nội" : "Dong Da Office, Hanoi",
        completed: true 
      },
      { 
        time: "09:15 - 05/02/2026", 
        status: language === "vi" ? "Đã đến trung tâm phân phối" : "Arrived at distribution center",
        location: language === "vi" ? "TT phân phối Hà Nội" : "Hanoi Distribution Center",
        completed: true 
      },
      { 
        time: "22:40 - 04/02/2026", 
        status: language === "vi" ? "Đang vận chuyển" : "In transit",
        location: language === "vi" ? "Trên đường HCM → HN" : "HCM → HN Route",
        completed: true 
      },
      { 
        time: "16:20 - 04/02/2026", 
        status: language === "vi" ? "Đã lấy hàng" : "Picked up",
        location: language === "vi" ? "Bưu cục Q1, TP.HCM" : "District 1 Office, HCM",
        completed: true 
      },
      { 
        time: "14:00 - 04/02/2026", 
        status: language === "vi" ? "Đã tạo đơn" : "Order created",
        location: language === "vi" ? "Hệ thống" : "System",
        completed: true 
      },
    ]
  };

  const handleLookup = () => {
    setError("");
    setLoading(true);

    // Validate inputs
    if (!trackingCode.trim()) {
      setError(language === "vi" 
        ? "Vui lòng nhập mã vận đơn" 
        : "Please enter tracking code");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Check if tracking code exists (mock)
      if (trackingCode.toUpperCase().includes("VTP")) {
        setOrderInfo(mockOrder);
        setError("");
      } else {
        setError(language === "vi"
          ? "Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã vận đơn."
          : "Order not found. Please check your tracking code.");
        setOrderInfo(null);
      }
      setLoading(false);
    }, 1000);
  };

  const handleShare = () => {
    if (orderInfo) {
      const shareText = `${language === "vi" ? "Theo dõi đơn hàng" : "Track Order"}: ${orderInfo.id}\n${window.location.href}`;
      if (navigator.share) {
        navigator.share({ text: shareText });
      } else {
        navigator.clipboard.writeText(shareText);
        alert(language === "vi" ? "Đã sao chép link!" : "Link copied!");
      }
    }
  };

  const getStatusIcon = () => {
    if (!orderInfo) return Package;
    switch (orderInfo.status) {
      case "delivered": return CheckCircle;
      case "delivering": return Truck;
      default: return Package;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={language === "vi" ? "Tra cứu đơn hàng" : "Track Package"} />
      
      <div className="px-4 py-6">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <Search className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm mb-1">
                {language === "vi" ? "Tra cứu công khai" : "Public Tracking"}
              </h3>
              <p className="text-xs text-gray-600">
                {language === "vi" 
                  ? "Nhập mã vận đơn để tra cứu thông tin đơn hàng mà không cần đăng nhập"
                  : "Enter tracking code to check order status without logging in"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        {!orderInfo && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-base mb-4">
              {language === "vi" ? "Nhập thông tin tra cứu" : "Enter Tracking Information"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  {language === "vi" ? "Mã vận đơn" : "Tracking Code"} *
                </label>
                <input
                  type="text"
                  placeholder={language === "vi" ? "VD: VTP123456789" : "Ex: VTP123456789"}
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  {language === "vi" ? "Số điện thoại người nhận (tùy chọn)" : "Receiver Phone (optional)"}
                </label>
                <input
                  type="tel"
                  placeholder={language === "vi" ? "VD: 0912345678" : "Ex: 0912345678"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={handleLookup}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {language === "vi" ? "Đang tra cứu..." : "Searching..."}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    {language === "vi" ? "Tra cứu" : "Track"}
                  </>
                )}
              </button>
            </div>

            {/* Quick Access */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-600 mb-3">
                {language === "vi" ? "Hoặc quét QR code" : "Or scan QR code"}
              </p>
              <button className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <QrCode className="w-4 h-4" />
                {language === "vi" ? "Quét mã QR" : "Scan QR Code"}
              </button>
            </div>
          </div>
        )}

        {/* Order Results */}
        {orderInfo && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setOrderInfo(null);
                setTrackingCode("");
                setPhoneNumber("");
              }}
              className="text-sm text-red-600 hover:text-red-700"
            >
              ← {language === "vi" ? "Tra cứu đơn khác" : "Search Another Order"}
            </button>

            {/* Status Card */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  {(() => {
                    const StatusIcon = getStatusIcon();
                    return <StatusIcon className="w-6 h-6" />;
                  })()}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-red-100">
                    {language === "vi" ? "Mã vận đơn" : "Tracking Code"}
                  </p>
                  <p className="text-lg">{orderInfo.id}</p>
                </div>
                <button
                  onClick={handleShare}
                  className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <p className="text-xs text-red-100 mb-1">
                  {language === "vi" ? "Trạng thái hiện tại" : "Current Status"}
                </p>
                <p className="text-base">{orderInfo.statusText}</p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm">
                  {language === "vi" ? "Thông tin giao hàng" : "Delivery Info"}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {orderInfo.service}
                </span>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === "vi" ? "Ngày gửi" : "Sent Date"}
                  </span>
                  <span className="text-gray-900">{orderInfo.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === "vi" ? "Dự kiến giao" : "Est. Delivery"}
                  </span>
                  <span className="text-green-600">{orderInfo.estimatedDelivery}</span>
                </div>
                {orderInfo.cod > 0 && (
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="text-gray-600">
                      {language === "vi" ? "Thu hộ COD" : "COD Amount"}
                    </span>
                    <span className="text-green-600">{orderInfo.cod.toLocaleString()}₫</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sender & Receiver */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="text-sm mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  {language === "vi" ? "Người gửi" : "Sender"}
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-900">{orderInfo.sender.name}</p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {orderInfo.sender.phone}
                  </p>
                  <p className="text-gray-600 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 mt-0.5" />
                    <span className="flex-1">{orderInfo.sender.address}</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="text-sm mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  {language === "vi" ? "Người nhận" : "Receiver"}
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-900">{orderInfo.receiver.name}</p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {orderInfo.receiver.phone}
                  </p>
                  <p className="text-gray-600 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 mt-0.5" />
                    <span className="flex-1">{orderInfo.receiver.address}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-sm mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                {language === "vi" ? "Lịch sử vận chuyển" : "Shipping Timeline"}
              </h3>
              <div className="space-y-4">
                {orderInfo.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        item.completed ? 'bg-red-600' : 'bg-gray-300'
                      }`}></div>
                      {index < orderInfo.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 my-1 ${
                          item.completed ? 'bg-red-200' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`text-sm mb-1 ${
                        index === 0 ? '' : 'text-gray-700'
                      }`}>
                        {item.status}
                      </p>
                      <p className="text-xs text-gray-500">{item.location}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-800 mb-2">
                    {language === "vi"
                      ? "Cần hỗ trợ về đơn hàng này?"
                      : "Need help with this order?"
                    }
                  </p>
                  <button className="text-sm text-yellow-700 underline hover:text-yellow-800">
                    {language === "vi" ? "Liên hệ bộ phận chăm sóc khách hàng" : "Contact Customer Support"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
}
