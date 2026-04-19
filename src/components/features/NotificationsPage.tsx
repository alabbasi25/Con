import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Settings, 
  Trash2, 
  Calendar, 
  Wallet, 
  Heart, 
  Package,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  XCircle
} from 'lucide-react';
import { usePlanet } from '../../context/KokabContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, deleteNotification, clearNotifications, updateNotificationSettings, profiles, currentUser } = usePlanet();
  const [filter, setFilter] = React.useState<string>('all');
  const [showSettings, setShowSettings] = React.useState(false);

  const settings = profiles[currentUser].notificationSettings;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'routine': return <Calendar size={18} className="text-blue-500" />;
      case 'financial': return <Wallet size={18} className="text-emerald-500" />;
      case 'social': return <Heart size={18} className="text-rose-500" />;
      case 'inventory': return <Package size={18} className="text-amber-500" />;
      case 'ai': return <Sparkles size={18} className="text-purple-500" />;
      case 'tasks': return <CheckCircle2 size={18} className="text-blue-400" />;
      default: return <Bell size={18} className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-20"
    >
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
          <h2 className="text-4xl font-black italic serif">التنبيهات</h2>
          <div className="flex items-center gap-2">
            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest px-1">نبض أحداث الكوكب</p>
            <div className="h-1 flex-1 bg-[var(--glass)] rounded-full min-w-[50px]" />
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={clearNotifications}
            className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[var(--text-mute)] hover:text-rose-500 transition-colors"
          >
            <Trash2 size={20} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(true)}
            className={`w-12 h-12 rounded-2xl glass flex items-center justify-center transition-colors ${showSettings ? 'text-[var(--color-primary)]' : 'text-[var(--text-mute)] hover:text-[var(--color-text-primary)]'}`}
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-2">
        {['all', 'financial', 'social', 'tasks', 'routine'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase whitespace-nowrap transition-all ${filter === t ? 'bg-white text-[var(--color-bg-deep)] shadow-xl scale-105' : 'glass text-[var(--text-mute)] opacity-60'}`}
          >
            {t === 'all' ? 'الكل' : t === 'financial' ? 'المالية' : t === 'social' ? 'التواصل' : t === 'tasks' ? 'المهام' : 'عام'}
          </button>
        ))}
      </div>

      <div className="space-y-3 px-1">
        {filteredNotifications.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filteredNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`glass-card p-5 border-l-4 ${
                  notif.type === 'financial' ? 'border-l-emerald-500' : 
                  notif.type === 'social' ? 'border-l-rose-500' : 
                  notif.type === 'inventory' ? 'border-l-amber-500' : 
                  notif.type === 'tasks' ? 'border-l-blue-400' : 'border-l-[var(--color-primary)]'
                } flex gap-4 items-start relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--glass)] to-transparent pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-[var(--glass)] flex items-center justify-center shrink-0 border border-[var(--glass-border)] shadow-inner">
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-black">{notif.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-bold opacity-30 uppercase tracking-tighter">
                        {new Date(notif.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button 
                        onClick={() => deleteNotification(notif.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-rose-500 hover:scale-110 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-70 font-medium">{notif.content}</p>
                  <div className="pt-2 flex items-center gap-4">
                    <button className="text-[8px] font-black uppercase tracking-widest text-[var(--color-primary)] hover:underline">عرض التفاصيل</button>
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="text-[8px] font-black uppercase tracking-widest opacity-40 hover:opacity-100"
                    >
                      تجاهل
                    </button>
                  </div>
                </div>

                {notif.type === 'ai' && (
                  <div className="absolute top-2 left-2">
                    <Sparkles size={10} className="text-purple-400 animate-pulse" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 opacity-20">
            <div className="w-24 h-24 rounded-[2rem] border-2 border-dashed border-white flex items-center justify-center">
               <Bell size={40} strokeWidth={1} />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-black italic serif">لا توجد تنبيهات جديدة</h3>
              <p className="text-[10px] font-bold mt-1">مدارك هادئ ومستقر حالياً.</p>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Actions */}
      {filteredNotifications.length > 0 && (
        <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent border border-[var(--color-primary)]/20 space-y-4">
          <div className="flex items-center gap-2 text-[var(--color-primary)]">
            <Sparkles size={18} />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">توصية سريعة</h3>
          </div>
          <p className="text-[11px] font-bold leading-relaxed opacity-80">
            بناءً على التنبيهات الأخيرة، يقترح المستشار تخصيص 15 دقيقة لمناقشة "خطة الميزانية" في المدار المسائي.
          </p>
          <button className="w-full py-3 rounded-2xl bg-[var(--color-primary)] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[var(--color-primary)]/20">
            تأكيد الموعد المقترح
          </button>
        </div>
      )}

      {/* Notification Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="glass-card w-full max-w-md p-8 space-y-8 relative z-10 overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-[var(--glass-border)] pb-6">
                <div>
                  <h3 className="text-2xl font-black">تفضيلات النبض</h3>
                  <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">إدارة إشعارات وأصوات الكوكب</p>
                </div>
                <button onClick={() => setShowSettings(false)} className="w-10 h-10 rounded-xl glass flex items-center justify-center"><XCircle size={20} /></button>
              </div>

              <div className="space-y-6">
                {/* Sound Settings */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">الأصوات والكتم</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'none', label: 'تفعيل الصوت', desc: 'صوت + إشعار' },
                      { id: 'silent', label: 'صامت', desc: 'بدون صوت' },
                      { id: 'all', label: 'كتم الكل', desc: 'بدون إشعارات' }
                    ].map((mode) => (
                      <button 
                        key={mode.id}
                        onClick={() => updateNotificationSettings({ muteMode: mode.id as any })}
                        className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${settings.muteMode === mode.id ? 'bg-white text-[var(--color-bg-deep)] border-white scale-105' : 'glass border-[var(--glass-border)] opacity-40'}`}
                      >
                         <span className="text-[9px] font-black">{mode.label}</span>
                         <span className="text-[7px] opacity-60 font-bold italic">{mode.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Granular Controls */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">تنبيهات مخصصة</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-2xl glass border border-[var(--glass-border)]">
                      <div>
                        <div className="text-xs font-black">الميزانية الذكية</div>
                        <div className="text-[9px] opacity-40">تنبيهات الإسراف والتوفير</div>
                      </div>
                      <button 
                         onClick={() => updateNotificationSettings({ smartBudget: !settings.smartBudget })}
                         className={`w-12 h-6 rounded-full relative transition-colors ${settings.smartBudget ? 'bg-emerald-500' : 'bg-[var(--glass-hover)]'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.smartBudget ? 'right-7' : 'right-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl glass border border-[var(--glass-border)]">
                      <div>
                        <div className="text-xs font-black">نخزات المودة</div>
                        <div className="text-[9px] opacity-40">اقتراحات رومانسية ذكية</div>
                      </div>
                      <button 
                         onClick={() => updateNotificationSettings({ affectionNudges: !settings.affectionNudges })}
                         className={`w-12 h-6 rounded-full relative transition-colors ${settings.affectionNudges ? 'bg-rose-500' : 'bg-[var(--glass-hover)]'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.affectionNudges ? 'right-7' : 'right-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl glass border border-[var(--glass-border)]">
                      <div>
                        <div className="text-xs font-black">أصوات النظام</div>
                        <div className="text-[9px] opacity-40">مؤثرات صوتية عند التفاعل</div>
                      </div>
                      <button 
                         onClick={() => updateNotificationSettings({ soundEnabled: !settings.soundEnabled })}
                         className={`w-12 h-6 rounded-full relative transition-colors ${settings.soundEnabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--glass-hover)]'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.soundEnabled ? 'right-7' : 'right-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-4 rounded-2xl bg-white text-[var(--color-bg-deep)] font-black text-xs uppercase tracking-widest shadow-2xl"
              >
                تطبيق التغييرات
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
