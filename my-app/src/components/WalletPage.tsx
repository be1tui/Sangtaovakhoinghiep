import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  CreditCard, 
  DollarSign,
  TrendingUp,
  History,
  Plus,
  Check,
  X,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  Zap,
  Star,
  Crown,
  Sparkles,
  ChevronRight,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'reward' | 'purchase';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method?: string;
}

interface TopUpPackage {
  id: string;
  amount: number;
  bonus: number;
  price: number;
  popular?: boolean;
  badge?: string;
}

type View = 'overview' | 'topup' | 'history';

interface WalletPageProps {
  initialView?: View;
}

export default function WalletPage({ initialView = 'overview' }: WalletPageProps) {
  const [currentView, setCurrentView] = useState<View>(initialView);
  const [balance, setBalance] = useState(1250000);
  const [bonusBalance, setBonusBalance] = useState(350000);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('momo');

  const topUpPackages: TopUpPackage[] = [
    {
      id: '1',
      amount: 50000,
      bonus: 0,
      price: 50000,
    },
    {
      id: '2',
      amount: 100000,
      bonus: 10000,
      price: 100000,
      badge: '+10%'
    },
    {
      id: '3',
      amount: 200000,
      bonus: 30000,
      price: 200000,
      popular: true,
      badge: '+15%'
    },
    {
      id: '4',
      amount: 500000,
      bonus: 100000,
      price: 500000,
      badge: '+20%'
    },
    {
      id: '5',
      amount: 1000000,
      bonus: 250000,
      price: 1000000,
      badge: '+25%'
    },
    {
      id: '6',
      amount: 2000000,
      bonus: 600000,
      price: 2000000,
      badge: '+30%'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 500000,
      description: 'Nạp tiền vào ví',
      status: 'completed',
      date: '2025-01-15T10:30:00',
      method: 'MoMo'
    },
    {
      id: '2',
      type: 'reward',
      amount: 50000,
      description: 'Thưởng hoàn thành thử thách',
      status: 'completed',
      date: '2025-01-14T15:20:00'
    },
    {
      id: '3',
      type: 'purchase',
      amount: -150000,
      description: 'Mua gói Premium 1 tháng',
      status: 'completed',
      date: '2025-01-13T09:15:00',
      method: 'Wallet'
    },
    {
      id: '4',
      type: 'deposit',
      amount: 200000,
      description: 'Nạp tiền vào ví',
      status: 'completed',
      date: '2025-01-12T14:45:00',
      method: 'ZaloPay'
    },
    {
      id: '5',
      type: 'reward',
      amount: 100000,
      description: 'Thưởng giới thiệu bạn bè',
      status: 'completed',
      date: '2025-01-11T11:30:00'
    },
    {
      id: '6',
      type: 'deposit',
      amount: 1000000,
      description: 'Nạp tiền vào ví',
      status: 'pending',
      date: '2025-01-15T16:00:00',
      method: 'Bank Transfer'
    },
    {
      id: '7',
      type: 'purchase',
      amount: -50000,
      description: 'Mua 5 lượt chơi thẻ bài',
      status: 'completed',
      date: '2025-01-10T13:20:00',
      method: 'Wallet'
    },
    {
      id: '8',
      type: 'deposit',
      amount: 300000,
      description: 'Nạp tiền vào ví',
      status: 'completed',
      date: '2025-01-08T10:10:00',
      method: 'MoMo'
    }
  ];

  const paymentMethods = [
    { id: 'momo', name: 'MoMo', icon: '📱', color: 'from-pink-500 to-red-500' },
    { id: 'zalopay', name: 'ZaloPay', icon: '💳', color: 'from-blue-500 to-cyan-500' },
    { id: 'vnpay', name: 'VNPay', icon: '🏦', color: 'from-orange-500 to-red-500' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏛️', color: 'from-green-500 to-emerald-500' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return ArrowDownRight;
      case 'withdrawal':
        return ArrowUpRight;
      case 'reward':
        return Gift;
      case 'purchase':
        return ArrowUpRight;
      default:
        return DollarSign;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'withdrawal':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'reward':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'purchase':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'failed':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleTopUp = (packageId: string) => {
    const selectedPkg = topUpPackages.find(p => p.id === packageId);
    if (!selectedPkg) return;

    const totalAmount = selectedPkg.amount + selectedPkg.bonus;
    const paymentMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);

    toast.success('Đang xử lý giao dịch...', {
      description: `Nạp ${formatCurrency(selectedPkg.price)} qua ${paymentMethod?.name}`
    });

    // Simulate payment processing
    setTimeout(() => {
      setBalance(balance + totalAmount);
      if (selectedPkg.bonus > 0) {
        setBonusBalance(bonusBalance + selectedPkg.bonus);
      }
      
      toast.success('Nạp tiền thành công! 🎉', {
        description: `+${formatCurrency(totalAmount)} (Bao gồm ${formatCurrency(selectedPkg.bonus)} bonus)`
      });
      
      setSelectedPackage(null);
      setCurrentView('overview');
    }, 2000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-light rounded-3xl p-8 border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#5B6CFF] to-[#7F7FD5] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 border-8 border-white rounded-full" />
            <div className="absolute bottom-10 left-10 w-24 h-24 border-8 border-white rounded-full" />
          </div>

          <div className="relative z-10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Số dư chính</p>
                <p className="text-xs opacity-75">Main Balance</p>
              </div>
            </div>
            
            <h2 className="mb-4">{formatCurrency(balance)}</h2>
            
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentView('topup')}
                className="bg-white text-[#5B6CFF] hover:bg-gray-100"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nạp tiền
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bonus Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card-light rounded-3xl p-8 border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-32 h-32 border-8 border-white rounded-full" />
            <div className="absolute bottom-10 left-10 w-24 h-24 border-8 border-white rounded-full" />
          </div>

          <div className="relative z-10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Số dư thưởng</p>
                <p className="text-xs opacity-75">Bonus Balance</p>
              </div>
            </div>
            
            <h2 className="mb-4">{formatCurrency(bonusBalance)}</h2>
            
            <p className="text-sm opacity-90">
              <Sparkles className="w-4 h-4 inline mr-1" />
              Nhận thêm bonus khi nạp tiền
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Tổng nạp</p>
          <h4>{formatCurrency(2000000)}</h4>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
            <History className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Giao dịch</p>
          <h4>{transactions.length}</h4>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Thưởng nhận</p>
          <h4>{formatCurrency(150000)}</h4>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-3">
            <Star className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Điểm thưởng</p>
          <h4>1,250 BP</h4>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h4>Giao dịch gần đây</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('history')}
          >
            Xem tất cả
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction, index) => {
            const Icon = getTransactionIcon(transaction.type);
            
            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-3 hover:bg-white/50 dark:hover:bg-black/20 rounded-xl transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p>{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {transaction.method && ` • ${transaction.method}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status === 'completed' && 'Hoàn thành'}
                    {transaction.status === 'pending' && 'Đang xử lý'}
                    {transaction.status === 'failed' && 'Thất bại'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTopUp = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="mb-2">Nạp Tiền Vào Ví</h3>
        <p className="text-muted-foreground">Chọn gói nạp và nhận thêm bonus hấp dẫn</p>
      </div>

      {/* Top-up Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topUpPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`glass-card-light rounded-2xl p-6 border-2 cursor-pointer transition-all ${
              selectedPackage === pkg.id
                ? 'border-[#5B6CFF] shadow-lg scale-105'
                : 'border-gray-200 dark:border-gray-800 hover:border-[#5B6CFF]/50'
            } ${pkg.popular ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                  Phổ biến nhất
                </span>
              </div>
            )}

            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                pkg.id === '6' ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600' :
                pkg.id === '5' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                pkg.id === '4' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]'
              }`}>
                {pkg.id === '6' ? <Crown className="w-8 h-8 text-white" /> :
                 pkg.id === '5' ? <Star className="w-8 h-8 text-white" /> :
                 <Zap className="w-8 h-8 text-white" />}
              </div>

              <h3 className="mb-2">{formatCurrency(pkg.amount)}</h3>
              
              {pkg.bonus > 0 && (
                <div className="mb-3">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm">
                    <Gift className="w-4 h-4 inline mr-1" />
                    +{formatCurrency(pkg.bonus)} Bonus
                  </span>
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-4">
                Tổng nhận: {formatCurrency(pkg.amount + pkg.bonus)}
              </p>

              {pkg.badge && (
                <p className="text-xs text-purple-500 mb-2">{pkg.badge} giá trị</p>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-lg">{formatCurrency(pkg.price)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Methods */}
      {selectedPackage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
        >
          <h5 className="mb-4">Chọn phương thức thanh toán</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPaymentMethod === method.id
                    ? 'border-[#5B6CFF] bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-800 hover:border-[#5B6CFF]/50'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-2xl`}>
                  {method.icon}
                </div>
                <p className="text-sm">{method.name}</p>
              </button>
            ))}
          </div>

          <Button
            onClick={() => handleTopUp(selectedPackage)}
            className="w-full bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]"
            size="lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Xác nhận nạp tiền
          </Button>
        </motion.div>
      )}

      {/* Bonus Info */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h5 className="mb-2">🎁 Ưu đãi đặc biệt</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Nạp từ 100K nhận thêm 10% bonus</li>
              <li>• Nạp từ 500K nhận thêm 20% bonus</li>
              <li>• Nạp từ 1M nhận thêm 25% bonus + thẻ rare</li>
              <li>• Nạp từ 2M nhận thêm 30% bonus + thẻ epic</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Lịch Sử Giao Dịch</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất file
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['Tất cả', 'Nạp tiền', 'Rút tiền', 'Thưởng', 'Mua hàng'].map((filter) => (
          <Button
            key={filter}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="glass-card-light rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left p-4 text-sm text-muted-foreground">Loại</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Mô tả</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Phương thức</th>
                <th className="text-left p-4 text-sm text-muted-foreground">Ngày</th>
                <th className="text-right p-4 text-sm text-muted-foreground">Số tiền</th>
                <th className="text-center p-4 text-sm text-muted-foreground">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                const Icon = getTransactionIcon(transaction.type);
                
                return (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-white/50 dark:hover:bg-black/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p>{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">#{transaction.id}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{transaction.method || '-'}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">
                        {new Date(transaction.date).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </td>
                    <td className="p-4 text-right">
                      <p className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status === 'completed' && <Check className="w-3 h-3" />}
                        {transaction.status === 'pending' && <Clock className="w-3 h-3" />}
                        {transaction.status === 'failed' && <X className="w-3 h-3" />}
                        {transaction.status === 'completed' && 'Hoàn thành'}
                        {transaction.status === 'pending' && 'Đang xử lý'}
                        {transaction.status === 'failed' && 'Thất bại'}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* View Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Tổng quan', icon: Wallet },
          { id: 'topup', label: 'Nạp tiền', icon: Plus },
          { id: 'history', label: 'Lịch sử', icon: History }
        ].map((view) => {
          const Icon = view.icon;
          return (
            <Button
              key={view.id}
              variant={currentView === view.id ? 'default' : 'outline'}
              onClick={() => setCurrentView(view.id as View)}
              className={currentView === view.id ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]' : ''}
            >
              <Icon className="w-4 h-4 mr-2" />
              {view.label}
            </Button>
          );
        })}
      </div>

      {/* Render Current View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'overview' && renderOverview()}
          {currentView === 'topup' && renderTopUp()}
          {currentView === 'history' && renderHistory()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}