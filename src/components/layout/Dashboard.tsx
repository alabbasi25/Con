import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Package, 
  Plane, 
  Lock, 
  MessageSquare, 
  User, 
  Bell, 
  Fingerprint, 
  Menu, 
  X, 
  LayoutDashboard, 
  Wallet, 
  Target, 
  ListTodo, 
  Calendar, 
  Shield, 
  TrendingUp, 
  Activity, 
  Settings, 
  Sparkles, 
  Smile, 
  MessageCircle, 
  History, 
  FileText, 
  Bot,
  ChevronLeft,
  Search,
  Plus,
  LogOut,
  Send,
  Swords,
  Library,
  Book,
  Droplets,
  Zap,
  Baby,
  GraduationCap,
  ArrowLeft,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePlanet } from '../../context/KokabContext';
import { SystemDashboard } from '../features/SystemDashboard';
import { InventoryManager } from '../features/InventoryManager';
import { UnifiedLedger } from '../features/UnifiedLedger';
import { WorshipSync } from '../features/WorshipSync';
import { VitalSignsLog } from '../features/VitalSignsLog';
import { SecureVault } from '../features/SecureVault';
import { TravelPlanner } from '../features/TravelPlanner';
import { FutureFund } from '../features/FutureFund';
import { TaskOrchestrator } from '../features/TaskOrchestrator';
import { GlobalSchedule } from '../features/GlobalSchedule';
import { PrivateSanctum } from '../features/PrivateSanctum';
import { GratitudeFeed } from '../features/GratitudeFeed';
import { ConflictRoom } from '../features/ConflictRoom';
import { PermissionsManager } from '../features/PermissionsManager';
import { PersonalGrowth } from '../features/PersonalGrowth';
import { AIOracle } from '../features/AIOracle';
import { Arena } from '../features/Arena';
import { RomanceLounge } from '../features/RomanceLounge';
import { KnowledgeStudio } from '../features/KnowledgeStudio';
import { FocusSync } from '../features/FocusSync';
import { HydrationStation } from '../features/HydrationStation';
import { TimeCapsule } from '../features/TimeCapsule';
import { HapticPresence } from '../features/HapticPresence';
import { FutureFamily } from '../features/FutureFamily';
import { ProfilePage } from '../views/ProfilePage';
import { SimpleChat } from '../features/SimpleChat';
import { NotificationsPage } from '../features/NotificationsPage';
import { Logo } from '../ui/Logo';
import { NotificationCenter } from '../ui/NotificationCenter';
import { PlanetHealthSection } from '../ui/PlanetHealthSection';
import { TestConsole } from '../features/TestConsole';

import { MoodTracker } from '../features/MoodTracker';
import { SharedJournal } from '../features/SharedJournal';
import { LoveLanguageQuiz } from '../features/LoveLanguageQuiz';
import { DateNightAI } from '../features/DateNightAI';

type ViewID = 
  | 'arena' | 'romance' | 'knowledge' | 'focus' | 'conflict'
  | 'system' | 'ledger' | 'future_fund' | 'tasks' | 'inventory' | 'worship'
  | 'private' | 'growth' | 'health' | 'hydration' | 'travel' | 'family'
  | 'haptic' | 'gratitude' | 'capsule' | 'vault'
  | 'mood' | 'journal' | 'quiz' | 'dates'
  | 'home' | 'profile' | 'permissions' | 'ai' | 'chat' | 'couple_chat' | 'notifications';

export const Dashboard: React.FC<{ onSwitchUser: () => void }> = ({ onSwitchUser }) => {
  const { 
    currentUser, 
    partnerStatus, 
    planetHealth, 
    notifications,
    consensusRequests,
    resolveConsensus,
    populateTestData
  } = usePlanet();
  
  const [activeTab, setActiveTab] = useState<ViewID>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [presenceActive, setPresenceActive] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsKeyboardVisible(true);
      }
    };
    const handleFocusOut = () => {
      setIsKeyboardVisible(false);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const isChatView = activeTab === 'couple_chat';

  const handlePresencePulse = () => {
    setPresenceActive(true);
    if ('vibrate' in navigator) navigator.vibrate(200);
    setTimeout(() => setPresenceActive(false), 2000);
  };

  const menuItems = [
    // Relationship & Connection
    { id: 'gratitude', label: 'سجل المودة', icon: <Smile size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'notifications', label: 'نبض الكوكب', icon: <Bell size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'couple_chat', label: 'دردشة الزوجين', icon: <MessageSquare size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'romance', label: 'صالون الرومانسية', icon: <Heart size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'dates', label: 'اقتراحات السهرات', icon: <Sparkles size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'journal', label: 'يوميات الكوكب', icon: <Book size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'quiz', label: 'لغات الحب', icon: <Bot size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'haptic', label: 'بوابة الهمس', icon: <Fingerprint size={20} />, category: 'جسور المودة والتواصل' },
    { id: 'conflict', label: 'غرفة التفاهم', icon: <Shield size={20} />, category: 'جسور المودة والتواصل' },
    
    // Core & Finance
    { id: 'system', label: 'لوحة القيادة', icon: <LayoutDashboard size={20} />, category: 'المنظومة والمالية' },
    { id: 'ledger', label: 'الميزانية والمالية', icon: <Wallet size={20} />, category: 'المنظومة والمالية' },
    { id: 'future_fund', label: 'خزينة الأصول', icon: <Target size={20} />, category: 'المنظومة والمالية' },
    { id: 'tasks', label: 'محرك المهام', icon: <ListTodo size={20} />, category: 'إدارة الحياة اليومية' },
    { id: 'inventory', label: 'قائمة التوريد', icon: <Package size={20} />, category: 'إدارة الحياة اليومية' },
    { id: 'worship', label: 'المحراب', icon: <Sparkles size={20} />, category: 'إدارة الحياة اليومية' },

    // Growth & Health
    { id: 'mood', label: 'غلاف المشاعر', icon: <Smile size={20} />, category: 'النمو والصحة' },
    { id: 'health', label: 'السجل الصحي', icon: <Activity size={20} />, category: 'النمو والصحة' },
    { id: 'hydration', label: 'واحة الارتواء', icon: <Droplets size={20} />, category: 'النمو والصحة' },
    { id: 'growth', label: 'مسار النمو', icon: <TrendingUp size={20} />, category: 'النمو والصحة' },
    { id: 'knowledge', label: 'استوديو المعرفة', icon: <GraduationCap size={20} />, category: 'النمو والصحة' },
    { id: 'focus', label: 'وضع التركيز', icon: <Zap size={20} />, category: 'النمو والصحة' },
    { id: 'arena', label: 'ساحة التحديات', icon: <Swords size={20} />, category: 'النمو والصحة' },

    // Future & Private
    { id: 'family', label: 'مشروع العائلة', icon: <Baby size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'travel', label: 'مخطط الرحلات', icon: <Plane size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'capsule', label: 'كبسولة الزمن', icon: <History size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'vault', label: 'أرشيف المستندات', icon: <FileText size={20} />, category: 'المستقبل والخصوصية' },
    { id: 'private', label: 'القبو الشخصي', icon: <Lock size={20} />, category: 'المستقبل والخصوصية' },
  ];

  const renderView = () => {
    const viewProps = { setActiveTab };
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} />;
      case 'arena': return <Arena />;
      case 'romance': return <RomanceLounge />;
      case 'knowledge': return <KnowledgeStudio />;
      case 'focus': return <FocusSync />;
      case 'system': return <SystemDashboard />;
      case 'inventory': return <InventoryManager />;
      case 'ledger': return <UnifiedLedger />;
      case 'future_fund': return <FutureFund />;
      case 'tasks': return <TaskOrchestrator />;
      case 'worship': return <WorshipSync />;
      case 'private': return <PrivateSanctum />;
      case 'growth': return <PersonalGrowth />;
      case 'health': return <VitalSignsLog />;
      case 'hydration': return <HydrationStation />;
      case 'haptic': return <HapticPresence />;
      case 'gratitude': return <GratitudeFeed />;
      case 'conflict': return <ConflictRoom />;
      case 'mood': return <MoodTracker />;
      case 'journal': return <SharedJournal />;
      case 'quiz': return <LoveLanguageQuiz />;
      case 'dates': return <DateNightAI />;
      case 'capsule': return <TimeCapsule />;
      case 'travel': return <TravelPlanner />;
      case 'family': return <FutureFamily />;
      case 'vault': return <SecureVault />;
      case 'permissions': return <PermissionsManager />;
      case 'ai': return <AIOracle />;
      case 'chat': return <AIOracle />;
      case 'notifications': return <NotificationsPage />;
      case 'couple_chat': return <SimpleChat setActiveTab={setActiveTab} />;
      case 'profile': return <ProfilePage onSwitchUser={onSwitchUser} />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="h-[100dvh] w-full flex justify-center bg-[#0a0a0a]">
      {/* Test Console - hidden in actual mobile but usable for dev */}
      <div className="hidden lg:block absolute right-4 top-4 z-[200]">
        <TestConsole onSwitchUser={onSwitchUser} setActiveTab={setActiveTab} />
      </div>

      {/* Main Mobile Device Container */}
      <div className="w-full h-full max-w-md mx-auto relative overflow-hidden bg-[var(--bg-gradient)] flex flex-col shadow-2xl lg:border-x lg:border-[var(--glass-border)]">
        
        {/* Header */}
        <header className={`shrink-0 p-4 lg:p-6 flex justify-between items-center z-50 backdrop-blur-2xl transition-all duration-500 border-b border-[var(--color-border)]/20 ${isChatView ? 'bg-[var(--glass-active)]' : 'bg-transparent'}`}>
          <div className="flex items-center gap-4">
            {!isChatView && (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(true)}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--color-primary)] border border-[var(--glass-border)] shadow-sm [&>svg]:w-5 [&>svg]:h-5"
              >
                <Menu size={20} />
              </motion.button>
            )}
            {isChatView && (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab('home')}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--color-primary)] border border-[var(--glass-border)] shadow-sm [&>svg]:w-5 [&>svg]:h-5"
              >
                <ArrowLeft size={20} />
              </motion.button>
            )}
            
            {/* Mobile Header Title */}
            <div>
              {isChatView ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg glass p-0.5 overflow-hidden relative">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser === 'F' ? 'Bushra' : 'Fahad'}`} alt="Partner" />
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-black ${partnerStatus?.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                  </div>
                  <div>
                    <h1 className="text-sm font-black tracking-tight leading-none">{currentUser === 'F' ? 'بشرى' : 'فهد'}</h1>
                    <span className="text-[9px] font-bold opacity-60">{partnerStatus?.status === 'online' ? 'متصل الآن' : 'غير متصل'}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Logo size={24} />
                  <div>
                    <h1 className="text-base font-black italic serif tracking-tight text-[var(--color-primary)]">
                       {activeTab === 'home' ? 'كوكب' : menuItems.find(i => i.id === activeTab)?.label || 'الملف الشخصي'}
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
               <div className="text-[10px] font-black text-emerald-500">{planetHealth.score}%</div>
               <div className="text-[7px] uppercase tracking-widest opacity-40">الصحة</div>
             </div>
             <motion.button
               whileTap={{ scale: 0.9 }}
               onClick={onSwitchUser}
               className="w-8 h-8 rounded-lg glass flex items-center justify-center text-[var(--text-mute)] hover:text-[var(--color-text-primary)] border border-[var(--glass-border)] transition-all [&>svg]:w-4 [&>svg]:h-4"
             >
               <Users size={16} />
             </motion.button>
             <NotificationCenter />
          </div>
        </header>

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto no-scrollbar relative ${isChatView ? 'px-0 pb-0' : (isKeyboardVisible ? 'px-4 pb-4' : 'px-4 pb-24')} pt-2`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Dynamic Bottom Navigation */}
        <AnimatePresence>
          {!isChatView && !isKeyboardVisible && (
            <motion.nav 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[var(--color-bg-deep)]/80 via-[var(--color-bg-deep)]/50 to-transparent pb-safe pt-6 px-4"
            >
              <div className="bg-[var(--color-bg-card)]/90 backdrop-blur-2xl rounded-3xl p-1.5 flex justify-between items-center shadow-2xl border border-[var(--glass-border)] mb-4 mx-auto max-w-[360px]">
                <TabItem icon={<LayoutDashboard size={20} />} label="الكون" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
                <TabItem icon={<Package size={20} />} label="المخزون" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
                <div className="relative -top-6 px-1">
                  <motion.button 
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setActiveTab('couple_chat')}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-xl shadow-[var(--color-primary)]/40 flex items-center justify-center border-[3px] border-[var(--color-bg-card)] ${presenceActive ? 'animate-pulse' : ''}`}
                  >
                    <MessageSquare size={24} />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-[var(--color-bg-card)] flex items-center justify-center text-[8px] font-black">2</div>
                  </motion.button>
                </div>
                <TabItem icon={<Wallet size={20} />} label="المالية" active={activeTab === 'ledger'} onClick={() => setActiveTab('ledger')} />
                <TabItem icon={<User size={20} />} label="أنا" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
        
        {/* Overlays */}
        <MenuOverlay 
           isOpen={isMenuOpen} 
           onClose={() => setIsMenuOpen(false)} 
           menuItems={menuItems} 
           activeTab={activeTab} 
           setActiveTab={setActiveTab} 
        />
        
        <ConsensusOverlay 
           requests={consensusRequests} 
           currentUser={currentUser} 
           resolveConsensus={resolveConsensus} 
        />

      </div>
    </div>
  );
};

const TabItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <motion.button 
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-[1.25rem] transition-all duration-300 ${active ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-[var(--text-mute)] hover:text-[var(--color-text-primary)]'}`}
  >
    <div className={`transition-transform duration-300 [&>svg]:w-5 [&>svg]:h-5 ${active ? 'scale-110' : ''}`}>
      {icon}
    </div>
    <span className="text-xs scale-75 font-bold">{label}</span>
  </motion.button>
);


import { PlanetWeather } from '../features/PlanetWeather';

const HomeView: React.FC<{ setActiveTab: (tab: ViewID) => void }> = ({ setActiveTab }) => {
  const { planetHealth, populateTestData, currentUser } = usePlanet();
  
  return (
    <div className="space-y-12 py-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-[0.2em]"
          >
            نظام التشغيل نشط <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-ping" />
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none italic serif">
            أهلاً، {currentUser === 'F' ? 'فهد' : 'بشرى'}
          </h2>
          <p className="text-sm lg:text-base text-[var(--color-text-secondary)] font-bold max-w-md leading-relaxed opacity-70">
            كوكبك يدور بانتظام. إليك نظرة سريعة على توازنك الشخصي والمشترك اليوم.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-px bg-[var(--color-border)] hidden md:block" />
          <div className="text-left font-black tracking-tight">
            <div className="text-xs opacity-40 uppercase tracking-widest">تاريخ المجرّة</div>
            <div className="text-sm">
              {new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Health Card - Bento Focus */}
        <div className="lg:col-span-8 h-full">
           <PlanetHealthSection />
        </div>

        {/* Weather Card - Bento Side */}
        <div className="lg:col-span-4">
          <PlanetWeather />
        </div>

        {/* Logistics Bento */}
        <motion.div 
          whileHover={{ y: -8 }}
          onClick={() => setActiveTab('inventory')}
          className="lg:col-span-4 glass-card p-8 group cursor-pointer relative overflow-hidden h-64 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-0 duration-700">
            <Package size={120} />
          </div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <Package size={24} />
            </div>
            <div className="text-3xl font-black text-blue-500">{planetHealth.breakdown.logistics}%</div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black tracking-tight">اللوجستيات</h3>
              <p className="text-xs opacity-50 font-bold uppercase tracking-widest">إدارة الموارد والتموين</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= (planetHealth.breakdown.logistics / 20) ? 'bg-blue-500' : 'bg-[var(--glass)]'}`} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Finance Bento */}
        <motion.div 
          whileHover={{ y: -8 }}
          onClick={() => setActiveTab('ledger')}
          className="lg:col-span-4 glass-card p-8 group cursor-pointer relative overflow-hidden h-64 flex flex-col justify-between border-emerald-500/20"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12 group-hover:rotate-0 duration-700">
            <Wallet size={120} />
          </div>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <Wallet size={24} />
            </div>
            <div className="text-3xl font-black text-emerald-500">{planetHealth.breakdown.finance}%</div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black tracking-tight">المالية</h3>
              <p className="text-xs opacity-50 font-bold uppercase tracking-widest">توازن الموارد المادية</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold opacity-60">النمو المالي مستقر هذا الشهر</span>
            </div>
          </div>
        </motion.div>

        {/* Spiritual/Health Mix Bento */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab('worship')}
            className="glass-card p-6 flex flex-col justify-between border-purple-500/20 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-purple-500">{planetHealth.breakdown.spiritual}%</div>
              <div className="text-[10px] font-black uppercase opacity-40">الروحانيات</div>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab('health')}
            className="glass-card p-6 flex flex-col justify-between border-rose-500/20 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-black text-rose-500">{planetHealth.breakdown.health}%</div>
              <div className="text-[10px] font-black uppercase opacity-40">الصحة</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Access Bar - Scrollable for Mobile */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-4 px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 whitespace-nowrap">الوصول السريع</h3>
          <div className="flex-1 h-px bg-[var(--glass)]" />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={populateTestData} 
            className="px-4 py-1.5 rounded-full glass border-[var(--glass-border)] text-[10px] font-black uppercase tracking-wider text-[var(--color-primary)] shrink-0"
          >
            إعادة المزامنة
          </motion.button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1 -mx-2 lg:mx-0 lg:grid lg:grid-cols-5">
          <QuickAction 
            icon={<Plus size={22} />} 
            label="تسجيل مصروف" 
            color="blue" 
            desc="إضافة فاتورة جديدة"
            onClick={() => setActiveTab('ledger')}
          />
          <QuickAction 
            icon={<ListTodo size={22} />} 
            label="مهمة جديدة" 
            color="emerald" 
            desc="تنسيق الحياة اليومية"
            onClick={() => setActiveTab('tasks')}
          />
          <QuickAction 
            icon={<Sparkles size={22} />} 
            label="ورد ذكر" 
            color="purple" 
            desc="رفع طاقة الكوكب"
            onClick={() => setActiveTab('worship')}
          />
          <QuickAction 
            icon={<Heart size={22} />} 
            label="صالون الورد" 
            color="rose" 
            desc="عزز جسور التواصل"
            onClick={() => setActiveTab('romance')}
          />
          <QuickAction 
            icon={<Zap size={22} />} 
            label="تركيز مفرط" 
            color="amber" 
            desc="بدء جلسة عمل عميق"
            onClick={() => setActiveTab('focus')}
          />
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: React.ReactNode; label: string; color: string; desc: string; onClick: () => void }> = ({ icon, label, color, desc, onClick }) => {
  const colorMap = {
    blue: 'bg-blue-500/20 text-blue-500 border-blue-500/20 hover:bg-blue-500 hover:text-[var(--color-text-primary)]',
    emerald: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500 hover:text-[var(--color-text-primary)]',
    purple: 'bg-purple-500/20 text-purple-500 border-purple-500/20 hover:bg-purple-500 hover:text-[var(--color-text-primary)]',
    rose: 'bg-rose-500/20 text-rose-500 border-rose-500/20 hover:bg-rose-500 hover:text-[var(--color-text-primary)]',
    amber: 'bg-amber-500/20 text-amber-500 border-amber-500/20 hover:bg-amber-500 hover:text-[var(--color-text-primary)]'
  };

  return (
    <motion.button 
      whileHover={{ y: -5, x: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="glass-card p-6 flex flex-col items-start text-right gap-4 group transition-all duration-300 border-[var(--glass-border)] relative overflow-hidden flex-shrink-0 w-32 lg:w-auto"
    >
      <div className="absolute -left-4 -top-4 w-12 h-12 bg-[var(--glass)] rounded-full blur-xl group-hover:bg-[var(--glass-active)] transition-all" />
      <div className={`w-12 h-12 rounded-2xl ${colorMap[color as keyof typeof colorMap].split(' hover:')[0]} flex items-center justify-center transition-all duration-500 relative z-10 group-hover:scale-110 shadow-lg shrink-0`}>
        {icon}
      </div>
      <div className="space-y-1 relative z-10 text-right w-full mt-auto">
        <div className="text-sm font-black tracking-tight">{label}</div>
        <div className="text-[10px] opacity-40 font-bold leading-tight line-clamp-1">{desc}</div>
      </div>
    </motion.button>
  );
};

const MenuOverlay: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  menuItems: any[];
  activeTab: string;
  setActiveTab: (id: ViewID) => void;
}> = ({ isOpen, onClose, menuItems, activeTab, setActiveTab }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[var(--color-bg-deep)]/80 backdrop-blur-sm z-[100]"
        />
        <motion.div 
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[var(--color-bg-card)]/95 backdrop-blur-3xl z-[101] shadow-2xl flex flex-col border-l border-[var(--glass-border)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
          
          <div className="p-6 flex justify-between items-center border-b border-[var(--glass-border)] relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                <Logo size={24} />
              </div>
              <div className="text-right">
                <div className="text-base font-black italic serif">بوابة الكوكب</div>
                <div className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Command Center</div>
              </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onClose} 
              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-[var(--text-mute)] hover:text-[var(--color-text-primary)]"
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar relative z-10">
            {['جسور المودة والتواصل', 'المنظومة والمالية', 'إدارة الحياة اليومية', 'النمو والصحة', 'المستقبل والخصوصية'].map(cat => (
              <div key={cat} className="space-y-3">
                <div className="flex items-center gap-3 px-1">
                   <h3 className="text-[9px] font-black uppercase tracking-[0.1em] opacity-40 whitespace-nowrap">{cat}</h3>
                   <div className="flex-1 h-px bg-gradient-to-l from-[var(--glass-hover)] to-transparent" />
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {menuItems.filter(item => item.category === cat).map(item => (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={item.id}
                      onClick={() => { setActiveTab(item.id as ViewID); onClose(); }}
                      className={`w-full p-3.5 rounded-[1.25rem] flex items-center gap-3 transition-all duration-300 ${activeTab === item.id ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'bg-[var(--glass)] text-[var(--color-text-secondary)] border border-[var(--glass-border)] hover:bg-[var(--glass-hover)]'}`}
                    >
                      <div className={activeTab === item.id ? 'opacity-100' : 'opacity-60'}>
                         {item.icon}
                      </div>
                      <span className="text-sm font-bold">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[var(--glass-active)] border-t border-[var(--glass-border)] relative z-10 pb-safe">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="w-full p-4 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-500/5 group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> خروج
            </motion.button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const ConsensusOverlay: React.FC<{
  requests: any[];
  currentUser: string;
  resolveConsensus: (id: string, approved: boolean) => void;
}> = ({ requests, currentUser, resolveConsensus }) => (
  <AnimatePresence>
    {requests.filter(r => r.status === 'pending' && r.requestedBy !== currentUser).map(req => (
      <motion.div 
        key={req.id}
        initial={{ y: 200, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 200, opacity: 0, scale: 0.9 }}
        className="absolute bottom-28 left-4 right-4 z-[60] glass p-5 border-amber-500/30 shadow-[0_20px_50px_rgba(245,158,11,0.2)] rounded-[2rem] backdrop-blur-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="w-12 h-12 rounded-[1.25rem] bg-amber-500/20 text-amber-500 flex items-center justify-center border border-amber-500/20 shrink-0">
            <Shield size={24} />
          </div>
          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <h4 className="text-xs font-black italic serif text-amber-500">طلب توافق ثنائي</h4>
              <p className="text-[10px] font-bold opacity-80 leading-relaxed">
                يطلب <span className="text-white">{req.requestedBy === 'F' ? 'فهد' : 'بشرى'}</span> تنفيذ إجراء {req.type === 'transaction' ? 'مالي هام' : 'إضافة موعد'}.
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => resolveConsensus(req.id, true)}
                className="flex-1 py-2.5 rounded-lg bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20"
              >
                تأكيد الإجراء
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => resolveConsensus(req.id, false)}
                className="flex-1 py-2.5 rounded-lg bg-rose-500/10 text-rose-500 text-[9px] font-black uppercase tracking-widest border border-rose-500/20"
              >
                رفض
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
);

const PillarCard: React.FC<{ label: string; value: number; color: 'blue' | 'emerald' | 'purple' | 'rose'; icon: React.ReactNode }> = ({ label, value, color, icon }) => {
  const colorMap = {
    blue: 'bg-blue-500 text-blue-500',
    emerald: 'bg-emerald-500 text-emerald-500',
    purple: 'bg-purple-500 text-purple-500',
    rose: 'bg-rose-500 text-rose-500'
  };

  return (
    <div className="glass-card p-5 space-y-4 relative overflow-hidden group">
      <div className="absolute -right-2 -top-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        {React.cloneElement(icon as React.ReactElement, { size: 64 })}
      </div>
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-2 rounded-lg ${colorMap[color].split(' ')[0]}/10 ${colorMap[color].split(' ')[1]}`}>
          {icon}
        </div>
        <span className={`text-lg font-black ${colorMap[color].split(' ')[1]}`}>{value}%</span>
      </div>
      <div className="space-y-2 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">{label}</span>
        <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${colorMap[color].split(' ')[0]}`}
          />
        </div>
      </div>
    </div>
  );
};
