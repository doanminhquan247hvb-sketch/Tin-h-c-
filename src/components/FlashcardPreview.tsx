import React, { useState, useEffect } from 'react';
import { 
  Sparkles, RotateCcw, Copy, Check, Plus, BookOpen, Layers, 
  HelpCircle, Trash2, Tag, ChevronRight, ChevronLeft, Zap, RefreshCw,
  Eye, Volume2, Shuffle, ArrowLeft, ArrowRight, Grid, List, CheckCircle2,
  Edit, Edit3, X, Save, Clipboard
} from 'lucide-react';
import { Flashcard, TerminalTheme, AppLanguage } from '../types';
import { 
  DEFAULT_FLASHCARDS, 
  loadFlashcardsFromStorage, 
  saveFlashcardsToStorage 
} from '../utils/flashcardEngine';
import { playMechanicalKeyClick } from '../utils/audio';
import { showGlobalToast, writeClipboardText, readClipboardText } from '../utils/keyboardShortcuts';

interface FlashcardPreviewProps {
  theme?: TerminalTheme;
  language?: AppLanguage;
}

export const FlashcardPreview: React.FC<FlashcardPreviewProps> = ({ 
  theme = 'light',
  language = 'vi' 
}) => {
  const isLight = theme === 'light';
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => loadFlashcardsFromStorage());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'study' | 'grid'>('study'); // Study (Single Card Slider) vs Grid

  // Single card study mode state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCurrentFlipped, setIsCurrentFlipped] = useState<boolean>(false);
  const [knownCards, setKnownCards] = useState<Record<string, boolean>>({});

  // Grid view flipped state
  const [gridFlipped, setGridFlipped] = useState<Record<string, boolean>>({});

  // Form states to add new custom flashcards
  const [newSubject, setNewSubject] = useState<string>('Toán lớp 7');
  const [newFront, setNewFront] = useState<string>('');
  const [newBack, setNewBack] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'khái niệm' | 'định nghĩa' | 'ví dụ' | 'phân biệt' | 'quy tắc'>('khái niệm');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // EDITING MODAL / FORM STATE
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [editSubject, setEditSubject] = useState<string>('');
  const [editFront, setEditFront] = useState<string>('');
  const [editBack, setEditBack] = useState<string>('');
  const [editCategory, setEditCategory] = useState<'khái niệm' | 'định nghĩa' | 'ví dụ' | 'phân biệt' | 'quy tắc'>('khái niệm');

  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    saveFlashcardsToStorage(flashcards);
  }, [flashcards]);

  // Sync state when a topic snapshot is restored
  useEffect(() => {
    const handleSnapshotRestored = () => {
      setFlashcards(loadFlashcardsFromStorage());
      setCurrentIndex(0);
      setIsCurrentFlipped(false);
    };
    window.addEventListener('app:snapshot-restored', handleSnapshotRestored);
    return () => window.removeEventListener('app:snapshot-restored', handleSnapshotRestored);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyText = (text: string, key: string) => {
    playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Flip single study card
  const handleToggleCurrentFlip = () => {
    playMechanicalKeyClick();
    setIsCurrentFlipped(prev => !prev);
  };

  // Flip grid card
  const handleToggleGridFlip = (id: string) => {
    playMechanicalKeyClick();
    setGridFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter list
  const filteredCards = flashcards.filter(c => 
    filterSubject === 'all' || c.subject.toLowerCase().includes(filterSubject.toLowerCase())
  );

  // Navigation handlers
  const handlePrevCard = () => {
    playMechanicalKeyClick();
    setIsCurrentFlipped(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleNextCard = () => {
    playMechanicalKeyClick();
    setIsCurrentFlipped(false);
    setCurrentIndex(prev => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handleShuffle = () => {
    playMechanicalKeyClick();
    setIsCurrentFlipped(false);
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    showToast('Đã xáo trộn ngẫu nhiên danh sách thẻ ghi nhớ!');
  };

  const handleMarkMastered = (id: string) => {
    playMechanicalKeyClick();
    setKnownCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // CREATE CARD
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;
    playMechanicalKeyClick();
    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      subject: newSubject.trim() || 'Tổng hợp',
      front: newFront.trim(),
      back: newBack.trim(),
      category: newCategory,
      dateAdded: new Date().toLocaleTimeString('vi-VN')
    };
    setFlashcards(prev => [newCard, ...prev]);
    setNewFront('');
    setNewBack('');
    setShowAddForm(false);
    showToast('Đã thêm thẻ mới vào bộ Flashcard!');
  };

  // OPEN EDIT MODAL
  const handleStartEdit = (card: Flashcard, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playMechanicalKeyClick();
    setEditingCard(card);
    setEditSubject(card.subject);
    setEditFront(card.front);
    setEditBack(card.back);
    setEditCategory((card.category as any) || 'khái niệm');
  };

  // SAVE EDITED CARD
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
          back: editBack.trim(),
          category: editCategory
        };
      }
      return c;
    }));

    setEditingCard(null);
    showToast('Đã cập nhật chỉnh sửa thẻ Flashcard vào LocalStorage!');
  };

  // DELETE CARD
  const handleDeleteCard = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playMechanicalKeyClick();
    setFlashcards(prev => prev.filter(c => c.id !== id));
    if (currentIndex >= filteredCards.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    showToast('Đã xóa thẻ khỏi bộ nhớ.');
  };

  // RESET TO DEFAULT
  const handleResetCards = () => {
    playMechanicalKeyClick();
    if (window.confirm('Khôi phục danh sách Flashcard về mặc định chuẩn?')) {
      setFlashcards(DEFAULT_FLASHCARDS);
      setGridFlipped({});
      setIsCurrentFlipped(false);
      setCurrentIndex(0);
      setKnownCards({});
      saveFlashcardsToStorage(DEFAULT_FLASHCARDS);
      showToast('Đã khôi phục bộ thẻ mẫu SGK!');
    }
  };

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const totalMastered = Object.values(knownCards).filter(Boolean).length;

  return (
    <div id="flashcards-screen-container" className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. Header & Terminal Prompt Card [LOẠI: FUNCTION] matching image.png     */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
            Build: CRUD Cho Quiz & Flashcard
          </h1>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider">
            FUNCTION
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-rose-500 block tracking-wider">PROMPT</span>
          <span className="text-lg font-black font-mono text-slate-800 dark:text-neutral-100">#05B</span>
        </div>
      </div>

      {/* Terminal prompt specification matching CRUD prompt from image.png */}
      <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] text-white p-4 sm:p-5 shadow-xl font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
            </div>
            <span className="text-[11px] font-bold text-neutral-400 tracking-wider">
              LOẠI: FUNCTION
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleCopyText(
              `Hãy bổ sung CRUD cho quiz và flashcard.\n\nYêu cầu:\n- thêm câu hỏi/thẻ mới\n- sửa nội dung có sẵn\n- xóa câu hỏi/thẻ không phù hợp\n- dữ liệu cập nhật được lưu lại bằng LocalStorage\n- thao tác cần ngắn gọn, dễ hiểu`,
              'prompt-crud-quiz-flashcard-copy'
            )}
            className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
              copiedKey === 'prompt-crud-quiz-flashcard-copy'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
            }`}
          >
            {copiedKey === 'prompt-crud-quiz-flashcard-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'prompt-crud-quiz-flashcard-copy' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
          </button>
        </div>

        {/* Verbatim prompt text from image.png */}
        <div className="mt-3.5 space-y-3 text-xs sm:text-[13px] leading-relaxed text-neutral-200">
          <p className="font-semibold text-white">
            Hãy bổ sung CRUD cho quiz và flashcard.
          </p>
          <div className="space-y-1.5 text-neutral-300 text-xs">
            <p className="text-neutral-400 font-bold">Yêu cầu:</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> thêm câu hỏi/thẻ mới</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> sửa nội dung có sẵn</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> xóa câu hỏi/thẻ không phù hợp</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> dữ liệu cập nhật được lưu lại bằng LocalStorage</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> thao tác cần ngắn gọn, dễ hiểu</p>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. Interactive Study Control Toolbar & Filter                             */}
      {/* ========================================================================= */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs ${
        isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-700 dark:text-neutral-300">Chủ đề môn:</span>
          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-[11px]">
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterSubject('all'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                filterSubject === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tất cả môn ({flashcards.length})
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterSubject('toán'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                filterSubject === 'toán'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Toán lớp 7 ({flashcards.filter(c => c.subject.toLowerCase().includes('toán')).length})
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterSubject('10'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                filterSubject === '10'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tin học 10 ({flashcards.filter(c => c.subject.toLowerCase().includes('10')).length})
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterSubject('11'); setCurrentIndex(0); }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                filterSubject === '11'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tin học 11 ({flashcards.filter(c => c.subject.toLowerCase().includes('11')).length})
            </button>
          </div>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Mode Switcher: Study Slider vs Grid */}
          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-[11px]">
            <button
              onClick={() => { playMechanicalKeyClick(); setViewMode('study'); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold cursor-pointer transition-colors ${
                viewMode === 'study'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ôn tập từng thẻ</span>
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setViewMode('grid'); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold cursor-pointer transition-colors ${
                viewMode === 'grid'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Xem dạng lưới ({filteredCards.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleShuffle}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer font-semibold"
            title="Xáo trộn ngẫu nhiên thẻ"
          >
            <Shuffle className="w-3.5 h-3.5 text-blue-500" />
            <span>Xáo thẻ</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddForm(prev => !prev)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Đóng form' : '+ Thêm thẻ mới'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetCards}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
            title="Khôi phục thẻ mẫu"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Khôi phục</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EDIT FLASHCARD MODAL / POPUP                                          */}
      {/* ========================================================================= */}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    Phân loại:
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                  >
                    <option value="khái niệm">Khái niệm</option>
                    <option value="định nghĩa">Định nghĩa</option>
                    <option value="ví dụ">Ví dụ minh họa</option>
                    <option value="phân biệt">Phân biệt</option>
                    <option value="quy tắc">Quy tắc / Lưu ý</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300">
                    Mặt trước (Khái niệm / Câu hỏi / Thuật ngữ):
                  </label>
                  <button
                    type="button"
                    onClick={async () => {
                      const text = await readClipboardText();
                      if (text) setEditFront(text);
                    }}
                    className="text-[11px] font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>Dán (Ctrl+V)</span>
                  </button>
                </div>
                <textarea
                  required
                  rows={2}
                  value={editFront}
                  onChange={(e) => setEditFront(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                      e.preventDefault();
                      handleSaveEdit(e as any);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-semibold text-slate-700 dark:text-neutral-300">
                    Mặt sau (Định nghĩa / Câu trả lời / Giải thích):
                  </label>
                  <button
                    type="button"
                    onClick={async () => {
                      const text = await readClipboardText();
                      if (text) setEditBack(text);
                    }}
                    className="text-[11px] font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>Dán (Ctrl+V)</span>
                  </button>
                </div>
                <textarea
                  required
                  rows={3}
                  value={editBack}
                  onChange={(e) => setEditBack(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                      e.preventDefault();
                      handleSaveEdit(e as any);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-neutral-800">
                <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                  Phím tắt: <kbd className="px-1 py-0.2 rounded bg-slate-200 dark:bg-neutral-800 font-bold">Ctrl+S</kbd> để Lưu
                </span>
                <div className="flex items-center gap-2">
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
                    <span>Lưu thay đổi (Ctrl+S)</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. Add Custom Flashcard Form                                             */}
      {/* ========================================================================= */}
      {showAddForm && (
        <form onSubmit={handleAddCard} className={`p-5 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-pink-200 shadow-md' : 'bg-neutral-900 border-neutral-800 text-white'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-neutral-800">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span>Thêm Thẻ Flashcard Mới (Lưu LocalStorage)</span>
            </h3>
            <span className="text-[11px] text-slate-500">Tự động lưu vào bộ đề cá nhân</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Môn học / Chủ đề:
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="VD: Toán lớp 7, Tin học 10, Vật lý..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Phân loại khái niệm:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                >
                  <option value="khái niệm">Khái niệm</option>
                  <option value="định nghĩa">Định nghĩa</option>
                  <option value="ví dụ">Ví dụ minh họa</option>
                  <option value="phân biệt">Phân biệt</option>
                  <option value="quy tắc">Quy tắc / Lưu ý</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                Mặt trước (Khái niệm / Câu hỏi / Thuật ngữ):
              </label>
              <input
                type="text"
                required
                value={newFront}
                onChange={(e) => setNewFront(e.target.value)}
                placeholder="VD: Biểu thức đại số là gì? / Cú pháp range(start, stop) trong Python?"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                Mặt sau (Định nghĩa / Câu trả lời / Minh họa rõ ràng):
              </label>
              <textarea
                required
                rows={2}
                value={newBack}
                onChange={(e) => setNewBack(e.target.value)}
                placeholder="VD: Dãy số và chữ liên kết bởi các phép toán. VD: 2x + 3y - 5"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-xs"
              >
                Lưu Thẻ Flashcard
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 5. MODE 1: STUDY SLIDER (LẬT THẺ, CHUYỂN THẺ & CHỈNH SỬA)                */}
      {/* ========================================================================= */}
      {viewMode === 'study' && filteredCards.length > 0 && currentCard && (
        <div className="space-y-4">
          {/* Progress Bar & Status */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-neutral-400 px-1">
            <span className="font-bold">
              Thẻ {currentIndex + 1} / {filteredCards.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đã nhớ: {totalMastered} thẻ
              </span>
              <button
                type="button"
                onClick={() => handleMarkMastered(currentCard.id)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                  knownCards[currentCard.id]
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-neutral-700 hover:bg-slate-50'
                }`}
              >
                {knownCards[currentCard.id] ? '✓ Đã thuộc thẻ này' : 'Đánh dấu đã nhớ'}
              </button>
            </div>
          </div>

          {/* Large Interactive Single Flashcard (Flip animation) */}
          <div
            onClick={handleToggleCurrentFlip}
            className={`relative cursor-pointer min-h-[260px] sm:min-h-[300px] rounded-3xl p-8 transition-all duration-500 shadow-xl flex flex-col justify-between select-none text-white overflow-hidden transform hover:scale-[1.01] ${
              isCurrentFlipped
                ? 'bg-gradient-to-br from-[#e84393] via-[#fd79a8] to-[#ff7675]' // Pink Coral gradient
                : 'bg-gradient-to-br from-[#3b5998] via-[#4834d4] to-[#686de0]' // Indigo Blue gradient
            }`}
          >
            {/* Top Indicator & Action Buttons */}
            <div className="flex items-center justify-between text-xs font-bold tracking-widest uppercase text-white/90">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs font-mono">
                  {isCurrentFlipped ? 'MẶT SAU (ĐÁP ÁN / ĐỊNH NGHĨA)' : 'MẶT TRƯỚC (KHÁI NIỆM / CÂU HỎI)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-semibold normal-case">
                  {currentCard.subject} • {currentCard.category || 'khái niệm'}
                </span>

                {/* Copy Card Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playMechanicalKeyClick();
                    const content = `[${currentCard.subject} - ${currentCard.category || 'Khái niệm'}]\nMặt trước: ${currentCard.front}\nMặt sau: ${currentCard.back}`;
                    writeClipboardText(content);
                    showGlobalToast('📋 Đã sao chép (Ctrl+C) nội dung thẻ!');
                  }}
                  title="Sao chép nội dung thẻ này (Ctrl+C)"
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Edit Button in Study Mode */}
                <button
                  type="button"
                  onClick={(e) => handleStartEdit(currentCard, e)}
                  title="Chỉnh sửa nội dung thẻ này"
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => handleDeleteCard(currentCard.id, e)}
                  title="Xóa thẻ này"
                  className="p-1.5 rounded-full bg-black/30 hover:bg-rose-600 text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Central Content */}
            <div className="my-auto py-6 text-center max-w-2xl mx-auto select-text">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-relaxed tracking-wide drop-shadow-sm select-text">
                {isCurrentFlipped ? currentCard.back : currentCard.front}
              </h2>
            </div>

            {/* Bottom Hint */}
            <div className="flex items-center justify-between text-xs text-white/80 font-medium pt-2 border-t border-white/10">
              <span>{isCurrentFlipped ? '💡 Click thẻ để xem lại mặt trước' : '👆 Nhấp vào thẻ để lật xem mặt sau'}</span>
              <span className="font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded">
                Space / Click để lật
              </span>
            </div>
          </div>

          {/* Navigation Controls: [◀ Thẻ Trước] [Lật Thẻ] [Thẻ Tiếp Theo ▶] */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrevCard}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs sm:text-sm font-bold cursor-pointer shadow-xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-blue-500" />
              <span>Thẻ trước</span>
            </button>

            <button
              type="button"
              onClick={handleToggleCurrentFlip}
              className="flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-black cursor-pointer shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isCurrentFlipped ? 'Xem Mặt Trước' : 'Lật Mặt Sau'}</span>
            </button>

            <button
              type="button"
              onClick={handleNextCard}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 text-xs sm:text-sm font-bold cursor-pointer shadow-xs transition-colors"
            >
              <span>Thẻ sau</span>
              <ChevronRight className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODE 2: GRID VIEW (DANH SÁCH LƯỚI VỚI NÚT CHỈNH SỬA TỪNG THẺ)         */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredCards.map((card) => {
            const isFlipped = !!gridFlipped[card.id];

            return (
              <div
                key={card.id}
                onClick={() => handleToggleGridFlip(card.id)}
                className={`relative cursor-pointer min-h-[185px] rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between select-none text-white overflow-hidden group ${
                  isFlipped
                    ? 'bg-gradient-to-r from-[#e84393] to-[#ff7675]'
                    : 'bg-gradient-to-r from-[#4834d4] to-[#686de0]'
                }`}
              >
                {/* Action buttons (Copy, Edit & Delete) */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playMechanicalKeyClick();
                      const content = `[${card.subject} - ${card.category || 'Khái niệm'}]\nMặt trước: ${card.front}\nMặt sau: ${card.back}`;
                      writeClipboardText(content);
                      showGlobalToast('📋 Đã sao chép (Ctrl+C) nội dung thẻ!');
                    }}
                    title="Sao chép nội dung thẻ (Ctrl+C)"
                    className="p-1.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleStartEdit(card, e)}
                    title="Chỉnh sửa thẻ này"
                    className="p-1.5 rounded-full bg-black/30 hover:bg-black/60 text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteCard(card.id, e)}
                    title="Xóa thẻ"
                    className="p-1.5 rounded-full bg-black/30 hover:bg-rose-600 text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Subject & Tag */}
                <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-white/80 pr-24">
                  <span className="font-mono">
                    {isFlipped ? 'MẶT SAU' : 'MẶT TRƯỚC'}
                  </span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] lowercase font-normal">
                    {card.subject} • {card.category || 'khái niệm'}
                  </span>
                </div>

                {/* Card Main Content */}
                <div className="my-auto py-2 text-center select-text">
                  <h3 className="text-base sm:text-lg font-bold leading-snug select-text">
                    {isFlipped ? card.back : card.front}
                  </h3>
                </div>

                {/* Card Bottom Hint */}
                <div className="flex items-center justify-between text-xs text-white/80 font-medium tracking-wide border-t border-white/10 pt-2">
                  <span>{isFlipped ? 'Click để quay lại' : 'Click để xem mặt sau'}</span>
                  <button
                    type="button"
                    onClick={(e) => handleStartEdit(card, e)}
                    className="text-[11px] font-bold text-white/90 underline hover:text-white cursor-pointer"
                  >
                    Sửa nội dung
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
