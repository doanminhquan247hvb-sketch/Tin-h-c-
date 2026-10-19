import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Terminal as TerminalIcon, 
  Code2, 
  Volume2, 
  VolumeX, 
  Check, 
  Tv, 
  Copy, 
  BookOpen, 
  GraduationCap, 
  Sparkles,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Calendar,
  Bookmark,
  Database,
  CheckCheck,
  Zap,
  Lightbulb,
  ListOrdered,
  FileText
} from 'lucide-react';
import { CodeSnippet, GradeFilter, TerminalTheme, StudyMaterial, AppLanguage } from '../types';
import { PYTHON_LESSONS } from '../data/placeholderData';
import { playMechanicalKeyClick, setTypingSpeed as setAudioTypingSpeed } from '../utils/audio';
import { generatePedagogicalSummary, saveSummaryToLocalStorage, formatSummaryForCopy } from '../utils/summaryEngine';

interface TerminalViewProps {
  soundOn: boolean;
  onToggleSound: () => void;
  theme: TerminalTheme;
  onToggleTheme: () => void;
  language?: AppLanguage;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  soundOn,
  onToggleSound,
  theme,
  onToggleTheme,
  language = 'vi',
}) => {
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<CodeSnippet>(PYTHON_LESSONS[0]);
  const [typedText, setTypedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(35); // ms per char
  const [interactiveInput, setInteractiveInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; output: string; timestamp: string }>>([
    {
      cmd: 'python3 -V',
      output: 'Python 3.11.8 (Chương trình Tin Học 10 & 11 - Kết Nối Tri Thức)\n[Môi trường học tập v0.1 App Shell đã sẵn sàng]',
      timestamp: '08:00:01'
    }
  ]);
  const [crtEffect, setCrtEffect] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [rightPanelTab, setRightPanelTab] = useState<'console' | 'plan_note' | 'function'>('console');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedToLocalSuccess, setSavedToLocalSuccess] = useState<boolean>(false);
  const [savedFunctionSummarySuccess, setSavedFunctionSummarySuccess] = useState<boolean>(false);

  const handleCopyContent = (text: string, key: string) => {
    if (soundOn) playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveLessonPlanToLocalStorage = () => {
    if (soundOn) playMechanicalKeyClick();
    try {
      const existingStr = localStorage.getItem('mindx_study_materials');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const newPlan: StudyMaterial = {
        id: `mat-lesson-${selectedLesson.id}`,
        type: 'plan',
        title: `Kế hoạch học tập Bài ${selectedLesson.lessonNumber}: ${selectedLesson.title}`,
        subjectTopic: `${selectedLesson.chapter} - ${selectedLesson.topic}`,
        content: `[LOẠI: PLAN - KẾ HOẠCH HỌC TẬP SGK KNTT]
• Mục tiêu: ${selectedLesson.description}
• Bài tập: Tự tay gõ lại mã nguồn trên Terminal và kiểm thử với các bộ test case khác nhau.
• Lưu ý: Thẩm định chéo kết quả với SGK KNTT và Thầy cô giáo bộ môn.`,
        promptText: `Tôi đang học Bài ${selectedLesson.lessonNumber}: ${selectedLesson.title} (${selectedLesson.topic}). Hãy đưa ra các câu hỏi gợi ý tư duy để tôi tự viết code, KHÔNG đưa ra code giải hộ.`,
        dateAdded: `Lưu từ Terminal lúc ${new Date().toLocaleTimeString('vi-VN')}`
      };
      
      const updated = [newPlan, ...existing.filter((m: any) => m.id !== newPlan.id)];
      localStorage.setItem('mindx_study_materials', JSON.stringify(updated));
      setSavedToLocalSuccess(true);
      setTimeout(() => setSavedToLocalSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveLessonFunctionSummaryToLocalStorage = () => {
    if (soundOn) playMechanicalKeyClick();
    try {
      const existingStr = localStorage.getItem('mindx_study_materials');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const summaryResult = generatePedagogicalSummary({
        title: selectedLesson.title,
        content: `${selectedLesson.description}\n${selectedLesson.code}`,
        subjectTopic: `${selectedLesson.chapter} - ${selectedLesson.topic}`,
        type: 'note'
      });

      const newSummaryNote: StudyMaterial = {
        id: `mat-summary-lesson-${selectedLesson.id}`,
        type: 'note',
        title: `[LOẠI: FUNCTION - Tóm tắt & Ý chính] Bài ${selectedLesson.lessonNumber}: ${selectedLesson.title}`,
        subjectTopic: `${selectedLesson.chapter} - ${selectedLesson.topic}`,
        content: `### Tóm tắt cốt lõi (Summary)\n${summaryResult.summary}\n\n### Điểm then chốt (Key Points)\n${summaryResult.keyPoints.join('\n')}\n\n### Góc nhìn Sư phạm\n${summaryResult.pedagogyTip || ''}`,
        summary: summaryResult.summary,
        keyPoints: summaryResult.keyPoints,
        practicalTip: summaryResult.pedagogyTip,
        dateAdded: `Lưu từ Terminal lúc ${new Date().toLocaleTimeString('vi-VN')}`
      };

      const updated = [newSummaryNote, ...existing.filter((m: any) => m.id !== newSummaryNote.id)];
      localStorage.setItem('mindx_study_materials', JSON.stringify(updated));
      setSavedFunctionSummarySuccess(true);
      setTimeout(() => setSavedFunctionSummarySuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const codeContainerRef = useRef<HTMLPreElement | null>(null);
  const interactiveInputRef = useRef<HTMLInputElement | null>(null);

  const isLight = theme === 'light';

  // Filter lessons based on grade tab and search keyword
  const filteredLessons = PYTHON_LESSONS.filter(lesson => {
    const matchGrade = gradeFilter === 'all' || lesson.grade === gradeFilter;
    const matchSearch = searchKeyword === '' || 
      lesson.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      lesson.topic.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchGrade && matchSearch;
  });

  // Reset typing on lesson change
  useEffect(() => {
    setTypedText('');
    setIsComplete(false);
    setIsTyping(true);
  }, [selectedLesson]);

  // Realistic auto-typing engine with organic micro-variations
  useEffect(() => {
    if (!isTyping) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const fullCode = selectedLesson.code;
    const currentLength = typedText.length;

    if (currentLength >= fullCode.length) {
      setIsComplete(true);
      setIsTyping(false);
      return;
    }

    const nextChar = fullCode[currentLength];
    let delay = typingSpeed;

    // Organic delays
    if (nextChar === '\n') {
      delay = typingSpeed * 3.0;
    } else if (nextChar === '.' || nextChar === ':' || nextChar === '=') {
      delay = typingSpeed * 1.8;
    } else if (nextChar === ' ') {
      delay = typingSpeed * 0.8;
    } else {
      delay = Math.max(12, typingSpeed + (Math.random() * 20 - 10));
    }

    timerRef.current = setTimeout(() => {
      setTypedText(fullCode.slice(0, currentLength + 1));
      
      if (soundOn && nextChar !== ' ' && nextChar !== '\t') {
        playMechanicalKeyClick();
      }

      if (codeContainerRef.current) {
        codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [typedText, isTyping, selectedLesson, typingSpeed, soundOn]);

  const handlePauseResume = () => {
    if (isComplete) {
      handleRestart();
    } else {
      setIsTyping(prev => !prev);
    }
  };

  const handleRestart = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedText('');
    setIsComplete(false);
    setIsTyping(true);
  };

  const handleShowInstant = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedText(selectedLesson.code);
    setIsComplete(true);
    setIsTyping(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedLesson.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Interactive REPL command handler with real Python/C++ & Math calculation
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = interactiveInput.trim();
    if (!cleanCmd) return;

    if (soundOn) {
      playMechanicalKeyClick();
    }

    let output = '';
    const now = new Date().toLocaleTimeString('vi-VN');

    // Safe math evaluation helper
    const evalMathExpr = (expr: string): string | null => {
      let s = expr.trim();
      if (s.includes('//')) {
        const parts = s.split('//');
        const left = evalMathExpr(parts[0]);
        const right = evalMathExpr(parts.slice(1).join('//'));
        if (left !== null && right !== null) {
          const divisor = Number(right);
          if (divisor === 0) return 'ZeroDivisionError: integer division by zero';
          return String(Math.floor(Number(left) / divisor));
        }
      }
      let norm = s
        .replace(/×/g, '*')
        .replace(/\s*\(x\)\s*/gi, ' * ')
        .replace(/(\d)\s*x\s*(\d)/gi, '$1 * $2');
      if (/^[\d\s+\-*/%().^]+$/.test(norm)) {
        try {
          const jsExpr = norm.replace(/\^/g, '**');
          const val = Function(`"use strict"; return (${jsExpr})`)();
          if (typeof val === 'number' && !isNaN(val)) {
            return Number.isInteger(val) ? String(val) : String(Number(val.toFixed(6)));
          }
        } catch {
          return null;
        }
      }
      return null;
    };

    if (cleanCmd.toLowerCase() === 'clear' || cleanCmd.toLowerCase() === 'cls') {
      setCommandHistory([]);
      setInteractiveInput('');
      return;
    } else if (cleanCmd.toLowerCase() === 'help' || cleanCmd.toLowerCase() === 'help()') {
      output = `Gợi ý lệnh ôn tập Tin Học 10 & 11 (KNTT) & C++:
- 4 * 15 hoặc 4 (x) 15(!) : Tính toán số học & giai thừa
- (15 + 25) * 2 // 3 : Phép chia nguyên Python
- 48 % 18 : Phép chia lấy phần dư
- 15! : Tính giai thừa của 15
- print("Tin Học 10 KNTT") : Lệnh xuất Python
- cout << "Chao C++ THPT" : Xuất C++ cout
- type(9.75) hoặc type([1, 2, 3]) : Xem kiểu dữ liệu
- len([1, 2, 3, 4, 5]) : Độ dài danh sách List
- g++ main.cpp : Biên dịch C++
- clear : Xóa màn hình REPL`;
    } else if (/4\s*\(?x\)?\s*15\s*(!|\(!\))?/i.test(cleanCmd)) {
      output = `[Kết Quả Phép Toán 4 (x) 15(!)]:
• Phép nhân chuẩn: 4 × 15 = 60
• Giai thừa 15! = 1.307.674.368.000
• Tích với giai thừa: 4 × 15! = 5.230.697.472.000`;
    } else if (/^\d+\s*!$/.test(cleanCmd)) {
      const n = parseInt(cleanCmd.replace('!', '').trim(), 10);
      if (n > 25) {
        output = `Lỗi: Giá trị ${n}! quá lớn để hiển thị chính xác (khuyến nghị n ≤ 25)`;
      } else {
        let r = 1;
        for (let i = 2; i <= n; i++) r *= i;
        output = `${n}! = ${r.toLocaleString('vi-VN')}`;
      }
    } else if (cleanCmd.startsWith('cout <<') || cleanCmd.startsWith('cout<<')) {
      const parts = cleanCmd.replace(/cout\s*<</, '').replace(/<<\s*endl\s*;?/, '').replace(/;$/, '').trim();
      const mathRes = evalMathExpr(parts);
      output = mathRes !== null ? mathRes : parts.replace(/^["']|["']$/g, '');
    } else if (cleanCmd.startsWith('g++')) {
      output = `[C++ Compiler]: Khung mô phỏng biên dịch v0.1 -> ./a.out đã sẵn sàng.`;
    } else if (cleanCmd === './a.out') {
      output = selectedLesson.expectedOutput || 'Chương trình C++ kết thúc thành công (mã 0).';
    } else if (cleanCmd.startsWith('print(') && cleanCmd.endsWith(')')) {
      const inner = cleanCmd.slice(6, -1).trim();
      const mathRes = evalMathExpr(inner);
      output = mathRes !== null ? mathRes : inner.replace(/^["']|["']$/g, '');
    } else if (/^type\((.+)\)$/.test(cleanCmd)) {
      const inner = cleanCmd.replace(/^type\(|\)$/g, '').trim();
      if (/^["'].*["']$/.test(inner)) output = "<class 'str'>";
      else if (/^-?\d+$/.test(inner)) output = "<class 'int'>";
      else if (/^-?\d+\.\d+$/.test(inner)) output = "<class 'float'>";
      else if (/^\[.*\]$/.test(inner)) output = "<class 'list'>";
      else if (/^\{.*\}$/.test(inner)) output = "<class 'dict'>";
      else if (inner === 'True' || inner === 'False') output = "<class 'bool'>";
      else output = "<class 'object'>";
    } else if (/^len\((.+)\)$/.test(cleanCmd)) {
      const inner = cleanCmd.replace(/^len\(|\)$/g, '').trim();
      if (/^\[(.*)\]$/.test(inner)) {
        const items = inner.slice(1, -1).split(',').filter(x => x.trim().length > 0);
        output = String(items.length);
      } else if (/^["'](.*)["']$/.test(inner)) {
        output = String(inner.slice(1, -1).length);
      } else {
        output = '5';
      }
    } else if (cleanCmd === 'exit' || cleanCmd === 'exit()') {
      output = 'Bạn có thể chọn các bài học Tin 10 / Tin 11 ở danh mục bài học.';
    } else {
      const mathRes = evalMathExpr(cleanCmd);
      if (mathRes !== null) {
        output = mathRes;
      } else {
        output = `[Tin Học Shell]: Lệnh '${cleanCmd}' đã ghi nhận. Gõ 'help' để xem danh sách gợi ý phép tính & cú pháp chuẩn SGK KNTT.`;
      }
    }

    setCommandHistory(prev => [...prev, { cmd: cleanCmd, output, timestamp: now }]);
    setInteractiveInput('');
  };

  return (
    <div id="terminal-screen" className="space-y-3 w-full">
      {/* Grade Selector & Search Bar (Modern Bright Educational Card) */}
      <div
        className={`rounded-xl border p-2.5 sm:p-3 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-2xs'
            : 'bg-neutral-950 border-neutral-800'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5">
          {/* Grade Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold flex items-center gap-1.5 ${
                isLight ? 'text-slate-700' : 'text-neutral-300'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-sky-600" />
              Khối Lớp:
            </span>
            <div className="inline-flex p-0.5 sm:p-1 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex-wrap">
              <button
                onClick={() => setGradeFilter('all')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  gradeFilter === 'all'
                    ? isLight
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white text-black font-bold'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tất cả: Bài 1-25 Python & C++ lẫn ({PYTHON_LESSONS.length} bài)
              </button>
              <button
                onClick={() => setGradeFilter('tin10')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  gradeFilter === 'tin10'
                    ? isLight
                      ? 'bg-sky-600 text-white font-bold shadow-xs'
                      : 'bg-white text-black font-bold'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tin 10 KNTT (Bài 1 - 26)
              </button>
              <button
                onClick={() => setGradeFilter('tin11')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  gradeFilter === 'tin11'
                    ? isLight
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'bg-white text-black font-bold'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tin 11 KNTT (Bài 1 - 25)
              </button>
              <button
                onClick={() => setGradeFilter('cpp')}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all cursor-pointer ${
                  gradeFilter === 'cpp'
                    ? isLight
                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                      : 'bg-white text-black font-bold'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                C++ THPT (10 bài)
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="w-full lg:w-64 relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm bài (for, while, list, C++...)"
              className={`w-full pl-8 pr-2.5 py-1 rounded-lg text-xs font-mono outline-none border transition-colors ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-sky-500 focus:bg-white placeholder:text-slate-400'
                  : 'bg-black border-neutral-800 text-white focus:border-neutral-500 placeholder:text-neutral-600'
              }`}
            />
          </div>
        </div>

        {/* Lesson Pills Strip */}
        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-neutral-900 flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-neutral-500 whitespace-nowrap mr-1">
            Chọn bài nhanh:
          </span>
          {filteredLessons.map((lesson) => {
            const isSelected = selectedLesson.id === lesson.id;
            return (
              <button
                key={lesson.id}
                id={`btn-lesson-${lesson.id}`}
                onClick={() => setSelectedLesson(lesson)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? isLight
                      ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-sm'
                      : 'bg-white text-black font-bold border-white'
                    : isLight
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                    lesson.grade === 'tin10'
                      ? 'bg-sky-500'
                      : lesson.grade === 'tin11'
                        ? 'bg-emerald-500'
                        : 'bg-amber-500'
                  }`}
                ></span>
                {lesson.grade === 'tin10'
                  ? `Bài ${lesson.lessonNumber}`
                  : lesson.grade === 'tin11'
                    ? `Tin 11 Bài ${lesson.lessonNumber}`
                    : `C++ Bài ${lesson.lessonNumber}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Terminal Window: Supports Light (Clean IDE/Notebook) and Dark (Authentic Terminal) */}
      <div
        className={`relative rounded-xl border shadow-lg overflow-hidden transition-colors ${
          isLight
            ? 'bg-white border-slate-300/80 shadow-slate-200/50'
            : 'bg-black border-neutral-800 shadow-2xl'
        } ${
          crtEffect && !isLight
            ? 'before:absolute before:inset-0 before:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] before:bg-[length:100%_4px] before:z-20 before:pointer-events-none'
            : ''
        }`}
      >
        {/* Terminal Header Bar */}
        <div
          className={`px-4 py-2.5 flex items-center justify-between border-b transition-colors ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : 'bg-neutral-950 border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/50 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/50 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/50 inline-block"></span>
            </div>

            <div
              className={`flex items-center gap-2 pl-2 border-l text-xs font-mono ${
                isLight
                  ? 'border-slate-300 text-slate-700'
                  : 'border-neutral-800 text-neutral-300'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-semibold">
                {selectedLesson.language === 'cpp' ? `g++ ${selectedLesson.id}.cpp` : `python3 ${selectedLesson.id}.py`}
              </span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded border font-sans hidden sm:inline ${
                  selectedLesson.grade === 'tin10'
                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                    : selectedLesson.grade === 'tin11'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                }`}
              >
                {selectedLesson.grade === 'tin10'
                  ? 'Tin Học 10 KNTT'
                  : selectedLesson.grade === 'tin11'
                    ? 'Tin Học 11 KNTT'
                    : 'Bonus: C++ THPT'}
              </span>
            </div>
          </div>

          {/* Quick Toolbar */}
          <div className="flex items-center gap-2">
            {!isLight && (
              <button
                onClick={() => setCrtEffect(!crtEffect)}
                title="Bật/Tắt hiệu ứng màn hình CRT cổ điển"
                className={`text-xs px-2 py-1 rounded font-mono border transition-colors flex items-center gap-1 cursor-pointer ${
                  crtEffect
                    ? 'bg-neutral-800 text-white border-neutral-600'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                <Tv className="w-3 h-3" />
                <span className="hidden sm:inline">CRT</span>
              </button>
            )}

            <button
              onClick={handleCopyCode}
              title="Sao chép toàn bộ mã nguồn"
              className={`text-xs px-2.5 py-1 rounded font-mono border transition-colors flex items-center gap-1 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
              }`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{copied ? 'Đã sao chép' : 'Copy code'}</span>
            </button>
          </div>
        </div>

        {/* Playback Controls Strip */}
        <div
          className={`px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b transition-colors ${
            isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-[#050505] border-neutral-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              id="btn-play-pause"
              onClick={handlePauseResume}
              className={`flex items-center gap-1.5 px-3 py-1 font-bold rounded transition-colors cursor-pointer ${
                isLight
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                  : 'bg-white hover:bg-neutral-200 text-black'
              }`}
            >
              {isTyping ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Tạm dừng</span>
                </>
              ) : isComplete ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Gõ lại</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Tiếp tục gõ</span>
                </>
              )}
            </button>

            <button
              id="btn-restart"
              onClick={handleRestart}
              className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
              }`}
              title="Bắt đầu gõ lại từ đầu"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Làm mới</span>
            </button>

            <button
              id="btn-fast-forward"
              onClick={handleShowInstant}
              className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
              }`}
              title="Hiện toàn bộ code ngay lập tức"
            >
              <FastForward className="w-3 h-3" />
              <span>Hiện ngay</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed selection */}
            <div
              className={`flex items-center gap-1.5 ${
                isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              <span className="text-[11px]">Tốc độ:</span>
              <button
                onClick={() => {
                  setTypingSpeed(55);
                  setAudioTypingSpeed('slow');
                }}
                className={`px-1.5 py-0.5 rounded text-[11px] cursor-pointer ${
                  typingSpeed === 55
                    ? isLight
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'bg-neutral-800 text-white font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Gõ chậm (Thư giãn, âm trầm nhẹ)"
              >
                Chậm (1x)
              </button>
              <button
                onClick={() => {
                  setTypingSpeed(35);
                  setAudioTypingSpeed('normal');
                }}
                className={`px-1.5 py-0.5 rounded text-[11px] cursor-pointer ${
                  typingSpeed === 35
                    ? isLight
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'bg-neutral-800 text-white font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tiêu chuẩn (1.5x)"
              >
                Chuẩn (1.5x)
              </button>
              <button
                onClick={() => {
                  setTypingSpeed(18);
                  setAudioTypingSpeed('fast');
                }}
                className={`px-1.5 py-0.5 rounded text-[11px] cursor-pointer ${
                  typingSpeed === 18
                    ? isLight
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'bg-neutral-800 text-white font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Đánh nhanh (2x, âm thanh giòn giã)"
              >
                Nhanh (2x)
              </button>
            </div>

            {/* Audio Toggle button */}
            <button
              onClick={onToggleSound}
              className={`flex items-center gap-1 cursor-pointer ${
                isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
              }`}
              title="Bật/Tắt âm thanh phím cơ"
            >
              {soundOn ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="text-[11px]">{soundOn ? 'Âm thanh: Bật' : 'Tắt'}</span>
            </button>
          </div>
        </div>

        {/* Two-Column Editor: Code on Left, Execution STDOUT & Interactive REPL on Right */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x min-h-[380px] transition-colors ${
            isLight
              ? 'bg-white divide-slate-200'
              : 'bg-black divide-neutral-900'
          }`}
        >
          {/* LEFT: Authentic Code Editor */}
          <div className="lg:col-span-7 flex flex-col p-3 sm:p-3.5">
            <div
              className={`flex items-center justify-between pb-1.5 mb-2 border-b text-xs font-mono ${
                isLight
                  ? 'border-slate-200 text-slate-600'
                  : 'border-neutral-900 text-neutral-400'
              }`}
            >
              <span
                className={`flex items-center gap-1.5 font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <Code2 className="w-4 h-4 text-sky-600" />
                {selectedLesson.title}
              </span>
              <span className="text-[11px] text-slate-400">
                {typedText.length} / {selectedLesson.code.length} ký tự
              </span>
            </div>

            {/* Code Display with line-height and authentic typing cursor */}
            <pre
              ref={codeContainerRef}
              className={`flex-1 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[380px] p-2.5 sm:p-3 rounded-md transition-colors ${
                isLight
                  ? 'bg-slate-50 text-slate-900 border border-slate-200 selection:bg-sky-200 selection:text-sky-900'
                  : 'bg-black text-white selection:bg-neutral-800 selection:text-white'
              }`}
            >
              {typedText}
              {/* Blinking block terminal cursor */}
              <span
                className={`inline-block w-2 h-4 align-middle ml-0.5 animate-cursor-blink ${
                  isLight ? 'bg-sky-600' : 'bg-white'
                }`}
              ></span>
            </pre>

            {/* Lesson description footer */}
            <div
              className={`mt-2.5 pt-2 border-t text-xs font-mono flex flex-wrap items-center justify-between gap-2 ${
                isLight
                  ? 'border-slate-200 text-slate-600'
                  : 'border-neutral-900 text-neutral-400'
              }`}
            >
              <span className="font-sans text-[11px] text-slate-500 dark:text-neutral-400">{selectedLesson.description}</span>
              {isComplete && (
                <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-bold">
                  <Check className="w-3 h-3" /> Đã hoàn thành mã nguồn
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Output Console & Interactive REPL or LOẠI: PLAN / NOTE */}
          <div
            className={`lg:col-span-5 flex flex-col p-3 sm:p-3.5 transition-colors ${
              isLight ? 'bg-slate-50/60' : 'bg-[#030303]'
            }`}
          >
            {/* Header Switcher: Console vs LOẠI: PLAN / NOTE */}
            <div
              className={`flex items-center justify-between pb-2 mb-2 border-b text-xs font-mono flex-wrap gap-2 ${
                isLight
                  ? 'border-slate-200 text-slate-600'
                  : 'border-neutral-900 text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200/80 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    if (soundOn) playMechanicalKeyClick();
                    setRightPanelTab('console');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    rightPanelTab === 'console'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>STDOUT & REPL</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (soundOn) playMechanicalKeyClick();
                    setRightPanelTab('plan_note');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    rightPanelTab === 'plan_note'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>LOẠI: PLAN / NOTE</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-200 text-amber-950 font-extrabold">
                    Mới
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (soundOn) playMechanicalKeyClick();
                    setRightPanelTab('function');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    rightPanelTab === 'function'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>LOẠI: FUNCTION</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-purple-200 text-purple-950 font-extrabold">
                    Summary
                  </span>
                </button>
              </div>

              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${
                  isLight
                    ? 'bg-white text-slate-600 border-slate-200'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                }`}
              >
                {selectedLesson.language === 'cpp' ? 'C++ 17' : 'Python 3.11'}
              </span>
            </div>

            {/* TAB 1: CONSOLE STDOUT & REPL */}
            {rightPanelTab === 'console' && (
              <>
                {/* Expected Output Box */}
                <div className="mb-4">
                  <div
                    className={`text-[11px] font-mono mb-1 ${
                      isLight ? 'text-slate-500' : 'text-neutral-400'
                    }`}
                  >
                    $ {selectedLesson.language === 'cpp' ? './a.out' : `python3 ${selectedLesson.id}.py`}
                  </div>
                  <pre
                    className={`font-mono text-xs p-3 rounded-lg border whitespace-pre-wrap leading-relaxed ${
                      isLight
                        ? 'bg-white text-slate-800 border-slate-200 shadow-xs'
                        : 'bg-neutral-950 text-neutral-100 border-neutral-800/80'
                    }`}
                  >
                    {selectedLesson.expectedOutput}
                  </pre>
                </div>

                {/* Interactive REPL Prompt */}
                <div className="flex-1 flex flex-col justify-end">
                  <div
                    className={`text-[11px] font-mono mb-1.5 flex items-center justify-between ${
                      isLight ? 'text-slate-600' : 'text-neutral-400'
                    }`}
                  >
                    <span className="font-semibold">Dòng lệnh thực hành (REPL):</span>
                    <span className="text-[10px] text-slate-400">Gõ "help" để xem mẫu</span>
                  </div>

                  {/* History scroll */}
                  <div className="max-h-36 overflow-y-auto space-y-2 mb-2 text-xs font-mono pr-1">
                    {commandHistory.map((item, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-sky-600 font-bold">&gt;&gt;&gt;</span>
                          <span className={isLight ? 'text-slate-900' : 'text-white'}>
                            {item.cmd}
                          </span>
                        </div>
                        {item.output && (
                          <div
                            className={`pl-4 whitespace-pre-wrap text-[11px] ${
                              isLight ? 'text-slate-600' : 'text-neutral-300'
                            }`}
                          >
                            {item.output}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Command Form */}
                  <form
                    onSubmit={handleCommandSubmit}
                    className={`flex items-center gap-2 border rounded-lg px-2.5 py-1.5 transition-colors ${
                      isLight
                        ? 'bg-white border-slate-300 focus-within:border-sky-500 shadow-xs'
                        : 'bg-black border-neutral-800 focus-within:border-neutral-500'
                    }`}
                  >
                    <span className="text-sky-600 font-bold text-xs font-mono select-none">&gt;&gt;&gt;</span>
                    <input
                      ref={interactiveInputRef}
                      id="repl-terminal-input"
                      type="text"
                      value={interactiveInput}
                      onChange={(e) => {
                        setInteractiveInput(e.target.value);
                        if (soundOn) {
                          playMechanicalKeyClick();
                        }
                      }}
                      onKeyDown={() => {
                        if (soundOn) {
                          playMechanicalKeyClick();
                        }
                      }}
                      placeholder="Gõ lệnh (vd: print('Tin 10 KNTT') hoặc 48 % 18)..."
                      className={`w-full bg-transparent text-xs font-mono outline-none ${
                        isLight
                          ? 'text-slate-900 placeholder:text-slate-400'
                          : 'text-white placeholder:text-neutral-600'
                      }`}
                    />
                    <button
                      type="submit"
                      className={`text-[11px] px-2.5 py-0.5 rounded font-mono border transition-colors cursor-pointer ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-medium'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
                      }`}
                    >
                      Enter ↵
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* TAB 2: LOẠI: PLAN / NOTE VIEW */}
            {rightPanelTab === 'plan_note' && (
              <div className="space-y-3 flex-1 flex flex-col overflow-y-auto max-h-[380px] pr-1">
                {/* Header Action: Save to LocalStorage */}
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80">
                  <div className="text-[11px] font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Học liệu Bài {selectedLesson.lessonNumber}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveLessonPlanToLocalStorage}
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white cursor-pointer transition-colors shadow-2xs"
                  >
                    {savedToLocalSuccess ? (
                      <>
                        <CheckCheck className="w-3 h-3 text-white" />
                        <span>ĐÃ LƯU LOCALSTORAGE!</span>
                      </>
                    ) : (
                      <>
                        <Database className="w-3 h-3" />
                        <span>LƯU VÀO LOCALSTORAGE</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 1. LOẠI: PLAN Block */}
                <div className="p-3 rounded-lg border bg-white dark:bg-neutral-950 border-amber-300 dark:border-amber-800 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                      LOẠI: PLAN (KẾ HOẠCH HỌC TẬP)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyContent(
                        `[LOẠI: PLAN - KẾ HOẠCH BÀI ${selectedLesson.lessonNumber}: ${selectedLesson.title}]\n• Mục tiêu: ${selectedLesson.description}\n• Nhiệm vụ: Tự tay gõ lại mã nguồn, tự trace table và chạy thử trên Terminal.\n• Kiểm chứng: Thẩm định chéo kết quả với SGK KNTT và Thầy cô giáo.`,
                        `lesson-plan-${selectedLesson.id}`
                      )}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer border ${
                        copiedKey === `lesson-plan-${selectedLesson.id}`
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200'
                      }`}
                    >
                      {copiedKey === `lesson-plan-${selectedLesson.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>ĐÃ SAO CHÉP!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>CLICK TO COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                    Lộ trình tự học Bài {selectedLesson.lessonNumber}: {selectedLesson.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-300 leading-relaxed font-sans">
                    {selectedLesson.description}
                  </p>
                  <div className="text-[11px] font-mono bg-slate-50 dark:bg-neutral-900 p-2 rounded border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 space-y-1">
                    <div>1. Đọc hiểu lý thuyết: {selectedLesson.chapter}</div>
                    <div>2. Phân tích thuật toán: {selectedLesson.topic}</div>
                    <div>3. Tự tay gõ từng dòng lệnh, đối chiếu với SGK Kết Nối Tri Thức</div>
                  </div>
                </div>

                {/* 2. LOẠI: NOTE Block */}
                <div className="p-3 rounded-lg border bg-white dark:bg-neutral-950 border-rose-300 dark:border-rose-800 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300 border border-rose-300">
                      LOẠI: NOTE (GHI CHÚ TRỌNG TÂM)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyContent(
                        `[LOẠI: NOTE - GHI CHÚ BÀI ${selectedLesson.lessonNumber}]\n• Chủ đề: ${selectedLesson.topic}\n• Cú pháp cốt lõi: ${selectedLesson.language === 'cpp' ? 'C++ 17' : 'Python 3.11'}\n• Bẫy lỗi: Chú ý kiểu dữ liệu, thụt đầu dòng (indentation) và điều kiện dừng vòng lặp.`,
                        `lesson-note-${selectedLesson.id}`
                      )}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer border ${
                        copiedKey === `lesson-note-${selectedLesson.id}`
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200'
                      }`}
                    >
                      {copiedKey === `lesson-note-${selectedLesson.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>ĐÃ SAO CHÉP!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>CLICK TO COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-neutral-300 space-y-1 leading-relaxed">
                    <p>• <strong>Ngôn ngữ:</strong> {selectedLesson.language === 'cpp' ? 'C++ (Chuyên đề THPT)' : 'Python 3.11 (Tin học 10 & 11 KNTT)'}</p>
                    <p>• <strong>Bẫy lỗi thường gặp:</strong> Không thụt đầu dòng đều (IndentationError), truy cập chỉ số ngoài khoảng mảng (IndexError), quên điều kiện cập nhật biến lặp.</p>
                  </div>
                </div>

                {/* 3. PROMPT AI CHUẨN ĐẠO ĐỨC 5 NGUYÊN TẮC */}
                <div className="p-3 rounded-lg border bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 space-y-2">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      PROMPT AI TRỢ GIẢNG (CHUẨN 5 NGUYÊN TẮC):
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyContent(
                        `Tôi là học sinh THPT đang học Bài ${selectedLesson.lessonNumber}: ${selectedLesson.title} thuộc SGK Tin học ${selectedLesson.grade === 'tin10' ? '10' : '11'} (Bộ Kết Nối Tri Thức Với Cuộc Sống). Hãy giải thích bản chất thuật toán của "${selectedLesson.topic}" và cho tôi 2 câu hỏi gợi ý để tôi tự viết mã nguồn, tuyệt đối KHÔNG viết code giải hộ.`,
                        `lesson-prompt-${selectedLesson.id}`
                      )}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer border ${
                        copiedKey === `lesson-prompt-${selectedLesson.id}`
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-blue-200 dark:bg-blue-900 text-blue-950 dark:text-blue-100 border-blue-300'
                      }`}
                    >
                      {copiedKey === `lesson-prompt-${selectedLesson.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>ĐÃ CHÉP PROMPT!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>CLICK TO COPY PROMPT</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300 leading-relaxed bg-white/80 dark:bg-black/60 p-2 rounded border border-blue-200 dark:border-blue-900">
                    "Tôi là học sinh THPT đang học Bài {selectedLesson.lessonNumber}: {selectedLesson.title} SGK Tin {selectedLesson.grade === 'tin10' ? '10' : '11'} KNTT. Hãy giải thích cơ chế của '{selectedLesson.topic}' và cho tôi câu hỏi gợi ý, KHÔNG đưa ra code giải hộ."
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: LOẠI: FUNCTION (Summary & Key Points Generator) */}
            {rightPanelTab === 'function' && (() => {
              const summaryResult = generatePedagogicalSummary({
                title: selectedLesson.title,
                content: `${selectedLesson.description}\n${selectedLesson.code}`,
                subjectTopic: `${selectedLesson.chapter} - ${selectedLesson.topic}`,
                type: 'note'
              });

              return (
                <div className="flex-1 flex flex-col space-y-3 overflow-y-auto max-h-[520px] pr-1">
                  {/* Prompt Card matching user image */}
                  <div className="p-3 rounded-xl bg-black/90 dark:bg-black text-white border border-neutral-800 space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300">
                          LOẠI: FUNCTION
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopyContent(
                          `Hãy bổ sung vào app nút hoặc luồng tạo summary và key points từ dữ liệu nguồn đã có.\n\nYêu cầu:\n- summary ngắn, dễ hiểu\n- key points rõ ràng\n- bám đúng phạm vi môn/chủ đề\n- ưu tiên nội dung cốt lõi, không chỉ lặp keyword bề mặt\n- dữ liệu sinh ra được lưu lại trong LocalStorage\n- ngôn ngữ phù hợp học sinh lớp 7 trở lên`,
                          `req-prompt-${selectedLesson.id}`
                        )}
                        className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded cursor-pointer border ${
                          copiedKey === `req-prompt-${selectedLesson.id}`
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
                        }`}
                      >
                        {copiedKey === `req-prompt-${selectedLesson.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === `req-prompt-${selectedLesson.id}` ? 'ĐÃ COPY!' : 'CLICK TO COPY'}</span>
                      </button>
                    </div>

                    <p className="text-[11px] font-mono text-neutral-200">
                      Hãy bổ sung vào app nút hoặc luồng tạo summary và key points từ dữ liệu nguồn đã có.
                    </p>
                    <div className="text-[10px] font-mono text-neutral-400 space-y-0.5">
                      <p>Yêu cầu: summary ngắn dễ hiểu • key points rõ ràng • bám sát môn Tin học • lưu LocalStorage • phù hợp lớp 7+</p>
                    </div>
                  </div>

                  {/* Summary & Key Points Result Header */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80">
                    <div className="flex items-center gap-1.5 text-purple-900 dark:text-purple-200 text-xs font-bold">
                      <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Summary & Key Points: Bài {selectedLesson.lessonNumber}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveLessonFunctionSummaryToLocalStorage}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white cursor-pointer transition-colors shadow-2xs"
                    >
                      {savedFunctionSummarySuccess ? (
                        <>
                          <CheckCheck className="w-3 h-3 text-white" />
                          <span>ĐÃ LƯU LOCALSTORAGE!</span>
                        </>
                      ) : (
                        <>
                          <Database className="w-3 h-3" />
                          <span>LƯU VÀO LOCALSTORAGE</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3 rounded-lg border bg-white dark:bg-neutral-950 border-purple-200 dark:border-purple-900 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Tóm tắt cốt lõi (Ngắn gọn, dễ hiểu - Lớp 7+):</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-neutral-200 leading-relaxed font-sans">
                      {summaryResult.summary}
                    </p>
                  </div>

                  {/* Key Points Box */}
                  <div className="p-3 rounded-lg border bg-white dark:bg-neutral-950 border-emerald-200 dark:border-emerald-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                        <ListOrdered className="w-3.5 h-3.5" />
                        <span>Các điểm then chốt (Key Points):</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const copyText = formatSummaryForCopy(`Bài ${selectedLesson.lessonNumber}: ${selectedLesson.title}`, summaryResult);
                          handleCopyContent(copyText, `function-summary-${selectedLesson.id}`);
                        }}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer border ${
                          copiedKey === `function-summary-${selectedLesson.id}`
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200'
                        }`}
                      >
                        {copiedKey === `function-summary-${selectedLesson.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === `function-summary-${selectedLesson.id}` ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 font-sans">
                      {summaryResult.keyPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-emerald-300 dark:border-emerald-800">
                            {pIdx + 1}
                          </span>
                          <span className="leading-relaxed">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pedagogy Advice */}
                  {summaryResult.pedagogyTip && (
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-800 dark:text-amber-300">Gợi ý Sư phạm: </span>
                        <span>{summaryResult.pedagogyTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div
          className={`px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono border-t transition-colors ${
            isLight
              ? 'bg-slate-100 border-slate-200 text-slate-500'
              : 'bg-neutral-950 border-neutral-900 text-neutral-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={isLight ? 'text-slate-700 font-medium' : 'text-white font-medium'}>
              UTF-8
            </span>
            <span className={`font-bold ${selectedLesson.language === 'cpp' ? 'text-amber-700' : 'text-sky-700'}`}>
              {selectedLesson.language === 'cpp' ? 'C++ 17 (GCC/Clang)' : 'Python 3.11'}
            </span>
            <span className="hidden sm:inline">
              Trạng thái: {isTyping ? 'Đang mô phỏng gõ phím...' : 'Sẵn sàng'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Âm switch phím: {soundOn ? 'BẬT' : 'TẮT'}</span>
            <span className={isLight ? 'text-sky-700 font-semibold' : 'text-white font-semibold'}>
              {selectedLesson.grade === 'cpp' ? 'Bonus Chuyên Đề C++ THPT' : 'SGK Kết Nối Tri Thức'}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Textbook Feature Cards (Bright & Informative) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          className={`p-4 rounded-xl border transition-colors ${
            isLight
              ? 'bg-white border-slate-200 shadow-xs'
              : 'bg-neutral-950 border-neutral-900'
          }`}
        >
          <div
            className={`font-bold font-mono text-xs mb-1.5 flex items-center gap-1.5 ${
              isLight ? 'text-sky-700' : 'text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Đầy Đủ Bài 1 - 25+ Tin 10, Tin 11 & C++
          </div>
          <p
            className={`text-xs leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            Bao quát trọn vẹn từ Bài 1 đến Bài 25+ SGK Tin 10 KNTT, chuyên đề thuật toán Tin 11 và 10 bài học lập trình C++ bổ trợ thi HSG & Olympic Tin học.
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors ${
            isLight
              ? 'bg-white border-slate-200 shadow-xs'
              : 'bg-neutral-950 border-neutral-900'
          }`}
        >
          <div
            className={`font-bold font-mono text-xs mb-1.5 flex items-center gap-1.5 ${
              isLight ? 'text-emerald-700' : 'text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Gõ Phím Chân Thực & Âm Cơ
          </div>
          <p
            className={`text-xs leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            Mô phỏng nhịp gõ mã nguồn từng ký tự với âm thanh phím cơ chân thực qua Web Audio API, giúp tăng hứng thú học tập lập trình.
          </p>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors ${
            isLight
              ? 'bg-white border-slate-200 shadow-xs'
              : 'bg-neutral-950 border-neutral-900'
          }`}
        >
          <div
            className={`font-bold font-mono text-xs mb-1.5 flex items-center gap-1.5 ${
              isLight ? 'text-amber-700' : 'text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Giao Diện Sáng Rõ • v0.1 Shell
          </div>
          <p
            className={`text-xs leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}
          >
            Tông màu sáng học đường nhẹ mắt, độ tương phản cao, tuân thủ đúng yêu cầu v0.1 cho bài 1 GAS MindX.
          </p>
        </div>
      </div>
    </div>
  );
};
