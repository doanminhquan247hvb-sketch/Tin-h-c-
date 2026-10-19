import React, { useState, useEffect } from 'react';
import { 
  BookOpen, HelpCircle, Layers, Settings, Eye, RotateCcw, 
  Plus, Trash2, CheckCircle2, ChevronRight, ChevronLeft, Shuffle, Sparkles, Filter, 
  ExternalLink, ArrowLeft, RefreshCw, FileText, Check, Copy, XCircle, Edit3, X, Save
} from 'lucide-react';
import { TerminalTheme, AppLanguage, Flashcard, PracticeQuestion, QASeedItem, StudyMaterial } from '../types';
import { loadFlashcardsFromStorage, saveFlashcardsToStorage, DEFAULT_FLASHCARDS } from '../utils/flashcardEngine';
import { loadPracticeQuestionsFromStorage, savePracticeQuestionsToStorage, DEFAULT_PRACTICE_QUESTIONS } from '../utils/questionEngine';
import { loadQASeedsFromStorage, saveQASeedsToStorage, DEFAULT_QA_SEEDS } from '../utils/qaSeedEngine';
import { playMechanicalKeyClick } from '../utils/audio';

type StudyPackMode = 'review' | 'quiz' | 'flashcard' | 'manage';
type InnerNavTab = 'home' | 'materials' | 'ai_insights' | 'study_pack';

interface StudyPack4ModeViewProps {
  theme: TerminalTheme;
  language: AppLanguage;
  onNavigateTab?: (tab: any) => void;
}

export const StudyPack4ModeView: React.FC<StudyPack4ModeViewProps> = ({
  theme,
  language,
  onNavigateTab
}) => {
  const isLight = theme === 'light';

  // 4 Modes: Xem lại, Quiz Mode, Flashcard, Quản lý
  const [activeMode, setActiveMode] = useState<StudyPackMode>('review');
  const [innerNavTab, setInnerNavTab] = useState<InnerNavTab>('study_pack');

  // Flashcards state
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => loadFlashcardsFromStorage());
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Editing flashcard modal state in StudyPack
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [editFront, setEditFront] = useState<string>('');
  const [editBack, setEditBack] = useState<string>('');
  const [editSubject, setEditSubject] = useState<string>('');

  // Questions state for Quiz Mode
  const [questions, setQuestions] = useState<PracticeQuestion[]>(() => loadPracticeQuestionsFromStorage());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // QA Seeds state
  const [qaSeeds, setQaSeeds] = useState<QASeedItem[]>(() => loadQASeedsFromStorage());

  // Subject selector inside Study Pack
  const [selectedTopic, setSelectedTopic] = useState<'all' | 'math7' | 'tin10' | 'tin11'>('all');

  // Management Form states
  const [newFcFront, setNewFcFront] = useState('');
  const [newFcBack, setNewFcBack] = useState('');
  const [newFcSubject, setNewFcSubject] = useState('Toán lớp 7');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    saveFlashcardsToStorage(flashcards);
  }, [flashcards]);

  useEffect(() => {
    savePracticeQuestionsToStorage(questions);
  }, [questions]);

  useEffect(() => {
    saveQASeedsToStorage(qaSeeds);
  }, [qaSeeds]);

  // Sync state when a topic snapshot is restored
  useEffect(() => {
    const handleSnapshotRestored = () => {
      setFlashcards(loadFlashcardsFromStorage());
      setQuestions(loadPracticeQuestionsFromStorage());
      setQaSeeds(loadQASeedsFromStorage());
      setFlippedCards({});
      setQuizAnswers({});
      setShowQuizResults(false);
    };
    window.addEventListener('app:snapshot-restored', handleSnapshotRestored);
    return () => window.removeEventListener('app:snapshot-restored', handleSnapshotRestored);
  }, []);

  const toggleFlip = (id: string) => {
    playMechanicalKeyClick();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectQuizAnswer = (qId: string, answer: any) => {
    playMechanicalKeyClick();
    setQuizAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const handleCopy = (text: string, key: string) => {
    playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFcFront.trim() || !newFcBack.trim()) return;
    playMechanicalKeyClick();
    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      subject: newFcSubject,
      front: newFcFront.trim(),
      back: newFcBack.trim(),
      category: 'khái niệm',
      dateAdded: new Date().toLocaleTimeString('vi-VN')
    };
    setFlashcards(prev => [newCard, ...prev]);
    setNewFcFront('');
    setNewFcBack('');
  };

  const handleDeleteFlashcard = (id: string) => {
    playMechanicalKeyClick();
    setFlashcards(prev => prev.filter(c => c.id !== id));
  };

  const handleStartEdit = (card: Flashcard, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playMechanicalKeyClick();
    setEditingCard(card);
    setEditFront(card.front);
    setEditBack(card.back);
    setEditSubject(card.subject);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard || !editFront.trim() || !editBack.trim()) return;
    playMechanicalKeyClick();

    setFlashcards(prev => prev.map(c => {
      if (c.id === editingCard.id) {
        return {
          ...c,
          subject: editSubject.trim() || c.subject,
          front: editFront.trim(),
          back: editBack.trim()
        };
      }
      return c;
    }));

    setEditingCard(null);
  };

  const handleResetData = () => {
    playMechanicalKeyClick();
    if (window.confirm('Khôi phục toàn bộ Study Pack (Flashcards, Quiz, Q&A) về dữ liệu mặc định chuẩn?')) {
      setFlashcards(DEFAULT_FLASHCARDS);
      setQuestions(DEFAULT_PRACTICE_QUESTIONS);
      setQaSeeds(DEFAULT_QA_SEEDS);
      setQuizAnswers({});
      setShowQuizResults(false);
      saveFlashcardsToStorage(DEFAULT_FLASHCARDS);
      savePracticeQuestionsToStorage(DEFAULT_PRACTICE_QUESTIONS);
      saveQASeedsToStorage(DEFAULT_QA_SEEDS);
    }
  };

  // Filtered lists
  const filteredFlashcards = flashcards.filter(c => {
    if (selectedTopic === 'math7') return c.subject.toLowerCase().includes('toán');
    if (selectedTopic === 'tin10') return c.subject.toLowerCase().includes('10');
    if (selectedTopic === 'tin11') return c.subject.toLowerCase().includes('11');
    return true;
  });

  const filteredQuestions = questions.filter(q => {
    if (selectedTopic === 'math7') return q.grade.toLowerCase().includes('7');
    if (selectedTopic === 'tin10') return q.grade.toLowerCase().includes('10');
    if (selectedTopic === 'tin11') return q.grade.toLowerCase().includes('11');
    return true;
  });

  // Calculate score in Quiz Mode
  const calculateScore = () => {
    let correctCount = 0;
    filteredQuestions.forEach(q => {
      const userAns = quizAnswers[q.id];
      if (q.type === 'multiple_choice' && userAns === q.correctOptionIndex) correctCount++;
      if (q.type === 'true_false' && userAns === q.correctBool) correctCount++;
      if (q.type === 'fill_in_blank' && typeof userAns === 'string' && q.acceptableAnswers?.some(a => a.toLowerCase() === userAns.trim().toLowerCase())) correctCount++;
    });
    return correctCount;
  };

  return (
    <div id="study-pack-4mode-container" className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. Header Banner: Exact Replica of Image "Study pack hiển thị 4 mode"   */}
      {/* ========================================================================= */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all text-center shadow-xs ${
        isLight 
          ? 'bg-gradient-to-b from-[#f0f7ff] to-white border-blue-100' 
          : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className="max-w-xl mx-auto space-y-2">
          {/* Main Title: MathMind & Bluezone Platform */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a5fb4] dark:text-blue-400 font-sans">
            MathMind
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-neutral-200">
            Ôn tập Toán lớp 7 & Tin học 10, 11 — Công cụ hỗ trợ học tập bằng AI
          </p>
          <p className="text-xs sm:text-sm italic font-medium text-[#2ec27e] dark:text-emerald-400">
            Học theo nhịp độ riêng. AI gợi ý, bạn tự hiểu.
          </p>
        </div>

        {/* First Row of Navigation: Trang chủ | Nguồn học liệu | AI đã hiểu gì | Study Pack */}
        <div className="mt-6 flex items-center justify-center flex-wrap gap-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs sm:text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                playMechanicalKeyClick();
                setInnerNavTab('home');
                if (onNavigateTab) onNavigateTab('terminal');
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                innerNavTab === 'home'
                  ? 'bg-white dark:bg-neutral-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Trang chủ
            </button>
            <button
              type="button"
              onClick={() => {
                playMechanicalKeyClick();
                setInnerNavTab('materials');
                if (onNavigateTab) onNavigateTab('materials');
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                innerNavTab === 'materials'
                  ? 'bg-white dark:bg-neutral-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Nguồn học liệu
            </button>
            <button
              type="button"
              onClick={() => {
                playMechanicalKeyClick();
                setInnerNavTab('ai_insights');
                if (onNavigateTab) onNavigateTab('ai_principles');
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                innerNavTab === 'ai_insights'
                  ? 'bg-white dark:bg-neutral-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              AI đã hiểu gì
            </button>
            <button
              type="button"
              onClick={() => {
                playMechanicalKeyClick();
                setInnerNavTab('study_pack');
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                innerNavTab === 'study_pack'
                  ? 'bg-white dark:bg-neutral-700 text-[#1a5fb4] dark:text-blue-300 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Study Pack
            </button>
          </div>
        </div>

        {/* Second Row of 4 Modes: [📖 Xem lại] [✏️ Quiz Mode] [🎴 Flashcard] [⚙️ Quản lý] */}
        <div className="mt-4 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {/* Mode 1: Xem lại */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              setActiveMode('review');
            }}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
              activeMode === 'review'
                ? 'bg-[#1a5fb4] hover:bg-blue-700 text-white'
                : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
          >
            <span>📖</span>
            <span>Xem lại</span>
          </button>

          {/* Mode 2: Quiz Mode */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              setActiveMode('quiz');
            }}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
              activeMode === 'quiz'
                ? 'bg-[#1a5fb4] hover:bg-blue-700 text-white'
                : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
          >
            <span>✏️</span>
            <span>Quiz Mode</span>
          </button>

          {/* Mode 3: Flashcard */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              setActiveMode('flashcard');
            }}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
              activeMode === 'flashcard'
                ? 'bg-[#1a5fb4] hover:bg-blue-700 text-white'
                : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
          >
            <span>🎴</span>
            <span>Flashcard</span>
          </button>

          {/* Mode 4: Quản lý */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              setActiveMode('manage');
            }}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
              activeMode === 'manage'
                ? 'bg-[#1a5fb4] hover:bg-blue-700 text-white'
                : isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
          >
            <span>⚙️</span>
            <span>Quản lý</span>
          </button>
        </div>

        {/* Filter by subject topic */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs flex-wrap">
          <span className="text-slate-500 dark:text-neutral-400 font-semibold">Chủ đề hiển thị:</span>
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-neutral-800 p-0.5 border border-slate-200 dark:border-neutral-700">
            <button
              onClick={() => { playMechanicalKeyClick(); setSelectedTopic('all'); }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedTopic === 'all'
                  ? 'bg-white dark:bg-neutral-700 font-bold text-blue-600 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-neutral-400'
              }`}
            >
              Tất cả môn
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setSelectedTopic('math7'); }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedTopic === 'math7'
                  ? 'bg-white dark:bg-neutral-700 font-bold text-blue-600 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-neutral-400'
              }`}
            >
              Toán lớp 7
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setSelectedTopic('tin10'); }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedTopic === 'tin10'
                  ? 'bg-white dark:bg-neutral-700 font-bold text-blue-600 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-neutral-400'
              }`}
            >
              Tin học 10
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setSelectedTopic('tin11'); }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedTopic === 'tin11'
                  ? 'bg-white dark:bg-neutral-700 font-bold text-blue-600 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-neutral-400'
              }`}
            >
              Tin học 11
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MODE 1: XEM LẠI (TỔNG HỢP KIẾN THỨC CỐT LÕI & KEY POINTS)             */}
      {/* ========================================================================= */}
      {activeMode === 'review' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Chế Độ: Xem Lại Kiến Thức (Review Mode)
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold">
              Tóm tắt súc tích • Học theo nhịp độ riêng
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box Toán lớp 7 */}
            {(selectedTopic === 'all' || selectedTopic === 'math7') && (
              <div className={`p-5 rounded-2xl border ${
                isLight ? 'bg-white border-blue-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Toán lớp 7 • Đại số & Hình học
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Bài ôn tập</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Biểu thức đại số & Các trường hợp bằng nhau của tam giác
                </h3>
                <div className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                  <p>
                    • <strong>Định nghĩa:</strong> Biểu thức đại số là dãy các số, chữ cái (biến số) được liên kết với nhau bởi các phép toán cộng, trừ, nhân, chia, lũy thừa (VD: <code className="bg-slate-100 dark:bg-neutral-800 px-1 py-0.5 rounded">2x + 3y - 5</code>).
                  </p>
                  <p>
                    • <strong>Quy tắc rút gọn:</strong> Chỉ được cộng/trừ các đơn thức đồng dạng (cùng phần biến).
                  </p>
                  <p>
                    • <strong>Hình học:</strong> 3 trường hợp bằng nhau cơ bản: Cạnh - Cạnh - Cạnh (c-c-c), Cạnh - Góc - Cạnh (c-g-c), Góc - Cạnh - Góc (g-c-g).
                  </p>
                </div>
              </div>
            )}

            {/* Box Tin học 10 */}
            {(selectedTopic === 'all' || selectedTopic === 'tin10') && (
              <div className={`p-5 rounded-2xl border ${
                isLight ? 'bg-white border-emerald-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Tin học 10 (KNTT) • Python
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Chủ đề 4</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Cấu trúc lặp for, while và Kiểu dữ liệu danh sách (List)
                </h3>
                <div className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                  <p>
                    • <strong>Hàm range(start, stop):</strong> Duyệt từ start đến stop - 1 (giá trị stop không bao giờ được chạm tới). Ví dụ: <code className="bg-slate-100 dark:bg-neutral-800 px-1 py-0.5 rounded">range(1, 5) -&gt; 1, 2, 3, 4</code>.
                  </p>
                  <p>
                    • <strong>Phương thức append():</strong> Chèn 1 phần tử vào cuối danh sách hiện có mà không tạo ra mảng mới.
                  </p>
                  <p>
                    • <strong>Cắt lát xâu (Slicing):</strong> Cú pháp <code className="bg-slate-100 dark:bg-neutral-800 px-1 py-0.5 rounded">s[start:stop]</code> lấy ký tự từ start đến stop-1.
                  </p>
                </div>
              </div>
            )}

            {/* Box Tin học 11 */}
            {(selectedTopic === 'all' || selectedTopic === 'tin11') && (
              <div className={`p-5 rounded-2xl border ${
                isLight ? 'bg-white border-purple-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    Tin học 11 (KNTT) • Thuật toán
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Chủ đề 1</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Thuật toán Tìm kiếm nhị phân & Sắp xếp cơ bản
                </h3>
                <div className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                  <p>
                    • <strong>Điều kiện tiên quyết:</strong> Mảng bắt buộc phải được sắp xếp trước theo thứ tự tăng dần hoặc giảm dần.
                  </p>
                  <p>
                    • <strong>Độ phức tạp:</strong> Chia đôi khoảng tìm kiếm sau mỗi bước -&gt; O(log2 N), vượt trội hoàn toàn so với tìm kiếm tuần tự O(N).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MODE 2: QUIZ MODE (LÀM BÀI TRẮC NGHIỆM VÀ ĐÁNH GIÁ ĐIỂM)               */}
      {/* ========================================================================= */}
      {activeMode === 'quiz' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">✏️</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Chế Độ: Quiz Mode ({filteredQuestions.length} câu trắc nghiệm)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playMechanicalKeyClick();
                  setShowQuizResults(prev => !prev);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shadow-xs transition-colors"
              >
                {showQuizResults ? 'Làm lại / Ẩn kết quả' : 'Nộp bài & Chấm điểm'}
              </button>
            </div>
          </div>

          {showQuizResults && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  KẾT QUẢ ĐẠT ĐƯỢC: {calculateScore()} / {filteredQuestions.length} câu đúng
                </span>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                  Công thức tính điểm: (Số câu đúng / Tổng số câu) × 10.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Thang điểm 10:
                </span>
                <span className="text-2xl font-black font-mono px-3 py-1 rounded-xl bg-blue-600 text-white shadow-xs">
                  {filteredQuestions.length > 0 ? (Math.round(((calculateScore() / filteredQuestions.length) * 10) * 10) / 10) : 0} / 10đ
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => {
              const hasAnswered = quizAnswers[q.id] !== undefined;
              let isAnswerCorrect = false;
              if (hasAnswered) {
                if (q.type === 'multiple_choice' && quizAnswers[q.id] === q.correctOptionIndex) isAnswerCorrect = true;
                if (q.type === 'true_false' && quizAnswers[q.id] === q.correctBool) isAnswerCorrect = true;
              }

              return (
              <div 
                key={q.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  hasAnswered
                    ? isAnswerCorrect
                      ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-rose-400 bg-rose-50/20 dark:bg-rose-950/10'
                    : isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-neutral-900 border-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    Câu {idx + 1} • {q.grade} ({q.subjectTopic})
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400">
                      {q.type === 'multiple_choice' ? 'Lựa chọn' : q.type === 'true_false' ? 'Đúng/Sai' : 'Điền từ'}
                    </span>
                    {hasAnswered && (
                      isAnswerCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>ĐÚNG</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-400">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>SAI (✗)</span>
                        </span>
                      )
                    )}
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed mb-3">
                  {q.question}
                </p>

                {q.codeSnippet && (
                  <pre className="p-3 mb-3 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto">
                    {q.codeSnippet}
                  </pre>
                )}

                {/* Multiple choice options */}
                {q.type === 'multiple_choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      const isCorrect = q.correctOptionIndex === optIdx;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                            showQuizResults
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : isSelected
                                  ? 'bg-rose-50 border-rose-400 text-rose-900'
                                  : 'bg-white border-slate-200 opacity-60'
                              : isSelected
                                ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                            isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 dark:border-neutral-600'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* True / False */}
                {q.type === 'true_false' && (
                  <div className="flex items-center gap-3">
                    {[
                      { label: 'ĐÚNG', val: true },
                      { label: 'SAI', val: false }
                    ].map(btn => {
                      const isSelected = quizAnswers[q.id] === btn.val;
                      const isCorrect = q.correctBool === btn.val;

                      return (
                        <button
                          key={String(btn.val)}
                          type="button"
                          onClick={() => handleSelectQuizAnswer(q.id, btn.val)}
                          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            showQuizResults
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                                : isSelected
                                  ? 'bg-rose-50 border-rose-400 text-rose-900'
                                  : 'bg-white border-slate-200 opacity-60'
                              : isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200'
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation in Quiz Results */}
                {showQuizResults && (
                  <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-neutral-800 text-xs text-slate-700 dark:text-neutral-300 border-l-4 border-blue-500">
                    <strong className="text-blue-700 dark:text-blue-300 block mb-0.5">Giải thích sư phạm:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    )}

      {/* ========================================================================= */}
      {/* 4. MODE 3: FLASHCARD (LẬT MẶT THẺ GHI NHỚ GRADIENT CHUẨN)                 */}
      {/* ========================================================================= */}
      {activeMode === 'flashcard' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎴</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Chế Độ: Flashcard Mode ({filteredFlashcards.length} thẻ)
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-neutral-400">
                Lật mặt trước/sau • Chuyển thẻ trước/sau
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredFlashcards.map((card, cardIdx) => {
              const isFlipped = !!flippedCards[card.id];

              return (
                <div
                  key={card.id}
                  className={`relative min-h-[190px] rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between select-none text-white overflow-hidden ${
                    isFlipped
                      ? 'bg-gradient-to-r from-[#e84393] to-[#ff7675]' // Pink Coral
                      : 'bg-gradient-to-r from-[#4834d4] to-[#686de0]' // Blue Indigo
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-white/80">
                    <span className="font-mono">
                      {isFlipped ? 'MẶT SAU' : 'MẶT TRƯỚC'} (Thẻ #{cardIdx + 1})
                    </span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] lowercase font-normal">
                      {card.subject} • {card.category || 'khái niệm'}
                    </span>
                  </div>

                  <div 
                    onClick={() => toggleFlip(card.id)}
                    className="my-auto py-3 text-center cursor-pointer"
                  >
                    <h3 className="text-base sm:text-lg font-bold leading-snug">
                      {isFlipped ? card.back : card.front}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-white/80 font-medium tracking-wide">
                    <button
                      type="button"
                      onClick={() => toggleFlip(card.id)}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold cursor-pointer transition-colors"
                    >
                      {isFlipped ? '↺ Xem mặt trước' : '↻ Lật mặt sau'}
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleStartEdit(card, e)}
                        className="px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/40 text-white font-bold cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>
                      <span className="hidden sm:inline">Click để lật</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit Flashcard Modal in StudyPack */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl border p-5 shadow-2xl transition-all ${
            isLight ? 'bg-white border-blue-200 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold">Chỉnh Sửa Thẻ Flashcard</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Môn học / Chủ đề:
                </label>
                <input
                  type="text"
                  required
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Mặt trước (Khái niệm / Câu hỏi / Thuật ngữ):
                </label>
                <textarea
                  required
                  rows={2}
                  value={editFront}
                  onChange={(e) => setEditFront(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Mặt sau (Định nghĩa / Câu trả lời / Giải thích):
                </label>
                <textarea
                  required
                  rows={3}
                  value={editBack}
                  onChange={(e) => setEditBack(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 cursor-pointer font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODE 4: QUẢN LÝ (CRUD STUDY PACK & LOCAL STORAGE RESET)                 */}
      {/* ========================================================================= */}
      {activeMode === 'manage' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Chế Độ: Quản Lý Study Pack (CRUD & Local Storage)
              </h2>
            </div>
            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer text-slate-700 dark:text-neutral-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục dữ liệu gốc</span>
            </button>
          </div>

          {/* Form thêm Flashcard mới */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Thêm Thẻ Flashcard Vào Study Pack</span>
            </h3>

            <form onSubmit={handleAddFlashcard} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Môn học / Chủ đề:
                  </label>
                  <input
                    type="text"
                    value={newFcSubject}
                    onChange={(e) => setNewFcSubject(e.target.value)}
                    placeholder="VD: Toán lớp 7, Tin học 10, Vật lý..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Mặt trước (Khái niệm / Thuật ngữ):
                  </label>
                  <input
                    type="text"
                    required
                    value={newFcFront}
                    onChange={(e) => setNewFcFront(e.target.value)}
                    placeholder="VD: Biểu thức đại số là gì?"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Mặt sau (Định nghĩa / Câu trả lời ngắn / Ví dụ minh họa):
                </label>
                <textarea
                  required
                  rows={2}
                  value={newFcBack}
                  onChange={(e) => setNewFcBack(e.target.value)}
                  placeholder="VD: Biểu thức chứa số, chữ và phép toán (+, -, *, /). VD: 2x + 3y - 5"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs transition-colors"
                >
                  Lưu Thẻ Vào Local Storage
                </button>
              </div>
            </form>
          </div>

          {/* Danh sách thẻ hiện hành để xóa/quản lý */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Danh Sách Flashcard Hiện Có ({flashcards.length} thẻ)
            </h3>
            <div className="space-y-2">
              {flashcards.map(c => (
                <div 
                  key={c.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-blue-600 dark:text-blue-400 block truncate">
                      [{c.subject}] {c.front}
                    </span>
                    <span className="text-slate-600 dark:text-neutral-400 line-clamp-1 mt-0.5">
                      {c.back}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteFlashcard(c.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-neutral-800 cursor-pointer shrink-0 transition-colors"
                    title="Xóa thẻ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
