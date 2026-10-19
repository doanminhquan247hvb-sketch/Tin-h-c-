import React, { useState, useMemo } from 'react';
import { 
  FolderDown, FolderUp, Save, Edit3, Sparkles, BookOpen, 
  Layers, HelpCircle, Check, ChevronDown, ChevronUp, Search, 
  X, ArrowRight, Clock, FileText, CheckCircle2, History
} from 'lucide-react';
import { 
  TopicSnapshot, 
  searchDraftItems, 
  searchSavedSnapshots, 
  DraftSearchResult, 
  SavedSnapshotSearchResult 
} from '../utils/topicSnapshotEngine';
import { StudyMaterial, Flashcard, PracticeQuestion, QASeedItem, ActiveTab } from '../types';
import { playMechanicalKeyClick } from '../utils/audio';
import { showGlobalToast } from '../utils/keyboardShortcuts';

interface TopicSnapshotBarProps {
  isLight: boolean;
  activeSnapshot: TopicSnapshot | undefined;
  snapshots: TopicSnapshot[];
  sources: StudyMaterial[];
  flashcards: Flashcard[];
  questions: PracticeQuestion[];
  qaSeeds?: QASeedItem[];
  onOpenModal: (initialTab?: 'list' | 'save_new' | 'draft_preview') => void;
  onQuickSave: () => void;
  onQuickRename: (newTitle: string) => void;
  onRestoreSnapshot: (snapshot: TopicSnapshot) => void;
  onNavigateTab?: (tab: ActiveTab) => void;
}

export type SearchScopeFilter = 'all' | 'before_save' | 'after_save';

export const TopicSnapshotBar: React.FC<TopicSnapshotBarProps> = ({
  isLight,
  activeSnapshot,
  snapshots,
  sources,
  flashcards,
  questions,
  qaSeeds = [],
  onOpenModal,
  onQuickSave,
  onQuickRename,
  onRestoreSnapshot,
  onNavigateTab
}) => {
  // Inline rename state
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [inlineTitle, setInlineTitle] = useState(activeSnapshot?.title || 'Tin học 10');

  // Search & Filter State at the top
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<SearchScopeFilter>('all');
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [activeSectionView, setActiveSectionView] = useState<'before_save' | 'after_save' | 'none'>('none');

  // Search Results Calculation
  const draftResults = useMemo<DraftSearchResult[]>(() => {
    if (!searchQuery.trim()) return [];
    return searchDraftItems(searchQuery, {
      sources,
      flashcards,
      questions,
      qaSeeds
    });
  }, [searchQuery, sources, flashcards, questions, qaSeeds]);

  const savedResults = useMemo<SavedSnapshotSearchResult[]>(() => {
    if (!searchQuery.trim()) return [];
    return searchSavedSnapshots(searchQuery, snapshots);
  }, [searchQuery, snapshots]);

  const hasSearchQuery = searchQuery.trim().length > 0;
  const totalResultsCount = (searchScope === 'all' || searchScope === 'before_save' ? draftResults.length : 0) +
                           (searchScope === 'all' || searchScope === 'after_save' ? savedResults.length : 0);

  const handleStartEdit = () => {
    playMechanicalKeyClick();
    setInlineTitle(activeSnapshot?.title || '');
    setIsEditingInline(true);
  };

  const handleSaveInline = () => {
    if (inlineTitle.trim()) {
      playMechanicalKeyClick();
      onQuickRename(inlineTitle.trim());
      setIsEditingInline(false);
      showGlobalToast(`Đã đổi tên ngắn môn học thành: "${inlineTitle.trim()}"`);
    }
  };

  const handleJumpToDraftItem = (item: DraftSearchResult) => {
    playMechanicalKeyClick();
    if (onNavigateTab) {
      onNavigateTab(item.targetTab);
      showGlobalToast(`Đã chuyển đến mục ${item.categoryLabel}: "${item.title.slice(0, 30)}..."`);
    }
    setIsPanelExpanded(false);
  };

  const handleQuickRestore = (snap: TopicSnapshot) => {
    playMechanicalKeyClick();
    onRestoreSnapshot(snap);
    setIsPanelExpanded(false);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Top Main Bar */}
      <div
        className={`w-full py-2.5 px-3.5 sm:px-4 rounded-2xl border backdrop-blur-md transition-all shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 ${
          isLight
            ? 'bg-white/95 border-blue-200/80 text-slate-800'
            : 'bg-neutral-900/95 border-blue-900/60 text-neutral-100'
        }`}
      >
        {/* Left: Active Subject + Dual Section Buttons (Trước khi lưu & Sau khi lưu) */}
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          {/* Active Subject Title / Inline Edit */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            {isEditingInline ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={inlineTitle}
                  onChange={(e) => setInlineTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveInline();
                    if (e.key === 'Escape') setIsEditingInline(false);
                  }}
                  className={`px-2 py-0.5 text-xs font-bold rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isLight ? 'bg-white border-slate-300' : 'bg-neutral-800 border-neutral-700'
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveInline}
                  className="p-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
                  title="Lưu tên"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <span>{activeSnapshot?.title || 'Tin học 10 - Lập trình Python'}</span>
                </h3>
                <button
                  type="button"
                  onClick={handleStartEdit}
                  title="Đổi tên ngắn chủ đề"
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 rounded-md hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Section Divider */}
          <span className="text-slate-300 dark:text-neutral-700 hidden sm:inline">|</span>

          {/* MỤC TRƯỚC KHI LƯU (Bản nháp đang soạn) */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              if (activeSectionView === 'before_save' && isPanelExpanded) {
                setIsPanelExpanded(false);
                setActiveSectionView('none');
              } else {
                setActiveSectionView('before_save');
                setIsPanelExpanded(true);
              }
            }}
            title="Xem các mục trong bản nháp hiện tại (Trước khi lưu)"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              activeSectionView === 'before_save' && isPanelExpanded
                ? 'bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400 font-bold ring-1 ring-amber-500/40'
                : isLight
                  ? 'bg-amber-50 hover:bg-amber-100/80 text-amber-700 border-amber-200'
                  : 'bg-amber-950/30 hover:bg-amber-950/50 text-amber-300 border-amber-900/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Mục trước khi lưu</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
              {sources.length + flashcards.length + questions.length}
            </span>
            {activeSectionView === 'before_save' && isPanelExpanded ? (
              <ChevronUp className="w-3 h-3 text-amber-500" />
            ) : (
              <ChevronDown className="w-3 h-3 text-amber-500" />
            )}
          </button>

          {/* MỤC SAU KHI LƯU (Kho chủ đề đã lưu) */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              if (activeSectionView === 'after_save' && isPanelExpanded) {
                setIsPanelExpanded(false);
                setActiveSectionView('none');
              } else {
                setActiveSectionView('after_save');
                setIsPanelExpanded(true);
              }
            }}
            title="Xem các chủ đề đã lưu trong kho (Sau khi lưu)"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              activeSectionView === 'after_save' && isPanelExpanded
                ? 'bg-blue-500/15 border-blue-500 text-blue-600 dark:text-blue-400 font-bold ring-1 ring-blue-500/40'
                : isLight
                  ? 'bg-blue-50 hover:bg-blue-100/80 text-blue-700 border-blue-200'
                  : 'bg-blue-950/30 hover:bg-blue-950/50 text-blue-300 border-blue-900/60'
            }`}
          >
            <FolderUp className="w-3.5 h-3.5 text-blue-500" />
            <span>Mục sau khi lưu</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold">
              {snapshots.length}
            </span>
            {activeSectionView === 'after_save' && isPanelExpanded ? (
              <ChevronUp className="w-3 h-3 text-blue-500" />
            ) : (
              <ChevronDown className="w-3 h-3 text-blue-500" />
            )}
          </button>
        </div>

        {/* Right: Search by Category ("tìm theo mục trước khi lưu và sau khi lưu ở trên") + Actions */}
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          {/* Integrated Search Input with Category Filters */}
          <div className="relative flex items-center min-w-[240px] sm:min-w-[280px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 0) {
                  setIsPanelExpanded(true);
                }
              }}
              onFocus={() => {
                if (hasSearchQuery) setIsPanelExpanded(true);
              }}
              placeholder="Tìm theo mục (trước/sau khi lưu)..."
              className={`w-full pl-8 pr-16 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition-all ${
                isLight 
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white placeholder-slate-400' 
                  : 'bg-neutral-800 border-neutral-700 text-neutral-100 focus:bg-neutral-900 placeholder-neutral-500'
              }`}
            />
            {hasSearchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsPanelExpanded(false);
                }}
                className="absolute right-2 p-0.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="absolute right-2 text-[10px] font-mono text-slate-400 pointer-events-none">
                Ctrl+K
              </span>
            )}
          </div>

          {/* Quick Action: Lưu chủ đề này */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              onQuickSave();
            }}
            title="Lưu snapshot working copy hiện tại vào LocalStorage"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Lưu chủ đề này</span>
          </button>

          {/* Quick Action: Mở kho quản lý */}
          <button
            type="button"
            onClick={() => {
              playMechanicalKeyClick();
              onOpenModal('list');
            }}
            title="Mở toàn bộ danh sách các môn đã lưu hoặc quản lý"
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shrink-0 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border-neutral-700'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden sm:inline">Quản lý kho</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE SEARCH & CATEGORY PANEL (Trực tiếp ở phần trên) */}
      {isPanelExpanded && (
        <div
          className={`w-full rounded-2xl border p-4 backdrop-blur-md shadow-lg transition-all animate-fade-in ${
            isLight
              ? 'bg-white/98 border-blue-200 text-slate-800'
              : 'bg-neutral-900/98 border-blue-900 text-neutral-100'
          }`}
        >
          {/* Panel Header: Filter Scope Selector & Close Button */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-neutral-800 pb-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-500 dark:text-neutral-400 mr-1 flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-blue-500" />
                Lọc theo mục:
              </span>

              {/* Pill: Tất cả */}
              <button
                type="button"
                onClick={() => {
                  playMechanicalKeyClick();
                  setSearchScope('all');
                  setActiveSectionView('none');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  searchScope === 'all' && activeSectionView === 'none'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                }`}
              >
                Tất cả các mục
              </button>

              {/* Pill: Trước khi lưu (Bản nháp) */}
              <button
                type="button"
                onClick={() => {
                  playMechanicalKeyClick();
                  setSearchScope('before_save');
                  setActiveSectionView('before_save');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  searchScope === 'before_save' || activeSectionView === 'before_save'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : isLight
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-900'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Trước khi lưu ({hasSearchQuery ? draftResults.length : sources.length + flashcards.length + questions.length})</span>
              </button>

              {/* Pill: Sau khi lưu (Kho chủ đề) */}
              <button
                type="button"
                onClick={() => {
                  playMechanicalKeyClick();
                  setSearchScope('after_save');
                  setActiveSectionView('after_save');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  searchScope === 'after_save' || activeSectionView === 'after_save'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isLight
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-blue-950/40 hover:bg-blue-900/50 text-blue-300 border border-blue-900'
                }`}
              >
                <FolderUp className="w-3 h-3" />
                <span>Sau khi lưu ({hasSearchQuery ? savedResults.length : snapshots.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {hasSearchQuery && (
                <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                  Khớp {totalResultsCount} mục
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  playMechanicalKeyClick();
                  setIsPanelExpanded(false);
                  setActiveSectionView('none');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Đóng bảng tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="pt-3 max-h-[360px] overflow-y-auto space-y-4">
            {/* KHI ĐANG TÌM KIẾM (hasSearchQuery = true) */}
            {hasSearchQuery ? (
              totalResultsCount === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500 dark:text-neutral-400">
                  Không tìm thấy mục nào khớp với từ khóa &ldquo;{searchQuery}&rdquo;. Hãy thử tìm với từ khóa khác như &ldquo;range&rdquo;, &ldquo;vòng lặp&rdquo;, &ldquo;thuật toán&rdquo;, &ldquo;tin 10&rdquo;...
                </div>
              ) : (
                <div className="space-y-4">
                  {/* KẾT QUẢ TRONG MỤC: TRƯỚC KHI LƯU */}
                  {(searchScope === 'all' || searchScope === 'before_save') && draftResults.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          Mục trước khi lưu (Bản nháp hiện hành) - {draftResults.length} kết quả:
                        </span>
                        <span className="text-[11px] text-slate-400">Click để chuyển đến xem nội dung</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {draftResults.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleJumpToDraftItem(item)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition-all hover:scale-[1.01] ${
                              isLight
                                ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400'
                                : 'bg-amber-950/20 border-amber-900/60 hover:border-amber-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300">
                                {item.categoryLabel}
                              </span>
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 flex items-center gap-0.5 font-bold">
                                Xem <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-neutral-100 line-clamp-1 mb-0.5">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-600 dark:text-neutral-400 line-clamp-2">
                              {item.snippet}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* KẾT QUẢ TRONG MỤC: SAU KHI LƯU */}
                  {(searchScope === 'all' || searchScope === 'after_save') && savedResults.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                        <span className="flex items-center gap-1.5">
                          <FolderUp className="w-4 h-4" />
                          Mục sau khi lưu (Kho chủ đề đã lưu) - {savedResults.length} bộ khớp:
                        </span>
                        <span className="text-[11px] text-slate-400">Click &ldquo;Mở bộ này&rdquo; để phục hồi</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {savedResults.map(({ snapshot, matchReasons }) => {
                          const isActive = snapshot.id === activeSnapshot?.id;
                          return (
                            <div
                              key={snapshot.id}
                              className={`p-3 rounded-xl border text-xs transition-all ${
                                isActive
                                  ? 'border-blue-500 bg-blue-500/5'
                                  : isLight
                                    ? 'bg-slate-50 border-slate-200 hover:border-blue-300'
                                    : 'bg-neutral-800/60 border-neutral-700 hover:border-blue-600'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                      {snapshot.title}
                                    </h4>
                                    {isActive && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                                        Đang mở
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                                    {snapshot.subject}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleQuickRestore(snapshot)}
                                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-xs shrink-0 flex items-center gap-1"
                                >
                                  <FolderUp className="w-3 h-3" />
                                  <span>{isActive ? 'Đang dùng' : 'Mở bộ này'}</span>
                                </button>
                              </div>

                              {/* Lý do khớp */}
                              <div className="space-y-0.5 pt-1 border-t border-slate-200 dark:border-neutral-700/60">
                                {matchReasons.slice(0, 3).map((reason, idx) => (
                                  <span
                                    key={idx}
                                    className="block text-[11px] text-emerald-600 dark:text-emerald-400 font-medium"
                                  >
                                    ✓ {reason}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              /* KHI KHÔNG TÌM KIẾM: XEM THEO DANH MỤC TRƯỚC / SAU KHI LƯU */
              <div className="space-y-4">
                {/* 1. XEM MỤC TRƯỚC KHI LƯU */}
                {(activeSectionView === 'before_save' || activeSectionView === 'none') && (
                  <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-500" />
                        <h4 className="font-bold text-xs text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                          Mục trước khi lưu (Bản nháp đang làm việc)
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          playMechanicalKeyClick();
                          onQuickSave();
                        }}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-xs"
                      >
                        <Save className="w-3 h-3" />
                        <span>Lưu các mục này thành Snapshot mới</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-neutral-400">
                      Bản nháp hiện tại chứa đầy đủ dữ liệu bạn vừa nhập hoặc sinh ra từ AI. Bạn có thể duyệt tìm nhanh hoặc lưu vào kho để không bị mất:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div 
                        onClick={() => onNavigateTab && onNavigateTab('materials')}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 cursor-pointer hover:border-amber-400 transition-all"
                      >
                        <span className="text-[10px] text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-blue-500" /> Học liệu (Nguồn)
                        </span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                          {sources.length} tài liệu
                        </strong>
                      </div>

                      <div 
                        onClick={() => onNavigateTab && onNavigateTab('flashcards')}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 cursor-pointer hover:border-amber-400 transition-all"
                      >
                        <span className="text-[10px] text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-emerald-500" /> Flashcards
                        </span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                          {flashcards.length} thẻ
                        </strong>
                      </div>

                      <div 
                        onClick={() => onNavigateTab && onNavigateTab('quiz')}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 cursor-pointer hover:border-amber-400 transition-all"
                      >
                        <span className="text-[10px] text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3 text-purple-500" /> Trắc nghiệm
                        </span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                          {questions.length} câu hỏi
                        </strong>
                      </div>

                      <div 
                        onClick={() => onNavigateTab && onNavigateTab('study_pack')}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 cursor-pointer hover:border-amber-400 transition-all"
                      >
                        <span className="text-[10px] text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" /> Ma trận kiến thức
                        </span>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                          Đã phân tích
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. XEM MỤC SAU KHI LƯU */}
                {(activeSectionView === 'after_save' || activeSectionView === 'none') && (
                  <div className="p-3.5 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <FolderUp className="w-4 h-4 text-blue-500" />
                        <h4 className="font-bold text-xs text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                          Mục sau khi lưu (Kho lưu trữ - {snapshots.length} chủ đề)
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          playMechanicalKeyClick();
                          onOpenModal('list');
                        }}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Xem tất cả & đổi tên / xóa môn <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {snapshots.map((snap) => {
                        const isActive = snap.id === activeSnapshot?.id;
                        return (
                          <div
                            key={snap.id}
                            className={`p-3 rounded-xl border text-xs transition-all ${
                              isActive
                                ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500/40'
                                : isLight
                                  ? 'bg-white border-slate-200 hover:border-blue-300'
                                  : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <h5 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                {snap.title}
                              </h5>
                              {isActive ? (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-600 text-white shrink-0">
                                  Đang mở
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleQuickRestore(snap)}
                                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0 cursor-pointer"
                                >
                                  Mở
                                </button>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-neutral-400 block line-clamp-1 mb-1.5">
                              {snap.subject}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                              <span>{snap.sources?.length || 0} học liệu</span>
                              <span>•</span>
                              <span>{snap.studyPack?.flashcards?.length || 0} thẻ</span>
                              <span>•</span>
                              <span>{snap.studyPack?.questions?.length || 0} câu hỏi</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
