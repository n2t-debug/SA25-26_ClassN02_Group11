import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { 
  Gift, 
  Tag, 
  Clock, 
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import { useState } from "react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  terms: string[];
  type: "discount" | "cashback" | "special";
  category: string;
  icon: string;
  color: string;
}

export function PromotionsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promotions: Promotion[] = [
    {
      id: "1",
      title: "Giảm 30% cước phí",
      description: "Cho đơn hàng đầu tiên trong tháng",
      code: "FIRSTORDER30",
      discount: "30%",
      validUntil: "28/02/2026",
      terms: [
        "Áp dụng cho đơn hàng đầu tiên mỗi tháng",
        "Giảm tối đa 50.000₫",
        "Không áp dụng cùng khuyến mãi khác"
      ],
      type: "discount",
      category: "Đơn hàng đầu",
      icon: "🎁",
      color: "from-orange-500 to-pink-500"
    },
    {
      id: "2",
      title: "Hoàn tiền COD",
      description: "Hoàn 2% phí COD cho đơn hàng thu hộ",
      code: "CODBACK2",
      discount: "2%",
      validUntil: "15/03/2026",
      terms: [
        "Hoàn tiền vào ví Viettel Post",
        "Áp dụng cho đơn COD từ 200.000₫",
        "Tối đa 20.000₫/đơn"
      ],
      type: "cashback",
      category: "COD",
      icon: "💰",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "3",
      title: "Miễn phí giao nội thành",
      description: "Giao hàng nội thành HN, HCM miễn phí",
      code: "FREESHIP",
      discount: "Free",
      validUntil: "10/02/2026",
      terms: [
        "Áp dụng cho đơn hàng nội thành Hà Nội, TP.HCM",
        "Khối lượng dưới 2kg",
        "Giới hạn 5 đơn/ngày"
      ],
      type: "special",
      category: "Nội thành",
      icon: "🚚",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "4",
      title: "Tích điểm x2",
      description: "Nhận điểm thưởng gấp đôi mỗi đơn",
      code: "POINT2X",
      discount: "x2",
      validUntil: "20/02/2026",
      terms: [
        "Áp dụng cho tất cả đơn hàng",
        "Điểm được tích vào tài khoản tự động",
        "Đổi điểm lấy voucher sau"
      ],
      type: "special",
      category: "Tích điểm",
      icon: "⭐",
      color: "from-purple-500 to-pink-500"
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Khuyến mãi" />
      
      <div className="px-4 py-4">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-8 h-8" />
            <div>
              <h2 className="text-lg">Ưu đãi đặc biệt</h2>
              <p className="text-sm text-red-100">Tiết kiệm chi phí gửi hàng</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 mt-4">
            <p className="text-xs mb-1">Tổng tiết kiệm tháng này</p>
            <p className="text-2xl">245,000₫</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Tag className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">Đang có</p>
            <p className="text-base text-orange-600">{promotions.length}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">Đã dùng</p>
            <p className="text-base text-green-600">12</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">Điểm</p>
            <p className="text-base text-blue-600">350</p>
          </div>
        </div>

        {/* Promotions List */}
        <div className="mb-4">
          <h3 className="text-base mb-3">Khuyến mãi hiện có</h3>
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${promo.color} p-4 text-white`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-3xl">{promo.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-base mb-1">{promo.title}</h4>
                        <p className="text-sm text-white text-opacity-90">
                          {promo.description}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      <span className="text-sm">{promo.discount}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  {/* Code */}
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-3 mb-3 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Mã khuyến mãi</p>
                      <p className="text-sm text-gray-900 tracking-wider">{promo.code}</p>
                    </div>
                    <button
                      onClick={() => handleCopyCode(promo.code)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-red-700 transition flex items-center gap-1.5"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Đã sao
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Sao chép
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terms */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2">Điều kiện áp dụng:</p>
                    <ul className="space-y-1">
                      {promo.terms.map((term, index) => (
                        <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">•</span>
                          <span className="flex-1">{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Hết hạn: {promo.validUntil}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      {promo.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refer Friends */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-base mb-1">Giới thiệu bạn bè</h3>
              <p className="text-sm text-purple-100">
                Nhận 50.000₫ cho mỗi bạn đăng ký thành công
              </p>
            </div>
          </div>
          <button className="w-full bg-white text-purple-600 py-2.5 rounded-lg text-sm hover:bg-purple-50 transition">
            Mời bạn bè ngay
          </button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
