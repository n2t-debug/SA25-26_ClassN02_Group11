import { createContext, useContext, useState, ReactNode } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    // Header & Navigation
    "app.title": "Ứng dụng giao hàng nhanh",
    "nav.home": "Trang chủ",
    "nav.createOrder": "Tạo đơn",
    "nav.track": "Theo dõi",
    "nav.cod": "COD",
    "nav.promotions": "Khuyến mãi",
    "nav.driver": "Tài xế",
    "nav.lookup": "Tra cứu",
    
    // Home Page
    "home.balance": "Số dư COD khả dụng",
    "home.withdraw": "Rút tiền",
    "home.details": "Chi tiết",
    "home.quickActions": "Thao tác nhanh",
    "home.createOrderQuick": "Tạo đơn nhanh",
    "home.calculateFee": "Tính cước phí",
    "home.trackOrder": "Tra cứu đơn",
    "home.findLocation": "Tìm bưu cục",
    "home.stats": "Thống kê tháng này",
    "home.orders": "Đơn hàng",
    "home.delivered": "Đã giao",
    "home.shipping": "Đang ship",
    "home.recentOrders": "Đơn hàng gần đây",
    "home.viewAll": "Xem tất cả",
    "home.promotionSpecial": "Khuyến mãi đặc biệt",
    "home.discount30": "Giảm 30% cước phí",
    "home.firstOrder": "Cho đơn hàng đầu tiên trong tháng",
    "home.support": "Liên hệ hỗ trợ",
    
    // Create Order
    "order.create": "Tạo đơn hàng",
    "order.inputMethod": "Chọn cách nhập thông tin",
    "order.manual": "Nhập tay",
    "order.paste": "Copy & Paste",
    "order.voice": "Giọng nói",
    "order.smart": "Nhập thông minh",
    "order.smartDesc": "Chỉ cần paste hoặc gõ thông tin, AI sẽ tự động phân tích",
    "order.sender": "Thông tin người gửi",
    "order.receiver": "Thông tin người nhận",
    "order.package": "Thông tin hàng hóa",
    "order.fullName": "Họ tên",
    "order.phone": "Số điện thoại",
    "order.address": "Địa chỉ chi tiết",
    "order.weight": "Khối lượng (kg)",
    "order.value": "Giá trị (VNĐ)",
    "order.cod": "Thu hộ COD (nếu có)",
    "order.description": "Mô tả hàng hóa",
    "order.calculate": "Tính cước phí & Tiếp tục",
    "order.selectService": "Chọn dịch vụ vận chuyển",
    "order.route": "Tuyến đường",
    "order.selectServiceType": "Chọn loại dịch vụ",
    "order.standard": "Tiêu chuẩn",
    "order.fast": "Nhanh",
    "order.express": "Hỏa tốc",
    "order.standardDesc": "Phù hợp hàng thường",
    "order.fastDesc": "Ưu tiên giao nhanh",
    "order.expressDesc": "Giao trong ngày",
    "order.back": "Quay lại",
    "order.confirm": "Xác nhận",
    "order.success": "Đơn hàng đã được tạo!",
    "order.trackingCode": "Mã vận đơn:",
    "order.service": "Dịch vụ",
    "order.recipient": "Người nhận",
    "order.totalFee": "Tổng cước phí",
    "order.createNew": "Tạo đơn mới",
    "order.print": "In mã vận đơn",
    
    // Track Order
    "track.title": "Theo dõi đơn hàng",
    "track.search": "Tìm theo mã vận đơn hoặc tên người nhận",
    "track.all": "Tất cả",
    "track.delivering": "Đang giao",
    "track.delivered": "Đã giao",
    "track.pending": "Chờ lấy",
    "track.noOrders": "Không tìm thấy đơn hàng",
    "track.orderDetails": "Chi tiết đơn hàng",
    "track.status": "Trạng thái hiện tại",
    "track.recipientInfo": "Thông tin người nhận",
    "track.orderInfo": "Chi tiết đơn hàng",
    "track.createdDate": "Ngày tạo",
    "track.serviceType": "Loại dịch vụ",
    "track.codAmount": "Thu hộ COD",
    "track.timeline": "Lịch sử vận chuyển",
    "track.contact": "Liên hệ",
    "track.qrCode": "Xem QR Code",
    
    // COD Management
    "cod.title": "Quản lý COD",
    "cod.overview": "Tổng quan",
    "cod.history": "Lịch sử",
    "cod.withdraw": "Rút tiền",
    "cod.available": "Số dư khả dụng",
    "cod.withdrawNow": "Rút tiền ngay",
    "cod.pending": "Đang chờ",
    "cod.withdrawnMonth": "Đã rút tháng này",
    "cod.stats": "Thống kê",
    "cod.totalOrders": "Tổng đơn COD",
    "cod.totalCollected": "Tổng tiền thu hộ",
    "cod.serviceFee": "Phí dịch vụ",
    "cod.netAmount": "Thực nhận",
    "cod.recentTrans": "Giao dịch gần đây",
    "cod.transHistory": "Lịch sử giao dịch",
    "cod.filter": "Lọc",
    "cod.selectAccount": "Chọn tài khoản nhận tiền",
    "cod.amount": "Số tiền muốn rút",
    "cod.withdrawAll": "Rút toàn bộ",
    "cod.note": "Lưu ý: Tiền sẽ được chuyển vào tài khoản trong 1-2 giờ làm việc. Phí rút tiền: 0₫ cho lần đầu tiên mỗi tháng.",
    "cod.confirmWithdraw": "Xác nhận rút tiền",
    
    // Find Location
    "location.title": "Tìm bưu cục",
    "location.search": "Tìm theo tên hoặc địa chỉ",
    "location.findNearby": "Tìm bưu cục gần vị trí của tôi",
    "location.found": "Tìm thấy",
    "location.offices": "bưu cục",
    "location.details": "Chi tiết bưu cục",
    "location.hours": "Giờ làm việc",
    "location.distance": "Cách bạn",
    "location.services": "Dịch vụ cung cấp",
    "location.call": "Gọi điện",
    "location.directions": "Chỉ đường",
    "location.open": "Đang mở",
    
    // Promotions
    "promo.title": "Khuyến mãi",
    "promo.special": "Ưu đãi đặc biệt",
    "promo.save": "Tiết kiệm chi phí gửi hàng",
    "promo.totalSaved": "Tổng tiết kiệm tháng này",
    "promo.available": "Đang có",
    "promo.used": "Đã dùng",
    "promo.points": "Điểm",
    "promo.current": "Khuyến mãi hiện có",
    "promo.code": "Mã khuyến mãi",
    "promo.copy": "Sao chép",
    "promo.copied": "Đã sao",
    "promo.terms": "Điều kiện áp dụng:",
    "promo.validUntil": "Hết hạn:",
    "promo.refer": "Giới thiệu bạn bè",
    "promo.referDesc": "Nhận 50.000₫ cho mỗi bạn đăng ký thành công",
    "promo.inviteNow": "Mời bạn bè ngay",
    
    // Common
    "common.loading": "Đang tải...",
    "common.error": "Có lỗi xảy ra",
    "common.success": "Thành công",
    "common.cancel": "Hủy",
    "common.save": "Lưu",
    "common.edit": "Sửa",
    "common.delete": "Xóa",
    "common.close": "Đóng",
  },
  en: {
    // Header & Navigation
    "app.title": "Quickship -Logistic",
    "nav.home": "Home",
    "nav.createOrder": "Create",
    "nav.track": "Track",
    "nav.cod": "COD",
    "nav.promotions": "Deals",
    "nav.driver": "Driver",
    "nav.lookup": "Lookup",
    
    // Home Page
    "home.balance": "Available COD Balance",
    "home.withdraw": "Withdraw",
    "home.details": "Details",
    "home.quickActions": "Quick Actions",
    "home.createOrderQuick": "Create Order",
    "home.calculateFee": "Calculate Fee",
    "home.trackOrder": "Track Order",
    "home.findLocation": "Find Office",
    "home.stats": "This Month Stats",
    "home.orders": "Orders",
    "home.delivered": "Delivered",
    "home.shipping": "Shipping",
    "home.recentOrders": "Recent Orders",
    "home.viewAll": "View All",
    "home.promotionSpecial": "Special Promotion",
    "home.discount30": "30% Off Shipping",
    "home.firstOrder": "For first order this month",
    "home.support": "Contact Support",
    
    // Create Order
    "order.create": "Create Order",
    "order.inputMethod": "Select Input Method",
    "order.manual": "Manual",
    "order.paste": "Copy & Paste",
    "order.voice": "Voice",
    "order.smart": "Smart Input",
    "order.smartDesc": "Just paste or type info, AI will parse automatically",
    "order.sender": "Sender Information",
    "order.receiver": "Receiver Information",
    "order.package": "Package Information",
    "order.fullName": "Full Name",
    "order.phone": "Phone Number",
    "order.address": "Detailed Address",
    "order.weight": "Weight (kg)",
    "order.value": "Value (VND)",
    "order.cod": "COD Amount (if any)",
    "order.description": "Package Description",
    "order.calculate": "Calculate Fee & Continue",
    "order.selectService": "Select Shipping Service",
    "order.route": "Route",
    "order.selectServiceType": "Select Service Type",
    "order.standard": "Standard",
    "order.fast": "Fast",
    "order.express": "Express",
    "order.standardDesc": "For regular items",
    "order.fastDesc": "Priority delivery",
    "order.expressDesc": "Same-day delivery",
    "order.back": "Back",
    "order.confirm": "Confirm",
    "order.success": "Order Created Successfully!",
    "order.trackingCode": "Tracking Code:",
    "order.service": "Service",
    "order.recipient": "Recipient",
    "order.totalFee": "Total Fee",
    "order.createNew": "Create New Order",
    "order.print": "Print Label",
    
    // Track Order
    "track.title": "Track Order",
    "track.search": "Search by tracking code or recipient name",
    "track.all": "All",
    "track.delivering": "Delivering",
    "track.delivered": "Delivered",
    "track.pending": "Pending",
    "track.noOrders": "No orders found",
    "track.orderDetails": "Order Details",
    "track.status": "Current Status",
    "track.recipientInfo": "Recipient Information",
    "track.orderInfo": "Order Details",
    "track.createdDate": "Created Date",
    "track.serviceType": "Service Type",
    "track.codAmount": "COD Amount",
    "track.timeline": "Shipping Timeline",
    "track.contact": "Contact",
    "track.qrCode": "View QR Code",
    
    // COD Management
    "cod.title": "COD Management",
    "cod.overview": "Overview",
    "cod.history": "History",
    "cod.withdraw": "Withdraw",
    "cod.available": "Available Balance",
    "cod.withdrawNow": "Withdraw Now",
    "cod.pending": "Pending",
    "cod.withdrawnMonth": "Withdrawn This Month",
    "cod.stats": "Statistics",
    "cod.totalOrders": "Total COD Orders",
    "cod.totalCollected": "Total Collected",
    "cod.serviceFee": "Service Fee",
    "cod.netAmount": "Net Amount",
    "cod.recentTrans": "Recent Transactions",
    "cod.transHistory": "Transaction History",
    "cod.filter": "Filter",
    "cod.selectAccount": "Select Account",
    "cod.amount": "Withdraw Amount",
    "cod.withdrawAll": "Withdraw All",
    "cod.note": "Note: Money will be transferred to your account within 1-2 working hours. Withdrawal fee: 0₫ for the first time each month.",
    "cod.confirmWithdraw": "Confirm Withdrawal",
    
    // Find Location
    "location.title": "Find Office",
    "location.search": "Search by name or address",
    "location.findNearby": "Find offices near me",
    "location.found": "Found",
    "location.offices": "offices",
    "location.details": "Office Details",
    "location.hours": "Working Hours",
    "location.distance": "Distance from you",
    "location.services": "Available Services",
    "location.call": "Call",
    "location.directions": "Directions",
    "location.open": "Open",
    
    // Promotions
    "promo.title": "Promotions",
    "promo.special": "Special Offers",
    "promo.save": "Save on shipping costs",
    "promo.totalSaved": "Total saved this month",
    "promo.available": "Available",
    "promo.used": "Used",
    "promo.points": "Points",
    "promo.current": "Current Promotions",
    "promo.code": "Promo Code",
    "promo.copy": "Copy",
    "promo.copied": "Copied",
    "promo.terms": "Terms & Conditions:",
    "promo.validUntil": "Valid Until:",
    "promo.refer": "Refer Friends",
    "promo.referDesc": "Get 50,000₫ for each successful referral",
    "promo.inviteNow": "Invite Now",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.close": "Close",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  const t = (key: string): string => {
  return (translations[language] as Record<string, string>)[key] || key;
};


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
