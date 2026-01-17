import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Moon, Sun, Mic, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface LoginPageProps {
  onLogin: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function LoginPage({ onLogin, theme, onToggleTheme }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  const handleVoiceLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center p-4">
      {/* AI Particle Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={onToggleTheme}
        className="absolute top-6 right-6 p-3 glass-card rounded-full text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <motion.div 
          className="text-white space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 text-[#5B6CFF]" />
            </div>
            <div>
              <h1 className="text-white">Daily Boost</h1>
              <p className="text-white/80 text-sm">Fuel your energy</p>
            </div>
          </div>

          <p className="text-xl text-white/90">
            Fuel your day. Focus your mind. 🚀
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-white">AI cá nhân hóa</h5>
                <p className="text-white/70 text-sm">
                  Quản lý thời gian thông minh, phòng tránh burnout với AI trợ lý cá nhân hóa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-white">Phân tích năng suất</h5>
                <p className="text-white/70 text-sm">
                  Tối ưu năng suất, cân bằng cuộc sống.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h5 className="text-white">Lịch trình thông minh</h5>
                <p className="text-white/70 text-sm">
                  Theo dõi tiến trình, lịch trình thông minh.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card-light rounded-3xl p-8 shadow-2xl">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-white/50 dark:bg-black/20 p-1 rounded-2xl">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-center rounded-xl transition-all ${
                  isLogin 
                    ? 'bg-[#5B6CFF] text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-center rounded-xl transition-all ${
                  !isLogin 
                    ? 'bg-[#5B6CFF] text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Đăng ký
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-white/80 dark:bg-black/20 border-gray-200 dark:border-gray-700 focus:border-[#5B6CFF] focus:ring-[#5B6CFF]"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Mật khẩu</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-12 bg-white/80 dark:bg-black/20 border-gray-200 dark:border-gray-700 focus:border-[#5B6CFF] focus:ring-[#5B6CFF]"
                    required
                  />
                </div>
                {isLogin && (
                  <a href="#" className="text-sm text-[#5B6CFF] hover:underline float-right">
                    Quên mật khẩu?
                  </a>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#5B6CFF] hover:bg-[#4A5BEE] text-white rounded-xl shadow-lg"
              >
                {isLoading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
              </Button>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400">hoặc</div>

              {/* Voice AI Login */}
              <Button
                type="button"
                onClick={handleVoiceLogin}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Đăng nhập với AI
              </Button>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white dark:bg-black/20 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/30"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 bg-white dark:bg-black/20 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
