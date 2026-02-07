import { useState } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  MapPin,
  User,
  Phone,
  Calendar,
  QrCode,
  Filter
} from "lucide-react";

interface OrderStatus {
  id: string;
  recipient: string;
  phone: string;
  address: string;
  status: "pending" | "picked" | "transit" | "delivering" | "delivered" | "returned";
  statusText: string;
  statusColor: string;
  createdDate: string;
  cod: number;
  service: string;
  timeline: {
    time: string;
    status: string;
    location: string;
  }[];
}

export function TrackOrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderStatus | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const mockOrders: OrderStatus[] = [
    {
      id: "VTP123456789",
      recipient: "Nguyễn Văn A",
      phone: "0912345678",
      address: "123 Trần Hưng Đạo, Q1, TP.HCM",
      status: "delivering",
      statusText: "Đang giao hàng",
      statusColor: "text-blue-600",
      createdDate: "05/02/2026",
      cod: 250000,
      service: "Nhanh",
      timeline: [
        { time: "14:30 - 05/02/2026", status: "Đang giao hàng", location: "Bưu cục Q1, TP.HCM" },
        { time: "09:15 - 05/02/2026", status: "Đã đến trung tâm phân phối", location: "TT phân phối TP.HCM" },
        { time: "22:40 - 04/02/2026", status: "Đang vận chuyển", location: "Trên đường HN → HCM" },
        { time: "16:20 - 04/02/2026", status: "Đã lấy hàng", location: "Bưu cục Hoàn Kiếm, HN" },
      ],
    },
    {
      id: "VTP987654321",
      recipient: "Trần Thị B",
      phone: "0987654321",
      address: "456 Nguyễn Trãi, Q5, TP.HCM",
      status: "delivered",
      statusText: "Đã giao",
      statusColor: "text-green-600",
      createdDate: "04/02/2026",
      cod: 0,
      service: "Tiêu chuẩn",
      timeline: [
        { time: "10:15 - 05/02/2026", status: "Giao hàng thành công", location: "Đã ký nhận" },
        { time: "08:30 - 05/02/2026", status: "Đang giao hàng", location: "Bưu cục Q5, TP.HCM" },
        { time: "20:10 - 04/02/2026", status: "Đã đến bưu cục", location: "Bưu cục Q5" },
        { time: "14:00 - 04/02/2026", status: "Đã lấy hàng", location: "Bưu cục Đống Đa, HN" },
      ],
    },
    {
      id: "VTP456789123",
      recipient: "Lê Văn C",
      phone: "0901234567",
      address: "789 Lê Lợi, Q3, TP.HCM",
      status: "picked",
      statusText: "Đã lấy hàng",
      statusColor: "text-orange-600",
      createdDate: "05/02/2026",
      cod: 150000,
      service: "Hỏa tốc",
      timeline: [
        { time: "15:45 - 05/02/2026", status: "Đã lấy hàng", location: "Bưu cục Cầu Giấy, HN" },
        { time: "14:20 - 05/02/2026", status: "Đã tạo đơn", location: "Hệ thống" },
      ],
    },
  ];

  const statusFilters = [
    { id: "all", label: "Tất cả", count: mockOrders.length },
    { id: "delivering", label: "Đang giao", count: mockOrders.filter(o => o.status === "delivering").length },
    { id: "delivered", label: "Đã giao", count: mockOrders.filter(o => o.status === "delivered").length },
    { id: "pending", label: "Chờ lấy", count: mockOrders.filter(o => o.status === "picked").length },
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return CheckCircle;
      case "delivering": return Truck;
      case "transit": return Package;
      case "returned": return XCircle;
      default: return Clock;
    }
  };

  if (selectedOrder) {
    const StatusIcon = getStatusIcon(selectedOrder.status);
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Chi tiết đơn hàng" />
        
        <div className="px-4 py-4">
          <button
            onClick={() => setSelectedOrder(null)}
            className="text-sm text-red-600 hover:text-red-700 mb-4"
          >
            ← Quay lại
          </button>

          {/* Order Status Card */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white mb-4 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <StatusIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-red-100">Mã vận đơn</p>
                <p className="text-lg">{selectedOrder.id}</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-3">
              <p className="text-xs text-red-100 mb-1">Trạng thái hiện tại</p>
              <p className="text-base">{selectedOrder.statusText}</p>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="text-base mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-red-600" />
              Thông tin người nhận
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-gray-500">Họ tên:</span>
                <span>{selectedOrder.recipient}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{selectedOrder.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <span className="flex-1">{selectedOrder.address}</span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="text-base mb-3">Chi tiết đơn hàng</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày tạo</span>
                <span className="text-gray-900">{selectedOrder.createdDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loại dịch vụ</span>
                <span className="text-gray-900">{selectedOrder.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thu hộ COD</span>
                <span className="text-green-600">{selectedOrder.cod > 0 ? `${selectedOrder.cod.toLocaleString()}₫` : "Không"}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="text-base mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              Lịch sử vận chuyển
            </h3>
            <div className="space-y-4">
              {selectedOrder.timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                    {index < selectedOrder.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`text-sm mb-1 ${index === 0 ? '' : 'text-gray-700'}`}>
                      {item.status}
                    </p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Liên hệ
            </button>
            <button className="bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4" />
              Xem QR Code
            </button>
          </div>
        </div>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Theo dõi đơn hàng" />
      
      <div className="px-4 py-4">
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-3 shadow-sm mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo mã vận đơn hoặc tên người nhận"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <QrCode className="w-5 h-5 text-red-600" />
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                filterStatus === filter.id
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Không tìm thấy đơn hàng</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-3 flex-1">
                      <div className="bg-gray-100 p-2.5 rounded-lg h-fit">
                        <StatusIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-1">{order.recipient}</p>
                        <p className="text-xs text-gray-500 mb-2">Mã: {order.id}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs ${order.statusColor}`}>● {order.statusText}</span>
                          {order.cod > 0 && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              COD: {order.cod.toLocaleString()}₫
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>📅 {order.createdDate}</span>
                    <span className="text-red-600">Chi tiết →</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
