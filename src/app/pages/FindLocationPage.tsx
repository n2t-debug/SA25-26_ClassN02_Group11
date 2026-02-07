import { useState } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation,
  Star,
  ChevronRight
} from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  hours: string;
  distance: string;
  rating: number;
  services: string[];
  lat: number;
  lng: number;
}

export function FindLocationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("hanoi");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    {
      id: "1",
      name: "Bưu cục Hoàn Kiếm",
      address: "75 Đinh Tiên Hoàng, Hoàn Kiếm",
      district: "Hoàn Kiếm",
      city: "Hà Nội",
      phone: "024 3825 1234",
      hours: "7:30 - 19:00",
      distance: "0.8 km",
      rating: 4.5,
      services: ["Gửi hàng", "Nhận hàng", "Thu COD"],
      lat: 21.0285,
      lng: 105.8542,
    },
    {
      id: "2",
      name: "Bưu cục Đống Đa",
      address: "234 Láng Hạ, Đống Đa",
      district: "Đống Đa",
      city: "Hà Nội",
      phone: "024 3851 5678",
      hours: "8:00 - 18:30",
      distance: "1.5 km",
      rating: 4.3,
      services: ["Gửi hàng", "Nhận hàng"],
      lat: 21.0227,
      lng: 105.8194,
    },
    {
      id: "3",
      name: "Bưu cục Cầu Giấy",
      address: "456 Xuân Thủy, Cầu Giấy",
      district: "Cầu Giấy",
      city: "Hà Nội",
      phone: "024 3754 9012",
      hours: "7:00 - 19:30",
      distance: "2.3 km",
      rating: 4.7,
      services: ["Gửi hàng", "Nhận hàng", "Thu COD", "In mã vận đơn"],
      lat: 21.0381,
      lng: 105.7826,
    },
    {
      id: "4",
      name: "Bưu cục Hai Bà Trưng",
      address: "123 Bà Triệu, Hai Bà Trưng",
      district: "Hai Bà Trưng",
      city: "Hà Nội",
      phone: "024 3974 3210",
      hours: "8:00 - 18:00",
      distance: "3.1 km",
      rating: 4.2,
      services: ["Gửi hàng", "Nhận hàng", "Thu COD"],
      lat: 21.0122,
      lng: 105.8466,
    },
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (selectedLocation) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Chi tiết bưu cục" />
        
        <div className="px-4 py-4">
          <button
            onClick={() => setSelectedLocation(null)}
            className="text-sm text-red-600 hover:text-red-700 mb-4"
          >
            ← Quay lại
          </button>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-xl h-48 mb-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-green-200"></div>
            <div className="relative z-10">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-gray-700">Bản đồ vị trí</p>
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg mb-2">{selectedLocation.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{selectedLocation.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">(127 đánh giá)</span>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                Đang mở
              </span>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{selectedLocation.address}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedLocation.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${selectedLocation.phone}`} className="text-sm text-blue-600">
                  {selectedLocation.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{selectedLocation.hours}</span>
              </div>

              <div className="flex items-center gap-3">
                <Navigation className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">Cách bạn {selectedLocation.distance}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h4 className="text-sm mb-3">Dịch vụ cung cấp</h4>
            <div className="flex flex-wrap gap-2">
              {selectedLocation.services.map((service, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${selectedLocation.phone}`}
              className="bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Gọi điện
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Chỉ đường
            </a>
          </div>
        </div>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Tìm bưu cục" />
      
      <div className="px-4 py-4">
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-3 shadow-sm mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc địa chỉ"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* City Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCity("hanoi")}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
              selectedCity === "hanoi"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Hà Nội
          </button>
          <button
            onClick={() => setSelectedCity("hcm")}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
              selectedCity === "hcm"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            TP.HCM
          </button>
          <button
            onClick={() => setSelectedCity("danang")}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
              selectedCity === "danang"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Đà Nẵng
          </button>
        </div>

        {/* Current Location Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl mb-4 flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition shadow-md">
          <Navigation className="w-5 h-5" />
          <span>Tìm bưu cục gần vị trí của tôi</span>
        </button>

        {/* Locations List */}
        <div className="space-y-3">
          <h3 className="text-sm text-gray-600">
            Tìm thấy {filteredLocations.length} bưu cục
          </h3>
          
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-left"
            >
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2.5 rounded-lg h-fit">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm mb-1">{location.name}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-gray-600">{location.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-blue-600">{location.distance}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{location.address}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-600">{location.hours}</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded ml-auto">
                      Đang mở
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
