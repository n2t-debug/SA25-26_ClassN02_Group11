import { useState } from "react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Calendar,
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";

interface CODTransaction {
  id: string;
  orderId: string;
  recipient: string;
  amount: number;
  fee: number;
  net: number;
  date: string;
  status: "pending" | "available" | "withdrawn";
  statusText: string;
  statusColor: string;
}

export function CODManagementPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "transactions" | "withdraw">("overview");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("vietcombank");

  const codBalance = 2450000;
  const pendingAmount = 750000;
  const withdrawnThisMonth = 5200000;

  const transactions: CODTransaction[] = [
    {
      id: "COD001",
      orderId: "VTP987654321",
      recipient: "Trần Thị B",
      amount: 250000,
      fee: 5000,
      net: 245000,
      date: "05/02/2026 10:15",
      status: "available",
      statusText: "Khả dụng",
      statusColor: "text-green-600",
    },
    {
      id: "COD002",
      orderId: "VTP123456789",
      recipient: "Nguyễn Văn A",
      amount: 350000,
      fee: 7000,
      net: 343000,
      date: "05/02/2026 14:30",
      status: "pending",
      statusText: "Đang xử lý",
      statusColor: "text-orange-600",
    },
    {
      id: "COD003",
      orderId: "VTP456789123",
      recipient: "Lê Văn C",
      amount: 150000,
      fee: 3000,
      net: 147000,
      date: "04/02/2026 16:45",
      status: "available",
      statusColor: "text-green-600",
      statusText: "Khả dụng",
    },
  ];

  const handleWithdraw = () => {
    alert(`Yêu cầu rút ${parseInt(withdrawAmount).toLocaleString()}₫ đã được gửi!`);
    setWithdrawAmount("");
    setSelectedTab("overview");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Quản lý COD" />
      
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[60px] z-30">
        <div className="flex max-w-screen-xl mx-auto">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "overview"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setSelectedTab("transactions")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "transactions"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            Lịch sử
          </button>
          <button
            onClick={() => setSelectedTab("withdraw")}
            className={`flex-1 py-3 text-sm transition ${
              selectedTab === "withdraw"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600"
            }`}
          >
            Rút tiền
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {selectedTab === "overview" && (
        <div className="px-4 py-4">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-green-100 text-sm mb-2">Số dư khả dụng</p>
                  <p className="text-3xl">{codBalance.toLocaleString()}₫</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>
              <button
                onClick={() => setSelectedTab("withdraw")}
                className="w-full bg-white text-green-600 py-2.5 px-4 rounded-lg text-sm hover:bg-green-50 transition flex items-center justify-center gap-2"
              >
                Rút tiền ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <p className="text-xs text-gray-600">Đang chờ</p>
                </div>
                <p className="text-xl text-orange-600">{pendingAmount.toLocaleString()}₫</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-gray-600">Đã rút tháng này</p>
                </div>
                <p className="text-xl text-blue-600">{withdrawnThisMonth.toLocaleString()}₫</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <h3 className="text-base">Thống kê tháng 2/2026</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Tổng đơn COD</span>
                <span className="text-sm">23 đơn</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Tổng tiền thu hộ</span>
                <span className="text-sm text-green-600">7,650,000₫</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Phí dịch vụ</span>
                <span className="text-sm text-orange-600">-153,000₫</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Thực nhận</span>
                <span className="text-base text-red-600">7,497,000₫</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base">Giao dịch gần đây</h3>
              <button
                onClick={() => setSelectedTab("transactions")}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Xem tất cả
              </button>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm">{transaction.recipient}</p>
                      <p className="text-xs text-gray-500">{transaction.orderId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+{transaction.net.toLocaleString()}₫</p>
                    <p className="text-xs text-gray-500">{transaction.date.split(' ')[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {selectedTab === "transactions" && (
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base">Lịch sử giao dịch</h3>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
              <Filter className="w-4 h-4" />
              Lọc
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3 flex-1">
                    <div className={`${
                      transaction.status === "available" ? "bg-green-100" : "bg-orange-100"
                    } p-2.5 rounded-lg h-fit`}>
                      {transaction.status === "available" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">{transaction.recipient}</p>
                      <p className="text-xs text-gray-500 mb-2">Đơn: {transaction.orderId}</p>
                      <span className={`text-xs ${transaction.statusColor}`}>
                        ● {transaction.statusText}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base text-green-600 mb-1">
                      +{transaction.net.toLocaleString()}₫
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Thu hộ:</span>
                    <p className="text-gray-700">{transaction.amount.toLocaleString()}₫</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phí:</span>
                    <p className="text-orange-600">-{transaction.fee.toLocaleString()}₫</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Thực nhận:</span>
                    <p className="text-green-600">{transaction.net.toLocaleString()}₫</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Withdraw Tab */}
      {selectedTab === "withdraw" && (
        <div className="px-4 py-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Wallet className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm mb-1">Số dư khả dụng</p>
                <p className="text-2xl text-blue-600">{codBalance.toLocaleString()}₫</p>
                <p className="text-xs text-gray-600 mt-2">
                  Số tiền đang chờ xử lý: {pendingAmount.toLocaleString()}₫
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="text-base mb-4">Chọn tài khoản nhận tiền</h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedBank("vietcombank")}
                className={`w-full p-4 rounded-xl border-2 transition ${
                  selectedBank === "vietcombank"
                    ? "border-red-600 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      🏦
                    </div>
                    <div className="text-left">
                      <p className="text-sm">Vietcombank</p>
                      <p className="text-xs text-gray-600">**** **** 1234</p>
                    </div>
                  </div>
                  {selectedBank === "vietcombank" && (
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setSelectedBank("viettel")}
                className={`w-full p-4 rounded-xl border-2 transition ${
                  selectedBank === "viettel"
                    ? "border-red-600 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      💳
                    </div>
                    <div className="text-left">
                      <p className="text-sm">Ví Viettel Post</p>
                      <p className="text-xs text-gray-600">0912345678</p>
                    </div>
                  </div>
                  {selectedBank === "viettel" && (
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="text-base mb-4">Số tiền muốn rút</h3>
            <div className="relative mb-4">
              <input
                type="number"
                placeholder="0"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">₫</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[100000, 500000, 1000000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setWithdrawAmount(amount.toString())}
                  className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
                >
                  {(amount / 1000).toFixed(0)}K
                </button>
              ))}
            </div>

            <button
              onClick={() => setWithdrawAmount(codBalance.toString())}
              className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition"
            >
              Rút toàn bộ
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <p className="text-xs text-yellow-800">
              ⚠️ Lưu ý: Tiền sẽ được chuyển vào tài khoản trong 1-2 giờ làm việc. 
              Phí rút tiền: 0₫ cho lần đầu tiên mỗi tháng.
            </p>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={!withdrawAmount || parseInt(withdrawAmount) > codBalance}
            className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xác nhận rút tiền
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
