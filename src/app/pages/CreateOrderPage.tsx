import { useState } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { 
  User, 
  Phone, 
  MapPin, 
  Package, 
  DollarSign,
  Mic,
  Copy,
  Sparkles,
  Calculator,
  CheckCircle,
  ChevronRight,
  Truck,
  Zap,
  Clock
} from "lucide-react";

export function CreateOrderPage() {
  const [step, setStep] = useState<"input" | "calculate" | "confirm">("input");
  const [inputMethod, setInputMethod] = useState<"manual" | "paste" | "voice" | "smart">("manual");
  
  const [senderInfo, setSenderInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Hà Nội",
  });

  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "TP.HCM",
  });

  const [packageInfo, setPackageInfo] = useState({
    weight: "",
    value: "",
    cod: "",
    description: "",
  });

  const [selectedService, setSelectedService] = useState<string | null>(null);

  const inputMethods = [
    { id: "manual", icon: User, label: "Nhập tay", color: "bg-blue-100 text-blue-600" },
    { id: "paste", icon: Copy, label: "Copy & Paste", color: "bg-green-100 text-green-600" },
    { id: "voice", icon: Mic, label: "Giọng nói", color: "bg-purple-100 text-purple-600" },
    { id: "smart", icon: Sparkles, label: "Nhập thông minh", color: "bg-orange-100 text-orange-600" },
  ];

  const serviceOptions = [
    { 
      id: "standard", 
      icon: Truck,
      name: "Tiêu chuẩn", 
      time: "3-4 ngày", 
      price: 35000,
      description: "Phù hợp hàng thường"
    },
    { 
      id: "fast", 
      icon: Zap,
      name: "Nhanh", 
      time: "1-2 ngày", 
      price: 55000,
      description: "Ưu tiên giao nhanh"
    },
    { 
      id: "express", 
      icon: Clock,
      name: "Hỏa tốc", 
      time: "6-12 giờ", 
      price: 95000,
      description: "Giao trong ngày"
    },
  ];

  const handleCalculate = () => {
    setStep("calculate");
  };

  const handleConfirmOrder = () => {
    setStep("confirm");
  };

  const handleParseSmartInput = (text: string) => {
    // Simulate smart parsing
    const phoneRegex = /0\d{9}/g;
    const phones = text.match(phoneRegex);
    
    if (phones && phones.length > 0) {
      setReceiverInfo(prev => ({ ...prev, phone: phones[0] }));
    }
    
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      setReceiverInfo(prev => ({ ...prev, name: lines[0] }));
    }
    if (lines.length > 1) {
      setReceiverInfo(prev => ({ ...prev, address: lines.slice(1).join(', ') }));
    }
  };

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Xác nhận đơn hàng" />
        
        <div className="px-4 py-6">
          <div className="bg-white rounded-full p-4 flex items-center justify-center mb-6 max-w-xs mx-auto">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h2 className="text-xl text-center mb-2">Đơn hàng đã được tạo!</h2>
          <p className="text-center text-gray-600 mb-6">Mã vận đơn: <span className="text-red-600">VTP{Date.now().toString().slice(-9)}</span></p>
          
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Dịch vụ</span>
              <span className="text-sm">{serviceOptions.find(s => s.id === selectedService)?.name}</span>
            </div>
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-600">Người nhận</span>
              <span className="text-sm">{receiverInfo.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tổng cước phí</span>
              <span className="text-lg text-red-600">{serviceOptions.find(s => s.id === selectedService)?.price.toLocaleString()}₫</span>
            </div>
          </div>

          <button 
            onClick={() => {
              setStep("input");
              setReceiverInfo({ name: "", phone: "", address: "", city: "TP.HCM" });
              setPackageInfo({ weight: "", value: "", cod: "", description: "" });
              setSelectedService(null);
            }}
            className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition mb-3"
          >
            Tạo đơn mới
          </button>
          
          <button 
            onClick={() => window.print()}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition"
          >
            In mã vận đơn
          </button>
        </div>
        
        <BottomNav />
      </div>
    );
  }

  if (step === "calculate") {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Chọn dịch vụ vận chuyển" />
        
        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-600">Tuyến đường</p>
                <p className="text-sm">{senderInfo.city} → {receiverInfo.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-xs text-gray-600">Khối lượng</p>
                <p className="text-sm">{packageInfo.weight} kg</p>
              </div>
            </div>
          </div>

          <h3 className="text-base mb-3">Chọn loại dịch vụ</h3>
          <div className="space-y-3 mb-6">
            {serviceOptions.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border-2 ${
                    selectedService === service.id ? "border-red-600" : "border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2.5 rounded-lg">
                        <ServiceIcon className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm mb-0.5">{service.name}</p>
                        <p className="text-xs text-gray-600">{service.description}</p>
                        <p className="text-xs text-blue-600 mt-1">⏱ {service.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-red-600">{service.price.toLocaleString()}₫</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setStep("input")}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Quay lại
            </button>
            <button 
              onClick={handleConfirmOrder}
              disabled={!selectedService}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Xác nhận
            </button>
          </div>
        </div>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Tạo đơn hàng" />
      
      <div className="px-4 py-4">
        {/* Input Method Selection */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-600 mb-3">Chọn cách nhập thông tin</h3>
          <div className="grid grid-cols-4 gap-2">
            {inputMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setInputMethod(method.id as any)}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 transition ${
                    inputMethod === method.id
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-white text-gray-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs text-center">{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Smart Input */}
        {inputMethod === "smart" && (
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="text-sm mb-1">Nhập thông minh</h4>
                <p className="text-xs text-gray-600">Chỉ cần paste hoặc gõ thông tin, AI sẽ tự động phân tích</p>
              </div>
            </div>
            <textarea
              className="w-full border border-orange-300 rounded-lg p-3 text-sm mt-2 min-h-24"
              placeholder="VD: Nguyễn Văn A&#10;0912345678&#10;123 Trần Hưng Đạo, Q1, TP.HCM"
              onChange={(e) => handleParseSmartInput(e.target.value)}
            />
          </div>
        )}

        {/* Sender Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="text-base mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-red-600" />
            Thông tin người gửi
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Họ tên"
              value={senderInfo.name}
              onChange={(e) => setSenderInfo({ ...senderInfo, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={senderInfo.phone}
              onChange={(e) => setSenderInfo({ ...senderInfo, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Địa chỉ chi tiết"
              value={senderInfo.address}
              onChange={(e) => setSenderInfo({ ...senderInfo, address: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              value={senderInfo.city}
              onChange={(e) => setSenderInfo({ ...senderInfo, city: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP.HCM">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
            </select>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="text-base mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            Thông tin người nhận
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Họ tên"
              value={receiverInfo.name}
              onChange={(e) => setReceiverInfo({ ...receiverInfo, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={receiverInfo.phone}
              onChange={(e) => setReceiverInfo({ ...receiverInfo, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Địa chỉ chi tiết"
              value={receiverInfo.address}
              onChange={(e) => setReceiverInfo({ ...receiverInfo, address: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              value={receiverInfo.city}
              onChange={(e) => setReceiverInfo({ ...receiverInfo, city: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="TP.HCM">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
            </select>
          </div>
        </div>

        {/* Package Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="text-base mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-red-600" />
            Thông tin hàng hóa
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Khối lượng (kg)"
                value={packageInfo.weight}
                onChange={(e) => setPackageInfo({ ...packageInfo, weight: e.target.value })}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                placeholder="Giá trị (VNĐ)"
                value={packageInfo.value}
                onChange={(e) => setPackageInfo({ ...packageInfo, value: e.target.value })}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-4 h-4 text-green-600" />
              <input
                type="number"
                placeholder="Thu hộ COD (nếu có)"
                value={packageInfo.cod}
                onChange={(e) => setPackageInfo({ ...packageInfo, cod: e.target.value })}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <textarea
              placeholder="Mô tả hàng hóa"
              value={packageInfo.description}
              onChange={(e) => setPackageInfo({ ...packageInfo, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-h-20"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button 
          onClick={handleCalculate}
          disabled={!receiverInfo.name || !receiverInfo.phone || !packageInfo.weight}
          className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Calculator className="w-5 h-5" />
          Tính cước phí & Tiếp tục
        </button>
      </div>
      
      <BottomNav />
    </div>
  );
}
