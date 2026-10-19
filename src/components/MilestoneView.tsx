import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Flag, 
  BookOpen, 
  Code2, 
  Layers, 
  Clock, 
  Sparkles, 
  FileText, 
  Copy, 
  Check, 
  Calendar, 
  Target, 
  Cpu, 
  HelpCircle, 
  CheckSquare, 
  FolderCheck,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { TerminalTheme } from '../types';
import { StudyPackAuditView } from './StudyPackAuditView';

interface MilestoneViewProps {
  theme: TerminalTheme;
}

export const MilestoneView: React.FC<MilestoneViewProps> = ({ theme }) => {
  const isLight = theme === 'light';
  const [copied, setCopied] = useState(false);

  const markdownSummary = `# BẢN GHI CHÚ TIẾN ĐỘ DỰ ÁN (MILESTONE 1)
Hệ thống: Computer Programming Bluezone

1. Tên app & Môn học trung tâm:
   - Tên ứng dụng: Computer Programming Bluezone
   - Môn học trung tâm: Tin học (Lập trình Python 10, 11 Kết Nối Tri Thức & Chuyên đề Thuật toán C++)

2. Mục tiêu học tập chính:
   - Hệ thống hóa toàn diện kiến thức Tin học THPT theo chuẩn SGK KNTT (Bài 1 - Bài 25+).
   - Rèn luyện kỹ năng đọc hiểu cú pháp mã nguồn, luồng dữ liệu, thuật toán sắp xếp/tìm kiếm và cấu trúc dữ liệu cơ bản.
   - Cung cấp không gian ôn thi cá nhân tập trung, không phân tâm, với tông màu công nghệ Bluezone và âm thanh gõ phím êm dịu.

3. Trạng thái hiện tại:
   - ĐÃ HOÀN THÀNH App Shell v0.1 (Khung giao diện tĩnh 100%).
   - Bố cục responsive, đã rà soát gỡ bỏ toàn bộ logic chạy tự động vượt rào (không auto-quiz, không chatbot backend, không tràn layout).
   - Sẵn sàng đầy đủ khung UI với hệ thống phông chữ chuẩn (Python, Arial, Calibri, Times New Roman, Segoe UI) và âm thanh bàn phím nhẹ nhàng.

4. Liệt kê các module đã tạo sẵn UI Placeholder (Coming Soon):
   - Module 1: Tóm tắt bài học lý thuyết (Summary) - [Coming Soon • Chờ Buổi 2]
   - Module 2: Sơ đồ ý chính & Tư duy thuật toán (Mindmap) - [Coming Soon • Chờ Buổi 2]
   - Module 3: Ngân hàng câu hỏi trắc nghiệm (Quiz) - [Coming Soon • Chờ Buổi 2]
   - Module 4: Thẻ ghi nhớ cú pháp & hàm (Flashcards) - [Coming Soon • Chờ Buổi 3]
   - Module 5: Trợ giảng giải đáp thắc mắc (Q&A Chatbot) - [Coming Soon • Chờ Buổi 4]

5. Kế hoạch Buổi 2:
   - Sẵn sàng nạp học liệu thực tế từ file PDF/văn bản/URL bài học SGK Tin học 10 & 11 để AI phân tích bóc tách kiến thức.
   - Kích hoạt dữ liệu nội dung thật vào khung hiển thị lớn thay thế nội dung placeholder tạm thời.
   - Đồng bộ danh mục bài học và bộ câu hỏi trắc nghiệm vào cơ sở dữ liệu học tập.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="milestone-view-screen" className="space-y-6">
      {/* Header Banner - Prompt 12 */}
      <div
        className={`p-5 rounded-xl border transition-all ${
          isLight
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-white shadow-md border-emerald-500'
            : 'bg-gradient-to-r from-emerald-950 via-teal-950 to-neutral-900 text-white border-emerald-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs mb-2">
              <Flag className="w-3.5 h-3.5 text-emerald-200" />
              <span>Prompt 12: Đóng Gói Dự Án & Nghiệm Thu</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Danh Mục Nghiệm Thu (Milestone 1) - Buổi 1
            </h2>
            <p className="text-sm text-emerald-100 mt-1 max-w-3xl leading-relaxed">
              Tổng kết App Shell v0.1 tĩnh hoàn chỉnh cho ứng dụng <strong className="text-white underline decoration-emerald-300">Computer Programming Bluezone</strong> (Môn Tin học).
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-white text-emerald-800 hover:bg-emerald-50 shadow-xs transition-colors cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép ghi chú' : 'Sao chép Ghi chú Tiến độ'}</span>
          </button>
        </div>
      </div>

      {/* Bảng Đánh Giá & Nghiệm Thu 4 Mục Yêu Cầu Cốt Lõi */}
      <div className={`p-5 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-neutral-800 flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Bảng Đánh Giá Nghiệm Thu 4 Mục Cốt Lõi</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Kiểm tra tính sẵn sàng: Đã làm (Có ✓) • Tiết kiệm token • Không tồn đọng
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
            Tất cả 4/4 mục: ĐÃ LÀM (CÓ ✓)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mục 1 */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Hoàn thành và tinh chỉnh giao diện đã tạo
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white shrink-0">
                CÓ ✓
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-neutral-300 mt-2 pl-8 leading-relaxed">
              Toàn bộ thanh điều hướng, chế độ sáng/tối, 4 hình nền mờ, tốc độ gõ phím, âm thanh cơ học, chọn phông chữ và bố cục đều đã tinh chỉnh trau chuốt, responsive 100%.
            </p>
          </div>

          {/* Mục 2 */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Hoàn thành các tác vụ CRUD và lưu bằng Local Storage
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white shrink-0">
                CÓ ✓
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-neutral-300 mt-2 pl-8 leading-relaxed">
              Hỗ trợ đầy đủ Thêm (Create), Đọc (Read), Xóa (Delete), Khôi phục (Reset) và tự động đồng bộ tức thì vào LocalStorage: học liệu, câu hỏi trắc nghiệm, flashcard, Q&A seed.
            </p>
          </div>

          {/* Mục 3 */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Hoàn chỉnh các yêu cầu như tạo Quiz flashcard cơ bản
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white shrink-0">
                CÓ ✓
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-neutral-300 mt-2 pl-8 leading-relaxed">
              Tạo Quiz 4 dạng (Đúng/Sai, Lựa chọn, Điền từ, Hỏi-đáp) và Thẻ Flashcard 2 mặt (Gradient Xanh - Hồng) bám sát các nhóm: Khái niệm, Định nghĩa, Ví dụ, Phân biệt, Quy tắc.
            </p>
          </div>

          {/* Mục 4 */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">4</span>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Hiểu rõ những nguyên tắc khi sử dụng AI
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white shrink-0">
                CÓ ✓
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-neutral-300 mt-2 pl-8 leading-relaxed">
              Đã xây dựng riêng chuyên mục "Nguyên Tắc AI" chuẩn GDPT 2018: Đạo đức học đường, liêm chính học thuật, chống ảo giác (hallucination), kiểm chứng chéo và prompt engineering chuẩn mực.
            </p>
          </div>
        </div>
      </div>

      {/* Tích hợp Prompt #07: Kiểm tra Study Pack (CHECK) & Prompt #10: Tổng kết & Mở sang Buổi 4 (PLAN/NOTE) */}
      <StudyPackAuditView theme={theme} />

      {/* 4 Hộp Nghiệm Thu Cầm Chắc Trong Tay (Hình 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
            isLight
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
              Mục nghiệm thu 1
            </span>
            <h4 className="text-sm font-bold">1 Project trên GAS</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1">
              Dự án đã thiết lập hoàn tất trong môi trường AI Studio.
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
            isLight
              ? 'bg-blue-50/70 border-blue-200 text-blue-950'
              : 'bg-blue-950/30 border-blue-800 text-blue-200'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-0.5">
              Mục nghiệm thu 2
            </span>
            <h4 className="text-sm font-bold">1 Môn/chủ đề chốt cứng</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1">
              Tin học (Lập trình Python 10, 11 KNTT & Chuyên đề C++).
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
            isLight
              ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
              : 'bg-indigo-950/30 border-indigo-800 text-indigo-200'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block mb-0.5">
              Mục nghiệm thu 3
            </span>
            <h4 className="text-sm font-bold">1 App shell tĩnh (v0.1)</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1">
              Giao diện tĩnh chuẩn, không vượt rào logic, bố cục gọn gàng.
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
            isLight
              ? 'bg-teal-50/70 border-teal-200 text-teal-950'
              : 'bg-teal-950/30 border-teal-800 text-teal-200'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 block mb-0.5">
              Mục nghiệm thu 4
            </span>
            <h4 className="text-sm font-bold">Bản ghi chú Dự án</h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1">
              Đầy đủ 5 mục theo quy định đóng gói dự án của Prompt 12.
            </p>
          </div>
        </div>
      </div>

      {/* Bản Ghi Chú Tiến Độ Chi Tiết Theo 5 Mục Của Prompt 12 */}
      <div
        className={`border rounded-xl p-6 transition-colors ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
        }`}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Bản "Ghi Chú Tiến Độ" Chi Tiết (Chuẩn Cấu Trúc 5 Phần Prompt 12)
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Lưu trữ định hướng sản phẩm và cam kết phạm vi cho Buổi 2
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Trạng thái: Đã Hoàn Thành v0.1
          </span>
        </div>

        <div className="space-y-6 text-sm">
          {/* 1. Tên app & Môn học trung tâm */}
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs">1</span>
              <span>Tên App & Môn Học Trung Tâm</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8 text-xs">
              <div>
                <span className="font-semibold text-slate-500 dark:text-neutral-400 block">Tên ứng dụng chính thức:</span>
                <strong className={`text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Computer Programming Bluezone</strong>
              </div>
              <div>
                <span className="font-semibold text-slate-500 dark:text-neutral-400 block">Môn học trung tâm:</span>
                <strong className={`text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Tin học (SGK Tin học 10 & 11 KNTT + C++)</strong>
              </div>
            </div>
          </div>

          {/* 2. Mục tiêu học tập chính */}
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs">2</span>
              <span>Mục Tiêu Học Tập Chính</span>
            </div>
            <ul className="list-disc list-inside space-y-1.5 pl-8 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
              <li>Hệ thống hóa toàn diện các khối kiến thức cốt lõi môn Tin học lớp 10 và 11 theo sách Kết Nối Tri Thức (từ Bài 1 đến Bài 25+).</li>
              <li>Hình thành phản xạ đọc hiểu mã nguồn Python & tư duy cấu trúc dữ liệu, thuật toán (mảng, xâu, hàm, sắp xếp, tìm kiếm nhị phân).</li>
              <li>Cung cấp môi trường ôn luyện tĩnh chuyên biệt, tập trung cao độ với âm thanh phím nhẹ nhàng và tính năng chuyển đổi 5 phông chữ tùy chọn.</li>
            </ul>
          </div>

          {/* 3. Trạng thái hiện tại: Đã hoàn thành App Shell v0.1 */}
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs">3</span>
              <span>Trạng Thái Hiện Tại: Đã Hoàn Thành App Shell v0.1 (Khung Giao Diện Tĩnh)</span>
            </div>
            <div className="pl-8 text-xs text-slate-700 dark:text-neutral-300 space-y-2 leading-relaxed">
              <p>
                - Đã xử lý triệt để các nguy cơ vượt phạm vi theo <strong>Prompt 10 (Debug)</strong>: Không cố chạy logic chấm điểm quiz tự động, không tích hợp bot trả lời thật, bố cục không tràn màn hình, thiết kế chuẩn một hệ thống học tập học đường.
              </p>
              <p>
                - Toàn bộ các vùng dữ liệu được tổ chức dưới dạng <strong>Placeholder tĩnh</strong>, giữ nguyên các thẻ "Coming Soon" đang chờ dữ liệu thực tế cho Buổi 2.
              </p>
            </div>
          </div>

          {/* 4. Liệt kê các module đã tạo sẵn UI placeholder */}
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs">4</span>
              <span>Các Module Đã Tạo Sẵn UI Placeholder (Các Phần Coming Soon)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-8 pt-1 text-xs">
              <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
                <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">1. Tóm Tắt (Summary)</span>
                <span className="text-[11px] text-slate-500">Khung bài học SGK (Placeholder Chờ Buổi 2)</span>
              </div>
              <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">2. Sơ Đồ Ý Chính (Mindmap)</span>
                <span className="text-[11px] text-slate-500">Sơ đồ khối & nhánh tư duy thuật toán (Coming Soon)</span>
              </div>
              <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">3. Trắc Nghiệm (Quiz)</span>
                <span className="text-[11px] text-slate-500">Khung câu hỏi 4 lựa chọn (Placeholder Buổi 2)</span>
              </div>
              <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">4. Thẻ Ghi Nhớ (Flashcard)</span>
                <span className="text-[11px] text-slate-500">Thẻ từ vựng & cú pháp hàm (Placeholder Buổi 3)</span>
              </div>
              <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">5. Hỏi Đáp & Trợ Giảng (Q&A)</span>
                <span className="text-[11px] text-slate-500">Khung trò chuyện trợ giảng AI (Placeholder Buổi 4)</span>
              </div>
              <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
                <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">6. Code Terminal Mẫu</span>
                <span className="text-[11px] text-slate-500">Khung đọc cú pháp bài học tĩnh, gõ phím nhẹ nhàng</span>
              </div>
            </div>
          </div>

          {/* 5. Kế hoạch Buổi 2 */}
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-2 font-bold text-sky-700 dark:text-sky-400 mb-2">
              <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center text-xs">5</span>
              <span>Kế Hoạch Buổi 2</span>
            </div>
            <div className="pl-8 text-xs text-slate-700 dark:text-neutral-300 space-y-2 leading-relaxed">
              <p>
                🚀 <strong>Sẵn sàng nhập học liệu thật:</strong> Nhập nội dung chính xác từ file tài liệu, văn bản hoặc đường dẫn (URL) giáo trình Tin học 10 & 11 Kết Nối Tri Thức để AI phân tích chuyên sâu.
              </p>
              <p>
                🎯 <strong>Thay thế Placeholder lớn:</strong> Đưa kiến thức thực tế vào khung trống lớn đã được chuẩn bị ở Buổi 1, chuyển từ chế độ giả định sang tài liệu học tập có cấu trúc chuẩn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
