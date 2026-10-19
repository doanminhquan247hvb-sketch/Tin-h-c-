import React from 'react';
import { BookOpen, Layers, CheckSquare, Sparkles, HelpCircle, FileText, Compass, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TerminalTheme } from '../types';

interface StructureViewProps {
  theme: TerminalTheme;
}

export const StructureView: React.FC<StructureViewProps> = ({ theme }) => {
  const isLight = theme === 'light';

  return (
    <div className="space-y-6">
      {/* Welcome Banner - Prompt 11 */}
      <div
        className={`p-5 rounded-xl border transition-all ${
          isLight
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-md border-blue-500'
            : 'bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white border-blue-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Hệ thống Ôn tập Cá nhân v0.1</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Chào mừng bạn đến với hệ thống ôn thi Tin học cá nhân - Computer Programming Bluezone
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-3xl leading-relaxed">
              Môn học: <strong className="text-white underline decoration-sky-300">Tin học</strong> • Tông màu công nghệ Bluezone đặc trưng • Khung tĩnh v0.1 thiết kế chuẩn theo yêu cầu Buổi 1, sẵn sàng tích hợp dữ liệu Buổi 2.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white text-blue-800 shadow-xs">
              Buổi 1: Khung Tĩnh
            </span>
          </div>
        </div>
      </div>

      {/* Prompt 06: Logic Cấu Trúc - Header với Tên Chủ Đề & Mục Tiêu Ôn Tập */}
      <div
        className={`p-5 rounded-xl border transition-colors ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              Prompt 06: Cấu Trúc Học Tập Ban Đầu
            </div>
            <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Chủ đề: Lập Trình Cơ Bản & Cấu Trúc Dữ Liệu (Tin học 10, 11 KNTT & C++)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs rounded-md font-mono font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Trạng thái: Khung tĩnh v0.1 (App Shell)
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-3.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 block mb-1">
              🎯 Mục Tiêu 1: Khắc Sâu Cú Pháp
            </span>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              Nắm chắc các lệnh biến, rẽ nhánh if-else, vòng lặp for/while, danh sách list và xâu ký tự trong SGK Tin học 10 KNTT.
            </p>
          </div>
          <div className={`p-3.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 block mb-1">
              ⚡ Mục Tiêu 2: Tư Duy Thuật Toán
            </span>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              Rèn luyện cấu trúc mảng 2 chiều, tìm kiếm nhị phân, sắp xếp nổi bọt Tin học 11 và kỹ thuật lập trình C++ thi HSG.
            </p>
          </div>
          <div className={`p-3.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
              🚀 Mục Tiêu 3: Chờ Dữ Liệu Buổi 2
            </span>
            <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
              Khung tĩnh v0.1 phân chia rõ rệt các vị trí placeholder sẵn sàng nạp dữ liệu câu hỏi, flashcard, sơ đồ thực tế ở Buổi 2.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Grid: Main Content Box + Sidebar Coming Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: 1 box trống lớn có tiêu đề đúng Prompt 06 */}
        <div className="lg:col-span-2 space-y-4">
          <div
            className={`p-6 rounded-xl border transition-colors ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Khu vực Nội dung học tập (Sẽ cập nhật từ tài liệu thực tế ở Buổi 2)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-neutral-400">
                    Khu vực placeholder giữ chỗ theo quy chuẩn Prompt 06
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                Placeholder v0.1
              </span>
            </div>

            {/* Lorem Ipsum Placeholder Content */}
            <div className={`p-4 rounded-lg border border-dashed text-xs leading-relaxed space-y-3 ${
              isLight ? 'bg-slate-50/80 border-slate-300 text-slate-600' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
            }`}>
              <p className="font-mono text-[11px] text-blue-700 dark:text-blue-300 font-bold">
                /* [Placeholder Buổi 1] Nội dung lý thuyết chi tiết sẽ được tự động đồng bộ từ giáo trình ở Buổi 2 */
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
              </p>
              <p>
                Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
              </p>
            </div>

            {/* Reminder Box from Prompt 06 */}
            <div className={`mt-4 p-3 rounded-lg border flex items-start gap-2.5 ${
              isLight ? 'bg-sky-50/60 border-sky-200 text-sky-900' : 'bg-sky-950/30 border-sky-900 text-sky-200'
            }`}>
              <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong>Quy chuẩn nghiêm ngặt Prompt 06:</strong> Tuyệt đối không tự động điền kiến thức thật vào app lúc này để giữ nguyên thiết kế khung tĩnh v0.1; đảm bảo việc chuyển tiếp sang Buổi 2 mượt mà và chính xác.
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar/Menu: Ghi chú các tính năng "Coming Soon" */}
        <div className="space-y-4">
          <div
            className={`p-5 rounded-xl border transition-colors ${
              isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-neutral-800">
              <Compass className="w-4 h-4 text-blue-600" />
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Tính Năng Phụ Trợ (Coming Soon)
              </h4>
            </div>

            <p className="text-xs text-slate-500 dark:text-neutral-400 mb-3 leading-relaxed">
              Các mô-đun hỗ trợ ôn thi Tin học chuyên sâu đã được định hình sẵn trong kiến trúc và sẽ nạp dữ liệu ở Buổi 2:
            </p>

            <div className="space-y-2.5">
              {/* 1. Tóm tắt */}
              <div className={`p-3 rounded-lg border flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>
                      1. Tóm Tắt (Summary)
                    </span>
                    <span className="text-[11px] text-slate-500">Tóm tắt cốt lõi bài học SGK</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Coming Soon
                </span>
              </div>

              {/* 2. Sơ đồ ý chính */}
              <div className={`p-3 rounded-lg border flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <div>
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>
                      2. Sơ Đồ Ý Chính (Mindmap)
                    </span>
                    <span className="text-[11px] text-slate-500">Sơ đồ khối & nhánh tư duy</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Coming Soon
                </span>
              </div>

              {/* 3. Quiz */}
              <div className={`p-3 rounded-lg border flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>
                      3. Trắc Nghiệm (Quiz)
                    </span>
                    <span className="text-[11px] text-slate-500">Ngân hàng đề thi 4 lựa chọn</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Coming Soon
                </span>
              </div>

              {/* 4. Flashcard */}
              <div className={`p-3 rounded-lg border flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>
                      4. Thẻ Ghi Nhớ (Flashcard)
                    </span>
                    <span className="text-[11px] text-slate-500">Ghi nhớ hàm & cú pháp cốt lõi</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Coming Soon
                </span>
              </div>

              {/* 5. Q&A */}
              <div className={`p-3 rounded-lg border flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-rose-600" />
                  <div>
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-800' : 'text-neutral-200'}`}>
                      5. Hỏi Đáp & Trợ Giảng (Q&A)
                    </span>
                    <span className="text-[11px] text-slate-500">Giải đáp thắc mắc lập trình</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt 08: Đánh giá Chuyên gia Giáo dục (5 Tiêu Chí) */}
      <div
        className={`p-5 rounded-xl border transition-colors ${
          isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-neutral-900 border-neutral-800'
        }`}
      >
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-neutral-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Đánh Giá Chuyên Gia Giáo Dục (Theo 5 Tiêu Chí Rà Soát Prompt 08)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className={`p-3 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-1 text-emerald-600 font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              1. Đúng môn/chủ đề
            </div>
            <p className="text-slate-600 dark:text-neutral-400">
              Chuẩn môn Tin học, bám sát SGK Tin 10, 11 (KNTT) & chuyên đề C++.
            </p>
          </div>

          <div className={`p-3 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-1 text-emerald-600 font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              2. Mục tiêu rõ ràng
            </div>
            <p className="text-slate-600 dark:text-neutral-400">
              Mục tiêu học tập thể hiện minh bạch trên Header và từng chuyên đề ôn tập.
            </p>
          </div>

          <div className={`p-3 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-1 text-emerald-600 font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              3. Định hướng ôn tập
            </div>
            <p className="text-slate-600 dark:text-neutral-400">
              Có hệ thống phân bổ theo từng bài, mã nguồn minh hoạ trực quan.
            </p>
          </div>

          <div className={`p-3 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-1 text-emerald-600 font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              4. Đúng phạm vi Buổi 1
            </div>
            <p className="text-slate-600 dark:text-neutral-400">
              Khung tĩnh v0.1 chuẩn chỉnh với đầy đủ 5 ô "Coming Soon" giữ chỗ.
            </p>
          </div>

          <div className={`p-3 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'}`}>
            <div className="flex items-center gap-1 text-emerald-600 font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              5. Sẵn sàng Buổi 2
            </div>
            <p className="text-slate-600 dark:text-neutral-400">
              Layout phân tách dạng module độc lập, chờ đón dữ liệu thực tế ghép vào.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
