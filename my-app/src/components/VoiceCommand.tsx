import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const voiceCommands = [
    '"Thêm task mới"',
    '"Bắt đầu Pomodoro"',
    '"Hiển thị analytics"',
    '"Tôi nên làm gì?"'
  ];

  const handleVoiceCommand = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate voice recognition
      const commands = [
        'Thêm task hoàn thành báo cáo',
        'Bắt đầu Pomodoro 25 phút',
        'Hiển thị analytics tuần này',
        'Tôi nên làm gì tiếp theo?'
      ];
      
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(randomCommand);
      
      setTimeout(() => {
        setIsProcessing(false);
        
        // Execute command
        if (randomCommand.includes('Thêm task')) {
          toast.success('✅ Đã thêm task: "Hoàn thành báo cáo"');
        } else if (randomCommand.includes('Pomodoro')) {
          toast.success('⏱️ Đã bắt đầu Pomodoro 25 phút');
        } else if (randomCommand.includes('analytics')) {
          toast.success('📊 Đang chuyển đến Analytics...');
        } else {
          toast.success('🤖 AI gợi ý: Tập trung vào "Hoàn thành báo cáo Q4" ngay bây giờ!');
        }
        
        setTimeout(() => setTranscript(''), 3000);
      }, 1500);
    } else {
      // Start listening
      setIsListening(true);
      setTranscript('Đang lắng nghe...');
    }
  };

  return (
    <div className="glass-card-light rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Voice Command
          </h5>
          <p className="text-sm text-muted-foreground mt-1">Điều khiển bằng giọng nói</p>
        </div>
      </div>

      {/* Voice Button */}
      <div className="flex flex-col items-center justify-center py-8">
        <motion.button
          onClick={handleVoiceCommand}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-24 h-24 rounded-full shadow-2xl flex items-center justify-center transition-all ${
            isListening
              ? 'bg-gradient-to-r from-red-500 to-pink-500'
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
          }`}
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="listening"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <MicOff className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="not-listening"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Mic className="w-10 h-10 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Transcript Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 text-center"
            >
              <div className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    </motion.div>
                    <span className="text-sm">Đang xử lý...</span>
                  </div>
                ) : (
                  <p className="text-sm">{transcript}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status */}
        <p className="text-xs text-muted-foreground mt-4">
          {isListening ? '🎤 Đang lắng nghe...' : 'Nhấn để nói'}
        </p>
      </div>

      {/* Quick Commands */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-muted-foreground mb-3">Thử các lệnh:</p>
        <div className="flex flex-wrap gap-2">
          {voiceCommands.map((command, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full"
            >
              {command}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
