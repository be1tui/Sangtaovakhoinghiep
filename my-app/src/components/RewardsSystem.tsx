import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Zap, 
  Crown, 
  Gift,
  TrendingUp,
  Unlock,
  Lock,
  Sparkles,
  Brain,
  Palette,
  Target,
  Award,
  ChevronRight,
  CheckCircle,
  Clock,
  Flame,
  Gem,
  Shield,
  Rocket
} from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';

interface Level {
  id: number;
  name: string;
  title: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  gradient: string;
  icon: any;
  unlocks: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: any;
  category: 'daily' | 'weekly' | 'special';
  completed: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
}

interface UnlockFeature {
  id: string;
  title: string;
  description: string;
  levelRequired: number;
  icon: any;
  category: 'ai' | 'cards' | 'theme';
  isUnlocked: boolean;
}

type View = 'overview' | 'achievements' | 'unlocks' | 'leaderboard';

export default function RewardsSystem() {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [totalPoints, setTotalPoints] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(2);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const levels: Level[] = [
    {
      id: 1,
      name: 'Beginner',
      title: 'Người Mới Bắt Đầu',
      minPoints: 0,
      maxPoints: 500,
      color: 'text-gray-600',
      gradient: 'from-gray-400 to-gray-600',
      icon: Target,
      unlocks: ['Cơ bản AI Coach', '3 thẻ thường', 'Theme mặc định']
    },
    {
      id: 2,
      name: 'Focuser',
      title: 'Người Tập Trung',
      minPoints: 501,
      maxPoints: 1500,
      color: 'text-blue-600',
      gradient: 'from-blue-400 to-blue-600',
      icon: Zap,
      unlocks: ['AI Productivity Tips', '5 thẻ hiếm', 'Dark Mode', 'Focus Mode nâng cao']
    },
    {
      id: 3,
      name: 'Achiever',
      title: 'Người Thành Đạt',
      minPoints: 1501,
      maxPoints: 3000,
      color: 'text-purple-600',
      gradient: 'from-purple-400 to-purple-600',
      icon: Award,
      unlocks: ['AI Personal Coach', '3 thẻ epic', 'Custom Themes', 'Advanced Analytics', 'Priority Support']
    },
    {
      id: 4,
      name: 'Master',
      title: 'Bậc Thầy Năng Suất',
      minPoints: 3001,
      maxPoints: Infinity,
      color: 'text-yellow-600',
      gradient: 'from-yellow-400 via-orange-500 to-red-600',
      icon: Crown,
      unlocks: ['AI Mentor Pro', 'Tất cả thẻ legendary', 'Premium Themes', 'API Access', 'VIP Features']
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Early Bird',
      description: 'Hoàn thành task đầu tiên trước 8h sáng',
      points: 50,
      icon: Clock,
      category: 'daily',
      completed: true,
      progress: 1,
      maxProgress: 1,
      reward: '+50 BP'
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Duy trì streak 7 ngày liên tiếp',
      points: 100,
      icon: Flame,
      category: 'weekly',
      completed: true,
      progress: 7,
      maxProgress: 7,
      reward: '+100 BP + Thẻ Epic'
    },
    {
      id: '3',
      title: 'Task Crusher',
      description: 'Hoàn thành 10 tasks trong 1 ngày',
      points: 75,
      icon: CheckCircle,
      category: 'daily',
      completed: false,
      progress: 6,
      maxProgress: 10,
      reward: '+75 BP'
    },
    {
      id: '4',
      title: 'Focus Champion',
      description: 'Hoàn thành 5 phiên Focus Mode',
      points: 120,
      icon: Zap,
      category: 'weekly',
      completed: false,
      progress: 3,
      maxProgress: 5,
      reward: '+120 BP + AI Feature'
    },
    {
      id: '5',
      title: 'Social Butterfly',
      description: 'Mời 5 bạn bè tham gia',
      points: 200,
      icon: Gift,
      category: 'special',
      completed: false,
      progress: 2,
      maxProgress: 5,
      reward: '+200 BP + Thẻ Legendary'
    },
    {
      id: '6',
      title: 'Energy Master',
      description: 'Duy trì energy > 70% trong 3 ngày',
      points: 90,
      icon: Sparkles,
      category: 'weekly',
      completed: false,
      progress: 1,
      maxProgress: 3,
      reward: '+90 BP'
    },
    {
      id: '7',
      title: 'Card Collector',
      description: 'Thu thập 10 thẻ bài khác nhau',
      points: 150,
      icon: Trophy,
      category: 'special',
      completed: false,
      progress: 8,
      maxProgress: 10,
      reward: '+150 BP + Custom Theme'
    },
    {
      id: '8',
      title: 'Wellness Warrior',
      description: 'Hoàn thành 5 thử thách wellness',
      points: 80,
      icon: Shield,
      category: 'weekly',
      completed: true,
      progress: 5,
      maxProgress: 5,
      reward: '+80 BP'
    }
  ];

  const unlockFeatures: UnlockFeature[] = [
    // Level 1 - Beginner
    {
      id: 'basic-ai',
      title: 'Basic AI Coach',
      description: 'AI trợ lý cơ bản cho productivity tips',
      levelRequired: 1,
      icon: Brain,
      category: 'ai',
      isUnlocked: true
    },
    {
      id: 'common-cards',
      title: 'Common Cards',
      description: 'Mở khóa 3 thẻ bài thường',
      levelRequired: 1,
      icon: Star,
      category: 'cards',
      isUnlocked: true
    },
    {
      id: 'default-theme',
      title: 'Default Theme',
      description: 'Giao diện mặc định Daily Boost',
      levelRequired: 1,
      icon: Palette,
      category: 'theme',
      isUnlocked: true
    },
    
    // Level 2 - Focuser
    {
      id: 'ai-productivity',
      title: 'AI Productivity Tips',
      description: 'AI phân tích và đưa ra gợi ý tăng năng suất',
      levelRequired: 2,
      icon: Brain,
      category: 'ai',
      isUnlocked: true
    },
    {
      id: 'rare-cards',
      title: 'Rare Cards Collection',
      description: 'Mở khóa 5 thẻ bài hiếm',
      levelRequired: 2,
      icon: Gem,
      category: 'cards',
      isUnlocked: true
    },
    {
      id: 'dark-mode',
      title: 'Dark Mode',
      description: 'Theme tối bảo vệ mắt',
      levelRequired: 2,
      icon: Palette,
      category: 'theme',
      isUnlocked: true
    },
    {
      id: 'focus-advanced',
      title: 'Focus Mode Advanced',
      description: 'Focus Mode với Pomodoro và white noise',
      levelRequired: 2,
      icon: Zap,
      category: 'ai',
      isUnlocked: true
    },
    
    // Level 3 - Achiever
    {
      id: 'ai-personal-coach',
      title: 'AI Personal Coach',
      description: 'AI Coach cá nhân hóa theo thói quen của bạn',
      levelRequired: 3,
      icon: Brain,
      category: 'ai',
      isUnlocked: false
    },
    {
      id: 'epic-cards',
      title: 'Epic Cards Collection',
      description: 'Mở khóa 3 thẻ bài epic',
      levelRequired: 3,
      icon: Trophy,
      category: 'cards',
      isUnlocked: false
    },
    {
      id: 'custom-themes',
      title: 'Custom Themes',
      description: 'Tạo và tùy chỉnh theme riêng',
      levelRequired: 3,
      icon: Palette,
      category: 'theme',
      isUnlocked: false
    },
    {
      id: 'advanced-analytics',
      title: 'Advanced Analytics',
      description: 'Báo cáo chi tiết và insights sâu',
      levelRequired: 3,
      icon: TrendingUp,
      category: 'ai',
      isUnlocked: false
    },
    
    // Level 4 - Master
    {
      id: 'ai-mentor-pro',
      title: 'AI Mentor Pro',
      description: 'AI Mentor với machine learning tiên tiến',
      levelRequired: 4,
      icon: Crown,
      category: 'ai',
      isUnlocked: false
    },
    {
      id: 'legendary-cards',
      title: 'Legendary Cards',
      description: 'Mở khóa tất cả thẻ bài legendary',
      levelRequired: 4,
      icon: Sparkles,
      category: 'cards',
      isUnlocked: false
    },
    {
      id: 'premium-themes',
      title: 'Premium Themes Pack',
      description: 'Truy cập tất cả premium themes',
      levelRequired: 4,
      icon: Palette,
      category: 'theme',
      isUnlocked: false
    },
    {
      id: 'api-access',
      title: 'API Access',
      description: 'Tích hợp với apps khác qua API',
      levelRequired: 4,
      icon: Rocket,
      category: 'ai',
      isUnlocked: false
    }
  ];

  const getCurrentLevelData = () => {
    return levels.find(l => l.id === currentLevel) || levels[0];
  };

  const getNextLevelData = () => {
    return levels.find(l => l.id === currentLevel + 1);
  };

  const getProgressToNextLevel = () => {
    const current = getCurrentLevelData();
    const progress = totalPoints - current.minPoints;
    const total = current.maxPoints - current.minPoints;
    return Math.min((progress / total) * 100, 100);
  };

  const handleClaimReward = (achievement: Achievement) => {
    if (achievement.completed) {
      setTotalPoints(totalPoints + achievement.points);
      toast.success(`🎉 Nhận thưởng: ${achievement.title}!`, {
        description: `+${achievement.points} Boost Points`
      });

      // Check level up
      const nextLevel = getNextLevelData();
      if (nextLevel && totalPoints + achievement.points >= nextLevel.minPoints) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setShowLevelUp(true);
          toast.success(`🎊 Chúc mừng! Bạn đã lên ${nextLevel.name}!`, {
            description: `Mở khóa ${nextLevel.unlocks.length} tính năng mới`
          });
        }, 500);
      }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'daily':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'weekly':
        return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'special':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const renderOverview = () => {
    const currentLevelData = getCurrentLevelData();
    const nextLevel = getNextLevelData();
    const progress = getProgressToNextLevel();
    const LevelIcon = currentLevelData.icon;

    return (
      <div className="space-y-6">
        {/* Current Level Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass-card-light rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br ${currentLevelData.gradient} relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-40 h-40 border-8 border-white rounded-full" />
            <div className="absolute bottom-10 left-10 w-32 h-32 border-8 border-white rounded-full" />
          </div>

          <div className="relative z-10 text-white">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <LevelIcon className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Cấp độ hiện tại</p>
                  <h2 className="mb-1">{currentLevelData.name}</h2>
                  <p className="opacity-90">{currentLevelData.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90 mb-1">Tổng điểm</p>
                <h2>{totalPoints.toLocaleString()} BP</h2>
              </div>
            </div>

            {/* Progress to next level */}
            {nextLevel && (
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="opacity-90">Tiến độ lên {nextLevel.name}</span>
                  <span className="opacity-90">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-white"
                  />
                </div>
                <p className="text-sm opacity-75">
                  Còn {(nextLevel.minPoints - totalPoints).toLocaleString()} điểm để lên cấp
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-3">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Streak</p>
            <h4>{dailyStreak} ngày</h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Hoàn thành</p>
            <h4>{achievements.filter(a => a.completed).length}/{achievements.length}</h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
              <Unlock className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Đã mở khóa</p>
            <h4>{unlockFeatures.filter(f => f.isUnlocked).length}/{unlockFeatures.length}</h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Thứ hạng</p>
            <h4>#42</h4>
          </motion.div>
        </div>

        {/* Level Roadmap */}
        <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h4 className="mb-6">Lộ trình phát triển</h4>
          <div className="space-y-4">
            {levels.map((level, index) => {
              const Icon = level.icon;
              const isCompleted = currentLevel > level.id;
              const isCurrent = currentLevel === level.id;
              const isLocked = currentLevel < level.id;

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                    isCurrent 
                      ? `bg-gradient-to-r ${level.gradient} text-white` 
                      : isCompleted
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCurrent 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-700'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className={isCurrent ? 'text-white' : ''}>{level.name}</h5>
                      {isCurrent && <span className="px-2 py-1 bg-white/20 rounded text-xs">Hiện tại</span>}
                      {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <p className={`text-sm mb-2 ${isCurrent ? 'text-white/90' : 'text-muted-foreground'}`}>
                      {level.minPoints.toLocaleString()} - {level.maxPoints === Infinity ? '∞' : level.maxPoints.toLocaleString()} điểm
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {level.unlocks.slice(0, 3).map((unlock, i) => (
                        <span 
                          key={i}
                          className={`text-xs px-2 py-1 rounded ${
                            isCurrent 
                              ? 'bg-white/20 text-white' 
                              : isCompleted
                                ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {unlock}
                        </span>
                      ))}
                      {level.unlocks.length > 3 && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          isCurrent ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                          +{level.unlocks.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Thành Tựu</h3>
        <p className="text-sm text-muted-foreground">
          {achievements.filter(a => a.completed).length}/{achievements.length} hoàn thành
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'daily', 'weekly', 'special'].map(cat => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            className="capitalize"
          >
            {cat === 'all' ? 'Tất cả' : cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card-light rounded-2xl p-6 border-2 ${
                achievement.completed 
                  ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  achievement.completed 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-600'
                }`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5>{achievement.title}</h5>
                    {achievement.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs capitalize ${getCategoryColor(achievement.category)}`}>
                  {achievement.category}
                </span>
              </div>

              {/* Progress Bar */}
              {!achievement.completed && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tiến độ</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">{achievement.reward}</span>
                </div>
                <Button
                  onClick={() => handleClaimReward(achievement)}
                  disabled={!achievement.completed}
                  className={achievement.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
                  size="sm"
                >
                  {achievement.completed ? 'Nhận thưởng' : 'Chưa hoàn thành'}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderUnlocks = () => {
    const groupedFeatures = {
      ai: unlockFeatures.filter(f => f.category === 'ai'),
      cards: unlockFeatures.filter(f => f.category === 'cards'),
      theme: unlockFeatures.filter(f => f.category === 'theme')
    };

    return (
      <div className="space-y-6">
        <h3>Tính Năng Mở Khóa</h3>

        {/* AI Features */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-500" />
            <h5>AI Features</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedFeatures.ai.map((feature, index) => {
              const Icon = feature.icon;
              const requiredLevel = levels.find(l => l.id === feature.levelRequired);
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-card-light rounded-2xl p-6 border-2 ${
                    feature.isUnlocked 
                      ? 'border-green-400 dark:border-green-600' 
                      : 'border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      feature.isUnlocked 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}>
                      {feature.isUnlocked ? (
                        <Icon className="w-6 h-6 text-white" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h6 className="mb-1">{feature.title}</h6>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  
                  {feature.isUnlocked ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Unlock className="w-4 h-4" />
                      <span className="text-sm">Đã mở khóa</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">Cấp {feature.levelRequired} - {requiredLevel?.name}</span>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Khóa
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Card Features */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h5>Card Collections</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupedFeatures.cards.map((feature, index) => {
              const Icon = feature.icon;
              const requiredLevel = levels.find(l => l.id === feature.levelRequired);
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-card-light rounded-2xl p-6 border-2 text-center ${
                    feature.isUnlocked 
                      ? 'border-yellow-400 dark:border-yellow-600' 
                      : 'border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    feature.isUnlocked 
                      ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}>
                    {feature.isUnlocked ? (
                      <Icon className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <h6 className="mb-2">{feature.title}</h6>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  
                  {!feature.isUnlocked && (
                    <p className="text-xs text-muted-foreground">
                      Cấp {feature.levelRequired} - {requiredLevel?.name}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Theme Features */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-blue-500" />
            <h5>Themes & Customization</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupedFeatures.theme.map((feature, index) => {
              const Icon = feature.icon;
              const requiredLevel = levels.find(l => l.id === feature.levelRequired);
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-card-light rounded-2xl p-6 border-2 text-center ${
                    feature.isUnlocked 
                      ? 'border-blue-400 dark:border-blue-600' 
                      : 'border-gray-200 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    feature.isUnlocked 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}>
                    {feature.isUnlocked ? (
                      <Icon className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                  <h6 className="mb-2">{feature.title}</h6>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  
                  {!feature.isUnlocked && (
                    <p className="text-xs text-muted-foreground">
                      Cấp {feature.levelRequired} - {requiredLevel?.name}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Bảng Xếp Hạng</h3>
        <Button variant="outline" size="sm">
          <TrendingUp className="w-4 h-4 mr-2" />
          Tuần này
        </Button>
      </div>

      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="space-y-4">
          {[
            { rank: 1, name: 'Nguyễn Văn A', points: 3500, level: 'Master', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A' },
            { rank: 2, name: 'Trần Thị B', points: 2800, level: 'Achiever', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B' },
            { rank: 3, name: 'Lê Văn C', points: 2200, level: 'Achiever', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C' },
            { rank: 4, name: 'Phạm Thị D', points: 1800, level: 'Focuser', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=D' },
            { rank: 5, name: 'Hoàng Văn E', points: 1500, level: 'Focuser', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=E' },
            { rank: 42, name: 'Minh Anh (You)', points: totalPoints, level: getCurrentLevelData().name, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh', isYou: true }
          ].map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                user.isYou 
                  ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white' 
                  : 'hover:bg-white/50 dark:hover:bg-black/20'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                user.rank === 1 ? 'bg-yellow-500' :
                user.rank === 2 ? 'bg-gray-400' :
                user.rank === 3 ? 'bg-orange-600' :
                user.isYou ? 'bg-white/20' : 'bg-gray-600'
              }`}>
                {user.rank}
              </div>
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={user.isYou ? 'text-white' : ''}>{user.name}</p>
                  {user.rank <= 3 && <Trophy className="w-4 h-4 text-yellow-500" />}
                </div>
                <p className={`text-sm ${user.isYou ? 'text-white/90' : 'text-muted-foreground'}`}>
                  {user.level}
                </p>
              </div>
              <div className="text-right">
                <p className={user.isYou ? 'text-white' : ''}>{user.points.toLocaleString()} BP</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLevelUp(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className={`glass-card-light rounded-3xl p-8 max-w-md w-full border-4 ${getCurrentLevelData().gradient} bg-gradient-to-br relative overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: -500, opacity: [0, 1, 0] }}
                      transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                      className="absolute"
                      style={{ left: `${Math.random() * 100}%` }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 text-white text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  {(() => {
                    const Icon = getCurrentLevelData().icon;
                    return <Icon className="w-12 h-12" />;
                  })()}
                </motion.div>
                
                <h2 className="mb-2">🎉 Chúc mừng!</h2>
                <p className="text-xl mb-4">Bạn đã lên cấp {getCurrentLevelData().name}!</p>
                <p className="opacity-90 mb-6">{getCurrentLevelData().title}</p>
                
                <Button
                  onClick={() => setShowLevelUp(false)}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Tuyệt vời!
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Tổng quan', icon: Star },
          { id: 'achievements', label: 'Thành tựu', icon: Trophy },
          { id: 'unlocks', label: 'Mở khóa', icon: Unlock },
          { id: 'leaderboard', label: 'Xếp hạng', icon: TrendingUp }
        ].map((view) => {
          const Icon = view.icon;
          return (
            <Button
              key={view.id}
              variant={currentView === view.id ? 'default' : 'outline'}
              onClick={() => setCurrentView(view.id as View)}
              className={currentView === view.id ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]' : ''}
            >
              <Icon className="w-4 h-4 mr-2" />
              {view.label}
            </Button>
          );
        })}
      </div>

      {/* Render Current View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'overview' && renderOverview()}
          {currentView === 'achievements' && renderAchievements()}
          {currentView === 'unlocks' && renderUnlocks()}
          {currentView === 'leaderboard' && renderLeaderboard()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
