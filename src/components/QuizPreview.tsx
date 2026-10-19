import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, Clock, BookOpen, GraduationCap, Check, Copy, 
  HelpCircle, Sparkles, RotateCcw, Download, Upload, Zap, 
  CheckCircle2, XCircle, ArrowRight, Eye, ChevronDown, ChevronUp,
  FileCheck, ListOrdered, Award, Terminal as TerminalIcon, Plus,
  Trash2, AlertTriangle, Play, Pause, RefreshCw, BarChart2, ShieldAlert
} from 'lucide-react';
import { TerminalTheme, AppLanguage, PracticeQuestion, PracticeQuestionType } from '../types';
import { 
  DEFAULT_PRACTICE_QUESTIONS, 
  loadPracticeQuestionsFromStorage, 
  savePracticeQuestionsToStorage,
  generateCurriculumQuestionSet
} from '../utils/questionEngine';
import { playMechanicalKeyClick } from '../utils/audio';

interface QuizPreviewProps {
  theme?: TerminalTheme;
  language?: AppLanguage;
}

export const QuizPreview: React.FC<QuizPreviewProps> = ({ 
  theme = 'light',
  language = 'vi' 
}) => {
  const isLight = theme === 'light';

  // 1. Questions bank from LocalStorage
  const [questions, setQuestions] = useState<PracticeQuestion[]>(() => {
    return loadPracticeQuestionsFromStorage();
  });

  // 2. Custom Quiz configuration states
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(5);
  const [customTimeMinutes, setCustomTimeMinutes] = useState<number>(5); // default 5 minutes
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(300); // 5 mins in seconds
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [hasStartedQuiz, setHasStartedQuiz] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Time tracking for penalty calculation:
  // overtimeSeconds: how many seconds exceeded past the allotted time limit
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState<number>(0);

  // 3. User answers state (saved per question id independently)
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [revealedShortAnswers, setRevealedShortAnswers] = useState<Record<string, boolean>>({});
  const [blankInputValues, setBlankInputValues] = useState<Record<string, string>>({});

  // 4. Modal / Collapse for creating custom question
  const [showAddQuestionForm, setShowAddQuestionForm] = useState<boolean>(false);
  const [newQType, setNewQType] = useState<PracticeQuestionType>('multiple_choice');
  const [newQGrade, setNewQGrade] = useState<string>('Lớp 10');
  const [newQTopic, setNewQTopic] = useState<string>('Tự tạo bài ôn');
  const [newQText, setNewQText] = useState<string>('');
  const [newQSnippet, setNewQSnippet] = useState<string>('');
  const [newQOptions, setNewQOptions] = useState<string[]>(['', '', '', '']);
  const [newQCorrectOpt, setNewQCorrectOpt] = useState<number>(0);
  const [newQCorrectBool, setNewQCorrectBool] = useState<boolean>(true);
  const [newQCorrectBlank, setNewQCorrectBlank] = useState<string>('');
  const [newQExplanation, setNewQExplanation] = useState<string>('');

  // 5. Generator state
  const [topicInput, setTopicInput] = useState<string>('Vòng lặp for và while trong Python (SGK Tin 10)');
  const [gradeInput, setGradeInput] = useState<string>('Lớp 10');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 6. Filter state
  const [filterType, setFilterType] = useState<PracticeQuestionType | 'all'>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');

  // Auto-save questions to LocalStorage
  useEffect(() => {
    savePracticeQuestionsToStorage(questions);
  }, [questions]);

  // Sync state when a topic snapshot is restored
  useEffect(() => {
    const handleSnapshotRestored = () => {
      setQuestions(loadPracticeQuestionsFromStorage());
      setUserAnswers({});
      setIsSubmitted(false);
      setHasStartedQuiz(false);
      setIsTimerRunning(false);
    };
    window.addEventListener('app:snapshot-restored', handleSnapshotRestored);
    return () => window.removeEventListener('app:snapshot-restored', handleSnapshotRestored);
  }, []);

  // Timer countdown and elapsed tracker
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimeElapsedSeconds(prev => prev + 1);
        setTimerSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isSubmitted]);

  const handleCopyText = (text: string, key: string) => {
    playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Start or restart quiz session
  const handleStartQuiz = () => {
    playMechanicalKeyClick();
    setUserAnswers({});
    setRevealedExplanations({});
    setRevealedShortAnswers({});
    setBlankInputValues({});
    setIsSubmitted(false);
    setTimeElapsedSeconds(0);
    const totalSecs = Math.max(1, customTimeMinutes) * 60;
    setTimerSecondsLeft(totalSecs);
    setIsTimerRunning(true);
    setHasStartedQuiz(true);
    showToast(`Bắt đầu lượt Quiz: ${customQuestionCount} câu, thời gian ${customTimeMinutes} phút!`);
  };

  const handlePauseResumeTimer = () => {
    playMechanicalKeyClick();
    setIsTimerRunning(prev => !prev);
  };

  const handleSubmitQuiz = () => {
    playMechanicalKeyClick();
    setIsTimerRunning(false);
    setIsSubmitted(true);
    // Reveal all explanations upon submission
    const allRevealed: Record<string, boolean> = {};
    activeQuizList.forEach(q => {
      allRevealed[q.id] = true;
    });
    setRevealedExplanations(allRevealed);
    showToast('Đã nộp bài! Kiểm tra điểm số và nhận xét chi tiết bên dưới.');
  };

  // Answer handlers
  const handleAnswerTrueFalse = (qId: string, userChoice: boolean) => {
    playMechanicalKeyClick();
    setUserAnswers(prev => ({ ...prev, [qId]: userChoice }));
    setRevealedExplanations(prev => ({ ...prev, [qId]: true }));
  };

  const handleAnswerMultipleChoice = (qId: string, optionIndex: number) => {
    playMechanicalKeyClick();
    setUserAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    setRevealedExplanations(prev => ({ ...prev, [qId]: true }));
  };

  const handleSubmitBlankAnswer = (q: PracticeQuestion) => {
    playMechanicalKeyClick();
    const val = (blankInputValues[q.id] || '').trim().toLowerCase();
    if (!val) return;

    const isMatch = 
      val === (q.correctBlankAnswer || '').trim().toLowerCase() ||
      (q.acceptableAnswers || []).some(a => a.trim().toLowerCase() === val);

    setUserAnswers(prev => ({ ...prev, [q.id]: isMatch ? 'correct' : 'incorrect' }));
    setRevealedExplanations(prev => ({ ...prev, [q.id]: true }));
  };

  const handleToggleShortAnswer = (qId: string) => {
    playMechanicalKeyClick();
    setRevealedShortAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
    setRevealedExplanations(prev => ({ ...prev, [qId]: true }));
  };

  // Add custom question handler
  const handleSaveCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim()) return;
    playMechanicalKeyClick();

    const created: PracticeQuestion = {
      id: `custom-q-${Date.now()}`,
      type: newQType,
      grade: newQGrade,
      subjectTopic: newQTopic.trim() || 'Câu hỏi tự tạo',
      question: newQText.trim(),
      codeSnippet: newQSnippet.trim() || undefined,
      options: newQType === 'multiple_choice' ? newQOptions.map(o => o.trim()) : undefined,
      correctOptionIndex: newQType === 'multiple_choice' ? newQCorrectOpt : undefined,
      correctBool: newQType === 'true_false' ? newQCorrectBool : undefined,
      correctBlankAnswer: newQType === 'fill_in_blank' ? newQCorrectBlank.trim() : undefined,
      acceptableAnswers: newQType === 'fill_in_blank' ? [newQCorrectBlank.trim().toLowerCase()] : undefined,
      explanation: newQExplanation.trim() || 'Giải thích: Đáp án chuẩn theo kiến thức bộ môn.',
      dateAdded: new Date().toLocaleTimeString('vi-VN')
    };

    setQuestions(prev => [created, ...prev]);
    setShowAddQuestionForm(false);
    // Reset form
    setNewQText('');
    setNewQSnippet('');
    setNewQOptions(['', '', '', '']);
    setNewQExplanation('');
    showToast('Đã thêm thành công câu hỏi tự tạo vào bộ nhớ LocalStorage!');
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    playMechanicalKeyClick();
    setQuestions(prev => prev.filter(q => q.id !== id));
    showToast('Đã xóa câu hỏi khỏi bộ đề.');
  };

  // Reset to default
  const handleResetToDefault = () => {
    playMechanicalKeyClick();
    if (window.confirm('Khôi phục danh sách câu hỏi luyện tập về bộ câu hỏi mẫu chuẩn SGK?')) {
      setQuestions(DEFAULT_PRACTICE_QUESTIONS);
      setUserAnswers({});
      setBlankInputValues({});
      setRevealedExplanations({});
      savePracticeQuestionsToStorage(DEFAULT_PRACTICE_QUESTIONS);
      showToast('Đã khôi phục bộ câu hỏi mẫu!');
    }
  };

  // Filtered master list
  const filteredList = questions.filter(q => {
    if (filterType !== 'all' && q.type !== filterType) return false;
    if (filterGrade !== 'all' && !q.grade.toLowerCase().includes(filterGrade.toLowerCase())) return false;
    return true;
  });

  // The active subset of questions depending on customQuestionCount
  const activeQuizList = filteredList.slice(0, Math.min(customQuestionCount, filteredList.length));
  const totalQuestionsInSet = activeQuizList.length;

  // Calculation of correct answers
  let correctCount = 0;
  activeQuizList.forEach(q => {
    const ans = userAnswers[q.id];
    if (ans !== undefined) {
      if (q.type === 'true_false' && ans === q.correctBool) correctCount++;
      if (q.type === 'multiple_choice' && ans === q.correctOptionIndex) correctCount++;
      if (q.type === 'fill_in_blank' && ans === 'correct') correctCount++;
      if (q.type === 'short_answer' && revealedShortAnswers[q.id]) correctCount++;
    }
  });

  // Base score: (số lượng câu đúng / số lượng câu tổng) * 10
  const rawScore = totalQuestionsInSet > 0 ? (correctCount / totalQuestionsInSet) * 10 : 0;

  // Overtime penalty: Lố 1 phút: -0.5 điểm
  // Overtime in seconds: if timerSecondsLeft < 0, overtimeSeconds = -timerSecondsLeft
  const overtimeSeconds = timerSecondsLeft < 0 ? Math.abs(timerSecondsLeft) : 0;
  const overtimeMinutes = Math.ceil(overtimeSeconds / 60);
  const penaltyPoints = overtimeMinutes * 0.5;

  // Final score rounded to 2 decimal places, minimum 0
  const finalScore = Math.max(0, Math.round((rawScore - penaltyPoints) * 10) / 10);

  // Format timer string MM:SS
  const formatTimer = (seconds: number) => {
    const isNeg = seconds < 0;
    const absSecs = Math.abs(seconds);
    const m = Math.floor(absSecs / 60);
    const s = absSecs % 60;
    const str = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return isNeg ? `-${str}` : str;
  };

  return (
    <div id="quiz-preview-screen" className="space-y-5">
      {/* 1. BUILD HEADER & PROMPT #03 TITLE MATCHING USER IMAGE */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
            Build: Quiz Mode
          </h1>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider">
            FUNCTION
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-rose-500 block tracking-wider">PROMPT</span>
          <span className="text-lg font-black font-mono text-slate-800 dark:text-neutral-100">#03</span>
        </div>
      </div>

      {/* 2. TERMINAL PROMPT CARD [LOẠI: FUNCTION] MATCHING image.png (Prompt #03: Build: Quiz Mode) */}
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
              `Hãy bổ sung chức năng xem kết quả sau mỗi câu hoặc sau mỗi lượt quiz.\n\nYêu cầu:\n- học sinh biết mình đúng hay sai\n- có gợi ý ngắn để ôn lại\n- kết quả cuối phải phản ánh đúng số câu đúng / tổng số câu\n- phù hợp với việc tự học\n- không cần game hóa quá mạnh\n- không thêm phần thưởng/điểm số rườm rà`,
              'prompt-03b-quiz-copy'
            )}
            className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
              copiedKey === 'prompt-03b-quiz-copy'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
            }`}
          >
            {copiedKey === 'prompt-03b-quiz-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'prompt-03b-quiz-copy' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
          </button>
        </div>

        {/* Prompt content verbatim from image.png */}
        <div className="mt-3.5 space-y-3 text-xs sm:text-[13px] leading-relaxed text-neutral-200">
          <p className="font-semibold text-white">
            Hãy bổ sung chức năng xem kết quả sau mỗi câu hoặc sau mỗi lượt quiz.
          </p>
          <div className="space-y-1.5 text-neutral-300 text-xs">
            <p className="text-neutral-400 font-bold">Yêu cầu:</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> học sinh biết mình đúng hay sai</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> có gợi ý ngắn để ôn lại</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> kết quả cuối phải phản ánh đúng số câu đúng / tổng số câu</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> phù hợp với việc tự học</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> không cần game hóa quá mạnh</p>
            <p className="flex items-center gap-2"><span className="text-emerald-400">-</span> không thêm phần thưởng/điểm số rườm rà</p>
          </div>
        </div>

        {/* 3. INTERACTIVE QUIZ CONFIGURATION BAR (TỰ CHỌN SỐ LƯỢNG CÂU & THỜI GIAN LÀM BÀI) */}
        <div className="mt-4 pt-3.5 border-t border-neutral-800 space-y-3 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-end">
            {/* Custom Question Count */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                Tự chọn số lượng câu:
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={1}
                  max={questions.length || 50}
                  value={customQuestionCount}
                  onChange={(e) => setCustomQuestionCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white text-center font-bold outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-xs text-neutral-400">/ {questions.length} câu sẵn có</span>
              </div>
            </div>

            {/* Custom Time in Minutes */}
            <div className="md:col-span-4">
              <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                Tự tạo thời gian làm bài (Phút):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={customTimeMinutes}
                  onChange={(e) => {
                    const m = Math.max(1, parseInt(e.target.value) || 1);
                    setCustomTimeMinutes(m);
                    if (!isTimerRunning) setTimerSecondsLeft(m * 60);
                  }}
                  className="w-20 bg-neutral-900 border border-amber-600/70 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 text-center font-bold outline-none focus:border-amber-400 font-mono"
                />
                <span className="text-xs text-amber-200/80">phút (Lố 1p: -0.5đ)</span>
              </div>
            </div>

            {/* Quiz Control Buttons */}
            <div className="md:col-span-5 flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="w-full px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{hasStartedQuiz ? 'Làm lại lượt mới' : 'Bắt đầu làm bài'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddQuestionForm(prev => !prev)}
                className="w-full px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tạo câu hỏi riêng</span>
              </button>
            </div>
          </div>

          {/* TIMER & LIVE SCOREBOARD */}
          <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between flex-wrap gap-3">
            {/* Real-time countdown timer */}
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timerSecondsLeft < 0 ? 'text-rose-500 animate-pulse' : 'text-amber-400'}`} />
              <span className="text-xs text-neutral-400">Đồng hồ đếm ngược:</span>
              <span className={`text-base font-black font-mono px-2.5 py-0.5 rounded-lg border ${
                timerSecondsLeft < 0
                  ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
                  : 'bg-black text-amber-300 border-neutral-700'
              }`}>
                {formatTimer(timerSecondsLeft)}
              </span>
              {timerSecondsLeft < 0 && (
                <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Đang lố {overtimeMinutes} phút (-{penaltyPoints}đ)
                </span>
              )}
            </div>

            {/* Quick status & submit */}
            <div className="flex items-center gap-2">
              {hasStartedQuiz && !isSubmitted && (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Nộp bài & Tổng kết điểm</span>
                </button>
              )}

              {isSubmitted && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-bold">
                    ✓ Đã hoàn thành (Thang 10)
                  </span>
                  <span className="text-base font-black font-mono px-3 py-1 rounded-lg bg-blue-600 text-white shadow-xs">
                    {finalScore} / 10 Điểm
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FORM TẠO THÊM CÂU HỎI TỰ MÌNH LÀM (CRUD BỀN VỮNG LOCALSTORAGE) */}
      {showAddQuestionForm && (
        <div className={`p-5 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-blue-200 shadow-md' : 'bg-neutral-900 border-neutral-800 text-white'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tạo Thêm Câu Hỏi Của Tự Mình Làm (Được lưu vào kho đề)
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAddQuestionForm(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              Đóng form
            </button>
          </div>

          <form onSubmit={handleSaveCustomQuestion} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Dạng câu hỏi:
                </label>
                <select
                  value={newQType}
                  onChange={(e) => setNewQType(e.target.value as PracticeQuestionType)}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="multiple_choice">Lựa chọn 4 đáp án (A, B, C, D)</option>
                  <option value="true_false">Đúng / Sai</option>
                  <option value="fill_in_blank">Điền từ còn thiếu</option>
                  <option value="short_answer">Hỏi - đáp tự luận ngắn</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Khối lớp:
                </label>
                <input
                  type="text"
                  value={newQGrade}
                  onChange={(e) => setNewQGrade(e.target.value)}
                  placeholder="VD: Lớp 10, Lớp 11, Lớp 7..."
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Chủ đề / Tên bài:
                </label>
                <input
                  type="text"
                  value={newQTopic}
                  onChange={(e) => setNewQTopic(e.target.value)}
                  placeholder="VD: Cấu trúc lặp, Mảng 1 chiều, Biểu thức..."
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                Nội dung câu hỏi:
              </label>
              <textarea
                required
                rows={2}
                value={newQText}
                onChange={(e) => setNewQText(e.target.value)}
                placeholder="Nhập đề bài câu hỏi tại đây..."
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                Đoạn mã code snippet (Nếu có):
              </label>
              <textarea
                rows={2}
                value={newQSnippet}
                onChange={(e) => setNewQSnippet(e.target.value)}
                placeholder="VD: for i in range(5): print(i)"
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 font-mono text-xs text-slate-900 dark:text-white"
              />
            </div>

            {/* Inputs based on type */}
            {newQType === 'multiple_choice' && (
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 dark:text-neutral-300">
                  4 Lựa chọn (Chọn nút tròn để chỉ định đáp án đúng):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {newQOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOption"
                        checked={newQCorrectOpt === i}
                        onChange={() => setNewQCorrectOpt(i)}
                        className="cursor-pointer"
                      />
                      <span className="font-bold text-blue-600">{String.fromCharCode(65 + i)}:</span>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => {
                          const copy = [...newQOptions];
                          copy[i] = e.target.value;
                          setNewQOptions(copy);
                        }}
                        placeholder={`Nội dung lựa chọn ${String.fromCharCode(65 + i)}`}
                        className="flex-1 p-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {newQType === 'true_false' && (
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Đáp án chuẩn:
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-emerald-600">
                    <input
                      type="radio"
                      name="correctBool"
                      checked={newQCorrectBool === true}
                      onChange={() => setNewQCorrectBool(true)}
                    />
                    ĐÚNG
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-rose-600">
                    <input
                      type="radio"
                      name="correctBool"
                      checked={newQCorrectBool === false}
                      onChange={() => setNewQCorrectBool(false)}
                    />
                    SAI
                  </label>
                </div>
              </div>
            )}

            {newQType === 'fill_in_blank' && (
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                  Từ / câu lệnh chính xác cần điền:
                </label>
                <input
                  type="text"
                  required
                  value={newQCorrectBlank}
                  onChange={(e) => setNewQCorrectBlank(e.target.value)}
                  placeholder="VD: append, len, break..."
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-neutral-300">
                Gợi ý / Giải thích chi tiết:
              </label>
              <textarea
                rows={2}
                value={newQExplanation}
                onChange={(e) => setNewQExplanation(e.target.value)}
                placeholder="Giải thích vì sao đáp án này là đúng..."
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
              >
                Lưu Câu Hỏi Vào LocalStorage
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toast message if present */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4. STATISTICS & SCORE SUMMARY BANNER */}
      <div
        className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
        }`}
      >
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-600 dark:text-neutral-400">Dạng câu:</span>
          <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-[11px]">
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterType('all'); }}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Tất cả ({questions.length})
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterType('multiple_choice'); }}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors ${
                filterType === 'multiple_choice'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Lựa chọn ({questions.filter(q => q.type === 'multiple_choice').length})
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterType('true_false'); }}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors ${
                filterType === 'true_false'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Đúng / Sai ({questions.filter(q => q.type === 'true_false').length})
            </button>
            <button
              onClick={() => { playMechanicalKeyClick(); setFilterType('fill_in_blank'); }}
              className={`px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors ${
                filterType === 'fill_in_blank'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900'
              }`}
            >
              Điền từ ({questions.filter(q => q.type === 'fill_in_blank').length})
            </button>
          </div>
        </div>

        {/* Real-time Score Counter with Detailed Calculation */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] font-bold text-blue-900 dark:text-blue-200">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Số câu làm: {Object.keys(userAnswers).length} / {totalQuestionsInSet} câu</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Đúng: {correctCount}/{totalQuestionsInSet}
            </span>

            {/* Thang điểm 10 */}
            <div className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center gap-1 shadow-xs">
              <span>ĐIỂM:</span>
              <span className="text-sm">{finalScore}</span>
              <span className="text-[10px] opacity-80">/10đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* OVERTIME PENALTY NOTICE */}
      {overtimeSeconds > 0 && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Quy chế tính điểm thời gian:</strong> Điểm = (Số câu đúng / Tổng số câu) × 10. Đã lố <strong>{overtimeMinutes} phút</strong> (-0.5 điểm/phút) = <strong>-{penaltyPoints} điểm</strong>.
            </span>
          </div>
          <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
            Điểm gốc: {Math.round(rawScore * 10) / 10}đ ➔ Điểm chốt: {finalScore}đ
          </span>
        </div>
      )}

      {/* 5. QUESTION CARDS LIST */}
      <div className="space-y-4">
        {activeQuizList.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-xl">
            Không có câu hỏi nào khớp với cấu hình hiện tại. Hãy bấm "Tạo câu hỏi riêng" hoặc tăng số lượng câu!
          </div>
        ) : (
          activeQuizList.map((q, idx) => {
            const hasAnswered = userAnswers[q.id] !== undefined;
            const isRevealed = revealedExplanations[q.id];

            // Determine if answered correctly
            let isUserCorrect = false;
            if (hasAnswered) {
              if (q.type === 'true_false' && userAnswers[q.id] === q.correctBool) isUserCorrect = true;
              if (q.type === 'multiple_choice' && userAnswers[q.id] === q.correctOptionIndex) isUserCorrect = true;
              if (q.type === 'fill_in_blank' && userAnswers[q.id] === 'correct') isUserCorrect = true;
              if (q.type === 'short_answer' && revealedShortAnswers[q.id]) isUserCorrect = true;
            }

            return (
              <div
                key={q.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  hasAnswered
                    ? isUserCorrect
                      ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-rose-400 bg-rose-50/20 dark:bg-rose-950/10'
                    : isLight
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-neutral-900 border-neutral-800 text-white'
                }`}
              >
                {/* Card Top: Badges & Actions */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-neutral-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 flex items-center justify-center text-xs font-bold font-mono">
                      #{idx + 1}
                    </span>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      q.type === 'true_false'
                        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200'
                        : q.type === 'multiple_choice'
                        ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200'
                        : q.type === 'fill_in_blank'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200'
                        : 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200'
                    }`}>
                      {q.type === 'true_false' ? 'Đúng / Sai' : q.type === 'multiple_choice' ? 'Lựa chọn' : q.type === 'fill_in_blank' ? 'Điền từ' : 'Tự luận'}
                    </span>

                    <span className="text-xs font-bold text-slate-600 dark:text-neutral-400">
                      {q.grade} • {q.subjectTopic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Badge: Sai màu đỏ có dấu chéo, đúng màu xanh lá */}
                    {hasAnswered && (
                      <div className="flex items-center">
                        {isUserCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-400 font-bold text-xs shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>ĐÚNG</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-400 font-bold text-xs shadow-xs">
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                            <span>SAI</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Delete button if custom */}
                    {q.id.startsWith('custom-q-') && (
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-neutral-800 cursor-pointer"
                        title="Xóa câu hỏi tự tạo này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed mb-2.5">
                  {q.question}
                </h3>

                {/* Code Snippet Box */}
                {q.codeSnippet && (
                  <pre className="p-3 mb-3 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800">
                    {q.codeSnippet}
                  </pre>
                )}

                {/* DẠNG 1: ĐÚNG / SAI INTERACTION */}
                {q.type === 'true_false' && (
                  <div className="flex items-center gap-3 my-2.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleAnswerTrueFalse(q.id, true)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                        userAnswers[q.id] === true
                          ? q.correctBool === true
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ĐÚNG</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAnswerTrueFalse(q.id, false)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                        userAnswers[q.id] === false
                          ? q.correctBool === false
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>SAI</span>
                    </button>

                    {hasAnswered && (
                      <span className="text-xs font-bold flex items-center gap-1">
                        {userAnswers[q.id] === q.correctBool ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Chính xác! (+1 câu đúng)</span>
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Chưa đúng! Đáp án chính xác là: {q.correctBool ? 'ĐÚNG' : 'SAI'}</span>
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                )}

                {/* DẠNG 2: LỰA CHỌN 4 ĐÁP ÁN INTERACTION */}
                {q.type === 'multiple_choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = userAnswers[q.id] === optIdx;
                      const isCorrect = q.correctOptionIndex === optIdx;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleAnswerMultipleChoice(q.id, optIdx)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${
                            hasAnswered
                              ? isCorrect
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                                : isChosen
                                ? 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-600 opacity-60'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 opacity-60'
                              : isLight
                              ? 'bg-slate-50 hover:bg-blue-50 border-slate-200 hover:border-blue-300 text-slate-800'
                              : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            hasAnswered && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : hasAnswered && isChosen
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300'
                          }`}>
                            {hasAnswered && isCorrect ? '✓' : hasAnswered && isChosen ? '✗' : String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* DẠNG 3: ĐIỀN TỪ NGẮN INTERACTION */}
                {q.type === 'fill_in_blank' && (
                  <div className="my-2.5 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="text"
                        value={blankInputValues[q.id] || ''}
                        onChange={(e) => setBlankInputValues(prev => ({ ...prev, [q.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitBlankAnswer(q); }}
                        placeholder="Nhập từ / câu lệnh còn thiếu..."
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono outline-none max-w-xs transition-colors ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                            : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleSubmitBlankAnswer(q)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
                      >
                        Kiểm tra kết quả
                      </button>

                      {hasAnswered && (
                        <span className="text-xs font-bold flex items-center gap-1">
                          {userAnswers[q.id] === 'correct' ? (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>ĐÚNG! (+1 câu)</span>
                            </span>
                          ) : (
                            <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>SAI! Đáp án chuẩn: <code className="font-mono bg-rose-100 dark:bg-rose-950 px-1 py-0.5 rounded">{q.correctBlankAnswer}</code></span>
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* DẠNG 4: HỎI - ĐÁP NGẮN INTERACTION */}
                {q.type === 'short_answer' && (
                  <div className="my-2.5 space-y-2">
                    <textarea
                      rows={2}
                      placeholder="Gõ câu trả lời tóm tắt của bạn vào đây để tự luyện phản xạ..."
                      className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-colors ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                          : 'bg-neutral-950 border-neutral-800 text-white focus:border-blue-500'
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleToggleShortAnswer(q.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-800 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{revealedShortAnswers[q.id] ? 'Ẩn đáp án mẫu' : 'Xem đáp án mẫu & Gợi ý sư phạm'}</span>
                      </button>

                      {revealedShortAnswers[q.id] && (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Đã mở gợi ý đối chiếu</span>
                        </span>
                      )}
                    </div>

                    {revealedShortAnswers[q.id] && (
                      <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs space-y-1.5">
                        <div className="font-bold text-purple-900 dark:text-purple-200">
                          Đáp án mẫu chuẩn trường học:
                        </div>
                        <p className="text-slate-700 dark:text-neutral-300 leading-relaxed font-sans">
                          {q.sampleAnswer}
                        </p>
                        {q.keyPointsNeeded && (
                          <div className="text-[11px] text-purple-800 dark:text-purple-300 font-mono">
                            Từ khóa cần có trong câu trả lời: {(q.keyPointsNeeded || []).join(' • ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* SƯ PHẠM EXPLANATION BOX */}
                {isRevealed && (
                  <div
                    className={`mt-3 p-3 rounded-lg border text-xs leading-relaxed transition-all ${
                      isLight
                        ? 'bg-blue-50/70 border-blue-200 text-slate-800'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-blue-800 dark:text-blue-300 mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Giải thích kiến thức & Gợi ý ôn tập:</span>
                    </div>
                    <p className="text-slate-700 dark:text-neutral-300">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
