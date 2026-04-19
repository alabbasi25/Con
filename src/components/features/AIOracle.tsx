import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, Send, Sparkles, BrainCircuit, BarChart3, Scale, UserX, 
  CheckCircle2, XCircle, AlertCircle, History, Settings, Bell,
  BellOff, Trash2
} from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const AIOracle: React.FC = () => {
  const { planetHealth, tasks, transactions, currentUser, updateNotificationSettings, profiles } = usePlanet();
  
  // Load initial history from localStorage
  const savedHistory = JSON.parse(localStorage.getItem('kokab_ai_history') || '[]');
  
  const [messages, setMessages] = useState(savedHistory.length > 0 ? savedHistory : [
    { role: 'assistant', content: 'أهلاً بكما. أنا مستشار الكوكب. لقد حللت بياناتكما الحالية: صحة الكوكب عند ' + planetHealth.score + '%. كيف يمكنني مساعدتكما في تحسين التوازن اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showJury, setShowJury] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync messages to localStorage
  useEffect(() => {
    localStorage.setItem('kokab_ai_history', JSON.stringify(messages));
  }, [messages]);

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const clearHistory = () => {
    const initialMsg = { role: 'assistant', content: 'تم مسح السجل بنجاح. كيف يمكنني مساعدتك اليوم؟' };
    setMessages([initialMsg]);
    localStorage.removeItem('kokab_ai_history');
    setShowClearConfirm(false);
  };

  // Blind Jury State
  const [showAIVerdict, setShowAIVerdict] = useState(false);
  const [aiVerdict, setAiVerdict] = useState<string | null>(null);

  // Mock Disputed Case for Blind Jury
  const [disputedCase, setDisputedCase] = useState({
    id: '1',
    title: 'توزيع حصص القهوة الأسبوعية ☕',
    topic: 'الميزانية مقابل الرفاهية',
    description: 'بشرى ترغب في شراء محمصة قهوة جديدة عالية الجودة، فهد يرى أنه من الأفضل توفير المبلغ للسفر القادم.',
    partnerRequest: 'بشرى تطلب موافقتك على شراء المحمصة (سعره 1200 ريال)',
    votes: { F: null, B: null } as Record<string, 'A' | 'B' | null>,
    options: {
      A: 'الموافقة على الشراء',
      B: 'تأجيل الشراء لبعد السفر'
    }
  });

  const handleVote = (option: 'A' | 'B') => {
    setDisputedCase(prev => ({
      ...prev,
      votes: { ...prev.votes, [currentUser]: option }
    }));
  };

  const isRevealed = disputedCase.votes.F !== null && disputedCase.votes.B !== null;

  const handleConsultOracle = async () => {
    setLoading(true);
    setShowAIVerdict(true);
    try {
      const prompt = `
        أنت "حكم الكوكب" المحايد. لدينا حالة نزاع بين شريكين:
        الموضوع: ${disputedCase.title}
        التصنيف: ${disputedCase.topic}
        الوصف: ${disputedCase.description}
        طلب بشرى: ${disputedCase.partnerRequest}
        
        بيانات الكوكب الحالية:
        - الصحة: ${planetHealth.score}%
        - المصاريف: ${transactions.length} مصروفات
        
        المطلوب:
        1. محاكاة وجهة نظر "فهد" و "بشرى" باختصار ومودة.
        2. إعطاء حكم صريح وواضح بشكل محايد تماماً.
        3. اقتراح حل وسط يرضي الطرفين.
        
        أجب بأسلوب "Blind Jury" المحترف والدافئ.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      setAiVerdict(response.text || 'لم يتمكن المحرك من حسم القضية.');
    } catch (error) {
      setAiVerdict('حدث خطأ في محاكاة المحكمة. حاول لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const prompt = `
        أنت مساعد ذكي لتطبيق "كوكب" المخصص للأزواج.
        بيانات الكوكب الحالية:
        - الصحة العامة: ${planetHealth.score}%
        - المهام المعلقة: ${tasks.filter(t => t.status === 'pending').length}
        - المصاريف الأخيرة: ${transactions.length}
        
        المستخدم يسأل: ${userMsg}
        
        أجب بأسلوب دافئ، حكيم، وباللغة العربية. قدم نصائح عملية بناءً على البيانات إذا لزم الأمر.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || 'عذراً، لم أستطع توليد رد.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، واجهت مشكلة في تحليل البيانات. حاول مرة أخرى لاحقاً.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col h-full bg-transparent overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6 px-4 pt-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-black">مستشار الكوكب</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">ذكاء اصطناعي يحلل نبض حياتكما</p>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 rounded-xl transition-all ${showSettings ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'}`}
          >
            <Settings size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowJury(!showJury)}
            className={`p-3 rounded-xl transition-all group ${showJury ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-rose-500/10 text-rose-500'}`}
          >
            <Scale size={20} className="group-hover:animate-pulse" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card p-6 border-[var(--color-primary)]/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[var(--color-primary)]">
                  <Bell size={18} />
                  <h3 className="text-xs font-black uppercase tracking-widest">إعدادات النبض الذكي</h3>
                </div>
                {!showClearConfirm ? (
                  <button 
                    onClick={() => setShowClearConfirm(true)}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-500 flex items-center gap-2 text-[10px] font-bold"
                  >
                    <Trash2 size={14} /> مسح السجل
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={clearHistory}
                      className="px-3 py-1 rounded-lg bg-rose-500 text-white text-[10px] font-bold"
                    >
                      تأكيد المسح
                    </button>
                    <button 
                      onClick={() => setShowClearConfirm(false)}
                      className="px-3 py-1 rounded-lg bg-[var(--glass-hover)] text-white text-[10px] font-bold"
                    >
                      تراجع
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold">تنبيهات الميزانية الذكية</h4>
                    <p className="text-[9px] opacity-60">تلقي نصائح عند الاقتراب من تجاوز الميزانية</p>
                  </div>
                  <button 
                    onClick={() => updateNotificationSettings({ smartBudget: !profiles[currentUser].notificationSettings.smartBudget })}
                    className={`w-10 h-6 rounded-full transition-all relative ${profiles[currentUser].notificationSettings.smartBudget ? 'bg-green-500' : 'bg-gray-500/30'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${profiles[currentUser].notificationSettings.smartBudget ? 'right-5' : 'right-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold">نخزات المودة</h4>
                    <p className="text-[9px] opacity-60">تنبيهات لاقتراح لفتات رومانسية بناءً على الجو العام</p>
                  </div>
                  <button 
                    onClick={() => updateNotificationSettings({ affectionNudges: !profiles[currentUser].notificationSettings.affectionNudges })}
                    className={`w-10 h-6 rounded-full transition-all relative ${profiles[currentUser].notificationSettings.affectionNudges ? 'bg-green-500' : 'bg-gray-500/30'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${profiles[currentUser].notificationSettings.affectionNudges ? 'right-5' : 'right-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showJury && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card p-6 border-rose-500/20 bg-rose-500/5 space-y-4">
              <div className="flex items-center justify-between border-b border-rose-500/10 pb-4 mb-4">
                <div className="flex items-center gap-3 text-rose-500">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/20">
                    <Scale size={20} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">نظام التحكيم العمياء</h3>
                    <div className="text-sm font-black italic serif">محكمة الكوكب (Blind Jury)</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[8px] font-black uppercase tracking-widest">
                  نزاع نشط <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-[8px] font-black uppercase tracking-widest text-[var(--text-mute)]">موضوع النزاع</div>
                      <h4 className="font-bold text-sm">{disputedCase.title}</h4>
                    </div>
                    <div className="text-[9px] font-bold px-2 py-1 rounded-lg bg-[var(--glass)] text-[var(--text-mute-hover)]">{disputedCase.topic}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[8px] font-black uppercase tracking-widest text-[var(--text-mute)]">طلب الشريك</div>
                    <p className="text-[11px] leading-relaxed font-bold text-rose-200/80">{disputedCase.partnerRequest}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--glass-active)] text-[10px] opacity-70 leading-relaxed border-r-2 border-rose-500/40 italic">
                    {disputedCase.description}
                  </div>
                </div>
              </div>

              {!isRevealed ? (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVote('A')}
                      className={`relative overflow-hidden py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${disputedCase.votes[currentUser] === 'A' ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/20' : 'bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--text-mute)]'}`}
                    >
                      {disputedCase.votes[currentUser] === 'A' && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--glass-active)]" />}
                      {disputedCase.options.A}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVote('B')}
                      className={`relative overflow-hidden py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${disputedCase.votes[currentUser] === 'B' ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/20' : 'bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--text-mute)]'}`}
                    >
                      {disputedCase.votes[currentUser] === 'B' && <div className="absolute top-0 left-0 w-full h-1 bg-[var(--glass-active)]" />}
                      {disputedCase.options.B}
                    </motion.button>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-[8px] opacity-40 italic">تصويتك لن يظهر للشريك حتى يصوت هو أيضاً. هذا هو جوهر المحكمة العمياء.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleConsultOracle}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase tracking-widest border border-orange-500/20"
                    >
                      <BrainCircuit size={14} /> استشارة حكم الذكاء الاصطناعي
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
                    <div className="flex items-center gap-3 text-emerald-500 font-black italic serif text-sm">
                      <CheckCircle2 size={18} /> تم الكشف عن التوافق!
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px]">
                      <div className="space-y-1">
                        <div className="opacity-40 uppercase tracking-tighter">صوت فهد</div>
                        <div className="font-black p-2 rounded-xl bg-[var(--glass-active)]">{disputedCase.votes.F === 'A' ? disputedCase.options.A : disputedCase.options.B}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="opacity-40 uppercase tracking-tighter">صوت بشرى</div>
                        <div className="font-black p-2 rounded-xl bg-[var(--glass-active)]">{disputedCase.votes.B === 'A' ? disputedCase.options.A : disputedCase.options.B}</div>
                      </div>
                    </div>
                    {disputedCase.votes.F === disputedCase.votes.B ? (
                      <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-500 text-[10px] font-bold text-center">
                        هناك اتساق في الآراء! تم حسم الأمر بنجاح.
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 text-[10px] font-bold text-center border border-rose-500/20">
                        اختلاف في الآراء! نقترح العودة إلى المستشار للتحكيم.
                      </div>
                    )}
                  </div>
                  
                  {disputedCase.votes.F !== disputedCase.votes.B && !showAIVerdict && (
                    <button 
                      onClick={handleConsultOracle}
                      className="w-full py-4 rounded-2xl bg-orange-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20"
                    >
                       استدعاء حَكم الآلي لحل النزاع
                    </button>
                  )}
                </div>
              )}

              {/* AI Verdict Modal/Overlay */}
              <AnimatePresence>
                {showAIVerdict && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-4"
                  >
                     <div className="flex items-center gap-2 text-orange-500">
                        <Bot size={18} className={loading ? 'animate-spin' : ''} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">حكم المستشار الآلي المحايد</h4>
                     </div>
                     {loading ? (
                       <div className="space-y-2 py-4">
                          <div className="h-2 w-full bg-orange-500/10 rounded animate-pulse" />
                          <div className="h-2 w-3/4 bg-orange-500/10 rounded animate-pulse" />
                          <div className="h-2 w-1/2 bg-orange-500/10 rounded animate-pulse" />
                       </div>
                     ) : (
                       <div className="text-[11px] leading-relaxed space-y-4">
                         <div className="opacity-80 italic whitespace-pre-wrap">{aiVerdict}</div>
                         <button 
                          onClick={() => setShowAIVerdict(false)}
                          className="w-full py-2 rounded-xl bg-orange-500/10 text-orange-500 font-bold border border-orange-500/20"
                         >
                           فهمت، شكراً للتحكيم
                         </button>
                       </div>
                     )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar p-1">
        <div className="flex gap-2 mb-2 px-1 overflow-x-auto no-scrollbar pt-2">
           <button 
             onClick={() => setShowJury(true)}
             className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest border border-orange-500/20 whitespace-nowrap flex items-center gap-2 hover:bg-orange-500/20 transition-colors"
           >
              <Scale size={14} /> استشارة المحكمة (Consult Oracle)
           </button>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[var(--color-primary)] text-white' : 'glass-card border-[var(--color-primary)]/20'}`}>
              {msg.role === 'assistant' && <Bot size={14} className="mb-2 opacity-50" />}
              <p className="leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-card p-4 rounded-2xl animate-pulse">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="pt-4 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="اسأل المستشار عن حالة الكوكب..."
          className="input-field flex-1"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="p-3 rounded-xl bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </motion.div>
  );
};
