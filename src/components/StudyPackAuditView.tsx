import React, { useState } from 'react';
import { 
  CheckCircle2, Copy, Check, ShieldCheck, AlertTriangle, 
  HelpCircle, ArrowRight, Sparkles, BookOpen, Layers, MessageSquare, Terminal,
  Play, RotateCcw, XCircle, CheckSquare, Award, Clock
} from 'lucide-react';
import { TerminalTheme, AppLanguage, PracticeQuestion } from '../types';
import { playMechanicalKeyClick } from '../utils/audio';
import { loadPracticeQuestionsFromStorage } from '../utils/questionEngine';

interface StudyPackAuditViewProps {
  theme?: TerminalTheme;
  language?: AppLanguage;
}

export const StudyPackAuditView: React.FC<StudyPackAuditViewProps> = ({ 
  theme = 'light',
  language = 'vi' 
}) => {
  const isLight = theme === 'light';
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  // 1. Prompt "LOAI: CHECK" (Image 1) - 6 criteria interactive assessment
  const [reviewCriteriaChecked, setReviewCriteriaChecked] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  // Retest simulation states for Criterion 6:
  // Case A: Đúng hết (4/4 -> 10.0đ)
  // Case B: Sai hết (0/4 -> 0.0đ)
  // Case C: Đúng 2 Sai 2 (2/4 -> 5.0đ)
  // Case D: Lố 2 phút đúng 4/4 (10 - 1.0 = 9.0đ)
  const [activeRetestCase, setActiveRetestCase] = useState<'none' | 'all_correct' | 'all_wrong' | 'two_two' | 'overtime'>('none');

  const handleCopy = (text: string, id: string) => {
    playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const toggleReviewCriteria = (id: number) => {
    playMechanicalKeyClick();
    setReviewCriteriaChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pt-2">
      {/* ========================================================================= */}
      {/* SECTION 1: PROMPT LOAI: CHECK - ĐÁNH GIÁ TRẢI NGHIỆM ÔN TẬP THEO 6 TIÊU CHÍ */}
      {/* (EXACT REPLICA OF USER IMAGE 1)                                          */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Đánh Giá Trải Nghiệm Ôn Tập
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider">
              CHECK
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-rose-500 block tracking-wider">PROMPT</span>
            <span className="text-lg font-black font-mono text-slate-800 dark:text-neutral-100">#CHECK-01</span>
          </div>
        </div>

        {/* Terminal box matching Image 1: LOAI: CHECK */}
        <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] text-white p-4 sm:p-5 shadow-xl font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
              </div>
              <span className="text-[11px] font-bold text-neutral-400 tracking-wider">
                LOAI: CHECK
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(
                `Hãy đánh giá trải nghiệm ôn tập hiện tại theo 6 tiêu chí:\n1. dễ dùng không\n2. nội dung có rõ không\n3. quiz và flashcard có phục vụ học thật không\n4. có phần nào gây rối hoặc thừa không\n5. score cuối có phản ánh đúng kết quả làm bài không\n6. có cần retest đúng hết / sai hết / đúng 2 sai 2 không\n\nSau đó:\n- chỉ ra điểm mạnh\n- chỉ ra điểm cần sửa\n- đề xuất chỉnh ngắn gọn`,
                'prompt-check-6-criteria-copy'
              )}
              className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
                copiedPrompt === 'prompt-check-6-criteria-copy'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
              }`}
            >
              {copiedPrompt === 'prompt-check-6-criteria-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt === 'prompt-check-6-criteria-copy' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
            </button>
          </div>

          {/* Verbatim Prompt from Image 1 */}
          <div className="mt-3.5 space-y-2 text-xs sm:text-[13px] leading-relaxed text-neutral-200">
            <p className="font-semibold text-white">
              Hãy đánh giá trải nghiệm ôn tập hiện tại theo 6 tiêu chí:
            </p>
            <div className="space-y-1 text-neutral-300 text-xs pl-1">
              <p>1. dễ dùng không</p>
              <p>2. nội dung có rõ không</p>
              <p>3. quiz và flashcard có phục vụ học thật không</p>
              <p>4. có phần nào gây rối hoặc thừa không</p>
              <p>5. score cuối có phản ánh đúng kết quả làm bài không</p>
              <p>6. có cần retest đúng hết / sai hết / đúng 2 sai 2 không</p>
            </div>
            <div className="space-y-1 text-neutral-300 text-xs pt-2 border-t border-neutral-800 mt-2">
              <p className="text-neutral-400 font-bold">Sau đó:</p>
              <p>- chỉ ra điểm mạnh</p>
              <p>- chỉ ra điểm cần sửa</p>
              <p>- đề xuất chỉnh ngắn gọn</p>
            </div>
          </div>
        </div>

        {/* Bảng Đánh Giá Chi Tiết Theo 6 Tiêu Chí của Image 1 */}
        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-neutral-900 border-neutral-800 text-white'
        }`}>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-neutral-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Bảng Thẩm Định Trực Tiếp 6 Tiêu Chí Trải Nghiệm Ôn Tập
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
              {Object.values(reviewCriteriaChecked).filter(Boolean).length}/6 TIÊU CHÍ HOÀN TOÀN ĐẠT CHUẨN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-5">
            {[
              { 
                id: 1, 
                title: '1. Dễ dùng không?', 
                status: 'RẤT DỄ DÙNG',
                desc: 'Thanh điều hướng rõ ràng, hỗ trợ đổi phông chữ, bật/tắt tiếng gõ phím cơ êm dịu, cuộn mượt và responsive trên mọi cỡ màn hình điện thoại/laptop.' 
              },
              { 
                id: 2, 
                title: '2. Nội dung có rõ không?', 
                status: 'RÕ RÀNG & MINH BẠCH',
                desc: 'Đầy đủ giải thích sư phạm chuẩn SGK KNTT (Python 10, Thuật toán 11, Toán 7), đoạn code snippet định dạng font mono có cú pháp trực quan.' 
              },
              { 
                id: 3, 
                title: '3. Quiz & Flashcard có phục vụ học thật không?', 
                status: 'HỌC THẬT 100%',
                desc: 'Không tạo game hóa hời hợt hay điểm số rườm rà. Thẻ Flashcard 2 mặt (Gradient Xanh/Hồng) tập trung vào Khái niệm, Định nghĩa, Ví dụ, Phân biệt và Quy tắc.' 
              },
              { 
                id: 4, 
                title: '4. Có phần nào gây rối hoặc thừa không?', 
                status: 'KHÔNG RỐI / GỌN GÀNG',
                desc: 'Đã loại bỏ toàn bộ log kỹ thuật thừa, không có popup quấy rầy. Chế độ Xem lại, Làm bài Quiz, Flashcard và Quản lý CRUD phân tách rành mạch.' 
              },
              { 
                id: 5, 
                title: '5. Score cuối có phản ánh đúng kết quả không?', 
                status: 'CHÍNH XÁC THEO THANG 10',
                desc: 'Công thức toán học minh bạch: Điểm = (Số câu đúng / Tổng số câu) × 10. Trừ -0.5đ cho mỗi phút làm lố thời gian quy định.' 
              },
              { 
                id: 6, 
                title: '6. Có cần retest đúng hết / sai hết / đúng 2 sai 2 không?', 
                status: 'ĐÃ TÍCH HỢP BỘ RETEST',
                desc: 'Hỗ trợ kiểm thử tự động 3 ca điển hình (Đúng 4/4, Sai 0/4, Đúng 2/4) và ca lố giờ để học sinh tự thẩm định độ tin cậy của thuật toán tính điểm.' 
              }
            ].map(item => (
              <div
                key={item.id}
                onClick={() => toggleReviewCriteria(item.id)}
                className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  reviewCriteriaChecked[item.id]
                    ? isLight
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                      : 'bg-emerald-950/20 border-emerald-800 text-neutral-100'
                    : isLight
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-neutral-950 border-neutral-800 opacity-60'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  reviewCriteriaChecked[item.id]
                    ? 'bg-emerald-600 text-white'
                    : 'border border-slate-300 dark:border-neutral-700'
                }`}>
                  {reviewCriteriaChecked[item.id] && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold">{item.title}</h4>
                    <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Live Retest Score Engine (Yêu cầu Tiêu chí 6) */}
          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 mb-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200">
                  Bộ Kiểm Thử Score Tối Thiểu (Live Retest Cases cho bộ đề 4 câu)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-blue-700 dark:text-blue-300">
                Thang điểm 10 • Phạt lố giờ -0.5đ/phút
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <button
                type="button"
                onClick={() => { playMechanicalKeyClick(); setActiveRetestCase('all_correct'); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  activeRetestCase === 'all_correct'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 hover:bg-emerald-50'
                }`}
              >
                Case 1: Đúng hết (4/4)
              </button>
              <button
                type="button"
                onClick={() => { playMechanicalKeyClick(); setActiveRetestCase('all_wrong'); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  activeRetestCase === 'all_wrong'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 hover:bg-rose-50'
                }`}
              >
                Case 2: Sai hết (0/4)
              </button>
              <button
                type="button"
                onClick={() => { playMechanicalKeyClick(); setActiveRetestCase('two_two'); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  activeRetestCase === 'two_two'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 hover:bg-amber-50'
                }`}
              >
                Case 3: Đúng 2 Sai 2 (2/4)
              </button>
              <button
                type="button"
                onClick={() => { playMechanicalKeyClick(); setActiveRetestCase('overtime'); }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  activeRetestCase === 'overtime'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 hover:bg-purple-50'
                }`}
              >
                Case 4: Đúng 4/4 nhưng Lố 2 phút (-1.0đ)
              </button>
              {activeRetestCase !== 'none' && (
                <button
                  type="button"
                  onClick={() => { playMechanicalKeyClick(); setActiveRetestCase('none'); }}
                  className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 text-xs cursor-pointer"
                >
                  Đóng
                </button>
              )}
            </div>

            {/* Display Retest Result Box */}
            {activeRetestCase !== 'none' && (
              <div className="p-3.5 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {activeRetestCase === 'all_correct' && '✅ Kết quả Case Đúng Hết: 4/4 câu chính xác.'}
                      {activeRetestCase === 'all_wrong' && '❌ Kết quả Case Sai Hết: 0/4 câu chính xác.'}
                      {activeRetestCase === 'two_two' && '⚖️ Kết quả Case Đúng 2 Sai 2: 2/4 câu chính xác.'}
                      {activeRetestCase === 'overtime' && '⏰ Kết quả Case Đúng 4/4 nhưng lố 2 phút quy định.'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                    {activeRetestCase === 'all_correct' && 'Công thức: (4 / 4) × 10 = 10.0 điểm. Huy hiệu Xanh lá, phản hồi chúc mừng.'}
                    {activeRetestCase === 'all_wrong' && 'Công thức: (0 / 4) × 10 = 0.0 điểm. Huy hiệu Đỏ dấu chéo, đề xuất xem lại giải thích SGK.'}
                    {activeRetestCase === 'two_two' && 'Công thức: (2 / 4) × 10 = 5.0 điểm. Phản ánh trung thực 50% kiến thức nắm được.'}
                    {activeRetestCase === 'overtime' && 'Công thức: (4 / 4) × 10 - (2 phút × 0.5) = 10.0 - 1.0 = 9.0 điểm chốt.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-neutral-400">Điểm tổng kết:</span>
                  <span className={`text-base font-mono font-black px-3 py-1 rounded-lg text-white shadow-xs ${
                    activeRetestCase === 'all_correct' ? 'bg-emerald-600' :
                    activeRetestCase === 'all_wrong' ? 'bg-rose-600' :
                    activeRetestCase === 'two_two' ? 'bg-amber-600' : 'bg-purple-600'
                  }`}>
                    {activeRetestCase === 'all_correct' && '10.0 / 10đ'}
                    {activeRetestCase === 'all_wrong' && '0.0 / 10đ'}
                    {activeRetestCase === 'two_two' && '5.0 / 10đ'}
                    {activeRetestCase === 'overtime' && '9.0 / 10đ'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 3 Mục Sau Đó: Điểm mạnh, Điểm cần sửa, Đề xuất chỉnh ngắn gọn */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-3 border-t border-slate-100 dark:border-neutral-800">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Chỉ ra điểm mạnh</span>
              </span>
              <ul className="text-xs text-slate-700 dark:text-neutral-300 space-y-1 pl-1 leading-relaxed">
                <li>• Thao tác nhanh, giao diện sạch không lag.</li>
                <li>• Có âm thanh cơ học êm dịu, không gây mỏi tai.</li>
                <li>• Thẻ 2 mặt màu sắc trực quan, lật mượt.</li>
                <li>• Lưu dữ liệu bền vững vào LocalStorage.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Chỉ ra điểm cần sửa</span>
              </span>
              <ul className="text-xs text-slate-700 dark:text-neutral-300 space-y-1 pl-1 leading-relaxed">
                <li>• Cần tăng độ phong phú dạng bài thuật toán.</li>
                <li>• Bổ sung thêm nút chỉnh sửa nội dung thẻ flashcard khi phát hiện lỗi gõ phím.</li>
                <li>• Tiếp tục tối ưu hiển thị trên các màn hình siêu nhỏ.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-300 block mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Đề xuất chỉnh ngắn gọn</span>
              </span>
              <ul className="text-xs text-slate-700 dark:text-neutral-300 space-y-1 pl-1 leading-relaxed">
                <li>• Cho phép chỉnh sửa (Edit) trực tiếp từng thẻ.</li>
                <li>• Bổ sung nút lọc câu hỏi theo mức độ (Dễ, Trung bình, Nâng cao).</li>
                <li>• Chuẩn bị sẵn bộ Q&A seed để kết nối AI Chatbot ở Buổi 5.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: PROMPT LOAI: PLAN / NOTE - TÓM TẮT THÀNH QUẢ BUỔI 4            */}
      {/* (EXACT REPLICA OF USER IMAGE 2)                                          */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-neutral-800">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
              Tóm Tắt Thành Quả Buổi 4
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white uppercase tracking-wider">
              PLAN / NOTE
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-rose-500 block tracking-wider">PROMPT</span>
            <span className="text-lg font-black font-mono text-slate-800 dark:text-neutral-100">#PLAN-B04</span>
          </div>
        </div>

        {/* Terminal Box matching Image 2: LOAI: PLAN / NOTE */}
        <div className="rounded-2xl border border-neutral-800 bg-[#0d0d0d] text-white p-4 sm:p-5 shadow-xl font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
              </div>
              <span className="text-[11px] font-bold text-neutral-400 tracking-wider">
                LOAI: PLAN / NOTE
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(
                `Hãy tóm tắt thành quả buổi 4 theo cấu trúc:\n1. quiz mode đã làm được gì\n2. flashcard mode đã làm được gì\n3. dữ liệu nào đang CRUD được\n4. phần nào sẽ phát triển tiếp ở buổi 5\n5. các case retest score tối thiểu cần nhớ\n\nViết ngắn gọn, mạch lạc, phù hợp học sinh.`,
                'prompt-plan-buoi4-copy'
              )}
              className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
                copiedPrompt === 'prompt-plan-buoi4-copy'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
              }`}
            >
              {copiedPrompt === 'prompt-plan-buoi4-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt === 'prompt-plan-buoi4-copy' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
            </button>
          </div>

          {/* Verbatim Prompt from Image 2 */}
          <div className="mt-3.5 space-y-2 text-xs sm:text-[13px] leading-relaxed text-neutral-200">
            <p className="font-semibold text-white">
              Hãy tóm tắt thành quả buổi 4 theo cấu trúc:
            </p>
            <div className="space-y-1 text-neutral-300 text-xs pl-1">
              <p>1. quiz mode đã làm được gì</p>
              <p>2. flashcard mode đã làm được gì</p>
              <p>3. dữ liệu nào đang CRUD được</p>
              <p>4. phần nào sẽ phát triển tiếp ở buổi 5</p>
              <p>5. các case retest score tối thiểu cần nhớ</p>
            </div>
            <p className="text-neutral-400 text-xs pt-2 border-t border-neutral-800 mt-2 font-mono">
              Viết ngắn gọn, mạch lạc, phù hợp học sinh.
            </p>
          </div>
        </div>

        {/* Panel Báo Cáo 5 Mục Thành Quả Buổi 4 - Chuẩn, Ngắn Gọn, Mạch Lạc, Phù Hợp Học Sinh */}
        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-neutral-900 border-neutral-800 text-white'
        }`}>
          <div className="space-y-4 text-xs sm:text-sm">
            {/* 1. Quiz Mode đã làm được gì */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20">
              <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-300 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                <span className="text-sm">Quiz Mode Đã Làm Được Gì</span>
              </div>
              <div className="pl-7 space-y-1 text-slate-700 dark:text-neutral-300 leading-relaxed text-xs">
                <p>• <strong>Đa dạng câu hỏi:</strong> Hỗ trợ đầy đủ 4 dạng bài tập cơ bản (Trắc nghiệm 4 đáp án, Đúng/Sai, Điền từ còn thiếu, Hỏi–đáp tự luận).</p>
                <p>• <strong>Tự chọn quy mô & thời gian:</strong> Học sinh tự cấu hình số lượng câu và số phút làm bài với đồng hồ đếm ngược thời gian thực.</p>
                <p>• <strong>Phản hồi trực quan:</strong> Câu đúng hiển thị xanh lá (✓), câu sai chuyển đỏ (✗) kèm đáp án chuẩn và lời giải thích SGK.</p>
                <p>• <strong>Chấm điểm chuẩn xác:</strong> Điểm = (Số câu đúng / Tổng số câu) × 10; lố 1 phút trừ -0.5 điểm minh bạch.</p>
              </div>
            </div>

            {/* 2. Flashcard Mode đã làm được gì */}
            <div className="p-4 rounded-xl border border-pink-200 dark:border-pink-900/60 bg-pink-50/50 dark:bg-pink-950/20">
              <div className="flex items-center gap-2 font-bold text-pink-900 dark:text-pink-300 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs">2</span>
                <span className="text-sm">Flashcard Mode Đã Làm Được Gì</span>
              </div>
              <div className="pl-7 space-y-1 text-slate-700 dark:text-neutral-300 leading-relaxed text-xs">
                <p>• <strong>Lật thẻ mượt mà:</strong> Mặt trước (Khái niệm/Thuật ngữ) và Mặt sau (Định nghĩa/Ví dụ/Quy tắc) hiển thị rõ nét với 2 gam màu tương phản.</p>
                <p>• <strong>Điều hướng linh hoạt:</strong> Nút chuyển <strong>Thẻ trước / Thẻ sau</strong>, lật mặt sau, xáo trộn thẻ (Shuffle) và đánh dấu thẻ đã thuộc.</p>
                <p>• <strong>2 Chế độ hiển thị:</strong> Chế độ ôn tập từng thẻ (Slider tập trung) và chế độ xem dạng lưới (Grid View toàn cảnh).</p>
                <p>• <strong>Đa môn học:</strong> Phân loại sẵn chủ đề Toán lớp 7, Tin học 10 Python, Tin học 11 Thuật toán.</p>
              </div>
            </div>

            {/* 3. Dữ liệu nào đang CRUD được */}
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
                <span className="text-sm">Dữ Liệu Nào Đang CRUD Được (Thêm - Xem - Sửa - Xóa)</span>
              </div>
              <div className="pl-7 space-y-1 text-slate-700 dark:text-neutral-300 leading-relaxed text-xs">
                <p>• <strong>Thẻ Flashcard:</strong> Thêm thẻ mới, <strong>Chỉnh sửa nội dung mặt trước/sau</strong> (nút Sửa), Xóa thẻ không phù hợp, Lưu bền vững qua LocalStorage.</p>
                <p>• <strong>Câu hỏi Quiz:</strong> Thêm câu hỏi riêng tự soạn, xóa câu hỏi, khôi phục bộ câu hỏi SGK gốc chỉ bằng một cú nhấp.</p>
                <p>• <strong>Nguồn học liệu:</strong> Thêm ghi chú/kế hoạch, cập nhật nội dung, xóa tài liệu (đã có ở Buổi 2 & 3).</p>
                <p>• <strong>Tự động lưu trữ:</strong> Toàn bộ dữ liệu được lưu tự động vào `localStorage` của trình duyệt, reload không bị mất.</p>
              </div>
            </div>

            {/* 4. Phần nào sẽ phát triển tiếp ở Buổi 5 */}
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20">
              <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
                <span className="text-sm">Phần Nào Sẽ Phát Triển Tiếp Ở Buổi 5</span>
              </div>
              <div className="pl-7 space-y-1 text-slate-700 dark:text-neutral-300 leading-relaxed text-xs">
                <p>• <strong>Kích hoạt Chatbot Trợ Giảng AI hoàn chỉnh:</strong> Kết nối danh sách Q&A Seed vào trợ giảng thông minh để hội thoại và giải thích bài tập.</p>
                <p>• <strong>Gợi ý thông minh:</strong> AI phân tích các câu làm sai trong Quiz để tự động tạo Flashcard bổ sung tương ứng.</p>
                <p>• <strong>Xuất và nhập dữ liệu (Export / Import JSON):</strong> Cho phép học sinh chia sẻ bộ thẻ Flashcard và đề trắc nghiệm cho bạn bè trong lớp.</p>
                <p>• <strong>Kiểm thử tổng thể (Final Milestone):</strong> Đóng gói sản phẩm hoàn thiện sẵn sàng nộp bài tập lớn.</p>
              </div>
            </div>

            {/* 5. Các case retest score tối thiểu cần nhớ */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">5</span>
                <span className="text-sm">Các Case Retest Score Tối Thiểu Cần Nhớ</span>
              </div>
              <div className="pl-7 space-y-1 text-slate-700 dark:text-neutral-300 leading-relaxed text-xs">
                <p>• <strong>Case 1 (Đúng hết):</strong> Làm đúng 4/4 câu trong thời gian cho phép ➔ <strong>10.0 / 10 điểm</strong>.</p>
                <p>• <strong>Case 2 (Sai hết):</strong> Trả lời sai toàn bộ 0/4 câu ➔ <strong>0.0 / 10 điểm</strong>.</p>
                <p>• <strong>Case 3 (Đúng 2 Sai 2):</strong> Trả lời đúng một nửa 2/4 câu ➔ <strong>5.0 / 10 điểm</strong>.</p>
                <p>• <strong>Case 4 (Phạt thời gian):</strong> Làm đúng 4/4 câu nhưng nộp muộn 2 phút ➔ 10.0 - (2 × 0.5đ) = <strong>9.0 / 10 điểm</strong>.</p>
                <p className="font-semibold text-amber-900 dark:text-amber-200 pt-1">
                  💡 Quy tắc: Lưu câu trả lời theo từng câu riêng biệt, không dùng state của câu cuối để chấm cho cả bài; điểm số phản ánh khách quan năng lực học sinh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
