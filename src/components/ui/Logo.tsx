import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const Logo: React.FC<{ size?: number; showText?: boolean }> = ({ size = 40, showText = true }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        {/* Background Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"
        />
        
        {/* Main Logo Container */}
        <div 
          className="relative glass rounded-2xl flex items-center justify-center overflow-hidden border border-[var(--glass-border-hover)] shadow-xl"
          style={{ width: size, height: size }}
        >
          {/* AI-like generated texture background */}
          <img 
            src={`https://picsum.photos/seed/planet-harmony-${size}/200/200`}
            alt="Logo Texture"
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay grayscale"
            referrerPolicy="no-referrer"
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="text-[var(--color-primary)]" size={size * 0.5} />
            </motion.div>
            <div className={`w-[${size * 0.4}px] h-[2px] bg-[var(--color-primary)]/40 rounded-full mt-1 animate-pulse`} />
          </div>
          
          {/* Shine effect */}
          <motion.div 
            animate={{ left: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[var(--glass-hover)] to-transparent -skew-x-12"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tighter text-[var(--color-text-primary)]">
            KOKAB<span className="text-[var(--color-primary)]">.</span>
          </span>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">
            Harmonious Living
          </span>
        </div>
      )}
    </div>
  );
};
