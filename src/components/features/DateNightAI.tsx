import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Coffee, Moon, Sun, Utensils, Music, MapPin, Calculator, RefreshCw, Star, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { usePlanet } from '../../context/KokabContext';

export const DateNightAI: React.FC = () => {
  const [budget, setBudget] = useState<'low' | 'medium' | 'high'>('medium');
  const [interest, setInterest] = useState<string>('everything');
  const [time, setTime] = useState<string>('evening');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<any | null>(null);

  const generateSuggestion = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const prompt = `You are a romantic concierge for a couple named Fahad and Bushra who live in their own "Planet" called Kokab. 
      Generate a personalized date night/romantic evening idea based on:
      Budget: ${budget}
      Interests: ${interest}
      Time: ${time}
      
      The output should be in JSON format with exactly:
      {
        "title": "A creative title",
        "description": "Step-by-step plan",
        "vibes": ["vibe1", "vibe2"],
        "costEstimate": "Estimated range",
        "spiritualConnection": "A deep meaningful element to add",
        "tip": "One expert tip"
      }
      
      Respond in Arabic if possible for the content fields, but keep JSON keys in English. Do not include markdown code blocks.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      setSuggestion(data);
    } catch (error) {
      console.error("Gemini Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-black">اقتراحات الكوكب الرومانسية</h2>
        <p className="text-sm text-[var(--color-text-secondary)] font-medium">ذكاء اصطناعي يصمم لكما لحظات لا تُنسى</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
            <Calculator size={14} /> الميزانية
          </label>
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBudget(b)}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${budget === b ? 'bg-amber-500 text-white shadow-lg' : 'bg-[var(--glass)] hover:bg-[var(--glass-hover)]'}`}
              >
                {b === 'low' ? '$' : b === 'medium' ? '$$' : '$$$'}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 flex items-center gap-2">
            <Heart size={14} className="text-rose-500" /> نوع النشاط
          </label>
          <div className="relative group">
            <select 
              value={interest} 
              onChange={(e) => setInterest(e.target.value)}
              className="w-full bg-[var(--glass)] border border-[var(--glass-border)] rounded-2xl px-5 py-4 text-xs font-bold outline-none appearance-none hover:bg-[var(--glass-hover)] transition-all cursor-pointer"
            >
              <option value="everything" className="bg-[#0f172a]">كل شيء</option>
              <option value="adventure" className="bg-[#0f172a]">مغامرة خارجية</option>
              <option value="home" className="bg-[#0f172a]">ليلة دافئة في المنزل</option>
              <option value="luxury" className="bg-[#0f172a]">فخامة وعشاء راقي</option>
              <option value="art" className="bg-[#0f172a]">فن وإبداع</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
               <Sparkles size={14} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 flex items-center gap-2">
            <Moon size={14} className="text-indigo-400" /> التوقيت المثالي
          </label>
          <div className="flex gap-3">
            {['morning', 'evening', 'late_night'].map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`flex-1 p-4 rounded-2xl transition-all flex items-center justify-center border-2 ${time === t ? 'bg-indigo-500 text-white border-indigo-400 shadow-xl scale-105' : 'glass border-[var(--glass-border)] opacity-60 hover:opacity-100'}`}
              >
                {t === 'morning' ? <Sun size={20} /> : t === 'evening' ? <Utensils size={20} /> : <Moon size={20} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={generateSuggestion}
        disabled={isLoading}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-600 text-white font-black text-lg shadow-2xl shadow-rose-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {isLoading ? <RefreshCw size={24} className="animate-spin" /> : <Sparkles size={24} />}
        {isLoading ? 'جاري استدعاء الإلهام...' : 'ابتكر سهرة رومانسية'}
      </button>

      <AnimatePresence>
        {suggestion && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 border-rose-500/20 bg-rose-500/5 space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
              <Sparkles size={160} className="text-amber-500 rotate-12" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 text-rose-500">
                <Star size={20} fill="currentColor" />
                <h3 className="text-2xl font-black">{suggestion.title}</h3>
              </div>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">{suggestion.description}</p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {suggestion.vibes?.map((vibe: string, i: number) => (
                    <span key={i} className="glass-pill text-rose-500 ring-rose-500/20">#{vibe}</span>
                  ))}
                </div>
                <div className="glass p-5 border-amber-500/20 bg-amber-500/5 rounded-3xl">
                  <div className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sparkles size={12} className="text-amber-500" /> الرابط الروحي
                  </div>
                  <p className="text-xs font-bold leading-relaxed">{suggestion.spiritualConnection}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 glass p-5 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0">
                    <Info size={24} />
                  </div>
                  <div>
                    <div className="text-[8px] font-black opacity-40 uppercase tracking-widest">نصيحة الخبراء</div>
                    <div className="text-xs font-bold leading-tight">{suggestion.tip}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 pt-2">
                  <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">التكلفة المتوقعة</span>
                  <span className="text-2xl font-black text-amber-500 italic serif">{suggestion.costEstimate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
