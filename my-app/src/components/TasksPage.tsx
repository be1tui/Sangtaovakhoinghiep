import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Sparkles, Flame, Moon, Smile, Clock, Trash2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';

interface Task {
  id: number;
  title: string;
  note: string;
  priority: 'high' | 'medium' | 'low';
  mood: string;
  time: string;
  completed: boolean;
  isAI?: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Hoàn thành báo cáo Q4', note: 'Cần review trước khi gửi', priority: 'high', mood: '🔥', time: '9:00 - 11:00', completed: false, isAI: true },
    { id: 2, title: 'Họp team brainstorm', note: 'Chuẩn bị ý tưởng mới', priority: 'medium', mood: '😌', time: '14:00 - 15:30', completed: false },
    { id: 3, title: 'Review code pull request', note: '', priority: 'medium', mood: '💻', time: '16:00 - 17:00', completed: false },
    { id: 4, title: 'Thiền 10 phút', note: 'Thư giãn cuối ngày', priority: 'low', mood: '🌙', time: '20:00', completed: true },
  ]);

  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [newTask, setNewTask] = useState({
    title: '',
    note: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    mood: '😌',
    time: ''
  });

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        if (!task.completed) {
          // Confetti effect
          toast.success('Task hoàn thành! 🎉', {
            description: 'Bạn đang tiến bộ tuyệt vời!',
            duration: 3000
          });
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Đã xóa task');
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        note: newTask.note,
        priority: newTask.priority,
        mood: newTask.mood,
        time: newTask.time,
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', note: '', priority: 'medium', mood: '😌', time: '' });
      setIsAddDialogOpen(false);
      toast.success('Task đã được thêm! ✨');
    }
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.priority === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-blue-500 to-cyan-500';
      case 'low': return 'from-purple-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flame className="w-4 h-4" />;
      case 'medium': return <Smile className="w-4 h-4" />;
      case 'low': return <Moon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Schedule</h2>
          <p className="text-muted-foreground">Quản lý task thông minh với AI</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:from-[#4A5BEE] hover:to-[#6E6EC4] text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Task
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card-light border-none">
            <DialogHeader>
              <DialogTitle>Tạo Task Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm">Tiêu đề</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Nhập tên task..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm">Ghi chú</label>
                <Textarea
                  value={newTask.note}
                  onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
                  placeholder="Thêm ghi chú..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm">Thời gian</label>
                <Input
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  placeholder="VD: 9:00 - 11:00"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm">Độ ưu tiên</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(['high', 'medium', 'low'] as const).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setNewTask({ ...newTask, priority })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        newTask.priority === priority
                          ? 'border-[#5B6CFF] bg-[#5B6CFF]/10'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {getPriorityIcon(priority)}
                        <span className="text-sm capitalize">{priority}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm">Mood</label>
                <div className="flex gap-2 mt-1">
                  {['🔥', '😌', '💻', '🌙', '❤️', '🎯'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewTask({ ...newTask, mood: emoji })}
                      className={`w-12 h-12 rounded-xl border-2 transition-all ${
                        newTask.mood === emoji
                          ? 'border-[#5B6CFF] bg-[#5B6CFF]/10 scale-110'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddTask} className="w-full bg-[#5B6CFF] hover:bg-[#4A5BEE]">
                Tạo Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <div className="flex gap-2">
          {(['all', 'high', 'medium', 'low'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === filterType
                  ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filterType === 'all' ? 'Tất cả' : filterType}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card-light rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer ${
                task.completed ? 'opacity-60' : ''
              }`}
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleComplete(task.id);
                  }}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                      : 'border-gray-300 dark:border-gray-600 hover:border-[#5B6CFF]'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      {task.isAI && (
                        <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${task.completed ? 'line-through' : ''}`}>
                        {task.mood} {task.title}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityColor(task.priority)} text-white text-xs flex items-center gap-1`}>
                      {getPriorityIcon(task.priority)}
                      {task.priority}
                    </div>
                  </div>
                  
                  {task.time && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {task.time}
                    </div>
                  )}
                  
                  {task.note && (
                    <p className="text-xs text-muted-foreground mt-2">{task.note}</p>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không có task nào 🎉</p>
        </div>
      )}

      {/* Task Detail Dialog */}
      {selectedTask && (
        <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent className="glass-card-light border-none">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedTask.mood} {selectedTask.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-muted-foreground">Thời gian</label>
                <p className="mt-1">{selectedTask.time || 'Chưa đặt'}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Ghi chú</label>
                <p className="mt-1">{selectedTask.note || 'Không có ghi chú'}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Độ ưu tiên</label>
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityColor(selectedTask.priority)} text-white text-sm mt-1`}>
                  {selectedTask.priority}
                </div>
              </div>
              {selectedTask.isAI && (
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm">💡 AI Suggestion</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Đây là thời điểm năng lượng cao của bạn. Tập trung vào task này sẽ cho hiệu quả tốt nhất!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
