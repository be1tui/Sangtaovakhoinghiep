import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Mic } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatCoachProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatCoach({ isOpen, onClose }: AIChatCoachProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là AI Coach của bạn. Tôi có thể giúp gì cho bạn hôm nay? 🚀',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    'Nên làm gì tiếp theo?',
    'Phân tích năng suất của tôi',
    'Gợi ý thói quen mới',
    'Tối ưu lịch trình'
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: { [key: string]: string } = {
        'Nên làm gì tiếp theo?': 'Dựa trên năng lượng hiện tại (75%), tôi gợi ý bạn tập trung vào "Hoàn thành báo cáo Q4" trong 2 giờ tới. Đây là thời điểm năng lượng cao của bạn! 💪',
        'Phân tích năng suất của tôi': 'Tuần này bạn đã hoàn thành 62 tasks (+10.7% so với tuần trước). Năng lượng peak ở khung 9h-12h. Tuy nhiên sau 15h năng suất giảm 30%. Hãy sắp xếp task quan trọng vào buổi sáng! 📊',
        'Gợi ý thói quen mới': 'Tôi nhận thấy bạn thiếu thói quen "power nap" sau bữa trưa. Hãy thử nghỉ ngơi 15 phút lúc 13h30 để phục hồi năng lượng cho buổi chiều! 😴',
        'Tối ưu lịch trình': 'Tôi đã phân tích lịch của bạn: Di chuyển "Review code" từ 16h → 10h (năng lượng cao hơn), và task admin → 15h-16h (năng lượng thấp hơn). Năng suất dự kiến tăng 25%! ⚡'
      };

      const response = aiResponses[text] || `Tôi hiểu bạn muốn biết về "${text}". Dựa trên dữ liệu của bạn, tôi gợi ý bạn nên tập trung vào việc duy trì thói quen buổi sáng và tăng thời gian deep work. Bạn đang làm rất tốt! 🌟`;

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsTyping(true);
    setTimeout(() => {
      const voiceMessage: Message = {
        id: Date.now(),
        text: 'Nên làm gì tiếp theo?',
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, voiceMessage]);
      handleSendMessage('Nên làm gì tiếp theo?');
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 w-96 h-[600px] glass-card-light rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#5B6CFF]" />
                </div>
                <div>
                  <h5 className="text-white">AI Coach</h5>
                  <p className="text-xs text-white/80">Luôn sẵn sàng hỗ trợ bạn</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20">
            <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(action)}
                  className="text-xs px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-[#5B6CFF] hover:to-[#7F7FD5] hover:text-white transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] text-white'
                      : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Hỏi AI Coach..."
                className="flex-1"
              />
              <Button
                onClick={handleVoiceInput}
                size="icon"
                variant="outline"
                className="flex-shrink-0"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                className="bg-gradient-to-r from-[#5B6CFF] to-[#7F7FD5] hover:from-[#4A5BEE] hover:to-[#6E6EC4] text-white flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
