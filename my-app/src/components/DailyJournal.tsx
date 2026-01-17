import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface DailyJournalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DailyJournal({ isOpen, onClose }: DailyJournalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Hôm nay bạn cảm thấy thế nào về năng suất của mình? 🌟',
      placeholder: 'Ví dụ: Tôi cảm thấy năng suất, đã hoàn thành được nhiều task...',
      emoji: '💭'
    },
    {
      id: 2,
      question: 'Điều gì khiến bạn cảm thấy tốt nhất trong ngày? ✨',
      placeholder: 'Ví dụ: Hoàn thành được task khó, có thời gian thư giãn...',
      emoji: '🌈'
    },
    {
      id: 3,
      question: 'Ngày mai bạn muốn cải thiện điều gì? 🚀',
      placeholder: 'Ví dụ: Tập trung hơn, bắt đầu sớm hơn, nghỉ ngơi đủ...',
      emoji: '🎯'
    }
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Submit journal
      setIsComplete(true);
      setTimeout(() => {
        toast.success('Đã lưu nhật ký! AI đang phân tích...', {
          description: 'Bạn sẽ nhận được gợi ý cải thiện vào sáng mai!'
        });
        setTimeout(() => {
          onClose();
          setIsComplete(false);
          setCurrentQuestion(0);
          setAnswers(['', '', '']);
        }, 2000);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const updateAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-2xl w-full glass-card-light rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-white">Daily AI Journal</h3>
                  <p className="text-sm text-white/80">Kết thúc ngày với sự suy ngẫm</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-4 flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index <= currentQuestion ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          {!isComplete ? (
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Question */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{questions[currentQuestion].emoji}</span>
                      <div>
                        <p className="text-sm text-muted-foreground">Câu hỏi {currentQuestion + 1} / {questions.length}</p>
                        <h4>{questions[currentQuestion].question}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Answer Input */}
                  <Textarea
                    value={answers[currentQuestion]}
                    onChange={(e) => updateAnswer(e.target.value)}
                    placeholder={questions[currentQuestion].placeholder}
                    className="min-h-[200px] mb-6"
                    autoFocus
                  />

                  {/* Navigation */}
                  <div className="flex justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                    >
                      Quay lại
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      {currentQuestion === questions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 mx-auto mb-6"
              >
                <Sparkles className="w-20 h-20 text-purple-500" />
              </motion.div>
              <h3 className="mb-2">Đang phân tích câu trả lời...</h3>
              <p className="text-muted-foreground">
                AI đang tạo gợi ý cá nhân hóa cho bạn
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
