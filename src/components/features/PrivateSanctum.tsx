import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Plus, Trash2, Eye, EyeOff, Sparkles, Brain, MessageSquare, ArrowRight } from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

export const PrivateSanctum: React.FC = () => {
  const { privateNotes, addPrivateNote, deletePrivateNote, currentUser } = usePlanet();
  const [newNote, setNewNote] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  const myNotes = privateNotes.filter(n => n.userId === currentUser);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">المساحة الخاصة</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">أفكارك ومشاعرك في أمان تام</p>
        </div>
        <button 
          onClick={() => setShowCoach(!showCoach)}
          className={`p-3 rounded-xl transition-all ${showCoach ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-indigo-500/10 text-indigo-500'}`}
        >
          <Brain size={20} />
        </button>
      </div>

      <AnimatePresence>
        {showCoach && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card p-6 border-indigo-500/20 bg-indigo-500/5 space-y-6">
              <div className="flex items-center gap-3 text-indigo-500">
                <Sparkles size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest">مرآة الذات (AI Mirror Coach)</h3>
              </div>
              
              <div className="p-4 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] italic text-xs leading-relaxed text-[var(--color-text-secondary)]">
                "بناءً على ملاحظاتك الأخيرة، يبدو أنك تمر بفترة من الضغط المهني. تذكر أن توازنك الشخصي هو وقود نجاحك المشترك في الكوكب."
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold opacity-50 uppercase">تمرين التأمل اليومي</h4>
                <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={16} className="text-indigo-500" />
                    <span className="text-[10px] font-bold">ما هو أكثر شيء ممتن له اليوم؟</span>
                  </div>
                  <ArrowRight size={14} className="text-indigo-500" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4 items-center">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
          <Lock size={28} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-indigo-500">تشفير طرفي</h3>
          <p className="text-[10px] leading-relaxed text-indigo-500/70">
            هذه البيانات مخزنة في مسارك الخاص. لا يملك الشريك صلاحية الوصول إليها برمجياً.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="اكتب فكرة خاصة..."
            className="input-field flex-1"
          />
          <button 
            onClick={() => { addPrivateNote(newNote); setNewNote(''); }}
            className="p-3 rounded-xl bg-indigo-500 text-white shadow-lg"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">ملاحظاتك</h3>
          <button onClick={() => setShowNotes(!showNotes)} className="text-indigo-500 text-xs font-bold flex items-center gap-1">
            {showNotes ? <EyeOff size={14} /> : <Eye size={14} />}
            {showNotes ? 'إخفاء' : 'عرض'}
          </button>
        </div>

        <div className="space-y-3">
          {showNotes ? (
            myNotes.map(note => (
              <div key={note.id} className="glass-card p-4 flex flex-col group transition-all">
                <div 
                  className="flex items-center justify-between cursor-pointer" 
                  onClick={() => setExpandedNoteId(expandedNoteId === note.id ? null : note.id)}
                >
                  <div className="flex-1 overflow-hidden pr-2">
                    <p className={`text-sm transition-all ${expandedNoteId === note.id ? '' : 'truncate'}`}>{note.content}</p>
                    <span className="text-[10px] opacity-40">{new Date(note.timestamp).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deletePrivateNote(note.id); }}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-500 active:scale-95 transition-all lg:opacity-0 lg:group-hover:opacity-100 shrink-0"
                    title="حذف الملاحظة"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-12 text-center opacity-50">
              <Lock size={32} className="mx-auto mb-2" />
              <p className="text-xs">المحتوى مخفي. اضغط على عرض للمشاهدة.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
