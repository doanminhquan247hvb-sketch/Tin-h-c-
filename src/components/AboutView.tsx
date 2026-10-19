import React from 'react';
import { CheckCircle2, ShieldCheck, BookOpen, GraduationCap, School, Code2, AlertTriangle, Sparkles, Volume2, Type } from 'lucide-react';
import { TerminalTheme } from '../types';

interface AboutViewProps {
  theme?: TerminalTheme;
}

export const AboutView: React.FC<AboutViewProps> = ({ theme = 'light' }) => {
  const isLight = theme === 'light';

  return (
    <div id="about-screen" className="space-y-6">
      {/* Header Info Banner */}
      <div
        className={`border rounded-xl p-5 transition-colors ${
          isLight
            ? 'bg-white border-blue-100 shadow-xs'
            : 'bg-neutral-950 border-neutral-800'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
              isLight
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2
              className={`text-base md:text-lg font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Hệ Thống Ôn Thi Tin Học Cá Nhân - Computer Programming Bluezone
            </h2>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-500' : 'text-neutral-400'
              }`}
            >
              Môn học: Tin học • Chương trình GDPT 2018 (SGK Kết Nối Tri Thức 10 & 11) + Chuyên đề C++ • Bản v0.1 App Shell
            </p>
          </div>
        </div>

        {/* 4 Feature Badges */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-neutral-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div
            className={`p-3 rounded-lg border ${
              isLight
                ? 'bg-blue-50/60 border-blue-200 text-slate-800'
                : 'bg-neutral-900 border-neutral-800 text-white'
            }`}
          >
            <span className="text-slate-400 block mb-1 text-[11px]">Tên ứng dụng:</span>
            <span className="font-bold text-blue-700 dark:text-blue-400">Computer Programming Bluezone</span>
          </div>
          <div
            className={`p-3 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-neutral-900 border-neutral-800 text-white'
            }`}
          >
            <span className="text-slate-400 block mb-1 text-[11px]">Môn học:</span>
            <span className="font-bold text-indigo-700 dark:text-indigo-400">Tin Học (KNTT 10, 11 & C++)</span>
          </div>
          <div
            className={`p-3 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-neutral-900 border-neutral-800 text-white'
            }`}
          >
            <span className="text-slate-400 block mb-1 text-[11px]">Âm thanh phím:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">Âm êm dịu, nhẹ nhàng (3 chế độ)</span>
          </div>
          <div
            className={`p-3 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-neutral-900 border-neutral-800 text-white'
            }`}
          >
            <span className="text-slate-400 block mb-1 text-[11px]">Phông chữ:</span>
            <span className="font-bold text-sky-700 dark:text-sky-400">Arial, Python, Calibri, Times, Segoe UI</span>
          </div>
        </div>
      </div>

      {/* Prompt 09: Rà Soát Đạo Đức AI Trong Học Đường */}
      <div
        className={`border rounded-xl p-5 transition-colors ${
          isLight
            ? 'bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-yellow-50/50 border-amber-200'
            : 'bg-amber-950/20 border-amber-900'
        }`}
      >
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-amber-200/80 dark:border-amber-900/60">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <h3 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-amber-950' : 'text-amber-300'}`}>
            Đạo Đức & Trách Nhiệm AI Trong Học Đường (Prompt 09)
          </h3>
        </div>

        <div className="space-y-3 text-xs leading-relaxed">
          <div className="p-3.5 rounded-lg bg-white/90 dark:bg-neutral-900 border border-amber-300 dark:border-amber-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 dark:text-amber-300 text-sm mb-1">
                Lưu ý quan trọng:
              </p>
              <p className="text-slate-700 dark:text-neutral-300 font-medium">
                Nội dung học tập do AI hỗ trợ tạo ra luôn cần được kiểm chứng lại với Sách giáo khoa và Giáo viên.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className={`p-3 rounded-lg border ${isLight ? 'bg-white/80 border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
              <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">
                🎓 Vị thế AI: Trợ Giảng Đồng Hành
              </span>
              <p className="text-slate-600 dark:text-neutral-400 text-xs">
                AI đóng vai trò người gợi mở tư duy, diễn giải thuật toán và gợi ý cách tiếp cận bài toán từng bước để học sinh tự làm chủ kiến thức.
              </p>
            </div>

            <div className={`p-3 rounded-lg border ${isLight ? 'bg-white/80 border-slate-200' : 'bg-neutral-900 border-neutral-800'}`}>
              <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
                🚫 Không Phải "Người Làm Bài Hộ"
              </span>
              <p className="text-slate-600 dark:text-neutral-400 text-xs">
                App kiên quyết từ chối giải bài tự động hàng loạt để nộp bài; học sinh bắt buộc phải tự tay gõ lệnh trong terminal để hình thành phản xạ lập trình.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Outline Accordion/Cards */}
      <div
        className={`border rounded-xl p-5 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-black border-neutral-800'
        }`}
      >
        <h3
          className={`text-sm font-bold font-mono mb-4 flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-600" />
          Mục Lục Chương Trình Đã Tích Hợp (Tin 10 Bài 1-26, Tin 11 & Bonus C++)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Tin 10 Column */}
          <div
            className={`p-4 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-neutral-950 border-neutral-900'
            }`}
          >
            <div className="font-bold text-sky-700 mb-2 flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-neutral-800">
              <GraduationCap className="w-4 h-4" />
              TIN HỌC 10 (BÀI 1 ĐẾN 26 KNTT)
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-neutral-300 max-h-[380px] overflow-y-auto pr-1">
              <li>• Bài 1: Thông tin và xử lý thông tin</li>
              <li>• Bài 2: Vai trò của thiết bị thông minh</li>
              <li>• Bài 3: Kiểu mạng máy tính thông dụng</li>
              <li>• Bài 4: Mạng máy tính & Internet (IP)</li>
              <li>• Bài 5: Dữ liệu lôgic & Bảng chân trị</li>
              <li>• Bài 6: Dữ liệu âm thanh và hình ảnh</li>
              <li>• Bài 7: Thiết bị số thông dụng</li>
              <li>• Bài 8: Mạng trong đời sống & Cloud</li>
              <li>• Bài 9: An toàn trên không gian mạng</li>
              <li>• Bài 10: Khai thác tài nguyên Internet</li>
              <li>• Bài 11: Ứng dụng môi trường số</li>
              <li>• Bài 12: Thiết kế đồ hoạ (Vector/Raster)</li>
              <li>• Bài 13: Đối tượng đồ hoạ SVG</li>
              <li>• Bài 14: Đối tượng đường & văn bản</li>
              <li>• Bài 15: Hoàn thiện hình ảnh đồ hoạ</li>
              <li>• Bài 16: Ngôn ngữ bậc cao & Python</li>
              <li>• Bài 17: Biến và lệnh gán (=)</li>
              <li>• Bài 18: Lệnh vào ra đơn giản (input/print)</li>
              <li>• Bài 19: Câu lệnh rẽ nhánh if - elif - else</li>
              <li>• Bài 20: Câu lệnh lặp for & range()</li>
              <li>• Bài 21: Câu lệnh lặp while & UCLN Euclid</li>
              <li>• Bài 22: Kiểu dữ liệu danh sách (List)</li>
              <li>• Bài 23: Thao tác List (append, sort)</li>
              <li>• Bài 24: Xâu ký tự & Cắt lát chuỗi</li>
              <li>• Bài 25: Lệnh xâu (split, join, replace)</li>
              <li>• Bài 26: Hàm trong Python (def & return)</li>
            </ul>
          </div>

          {/* Tin 11 Column */}
          <div
            className={`p-4 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-neutral-950 border-neutral-900'
            }`}
          >
            <div className="font-bold text-emerald-700 mb-2 flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-neutral-800">
              <Code2 className="w-4 h-4" />
              TIN HỌC 11 (CẤU TRÚC & THUẬT TOÁN)
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-neutral-300">
              <li>• Bài 1: Danh sách 2 chiều (Ma trận số)</li>
              <li>• Bài 2: Tìm kiếm nhị phân (Binary Search)</li>
              <li>• Bài 3: Sắp xếp nổi bọt (Bubble Sort)</li>
              <li>• Bài 4: Thao tác với tệp văn bản (File I/O)</li>
              <li>• Bài 5: Thuật toán đệ quy (Recursion)</li>
              <li className="text-slate-400 pt-3 italic">
                * Học sinh ôn tập cấu trúc dữ liệu và độ phức tạp thuật toán để chuẩn bị cho các bài thi cuối kỳ.
              </li>
            </ul>
          </div>

          {/* Bonus C++ Column */}
          <div
            className={`p-4 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-neutral-950 border-neutral-900'
            }`}
          >
            <div className="font-bold text-amber-700 mb-2 flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-neutral-800">
              <Code2 className="w-4 h-4" />
              BONUS: C++ THPT & THI HSG (10 BÀI)
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-neutral-300">
              <li>• C++ Bài 1: Cấu trúc chương trình & cout</li>
              <li>• C++ Bài 2: Biến, kiểu dữ liệu & cin/cout</li>
              <li>• C++ Bài 3: Rẽ nhánh if-else & switch</li>
              <li>• C++ Bài 4: Vòng lặp for, while, do-while</li>
              <li>• C++ Bài 5: Mảng 1 chiều & std::vector</li>
              <li>• C++ Bài 6: Ma trận 2 chiều trong C++</li>
              <li>• C++ Bài 7: Xử lý xâu std::string</li>
              <li>• C++ Bài 8: Hàm & Truyền tham chiếu (&)</li>
              <li>• C++ Bài 9: Thư viện STL sort() & binary_search</li>
              <li>• C++ Bài 10: Xử lý tệp freopen() thi HSG</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance Checklist Table */}
      <div
        className={`border rounded-xl p-5 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-black border-neutral-800'
        }`}
      >
        <h3
          className={`text-sm font-bold font-mono mb-4 flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Tiêu Chí Nghiệm Thu Bản v0.1 (App Shell)
        </h3>

        <div className="space-y-3 font-mono text-xs">
          <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-neutral-950 border-neutral-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span
                className={`font-semibold block mb-0.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                1. Giao diện sáng rõ, thân thiện cho học sinh (cập nhật theo yêu cầu):
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
                Đã đổi sang tông màu sáng học đường dễ đọc, sạch sẽ, có nút chuyển đổi giao diện Sáng / Tối linh hoạt.
              </span>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-neutral-950 border-neutral-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span
                className={`font-semibold block mb-0.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                2. Khung nội dung bám sát SGK Tin học 10 & 11 Kết nối tri thức:
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
                Đầy đủ bài học lý thuyết cơ bản (Bài 16-26 Tin 10) và chuyên đề nâng cao (Tin 11), có code mẫu và STDOUT chính xác.
              </span>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-neutral-950 border-neutral-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span
                className={`font-semibold block mb-0.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                3. Hiệu ứng gõ phím chân thực kèm âm thanh phím cơ:
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
                Mô phỏng gõ từng ký tự với âm thanh switch cơ học tổng hợp từ Web Audio API không tốn tài nguyên.
              </span>
            </div>
          </div>

          <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-neutral-950 border-neutral-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span
                className={`font-semibold block mb-0.5 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                4. Giữ đúng chuẩn App Shell v0.1 với nhãn Coming Soon:
              </span>
              <span className={isLight ? 'text-slate-600' : 'text-neutral-400'}>
                Không kích hoạt logic giả; các mô-đun Trắc nghiệm (Buổi 2), Flashcards (Buổi 3), AI Chatbot (Buổi 4) đã sẵn sàng khung giao diện.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
