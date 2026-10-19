import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, User, Send, Sparkles, Copy, Check, RotateCcw, 
  HelpCircle, ShieldCheck, Database, BookOpen, AlertCircle, 
  Trash2, Clipboard, ArrowDown, ChevronRight, CheckCircle2,
  FileText, Layers, ExternalLink, CornerDownLeft
} from 'lucide-react';
import { TerminalTheme, AppLanguage } from '../types';
import { 
  GroundedChatMessage, 
  loadGroundedChatHistory, 
  saveGroundedChatHistory, 
  processGroundedQuery, 
  SAMPLE_GROUNDED_QUESTIONS 
} from '../utils/groundedChatEngine';
import { QASeedPreview } from './QASeedPreview';
import { playMechanicalKeyClick } from '../utils/audio';
import { showGlobalToast, writeClipboardText, readClipboardText } from '../utils/keyboardShortcuts';

interface AIChatPreviewProps {
  theme?: TerminalTheme;
  language?: AppLanguage;
}

export const AIChatPreview: React.FC<AIChatPreviewProps> = ({ 
  theme = 'light',
  language = 'vi' 
}) => {
  const isLight = theme === 'light';
  const [activeSubTab, setActiveSubTab] = useState<'grounded_chat' | 'qa_seed'>('grounded_chat');
  
  // Chat state
  const [messages, setMessages] = useState<GroundedChatMessage[]>(() => loadGroundedChatHistory());
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll chat thread to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Persist chat history to LocalStorage
  useEffect(() => {
    saveGroundedChatHistory(messages);
  }, [messages]);

  // Listen for global Ctrl+S save events
  useEffect(() => {
    const handleSaveEvent = () => {
      saveGroundedChatHistory(messages);
      showGlobalToast('Đã lưu (Ctrl+S) lịch sử Chatbot Grounded vào LocalStorage!');
    };
    window.addEventListener('app:save-data', handleSaveEvent);
    return () => window.removeEventListener('app:save-data', handleSaveEvent);
  }, [messages]);

  // Copy verbatim prompt from user image
  const handleCopyTerminalPrompt = () => {
    playMechanicalKeyClick();
    const promptText = `Hãy tạo màn hình chatbot grounded hỗ trợ ôn bài cho chủ đề hiện tại.

Yêu cầu:
- chatbot chỉ trả lời trong phạm vi:
  - sources
  - analysisPreview
  - studyPack
- nếu câu hỏi không có trong tài liệu hoặc không suy ra được từ tài liệu, phải trả lời rõ:
  "Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp."
- có khung nhập câu hỏi
- có vùng hiển thị lịch sử hỏi đáp
- phù hợp cho việc ôn bài
- không biến thành chatbot chung chung
- ngôn ngữ thân thiện, dễ học`;

    writeClipboardText(promptText);
    setCopiedPrompt(true);
    showGlobalToast('Đã sao chép (Ctrl+C) Prompt Chatbot Grounded!');
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  // Copy individual message
  const handleCopyMessage = (text: string, id: string) => {
    playMechanicalKeyClick();
    writeClipboardText(text);
    setCopiedMsgId(id);
    showGlobalToast('Đã sao chép (Ctrl+C) tin nhắn vào Clipboard!');
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Paste from clipboard helper (Ctrl+V button)
  const handlePasteIntoInput = async () => {
    playMechanicalKeyClick();
    const text = await readClipboardText();
    if (text) {
      setInputQuery(prev => prev ? `${prev} ${text}` : text);
      showGlobalToast('Đã dán (Ctrl+V) nội dung từ Clipboard!');
      inputRef.current?.focus();
    } else {
      showGlobalToast('Bạn có thể nhấn phím Ctrl+V để dán trực tiếp vào ô nhập!', undefined, 'info');
      inputRef.current?.focus();
    }
  };

  // Send message
  const handleSendMessage = (customText?: string) => {
    const query = (customText !== undefined ? customText : inputQuery).trim();
    if (!query) return;

    playMechanicalKeyClick();

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const userMessage: GroundedChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'student',
      text: query,
      time: timeStr
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and strict grounding check
    setTimeout(() => {
      const result = processGroundedQuery(query);
      const botMessage: GroundedChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: result.replyText,
        time: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
        isGrounded: result.isGrounded,
        groundingSources: result.sources,
        citation: result.citation
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      playMechanicalKeyClick();
    }, 450);
  };

  // Keyboard shortcut handler inside input: Enter to send, Ctrl+S to save
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveGroundedChatHistory(messages);
      showGlobalToast('Đã lưu (Ctrl+S) lịch sử chat thành công!');
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear conversation
  const handleClearHistory = () => {
    playMechanicalKeyClick();
    if (window.confirm('Xóa toàn bộ lịch sử hỏi đáp của Chatbot Grounded?')) {
      setMessages([]);
      saveGroundedChatHistory([]);
      showGlobalToast('Đã xóa sạch lịch sử hội thoại!');
    }
  };

  // Reset to default conversation
  const handleResetDefaultHistory = () => {
    playMechanicalKeyClick();
    const defaults = loadGroundedChatHistory();
    setMessages(defaults);
    saveGroundedChatHistory(defaults);
    showGlobalToast('Đã khôi phục hội thoại mẫu!');
  };

  return (
    <div id="grounded-ai-tutor-screen" className="space-y-6">
      {/* Sub-tab Navigation: Grounded Chatbot vs Q&A Seed */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1 border-b border-slate-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { playMechanicalKeyClick(); setActiveSubTab('grounded_chat'); }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'grounded_chat'
                ? 'bg-blue-600 text-white shadow-xs'
                : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Chatbot Grounded (Ôn bài bám sát tài liệu)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 text-white font-mono">
              Prompt Mới
            </span>
          </button>

          <button
            type="button"
            onClick={() => { playMechanicalKeyClick(); setActiveSubTab('qa_seed'); }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubTab === 'qa_seed'
                ? 'bg-blue-600 text-white shadow-xs'
                : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Thư viện Q&A Seed (Khởi tạo câu hỏi)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono">
              Prompt #06
            </span>
          </button>
        </div>

        {/* Global Keyboard Shortcuts Badge */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-neutral-800">
          <span className="font-bold text-blue-600 dark:text-blue-400">⌨️ Phím tắt:</span>
          <span className="bg-white dark:bg-black px-1.5 py-0.5 rounded border border-slate-300 dark:border-neutral-700">Ctrl+S: Lưu</span>
          <span className="bg-white dark:bg-black px-1.5 py-0.5 rounded border border-slate-300 dark:border-neutral-700">Ctrl+C: Copy</span>
          <span className="bg-white dark:bg-black px-1.5 py-0.5 rounded border border-slate-300 dark:border-neutral-700">Ctrl+V: Paste</span>
        </div>
      </div>

      {activeSubTab === 'qa_seed' ? (
        <QASeedPreview theme={theme} language={language} />
      ) : (
        <>
          {/* ========================================================================= */}
          {/* 1. TERMINAL PROMPT CARD VERBATIM FROM USER'S IMAGE                       */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] text-white p-4 sm:p-5 shadow-2xl font-mono">
            {/* Header: Window Dots + LOẠI: FUNCTION + CLICK TO COPY */}
            <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-xs"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-xs"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-xs"></span>
                </div>
                <span className="text-[11px] font-bold text-neutral-400 tracking-wider">
                  LOẠI: FUNCTION
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyTerminalPrompt}
                className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-3 py-1 rounded-md transition-all cursor-pointer border ${
                  copiedPrompt
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600 shadow-sm'
                    : 'bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
                }`}
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>

            {/* Prompt Content Verbatim */}
            <div className="pt-3.5 text-xs sm:text-sm text-neutral-200 leading-relaxed space-y-3 font-mono">
              <p className="text-white font-medium">
                Hãy tạo màn hình chatbot grounded hỗ trợ ôn bài cho chủ đề hiện tại.
              </p>

              <div className="space-y-1 text-neutral-300 text-xs sm:text-[13px]">
                <p className="font-semibold text-neutral-400">Yêu cầu:</p>
                <p>- chatbot chỉ trả lời trong phạm vi:</p>
                <p className="pl-4 text-emerald-400">- sources</p>
                <p className="pl-4 text-emerald-400">- analysisPreview</p>
                <p className="pl-4 text-emerald-400">- studyPack</p>
                <p>- nếu câu hỏi không có trong tài liệu hoặc không suy ra được từ tài liệu, phải trả lời rõ:</p>
                <p className="pl-4 font-bold text-amber-300">
                  "Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp."
                </p>
                <p>- có khung nhập câu hỏi</p>
                <p>- có vùng hiển thị lịch sử hỏi đáp</p>
                <p>- phù hợp cho việc ôn bài</p>
                <p>- không biến thành chatbot chung chung</p>
                <p>- ngôn ngữ thân thiện, dễ học</p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. GROUNDING STATUS & REFERENCE SOURCES PANEL                            */}
          {/* ========================================================================= */}
          <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs ${
            isLight ? 'bg-blue-50/60 border-blue-200 text-slate-800' : 'bg-blue-950/30 border-blue-900/60 text-blue-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Phạm vi Grounding Kích Hoạt:
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[10px] border border-emerald-300 dark:border-emerald-800">
                    ✓ STRICT BOUNDARY ON
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-blue-300/80 mt-0.5">
                  Chatbot từ chối trả lời mọi câu hỏi ngoài 3 nguồn tài liệu bên dưới để tránh lan man.
                </p>
              </div>
            </div>

            {/* 3 Active Grounded Source Badges */}
            <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
              <span className="px-2 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 flex items-center gap-1 font-semibold text-slate-700 dark:text-neutral-300">
                <BookOpen className="w-3 h-3 text-blue-500" />
                sources
              </span>
              <span className="px-2 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 flex items-center gap-1 font-semibold text-slate-700 dark:text-neutral-300">
                <FileText className="w-3 h-3 text-purple-500" />
                analysisPreview
              </span>
              <span className="px-2 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 flex items-center gap-1 font-semibold text-slate-700 dark:text-neutral-300">
                <Layers className="w-3 h-3 text-emerald-500" />
                studyPack
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. GROUNDED CHAT CONTAINER                                               */}
          {/* ========================================================================= */}
          <div className={`border rounded-2xl flex flex-col overflow-hidden shadow-sm transition-colors ${
            isLight ? 'bg-white border-slate-200' : 'bg-neutral-950 border-neutral-800'
          }`}>
            {/* Chat Header Toolbar */}
            <div className={`px-4 py-3 flex items-center justify-between border-b flex-wrap gap-2 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-900/80 border-neutral-800'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono">
                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-bold text-slate-900 dark:text-white">
                  AI Trợ Giảng Ôn Bài (Grounded Tin học 10 & 11 KNTT)
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 dark:text-neutral-400">
                  {messages.length} lượt trao đổi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetDefaultHistory}
                  title="Nạp lại các tin nhắn mẫu"
                  className="px-2 py-1 rounded text-[11px] font-mono text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-800 cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Mẫu</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Xóa toàn bộ lịch sử hỏi đáp"
                  className="px-2 py-1 rounded text-[11px] font-mono text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Xóa</span>
                </button>
              </div>
            </div>

            {/* Conversation History Thread */}
            <div className={`p-4 sm:p-5 space-y-4 min-h-[380px] max-h-[520px] overflow-y-auto ${
              isLight ? 'bg-slate-50/40' : 'bg-[#0a0a0a]'
            }`}>
              {messages.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-neutral-500">
                  <Bot className="w-12 h-12 mb-3 stroke-[1.5] text-blue-500/60" />
                  <p className="font-bold text-sm text-slate-700 dark:text-neutral-300">
                    Chưa có câu hỏi nào trong phiên ôn tập
                  </p>
                  <p className="text-xs max-w-md mt-1">
                    Hãy gõ câu hỏi vào khung bên dưới hoặc chọn một câu hỏi gợi ý để bắt đầu ôn bài cùng AI Trợ Giảng!
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 max-w-3xl ${
                      msg.sender === 'student' ? 'ml-auto flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 font-mono shadow-xs ${
                        msg.sender === 'student'
                          ? isLight
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          : isLight
                            ? 'bg-gradient-to-br from-indigo-600 to-sky-600 text-white'
                            : 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white'
                      }`}
                    >
                      {msg.sender === 'student' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Bubble Content */}
                    <div
                      className={`rounded-2xl p-4 text-xs font-sans leading-relaxed border shadow-xs max-w-xl group relative ${
                        msg.sender === 'student'
                          ? isLight
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-blue-700 text-white border-blue-700'
                          : msg.isGrounded === false
                            ? isLight
                              ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                              : 'bg-amber-950/40 border-amber-800 text-amber-200'
                            : isLight
                              ? 'bg-white border-slate-200 text-slate-900'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-100'
                      }`}
                    >
                      {/* Top Header info */}
                      <div className="flex items-center justify-between gap-4 mb-1.5 text-[10px] font-mono opacity-80 border-b border-current/10 pb-1">
                        <span className="font-bold">
                          {msg.sender === 'student' ? 'Học sinh' : 'AI Trợ Giảng Grounded'}
                        </span>
                        <div className="flex items-center gap-2">
                          <span>{msg.time}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.text, msg.id)}
                            title="Sao chép nội dung tin nhắn (Ctrl+C)"
                            className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Text Body */}
                      <div className="whitespace-pre-wrap select-text leading-relaxed">
                        {msg.text}
                      </div>

                      {/* Out of scope Alert Badge */}
                      {msg.sender === 'bot' && msg.isGrounded === false && (
                        <div className="mt-2.5 pt-2 border-t border-amber-300/40 dark:border-amber-700/40 flex items-center gap-1.5 text-[10.5px] font-mono font-bold text-amber-800 dark:text-amber-300">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>Quy tắc: Chặn câu hỏi nằm ngoài phạm vi học liệu đã cung cấp.</span>
                        </div>
                      )}

                      {/* In-scope Citation Badge */}
                      {msg.sender === 'bot' && msg.isGrounded && msg.citation && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-2 flex-wrap text-[10.5px] font-mono text-emerald-700 dark:text-emerald-400">
                          <span className="flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                            {msg.citation}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] border border-emerald-300 dark:border-emerald-800 font-bold">
                            ✓ GROUNDED
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 font-mono">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className={`p-3 rounded-2xl text-xs font-mono border flex items-center gap-2 ${
                    isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                    <span>Đang đối chiếu tài liệu sources, analysisPreview & studyPack...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Test Prompt Suggestion Chips */}
            <div className={`px-4 py-2.5 border-t border-b flex items-center gap-1.5 overflow-x-auto text-xs ${
              isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <span className="font-bold text-[11px] font-mono text-slate-500 dark:text-neutral-400 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Gợi ý Tin học & Soạn đề:
              </span>
              {SAMPLE_GROUNDED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q.prompt)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    q.type === 'authoring'
                      ? 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-950/80 dark:hover:bg-blue-900 text-blue-900 dark:text-blue-200 border-blue-400 dark:border-blue-700 font-bold shadow-2xs'
                      : q.type === 'out-of-scope'
                        ? 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                        : isLight
                          ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-400 shadow-2xs'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700 shadow-2xs'
                  }`}
                  title={q.prompt}
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input Bar (Khung nhập câu hỏi với phím tắt Ctrl+S / Ctrl+C / Ctrl+V) */}
            <div className={`p-3 sm:p-4 transition-colors ${
              isLight ? 'bg-white' : 'bg-neutral-950'
            }`}>
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-end gap-2">
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    rows={2}
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi môn Tin học hoặc yêu cầu: 'Soạn câu hỏi trắc nghiệm Vòng lặp For', 'Soạn câu hỏi phân loại Tìm kiếm nhị phân', 'Cú pháp range() trong Python'..."
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans outline-none transition-all resize-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        : 'bg-neutral-900 border-neutral-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    }`}
                  />
                  
                  {/* Floating Action Buttons inside/under input */}
                  <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-slate-500 dark:text-neutral-400">
                    <span className="font-mono">
                      Nhấn <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-[10px] font-bold">Enter</kbd> để gửi, <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-[10px] font-bold">Shift+Enter</kbd> để xuống dòng
                    </span>

                    {/* Dán (Ctrl+V) button */}
                    <button
                      type="button"
                      onClick={handlePasteIntoInput}
                      className="inline-flex items-center gap-1 font-mono text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <Clipboard className="w-3 h-3" />
                      <span>Dán từ clipboard (Ctrl+V)</span>
                    </button>
                  </div>
                </div>

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputQuery.trim() || isTyping}
                  className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shrink-0 ${
                    !inputQuery.trim() || isTyping
                      ? 'bg-slate-200 dark:bg-neutral-800 text-slate-400 dark:text-neutral-600 cursor-not-allowed shadow-none'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]'
                  }`}
                >
                  <span>Gửi Câu Hỏi</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
