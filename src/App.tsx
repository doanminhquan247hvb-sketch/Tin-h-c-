/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ActiveTab, 
  TerminalTheme, 
  FontFamilyType, 
  SoundSoftness, 
  FourTheme, 
  AppLanguage, 
  TypingSpeed, 
  StudyMaterial 
} from './types';
import { Header } from './components/Header';
import { TerminalView } from './components/TerminalView';
import { InputMaterialsView } from './components/InputMaterialsView';
import { QuizPreview } from './components/QuizPreview';
import { FlashcardPreview } from './components/FlashcardPreview';
import { QASeedPreview } from './components/QASeedPreview';
import { AIChatPreview } from './components/AIChatPreview';
import { AIPrinciplesView } from './components/AIPrinciplesView';
import { AboutView } from './components/AboutView';
import { StructureView } from './components/StructureView';
import { MilestoneView } from './components/MilestoneView';
import { StudyPack4ModeView } from './components/StudyPack4ModeView';
import { 
  isSoundEnabled, 
  setSoundEnabled, 
  getSoundSoftness, 
  setSoundSoftness as updateSoundSoftness, 
  getTypingSpeed, 
  setTypingSpeed as updateTypingSpeed,
  playMechanicalKeyClick
} from './utils/audio';
import { t } from './utils/i18n';
import { 
  subscribeToast, 
  showGlobalToast, 
  ToastMessage, 
  triggerGlobalSave 
} from './utils/keyboardShortcuts';
import { 
  TopicSnapshot, 
  loadSnapshotsFromStorage, 
  saveTopicSnapshot, 
  renameTopicSnapshot, 
  deleteTopicSnapshot, 
  buildSnapshotFromWorkingCopy, 
  getActiveSnapshotId, 
  setActiveSnapshotId 
} from './utils/topicSnapshotEngine';
import { TopicSnapshotBar } from './components/TopicSnapshotBar';
import { TopicSnapshotManagerModal } from './components/TopicSnapshotManagerModal';
import { loadFlashcardsFromStorage, saveFlashcardsToStorage } from './utils/flashcardEngine';
import { loadPracticeQuestionsFromStorage, savePracticeQuestionsToStorage } from './utils/questionEngine';
import { loadQASeedsFromStorage, saveQASeedsToStorage } from './utils/qaSeedEngine';
import { AlertTriangle, ShieldCheck, MapPin, CheckCircle2, Database, Check } from 'lucide-react';

const INITIAL_DEFAULT_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-01',
    title: 'Cú pháp vòng lặp for và while trong Python',
    type: 'text',
    subjectTopic: 'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python cơ bản',
    content: 'Vòng lặp for: for i in range(start, stop, step):\nVòng lặp while: while dieu_kien:\nỨng dụng trong các bài toán duyệt dãy số và tính tổng SGK Tin 10 KNTT.',
    createdAt: new Date().toISOString(),
    grade: 'tin10',
    lessonNumber: 16
  },
  {
    id: 'mat-02',
    title: 'Sơ đồ luồng thuật toán tìm kiếm nhị phân & Sắp xếp chèn',
    type: 'image',
    subjectTopic: 'Tin học 11 (KNTT) - Chủ đề 1: Cấu trúc dữ liệu & Thuật toán',
    content: 'Sơ đồ khối trực quan minh họa chia đôi khoảng tìm kiếm log2(N) và thuật toán Insertion Sort trong SGK Tin 11 KNTT.',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: new Date().toISOString(),
    grade: 'tin11',
    lessonNumber: 21
  },
  {
    id: 'mat-03',
    title: 'Chuyên đề: Cấu trúc dữ liệu và giải thuật Tin học THPT',
    type: 'url',
    subjectTopic: 'Chuyên đề C++ & Python HSG THPT',
    content: 'Tài liệu liên kết bài giảng trực tuyến tổng hợp 25 dạng bài cơ bản đến nâng cao cho học sinh lớp 10 và 11.',
    sourceUrl: 'https://vietjack.com/tin-hoc-11/chuyen-de-sap-xep-tim-kiem.jsp',
    createdAt: new Date().toISOString(),
    grade: 'tin11',
    lessonNumber: 15
  },
  {
    id: 'mat-04',
    title: 'Kế hoạch ôn tập 3 tuần: Cấu trúc dữ liệu & Thuật toán Tin 11',
    type: 'plan',
    subjectTopic: 'Tin học 11 (KNTT) - Chủ đề 1: Cấu trúc dữ liệu & Thuật toán (Bài 1 - 25)',
    content: `[LOẠI: PLAN - KẾ HOẠCH HỌC TẬP]
• Tuần 1: Ôn tập mảng 1 chiều, 2 chiều và danh sách List trong Python / C++.
• Tuần 2: Thuật toán tìm kiếm tuần tự và tìm kiếm nhị phân chia đôi khoảng O(logN).
• Tuần 3: Thuật toán sắp xếp nổi bọt (Bubble Sort) và sắp xếp chèn (Insertion Sort).
• Mục tiêu tự lực: Tự vẽ sơ đồ khối và trace table từng bước, không sao chép máy móc từ AI.`,
    promptText: 'Hãy đóng vai Trợ giảng Tin học THPT: Đưa ra 3 câu hỏi gợi ý tư duy cho thuật toán tìm kiếm nhị phân theo SGK Tin 11 Kết Nối Tri Thức, không đưa ra code hoàn chỉnh.',
    createdAt: new Date().toISOString(),
    grade: 'tin11',
    lessonNumber: 22
  },
  {
    id: 'mat-05',
    title: 'Ghi chú trọng tâm: 3 Bẫy lỗi thường gặp khi viết vòng lặp và danh sách',
    type: 'note',
    subjectTopic: 'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python (Bài 1 - 26)',
    content: `[LOẠI: NOTE - GHI CHÚ TRỌNG TÂM]
1. Bẫy lỗi IndexError: Chỉ số trong Python bắt đầu từ 0 đến len(arr)-1, duyệt range(1, len(arr)+1) sẽ gây lỗi truy cập ngoài mảng.
2. Bẫy vòng lặp vô tận while: Luôn đảm bảo biến điều kiện được cập nhật sau mỗi vòng lặp.
3. Bẫy kiểu dữ liệu nhập vào: input() luôn trả về chuỗi str, cần dùng int(input()) hoặc float(input()) để tính toán số học.`,
    promptText: 'Em đang làm bài tập kiểm tra số nguyên tố bằng Python. Khi chạy với số âm hoặc số 1 thì chương trình báo kết quả sai. Hãy chỉ ra điều kiện biên cần lưu ý theo SGK Tin 10.',
    createdAt: new Date().toISOString(),
    grade: 'tin10',
    lessonNumber: 17
  }
];

// High-resolution background wallpapers for the 4 themes
const THEME_WALLPAPERS: Record<FourTheme, string> = {
  nature: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80',
  greenery: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&auto=format&fit=crop&q=80',
  technology: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&auto=format&fit=crop&q=80',
  lecturer: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&auto=format&fit=crop&q=80',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('terminal');
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());
  const [soundSoftness, setSoundSoftnessState] = useState<SoundSoftness>(getSoundSoftness());
  const [typingSpeed, setTypingSpeedState] = useState<TypingSpeed>(getTypingSpeed());

  // Persist font choice in LocalStorage so it never resets or disappears
  const [fontFamily, setFontFamily] = useState<FontFamilyType>(() => {
    try {
      const savedFont = localStorage.getItem('app_font_family');
      if (savedFont && ['python', 'arial', 'calibri', 'times', 'segoe', 'roboto', 'fira', 'lora'].includes(savedFont)) {
        return savedFont as FontFamilyType;
      }
    } catch (e) {
      console.warn('LocalStorage error reading font', e);
    }
    return 'python';
  });

  const [theme, setTheme] = useState<TerminalTheme>(() => {
    try {
      const savedTheme = localStorage.getItem('app_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {}
    return 'light';
  });

  const [fourTheme, setFourTheme] = useState<FourTheme>(() => {
    try {
      const savedFourTheme = localStorage.getItem('app_four_theme');
      if (savedFourTheme && ['technology', 'nature', 'greenery', 'lecturer'].includes(savedFourTheme)) {
        return savedFourTheme as FourTheme;
      }
    } catch {}
    return 'technology';
  });

  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const savedLang = localStorage.getItem('app_language');
      if (savedLang === 'vi' || savedLang === 'en' || savedLang === 'zh') return savedLang as AppLanguage;
    } catch {}
    return 'vi';
  });

  const handleChangeLanguage = (newLang: AppLanguage) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('app_language', newLang);
    } catch {}
  };

  // MindX Prompt #04: Logic State + LocalStorage cho danh sách nguồn học liệu
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(() => {
    try {
      const saved = localStorage.getItem('mindx_study_materials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading study materials from LocalStorage', e);
    }
    return INITIAL_DEFAULT_MATERIALS;
  });

  // Sync to LocalStorage on every change to keep data when page reloads
  useEffect(() => {
    try {
      localStorage.setItem('mindx_study_materials', JSON.stringify(studyMaterials));
    } catch (e) {
      console.error('Error saving study materials to LocalStorage', e);
    }
  }, [studyMaterials]);

  useEffect(() => {
    localStorage.setItem('app_font_family', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('app_four_theme', fourTheme);
  }, [fourTheme]);

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
  };

  const handleChangeSoundSoftness = (softness: SoundSoftness) => {
    setSoundSoftnessState(softness);
    updateSoundSoftness(softness);
  };

  const handleChangeTypingSpeed = (speed: TypingSpeed) => {
    setTypingSpeedState(speed);
    updateTypingSpeed(speed);
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isLight = theme === 'light';

  // Get font class name
  const getFontClass = (font: FontFamilyType) => {
    switch (font) {
      case 'arial':
        return 'font-family-arial';
      case 'calibri':
        return 'font-family-calibri';
      case 'times':
        return 'font-family-times';
      case 'segoe':
        return 'font-family-segoe';
      case 'roboto':
        return 'font-family-roboto';
      case 'fira':
        return 'font-family-fira';
      case 'lora':
        return 'font-family-lora';
      case 'python':
      default:
        return 'font-family-python';
    }
  };

  // Handle adding new study material (MindX Prompt #04 requirement)
  const handleAddStudyMaterial = (newMaterial: Omit<StudyMaterial, 'id' | 'createdAt'>) => {
    const item: StudyMaterial = {
      ...newMaterial,
      id: `mat-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setStudyMaterials(prev => [item, ...prev]);
  };

  // Handle updating existing study material (Full CRUD - Update requirement)
  const handleUpdateStudyMaterial = (updatedMaterial: StudyMaterial) => {
    setStudyMaterials(prev =>
      prev.map(m => (m.id === updatedMaterial.id ? updatedMaterial : m))
    );
  };

  // Handle deleting study material (Full CRUD - Delete requirement)
  const handleDeleteStudyMaterial = (id: string) => {
    setStudyMaterials(prev => prev.filter(m => m.id !== id));
  };

  // Handle resetting default study materials from SGK KNTT
  const handleResetStudyMaterials = () => {
    setStudyMaterials(INITIAL_DEFAULT_MATERIALS);
    try {
      localStorage.setItem('mindx_study_materials', JSON.stringify(INITIAL_DEFAULT_MATERIALS));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync body theme styles
  useEffect(() => {
    if (isLight) {
      document.body.classList.remove('bg-black', 'text-white');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    } else {
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-black', 'text-white');
    }
  }, [isLight]);

  // Global Keyboard Shortcuts (Ctrl+S = Save, Ctrl+C = Copy, Ctrl+V = Paste)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ctrl + S / Cmd + S -> Global Save across all modules
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        playMechanicalKeyClick();
        triggerGlobalSave();
        try {
          localStorage.setItem('mindx_study_materials', JSON.stringify(studyMaterials));
        } catch {}
        showGlobalToast('💾 Đã lưu dữ liệu (Ctrl+S) thành công vào LocalStorage!');
      }
    };

    const handleCopy = () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.trim().length > 0) {
        showGlobalToast('📋 Đã sao chép (Ctrl+C) văn bản vào Clipboard!');
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData('text');
      if (text && text.trim().length > 0) {
        const preview = text.length > 35 ? text.slice(0, 35) + '...' : text;
        showGlobalToast(`📋 Đã dán nội dung (Ctrl+V): "${preview}"`, undefined, 'info');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('paste', handlePaste);
    };
  }, [studyMaterials]);

  // Topic Snapshots (Save / Load môn học hoặc bộ ôn tập)
  const [snapshots, setSnapshots] = useState<TopicSnapshot[]>(() => loadSnapshotsFromStorage());
  const [activeSnapshotId, setActiveSnapshotIdState] = useState<string>(() => getActiveSnapshotId());
  const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false);

  const activeSnapshot = snapshots.find(s => s.id === activeSnapshotId) || snapshots[0];

  const handleSaveCurrentSnapshot = (title: string, subject: string, description: string) => {
    const curFlashcards = loadFlashcardsFromStorage();
    const curQuestions = loadPracticeQuestionsFromStorage();
    const curSeeds = loadQASeedsFromStorage();

    const newSnapshot = buildSnapshotFromWorkingCopy({
      title,
      subject,
      description,
      sources: studyMaterials,
      flashcards: curFlashcards,
      questions: curQuestions,
      qaSeeds: curSeeds
    });

    const updated = saveTopicSnapshot(newSnapshot);
    setSnapshots(updated);
    setActiveSnapshotIdState(newSnapshot.id);
  };

  const handleRestoreSnapshot = (snapshot: TopicSnapshot) => {
    if (snapshot.sources && snapshot.sources.length > 0) {
      setStudyMaterials(snapshot.sources);
      try {
        localStorage.setItem('mindx_study_materials', JSON.stringify(snapshot.sources));
      } catch {}
    }

    if (snapshot.studyPack?.flashcards) {
      saveFlashcardsToStorage(snapshot.studyPack.flashcards);
    }

    if (snapshot.studyPack?.questions) {
      savePracticeQuestionsToStorage(snapshot.studyPack.questions);
    }

    if (snapshot.studyPack?.qaSeeds) {
      saveQASeedsToStorage(snapshot.studyPack.qaSeeds);
    }

    setActiveSnapshotId(snapshot.id);
    setActiveSnapshotIdState(snapshot.id);

    window.dispatchEvent(new CustomEvent('app:snapshot-restored', { detail: snapshot }));

    playMechanicalKeyClick();
    showGlobalToast(`📂 Đã nạp thành công bộ ôn tập "${snapshot.title}"! Giao diện đã được cập nhật.`);
  };

  const handleRenameSnapshot = (id: string, newTitle: string) => {
    const updated = renameTopicSnapshot(id, newTitle);
    setSnapshots(updated);
  };

  const handleDeleteSnapshot = (id: string) => {
    const updated = deleteTopicSnapshot(id);
    setSnapshots(updated);
    if (activeSnapshotId === id && updated.length > 0) {
      setActiveSnapshotIdState(updated[0].id);
      handleRestoreSnapshot(updated[0]);
    }
  };

  // Subscribe to toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  useEffect(() => {
    return subscribeToast((newToast) => {
      setToasts(prev => [...prev.slice(-3), newToast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 3500);
    });
  }, []);

  return (
    <div
      className={`min-h-screen relative flex flex-col transition-all duration-300 ${getFontClass(fontFamily)} ${
        isLight
          ? 'text-slate-900 selection:bg-blue-200 selection:text-blue-900'
          : 'text-white selection:bg-blue-900 selection:text-white'
      }`}
    >
      {/* Dynamic Real Wallpaper Background for the 4 Themes with 50% Frosted Blur */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
          style={{ backgroundImage: `url(${THEME_WALLPAPERS[fourTheme]})` }}
        />
        {/* 50% Frosted Glass Backdrop Overlay */}
        <div
          className={`absolute inset-0 backdrop-blur-md transition-colors duration-500 ${
            isLight ? 'bg-slate-50/75' : 'bg-slate-950/80'
          }`}
        />
      </div>

      {/* App Header with 4 Themes, 50% Blur, Language, Speed, and Sound Controls */}
      <div className="relative z-10 w-full">
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          soundOn={soundOn}
          onToggleSound={handleToggleSound}
          soundSoftness={soundSoftness}
          onChangeSoundSoftness={handleChangeSoundSoftness}
          typingSpeed={typingSpeed}
          onChangeTypingSpeed={handleChangeTypingSpeed}
          fontFamily={fontFamily}
          onChangeFont={setFontFamily}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          fourTheme={fourTheme}
          onChangeFourTheme={setFourTheme}
          language={language}
          onChangeLanguage={handleChangeLanguage}
        />
      </div>

      {/* Main Container - Full-width horizontal stretch edge to edge */}
      <main className="relative z-10 flex-1 w-full px-3 sm:px-5 lg:px-8 py-3 sm:py-4">
        {/* Persistent Topic Snapshot Bar: Lưu chủ đề này, Mở môn đã học, Tìm kiếm trước và sau khi lưu */}
        <div className="mb-3">
          <TopicSnapshotBar
            isLight={isLight}
            activeSnapshot={activeSnapshot}
            snapshots={snapshots}
            sources={studyMaterials}
            flashcards={loadFlashcardsFromStorage()}
            questions={loadPracticeQuestionsFromStorage()}
            qaSeeds={loadQASeedsFromStorage()}
            onOpenModal={() => setIsSnapshotModalOpen(true)}
            onQuickSave={() => setIsSnapshotModalOpen(true)}
            onQuickRename={(newTitle) => handleRenameSnapshot(activeSnapshotId, newTitle)}
            onRestoreSnapshot={handleRestoreSnapshot}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <TerminalView
                soundOn={soundOn}
                onToggleSound={handleToggleSound}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                language={language}
              />
            </motion.div>
          )}

          {activeTab === 'materials' && (
            <motion.div
              key="materials"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <InputMaterialsView
                theme={theme}
                language={language}
                fourTheme={fourTheme}
                materials={studyMaterials}
                onAddMaterial={handleAddStudyMaterial}
                onUpdateMaterial={handleUpdateStudyMaterial}
                onDeleteMaterial={handleDeleteStudyMaterial}
                onResetMaterials={handleResetStudyMaterials}
              />
            </motion.div>
          )}

          {activeTab === 'study_pack' && (
            <motion.div
              key="study_pack"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <StudyPack4ModeView
                theme={theme}
                language={language}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            </motion.div>
          )}

          {activeTab === 'structure' && (
            <motion.div
              key="structure"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <StructureView theme={theme} />
            </motion.div>
          )}

          {activeTab === 'milestone' && (
            <motion.div
              key="milestone"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <MilestoneView theme={theme} />
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <QuizPreview theme={theme} language={language} />
            </motion.div>
          )}

          {activeTab === 'flashcards' && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <FlashcardPreview theme={theme} language={language} />
            </motion.div>
          )}

          {activeTab === 'ai_tutor' && (
            <motion.div
              key="ai_tutor"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <AIChatPreview theme={theme} language={language} />
            </motion.div>
          )}

          {activeTab === 'ai_principles' && (
            <motion.div
              key="ai_principles"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <AIPrinciplesView
                theme={theme}
                language={language}
                onNavigateToPractice={() => setActiveTab('terminal')}
              />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <AboutView theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mandatory Ethics & Responsibility Disclaimer Banner - Stretched edge to edge */}
      <div
        className={`relative z-10 border-t border-b px-3 sm:px-5 lg:px-8 py-2.5 transition-colors glass-panel-50 w-full ${
          isLight
            ? 'bg-amber-50/70 border-amber-200/80 text-amber-950'
            : 'bg-amber-950/50 border-amber-800/60 text-amber-200'
        }`}
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <p className="font-medium leading-relaxed">
              <span className="font-bold underline decoration-amber-400">Lưu ý:</span> Nội dung học tập do AI hỗ trợ tạo ra luôn cần được kiểm chứng lại với Sách giáo khoa và Giáo viên bộ môn.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-[11px] flex-wrap">
            <button
              onClick={() => setActiveTab('ai_principles')}
              className="inline-flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200 bg-amber-200/90 dark:bg-amber-900/60 hover:bg-amber-300 dark:hover:bg-amber-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-amber-300 dark:border-amber-700 shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-800 dark:text-amber-300" />
              <span>Xem 5 Nguyên Tắc AI GDPT →</span>
            </button>
            <span className="text-amber-400 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              <Database className="w-3 h-3" />
              LocalStorage MindX #04
            </span>
          </div>
        </div>
      </div>

      {/* DEDICATED VIETNAM SECTION AT THE BOTTOM: Stretched edge to edge */}
      <section
        id="vietnam-national-footer-section"
        className={`relative z-10 border-t px-3 sm:px-5 lg:px-8 py-5 transition-colors glass-panel-50 w-full ${
          isLight
            ? 'bg-red-50/60 border-red-200/80 text-slate-800'
            : 'bg-red-950/40 border-red-900/60 text-neutral-200'
        }`}
      >
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {/* Vietnamese National Star / Flag Emblem */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-yellow-300 flex items-center justify-center font-bold text-2xl shadow-md border-2 border-yellow-400/80 shrink-0">
              ★
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {t(language, 'countryVietnam')} (VIETNAM) 🇻🇳
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-900 dark:bg-yellow-950/80 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700 rounded-full font-bold">
                  CHƯƠNG TRÌNH GDPT 2018
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Bài 1 - 25 SGK Chuẩn
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">
                Sách Giáo Khoa Tin Học 10 & 11 • Bộ sách <strong>Kết Nối Tri Thức Với Cuộc Sống</strong> (Nhà xuất bản Giáo Dục Việt Nam).
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Định hướng Khoa học máy tính (CS) và Tin học ứng dụng (ICT) dành cho học sinh THPT trên toàn quốc.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <div className="px-3 py-1.5 rounded-lg border bg-white/70 dark:bg-neutral-900/70 border-slate-300 dark:border-neutral-700 text-[11px]">
              <span className="text-slate-500 dark:text-neutral-400">Giao diện: </span>
              <strong className="text-blue-700 dark:text-blue-400">
                {fourTheme === 'nature'
                  ? 'Thiên nhiên'
                  : fourTheme === 'greenery'
                  ? 'Cây xanh'
                  : fourTheme === 'technology'
                  ? 'Công nghệ'
                  : 'Giảng viên'}{' '}
                (Nền mờ 50%)
              </strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg border bg-white/70 dark:bg-neutral-900/70 border-slate-300 dark:border-neutral-700 text-[11px]">
              <span className="text-slate-500 dark:text-neutral-400">Tốc độ gõ: </span>
              <strong className="text-amber-700 dark:text-amber-400">
                {typingSpeed === 'slow'
                  ? '1x (Chậm)'
                  : typingSpeed === 'fast'
                  ? '2x (Nhanh)'
                  : '1.5x (Chuẩn)'}
              </strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg border bg-white/70 dark:bg-neutral-900/70 border-slate-300 dark:border-neutral-700 text-[11px]">
              <span className="text-slate-500 dark:text-neutral-400">Ngôn ngữ: </span>
              <strong className="text-emerald-700 dark:text-emerald-400">
                {language === 'vi' ? 'Tiếng Việt 🇻🇳' : 'English 🇬🇧'}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Footer - Stretched edge to edge */}
      <footer
        className={`relative z-10 py-3.5 px-3 sm:px-5 lg:px-8 text-center text-xs transition-colors glass-panel-50 w-full ${
          isLight
            ? 'bg-white/60 text-slate-600 border-t border-slate-200/80'
            : 'bg-black/60 text-neutral-400 border-t border-neutral-900/80'
        }`}
      >
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isLight ? 'bg-blue-600' : 'bg-blue-400'
              }`}
            ></span>
            <span className={isLight ? 'text-slate-800 font-bold' : 'text-neutral-200 font-bold'}>
              Computer Programming Bluezone • Môn Tin học
            </span>
            <span className="text-slate-400 dark:text-neutral-600">|</span>
            <span className="text-slate-500 text-[11px]">
              Bài 1 - 25 Python & C++ THPT (KNTT)
            </span>
          </div>
          <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            Nguồn ảnh ≥ 2 ảnh • 4 Màu nền mờ 50%: Thiên nhiên, Cây xanh, Công nghệ, Giảng viên
          </div>
        </div>
      </footer>

      {/* Global Floating Toast Notifications (Ctrl+S, Ctrl+C, Ctrl+V, Actions) */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-3">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-xl border shadow-xl bg-black/90 backdrop-blur-md text-white border-neutral-700 pointer-events-auto flex items-start gap-2.5 text-xs font-mono"
            >
              <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-xs leading-snug">
                  {t.title}
                </p>
                {t.description && (
                  <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">
                    {t.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Save / Load Topic Snapshot Manager Modal */}
      <TopicSnapshotManagerModal
        isOpen={isSnapshotModalOpen}
        onClose={() => setIsSnapshotModalOpen(false)}
        isLight={isLight}
        activeSnapshotId={activeSnapshotId}
        snapshots={snapshots}
        onSaveCurrentSnapshot={handleSaveCurrentSnapshot}
        onRestoreSnapshot={handleRestoreSnapshot}
        onRenameSnapshot={handleRenameSnapshot}
        onDeleteSnapshot={handleDeleteSnapshot}
        workingSourcesCount={studyMaterials.length}
        workingFlashcardCount={loadFlashcardsFromStorage().length}
        workingQuestionCount={loadPracticeQuestionsFromStorage().length}
        currentSubjectName={activeSnapshot?.title || ''}
        workingSources={studyMaterials}
        workingFlashcards={loadFlashcardsFromStorage()}
        workingQuestions={loadPracticeQuestionsFromStorage()}
        workingQASeeds={loadQASeedsFromStorage()}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
