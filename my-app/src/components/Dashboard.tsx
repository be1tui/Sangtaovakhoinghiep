import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, Music, Wind, Heart, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import VoiceCommand from './VoiceCommand';
import StreakWidget from './StreakWidget';

interface DashboardProps {
  userName: string;
}

export default function Dashboard({ userName }: DashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Chào buổi sáng' : currentHour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';
  const energyLevel = 100;
  const tasksCompleted = 8;
  const totalTasks = 12;
  const streakDays = 5;

  const aiSuggestions = [
    { 
      id: 1, 
      title: 'Hoàn thành báo cáo Q4', 
      time: '9:00 - 11:00',
      priority: 'high',
      icon: '🔥'
    },
    { 
      id: 2, 
      title: 'Họp team brainstorm', 
      time: '14:00 - 15:30',
      priority: 'medium',
      icon: '😌'
    },
    { 
      id: 3, 
      title: 'Review code pull request', 
      time: '16:00 - 17:00',
      priority: 'medium',
      icon: '💻'
    }
  ];

  const moodBoosts = [
    { id: 1, title: 'Nhạc tập trung', subtitle: 'Lo-fi 5 bản gợi ý', icon: Music, color: 'from-pink-500 to-rose-500' },
    { id: 2, title: 'Breathing Break', subtitle: 'Thư giãn 3 phút', icon: Wind, color: 'from-green-500 to-emerald-500' },
    { id: 3, title: 'Quote động viên', subtitle: '"Small progress is still progress"', icon: Heart, color: 'from-amber-500 to-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="flex items-center gap-2">
            {greeting}, {userName} 🌞
          </h2>
          <p className="text-muted-foreground">
            Hôm nay là ngày tuyệt vời để đạt mục tiêu của bạn!
          </p>
        </div>
      </motion.div>

      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Thẻ tổng quan về năng lượng */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card-light rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h4>Năng lượng</h4>
            <Zap className="w-6 h-6 text-[#5B6CFF]" />
          </div>

          <div className="flex items-center justify-center my-8">
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - energyLevel / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5B6CFF" />
                    <stop offset="50%" stopColor="#7F7FD5" />
                    <stop offset="100%" stopColor="#FF8A00" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="gradient-text">{energyLevel}%</span>
              </div>
            </div>
          </div> 

          {/* AI Energy Message */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            className="group relative mt-2 rounded-2xl p-[1.5px] bg-gradient-to-r from-[#5B6CFF]/60 via-[#7F7FD5]/60 to-[#FF8A00]/60 hover:from-[#5B6CFF] hover:via-[#7F7FD5] hover:to-[#FF8A00] transition-colors duration-300"
          >
            <div className="flex items-start gap-4 rounded-2xl p-4 bg-white/70 dark:bg-black/25 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm group-hover:shadow-md transition-all">
              <div className="relative shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#5B6CFF] via-[#7F7FD5] to-[#FF8A00] ring-1 ring-white/30 dark:ring-white/10 flex items-center justify-center shadow-inner">
                <span className="absolute inset-0 rounded-full bg-[#5B6CFF]/25 blur-md animate-ping" aria-hidden="true"></span>
                <span className="relative">
                  <motion.span
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block"
                  >
                    <Sparkles className="w-6 h-6 text-white drop-shadow" />
                  </motion.span>
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-snug">
                  Chào mừng bạn thức dậy với
                  <span className="mx-1 bg-gradient-to-r from-[#5B6CFF] to-[#FF8A00] bg-clip-text text-transparent">{energyLevel}% năng lượng</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">Hãy làm việc hiệu quả để có một ngày tích cực ✨</p>
              </div>
            </div>
          </motion.div>
   
        </motion.div>

        {/* Bảng tăng cường AI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card-light rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <h4>Nhiệm vụ hôm nay</h4>
            <Target className="w-6 h-6 text-[#5B6CFF]" />
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Tiến độ</span>
              <span>{Math.round((tasksCompleted / totalTasks) * 100)}%</span>
            </div>
            <Progress value={(tasksCompleted / totalTasks) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {totalTasks - tasksCompleted} nhiệm vụ còn lại
            </p>
          </div>

          {/* AI Suggested Tasks */}
          <div className="space-y-3">
            {aiSuggestions.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-xl hover:bg-white/80 dark:hover:bg-black/30 transition-colors cursor-pointer group"
              >
                {task.priority === 'high' && (
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mt-2 group-hover:scale-125 transition-transform">
                    <span className="absolute -ml-1 -mt-1 text-xs">⚡</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span>{task.icon}</span>
                    <p className="text-sm truncate">{task.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">⏰ {task.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button className="w-full mt-4 bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:from-[#4A5BEE] hover:to-[#6E6EC4] text-white shadow-lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Boost Now
          </Button>
        </motion.div>

        {/* Mood Boost Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card-light rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <h4>Mood Boost 🧘</h4>
            <Heart className="w-6 h-6 text-[#FF8A00]" />
          </div>
          
          {/* AI Mood Message */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            className="group relative mt-4 mb-4 rounded-lg p-[1px] bg-gradient-to-r from-[#FF8A00]/60 via-[#FFB24D]/60 to-[#7F7FD5]/60 hover:from-[#FF8A00] hover:via-[#FFB24D] hover:to-[#7F7FD5] transition-colors duration-300"
          >
            <div className="flex items-center gap-3 rounded-lg p-3 bg-white/70 dark:bg-black/25 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm group-hover:shadow-md transition-all">
              <div className="relative shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF8A00] via-[#FFB24D] to-[#7F7FD5] ring-1 ring-white/30 dark:ring-white/10 flex items-center justify-center shadow-inner">
                <span className="absolute inset-0 rounded-full bg-[#FF8A00]/30 blur-md animate-ping" aria-hidden="true"></span>
                <span className="relative">
                  <motion.span
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block"
                  >
                    <Sparkles className="w-5 h-5 text-white drop-shadow" />
                  </motion.span>
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-medium leading-[14px]">
                  Làm việc mệt mỏi? Hãy làm theo
                  <span className="mx-1 bg-gradient-to-r from-[#FF8A00] to-[#7F7FD5] bg-clip-text text-transparent font-semibold">Mood Boost</span>
                  để có vài phút thư giãn giúp lấy lại năng lượng và động lực làm việc ✨
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            {moodBoosts.map((boost, index) => {
              const Icon = boost.icon;
              return (
                <motion.button
                  key={boost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`w-full p-4 rounded-2xl bg-gradient-to-r ${boost.color} text-white hover:scale-105 transition-transform cursor-pointer text-left`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{boost.title}</p>
                      <p className="text-xs opacity-90 mt-1">{boost.subtitle}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

        </motion.div>

        {/* Streak Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <StreakWidget />
        </motion.div>
      </div>

      {/* Buidc, cảo năng lưỡng! Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card-light rounded-3xl p-6 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4>Khung giờ năng lượng cao</h4>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">9h–11h</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Bạn thường xuyên tập trung trong khung giờ này. Tập trung để đạt hiệu suất cao nhất! 🚀
              </p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
            Xem thêm
          </Button>
        </div>
      </motion.div>

      {/* Progress Tracker & Voice Command */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {[
            { label: 'Tasks hôm nay', value: `${tasksCompleted}/${totalTasks}`, icon: CheckCircle2, color: 'text-green-500' },
            { label: 'Thời gian tập trung', value: '4h 32m', icon: Zap, color: 'text-blue-500' },
            { label: 'Streak hiện tại', value: `${streakDays} ngày`, icon: TrendingUp, color: 'text-orange-500' },
            { label: 'Năng suất', value: '+15%', icon: Sparkles, color: 'text-purple-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="glass-card-light rounded-2xl p-4 hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl">{stat.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Voice Command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <VoiceCommand />
        </motion.div>
      </div>
    </div>
  );
}
