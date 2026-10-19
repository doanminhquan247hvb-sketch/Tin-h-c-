import React, { useState, useMemo } from 'react';
import { 
  FolderDown, FolderUp, Save, Trash2, Edit2, Check, X, 
  Layers, BookOpen, HelpCircle, Sparkles, Clock, CheckCircle2,
  AlertCircle, ArrowRight, Plus, RefreshCw, FileText, Search,
  Eye, Filter
} from 'lucide-react';
import { 
  TopicSnapshot, 
  DraftSearchResult, 
  SavedSnapshotSearchResult,
  searchDraftItems,
  searchSavedSnapshots
} from '../utils/topicSnapshotEngine';
import { StudyMaterial, Flashcard, PracticeQuestion, QASeedItem, ActiveTab } from '../types';
import { playMechanicalKeyClick } from '../utils/audio';
import { showGlobalToast } from '../utils/keyboardShortcuts';

interface TopicSnapshotManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLight: boolean;
  activeSnapshotId: string;
  snapshots: TopicSnapshot[];
  onSaveCurrentSnapshot: (title: string, subject: string, description: string) => void;
  onRestoreSnapshot: (snapshot: TopicSnapshot) => void;
  onRenameSnapshot: (id: string, newTitle: string) => void;
  onDeleteSnapshot: (id: string) => void;
  // Current working copy data
  workingSourcesCount: number;
  workingFlashcardCount: number;
  workingQuestionCount: number;
  currentSubjectName: string;
  workingSources?: StudyMaterial[];
  workingFlashcards?: Flashcard[];
  workingQuestions?: PracticeQuestion[];
  workingQASeeds?: QASeedItem[];
  onNavigateTab?: (tab: ActiveTab) => void;
}

export const TopicSnapshotManagerModal: React.FC<TopicSnapshotManagerModalProps> = ({
  isOpen,
  onClose,
  isLight,
  activeSnapshotId,
  snapshots,
  onSaveCurrentSnapshot,
  onRestoreSnapshot,
  onRenameSnapshot,
  onDeleteSnapshot,
  workingSourcesCount,
  workingFlashcardCount,
  workingQuestionCount,
  currentSubjectName,
  workingSources = [],
  workingFlashcards = [],
  workingQuestions = [],
  workingQASeeds = [],
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'after_save' | 'before_save'>('after_save');
  const [newTitle, setNewTitle] = useState(currentSubjectName || 'Tin học 10 - Vòng lặp & Danh sách');
  const [newSubject, setNewSubject] = useState('Tin học 10 (KNTT)');
  const [newDesc, setNewDesc] = useState('');

  // Search in modal
  const [modalSearch, setModalSearch] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'before_save' | 'after_save'>('all');

  // Editing state for rename
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState('');

  // Search Results
  const draftResults = useMemo<DraftSearchResult[]>(() => {
    if (!modalSearch.trim()) return [];
    return searchDraftItems(modalSearch, {
      sources: workingSources,
      flashcards: workingFlashcards,
      questions: workingQuestions,
      qaSeeds: workingQASeeds
    });
  }, [modalSearch, workingSources, workingFlashcards, workingQuestions, workingQASeeds]);

  const savedResults = useMemo<SavedSnapshotSearchResult[]>(() => {
    if (!modalSearch.trim()) return [];
    return searchSavedSnapshots(modalSearch, snapshots);
  }, [modalSearch, snapshots]);

  const hasSearch = modalSearch.trim().length > 0;

  if (!isOpen) return null;

  const handleStartRename = (snap: TopicSnapshot) => {
    playMechanicalKeyClick();
    setEditingId(snap.id);
    setEditTitleInput(snap.title);
  };

  const handleConfirmRename = (id: string) => {
    if (!editTitleInput.trim()) return;
    playMechanicalKeyClick();
    onRenameSnapshot(id, editTitleInput.trim());
    setEditingId(null);
    showGlobalToast(`Đã đổi tên môn học thành: "${editTitleInput.trim()}"`);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    playMechanicalKeyClick();
    onSaveCurrentSnapshot(newTitle.trim(), newSubject.trim(), newDesc.trim());
    showGlobalToast(`💾 Đã lưu snapshot "${newTitle.trim()}" thành công vào kho!`);
    setActiveTab('after_save');
  };

  const handleJumpToDraft = (tab: ActiveTab) => {
    playMechanicalKeyClick();
    if (onNavigateTab) {
      onNavigateTab(tab);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className={`w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl border transition-all ${
          isLight 
            ? 'bg-white border-slate-200 text-slate-800' 
            : 'bg-neutral-900 border-neutral-700 text-neutral-100'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
              <FolderDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                Quản lý & Tìm kiếm Chủ đề: Trước khi lưu & Sau khi lưu
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Lưu snapshot working copy hoặc phục hồi nguyên vẹn môn học từ kho lưu trữ
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playMechanicalKeyClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Scope Filters within Modal */}
        <div className="px-5 sm:px-6 pt-3 pb-2 border-b border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              placeholder="Tìm theo mục (trước khi lưu & sau khi lưu)..."
              className={`w-full pl-8 pr-8 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLight ? 'bg-white border-slate-300' : 'bg-neutral-800 border-neutral-700'
              }`}
            />
            {hasSearch && (
              <button
                type="button"
                onClick={() => setModalSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Mục:
            </span>
            <button
              type="button"
              onClick={() => setSearchScope('all')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg cursor-pointer ${
                searchScope === 'all'
                  ? 'bg-blue-600 text-white'
                  : isLight ? 'bg-slate-200 text-slate-700' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setSearchScope('before_save')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1 ${
                searchScope === 'before_save'
                  ? 'bg-amber-600 text-white'
                  : isLight ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-amber-950/40 text-amber-300 border border-amber-900'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Trước khi lưu</span>
            </button>
            <button
              type="button"
              onClick={() => setSearchScope('after_save')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg cursor-pointer flex items-center gap-1 ${
                searchScope === 'after_save'
                  ? 'bg-blue-600 text-white'
                  : isLight ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-blue-950/40 text-blue-300 border border-blue-900'
              }`}
            >
              <FolderUp className="w-3 h-3" />
              <span>Sau khi lưu</span>
            </button>
          </div>
        </div>

        {/* Tab switcher: Mục Sau khi lưu vs Mục Trước khi lưu */}
        {!hasSearch && (
          <div className="flex border-b border-slate-200 dark:border-neutral-800 px-5 sm:px-6 pt-2.5 gap-2">
            <button
              type="button"
              onClick={() => {
                playMechanicalKeyClick();
                setActiveTab('after_save');
              }}
              className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'after_save'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              <FolderUp className="w-4 h-4 text-blue-500" />
              <span>Mục sau khi lưu (Kho chủ đề: {snapshots.length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playMechanicalKeyClick();
                setActiveTab('before_save');
              }}
              className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'before_save'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Mục trước khi lưu (Bản nháp & Lưu vào kho)</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {hasSearch ? (
            /* HIỂN THỊ KẾT QUẢ TÌM KIẾM TRONG MODAL */
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 dark:text-neutral-400 pb-1">
                Kết quả tìm kiếm cho: &ldquo;{modalSearch}&rdquo;
              </div>

              {/* 1. Kết quả trong Trước khi lưu */}
              {(searchScope === 'all' || searchScope === 'before_save') && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <FileText className="w-4 h-4" />
                    <span>Mục trước khi lưu ({draftResults.length} kết quả khớp):</span>
                  </div>
                  {draftResults.length === 0 ? (
                    <p className="text-xs text-slate-400 italic pl-5">Không có mục nào trong bản nháp khớp từ khóa.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {draftResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleJumpToDraft(item.targetTab)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all hover:border-amber-500 ${
                            isLight ? 'bg-amber-50/40 border-amber-200' : 'bg-amber-950/20 border-amber-900/60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                              {item.categoryLabel}
                            </span>
                            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-0.5">
                              Đi tới <ArrowRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                          <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1 mb-0.5">
                            {item.title}
                          </h5>
                          <p className="text-[11px] text-slate-600 dark:text-neutral-400 line-clamp-2">
                            {item.snippet}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 2. Kết quả trong Sau khi lưu */}
              {(searchScope === 'all' || searchScope === 'after_save') && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <FolderUp className="w-4 h-4" />
                    <span>Mục sau khi lưu ({savedResults.length} chủ đề khớp):</span>
                  </div>
                  {savedResults.length === 0 ? (
                    <p className="text-xs text-slate-400 italic pl-5">Không có chủ đề nào trong kho khớp từ khóa.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {savedResults.map(({ snapshot, matchReasons }) => (
                        <div
                          key={snapshot.id}
                          className={`p-3 rounded-xl border text-xs transition-all ${
                            snapshot.id === activeSnapshotId
                              ? 'border-blue-500 bg-blue-500/5'
                              : isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-800 border-neutral-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div>
                              <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                {snapshot.title}
                              </h5>
                              <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono">
                                {snapshot.subject}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                playMechanicalKeyClick();
                                onRestoreSnapshot(snapshot);
                                onClose();
                              }}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-xs shrink-0"
                            >
                              Mở bộ này
                            </button>
                          </div>
                          <div className="space-y-0.5 pt-1 border-t border-slate-200 dark:border-neutral-700/60">
                            {matchReasons.map((r, i) => (
                              <span key={i} className="block text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                                ✓ {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : activeTab === 'before_save' ? (
            /* TAB: MỤC TRƯỚC KHI LƯU (Bản nháp & Form lưu vào kho) */
            <div className="space-y-4">
              {/* Working Copy Overview Card */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <FileText className="w-4 h-4" />
                    <span>Dữ liệu bản nháp hiện tại (Trước khi lưu):</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                    Sẵn sàng lưu thành Snapshot
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div 
                    onClick={() => handleJumpToDraft('materials')}
                    className="p-2.5 rounded-lg bg-white/70 dark:bg-neutral-800/70 border border-slate-200 dark:border-neutral-700 cursor-pointer hover:border-amber-400 transition-all"
                  >
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 block flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-blue-500" /> Học liệu (Nguồn)
                    </span>
                    <strong className="text-amber-700 dark:text-amber-300 font-bold">{workingSourcesCount} tài liệu</strong>
                  </div>

                  <div 
                    onClick={() => handleJumpToDraft('flashcards')}
                    className="p-2.5 rounded-lg bg-white/70 dark:bg-neutral-800/70 border border-slate-200 dark:border-neutral-700 cursor-pointer hover:border-amber-400 transition-all"
                  >
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 block flex items-center gap-1">
                      <Layers className="w-3 h-3 text-emerald-500" /> Flashcards
                    </span>
                    <strong className="text-emerald-700 dark:text-emerald-300 font-bold">{workingFlashcardCount} thẻ</strong>
                  </div>

                  <div 
                    onClick={() => handleJumpToDraft('quiz')}
                    className="p-2.5 rounded-lg bg-white/70 dark:bg-neutral-800/70 border border-slate-200 dark:border-neutral-700 cursor-pointer hover:border-amber-400 transition-all"
                  >
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 block flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-purple-500" /> Trắc nghiệm
                    </span>
                    <strong className="text-purple-700 dark:text-purple-300 font-bold">{workingQuestionCount} câu hỏi</strong>
                  </div>

                  <div 
                    onClick={() => handleJumpToDraft('study_pack')}
                    className="p-2.5 rounded-lg bg-white/70 dark:bg-neutral-800/70 border border-slate-200 dark:border-neutral-700 cursor-pointer hover:border-amber-400 transition-all"
                  >
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400 block flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Ma trận kiến thức
                    </span>
                    <strong className="text-amber-600 dark:text-amber-400 font-bold">Đã tổng hợp</strong>
                  </div>
                </div>
              </div>

              {/* Form Lưu chủ đề này thành snapshot mới */}
              <form onSubmit={handleSaveSubmit} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Tên chủ đề / Tên ngắn bộ ôn tập <span className="text-rose-500">*</span>:
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ví dụ: Tin 10 - Vòng lặp For & range()"
                    required
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isLight ? 'bg-white border-slate-200' : 'bg-neutral-800 border-neutral-700'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Môn học / Khối lớp:
                    </label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-neutral-800 border-neutral-700'
                      }`}
                    >
                      <option value="Tin học 10 (KNTT)">Tin học 10 (KNTT) - Python</option>
                      <option value="Tin học 11 (KNTT)">Tin học 11 (KNTT) - Thuật toán</option>
                      <option value="Tin học THPT - C++">Tin học THPT - C++</option>
                      <option value="Tin học THPT">Tin học THPT Tổng hợp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Ghi chú ngắn:
                    </label>
                    <input
                      type="text"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Ví dụ: Ôn tập thi giữa kỳ I..."
                      className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-neutral-800 border-neutral-700'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu chủ đề này vào kho (Save Snapshot)</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* TAB: MỤC SAU KHI LƯU (Kho chủ đề đã lưu) */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 pb-1 flex-wrap gap-2">
                <span>Chọn một bộ ôn tập trong kho để nạp lại vào ứng dụng:</span>
                <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                  ● Đang mở: {snapshots.find(s => s.id === activeSnapshotId)?.title || 'Mặc định'}
                </span>
              </div>

              {snapshots.map((snap) => {
                const isActive = snap.id === activeSnapshotId;
                const isEditingThis = editingId === snap.id;

                return (
                  <div
                    key={snap.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive 
                        ? 'border-blue-500/80 bg-blue-500/5 ring-1 ring-blue-500/50' 
                        : isLight 
                          ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300' 
                          : 'bg-neutral-800/50 border-neutral-700/80 hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1 min-w-0">
                        {isEditingThis ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editTitleInput}
                              onChange={(e) => setEditTitleInput(e.target.value)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${
                                isLight ? 'bg-white border-slate-300' : 'bg-neutral-900 border-neutral-700'
                              }`}
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleConfirmRename(snap.id)}
                              className="p-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
                              title="Lưu tên mới"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="p-1 rounded-md bg-slate-300 dark:bg-neutral-700 hover:bg-slate-400 cursor-pointer"
                              title="Hủy"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm leading-tight text-slate-900 dark:text-white">
                              {snap.title}
                            </h4>
                            {isActive && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                                Đang chọn
                              </span>
                            )}
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-neutral-700 text-slate-700 dark:text-neutral-300">
                              {snap.subject}
                            </span>
                          </div>
                        )}

                        <p className="text-xs text-slate-600 dark:text-neutral-400 line-clamp-1">
                          {snap.description}
                        </p>

                        {/* Snapshot Metadata badge */}
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-neutral-400 pt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-blue-500" />
                            {snap.sources?.length || 0} học liệu
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3 text-emerald-500" />
                            {snap.studyPack?.flashcards?.length || 0} flashcards
                          </span>
                          <span className="flex items-center gap-1">
                            <HelpCircle className="w-3 h-3 text-purple-500" />
                            {snap.studyPack?.questions?.length || 0} câu hỏi
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-slate-400">
                            <Clock className="w-2.5 h-2.5" />
                            {new Date(snap.updatedAt || snap.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                        {/* Nút Đổi tên ngắn */}
                        <button
                          type="button"
                          onClick={() => handleStartRename(snap)}
                          title="Đổi tên ngắn"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-slate-200/60 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Nút Xóa môn không dùng */}
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc muốn xóa môn học "${snap.title}" không?`)) {
                              playMechanicalKeyClick();
                              onDeleteSnapshot(snap.id);
                              showGlobalToast(`Đã xóa môn học: "${snap.title}"`);
                            }
                          }}
                          disabled={snapshots.length <= 1}
                          title={snapshots.length <= 1 ? 'Cần giữ lại ít nhất 1 môn' : 'Xóa môn này'}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            snapshots.length <= 1
                              ? 'text-slate-300 dark:text-neutral-600 cursor-not-allowed'
                              : 'text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                          }`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Nút Mở (Restore Snapshot) */}
                        <button
                          type="button"
                          onClick={() => {
                            playMechanicalKeyClick();
                            onRestoreSnapshot(snap);
                            onClose();
                          }}
                          className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer ${
                            isActive
                              ? 'bg-blue-600 text-white hover:bg-blue-500'
                              : 'bg-emerald-600 text-white hover:bg-emerald-500'
                          }`}
                        >
                          <FolderUp className="w-3.5 h-3.5" />
                          <span>{isActive ? 'Đang mở' : 'Mở'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-t border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50 rounded-b-2xl text-[11px] text-slate-500 dark:text-neutral-400">
          <span>
            💡 Bạn có thể tìm theo mục Trước khi lưu hoặc Sau khi lưu bằng ô tìm kiếm ở trên.
          </span>
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              onClose();
            }}
            className="px-3 py-1 font-bold text-xs rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-800 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
