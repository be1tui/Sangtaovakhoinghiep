import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Share2, 
  Users, 
  Trophy,
  Zap,
  Heart,
  Brain,
  Target,
  Star,
  Gift,
  Lock,
  Unlock,
  Copy,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  ChevronRight,
  TrendingUp,
  Award,
  Flame
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface Card {
  id: string;
  title: string;
  description: string;
  challenge: string;
  reward: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'productivity' | 'wellness' | 'creativity' | 'energy';
  points: number;
  icon: any;
  isUnlocked: boolean;
  image: string;
}

type View = 'game' | 'collection' | 'challenges' | 'invite';

export default function DailyBoostCards() {
  const [currentView, setCurrentView] = useState<View>('game');
  const [playsLeft, setPlaysLeft] = useState(3);
  const [totalPoints, setTotalPoints] = useState(250);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [unlockedCards, setUnlockedCards] = useState<string[]>(['1', '2', '3']);
  const [activeChallenge, setActiveChallenge] = useState<Card | null>(null);
  const [streak, setStreak] = useState(7);

  const cards: Card[] = [
    {
      id: '1',
      title: 'Morning Warrior',
      description: 'Bắt đầu ngày với năng lượng tràn đầy',
      challenge: 'Thức dậy lúc 6h sáng và tập thể dục 15 phút',
      reward: '+50 Energy Points',
      rarity: 'common',
      category: 'energy',
      points: 50,
      icon: Zap,
      isUnlocked: true,
      image: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JuaW5nJTIwc3VucmlzZSUyMHdvcmtvdXQlMjBlbmVyZ3l8ZW58MXx8fHwxNzY2ODQ3ODMxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '2',
      title: 'Focus Master',
      description: 'Đạt trạng thái focus hoàn hảo',
      challenge: 'Hoàn thành 2 giờ deep work không bị gián đoạn',
      reward: '+100 Productivity Points',
      rarity: 'rare',
      category: 'productivity',
      points: 100,
      icon: Brain,
      isUnlocked: true,
      image: 'https://images.unsplash.com/photo-1763336341838-99560632db54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2N1cyUyMGNvbmNlbnRyYXRpb24lMjBwcm9kdWN0aXZpdHklMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY2ODQ3ODMyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      title: 'Wellness Champion',
      description: 'Chăm sóc sức khỏe tinh thần',
      challenge: 'Thiền định 20 phút và viết nhật ký cảm xúc',
      reward: '+75 Wellness Points',
      rarity: 'common',
      category: 'wellness',
      points: 75,
      icon: Heart,
      isUnlocked: true,
      image: 'https://images.unsplash.com/photo-1764054655220-99548fc12fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwd2VsbG5lc3MlMjBwZWFjZWZ1bCUyMHplbnxlbnwxfHx8fDE3NjY4NDc4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '4',
      title: 'Creative Genius',
      description: 'Giải phóng sự sáng tạo của bạn',
      challenge: 'Tạo ra 1 ý tưởng mới và phát triển chi tiết',
      reward: '+120 Creative Points',
      rarity: 'epic',
      category: 'creativity',
      points: 120,
      icon: Sparkles,
      isUnlocked: false,
      image: 'https://images.unsplash.com/photo-1758522275125-d97ae32bd031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFydCUyMHBhaW50aW5nJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjY4NDc4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '5',
      title: 'Energy Booster',
      description: 'Tăng cường năng lượng tối đa',
      challenge: 'Uống đủ 2L nước và ăn 5 bữa nhỏ trong ngày',
      reward: '+80 Energy Points',
      rarity: 'rare',
      category: 'energy',
      points: 80,
      icon: Flame,
      isUnlocked: false,
      image: 'https://images.unsplash.com/photo-1666979290238-2d862b573345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZW5lcmd5JTIwc3BvcnRzJTIwYWN0aXZlfGVufDF8fHx8MTc2Njg0NzgzM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '6',
      title: 'Goal Crusher',
      description: 'Chinh phục mục tiêu của bạn',
      challenge: 'Hoàn thành 100% task trong to-do list hôm nay',
      reward: '+150 Achievement Points',
      rarity: 'epic',
      category: 'productivity',
      points: 150,
      icon: Target,
      isUnlocked: false,
      image: 'https://images.unsplash.com/photo-1764377725269-a26ada9b551a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2hpZXZlbWVudCUyMHN1Y2Nlc3MlMjBtb3VudGFpbiUyMHBlYWt8ZW58MXx8fHwxNzY2ODQ3ODMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '7',
      title: 'Social Butterfly',
      description: 'Kết nối với mọi người',
      challenge: 'Chia sẻ thành tựu của bạn với 3 người bạn',
      reward: '+60 Social Points',
      rarity: 'common',
      category: 'wellness',
      points: 60,
      icon: Users,
      isUnlocked: false,
      image: 'https://images.unsplash.com/photo-1758272133693-d2124dbe00de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY29tbXVuaXR5JTIwc29jaWFsJTIwY29ubmVjdGlvbnxlbnwxfHx8fDE3NjY4NDc4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '8',
      title: 'Legend Maker',
      description: 'Trở thành huyền thoại năng suất',
      challenge: 'Duy trì streak 30 ngày và hoàn thành 10 thử thách epic',
      reward: '+500 Legend Points + Exclusive Badge',
      rarity: 'legendary',
      category: 'productivity',
      points: 500,
      icon: Trophy,
      isUnlocked: false,
      image: 'https://images.unsplash.com/photo-1598968429739-b1bb16b888b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBjaGFtcGlvbiUyMHdpbm5lciUyMGdvbGR8ZW58MXx8fHwxNzY2ODQ3ODM0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-gray-400 to-gray-600';
      case 'rare':
        return 'from-blue-400 to-blue-600';
      case 'epic':
        return 'from-purple-400 to-purple-600';
      case 'legendary':
        return 'from-yellow-400 via-orange-500 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400';
      case 'rare':
        return 'border-blue-400';
      case 'epic':
        return 'border-purple-400';
      case 'legendary':
        return 'border-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)]';
      default:
        return 'border-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity':
        return Target;
      case 'wellness':
        return Heart;
      case 'creativity':
        return Sparkles;
      case 'energy':
        return Zap;
      default:
        return Star;
    }
  };

  const handleDrawCard = () => {
    if (playsLeft <= 0) {
      toast.error('Bạn đã hết lượt chơi! Chia sẻ để nhận thêm lượt.');
      setCurrentView('invite');
      return;
    }

    setIsFlipping(true);
    
    // Randomly select an undrawn card
    const availableCards = cards.filter(c => !unlockedCards.includes(c.id));
    if (availableCards.length === 0) {
      toast.success('🎉 Bạn đã mở hết tất cả thẻ!');
      return;
    }

    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    
    setTimeout(() => {
      setSelectedCard(randomCard);
      setUnlockedCards([...unlockedCards, randomCard.id]);
      setPlaysLeft(playsLeft - 1);
      setTotalPoints(totalPoints + randomCard.points);
      setIsFlipping(false);
      
      toast.success(`🎴 Bạn đã mở thẻ ${randomCard.title}!`, {
        description: `+${randomCard.points} điểm`
      });
    }, 1500);
  };

  const handleShare = (platform: string) => {
    const shareText = `Tôi vừa mở được thẻ ${selectedCard?.title || 'thử thách'} trên Daily Boost! 🚀 Cùng tham gia nào! #DailyBoost #ProductivityGame`;
    const shareUrl = 'https://dailyboost.app';

    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      default:
        navigator.clipboard.writeText(shareText);
        toast.success('Đã copy link chia sẻ!');
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
    
    // Reward user with more plays
    setTimeout(() => {
      setPlaysLeft(playsLeft + 2);
      toast.success('🎁 Bạn nhận được +2 lượt chơi từ việc chia sẻ!');
    }, 1000);
  };

  const handleInviteFriend = () => {
    const inviteCode = 'DB' + Math.random().toString(36).substr(2, 6).toUpperCase();
    navigator.clipboard.writeText(`Tham gia Daily Boost cùng tôi! Sử dụng mã: ${inviteCode} để nhận 5 lượt chơi miễn phí! 🎮`);
    toast.success('Đã copy mã mời!', {
      description: 'Gửi cho bạn bè để cùng nhận thưởng'
    });
  };

  const handleAcceptChallenge = (card: Card) => {
    setActiveChallenge(card);
    toast.success(`Thử thách "${card.title}" đã được kích hoạt!`, {
      description: 'Hoàn thành để nhận thưởng'
    });
  };

  const handleCompleteChallenge = () => {
    if (activeChallenge) {
      setTotalPoints(totalPoints + activeChallenge.points);
      setStreak(streak + 1);
      toast.success(`🎉 Hoàn thành thử thách: ${activeChallenge.title}!`, {
        description: `+${activeChallenge.points} điểm • Streak: ${streak + 1} ngày`
      });
      setActiveChallenge(null);
    }
  };

  const renderGame = () => (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] rounded-xl flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Lượt chơi</p>
          <h3 className="gradient-text">{playsLeft}</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Tổng điểm</p>
          <h3>{totalPoints}</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Streak</p>
          <h3>{streak} ngày</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card-light rounded-2xl p-4 border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Thẻ mở</p>
          <h3>{unlockedCards.length}/{cards.length}</h3>
        </motion.div>
      </div>

      {/* Card Draw Section */}
      <div className="glass-card-light rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-8">
          <h3 className="mb-2">🎴 Mở Thẻ Thử Thách</h3>
          <p className="text-muted-foreground">
            Mở thẻ để nhận thử thách mới và tăng năng suất của bạn!
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <motion.div
            className="relative"
            style={{ perspective: 1000 }}
          >
            <AnimatePresence mode="wait">
              {!selectedCard ? (
                <motion.div
                  key="card-back"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isFlipping ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-64 h-96 cursor-pointer"
                  onClick={handleDrawCard}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#5B6CFF] via-[#7F7FD5] to-[#FF8A00] rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-16 h-16 border-4 border-white rounded-full" />
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-white rounded-full" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white rounded-full" />
                    </div>
                    <div className="text-center z-10">
                      <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                      <p className="text-white">Nhấn để mở thẻ</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedCard.id}
                  initial={{ rotateY: -180, scale: 0.8 }}
                  animate={{ rotateY: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-64 h-96 bg-gradient-to-br ${getRarityColor(selectedCard.rarity)} rounded-2xl border-4 ${getRarityBorder(selectedCard.rarity)} shadow-2xl p-6 relative overflow-hidden`}
                >
                  {/* Rarity Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full">
                    <p className="text-xs text-white uppercase tracking-wider">{selectedCard.rarity}</p>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col h-full text-white">
                    <div className="flex-1">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                        {(() => {
                          const Icon = selectedCard.icon;
                          return <Icon className="w-8 h-8" />;
                        })()}
                      </div>
                      <h4 className="mb-2">{selectedCard.title}</h4>
                      <p className="text-sm opacity-90 mb-4">{selectedCard.description}</p>
                    </div>

                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-xs opacity-75 mb-2">THỬ THÁCH</p>
                      <p className="text-sm mb-3">{selectedCard.challenge}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <span className="text-sm">+{selectedCard.points} pts</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAcceptChallenge(selectedCard)}
                          className="bg-white text-gray-900 hover:bg-gray-100"
                        >
                          Thử thách
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 max-w-md mx-auto">
          <Button
            onClick={handleDrawCard}
            disabled={playsLeft <= 0 || isFlipping}
            className="w-full bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:opacity-90 disabled:opacity-50"
            size="lg"
          >
            {isFlipping ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="mr-2"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                Đang mở thẻ...
              </>
            ) : (
              <>
                <Gift className="w-5 h-5 mr-2" />
                Mở thẻ ({playsLeft} lượt)
              </>
            )}
          </Button>

          {selectedCard && (
            <Button
              onClick={() => setSelectedCard(null)}
              variant="outline"
              className="w-full"
            >
              Mở thẻ khác
            </Button>
          )}

          {playsLeft === 0 && (
            <Button
              onClick={() => setCurrentView('invite')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Chia sẻ để nhận thêm lượt
            </Button>
          )}
        </div>
      </div>

      {/* Active Challenge */}
      {activeChallenge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-light rounded-2xl p-6 border-2 border-purple-400 dark:border-purple-600"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">THỬ THÁCH ĐANG HOẠT ĐỘNG</p>
              <h4>{activeChallenge.title}</h4>
            </div>
            <div className={`px-4 py-2 bg-gradient-to-r ${getRarityColor(activeChallenge.rarity)} rounded-xl`}>
              <p className="text-white text-sm">+{activeChallenge.points} pts</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{activeChallenge.challenge}</p>
          <Button
            onClick={handleCompleteChallenge}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
          >
            <Award className="w-5 h-5 mr-2" />
            Hoàn thành thử thách
          </Button>
        </motion.div>
      )}
    </div>
  );

  const renderCollection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3>Bộ Sưu Tập Thẻ</h3>
        <p className="text-sm text-muted-foreground">
          {unlockedCards.length}/{cards.length} thẻ
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const isUnlocked = unlockedCards.includes(card.id);
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative aspect-[2/3] bg-gradient-to-br ${
                isUnlocked ? getRarityColor(card.rarity) : 'from-gray-400 to-gray-600'
              } rounded-xl border-2 ${
                isUnlocked ? getRarityBorder(card.rarity) : 'border-gray-500'
              } shadow-lg p-4 cursor-pointer ${
                !isUnlocked && 'opacity-50'
              }`}
              whileHover={{ scale: isUnlocked ? 1.05 : 1, y: isUnlocked ? -5 : 0 }}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Lock className="w-12 h-12 text-white" />
                </div>
              )}

              <div className="flex flex-col h-full text-white">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h6 className="mb-1">{card.title}</h6>
                <p className="text-xs opacity-75 flex-1">{card.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs opacity-75 uppercase">{card.rarity}</span>
                  <span className="text-xs">+{card.points} pts</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <h3>Thử Thách Hôm Nay</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.filter(c => unlockedCards.includes(c.id)).map((card, index) => {
          const Icon = card.icon;
          const CategoryIcon = getCategoryIcon(card.category);
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${getRarityColor(card.rarity)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5>{card.title}</h5>
                    <span className={`px-2 py-0.5 bg-gradient-to-r ${getRarityColor(card.rarity)} rounded text-xs text-white`}>
                      {card.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground uppercase">Thử thách</p>
                </div>
                <p className="text-sm">{card.challenge}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>+{card.points} điểm</span>
                </div>
                <Button
                  onClick={() => handleAcceptChallenge(card)}
                  className={`bg-gradient-to-r ${getRarityColor(card.rarity)}`}
                  size="sm"
                >
                  Bắt đầu
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderInvite = () => (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-10 h-10 text-white" />
        </div>
        <h3 className="mb-2">Mời Bạn Bè - Nhận Thưởng</h3>
        <p className="text-muted-foreground">
          Chia sẻ Daily Boost và nhận thêm lượt chơi miễn phí!
        </p>
      </div>

      {/* Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <h5 className="mb-1">Chia sẻ</h5>
          <p className="text-2xl gradient-text mb-2">+2 lượt</p>
          <p className="text-sm text-muted-foreground">Mỗi lần chia sẻ</p>
        </div>

        <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h5 className="mb-1">Mời bạn</h5>
          <p className="text-2xl gradient-text mb-2">+5 lượt</p>
          <p className="text-sm text-muted-foreground">Mỗi bạn tham gia</p>
        </div>

        <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h5 className="mb-1">Milestone</h5>
          <p className="text-2xl gradient-text mb-2">+10 lượt</p>
          <p className="text-sm text-muted-foreground">10 bạn tham gia</p>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h5 className="mb-4">Chia sẻ trên mạng xã hội</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={() => handleShare('facebook')}
            className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Facebook
          </Button>
          <Button
            onClick={() => handleShare('twitter')}
            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Twitter
          </Button>
          <Button
            onClick={() => handleShare('whatsapp')}
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
          <Button
            onClick={() => handleShare('copy')}
            variant="outline"
          >
            <Copy className="w-5 h-5 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>

      {/* Invite Code */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h5 className="mb-4">Mã mời của bạn</h5>
        <div className="flex gap-3">
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl tracking-wider gradient-text mb-1">DB{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            <p className="text-xs text-muted-foreground">Chia sẻ mã này với bạn bè</p>
          </div>
          <Button
            onClick={handleInviteFriend}
            className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]"
          >
            <Copy className="w-5 h-5 mr-2" />
            Copy
          </Button>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="glass-card-light rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h5>Bảng xếp hạng mời bạn</h5>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <div className="space-y-3">
          {[
            { name: 'Nguyễn Văn A', invites: 15, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A' },
            { name: 'Trần Thị B', invites: 12, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B' },
            { name: 'Lê Văn C', invites: 10, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C' },
          ].map((user, index) => (
            <div key={index} className="flex items-center gap-3 p-3 hover:bg-white/50 dark:hover:bg-black/20 rounded-xl transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-400' :
                'bg-orange-600'
              }`}>
                {index + 1}
              </div>
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p>{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.invites} bạn bè</p>
              </div>
              {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* View Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'game', label: 'Mở Thẻ', icon: Sparkles },
          { id: 'collection', label: 'Bộ Sưu Tập', icon: Trophy },
          { id: 'challenges', label: 'Thử Thách', icon: Target },
          { id: 'invite', label: 'Mời Bạn Bè', icon: Users }
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
          {currentView === 'game' && renderGame()}
          {currentView === 'collection' && renderCollection()}
          {currentView === 'challenges' && renderChallenges()}
          {currentView === 'invite' && renderInvite()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}