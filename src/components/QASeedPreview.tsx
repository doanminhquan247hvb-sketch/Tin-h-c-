import React, { useState, useEffect } from 'react';
import { 
  Bot, HelpCircle, Sparkles, Copy, Check, Plus, MessageSquare, 
  BookOpen, RotateCcw, Send, Database, CheckCircle2, Trash2 
} from 'lucide-react';
import { QASeedItem, TerminalTheme, AppLanguage } from '../types';
import { 
  DEFAULT_QA_SEEDS, 
  loadQASeedsFromStorage, 
  saveQASeedsToStorage 
} from '../utils/qaSeedEngine';
import { playMechanicalKeyClick } from '../utils/audio';

interface QASeedPreviewProps {
  theme?: TerminalTheme;
  language?: AppLanguage;
}

export const QASeedPreview: React.FC<QASeedPreviewProps> = ({ 
  theme = 'light',
  language = 'vi' 
}) => {
  const isLight = theme === 'light';
  const [seeds, setSeeds] = useState<QASeedItem[]>(() => loadQASeedsFromStorage());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New Seed Form state
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<string>('Toán học (Lớp 7)');
  const [newTopic, setNewTopic] = useState<string>('Biểu thức đại số');
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newShortAnswer, setNewShortAnswer] = useState<string>('');

  useEffect(() => {
    saveQASeedsToStorage(seeds);
  }, [seeds]);

  const handleCopyText = (text: string, key: string) => {
    playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddSeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newShortAnswer.trim()) return;
    playMechanicalKeyClick();
    const item: QASeedItem = {
      id: `qa-${Date.now()}`,
      subject: newSubject.trim() || 'Tổng hợp',
      topic: newTopic.trim() || 'Chủ đề ôn tập',
      question: newQuestion.trim(),
      shortAnswer: newShortAnswer.trim(),
      dateAdded: new Date().toLocaleTimeString('vi-VN')
    };
    setSeeds(prev => [item, ...prev]);
    setNewQuestion('');
    setNewShortAnswer('');
    setShowAddForm(false);
  };

  const handleDeleteSeed = (id: string) => {
    playMechanicalKeyClick();
    setSeeds(prev => prev.filter(s => s.id !== id));
  };

  const handleResetSeeds = () => {
    playMechanicalKeyClick();
    if (window.confirm('Khôi phục danh sách Q&A Seed về mặc định?')) {
      setSeeds(DEFAULT_QA_SEEDS);
      saveQASeedsToStorage(DEFAULT_QA_SEEDS);
    }
  };

  return (
    <div id="qa-seed-view-screen" className="space-y-6">
      {/* 1. Header & Terminal Prompt #06 Card verbatim from image */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
            Build: Q&A Seed
          </h1>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider">
            FUNCTION
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-rose-500 block tracking-wider">PROMPT</span>
          <span className="text-lg font-black font-mono text-slate-800 dark:text-neutral-100">#06</span>
        </div>
      </div>

      {/* Terminal Prompt Card for Prompt #06 */}
      <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] text-white p-4 sm:p-5 shadow-xl font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <span className="text-[11px] font-bold text-neutral-400 tracking-wider">
              LOẠI: FUNCTION
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleCopyText(
              `Hãy tạo Q&A seed cho chủ đề học tập hiện tại.\n\nQ&A seed là danh sách câu hỏi gợi mở và câu trả lời ngắn ban đầu để chuẩn bị cho chatbot hỗ trợ ôn bài ở buổi sau.\n\nLưu ý:\n- chỉ ở mức khởi tạo\n- chưa cần chatbot hoàn chỉnh\n- không đi sang buổi 5\n- ưu tiên các câu hỏi mà học sinh thật sự có thể hỏi về chủ đề`,
              'prompt-06-qa-copy'
            )}
            className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
              copiedKey === 'prompt-06-qa-copy'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
            }`}
          >
            {copiedKey === 'prompt-06-qa-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'prompt-06-qa-copy' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
          </button>
        </div>

        <div className="mt-3.5 space-y-2.5 text-xs sm:text-[13px] leading-relaxed text-neutral-200">
          <p className="font-semibold text-white">
            Hãy tạo Q&A seed cho chủ đề học tập hiện tại.
          </p>
          <p className="text-neutral-300 text-xs">
            Q&A seed là danh sách câu hỏi gợi mở và câu trả lời ngắn ban đầu để chuẩn bị cho chatbot hỗ trợ ôn bài ở buổi sau.
          </p>
          <div className="space-y-1 text-neutral-300 text-xs pt-1">
            <p className="text-neutral-400 font-bold">Lưu ý:</p>
            <p>- chỉ ở mức khởi tạo</p>
            <p>- chưa cần chatbot hoàn chỉnh</p>
            <p>- không đi sang buổi 5</p>
            <p>- ưu tiên các câu hỏi mà học sinh thật sự có thể hỏi về chủ đề</p>
          </div>
        </div>
      </div>

      {/* 2. Study Pack LocalStorage Banner (Matching user screenshot #3) */}
      <div className="p-4 sm:p-5 rounded-2xl border bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold text-lg shadow-sm">
            💾
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight">
              Lưu Study Pack bằng LocalStorage
            </h2>
            <p className="text-xs text-indigo-200 mt-0.5">
              "Lưu trữ Summary & Key points" • "Lưu danh sách Câu hỏi & Flashcard" • "Lưu Q&A Seed"
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-indigo-800/60 flex items-center justify-between text-xs text-indigo-200 flex-wrap gap-2">
          <span className="bg-rose-950/70 border border-rose-800 text-rose-300 px-3 py-1 rounded-full text-[11px] font-semibold">
            Mục tiêu: Đảm bảo buổi 4 mở lại app vẫn có thể dùng tiếp dữ liệu.
          </span>
          <span className="text-[11px] font-mono text-emerald-400">
            ✓ Trạng thái: LocalStorage đã kích hoạt tự động
          </span>
        </div>
      </div>

      {/* 3. Interactive Seed List & Add Form */}
      <div className={`p-4 sm:p-6 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-neutral-800 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-neutral-100">
              Danh sách Q&A Seed khởi tạo ({seeds.length} câu)
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
              Chuẩn bị cho Chatbot Buổi 4
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Đóng form' : 'Thêm câu hỏi Q&A Seed'}</span>
            </button>
            <button
              type="button"
              onClick={handleResetSeeds}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-slate-600 dark:text-neutral-300 text-xs hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Khôi phục</span>
            </button>
          </div>
        </div>

        {/* Add Seed Form */}
        {showAddForm && (
          <form onSubmit={handleAddSeed} className="mb-6 p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Môn học & Lớp:
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="VD: Toán học (Lớp 7), Tin học 10..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs bg-white dark:bg-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Chủ đề học tập:
                </label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="VD: Biểu thức đại số, Vòng lặp while..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs bg-white dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Câu hỏi gợi mở học sinh có thể hỏi:
              </label>
              <input
                type="text"
                required
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="VD: Biểu thức đại số là gì? Hoặc làm sao phân biệt for và while?"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs bg-white dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Câu trả lời ngắn ban đầu (chuẩn bị dữ liệu cho chatbot):
              </label>
              <textarea
                required
                rows={2}
                value={newShortAnswer}
                onChange={(e) => setNewShortAnswer(e.target.value)}
                placeholder="Câu trả lời ngắn gọn, chuẩn mực sư phạm để chatbot đối chiếu phản hồi..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs bg-white dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg text-xs border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                Lưu câu hỏi gợi mở
              </button>
            </div>
          </form>
        )}

        {/* Seed List Display */}
        <div className="space-y-3">
          {seeds.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-neutral-800 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                    {item.subject}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-neutral-400">
                    • {item.topic}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCopyText(
                      `Hỏi: ${item.question}\nTrả lời: ${item.shortAnswer}`,
                      `qa-item-${item.id}`
                    )}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-300 hover:text-blue-600 cursor-pointer"
                  >
                    {copiedKey === `qa-item-${item.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === `qa-item-${item.id}` ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSeed(item.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                    title="Xóa câu hỏi này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                    Học sinh hỏi:
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {item.question}
                  </p>
                </div>

                <div className="flex items-start gap-2 pl-2 border-l-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 p-2 rounded-r-lg">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
                    Trả lời ngắn:
                  </span>
                  <p className="text-xs text-slate-800 dark:text-neutral-200 leading-relaxed font-sans">
                    {item.shortAnswer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
