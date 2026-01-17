import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Download, Calendar, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export default function AnalyticsPage() {
  // Task Completion Data
  const taskCompletionData = [
    { day: 'T2', completed: 8, total: 10 },
    { day: 'T3', completed: 12, total: 14 },
    { day: 'T4', completed: 10, total: 12 },
    { day: 'T5', completed: 9, total: 11 },
    { day: 'T6', completed: 11, total: 13 },
    { day: 'T7', completed: 7, total: 9 },
    { day: 'CN', completed: 5, total: 6 },
  ];

  // Energy Level Data
  const energyData = [
    { time: '6h', energy: 40 },
    { time: '9h', energy: 85 },
    { time: '12h', energy: 75 },
    { time: '15h', energy: 55 },
    { time: '18h', energy: 65 },
    { time: '21h', energy: 45 },
    { time: '24h', energy: 30 },
  ];

  // Task Categories Data
  const categoryData = [
    { name: 'Work', value: 45, color: '#5B6CFF' },
    { name: 'Personal', value: 25, color: '#7F7FD5' },
    { name: 'Health', value: 20, color: '#10B981' },
    { name: 'Learning', value: 10, color: '#FF8A00' },
  ];

  // Productivity Trend (Weekly comparison)
  const productivityTrend = [
    { week: 'W1', productivity: 65 },
    { week: 'W2', productivity: 72 },
    { week: 'W3', productivity: 78 },
    { week: 'W4', productivity: 85 },
  ];

  const totalTasks = taskCompletionData.reduce((acc, d) => acc + d.completed, 0);
  const avgEnergy = Math.round(energyData.reduce((acc, d) => acc + d.energy, 0) / energyData.length);
  const productivityGrowth = '+15%';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Analytics</h2>
          <p className="text-muted-foreground">Hiểu bản thân để tăng hiệu quả</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Tuần này
          </Button>
          <Button className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:from-[#4A5BEE] hover:to-[#6E6EC4] text-white gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Tasks tuần này</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl">{totalTasks}</p>
          <p className="text-xs text-green-500 mt-1">+12% so với tuần trước</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Năng lượng TB</span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl">{avgEnergy}%</p>
          <p className="text-xs text-purple-500 mt-1">Peak: 9h - 12h</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Focus time</span>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl">28.5h</p>
          <p className="text-xs text-blue-500 mt-1">+3.2h so với tuần trước</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card-light rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Năng suất</span>
            <TrendingUp className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl">{productivityGrowth}</p>
          <p className="text-xs text-orange-500 mt-1">Tăng đều đặn 4 tuần</p>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-light rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="mb-2">💡 AI Analysis</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Năng lượng của bạn giảm mạnh sau 15h (từ 75% xuống 55%). Gợi ý:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Sắp xếp công việc quan trọng trong khung giờ 9h-12h (năng lượng peak 85%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Nghỉ ngơi 15-20 phút sau bữa trưa để phục hồi năng lượng</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <span>Task đơn giản nên để buổi chiều (admin, email, review)</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Task Completion Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card-light rounded-3xl p-6"
        >
          <h4 className="mb-6">📊 Task Completion (Tuần này)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="day" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="completed" fill="url(#colorCompleted)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="total" fill="rgba(200, 200, 200, 0.3)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B6CFF" />
                  <stop offset="100%" stopColor="#7F7FD5" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Energy Level Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-light rounded-3xl p-6"
        >
          <h4 className="mb-6">⚡ Năng lượng trong ngày</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="time" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="url(#energyGradient)" 
                strokeWidth={3}
                dot={{ fill: '#5B6CFF', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
              <defs>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5B6CFF" />
                  <stop offset="50%" stopColor="#7F7FD5" />
                  <stop offset="100%" stopColor="#FF8A00" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Task Categories Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card-light rounded-3xl p-6"
        >
          <h4 className="mb-6">📁 Phân loại Task</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                label={({ name, percent }) =>
                  `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : '0'}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categoryData.map((cat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-sm">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Productivity Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card-light rounded-3xl p-6"
        >
          <h4 className="mb-6">📈 Xu hướng năng suất (4 tuần)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="week" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="productivity" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-sm text-green-700 dark:text-green-300">
              🎉 Tuyệt vời! Năng suất của bạn đang tăng đều đặn. Tiếp tục duy trì!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Compare & Predict Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card-light rounded-3xl p-6"
        >
          <h4 className="mb-4">🔄 So sánh tuần</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
              <span className="text-sm">Tasks hoàn thành</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tuần trước: 56</span>
                <span className="text-sm">→</span>
                <span className="text-sm">Tuần này: 62</span>
                <span className="text-xs text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">+10.7%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
              <span className="text-sm">Focus time</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tuần trước: 25.3h</span>
                <span className="text-sm">→</span>
                <span className="text-sm">Tuần này: 28.5h</span>
                <span className="text-xs text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">+12.6%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
              <span className="text-sm">Streak</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Tuần trước: 12 ngày</span>
                <span className="text-sm">→</span>
                <span className="text-sm">Tuần này: 19 ngày</span>
                <span className="text-xs text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">+58.3%</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card-light rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
          <div className="relative">
            <h4 className="mb-4">🔮 Dự đoán tuần tới</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  <span>AI Prediction</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dựa trên xu hướng hiện tại, bạn có thể hoàn thành <span className="text-blue-600 dark:text-blue-400">68-72 tasks</span> tuần tới 
                  và đạt <span className="text-blue-600 dark:text-blue-400">92% năng suất</span>.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <span className="text-sm">💡 Gợi ý:</span>
                <p className="text-sm text-muted-foreground mt-2">
                  Để đạt mục tiêu này, hãy duy trì thói quen buổi sáng và tập trung vào deep work 9h-12h.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
