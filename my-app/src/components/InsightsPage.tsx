import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Brain, TrendingUp, Award } from 'lucide-react';
import { Button } from '../ui/button';
import MoodTracker from './MoodTracker';

interface Habit {
  id: number;
  name: string;
  category: 'work' | 'mind' | 'health';
  icon: string;
  streak: number;
  completedDays: number[];
  total: number;
}

export default function InsightsPage() {
  const habits: Habit[] = [
    { id: 1, name: 'Morning Exercise', category: 'health', icon: '🏃', streak: 5, completedDays: [1, 2, 3, 4, 5], total: 7 },
    { id: 2, name: 'Deep Work 2h', category: 'work', icon: '💼', streak: 3, completedDays: [1, 2, 5], total: 7 },
    { id: 3, name: 'Meditation 10min', category: 'mind', icon: '🧘', streak: 7, completedDays: [1, 2, 3, 4, 5, 6, 7], total: 7 },
    { id: 4, name: 'Reading 30min', category: 'mind', icon: '📚', streak: 4, completedDays: [2, 3, 4, 5], total: 7 },
    { id: 5, name: 'Drink 2L water', category: 'health', icon: '💧', streak: 6, completedDays: [1, 2, 3, 4, 5, 6], total: 7 },
    { id: 6, name: 'No social media', category: 'mind', icon: '📱', streak: 2, completedDays: [4, 5], total: 7 },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'from-blue-500 to-cyan-500';
      case 'mind': return 'from-purple-500 to-pink-500';
      case 'health': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work': return <Zap className="w-4 h-4" />;
      case 'mind': return <Brain className="w-4 h-4" />;
      case 'health': return <Heart className="w-4 h-4" />;
    }
  };

  const totalHabits = habits.length;
  const activeStreak = Math.max(...habits.map(h => h.streak));
  const completionRate = Math.round((habits.reduce((acc, h) => acc + h.completedDays.length, 0) / (habits.length * 7)) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Insights</h2>
        <p className="text-muted-foreground">Xây dựng thói quen bền vững với AI</p>
      </div>

      {/* Mood Tracker */}
      <MoodTracker />

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Thói quen</span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl">{totalHabits}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Streak dài nhất</span>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl">{activeStreak} ngày</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Hoàn thành</span>
            <Award className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl">{completionRate}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Cấp độ</span>
            <Award className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl">Level 12</p>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-light rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="mb-2">💡 AI Insight của tuần này</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Bạn có xu hướng giữ thói quen tốt vào buổi sáng (95% completion). Tuy nhiên, sau 3PM bạn dễ mất tập trung và bỏ lỡ thói quen "Reading". 
              Gợi ý: Đặt alarm 15:00 và tạo môi trường yên tĩnh để đọc sách.
            </p>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
              Áp dụng gợi ý
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Habits Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card-light rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(habit.category)} opacity-0 group-hover:opacity-10 transition-opacity`} />
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(habit.category)} rounded-2xl flex items-center justify-center text-2xl`}>
                    {habit.icon}
                  </div>
                  <div>
                    <h5>{habit.name}</h5>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(habit.category)} text-white text-xs mt-1`}>
                      {getCategoryIcon(habit.category)}
                      {habit.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-500">
                    <span className="text-2xl">🔥</span>
                    <span>{habit.streak}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">days streak</p>
                </div>
              </div>

              {/* Heatmap */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Tuần này</span>
                  <span>{habit.completedDays.length}/{habit.total} ngày</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => {
                    const isCompleted = habit.completedDays.includes(i + 1);
                    return (
                      <div key={i} className="text-center">
                        <div
                          className={`w-full aspect-square rounded-lg transition-all ${
                            isCompleted
                              ? `bg-gradient-to-br ${getCategoryColor(habit.category)} scale-110`
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{day}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(habit.completedDays.length / habit.total) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full bg-gradient-to-r ${getCategoryColor(habit.category)}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gamification Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-light rounded-3xl p-6"
      >
        <h4 className="mb-6">🏆 Thành tích & Phần thưởng</h4>
        
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { badge: '🌟', name: 'Early Bird', desc: 'Hoàn thành 5 ngày liên tiếp buổi sáng', unlocked: true },
            { badge: '💪', name: 'Iron Will', desc: 'Duy trì 1 thói quen 30 ngày', unlocked: true },
            { badge: '🔥', name: 'Fire Streak', desc: '7 ngày streak hoàn hảo', unlocked: true },
            { badge: '🎯', name: 'Focus Master', desc: '100h deep work', unlocked: false },
            { badge: '🧘', name: 'Zen Master', desc: '50 phiên thiền', unlocked: false },
            { badge: '📚', name: 'Book Worm', desc: 'Đọc 10 cuốn sách', unlocked: false },
          ].map((badge, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border-2 transition-all ${
                badge.unlocked
                  ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'border-gray-200 dark:border-gray-700 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{badge.badge}</div>
              <h5 className="mb-1">{badge.name}</h5>
              <p className="text-xs text-muted-foreground">{badge.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-light rounded-3xl p-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="relative">
          <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-4" />
          <h4 className="gradient-text mb-2">"Small progress is still progress"</h4>
          <p className="text-sm text-muted-foreground">
            Mỗi bước nhỏ đều đưa bạn đến gần hơn với mục tiêu của mình. Hãy tiếp tục! 💪
          </p>
        </div>
      </motion.div>
    </div>
  );
}
