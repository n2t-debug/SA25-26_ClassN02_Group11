import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { useLanguage } from "../context/LanguageContext";
import { 
  Package, 
  Calculator, 
  MapPin, 
  Wallet, 
  Search, 
  TrendingUp,
  Clock,
  Truck,
  Gift,
  HeadphonesIcon
} from "lucide-react";
import { Link } from "react-router";

export function HomePage() {
  const { t } = useLanguage();
  
  const quickActions = [
    { icon: Package, label: t("home.createOrderQuick"), path: "/create-order", color: "bg-red-100 text-red-600" },
    { icon: Calculator, label: t("home.calculateFee"), path: "/create-order", color: "bg-blue-100 text-blue-600" },
    { icon: Search, label: t("home.trackOrder"), path: "/track", color: "bg-green-100 text-green-600" },
    { icon: MapPin, label: t("home.findLocation"), path: "/locations", color: "bg-purple-100 text-purple-600" },
  ];

  const recentOrders = [
    { 
      id: "VTP123456789", 
      recipient: "Nguyễn Văn A", 
      status: t("track.delivering"), 
      time: "14:30 hôm nay",
      statusColor: "text-blue-600",
      icon: Truck
    },
    { 
      id: "VTP987654321", 
      recipient: "Trần Thị B", 
      status: t("track.delivered"), 
      time: "10:15 hôm nay",
      statusColor: "text-green-600",
      icon: Package
    },
    { 
      id: "VTP456789123", 
      recipient: "Lê Văn C", 
      status: t("track.pending"), 
      time: "Hôm qua",
      statusColor: "text-orange-600",
      icon: Clock
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={t("app.title")} />
      
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 mx-4 mt-4 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-red-100 text-sm mb-1">{t("home.balance")}</p>
            <p className="text-3xl">2,450,000₫</p>
          </div>
          <Wallet className="w-10 h-10 text-red-200" />
        </div>
        <div className="flex gap-2">
          <Link 
            to="/cod"
            className="flex-1 bg-white text-red-600 py-2 px-4 rounded-lg text-center text-sm hover:bg-red-50 transition"
          >
            {t("home.withdraw")}
          </Link>
          <Link 
            to="/cod"
            className="flex-1 border border-white text-white py-2 px-4 rounded-lg text-center text-sm hover:bg-red-600 transition"
          >
            {t("home.details")}
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <h2 className="text-base mb-3">{t("home.quickActions")}</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition"
              >
                <div className={`${action.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-center text-gray-700">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <h2 className="text-base">{t("home.stats")}</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl text-red-600">47</p>
              <p className="text-xs text-gray-600 mt-1">{t("home.orders")}</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-2xl text-green-600">42</p>
              <p className="text-xs text-gray-600 mt-1">{t("home.delivered")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-blue-600">5</p>
              <p className="text-xs text-gray-600 mt-1">{t("home.shipping")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base">{t("home.recentOrders")}</h2>
          <Link to="/track" className="text-sm text-red-600 hover:text-red-700">
            {t("home.viewAll")}
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => {
            const StatusIcon = order.icon;
            return (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <div className="bg-gray-100 p-2.5 rounded-lg h-fit">
                      <StatusIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">{order.recipient}</p>
                      <p className="text-xs text-gray-500 mb-2">Mã vận đơn: {order.id}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${order.statusColor}`}>● {order.status}</span>
                        <span className="text-xs text-gray-400">• {order.time}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/track"
                    className="text-xs text-red-600 hover:text-red-700 ml-2"
                  >
                    {t("home.details")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promotions Banner */}
      <div className="px-4 mt-6">
        <Link 
          to="/promotions"
          className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 flex items-center justify-between text-white shadow-lg hover:shadow-xl transition"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5" />
              <p className="text-sm">{t("home.promotionSpecial")}</p>
            </div>
            <p className="text-lg">{t("home.discount30")}</p>
            <p className="text-xs text-orange-100 mt-1">{t("home.firstOrder")}</p>
          </div>
          <div className="text-4xl">🎁</div>
        </Link>
      </div>

      {/* Support */}
      <div className="px-4 mt-6 mb-4">
        <button className="w-full bg-white rounded-xl p-4 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition">
          <HeadphonesIcon className="w-5 h-5 text-red-600" />
          <span className="text-sm">{t("home.support")}</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}