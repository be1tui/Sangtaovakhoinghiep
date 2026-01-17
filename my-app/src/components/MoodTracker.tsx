import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Music, Coffee, Wind } from 'lucide-react';
import { Button } from '../ui/button';

interface Mood {
  id: string;
  emoji: string;
  label: string;
  value: number;
}

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<number[]>([4, 5, 3, 5, 4, 5, 4]);

  const moods: Mood[] = [
    { id: 'amazing', emoji: '🤩', label: 'Tuyệt vời', value: 5 },
    { id: 'good', emoji: '😊', label: 'Tốt', value: 4 },
    { id: 'okay', emoji: '😐', label: 'Bình thường', value: 3 },
    { id: 'bad', emoji: '😟', label: 'Không tốt', value: 2 },
    { id: 'terrible', emoji: '😢', label: 'Tệ', value: 1 }
  ];

  const boostActivities = [
    {
      id: 1,
      title: 'Nghe nhạc thư giãn',
      subtitle: 'Lo-fi playlist 30 phút',
      icon: Music,
      color: 'from-pink-500 to-rose-500',
      action: 'Phát nhạc'
    },
    {
      id: 2,
      title: 'Nghỉ ngơi ngắn',
      subtitle: 'Power nap 15 phút',
      icon: Coffee,
      color: 'from-amber-500 to-orange-500',
      action: 'Bắt đầu'
    },
    {
      id: 3,
      title: 'Thở sâu',
      subtitle: 'Thư giãn 5 phút',
      icon: Wind,
      color: 'from-green-500 to-emerald-500',
      action: 'Thử ngay'
    }
  ];

  const handleMoodSelect = (moodId: string, value: number) => {
    setSelectedMood(moodId);
    const newHistory = [...moodHistory];
    newHistory.push(value);
    if (newHistory.length > 7) newHistory.shift();
    setMoodHistory(newHistory);
  };

  const averageMood = moodHistory.reduce((a, b) => a + b, 0) / moodHistory.length;
  const moodTrend = moodHistory[moodHistory.length - 1] > moodHistory[0] ? 'up' : 'down';

  return (
    <div className="space-y-6">
      {/* Current Mood Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-light rounded-3xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4>Cảm xúc hôm nay thế nào? 💭</h4>
            <p className="text-sm text-muted-foreground">Chọn trạng thái hiện tại của bạn</p>
          </div>
          <Sparkles className="w-6 h-6 text-purple-500" />
        </div>

        {/* Mood Options */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {moods.map((mood) => (
            <motion.button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id, mood.value)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                selectedMood === mood.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-110'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
              }`}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="text-xs text-center">{mood.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Mood Chart */}
        <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm">7 ngày qua</span>
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-4 h-4 ${moodTrend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              <span className="text-sm">
                TB: {averageMood.toFixed(1)}/5
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-24">
            {moodHistory.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 5) * 100}%` }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full rounded-lg ${
                    value >= 4 ? 'bg-gradient-to-t from-green-400 to-green-500' :
                    value >= 3 ? 'bg-gradient-to-t from-blue-400 to-blue-500' :
                    'bg-gradient-to-t from-orange-400 to-orange-500'
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Mood Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card-light rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5>💡 AI Mood Insights</h5>
              <p className="text-sm text-muted-foreground mt-1">
                {averageMood >= 4 
                  ? 'Tuyệt vời! Bạn đang duy trì trạng thái tích cực. Hãy tiếp tục thói quen buổi sáng và giữ cân bằng công việc - nghỉ ngơi.'
                  : averageMood >= 3
                  ? 'Bạn đang ở mức ổn định. Tôi nhận thấy năng lượng giảm vào buổi chiều. Hãy thử nghỉ ngơi 15 phút sau bữa trưa để phục hồi.'
                  : 'Có vẻ bạn đang gặp áp lực. Hãy giảm bớt task, tập trung vào 2-3 việc quan trọng nhất và dành thời gian chăm sóc bản thân.'
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mood Boost Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card-light rounded-3xl p-6"
      >
        <h5 className="mb-4">🌈 Boost năng lượng ngay</h5>
        <div className="space-y-3">
          {boostActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-2xl bg-gradient-to-r ${activity.color} hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white">{activity.title}</p>
                      <p className="text-xs text-white/80">{activity.subtitle}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    variant="outline"
                  >
                    {activity.action}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
