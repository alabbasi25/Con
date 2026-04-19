import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bug, 
  X, 
  UserCircle2, 
  Database, 
  RefreshCcw, 
  Trash2, 
  Bell, 
  Send, 
  Zap,
  Layout,
  ExternalLink,
  Cpu,
  Activity,
  Clock,
  Wallet,
  Package,
  Swords,
  ListTodo,
  Shield
} from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';
import { UserID } from '../../types';

interface TestConsoleProps {
  onSwitchUser: () => void;
  setActiveTab: (tab: any) => void;
}

export const TestConsole: React.FC<TestConsoleProps> = ({ onSwitchUser, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentUser, 
    populateTestData, 
    resetApp, 
    addNotification, 
    sendHapticPulse, 
    nudgeHydration,
    barakahPoints,
    planetHealth,
    addTask,
    addTransaction,
    updateInventoryStock,
    inventory,
    sendConflictMessage
  } = usePlanet();

  const handleTriggerOverdue = () => {
    addTask({
      title: 'مهمة متأخرة اختيارية',
      priority: 'urgent',
      dueDate: Date.now() - 10000, // already passed
    });
  };

  const runScenario = (scenario: 'delegate' | 'budget' | 'conflict') => {
    switch (scenario) {
      case 'delegate':
        addTask({
          title: 'شراء لوازم المنزل',
          assignedTo: currentUser === 'F' ? 'B' : 'F',
          priority: 'high',
          dueDate: Date.now() + 86400000
        });
        addNotification({
          title: 'تم بدء السيناريو',
          content: 'قمت بتكليف الشريك بمهمة. قم بتبديل المستخدم لرؤية الإشعار لديه.',
          type: 'routine'
        });
        break;
      case 'budget':
        addTransaction({
          amount: 4600,
          description: 'صيانة السيارة الطارئة',
          category: 'Finance'
        });
        addNotification({
          title: 'تنبيه الميزانية',
          content: 'تم تجاوز 90% من الميزانية. كلاً منكما سيستلم هذا التنبيه.',
          type: 'urgent'
        });
        break;
      case 'conflict':
        sendConflictMessage('أشعر ببعض الضيق من تأخرك الدائم');
        addNotification({
          title: 'غرفة التفاهم',
          content: 'أرسلت رسالة مشفرة. بدل المستخدم ليرسل هو رسالته ثم اكشفاها معاً.',
          type: 'social'
        });
        break;
    }
    setIsOpen(false);
  };

  const handlePopulate = () => {
    populateTestData();
    addNotification({
      title: 'تم تحديث البيانات',
      content: 'تم ملء النظام ببيانات اختبار شاملة.',
      type: 'routine'
    });
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من مسح كافة البيانات؟')) {
      resetApp();
    }
  };

  const views: { id: string; label: string }[] = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'system', label: 'لوحة القيادة' },
    { id: 'ledger', label: 'الميزانية' },
    { id: 'tasks', label: 'المهام' },
    { id: 'worship', label: 'المحراب' },
    { id: 'inventory', label: 'المخزون' },
    { id: 'chat', label: 'المستشار AI' },
    { id: 'growth', label: 'النمو الشخصي' },
    { id: 'conflict', label: 'غرفة التفاهم' },
    { id: 'vault', label: 'أرشيف المستندات' },
    { id: 'mood', label: 'مزاجي' },
    { id: 'family', label: 'مشروع العائلة' },
  ];

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 left-4 z-[99] w-12 h-12 rounded-full bg-amber-500 text-white shadow-2xl flex items-center justify-center border-2 border-[var(--glass-border-hover)] lg:bottom-6 lg:left-6"
        title="Test Console"
      >
        <Bug size={24} />
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-20 bottom-20 mx-auto max-w-lg bg-[var(--color-bg-card)] border border-[var(--glass-border)] rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden flex flex-col pt-safe-top"
              dir="rtl"
            >
              {/* Header */}
              <div className="p-6 border-b border-[var(--glass-border)] flex items-center justify-between bg-amber-500/10">
                <div className="flex items-center gap-3">
                  <Cpu className="text-amber-500" />
                  <h3 className="text-lg font-black tracking-tight">وضع الاختبار والمطور (Sandbox)</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-[var(--glass-hover)] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                
                {/* 1. Identity & State */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
                       <UserCircle2 size={14} /> الهوية والحالة
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-500">USER_ID: {currentUser}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={onSwitchUser}
                      className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--color-primary)] text-white text-xs font-bold hover:brightness-110"
                    >
                      <RefreshCcw size={16} /> تبديل المستخدم
                    </button>
                    <div className="p-3 rounded-2xl bg-[var(--color-bg-surface)] flex flex-col items-center justify-center border border-[var(--glass-border)]">
                      <div className="text-[10px] opacity-60">نقاط البركة</div>
                      <div className="text-lg font-black text-amber-500">{barakahPoints} ✨</div>
                    </div>
                  </div>
                </section>

                {/* 2. Data Management */}
                <section className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
                    <Database size={14} /> إدارة البيانات المحاكية
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={handlePopulate}
                      className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-500/20 text-emerald-500 text-xs font-bold border border-emerald-500/30 hover:bg-emerald-500/30"
                    >
                      <Database size={16} /> ملء بيانات تجريبية
                    </button>
                    <button 
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-rose-500/20 text-rose-500 text-xs font-bold border border-rose-500/30 hover:bg-rose-500/30"
                    >
                      <Trash2 size={16} /> تصفير النظام كاملاً
                    </button>
                  </div>
                </section>

                {/* 3. Event Simulation */}
                <section className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
                    <Zap size={14} /> محاكاة الأحداث الحية
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => addNotification({ 
                        title: 'تنبيه اختباري', 
                        content: 'هذا إشعار تجريبي لاختبار نظام التنبيهات.', 
                        type: 'urgent' 
                      })}
                      className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--color-bg-surface)] text-sm font-bold border border-[var(--glass-border)]"
                    >
                      <Bell size={16} className="text-amber-500" /> إشعار عاجل
                    </button>
                    <button 
                      onClick={() => sendHapticPulse('heartbeat')}
                      className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--color-bg-surface)] text-sm font-bold border border-[var(--glass-border)]"
                    >
                      <Send size={16} className="text-rose-500" /> نبضة قلب رقمية
                    </button>
                    <button 
                      onClick={nudgeHydration}
                      className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--color-bg-surface)] text-sm font-bold border border-[var(--glass-border)] col-span-2"
                    >
                      <Zap size={16} className="text-blue-500" /> تنبيه الشريك بشرب الماء
                    </button>
                  </div>
                </section>

                {/* 4. Interaction Scenarios */}
                <section className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
                    <Swords size={14} className="text-[var(--color-primary)]" /> سيناريوهات التفاعل بين الزوجين
                  </h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => runScenario('delegate')}
                      className="w-full flex flex-col items-start p-4 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] hover:bg-[var(--glass-hover)] transition-all group text-right"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="text-xs font-bold">سيناريو "تكليف الشريك"</div>
                        <ListTodo size={18} className="text-blue-500" />
                      </div>
                      <div className="text-[10px] opacity-50 mt-1 leading-relaxed">
                        الخطوات: أرسل المهمة ← بدل المستخدم ← تحقق من محرك المهام والإشعارات.
                      </div>
                    </button>

                    <button 
                      onClick={() => runScenario('budget')}
                      className="w-full flex flex-col items-start p-4 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] hover:bg-[var(--glass-hover)] transition-all group text-right"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="text-xs font-bold">سيناريو "الإنفاق المشترك"</div>
                        <Wallet size={18} className="text-amber-500" />
                      </div>
                      <div className="text-[10px] opacity-50 mt-1 leading-relaxed">
                        الخطوات: أضف المصروف ← سيصل التنبيه لك وللشريك فوراً.
                      </div>
                    </button>

                    <button 
                      onClick={() => runScenario('conflict')}
                      className="w-full flex flex-col items-start p-4 rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] hover:bg-[var(--glass-hover)] transition-all group text-right"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="text-xs font-bold">سيناريو "المصارحة المشفرة"</div>
                        <Shield size={18} className="text-rose-500" />
                      </div>
                      <div className="text-[10px] opacity-50 mt-1 leading-relaxed">
                        الخطوات: أرسل رسالتك ← بدل المستخدم ← اطلب من الشريك إرسال رسالته ← اكشفاها معاً.
                      </div>
                    </button>
                  </div>
                </section>

                {/* 5. Quick Navigation Audit */}
                <section className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
                    <Layout size={14} /> التدقيق والوصول السريع
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {views.map(view => (
                      <button 
                        key={view.id}
                        onClick={() => { setActiveTab(view.id); setIsOpen(false); }}
                        className="p-2 rounded-xl bg-[var(--glass)] text-[10px] font-bold text-center border border-[var(--glass-border)] hover:bg-[var(--glass-hover)] flex flex-col items-center gap-1"
                      >
                        <ExternalLink size={12} className="opacity-40" />
                        {view.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* System Stats */}
                <div className="p-4 rounded-2xl bg-[var(--glass-active)] border border-[var(--glass-border)] space-y-2">
                  <div className="flex justify-between text-[10px] opacity-60">
                    <span>صحة الكوكب: {planetHealth.score}%</span>
                    <span>نسخة النظام: v0.9.0-BETA</span>
                  </div>
                  <div className="h-1 bg-[var(--glass-hover)] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${planetHealth.score}%` }} />
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 bg-black/30 text-center">
                <p className="text-[10px] opacity-40 font-mono">DEBUG_MODE: ENABLED | PID: {Math.floor(Math.random() * 10000)}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
