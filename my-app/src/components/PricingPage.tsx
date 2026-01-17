import { motion } from 'framer-motion';
import { Check, Sparkles, Users, Zap, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { useState } from 'react';

const BUSINESS_UNLOCKED_STORAGE_KEY = 'dailyboost:businessUnlocked';
const BUSINESS_UNLOCKED_EVENT = 'dailyboost:business-unlocked';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [businessSeats, setBusinessSeats] = useState(5);

  // Currency helper: format VND for vi-VN
  const formatVND = (amount: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(Math.round(amount));

  // Fixed monthly pricing (VND)
  const PREMIUM_MONTHLY_VND = 199000;
  const PREMIUM_YEARLY_VND = Math.round(PREMIUM_MONTHLY_VND * 12 * 0.85);
  const BUSINESS_YEARLY_PER_SEAT_VND = 799000;
  const PREMIUM_SAVINGS_PERCENT = 15;

  const plans = [
    {
      name: 'Free',
      icon: Sparkles,
      color: 'from-gray-400 to-gray-500',
      price: 0,
      description: 'Dùng thử các tính năng cơ bản',
      features: [
        { text: 'Task & Habit cơ bản', included: true },
        { text: 'Thống kê cơ bản', included: true },
        { text: 'AI minimal', included: true },
        { text: 'Analytics cơ bản', included: true },
        { text: 'Gamification', included: false },
        { text: 'AI Personalization', included: false },
        { text: 'Export & Share', included: false },
        { text: 'Team collaboration', included: false }
      ],
      cta: 'Bắt đầu miễn phí',
      popular: false
    },
    {
      name: 'Premium',
      icon: Zap,
      color: 'from-[#5B6CFF] to-[#7F7FD5]',
      price: isYearly ? PREMIUM_YEARLY_VND : PREMIUM_MONTHLY_VND,
      period: isYearly ? '/năm' : '/tháng',
      description: 'Mở khóa toàn bộ tính năng AI và phân tích chuyên sâu',
      features: [
        { text: 'Tất cả tính năng Free', included: true },
        { text: 'AI Full & Pomodoro', included: true },
        { text: 'Predictive Analytics', included: true },
        { text: 'Unlimited tasks', included: true },
        { text: 'Gamification đầy đủ', included: true },
        { text: 'AI Personalization', included: true },
        { text: 'Export PDF & Share', included: true },
        { text: 'Chia sẻ nhỏ (3 người)', included: true }
      ],
      cta: 'Nâng cấp Premium',
      popular: true,
      badge: 'Most Popular'
    },
    {
      name: 'Business',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      price: BUSINESS_YEARLY_PER_SEAT_VND,
      period: '/năm',
      description: 'Dành cho doanh nghiệp (dashboard đội nhóm)',
      features: [
        { text: 'Tất cả tính năng Premium', included: true },
        { text: 'Team AI Assistant', included: true },
        { text: 'Team Analytics & KPI', included: true },
        { text: 'Team dashboard', included: true },
        { text: 'Leaderboard & Challenges', included: true },
        { text: 'Priority support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Admin controls', included: true }
      ],
      cta: 'Nâng cấp Business',
      popular: false,
      customSeats: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-2">Chọn gói phù hợp với bạn</h2>
          <p className="text-muted-foreground mb-6">
            Nâng cấp để mở khóa toàn bộ sức mạnh của AI
          </p>
        </motion.div>

        {/* Yearly Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-3 glass-card-light px-6 py-3 rounded-full"
        >
          <span
            className={`text-sm ${!isYearly ? '' : 'text-muted-foreground'} cursor-pointer`}
            onClick={() => setIsYearly(false)}
          >
            Hàng tháng
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={`text-sm ${isYearly ? '' : 'text-muted-foreground'} cursor-pointer`}
            onClick={() => setIsYearly(true)}
          >
            Hàng năm
          </span>
          {isYearly && (
            <span className="ml-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs">
              Tiết kiệm {PREMIUM_SAVINGS_PERCENT}%
            </span>
          )}
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`glass-card-light rounded-3xl p-6 relative ${
                plan.popular ? 'ring-2 ring-[#5B6CFF] shadow-2xl scale-105 md:scale-110' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white px-4 py-1 rounded-full text-sm shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                {plan.price === 0 ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl">Miễn phí</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl">{formatVND(plan.price)}</span>
                    {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                  </div>
                )}
                {plan.customSeats && (
                  <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Số người dùng</span>
                      <span className="text-sm">{businessSeats}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBusinessSeats(Math.max(5, businessSeats - 1))}
                        className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        -
                      </button>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                          style={{ width: `${Math.min((businessSeats / 20) * 100, 100)}%` }}
                        />
                      </div>
                      <button
                        onClick={() => setBusinessSeats(Math.min(20, businessSeats + 1))}
                        className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatVND(plan.price * businessSeats)}{plan.period} cho {businessSeats} người dùng
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => {
                  if (plan.name === 'Business') {
                    localStorage.setItem(BUSINESS_UNLOCKED_STORAGE_KEY, 'true');
                    window.dispatchEvent(new Event(BUSINESS_UNLOCKED_EVENT));
                  }
                }}
                className={`w-full mb-6 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:from-[#4A5BEE] hover:to-[#6E6EC4] text-white shadow-lg'
                    : plan.name === 'Business'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {plan.popular && <Crown className="w-4 h-4 mr-2" />}
                {plan.cta}
              </Button>

              {/* Features List */}
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${
                      !feature.included ? 'opacity-40' : ''
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.included
                          ? plan.popular
                            ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]'
                            : plan.name === 'Business'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                            : 'bg-gray-400'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <span className="text-xs text-white">×</span>
                      )}
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ or Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card-light rounded-3xl p-8 max-w-4xl mx-auto text-center"
      >
        <Sparkles className="w-10 h-10 text-purple-500 mx-auto mb-4" />
        <h4 className="mb-2">Cần tư vấn thêm?</h4>
        <p className="text-sm text-muted-foreground mb-6">
          Hãy để team chúng tôi giúp bạn chọn gói phù hợp nhất với nhu cầu của mình
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline">Đặt lịch Demo</Button>
          <Button className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:from-[#4A5BEE] hover:to-[#6E6EC4] text-white">
            Liên hệ Sales
          </Button>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm text-muted-foreground"
      >
        <p className="mb-4">Được tin dùng bởi 10,000+ người dùng trên toàn cầu</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <span className="flex items-center gap-2">✓ Hoàn tiền trong 30 ngày</span>
          <span className="flex items-center gap-2">✓ Hủy bất kỳ lúc nào</span>
          <span className="flex items-center gap-2">✓ Bảo mật SSL</span>
          <span className="flex items-center gap-2">✓ Support 24/7</span>
        </div>
      </motion.div>
    </div>
  );
}
