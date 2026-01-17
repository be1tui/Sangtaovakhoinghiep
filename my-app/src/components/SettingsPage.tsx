import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Zap, Moon, Sun, Volume2, Mail, Lock, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner';

interface SettingsPageProps {
  userName: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function SettingsPage({ userName, theme, onToggleTheme }: SettingsPageProps) {
  const [aiLevel, setAiLevel] = useState([60]);
  const [settings, setSettings] = useState({
    notifications: true,
    pomodoro: true,
    tips: true,
    breathing: false,
    sound: true,
    email: 'minhanh@example.com',
    aiTone: 'motivational' as 'calm' | 'motivational' | 'analytical'
  });

  const handleSave = () => {
    toast.success('Cài đặt đã được lưu! ✨');
  };

  const aiLevelLabel = aiLevel[0] < 30 ? 'Minimal' : aiLevel[0] < 70 ? 'Balanced' : 'Full AI';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Settings</h2>
        <p className="text-muted-foreground">Cá nhân hóa trải nghiệm của bạn</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-light rounded-3xl p-6 lg:col-span-1"
        >
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-lg">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Minh" />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h4 className="mb-1">{userName}</h4>
            <p className="text-sm text-muted-foreground mb-4">{settings.email}</p>
            <div className="flex gap-2 mb-6">
              <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs">
                Level 12
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs">
                🔥 19 days
              </div>
            </div>
            <Button variant="outline" className="w-full mb-2">
              <User className="w-4 h-4 mr-2" />
              Chỉnh sửa Profile
            </Button>
            <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
              <Lock className="w-4 h-4 mr-2" />
              Đổi mật khẩu
            </Button>
          </div>
        </motion.div>

        {/* Settings Panels */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Personalization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card-light rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4>AI Cá nhân hóa</h4>
                <p className="text-sm text-muted-foreground">Điều chỉnh mức độ AI hỗ trợ</p>
              </div>
            </div>

            {/* AI Level Slider */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Mức độ AI</Label>
                  <span className="text-sm px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                    {aiLevelLabel}
                  </span>
                </div>
                <Slider
                  value={aiLevel}
                  onValueChange={setAiLevel}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Minimal</span>
                  <span>Balanced</span>
                  <span>Full AI</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {aiLevel[0] < 30 && 'AI chỉ đưa ra gợi ý tối thiểu'}
                  {aiLevel[0] >= 30 && aiLevel[0] < 70 && 'AI cân bằng giữa tự động và kiểm soát của bạn'}
                  {aiLevel[0] >= 70 && 'AI tự động hóa và gợi ý tối đa'}
                </p>
              </div>

              {/* AI Tone */}
              <div>
                <Label className="mb-3 block">AI Tone</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['calm', 'motivational', 'analytical'] as const).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSettings({ ...settings, aiTone: tone })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        settings.aiTone === tone
                          ? 'border-[#5B6CFF] bg-[#5B6CFF]/10'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-1 block">
                          {tone === 'calm' && '🧘'}
                          {tone === 'motivational' && '🚀'}
                          {tone === 'analytical' && '📊'}
                        </span>
                        <span className="text-xs capitalize">{tone}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card-light rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4>Thông báo</h4>
                <p className="text-sm text-muted-foreground">Quản lý các loại thông báo</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Nhận thông báo khi có task mới</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked: boolean) => setSettings({ ...settings, notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm">Pomodoro Timer</p>
                    <p className="text-xs text-muted-foreground">Thông báo khi hết thời gian</p>
                  </div>
                </div>
                <Switch
                  checked={settings.pomodoro}
                  onCheckedChange={(checked: boolean) => setSettings({ ...settings, pomodoro: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm">AI Tips</p>
                    <p className="text-xs text-muted-foreground">Gợi ý thông minh từ AI</p>
                  </div>
                </div>
                <Switch
                  checked={settings.tips}
                  onCheckedChange={(checked: boolean) => setSettings({ ...settings, tips: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm">Breathing Reminders</p>
                    <p className="text-xs text-muted-foreground">Nhắc nhở thư giãn mỗi 2h</p>
                  </div>
                </div>
                <Switch
                  checked={settings.breathing}
                  onCheckedChange={(checked: boolean) => setSettings({ ...settings, breathing: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="text-sm">Sound Effects</p>
                    <p className="text-xs text-muted-foreground">Âm thanh khi hoàn thành task</p>
                  </div>
                </div>
                <Switch
                  checked={settings.sound}
                  onCheckedChange={(checked: boolean) => setSettings({ ...settings, sound: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm">Email Summary</p>
                    <p className="text-xs text-muted-foreground">Báo cáo hàng tuần qua email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card-light rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                {theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h4>Giao diện</h4>
                <p className="text-sm text-muted-foreground">Tùy chỉnh theme và màu sắc</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <div>
                    <p className="text-sm">Theme Mode</p>
                    <p className="text-xs text-muted-foreground">
                      {theme === 'dark' ? 'Dark mode đang bật' : 'Light mode đang bật'}
                    </p>
                  </div>
                </div>
                <Switch checked={theme === 'dark'} onCheckedChange={onToggleTheme} />
              </div>

              <div>
                <Label className="mb-3 block">Accent Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { name: 'Blue', color: 'bg-blue-500' },
                    { name: 'Purple', color: 'bg-purple-500' },
                    { name: 'Pink', color: 'bg-pink-500' },
                    { name: 'Green', color: 'bg-green-500' },
                    { name: 'Orange', color: 'bg-orange-500' }
                  ].map((color) => (
                    <button
                      key={color.name}
                      className={`${color.color} h-12 rounded-xl hover:scale-110 transition-transform border-2 border-white dark:border-gray-800 shadow-lg`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleSave}
              className="w-full h-12 bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:from-[#4A5BEE] hover:to-[#6E6EC4] text-white shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Lưu cài đặt
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
