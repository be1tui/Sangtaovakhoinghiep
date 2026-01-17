import { motion } from 'framer-motion';
import { Flame, TrendingUp, Target } from 'lucide-react';

export default function StreakWidget() {
  const streakDays = 19;
  const weekData = [
    { day: 'T2', completed: true },
    { day: 'T3', completed: true },
    { day: 'T4', completed: true },
    { day: 'T5', completed: true },
    { day: 'T6', completed: true },
    { day: 'T7', completed: false },
    { day: 'CN', completed: false }
  ];
  const todayIndex = new Date().getDay() - 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card-light rounded-3xl p-6 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              Streak
            </h4>
            <p className="text-sm text-muted-foreground">Duy trì mỗi ngày</p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl gradient-text">{streakDays}</span>
              <span className="text-sm text-muted-foreground">ngày</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>Streak kỷ lục: 25 ngày</span>
            </div>
          </div>
        </div>

        {/* Week Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2">
            {weekData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full aspect-square rounded-xl transition-all ${
                    item.completed
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 scale-110'
                      : index === todayIndex
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 ring-2 ring-blue-300 dark:ring-blue-700'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {item.completed && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-xl">🔥</span>
                    </div>
                  )}
                  {index === todayIndex && !item.completed && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-white/50 dark:bg-black/20 rounded-xl text-center">
            <p className="text-xl">5/7</p>
            <p className="text-xs text-muted-foreground">Tuần này</p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-black/20 rounded-xl text-center">
            <p className="text-xl">85%</p>
            <p className="text-xs text-muted-foreground">Hoàn thành</p>
          </div>
          <div className="p-3 bg-white/50 dark:bg-black/20 rounded-xl text-center">
            <p className="text-xl">Top 10%</p>
            <p className="text-xs text-muted-foreground">Xếp hạng</p>
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
          <p className="text-sm text-center">
            <span className="text-orange-600 dark:text-orange-400">🎯 Mục tiêu:</span> Hoàn thành 2 task hôm nay để giữ streak!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
