import React, { useRef } from 'react';
import { 
  Terminal, CheckSquare, Layers, Bot, Info, Volume2, VolumeX, Sun, Moon, 
  BookOpen, Type, Compass, Volume1, Sparkles, Flag, Globe, Palette, Gauge, 
  FolderPlus, Image as ImageIcon, ShieldCheck, ChevronLeft, ChevronRight, LayoutGrid
} from 'lucide-react';
import { ActiveTab, TerminalTheme, FontFamilyType, SoundSoftness, FourTheme, AppLanguage, TypingSpeed } from '../types';
import { playMechanicalKeyClick, setTypingSpeed } from '../utils/audio';
import { t } from '../utils/i18n';
import { AuthStatusBadge } from './AuthStatusBadge';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  soundOn: boolean;
  onToggleSound: () => void;
  soundSoftness: SoundSoftness;
  onChangeSoundSoftness: (softness: SoundSoftness) => void;
  typingSpeed: TypingSpeed;
  onChangeTypingSpeed: (speed: TypingSpeed) => void;
  fontFamily: FontFamilyType;
  onChangeFont: (font: FontFamilyType) => void;
  theme: TerminalTheme;
  onToggleTheme: () => void;
  fourTheme: FourTheme;
  onChangeFourTheme: (theme: FourTheme) => void;
  language: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  soundOn,
  onToggleSound,
  soundSoftness,
  onChangeSoundSoftness,
  typingSpeed,
  onChangeTypingSpeed,
  fontFamily,
  onChangeFont,
  theme,
  onToggleTheme,
  fourTheme,
  onChangeFourTheme,
  language,
  onChangeLanguage,
}) => {
  const isLight = theme === 'light';

  const fonts: { id: FontFamilyType; label: string }[] = [
    { id: 'python', label: '1. Python (JetBrains)' },
    { id: 'arial', label: '2. Arial / Arimo' },
    { id: 'calibri', label: '3. Calibri / Carlito' },
    { id: 'times', label: '4. Times New Roman' },
    { id: 'segoe', label: '5. Segoe UI' },
    { id: 'roboto', label: '6. Roboto (Google)' },
    { id: 'fira', label: '7. Fira Code' },
    { id: 'lora', label: '8. Lora (Sư phạm SGK)' },
  ];

  const fourThemesList: { id: FourTheme; label: string; icon: string; color: string }[] = [
    { id: 'nature', label: t(language, 'themeNature'), icon: '🌲', color: 'text-sky-600' },
    { id: 'greenery', label: t(language, 'themeGreenery'), icon: '🌿', color: 'text-emerald-600' },
    { id: 'technology', label: t(language, 'themeTechnology'), icon: '💻', color: 'text-blue-600' },
    { id: 'lecturer', label: t(language, 'themeLecturer'), icon: '👨‍🏫', color: 'text-amber-700' },
  ];

  const handleTestSound = () => {
    playMechanicalKeyClick();
  };

  const handleSpeedChange = (speed: TypingSpeed) => {
    onChangeTypingSpeed(speed);
    setTypingSpeed(speed);
    playMechanicalKeyClick();
  };

  const navScrollRef = useRef<HTMLElement>(null);

  const scrollNav = (direction: 'left' | 'right') => {
    playMechanicalKeyClick();
    if (navScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      navScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="app-header"
      className={`border-b sticky top-0 z-50 transition-all duration-300 glass-panel-50 ${
        isLight
          ? 'bg-white/50 border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
          : 'bg-neutral-950/50 border-neutral-800/80 shadow-xl'
      }`}
    >
      {/* Top Banner: Tin Học 10 & 11 KNTT + Vietnam Info + Controls */}
      <div
        className={`px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between text-xs border-b transition-colors gap-2 glass-panel-50 ${
          isLight
            ? 'bg-white/50 border-slate-200/60 text-slate-700'
            : 'bg-black/50 border-neutral-900/60 text-neutral-400'
        }`}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {/* Vietnam Flag Badge */}
          <span className="inline-flex items-center gap-1.5 font-bold text-red-700 dark:text-red-400 bg-red-100/70 dark:bg-red-950/50 border border-red-300/80 dark:border-red-800 px-2 py-0.5 rounded shadow-2xs">
            <span className="text-sm">🇻🇳</span>
            <span>{t(language, 'countryVietnam')}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/50 border border-blue-300/80 dark:border-blue-800 px-2.5 py-0.5 rounded shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Tin học 10 & 11 (KNTT)</span>
          </span>

          <span className="font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300/70 dark:border-emerald-800 px-2 py-0.5 rounded text-[11px] hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Python & C++ (Bài 1 - 25)</span>
          </span>

          {/* 50% opacity tag */}
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-mono hidden md:inline-flex">
            50% Blur Glass
          </span>
        </div>

        {/* Toolbar: Auth, Language, 4 Themes, etc. */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap ml-auto">
          {/* Firebase Google / Email Auth Status & Login Button */}
          <AuthStatusBadge isLight={isLight} />

          {/* 1. Language Switcher (VI / EN / ZH) */}
          <div className="flex items-center rounded border bg-white/70 dark:bg-neutral-900/70 border-slate-300 dark:border-neutral-700 p-0.5 text-xs shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mx-1 shrink-0" />
            <button
              id="lang-vi-btn"
              onClick={() => onChangeLanguage('vi')}
              className={`px-1.5 py-0.5 rounded font-semibold text-[11px] transition-all cursor-pointer ${
                language === 'vi'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
              title="Tiếng Việt"
            >
              VI 🇻🇳
            </button>
            <button
              id="lang-en-btn"
              onClick={() => onChangeLanguage('en')}
              className={`px-1.5 py-0.5 rounded font-semibold text-[11px] transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
              title="English"
            >
              EN 🇬🇧
            </button>
            <button
              id="lang-zh-btn"
              onClick={() => onChangeLanguage('zh')}
              className={`px-1.5 py-0.5 rounded font-semibold text-[11px] transition-all cursor-pointer ${
                language === 'zh'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
              title="中文 (简体)"
            >
              ZH 🇨🇳
            </button>
          </div>

          {/* 2. Four Themes Switcher (50% Blur: Nature, Greenery, Tech, Lecturer) */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded border bg-white/70 dark:bg-neutral-900/70 border-slate-300 dark:border-neutral-700 text-xs shadow-2xs">
            <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-semibold text-slate-500 dark:text-neutral-400 hidden xl:inline text-[11px]">
              Giao diện:
            </span>
            <div className="flex items-center gap-0.5">
              {fourThemesList.map((th) => (
                <button
                  key={th.id}
                  onClick={() => onChangeFourTheme(th.id)}
                  title={`${th.label} (Nền mờ 50%)`}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    fourTheme === th.id
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{th.icon}</span>
                  <span className="hidden lg:inline">{th.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Typing Speed Selector ("đánh nhanh gõ tiếng chậm/nhanh") */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded border bg-white/70 dark:bg-neutral-900/70 border-slate-300 dark:border-neutral-700 text-xs shadow-2xs">
            <Gauge className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-semibold text-slate-500 dark:text-neutral-400 hidden xl:inline text-[11px]">
              {t(language, 'typingSpeedLabel')}:
            </span>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => handleSpeedChange('slow')}
                title="Gõ chậm (Thư giãn, âm thanh trầm bổng)"
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  typingSpeed === 'slow'
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
                }`}
              >
                {t(language, 'speedSlow')}
              </button>
              <button
                onClick={() => handleSpeedChange('normal')}
                title="Tiêu chuẩn"
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  typingSpeed === 'normal'
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
                }`}
              >
                {t(language, 'speedNormal')}
              </button>
              <button
                onClick={() => handleSpeedChange('fast')}
                title="Đánh nhanh (Gõ tốc độ cao, âm thanh lách cách giòn giã)"
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  typingSpeed === 'fast'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800'
                }`}
              >
                {t(language, 'speedFast')}
              </button>
            </div>
          </div>

          {/* 4. Font Selector - Always visible on all screens */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border bg-white/80 dark:bg-neutral-900/80 border-slate-300 dark:border-neutral-700 text-[11px] shadow-2xs">
            <Type className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-semibold text-slate-500 dark:text-neutral-400 hidden sm:inline text-[11px]">
              Phông:
            </span>
            <select
              value={fontFamily}
              onChange={(e) => onChangeFont(e.target.value as FontFamilyType)}
              className="bg-transparent font-medium outline-none cursor-pointer text-slate-800 dark:text-neutral-200 pr-1 text-xs"
              title="Chọn phông chữ hiển thị"
            >
              {fonts.map((f) => (
                <option key={f.id} value={f.id} className="text-slate-900 bg-white dark:bg-neutral-900 dark:text-white">
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Sound On / Off Toggle */}
          <button
            id="toggle-sound-btn"
            onClick={onToggleSound}
            title={soundOn ? 'Tắt âm thanh bàn phím' : 'Bật âm thanh bàn phím'}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
              soundOn
                ? 'bg-blue-100/80 border-blue-300 text-blue-800 hover:bg-blue-200/80 dark:bg-blue-950/60 dark:border-blue-700 dark:text-blue-300'
                : 'bg-white/70 hover:bg-slate-100 text-slate-500 border-slate-300 dark:bg-neutral-900/70 dark:border-neutral-800 dark:text-neutral-400'
            }`}
          >
            {soundOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="hidden sm:inline">Âm: BẬT</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Âm: TẮT</span>
              </>
            )}
          </button>

          {/* 6. Theme Switcher: Light vs Dark */}
          <button
            id="toggle-theme-btn"
            onClick={onToggleTheme}
            title={isLight ? 'Chuyển sang giao diện Tối' : 'Chuyển sang giao diện Sáng'}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
              isLight
                ? 'bg-white/70 hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-neutral-900/70 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
            }`}
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar - Stretched edge-to-edge horizontally */}
      <div className="w-full px-3 sm:px-5 lg:px-8 py-1.5 md:py-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-2xs transition-transform shrink-0 ${
              isLight
                ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/20'
                : 'bg-blue-600 text-white border-blue-400 shadow-blue-500/30'
            }`}
          >
            <Terminal className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-sm md:text-base font-black tracking-tight leading-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                TIN HỌC 10 & 11 KNTT
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
                Bài 1 - 25
              </span>
            </div>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'} line-clamp-1`}>
              Hệ thống ôn luyện Tin học THPT • Nguồn ảnh (≥ 2 ảnh) • Giao diện 4 màu nền mờ 50%
            </p>
          </div>
        </div>

        {/* Navigation Tabs Container with visible horizontal scrollbar and control buttons */}
        <div className="relative flex items-center min-w-0 max-w-full">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollNav('left')}
            className={`hidden sm:flex items-center justify-center w-7 h-7 rounded-lg border mr-1 shrink-0 transition-colors shadow-xs cursor-pointer ${
              isLight 
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
            }`}
            title="Cuộn sang trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Navigation Bar with Visible Horizontal Scrollbar */}
          <nav 
            ref={navScrollRef}
            className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scroll-smooth select-none min-w-0" 
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: isLight ? '#93c5fd #e0f2fe' : '#3b82f6 #172554'
            }}
            aria-label="Main Navigation"
          >
            {/* Tab: Bài 1 - 25 Python & C++ */}
          <button
            id="tab-terminal"
            onClick={() => onSelectTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'terminal'
                ? isLight
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white text-black font-bold'
                : isLight
                  ? 'text-blue-700 hover:text-blue-800 hover:bg-blue-100/70 bg-blue-50/70 border border-blue-200'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{t(language, 'tabLessons')}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                activeTab === 'terminal' ? 'bg-white' : 'bg-emerald-500'
              }`}
            ></span>
          </button>

          {/* Tab: Study Pack (4 Mode: Xem lại, Quiz, Flashcard, Quản lý) */}
          <button
            id="tab-study-pack"
            onClick={() => onSelectTab('study_pack')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'study_pack'
                ? 'bg-[#1a5fb4] text-white font-bold shadow-xs'
                : isLight
                  ? 'text-blue-700 hover:text-blue-900 hover:bg-blue-100/70 bg-blue-50/80 border border-blue-300 font-bold'
                  : 'text-blue-300 hover:text-white hover:bg-blue-950/50 border border-blue-700/60 font-bold'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-blue-500" />
            <span>{t(language, 'tabStudyPack')}</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold border border-amber-300">
              4 Mode
            </span>
          </button>

          {/* Tab: Nhập Học Liệu (Tối thiểu 2 ảnh) */}
          <button
            id="tab-materials"
            onClick={() => onSelectTab('materials')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'materials'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : isLight
                  ? 'text-purple-700 hover:text-purple-800 hover:bg-purple-100/70 bg-purple-50/70 border border-purple-200'
                  : 'text-purple-300 hover:text-white hover:bg-purple-950/40 border border-purple-800/60'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5 text-purple-500" />
            <span>{t(language, 'tabMaterials')}</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 font-bold border border-purple-300 flex items-center gap-0.5">
              <ImageIcon className="w-2.5 h-2.5" />
              ≥2 ảnh
            </span>
          </button>

          {/* Tab: Cấu Trúc */}
          <button
            id="tab-structure"
            onClick={() => onSelectTab('structure')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'structure'
                ? isLight
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white text-black font-bold'
                : isLight
                  ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t(language, 'tabStructure')}</span>
          </button>

          {/* Tab: Nghiệm Thu */}
          <button
            id="tab-milestone"
            onClick={() => onSelectTab('milestone')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'milestone'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : isLight
                  ? 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50'
                  : 'text-emerald-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t(language, 'tabMilestone')}</span>
            <span className="text-[10px] px-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 font-bold">
              M1
            </span>
          </button>

          {/* Tab: Trắc Nghiệm */}
          <button
            id="tab-quiz"
            onClick={() => onSelectTab('quiz')}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? isLight
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white text-black font-bold'
                : isLight
                  ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{t(language, 'tabQuiz')}</span>
          </button>

          {/* Tab: Flashcards */}
          <button
            id="tab-flashcards"
            onClick={() => onSelectTab('flashcards')}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'flashcards'
                ? isLight
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white text-black font-bold'
                : isLight
                  ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t(language, 'tabFlashcards')}</span>
          </button>

          {/* Tab: Trợ Giảng AI */}
          <button
            id="tab-ai-tutor"
            onClick={() => onSelectTab('ai_tutor')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ai_tutor'
                ? isLight
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white text-black font-bold'
                : isLight
                  ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{t(language, 'tabAiTutor')}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 font-bold border border-blue-300">
              Grounded AI
            </span>
          </button>

          {/* Tab: Nguyên Tắc AI (GDPT 2018 Đạo đức học đường) */}
          <button
            id="tab-ai-principles"
            onClick={() => onSelectTab('ai_principles')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ai_principles'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : isLight
                  ? 'text-amber-800 hover:text-amber-900 hover:bg-amber-100/70 bg-amber-50/70 border border-amber-200'
                  : 'text-amber-300 hover:text-white hover:bg-amber-950/40 border border-amber-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>{t(language, 'tabAiPrinciples')}</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 font-bold">
              Mới
            </span>
          </button>

          {/* Tab: Giới Thiệu */}
          <button
            id="tab-about"
            onClick={() => onSelectTab('about')}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'about'
                ? isLight
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white text-black font-bold'
                : isLight
                  ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t(language, 'tabAbout')}</span>
          </button>
        </nav>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => scrollNav('right')}
          className={`hidden sm:flex items-center justify-center w-7 h-7 rounded-lg border ml-1 shrink-0 transition-colors shadow-xs cursor-pointer ${
            isLight 
              ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
              : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
          }`}
          title="Cuộn sang phải"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </header>
  );
};
