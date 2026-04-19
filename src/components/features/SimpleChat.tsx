import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Heart, 
  MoreVertical,
  ArrowLeft,
  Smile,
  Sparkles,
  Navigation,
  CheckCheck,
  Phone,
  Video,
  PlusCircle,
  Sticker,
  Camera,
  Shield
} from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

export const SimpleChat: React.FC<{ setActiveTab: (tab: any) => void }> = ({ setActiveTab }) => {
  const { chatMessages, sendChatMessage, currentUser, partnerStatus, sendHapticPulse } = usePlanet();
  const [content, setContent] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = () => {
    if (!content.trim()) return;
    sendChatMessage(content);
    setContent('');
  };

  const handlePulse = () => {
    sendHapticPulse('heartbeat');
    sendChatMessage('❤️ أرسلت لك نبضة قلب رقمية...', 'text');
  };

  const partnerName = currentUser === 'F' ? 'بشرى' : 'فهد';
  const partnerSeed = currentUser === 'F' ? 'Bushra' : 'Fahad';
  const partnerOnline = partnerStatus?.status === 'online';

  return (
    <div className="absolute inset-0 flex flex-col bg-[var(--color-bg-deep)] z-[100]">
      {/* Chat Header */}
      <div className="px-4 py-3 flex items-center justify-between bg-[var(--color-bg-deep)]/80 backdrop-blur-2xl border-b border-[var(--glass-border)] sticky top-0 z-10 pt-safe">
        <div className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab('home')}
            className="p-2 -ml-2 text-[var(--color-text-secondary)]"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--color-primary)]/20 overflow-hidden bg-[var(--color-bg-surface)]">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerSeed}`} 
                alt={partnerName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {partnerOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--color-bg-deep)] rounded-full" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1.5">
              {partnerName}
              <span className="text-[10px] font-black opacity-30 tracking-widest uppercase">
                ({partnerOnline ? 'متصل الآن' : 'غير متصل'})
              </span>
            </h3>
            <p className="text-[10px] text-green-500 font-bold flex items-center gap-1">
              {partnerOnline && <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />}
              {partnerOnline ? 'متاح للمزامنة' : 'نشط منذ قليل'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 text-[var(--color-text-secondary)] opacity-60">
            <Phone size={18} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 text-[var(--color-text-secondary)] opacity-60">
            <Video size={18} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 text-[var(--color-text-secondary)]">
            <MoreVertical size={18} />
          </motion.button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar pb-32"
      >
        <div className="flex flex-col items-center py-10 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-3xl bg-[var(--glass)] flex items-center justify-center mb-4 border border-[var(--glass-border)] shadow-2xl"
          >
            <Shield size={32} className="text-[var(--color-primary)] opacity-40" />
          </motion.div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 max-w-[220px] leading-relaxed">
            تشفير كوني مفعل <br/> مداركما خاص تماماً
          </p>
        </div>

        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500 rounded-full blur-2xl"
              />
              <div className="relative p-8 rounded-[2.5rem] bg-[var(--color-bg-surface)]/40 border border-[var(--glass-border)] backdrop-blur-xl shadow-2xl">
                <Heart size={48} className="text-rose-500" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-black tracking-tight italic serif">صمت في المدار...</p>
              <p className="text-[10px] font-bold opacity-40">أرسل رسالة لبدء المزامنة مع {partnerName}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {chatMessages.map((msg, idx) => {
              const isMe = msg.senderId === currentUser;
              const prevMsg = idx > 0 ? chatMessages[idx-1] : null;
              const isGroupTarget = prevMsg && prevMsg.senderId === msg.senderId && (msg.timestamp - prevMsg.timestamp < 60000);
              const showTime = idx === 0 || msg.timestamp - chatMessages[idx-1].timestamp > 300000;
              
              return (
                <React.Fragment key={msg.id}>
                  {showTime && (
                    <div className="flex justify-center my-6">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30 px-4 py-1.5 rounded-full bg-[var(--glass)] border border-[var(--glass-border)]">
                        {new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: isMe ? 20 : -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${isGroupTarget ? '-mt-6' : ''}`}
                  >
                    {!isMe && !isGroupTarget && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1 border border-[var(--glass-border-hover)] self-end">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${partnerSeed}`} alt="" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    {isMe && isGroupTarget && <div className="ml-10" />}
                    
                    <div className={`max-w-[85%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`p-4 rounded-[1.8rem] text-[15px] shadow-2xl relative leading-relaxed backdrop-blur-3xl transition-all ${
                        isMe 
                          ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 text-white rounded-br-none' 
                          : 'bg-[var(--glass-hover)] text-[var(--color-text-primary)] rounded-bl-none border border-[var(--glass-border)]'
                      }`}>
                        {msg.content}
                        <div className={`text-[8px] mt-1 font-bold opacity-40 flex items-center gap-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(msg.timestamp)}
                          {isMe && <CheckCheck size={10} className="text-[var(--text-mute-hover)]" />}
                        </div>
                      </div>
                    </div>

                    {!isMe && isGroupTarget && <div className="mr-10" />}
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat Specific Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)] to-transparent p-4 pb-safe z-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Quick Actions Strip */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            <motion.button 
              onClick={handlePulse}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} 
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-lg shadow-rose-500/10"
            >
              <Heart size={14} /> نبضة حب
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              <Navigation size={14} /> موقعي
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              <PlusCircle size={14} /> عمل جماعي
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] border-[var(--glass-border)]">
              <PlusCircle size={24} />
            </motion.button>
            
            <div className="flex-1 flex items-center bg-[var(--color-bg-surface)]/40 rounded-[2rem] border border-[var(--glass-border)] px-6 focus-within:border-[var(--color-primary)] transition-all shadow-2xl backdrop-blur-3xl group">
              <input 
                type="text" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="أرسل محبة..."
                className="w-full bg-transparent border-none focus:ring-0 text-sm py-4 text-right"
                dir="rtl"
              />
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-[var(--color-text-secondary)] opacity-40 group-focus-within:opacity-100 transition-opacity">
                <Smile size={22} />
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {content.trim() ? (
                  <motion.button 
                    key="send"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] text-white shadow-2xl shadow-[var(--color-primary)]/40 flex items-center justify-center"
                  >
                    <Send size={24} />
                  </motion.button>
                ) : (
                  <motion.button 
                    key="mic"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseDown={() => setIsRecording(true)}
                    onMouseUp={() => setIsRecording(false)}
                    className={`w-14 h-14 rounded-2xl bg-[var(--glass)] text-[var(--color-text-primary)] border border-[var(--glass-border)] flex items-center justify-center transition-all ${isRecording ? 'bg-rose-500 scale-125 !text-white shadow-2xl shadow-rose-500/40' : ''}`}
                  >
                    <Mic size={24} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChat;
