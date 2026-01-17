import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  LogOut,
  Sparkles,
  CreditCard,
  Menu,
  X,
  HelpCircle,
  Zap,
  BookOpen,
  Briefcase,
  Trophy,
  Award,
  Wallet
} from 'lucide-react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import TasksPage from './components/TasksPage';
import InsightsPage from './components/InsightsPage';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import PricingPage from './components/PricingPage';
import AIChatCoach from './components/AIChatCoach';
import FocusMode from './components/FocusMode';
import DailyJournal from './components/DailyJournal';
import BusinessDashboard from './components/BusinessDashboard';
import DailyBoostCards from './components/DailyBoostCards';
import RewardsSystem from './components/RewardsSystem';
import WalletPage from './components/WalletPage';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Page = 'dashboard' | 'schedule' | 'insights' | 'analytics' | 'business' | 'cards' | 'rewards' | 'wallet' | 'settings' | 'pricing';

const BUSINESS_UNLOCKED_STORAGE_KEY = 'dailyboost:businessUnlocked';
const BUSINESS_UNLOCKED_EVENT = 'dailyboost:business-unlocked';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [walletInitialView, setWalletInitialView] = useState<'overview' | 'topup' | 'history'>('overview');
  const [isBusinessUnlocked, setIsBusinessUnlocked] = useState(false);
  const userName = 'Minh Anh';
  const balance = 1250000;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const syncBusinessUnlocked = () => {
      setIsBusinessUnlocked(localStorage.getItem(BUSINESS_UNLOCKED_STORAGE_KEY) === 'true');
    };

    syncBusinessUnlocked();
    window.addEventListener('storage', syncBusinessUnlocked);
    window.addEventListener(BUSINESS_UNLOCKED_EVENT, syncBusinessUnlocked as EventListener);

    return () => {
      window.removeEventListener('storage', syncBusinessUnlocked);
      window.removeEventListener(BUSINESS_UNLOCKED_EVENT, syncBusinessUnlocked as EventListener);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleWalletClick = () => {
    setWalletInitialView('topup');
    setCurrentPage('wallet');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schedule' as Page, label: 'Schedule', icon: Calendar },
    { id: 'cards' as Page, label: 'Game Cards', icon: Trophy },
    { id: 'business' as Page, label: 'Business', icon: Briefcase },
    { id: 'insights' as Page, label: 'Insights', icon: TrendingUp },
    { id: 'analytics' as Page, label: 'Analytics', icon: BarChart3 },
    { id: 'pricing' as Page, label: 'Pricing', icon: CreditCard },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
    { id: 'rewards' as Page, label: 'Rewards', icon: Award },
    { id: 'wallet' as Page, label: 'Wallet', icon: Wallet },
  ].filter(item => item.id !== 'business' || isBusinessUnlocked);

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={() => setIsLoggedIn(true)} theme={theme} onToggleTheme={toggleTheme} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-bg fixed inset-0 opacity-5" />
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 glass-card-light border-r border-gray-200 dark:border-gray-800 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="gradient-text">Daily Boost</h3>
                <p className="text-xs text-muted-foreground">Boost your energy</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsSidebarOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white shadow-lg' 
                      : 'hover:bg-white/50 dark:hover:bg-black/20 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <HelpCircle className="w-5 h-5" />
              Trợ giúp
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 glass-card-light border-b border-gray-200 dark:border-gray-800 backdrop-blur-lg">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h4 className="capitalize">{currentPage}</h4>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Wallet Balance Display */}
              <motion.button
                onClick={handleWalletClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs opacity-90">Số dư</p>
                  <p className="text-sm font-semibold">{formatCurrency(balance)}</p>
                </div>
              </motion.button>

              {/* Mobile Wallet Button */}
              <motion.button
                onClick={handleWalletClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden w-10 h-10 rounded-xl bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white flex items-center justify-center shadow-lg"
              >
                <Wallet className="w-5 h-5" />
              </motion.button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </Button>

              {/* User Avatar */}
              <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Minh" />
                  <AvatarFallback className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white text-sm">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm hidden md:block">{userName}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'dashboard' && <Dashboard userName={userName} />}
              {currentPage === 'schedule' && <TasksPage />}
              {currentPage === 'insights' && <InsightsPage />}
              {currentPage === 'analytics' && <AnalyticsPage />}
              {currentPage === 'settings' && (
                <SettingsPage 
                  userName={userName} 
                  theme={theme} 
                  onToggleTheme={toggleTheme} 
                />
              )}
              {currentPage === 'pricing' && <PricingPage />}
              {currentPage === 'business' && (isBusinessUnlocked ? <BusinessDashboard /> : <PricingPage />)}
              {currentPage === 'cards' && <DailyBoostCards />}
              {currentPage === 'rewards' && <RewardsSystem />}
              {currentPage === 'wallet' && <WalletPage initialView={walletInitialView} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Quick Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
          {/* Focus Mode Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.1 }}
            className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-2xl flex items-center justify-center text-white"
            onClick={() => setIsFocusModeOpen(true)}
            title="Focus Mode"
          >
            <Zap className="w-6 h-6" />
          </motion.button>

          {/* Daily Journal Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.2 }}
            className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center text-white"
            onClick={() => setIsJournalOpen(true)}
            title="Daily Journal"
          >
            <BookOpen className="w-6 h-6" />
          </motion.button>

          {/* AI Chat Coach Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: 0.3 }}
            className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center text-white"
            onClick={() => setIsAIChatOpen(!isAIChatOpen)}
            title="AI Chat Coach"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        </div>

        {/* AI Chat Coach Component */}
        <AIChatCoach isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />

        {/* Focus Mode Component */}
        <FocusMode isOpen={isFocusModeOpen} onClose={() => setIsFocusModeOpen(false)} />

        {/* Daily Journal Component */}
        <DailyJournal isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)} />
      </div>

      <Toaster />
    </div>
  );
}