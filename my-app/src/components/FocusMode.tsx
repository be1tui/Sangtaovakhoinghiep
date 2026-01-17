import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface FocusModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FocusMode({ isOpen, onClose }: FocusModeProps) {
  const [time, setTime] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    { text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' },
    { text: 'The key is not to prioritize schedule, but to schedule priorities.', author: 'Stephen Covey' },
    { text: 'You can do anything, but not everything.', author: 'David Allen' },
    { text: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
    { text: 'Small progress is still progress.', author: 'Anonymous' }
  ];

  const currentTask = {
    title: 'Hoàn thành báo cáo Q4',
    icon: '🔥',
    priority: 'high'
  };

  useEffect(() => {
    // let interval: NodeJS.Timeout;
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      // Play completion sound or notification
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - time) / (25 * 60)) * 100;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-[#5B6CFF] via-[#7F7FD5] to-[#FF8A00] flex items-center justify-center p-6"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Focus Mode Content */}
      <div className="max-w-2xl w-full text-center text-white">
        {/* Current Task */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-sm opacity-80 mb-2">Đang tập trung vào:</p>
          <h2 className="text-white flex items-center justify-center gap-3">
            <span className="text-4xl">{currentTask.icon}</span>
            {currentTask.title}
          </h2>
        </motion.div>

        {/* Timer Circle */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative w-80 h-80">
            {/* Background Circle */}
            <svg className="w-80 h-80 -rotate-90">
              <circle
                cx="160"
                cy="160"
                r="150"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress Circle */}
              <circle
                cx="160"
                cy="160"
                r="150"
                stroke="white"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 150}`}
                strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <div className="text-7xl font-light mb-4">{formatTime(time)}</div>
                <p className="text-sm opacity-80">
                  {isRunning ? 'Đang tập trung...' : 'Sẵn sàng bắt đầu'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mb-12"
        >
          <Button
            onClick={() => setIsRunning(!isRunning)}
            size="lg"
            className="w-20 h-20 rounded-full bg-white text-[#5B6CFF] hover:bg-white/90"
          >
            {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </Button>
          <Button
            onClick={() => {
              setTime(25 * 60);
              setIsRunning(false);
            }}
            size="lg"
            variant="outline"
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg border-white/40 text-white hover:bg-white/30"
          >
            <RotateCcw className="w-8 h-8" />
          </Button>
        </motion.div>

        {/* Quote */}
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <Sparkles className="w-6 h-6 mx-auto mb-3 opacity-80" />
          <p className="text-xl italic mb-2 opacity-90">"{quotes[quoteIndex].text}"</p>
          <p className="text-sm opacity-70">— {quotes[quoteIndex].author}</p>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-4"
        >
          {[
            { label: '15 min', value: 15 },
            { label: '25 min', value: 25 },
            { label: '45 min', value: 45 }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTime(option.value * 60);
                setIsRunning(false);
              }}
              className={`px-4 py-2 rounded-full transition-all ${
                time === option.value * 60
                  ? 'bg-white text-[#5B6CFF]'
                  : 'bg-white/20 backdrop-blur-lg text-white hover:bg-white/30'
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
