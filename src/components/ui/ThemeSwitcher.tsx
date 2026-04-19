import React from 'react';
import { Moon, Sun, Trees, Flower2, Droplet, Scaling, Maximize, Minimize } from 'lucide-react';
import { motion } from 'motion/react';
import { Theme, AppSize } from '../../types';
import { usePlanet } from '../../context/KokabContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme: currentTheme, setTheme, appSize, setAppSize } = usePlanet();

  const themes: { id: Theme; icon: React.ReactNode; label: string; color: string }[] = [
    { id: 'midnight', icon: <Moon size={20} />, label: 'ليلة القهوة', color: 'bg-[#9D4EDD]' },
    { id: 'emerald', icon: <Trees size={20} />, label: 'الغابة العميقة', color: 'bg-[#2DD4BF]' },
    { id: 'ocean', icon: <Droplet size={20} />, label: 'أعماق المحيط', color: 'bg-[#38BDF8]' },
    { id: 'light', icon: <Sun size={20} />, label: 'نهاري نقي', color: 'bg-[#2563EB]' },
    { id: 'gold', icon: <Sun size={20} />, label: 'شروق الصحراء', color: 'bg-[#D97706]' },
    { id: 'rose', icon: <Flower2 size={20} />, label: 'تفتح الأزهار', color: 'bg-[#E11D48]' },
  ];

  const sizes: { id: AppSize; icon: React.ReactNode; label: string }[] = [
    { id: 'small', icon: <Minimize size={18} />, label: 'صغير' },
    { id: 'medium', icon: <Scaling size={18} />, label: 'متوسط' },
    { id: 'large', icon: <Maximize size={18} />, label: 'كبير' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {themes.map((t) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`relative flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-500 overflow-hidden group ${
              currentTheme === t.id
                ? 'bg-[var(--color-bg-surface)] border-2 border-[var(--color-primary)] shadow-2xl shadow-[var(--color-shadow)]'
                : 'glass opacity-60 border-[var(--glass-border)] hover:border-[var(--glass-border-hover)] hover:opacity-100'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${t.color}`}>
              {t.icon}
            </div>
            <div className="text-right">
              <div className="text-sm font-black">{t.label}</div>
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">ثيم النظام</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
        <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">حجم واجهة التطبيق</h4>
        <div className="flex bg-[var(--color-bg-surface)] rounded-[1.5rem] p-1 border border-[var(--color-border)]">
          {sizes.map((s) => (
            <button
              key={s.id}
              onClick={() => setAppSize(s.id)}
              className={`flex-1 py-3 px-4 flex flex-col items-center justify-center gap-2 rounded-2xl text-xs font-bold transition-all duration-300 ${
                appSize === s.id
                  ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-shadow)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--glass)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div className={appSize === s.id ? 'opacity-100 scale-110 transition-transform' : 'opacity-60'}>{s.icon}</div>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
