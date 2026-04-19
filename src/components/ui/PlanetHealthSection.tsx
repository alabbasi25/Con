import React from 'react';
import { motion } from 'motion/react';
import { usePlanet } from '../../context/KokabContext';
import { Activity, ShieldCheck, Heart, Coins, TrendingUp, Info, Package, Zap } from 'lucide-react';

export const PlanetHealthSection: React.FC = () => {
  const { planetHealth } = usePlanet();

  const getMetricColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  const metrics = [
    { label: 'اللوجستيات', score: planetHealth.breakdown.logistics, icon: <Package size={18} />, color: 'emerald', bg: 'bg-emerald-500', text: 'text-emerald-500' },
    { label: 'المالية', score: planetHealth.breakdown.finance, icon: <Coins size={18} />, color: 'amber', bg: 'bg-amber-500', text: 'text-amber-500' },
    { label: 'الروحانيات', score: planetHealth.breakdown.spiritual, icon: <Heart size={18} />, color: 'rose', bg: 'bg-rose-500', text: 'text-rose-500' },
    { label: 'الصحة البدنية', score: planetHealth.breakdown.health, icon: <Zap size={18} />, color: 'blue', bg: 'bg-blue-500', text: 'text-blue-500' },
  ];

  return (
    <div className="glass-card p-4 md:p-6 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <ShieldCheck size={120} />
      </div>

      <div className="flex justify-between items-start relative z-10 mb-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 flex items-center gap-2">
            مؤشر توازن الكوكب <Info size={10} />
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--color-primary)]">%{planetHealth.score}</h2>
            <span className={`text-[10px] font-black uppercase ${getMetricColor(planetHealth.score)}`}>
              {planetHealth.score >= 80 ? 'مثالي' : planetHealth.score >= 50 ? 'مستقر' : 'حرج'}
            </span>
          </div>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 relative z-10">
        {metrics.map((m) => (
          <div key={m.label} className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[var(--glass)] border border-[var(--glass-border)] space-y-2 md:space-y-3">
            <div className="flex items-center justify-between">
              <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl ${m.bg}/10 ${m.text}`}>
                {m.icon}
              </div>
              <span className="text-lg md:text-xl font-black">{m.score}</span>
            </div>
            <div>
              <div className="text-[8px] md:text-[9px] font-black opacity-40 uppercase tracking-tighter mb-1">{m.label}</div>
              <div className="h-1 w-full bg-[var(--glass)] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${m.score}%` }}
                  className={`h-full ${m.bg}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
