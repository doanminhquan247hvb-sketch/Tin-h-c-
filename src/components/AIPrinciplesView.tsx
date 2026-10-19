import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, BookOpen, CheckCircle2, XCircle, 
  HelpCircle, Sparkles, Award, Lock, Brain, FileCheck, ArrowRight,
  RotateCcw, Scale, Check, Copy
} from 'lucide-react';
import { TerminalTheme, AppLanguage } from '../types';
import { playMechanicalKeyClick } from '../utils/audio';

interface AIPrinciplesViewProps {
  theme?: TerminalTheme;
  language?: AppLanguage;
  onNavigateToPractice?: () => void;
}

interface ScenarioQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const AI_SCENARIOS: ScenarioQuestion[] = [
  {
    id: 1,
    question: 'Khi gặp bài tập lập trình về nhà (VD: Thuật toán sắp xếp nổi bọt Tin 11) chưa nghĩ ra cách làm, cách dùng AI nào sau đây là ĐÚNG NGUYÊN TẮC?',
    context: 'Tình huống học tập: Bài tập về nhà môn Tin học THPT',
    options: [
      {
        text: 'Chụp ảnh đề bài gửi AI, yêu cầu viết toàn bộ code và dán thẳng vào bài nộp cho thầy cô.',
        isCorrect: false,
        explanation: 'SAI NGUYÊN TẮC: Đây là hành vi gian lận học thuật ("nhờ làm bài hộ"), khiến bạn mất cơ hội rèn luyện tư duy thuật toán và chắc chắn sẽ không thể làm được bài khi thi trực tiếp trên giấy hoặc phòng máy.'
      },
      {
        text: 'Hỏi AI: "Hãy giải thích ý tưởng thuật toán sắp xếp nổi bọt từng bước và cho em câu hỏi gợi ý để em tự viết code bằng Python."',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: AI đóng vai trò là Trợ giảng đồng hành (Co-pilot), giải thích logic và khơi gợi tư duy để chính bạn là người viết ra dòng code của mình.'
      },
      {
        text: 'Không dùng AI và bỏ trắng bài tập vì sợ vi phạm nội quy.',
        isCorrect: false,
        explanation: 'CHƯA TỐI ƯU: AI là công cụ hỗ trợ học tập đắc lực của thời đại số. Bạn hoàn toàn có quyền sử dụng AI đúng nguyên tắc để học hỏi phương pháp tư duy.'
      }
    ]
  },
  {
    id: 2,
    question: 'AI gợi ý cho bạn một đoạn mã Python sử dụng thư viện rất mới lạ mà trong SGK Tin học 10 & 11 không có. Bạn nên làm gì?',
    context: 'Tình huống kiểm chứng kiến thức (Fact-Checking)',
    options: [
      {
        text: 'Tin tưởng hoàn toàn vì AI thông minh hơn con người và nộp bài luôn.',
        isCorrect: false,
        explanation: 'SAI: AI có thể tạo ra mã không tương thích với phiên bản chấm thi của nhà trường, hoặc sử dụng thư viện ngoài phạm vi chuẩn SGK GDPT 2018.'
      },
      {
        text: 'Kiểm tra lại với Sách Giáo Khoa (Bộ Kết Nối Tri Thức), tìm hiểu xem bài học đang yêu cầu giải thuật gì, hoặc hỏi lại Giáo viên bộ môn trước khi áp dụng.',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Nguyên tắc số 2 yêu cầu "Kiểm chứng bắt buộc với SGK và Giáo viên bộ môn". Kiến thức thi cử THPT luôn bám sát chuẩn chương trình GDPT 2018.'
      },
      {
        text: 'Xóa toàn bộ mã và không bao giờ hỏi AI về lập trình nữa.',
        isCorrect: false,
        explanation: 'KHÔNG CẦN THIẾT: Bạn chỉ cần nhắc nhở AI trong prompt: "Hãy dùng cú pháp Python cơ bản theo đúng SGK Tin 10 Kết Nối Tri Thức".'
      }
    ]
  },
  {
    id: 3,
    question: 'Khi nhập prompt đặt câu hỏi cho AI trợ giảng môn Tin học, thông tin nào sau đây TUYỆT ĐỐI KHÔNG ĐƯỢC NHẬP?',
    context: 'Tình huống an toàn thông tin & quyền riêng tư học đường',
    options: [
      {
        text: 'Đoạn code bị lỗi SyntaxError hoặc Index out of range.',
        isCorrect: false,
        explanation: 'Đoạn code bài học là thông tin học thuật hoàn toàn an toàn để đưa vào AI phân tích lỗi.'
      },
      {
        text: 'Họ tên đầy đủ của bạn, lớp, trường THPT đang học, số điện thoại hoặc mật khẩu tài khoản học tập VnEdu/K12Online.',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Nguyên tắc số 3 về Bảo Mật Dữ Liệu nghiêm cấm chia sẻ thông tin định danh cá nhân hoặc mật khẩu trường học lên các nền tảng AI công cộng.'
      },
      {
        text: 'Mô tả đầu vào (Input) và đầu ra (Output) mong muốn của thuật toán.',
        isCorrect: false,
        explanation: 'Mô tả Input/Output là phương pháp đặt câu hỏi (Prompt Engineering) chuẩn mực giúp AI hiểu đúng bài toán.'
      }
    ]
  },
  {
    id: 4,
    question: 'Sau khi AI giải thích xong một thuật toán và đưa ra ví dụ code, bước tiếp theo tốt nhất của bạn là gì?',
    context: 'Tình huống rèn luyện tư duy thực chiến (Hands-on Coding)',
    options: [
      {
        text: 'Chỉ đọc lướt qua một lượt rồi đóng máy tính vì nghĩ mình đã hiểu.',
        isCorrect: false,
        explanation: 'SAI: Đọc hiểu bề mặt khác hoàn toàn với khả năng tự lập trình. Khi ngồi trước màn hình trống hoặc giấy thi, bạn sẽ bị "khựng" nếu không trực tiếp gõ.'
      },
      {
        text: 'Tự tay gõ lại từng dòng lệnh vào Terminal/IDE, tự sửa các lỗi phát sinh, và chạy thử với nhiều bộ test case khác nhau.',
        isCorrect: true,
        explanation: 'CHÍNH XÁC: Lập trình là kỹ năng thực hành. Tự tay gõ phím và debug là con đường duy nhất để biến kiến thức của AI thành kỹ năng phản xạ của chính bạn.'
      },
      {
        text: 'Sao chép và dán vào 10 thư mục khác nhau để lưu trữ.',
        isCorrect: false,
        explanation: 'Lưu trữ không thay thế được việc rèn luyện tư duy và rèn luyện kỹ năng viết mã.'
      }
    ]
  }
];

export const AIPrinciplesView: React.FC<AIPrinciplesViewProps> = ({
  theme = 'light',
  language: _language = 'vi',
  onNavigateToPractice
}) => {
  const isLight = theme === 'light';

  // State for pledge signature
  const [pledgeSigned, setPledgeSigned] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ai_ethics_pledge_signed') === 'true';
    } catch {
      return false;
    }
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem('ai_student_name') || '';
    } catch {
      return '';
    }
  });

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [activePrincipleTab, setActivePrincipleTab] = useState<number>(1);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false
  });

  const handleCopyPrompt = (text: string, id: string) => {
    playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleToggleChecklist = (id: number) => {
    playMechanicalKeyClick();
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    playMechanicalKeyClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSignPledge = () => {
    playMechanicalKeyClick();
    if (!studentName.trim()) {
      alert('Vui lòng nhập họ và tên học sinh để xác nhận cam kết sử dụng AI có trách nhiệm!');
      return;
    }
    try {
      localStorage.setItem('ai_ethics_pledge_signed', 'true');
      localStorage.setItem('ai_student_name', studentName.trim());
      setPledgeSigned(true);
    } catch (e) {
      console.error(e);
      setPledgeSigned(true);
    }
  };

  const handleResetPledge = () => {
    playMechanicalKeyClick();
    try {
      localStorage.removeItem('ai_ethics_pledge_signed');
      setPledgeSigned(false);
    } catch (e) {
      console.error(e);
      setPledgeSigned(false);
    }
  };

  const principlesList = [
    {
      id: 1,
      number: '01',
      title: 'AI Là Trợ Giảng Đồng Hành, Không Làm Bài Hộ',
      tagline: 'Co-Pilot, Not Autopilot',
      icon: <Brain className="w-5 h-5 text-blue-600" />,
      color: 'blue',
      summary: 'Sử dụng AI để thấu hiểu bản chất thuật toán và phương pháp giải, tuyệt đối không chép bài hoặc yêu cầu AI làm thay nghĩa vụ học tập.',
      dos: [
        'Hỏi AI cách phân tích bài toán thành các bước nhỏ hơn (Divide & Conquer).',
        'Nhờ AI giải thích ý nghĩa các dòng code khó hiểu hoặc cú pháp lạ.',
        'Dùng AI để tìm lỗi cú pháp (Syntax) hoặc ngoại lệ (Exception) khi code không chạy được.',
        'Yêu cầu AI đưa ra các gợi ý (hints) dần dần thay vì xem ngay code hoàn chỉnh.'
      ],
      donts: [
        'Copy toàn bộ đề bài vào AI và dán nguyên văn kết quả nộp bài tập về nhà.',
        'Sử dụng AI trong các kỳ kiểm tra, thi cử trực tuyến có quy định tự làm bài.',
        'Để AI làm cùn mòn khả năng tư duy giải thuật độc lập của bản thân.'
      ],
      pedagogyQuote: 'Mục đích cốt lõi của môn Tin học là rèn luyện "Tư duy tính toán" (Computational Thinking). Khi bạn để AI làm hộ, bạn đã tự tước đi cơ hội phát triển trí tuệ của chính mình.'
    },
    {
      id: 2,
      number: '02',
      title: 'Bắt Buộc Kiểm Chứng Với SGK & Giáo Viên',
      tagline: 'Fact-Checking & Curriculum Alignment',
      icon: <FileCheck className="w-5 h-5 text-emerald-600" />,
      color: 'emerald',
      summary: 'Nội dung do AI tạo sinh luôn tiềm ẩn nguy cơ "ảo giác" (hallucination). Luôn đối chiếu với Sách giáo khoa Tin học 10 & 11 (KNTT) và thầy cô.',
      dos: [
        'Đối chiếu các hàm, phương thức được gợi ý với mục lục bài học trong SGK Tin 10 & 11.',
        'Chủ động hỏi giáo viên bộ môn khi AI đưa ra cách giải mâu thuẫn với bài giảng trên lớp.',
        'Kiểm tra lại xem mã nguồn có chạy đúng với dữ liệu thử nghiệm (test cases) chuẩn hay không.',
        'Nhắc AI trong prompt: "Chỉ sử dụng kiến thức theo chương trình GDPT 2018 Tin học THPT Việt Nam".'
      ],
      donts: [
        'Mặc định rằng mọi câu trả lời của AI đều đúng 100%.',
        'Sử dụng các thư viện ngoài phức tạp (như numpy, pandas, sympy...) khi đề bài Tin 10 chỉ yêu cầu dùng vòng lặp for/while cơ bản.',
        'Đem đáp án của AI đi tranh luận tiêu cực với giáo viên mà chưa tự mình kiểm chứng lý thuyết.'
      ],
      pedagogyQuote: 'Sách giáo khoa Kết Nối Tri Thức Với Cuộc Sống do Bộ Giáo Dục & Đào Tạo thẩm định là thước đo chuẩn mực cao nhất cho mọi kỳ thi THPT quốc gia.'
    },
    {
      id: 3,
      number: '03',
      title: 'Bảo Mật Quyền Riêng Tư & An Toàn Không Gian Mạng',
      tagline: 'Data Privacy & Cyber Safety',
      icon: <Lock className="w-5 h-5 text-rose-600" />,
      color: 'rose',
      summary: 'Tuyệt đối không đưa thông tin cá nhân, danh tính học sinh hoặc mật khẩu hệ thống học tập vào bất kỳ câu hỏi nào gửi cho AI.',
      dos: [
        'Chỉ gửi mã nguồn bài học, dữ liệu số nguyên mẫu hoặc văn bản lý thuyết thuần túy.',
        'Ẩn danh hoặc dùng tên biến giả lập (VD: student_a, score_10) khi thực hành bài toán quản lý danh sách.',
        'Tìm hiểu chính sách bảo mật dữ liệu của các nền tảng trí tuệ nhân tạo.'
      ],
      donts: [
        'Nhập họ tên thật kèm ngày sinh, số CCCD, địa chỉ nhà, số điện thoại của bản thân hay bạn bè.',
        'Dán tài khoản hoặc mật khẩu đăng nhập các cổng học tập trực tuyến (vnEdu, K12Online, OLM...).',
        'Tải lên các tài liệu nội bộ, bài kiểm tra chưa được nhà trường công bố ra ngoài.'
      ],
      pedagogyQuote: 'Là công dân số thế hệ mới theo định hướng Tin học ứng dụng (ICT), bảo vệ dữ liệu cá nhân là kỹ năng sinh tồn thiết yếu trong kỷ nguyên số.'
    },
    {
      id: 4,
      number: '04',
      title: 'Liêm Chính Học Thuật & Minh Bạch Bản Quyền',
      tagline: 'Academic Integrity & Transparency',
      icon: <Scale className="w-5 h-5 text-amber-600" />,
      color: 'amber',
      summary: 'Trung thực với bản thân và thầy cô. Luôn công khai minh bạch nếu có sử dụng AI tham khảo trong các đề tài nghiên cứu hoặc dự án lập trình.',
      dos: [
        'Viết chú thích (comment) rõ ràng trong mã nguồn: # Đoạn thuật toán này tham khảo ý tưởng gợi ý từ AI.',
        'Trình bày được từng dòng code do mình viết khi được giáo viên hoặc ban giám khảo vấn đáp.',
        'Tự hào về thành quả lao động trí tuệ do chính bản thân đã nỗ lực tìm tòi, giải quyết.'
      ],
      donts: [
        'Nhận vơ sản phẩm, code ứng dụng do AI sinh ra 100% là do mình tự tay phát triển.',
        'Tham gia các cuộc thi Sáng tạo Khoa học Kỹ thuật (KHKT) THPT bằng sản phẩm sao chép từ AI mà không trích dẫn.',
        'Tạo ra các thông tin sai lệch hoặc văn bản giả mạo bằng công nghệ AI.'
      ],
      pedagogyQuote: 'Điểm số có thể đạt được bằng sự gian lận tạm thời, nhưng kỹ năng và danh dự chỉ có thể xây dựng bằng sự trung thực và nỗ lực bền bỉ.'
    },
    {
      id: 5,
      number: '05',
      title: 'Rèn Luyện Kỹ Năng Lập Trình Thực Chiến',
      tagline: 'Active Hands-On Coding',
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      color: 'indigo',
      summary: 'Đọc hiểu code của AI chỉ là bước khởi đầu. Bạn bắt buộc phải tự tay gõ lại từng dòng code trên bàn phím thì mới biến kiến thức thành kỹ năng thực tế.',
      dos: [
        'Mở Terminal / IDE lên và tự tay gõ từng dòng lệnh, không dùng Copy - Paste liên tục.',
        'Tự tạo bảng chạy tay (Trace Table / Dry Run) với các biến để hiểu vòng lặp chạy như thế nào.',
        'Chủ động thử thay đổi các giá trị đầu vào (Input) để quan sát kết quả thay đổi (Edge Cases).',
        'Tự viết lại thuật toán theo cách hiểu của chính mình sau khi đã được AI giải thích.'
      ],
      donts: [
        'Chỉ lướt mắt đọc code trên màn hình rồi tự cho là mình đã hiểu sâu sắc.',
        'Dựa dẫm hoàn toàn vào tính năng tự động sửa code (Auto-fix) mà không hiểu tại sao code bị sai lỗi ban đầu.',
        'Bỏ qua các bước vẽ sơ đồ khối (Flowchart) của các bài học căn bản Tin học 10.'
      ],
      pedagogyQuote: 'Lập trình giống như học chơi đàn hoặc bơi lội: Bạn không thể biết bơi nếu chỉ xem người khác bơi, và bạn không thể thành lập trình viên nếu không tự tay chạm vào bàn phím.'
    }
  ];

  const currentPrinciple = principlesList.find(p => p.id === activePrincipleTab) || principlesList[0];

  return (
    <div id="ai-principles-screen" className="space-y-6 w-full max-w-7xl mx-auto">
      {/* Hero Banner with Official Pedagogy Badge */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all shadow-sm ${
          isLight
            ? 'bg-gradient-to-br from-blue-50/90 via-white/80 to-indigo-50/80 border-blue-200/80'
            : 'bg-gradient-to-br from-neutral-900/90 via-slate-950/80 to-blue-950/50 border-neutral-800'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  Quy Chuẩn Giáo Dục GDPT 2018
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                  <span>🇻🇳</span> Bắt Buộc Ghi Nhớ
                </span>
                {pledgeSigned && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Đã Cam Kết Sử Dụng AI Có Trách Nhiệm
                  </span>
                )}
              </div>
              <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Hiểu Rõ Những Nguyên Tắc Khi Sử Dụng AI Trong Môn Tin Học THPT
              </h1>
              <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed max-w-3xl ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Trí tuệ nhân tạo (AI) là người bạn đồng hành đắc lực mở ra tương lai công nghệ. Tuy nhiên, để trở thành người làm chủ công nghệ thực thụ thay vì bị phụ thuộc, mỗi học sinh cần nắm vững <strong>5 Nguyên tắc Đạo đức & Phương pháp học tập với AI</strong> dưới đây.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full lg:w-auto">
            {onNavigateToPractice && (
              <button
                onClick={onNavigateToPractice}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Vào Thực Hành Bài 1 - 25</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5 Core Principles Interactive Navigation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <h2 className={`text-sm font-bold uppercase tracking-wider ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>
              5 Nguyên Tắc Cốt Lõi (Click để xem chi tiết từng nguyên tắc)
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Nguyên tắc {currentPrinciple.number} / 05
          </span>
        </div>

        {/* Tabs for 5 principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {principlesList.map(p => {
            const isActive = p.id === activePrincipleTab;
            return (
              <button
                key={p.id}
                onClick={() => {
                  playMechanicalKeyClick();
                  setActivePrincipleTab(p.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[95px] ${
                  isActive
                    ? isLight
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                      : 'bg-blue-600 text-white border-blue-500 shadow-lg scale-[1.02]'
                    : isLight
                      ? 'bg-white/70 hover:bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                      : 'bg-neutral-900/60 hover:bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-blue-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isLight ? 'bg-slate-100 text-slate-600' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    Nguyên tắc {p.number}
                  </span>
                  <div className={`p-1 rounded-lg ${isActive ? 'text-white' : ''}`}>
                    {p.icon}
                  </div>
                </div>
                <div className="font-bold text-xs line-clamp-2 leading-tight">
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Principle Deep Dive Card */}
        <div
          className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all shadow-sm ${
            isLight
              ? 'bg-white/80 border-slate-200'
              : 'bg-neutral-900/80 border-neutral-800'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                {currentPrinciple.icon}
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  NGUYÊN TẮC {currentPrinciple.number} • {currentPrinciple.tagline}
                </div>
                <h3 className={`text-base sm:text-lg font-black ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {currentPrinciple.title}
                </h3>
              </div>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 font-medium">
              Bộ môn: Tin học 10 & 11 (KNTT)
            </div>
          </div>

          <div className="mt-4">
            <p className={`text-sm leading-relaxed font-medium ${
              isLight ? 'text-slate-700' : 'text-slate-200'
            }`}>
              {currentPrinciple.summary}
            </p>
          </div>

          {/* DOs and DONTs Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {/* DOs: Những điều NÊN làm */}
            <div className={`p-4 rounded-xl border ${
              isLight
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                : 'bg-emerald-950/30 border-emerald-800 text-emerald-100'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Học sinh NÊN làm</span>
              </div>
              <ul className="space-y-2 text-xs leading-relaxed">
                {currentPrinciple.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONTs: Những điều TUYỆT ĐỐI TRÁNH */}
            <div className={`p-4 rounded-xl border ${
              isLight
                ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                : 'bg-rose-950/30 border-rose-800 text-rose-100'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-3">
                <XCircle className="w-4 h-4" />
                <span>Học sinh TUYỆT ĐỐI TRÁNH</span>
              </div>
              <ul className="space-y-2 text-xs leading-relaxed">
                {currentPrinciple.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pedagogy Note Quote */}
          <div className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
            isLight
              ? 'bg-blue-50/70 border-blue-200 text-blue-900'
              : 'bg-blue-950/40 border-blue-800 text-blue-200'
          }`}>
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Góc nhìn Sư phạm môn Tin học: </span>
              <span>{currentPrinciple.pedagogyQuote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kho Prompt Chuẩn Sư Phạm [LOẠI: PLAN / NOTE] với CLICK TO COPY */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all shadow-sm ${
          isLight
            ? 'bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border-amber-200/90'
            : 'bg-gradient-to-br from-neutral-900/90 via-amber-950/20 to-neutral-950 border-neutral-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-200/80 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-950 border border-amber-300">
                  LOẠI: PLAN / NOTE
                </span>
                <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Kho Prompt Chuẩn Sư Phạm: 1-Click Copy
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Các câu lệnh mẫu thiết kế chuẩn theo 5 nguyên tắc đạo đức giúp AI hướng dẫn phương pháp mà không giải bài hộ
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300">
            CLICK TO COPY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
          {/* Prompt 1: Co-Pilot Divide & Conquer */}
          <div className="p-3.5 rounded-xl border bg-white/90 dark:bg-neutral-950/80 border-slate-200 dark:border-neutral-800 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200">
                  LOẠI: PLAN • HỎI GỢI Ý
                </span>
                <span className="text-[10px] text-slate-400">Nguyên tắc 01</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                Prompt phân tích bài toán chia để trị (Không giải bài hộ)
              </h4>
              <p className="text-[11px] font-mono text-slate-600 dark:text-neutral-300 bg-slate-50 dark:bg-neutral-900 p-2 rounded border border-slate-200 dark:border-neutral-800 mt-1 leading-relaxed">
                "Tôi đang học Tin học THPT. Đây là đề bài của tôi: [...]. Xin đừng viết code giải hộ. Hãy giúp tôi phân tích bài toán thành 3 bước logic nhỏ hơn và cho tôi câu hỏi gợi ý để tôi tự lập trình bằng Python."
              </p>
            </div>
            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  "Tôi đang học Tin học THPT. Đây là đề bài của tôi: [...]. Xin đừng viết code giải hộ. Hãy giúp tôi phân tích bài toán thành 3 bước logic nhỏ hơn và cho tôi câu hỏi gợi ý để tôi tự lập trình bằng Python.",
                  'prompt-p1'
                )}
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p1'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                }`}
              >
                {copiedPromptId === 'prompt-p1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p1' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 2: Fact-Check SGK KNTT */}
          <div className="p-3.5 rounded-xl border bg-white/90 dark:bg-neutral-950/80 border-slate-200 dark:border-neutral-800 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                  LOẠI: NOTE • KIỂM CHỨNG
                </span>
                <span className="text-[10px] text-slate-400">Nguyên tắc 02</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                Prompt kiểm chứng chéo với chuẩn SGK Kết Nối Tri Thức
              </h4>
              <p className="text-[11px] font-mono text-slate-600 dark:text-neutral-300 bg-slate-50 dark:bg-neutral-900 p-2 rounded border border-slate-200 dark:border-neutral-800 mt-1 leading-relaxed">
                "Hãy đối chiếu đoạn thuật toán này với phạm vi kiến thức Sách Giáo Khoa Tin học 10 & 11 (Bộ Kết Nối Tri Thức Với Cuộc Sống). Liệu cú pháp này có được chấp nhận trong bài thi THPT chính thức không?"
              </p>
            </div>
            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  "Hãy đối chiếu đoạn thuật toán này với phạm vi kiến thức Sách Giáo Khoa Tin học 10 & 11 (Bộ Kết Nối Tri Thức Với Cuộc Sống). Liệu cú pháp này có được chấp nhận trong bài thi THPT chính thức không?",
                  'prompt-p2'
                )}
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p2'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                }`}
              >
                {copiedPromptId === 'prompt-p2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p2' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 3: 3-Week Plan */}
          <div className="p-3.5 rounded-xl border bg-white/90 dark:bg-neutral-950/80 border-slate-200 dark:border-neutral-800 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-200">
                  LOẠI: PLAN • LỘ TRÌNH ÔN THI
                </span>
                <span className="text-[10px] text-slate-400">Nguyên tắc 05</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                Prompt lập lộ trình 3 tuần ôn luyện thuật toán Tin 11
              </h4>
              <p className="text-[11px] font-mono text-slate-600 dark:text-neutral-300 bg-slate-50 dark:bg-neutral-900 p-2 rounded border border-slate-200 dark:border-neutral-800 mt-1 leading-relaxed">
                "Hãy lập cho em kế hoạch học tập 3 tuần để ôn thi Tin học 11: Tuần 1: Mảng & List; Tuần 2: Tìm kiếm tuần tự & nhị phân; Tuần 3: Thuật toán sắp xếp. Mỗi tuần có 2 bài tập rèn luyện trace table."
              </p>
            </div>
            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  "Hãy lập cho em kế hoạch học tập 3 tuần để ôn thi Tin học 11: Tuần 1: Mảng & List; Tuần 2: Tìm kiếm tuần tự & nhị phân; Tuần 3: Thuật toán sắp xếp. Mỗi tuần có 2 bài tập rèn luyện trace table.",
                  'prompt-p3'
                )}
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p3'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                }`}
              >
                {copiedPromptId === 'prompt-p3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p3' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 4: Syntax Traceback & Debugging */}
          <div className="p-3.5 rounded-xl border bg-white/90 dark:bg-neutral-950/80 border-slate-200 dark:border-neutral-800 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200">
                  LOẠI: NOTE • GỠ LỖI CÚ PHÁP
                </span>
                <span className="text-[10px] text-slate-400">Nguyên tắc 03 & 05</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                Prompt gỡ lỗi mã nguồn an toàn (Không gửi dữ liệu cá nhân)
              </h4>
              <p className="text-[11px] font-mono text-slate-600 dark:text-neutral-300 bg-slate-50 dark:bg-neutral-900 p-2 rounded border border-slate-200 dark:border-neutral-800 mt-1 leading-relaxed">
                "Tôi gặp thông báo lỗi: [...]. Đây là đoạn code ẩn danh của tôi: [...]. Hãy giải thích nguyên nhân tại sao lỗi này xảy ra theo cơ chế hoạt động của Python / C++, và hướng dẫn cách sửa."
              </p>
            </div>
            <div className="pt-1 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  "Tôi gặp thông báo lỗi: [...]. Đây là đoạn code ẩn danh của tôi: [...]. Hãy giải thích nguyên nhân tại sao lỗi này xảy ra theo cơ chế hoạt động của Python / C++, và hướng dẫn cách sửa.",
                  'prompt-p4'
                )}
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p4'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                }`}
              >
                {copiedPromptId === 'prompt-p4' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p4' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 5: LOẠI: FUNCTION - Tạo summary và key points từ dữ liệu nguồn đã có */}
          <div className="md:col-span-2 p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-purple-300 border border-purple-500/40">
                    LOẠI: FUNCTION
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Yêu cầu từ bài tập / Hệ thống</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt yêu cầu bổ sung nút / luồng tạo summary và key points từ dữ liệu nguồn đã có
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy bổ sung vào app nút hoặc luồng tạo summary và key points từ dữ liệu nguồn đã có.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- summary ngắn, dễ hiểu</p>
                  <p>- key points rõ ràng</p>
                  <p>- bám đúng phạm vi môn/chủ đề</p>
                  <p>- ưu tiên nội dung cốt lõi, không chỉ lặp keyword bề mặt</p>
                  <p>- dữ liệu sinh ra được lưu lại trong LocalStorage</p>
                  <p>- ngôn ngữ phù hợp học sinh lớp 7 trở lên</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Đã được tích hợp trực tiếp vào màn hình Nhập học liệu & Terminal View
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy bổ sung vào app nút hoặc luồng tạo summary và key points từ dữ liệu nguồn đã có.\n\nYêu cầu:\n- summary ngắn, dễ hiểu\n- key points rõ ràng\n- bám đúng phạm vi môn/chủ đề\n- ưu tiên nội dung cốt lõi, không chỉ lặp keyword bề mặt\n- dữ liệu sinh ra được lưu lại trong LocalStorage\n- ngôn ngữ phù hợp học sinh lớp 7 trở lên`,
                  'prompt-p5-function'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p5-function'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p5-function' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p5-function' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 5.5: Build: Quiz Mode (PROMPT #03) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-emerald-400 border border-emerald-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    PROMPT #03
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Build: Quiz Mode</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt tạo component/screen Quiz Mode trong app React
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy tạo component/screen Quiz Mode trong app React hiện tại.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- hiển thị từng câu hỏi rõ ràng</p>
                  <p>- có lựa chọn đáp án hoặc ô trả lời phù hợp</p>
                  <p>- có nút kiểm tra kết quả</p>
                  <p>- có phản hồi đúng/sai cơ bản</p>
                  <p>- dữ liệu lấy từ quiz đã lưu</p>
                  <p>- lưu câu trả lời theo từng câu, không dùng state của câu cuối để chấm cho cả bài</p>
                  <p>- ưu tiên dễ học, dễ dùng</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Trắc Nghiệm" & "Study Pack"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy tạo component/screen Quiz Mode trong app React hiện tại.\n\nYêu cầu:\n- hiển thị từng câu hỏi rõ ràng\n- có lựa chọn đáp án hoặc ô trả lời phù hợp\n- có nút kiểm tra kết quả\n- có phản hồi đúng/sai cơ bản\n- dữ liệu lấy từ quiz đã lưu\n- lưu câu trả lời theo từng câu, không dùng state của câu cuối để chấm cho cả bài\n- ưu tiên dễ học, dễ dùng`,
                  'prompt-p03-quiz-mode'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p03-quiz-mode'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p03-quiz-mode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p03-quiz-mode' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 5.6: Xem kết quả sau mỗi câu hoặc sau mỗi lượt quiz (PROMPT #03B) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-emerald-400 border border-emerald-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    PROMPT #03B
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Xem kết quả & Điểm số</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt bổ sung chức năng xem kết quả sau mỗi câu hoặc sau mỗi lượt quiz
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy bổ sung chức năng xem kết quả sau mỗi câu hoặc sau mỗi lượt quiz.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- học sinh biết mình đúng hay sai</p>
                  <p>- có gợi ý ngắn để ôn lại</p>
                  <p>- kết quả cuối phải phản ánh đúng số câu đúng / tổng số câu</p>
                  <p>- phù hợp với việc tự học</p>
                  <p>- không cần game hóa quá mạnh</p>
                  <p>- không thêm phần thưởng/điểm số rườm rà</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Thang điểm 10 • Trừ 0.5đ/phút lố • Đỏ ✗ & Xanh ✓
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy bổ sung chức năng xem kết quả sau mỗi câu hoặc sau mỗi lượt quiz.\n\nYêu cầu:\n- học sinh biết mình đúng hay sai\n- có gợi ý ngắn để ôn lại\n- kết quả cuối phải phản ánh đúng số câu đúng / tổng số câu\n- phù hợp với việc tự học\n- không cần game hóa quá mạnh\n- không thêm phần thưởng/điểm số rườm rà`,
                  'prompt-p03b-quiz-result'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p03b-quiz-result'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p03b-quiz-result' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p03b-quiz-result' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 6: Build: Câu hỏi luyện tập cơ bản (PROMPT #04) */}
          <div className="md:col-span-2 p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-emerald-400 border border-emerald-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    PROMPT #04
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Build: Câu hỏi luyện tập cơ bản</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt yêu cầu tạo bộ câu hỏi luyện tập cơ bản (Đúng/Sai, Lựa chọn, Điền từ, Hỏi-đáp)
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy bổ sung chức năng tạo bộ câu hỏi luyện tập cơ bản cho chủ đề đang học.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- có nhiều dạng ở mức cơ bản: đúng/sai, lựa chọn, điền từ ngắn, hỏi–đáp ngắn</p>
                  <p>- phù hợp học sinh lớp [điền ở đây]</p>
                  <p>- ưu tiên giúp ôn bài trên trường</p>
                  <p>- chưa cần game hóa mạnh</p>
                  <p>- lưu được danh sách câu hỏi vào LocalStorage</p>
                  <p>- tránh câu hỏi quá chung chung hoặc quá meta; ưu tiên câu hỏi bám kiến thức thật</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Đã tích hợp đầy đủ vào Chuyên mục "Trắc Nghiệm"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy bổ sung chức năng tạo bộ câu hỏi luyện tập cơ bản cho chủ đề đang học.\n\nYêu cầu:\n- có nhiều dạng ở mức cơ bản: đúng/sai, lựa chọn, điền từ ngắn, hỏi-đáp ngắn\n- phù hợp học sinh lớp [điền ở đây]\n- ưu tiên giúp ôn bài trên trường\n- chưa cần game hóa mạnh\n- lưu được danh sách câu hỏi vào LocalStorage\n- tránh câu hỏi quá chung chung hoặc quá meta; ưu tiên câu hỏi bám kiến thức thật`,
                  'prompt-p6-quiz-function'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p6-quiz-function'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p6-quiz-function' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p6-quiz-function' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 7: Build: Flashcard Mode (PROMPT #05) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-pink-400 border border-pink-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-pink-950 text-pink-300 border border-pink-800">
                    PROMPT #05
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Build: Flashcard Mode</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt tạo component/screen Flashcard Mode trong app React
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy tạo component/screen Flashcard Mode trong app React hiện tại.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- có thể lật thẻ</p>
                  <p>- chuyển thẻ trước/sau</p>
                  <p>- hiển thị rõ mặt trước và mặt sau</p>
                  <p>- dễ dùng trên giao diện học tập</p>
                  <p>- phù hợp nhiều môn học</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Flashcards" & "Study Pack"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy tạo component/screen Flashcard Mode trong app React hiện tại.\n\nYêu cầu:\n- có thể lật thẻ\n- chuyển thẻ trước/sau\n- hiển thị rõ mặt trước và mặt sau\n- dễ dùng trên giao diện học tập\n- phù hợp nhiều môn học`,
                  'prompt-p7-flashcard'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p7-flashcard'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p7-flashcard' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p7-flashcard' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 7.5: Build: CRUD cho Quiz và Flashcard (PROMPT #05B) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-emerald-400 border border-emerald-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    PROMPT #05B
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">CRUD Quiz & Flashcard</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt bổ sung CRUD cho quiz và flashcard
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy bổ sung CRUD cho quiz và flashcard.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- thêm câu hỏi/thẻ mới</p>
                  <p>- sửa nội dung có sẵn</p>
                  <p>- xóa câu hỏi/thẻ không phù hợp</p>
                  <p>- dữ liệu cập nhật được lưu lại bằng LocalStorage</p>
                  <p>- thao tác cần ngắn gọn, dễ hiểu</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Flashcards" & "Trắc Nghiệm"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy bổ sung CRUD cho quiz và flashcard.\n\nYêu cầu:\n- thêm câu hỏi/thẻ mới\n- sửa nội dung có sẵn\n- xóa câu hỏi/thẻ không phù hợp\n- dữ liệu cập nhật được lưu lại bằng LocalStorage\n- thao tác cần ngắn gọn, dễ hiểu`,
                  'prompt-p05b-crud'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p05b-crud'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p05b-crud' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p05b-crud' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 8: Build: Q&A Seed (PROMPT #06) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-blue-400 border border-blue-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    PROMPT #06
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Q&A Seed</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt tạo Q&A seed chuẩn bị cho chatbot hỗ trợ ôn bài ở buổi sau
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy tạo Q&A seed cho chủ đề học tập hiện tại.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Lưu ý:</p>
                  <p>- chỉ ở mức khởi tạo</p>
                  <p>- chưa cần chatbot hoàn chỉnh</p>
                  <p>- không đi sang buổi 5</p>
                  <p>- ưu tiên các câu hỏi mà học sinh thật sự có thể hỏi về chủ đề</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Trợ Giảng AI / Q&A Seed"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy tạo Q&A seed cho chủ đề học tập hiện tại.\n\nQ&A seed là danh sách câu hỏi gợi mở và câu trả lời ngắn ban đầu để chuẩn bị cho chatbot hỗ trợ ôn bài ở buổi sau.\n\nLưu ý:\n- chỉ ở mức khởi tạo\n- chưa cần chatbot hoàn chỉnh\n- không đi sang buổi 5\n- ưu tiên các câu hỏi mà học sinh thật sự có thể hỏi về chủ đề`,
                  'prompt-p8-qa-seed'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p8-qa-seed'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p8-qa-seed' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p8-qa-seed' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 8.5: Build: Grounded Chatbot Screen (PROMPT CHATBOT GROUNDED) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-emerald-400 border border-emerald-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    PROMPT #06B
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Grounded Chatbot</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt tạo màn hình chatbot grounded hỗ trợ ôn bài cho chủ đề hiện tại
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy tạo màn hình chatbot grounded hỗ trợ ôn bài cho chủ đề hiện tại.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- chatbot chỉ trả lời trong phạm vi:</p>
                  <p className="pl-3 text-emerald-400">- sources</p>
                  <p className="pl-3 text-emerald-400">- analysisPreview</p>
                  <p className="pl-3 text-emerald-400">- studyPack</p>
                  <p>- nếu câu hỏi không có trong tài liệu hoặc không suy ra được từ tài liệu, phải trả lời rõ:</p>
                  <p className="pl-3 text-amber-300 font-bold">
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
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Trợ Giảng AI" (Grounded Chatbot)
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy tạo màn hình chatbot grounded hỗ trợ ôn bài cho chủ đề hiện tại.\n\nYêu cầu:\n- chatbot chỉ trả lời trong phạm vi:\n  - sources\n  - analysisPreview\n  - studyPack\n- nếu câu hỏi không có trong tài liệu hoặc không suy ra được từ tài liệu, phải trả lời rõ:\n  "Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp."\n- có khung nhập câu hỏi\n- có vùng hiển thị lịch sử hỏi đáp\n- phù hợp cho việc ôn bài\n- không biến thành chatbot chung chung\n- ngôn ngữ thân thiện, dễ học`,
                  'prompt-p8-grounded-chat'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p8-grounded-chat'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p8-grounded-chat' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p8-grounded-chat' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt: Save/Load Snapshot Môn Học hoặc Bộ Ôn Tập */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-emerald-400 border border-emerald-600/40">
                    LOẠI: FUNCTION
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    SAVE / LOAD
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Snapshot Working Copy</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt thêm save/load cho môn học hoặc bộ ôn tập hiện tại
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-2">
                <p className="text-neutral-100 font-semibold">
                  Hãy thêm save/load cho môn học hoặc bộ ôn tập hiện tại.
                </p>
                <div className="text-[10.5px] space-y-1 text-neutral-300">
                  <p className="text-neutral-400 font-bold">Yêu cầu:</p>
                  <p>- khi bấm "Lưu chủ đề này", phải lưu snapshot working copy hiện tại, không chỉ lưu tên</p>
                  <p>- snapshot tối thiểu gồm: subject, sources, analysisPreview, studyPack, metadata cần thiết</p>
                  <p>- khi bấm "Mở", phải restore snapshot đó về app hiện tại và UI phải thay đổi rõ</p>
                  <p>- mở lại trang vẫn xem được môn đã học (LocalStorage bền vững)</p>
                  <p>- có thể đổi tên ngắn hoặc xóa môn không dùng</p>
                  <p className="text-amber-400 font-bold">- có chỗ hiển thị rõ mục trước khi lưu (bản nháp) và sau khi lưu (kho chủ đề) ở phần trên</p>
                  <p className="text-amber-400 font-bold">- phải tìm kiếm theo mục trước khi lưu và sau khi lưu trực tiếp ở phần trên</p>
                  <p>- giữ mức cơ bản, dễ thao tác</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Phân loại Trước & Sau khi lưu + Tìm kiếm theo mục ở trên
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy thêm save/load cho môn học hoặc bộ ôn tập hiện tại.\n\nYêu cầu:\n- khi bấm "Lưu chủ đề này", phải lưu snapshot working copy hiện tại, không chỉ lưu tên\n- snapshot tối thiểu gồm:\n  - subject\n  - sources\n  - analysisPreview\n  - studyPack\n  - metadata cần thiết\n- khi bấm "Mở", phải restore snapshot đó về app hiện tại và UI phải thay đổi rõ\n- mở lại trang vẫn xem được môn đã học\n- có thể đổi tên ngắn hoặc xóa môn không dùng\n- thêm chỗ trước khi lưu và sau khi lưu mục của chủ đề làm phần ở trên, phải tìm theo mục trước khi lưu và sau khi lưu nữa nha ở trên\n- giữ mức cơ bản, dễ thao tác`,
                  'prompt-p-saveload-snapshot'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p-saveload-snapshot'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p-saveload-snapshot' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p-saveload-snapshot' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 9: Kiểm tra Study Pack (PROMPT #07) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-amber-400 border border-amber-600/40">
                    LOẠI: CHECK
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    PROMPT #07
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Kiểm tra Study Pack</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt đánh giá bộ study pack vừa sinh theo 6 tiêu chí sư phạm
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-1.5">
                <p className="text-neutral-100 font-semibold">
                  Hãy đánh giá bộ study pack vừa sinh theo 6 tiêu chí:
                </p>
                <div className="text-[10.5px] space-y-0.5 text-neutral-300">
                  <p>1. có đúng phạm vi môn/chủ đề không</p>
                  <p>2. summary có dễ hiểu không</p>
                  <p>3. câu hỏi có phù hợp lứa tuổi không</p>
                  <p>4. flashcard có đủ rõ để ôn nhanh không</p>
                  <p>5. nội dung có bám kiến thức cốt lõi hay chỉ lặp từ khóa</p>
                  <p>6. có phần nào AI sinh ra nhưng không nên dùng ngay không</p>
                </div>
                <p className="text-neutral-400 text-[10.5px] pt-1">
                  Sau đó: chỉ ra điểm mạnh, điểm cần chỉnh, đề xuất chỉnh sửa ngắn gọn.
                </p>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Nghiệm Thu"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy đánh giá bộ study pack vừa sinh theo 6 tiêu chí:\n1. có đúng phạm vi môn/chủ đề không\n2. summary có dễ hiểu không\n3. câu hỏi có phù hợp lứa tuổi không\n4. flashcard có đủ rõ để ôn nhanh không\n5. nội dung có bám kiến thức cốt lõi hay chỉ lặp từ khóa\n6. có phần nào AI sinh ra nhưng không nên dùng ngay không\n\nSau đó:\n- chỉ ra điểm mạnh\n- chỉ ra điểm cần chỉnh\n- đề xuất chỉnh sửa ngắn gọn`,
                  'prompt-p9-check-studypack'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p9-check-studypack'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p9-check-studypack' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p9-check-studypack' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 10: Tổng kết & Mở sang Buổi 4 (PROMPT #10) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-sky-400 border border-sky-600/40">
                    LOẠI: PLAN / NOTE
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-800">
                    PROMPT #10
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Tổng kết & Mở sang Buổi 4</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt tóm tắt thành quả Buổi 3 theo 5 tiêu chuẩn mở sang Buổi 4
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-1.5">
                <p className="text-neutral-100 font-semibold">
                  Hãy tóm tắt thành quả buổi 3 theo cấu trúc:
                </p>
                <div className="text-[10.5px] space-y-0.5 text-neutral-300">
                  <p>1. study pack đã có những phần nào</p>
                  <p>2. phần nào dùng được ngay</p>
                  <p>3. phần nào cần chỉnh ở buổi 4</p>
                  <p>4. nhắc lại nguyên tắc: AI hỗ trợ tổng hợp, không thay học sinh hiểu bài</p>
                  <p>5. nhấn mạnh tiêu chí: study pack phải học được thật, không chỉ đủ hình thức</p>
                </div>
                <p className="text-neutral-400 text-[10.5px] pt-1">
                  Viết ngắn, mạch lạc, dễ nhớ.
                </p>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Nghiệm Thu"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy tóm tắt thành quả buổi 3 theo cấu trúc:\n1. study pack đã có những phần nào\n2. phần nào dùng được ngay\n3. phần nào cần chỉnh ở buổi 4\n4. nhắc lại nguyên tắc: AI hỗ trợ tổng hợp, không thay học sinh hiểu bài\n5. nhấn mạnh tiêu chí: study pack phải học được thật, không chỉ đủ hình thức\n\nViết ngắn, mạch lạc, dễ nhớ.`,
                  'prompt-p10-summary-b3-b4'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p10-summary-b3-b4'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p10-summary-b3-b4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p10-summary-b3-b4' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 11: Đánh giá trải nghiệm ôn tập hiện tại theo 6 tiêu chí (LOAI: CHECK - Image 1) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-emerald-400 border border-emerald-600/40">
                    LOẠI: CHECK
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    PROMPT #11
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Đánh giá trải nghiệm ôn tập</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt đánh giá trải nghiệm ôn tập hiện tại theo 6 tiêu chí
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-1.5">
                <p className="text-neutral-100 font-semibold">
                  Hãy đánh giá trải nghiệm ôn tập hiện tại theo 6 tiêu chí:
                </p>
                <div className="text-[10.5px] space-y-0.5 text-neutral-300">
                  <p>1. dễ dùng không</p>
                  <p>2. nội dung có rõ không</p>
                  <p>3. quiz và flashcard có phục vụ học thật không</p>
                  <p>4. có phần nào gây rối hoặc thừa không</p>
                  <p>5. score cuối có phản ánh đúng kết quả làm bài không</p>
                  <p>6. có cần retest đúng hết / sai hết / đúng 2 sai 2 không</p>
                </div>
                <div className="text-neutral-400 text-[10.5px] pt-1">
                  <p>Sau đó:</p>
                  <p>- chỉ ra điểm mạnh</p>
                  <p>- chỉ ra điểm cần sửa</p>
                  <p>- đề xuất chỉnh ngắn gọn</p>
                </div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Nghiệm Thu"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy đánh giá trải nghiệm ôn tập hiện tại theo 6 tiêu chí:\n1. dễ dùng không\n2. nội dung có rõ không\n3. quiz và flashcard có phục vụ học thật không\n4. có phần nào gây rối hoặc thừa không\n5. score cuối có phản ánh đúng kết quả làm bài không\n6. có cần retest đúng hết / sai hết / đúng 2 sai 2 không\n\nSau đó:\n- chỉ ra điểm mạnh\n- chỉ ra điểm cần sửa\n- đề xuất chỉnh ngắn gọn`,
                  'prompt-p11-check-experience'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p11-check-experience'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p11-check-experience' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p11-check-experience' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>

          {/* Prompt 12: Tóm tắt thành quả buổi 4 theo cấu trúc (LOAI: PLAN / NOTE - Image 2) */}
          <div className="p-4 rounded-xl border bg-black/95 text-white border-neutral-700 shadow-md flex flex-col justify-between space-y-3 font-mono">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-800 text-sky-400 border border-sky-600/40">
                    LOẠI: PLAN / NOTE
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-800">
                    PROMPT #12
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Tóm tắt thành quả Buổi 4</span>
              </div>
              <h4 className="text-xs font-bold text-white font-sans">
                Prompt tóm tắt thành quả buổi 4 theo cấu trúc 5 mục
              </h4>
              <div className="text-[11px] text-neutral-300 bg-neutral-900/90 p-3 rounded-lg border border-neutral-800 mt-2 leading-relaxed space-y-1.5">
                <p className="text-neutral-100 font-semibold">
                  Hãy tóm tắt thành quả buổi 4 theo cấu trúc:
                </p>
                <div className="text-[10.5px] space-y-0.5 text-neutral-300">
                  <p>1. quiz mode đã làm được gì</p>
                  <p>2. flashcard mode đã làm được gì</p>
                  <p>3. dữ liệu nào đang CRUD được</p>
                  <p>4. phần nào sẽ phát triển tiếp ở buổi 5</p>
                  <p>5. các case retest score tối thiểu cần nhớ</p>
                </div>
                <p className="text-neutral-400 text-[10.5px] pt-1 font-mono">
                  Viết ngắn gọn, mạch lạc, phù hợp học sinh.
                </p>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-neutral-400 font-sans">
                ✓ Tab "Nghiệm Thu"
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(
                  `Hãy tóm tắt thành quả buổi 4 theo cấu trúc:\n1. quiz mode đã làm được gì\n2. flashcard mode đã làm được gì\n3. dữ liệu nào đang CRUD được\n4. phần nào sẽ phát triển tiếp ở buổi 5\n5. các case retest score tối thiểu cần nhớ\n\nViết ngắn gọn, mạch lạc, phù hợp học sinh.`,
                  'prompt-p12-summary-buoi4'
                )}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded transition-all cursor-pointer border ${
                  copiedPromptId === 'prompt-p12-summary-buoi4'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-600'
                }`}
              >
                {copiedPromptId === 'prompt-p12-summary-buoi4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPromptId === 'prompt-p12-summary-buoi4' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
              </button>
            </div>
          </div>


        </div>
      </div>

      {/* Bảng Kiểm 4 Bước Tự Đánh Giá Trước Khi Nộp Bài */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all shadow-sm ${
          isLight ? 'bg-white/80 border-slate-200' : 'bg-neutral-900/80 border-neutral-800'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Bảng Kiểm 4 Bước Tự Đánh Giá Trước Khi Nộp Bài Tập Môn Tin Học
              </h3>
              <p className="text-xs text-slate-500">
                Hãy tích chọn các mục dưới đây để đảm bảo bạn đã hoàn thành bài tập đúng liêm chính học thuật
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
            {Object.values(checklist).filter(Boolean).length} / 4 Tiêu chí đạt
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {[
            { id: 1, text: 'Tôi hiểu rõ bản chất từng câu lệnh và có thể tự giải thích cho giáo viên hoặc bạn bè.' },
            { id: 2, text: 'Tôi đã tự tay gõ từng dòng mã trên bàn phím thay vì sao chép dán toàn bộ từ AI.' },
            { id: 3, text: 'Tôi đã kiểm chứng cú pháp và hàm sử dụng với Sách giáo khoa Tin học 10 & 11 (KNTT).' },
            { id: 4, text: 'Tôi tuyệt đối không đưa thông tin cá nhân, tài khoản hoặc mật khẩu vào prompt đặt câu hỏi cho AI.' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleChecklist(item.id)}
              className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                checklist[item.id]
                  ? isLight
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                    : 'bg-emerald-950/40 border-emerald-700 text-emerald-200 font-medium'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-900'
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                checklist[item.id]
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-slate-300 dark:border-neutral-700'
              }`}>
                {checklist[item.id] && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive AI Ethics Quiz - Tình Huống Trắc Nghiệm Đạo Đức AI */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all shadow-sm ${
          isLight
            ? 'bg-white/80 border-slate-200'
            : 'bg-neutral-900/80 border-neutral-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Trắc Nghiệm Tình Huống: Hiểu & Ứng Dụng Nguyên Tắc AI
              </h3>
              <p className="text-xs text-slate-500">
                Hãy chọn phương án xử lý đúng đắn nhất trong các tình huống thực tế của học sinh THPT
              </p>
            </div>
          </div>
          <div className="text-xs px-2.5 py-1 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-semibold border border-amber-300">
            {Object.keys(selectedAnswers).length} / {AI_SCENARIOS.length} câu đã trả lời
          </div>
        </div>

        <div className="mt-5 space-y-6">
          {AI_SCENARIOS.map((scenario) => {
            const selectedIdx = selectedAnswers[scenario.id];
            const hasAnswered = selectedIdx !== undefined;

            return (
              <div
                key={scenario.id}
                className={`p-4 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-slate-50/70 border-slate-200'
                    : 'bg-neutral-950/60 border-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  <span>Câu {scenario.id}</span>
                  <span>•</span>
                  <span>{scenario.context}</span>
                </div>
                <h4 className={`text-xs sm:text-sm font-bold mb-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {scenario.question}
                </h4>

                {/* Option Buttons */}
                <div className="space-y-2">
                  {scenario.options.map((option, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    let optionStyle = isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                      : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200';

                    if (hasAnswered) {
                      if (option.isCorrect) {
                        optionStyle = isLight
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium'
                          : 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium';
                      } else if (isSelected && !option.isCorrect) {
                        optionStyle = isLight
                          ? 'bg-rose-50 border-rose-500 text-rose-900'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(scenario.id, optIdx)}
                        className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <div className="flex-1">
                          <p>{option.text}</p>
                          {hasAnswered && isSelected && (
                            <div className={`mt-2 p-2 rounded text-[11px] border leading-relaxed ${
                              option.isCorrect
                                ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200'
                                : 'bg-rose-100/70 border-rose-300 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200'
                            }`}>
                              <strong>{option.isCorrect ? '✓ Giải thích đúng: ' : '✗ Nhận định sai: '}</strong>
                              {option.explanation}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Responsible AI Pledge & Local Storage Confirmation */}
      <div
        id="student-pledge-card"
        className={`rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-all ${
          pledgeSigned
            ? isLight
              ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
              : 'bg-emerald-950/40 border-emerald-800'
            : isLight
              ? 'bg-amber-50/70 border-amber-300'
              : 'bg-amber-950/40 border-amber-800'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              pledgeSigned
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 text-white'
            }`}>
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  pledgeSigned ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                }`}>
                  {pledgeSigned ? 'CHỨNG NHẬN CAM KẾT' : 'BẢN CAM KẾT SỬ DỤNG AI CÓ TRÁCH NHIỆM'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/80 dark:bg-black/50 border border-current font-mono">
                  Lưu vào LocalStorage
                </span>
              </div>
              <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {pledgeSigned
                  ? `Học sinh: ${studentName} đã cam kết tuân thủ 5 nguyên tắc AI`
                  : 'Cam Kết Sử Dụng AI Vì Mục Tiêu Học Tập & Phát Triển Tư Duy'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {pledgeSigned
                  ? 'Bản cam kết của bạn đã được ghi nhận trên thiết bị này. Hãy luôn giữ vững tinh thần trung thực và chủ động lập trình!'
                  : 'Bằng việc ký xác nhận, bạn cam kết luôn dùng AI như một trợ giảng hướng dẫn, tự tay viết mã và đối chiếu kiến thức với SGK Tin học 10 & 11 Kết Nối Tri Thức.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            {!pledgeSigned ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập họ và tên học sinh..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-xs outline-hidden focus:ring-2 focus:ring-amber-500 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                      : 'bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500'
                  }`}
                />
                <button
                  onClick={handleSignPledge}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Check className="w-4 h-4" />
                  <span>Ký Cam Kết AI</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ĐÃ KÝ CAM KẾT</span>
                </div>
                <button
                  onClick={handleResetPledge}
                  title="Thay đổi tên hoặc ký lại"
                  className="p-2 rounded-lg border bg-white/50 dark:bg-black/40 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
