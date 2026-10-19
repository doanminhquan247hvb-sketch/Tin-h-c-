import React, { useState } from 'react';
import { Layers, Bookmark, AlertCircle, Sparkles } from 'lucide-react';
import { MOCK_FLASHCARD_PLACEHOLDERS } from '../data/placeholderData';
import { GradeFilter, TerminalTheme } from '../types';

interface FlashcardsPreviewProps {
  theme?: TerminalTheme;
}

export const FlashcardsPreview: React.FC<FlashcardsPreviewProps> = ({ theme = 'light' }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeFilter>('all');
  const isLight = theme === 'light';

  const filteredCards = MOCK_FLASHCARD_PLACEHOLDERS.filter(card =>
    selectedGrade === 'all' || card.grade === selectedGrade
  );

  return (
    <div id="flashcards-preview-screen" className="space-y-6">
      {/* Textbook Curriculum Header Banner */}
      <div
        className={`border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-neutral-950 border-neutral-800'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg border shrink-0 ${
              isLight
                ? 'bg-sky-50 border-sky-200 text-sky-600'
                : 'bg-neutral-900 border-neutral-700 text-amber-300'
            }`}
          >
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                className={`text-base font-bold font-mono ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Flashcards Ghi Nhớ Khái Niệm & Cú Pháp (KNTT)
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                Coming Soon • Buổi 3
              </span>
            </div>
            <p
              className={`text-xs mt-1 max-w-2xl leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              [Bản v0.1 App Shell]: Khung hiển thị thẻ nhớ kiến thức Tin học 10 & 11 trọng tâm. Hiệu ứng lật mặt thẻ 3D và thuật toán lặp lại ngắt quãng (Spaced Repetition) sẽ được tích hợp ở Buổi 3.
            </p>
          </div>
        </div>

        <div
          className={`px-3 py-1.5 rounded-lg border text-xs font-mono whitespace-nowrap ${
            isLight
              ? 'bg-slate-50 text-slate-700 border-slate-200 font-semibold'
              : 'bg-neutral-900 text-neutral-300 border-neutral-800'
          }`}
        >
          Flashcards v0.1
        </div>
      </div>

      {/* Grade Filter Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Phân loại thẻ nhớ:
          </span>
          <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono">
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                selectedGrade === 'all'
                  ? isLight
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'bg-white text-black font-bold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedGrade('tin10')}
              className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                selectedGrade === 'tin10'
                  ? isLight
                    ? 'bg-sky-600 text-white font-bold shadow-xs'
                    : 'bg-white text-black font-bold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Tin Học 10
            </button>
            <button
              onClick={() => setSelectedGrade('tin11')}
              className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                selectedGrade === 'tin11'
                  ? isLight
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-white text-black font-bold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Tin Học 11
            </button>
            <button
              onClick={() => setSelectedGrade('cpp')}
              className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                selectedGrade === 'cpp'
                  ? isLight
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'bg-white text-black font-bold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Bonus C++ THPT
            </button>
          </div>
        </div>

        <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
          {filteredCards.length} thẻ ghi nhớ mẫu
        </span>
      </div>

      {/* Static Flashcards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card, idx) => (
          <div
            key={card.id}
            className={`border rounded-xl p-5 flex flex-col justify-between min-h-[200px] transition-colors ${
              isLight
                ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                : 'bg-black border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <span
                className={`flex items-center gap-1.5 font-bold ${
                  isLight ? 'text-slate-700' : 'text-neutral-300'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-sky-600" />
                Thẻ {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-sans border font-medium ${
                  card.grade === 'tin10'
                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                    : card.grade === 'tin11'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                {card.tag}
              </span>
            </div>

            {/* Front Question Content */}
            <div className="my-2">
              <div className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono uppercase tracking-wider mb-1">
                Mặt trước (Khái niệm / Câu hỏi cốt lõi):
              </div>
              <p
                className={`text-sm font-semibold font-mono leading-relaxed ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {card.front}
              </p>
            </div>

            {/* Back Answer Preview (Static display in v0.1) */}
            <div
              className={`mt-3 pt-3 border-t ${
                isLight ? 'border-slate-100' : 'border-neutral-900'
              }`}
            >
              <div className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Mặt sau (Ghi nhớ chuẩn SGK):</span>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 font-sans">
                  [Tĩnh v0.1 - Xem trước]
                </span>
              </div>
              <p
                className={`text-xs font-mono leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-neutral-300'
                }`}
              >
                {card.back}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon note */}
      <div
        className={`border border-dashed rounded-xl p-4 flex items-center gap-3 text-xs font-mono ${
          isLight
            ? 'bg-slate-50 border-slate-300 text-slate-600'
            : 'bg-neutral-950/50 border-neutral-800 text-neutral-400'
        }`}
      >
        <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
        <span>
          Tuân thủ yêu cầu v0.1: Chức năng lật mặt thẻ 3D và đánh dấu ghi nhớ được giữ ở trạng thái hiển thị khung giao diện tĩnh, chờ kích hoạt ở Buổi 3.
        </span>
      </div>
    </div>
  );
};
