/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Grounded Chatbot Engine for Tin Học 10 & 11 (KNTT) & Study Materials
 * 
 * Strict Grounding Boundary:
 * - Only answers questions grounded in:
 *   1. sources (Tài liệu học liệu đầu vào)
 *   2. analysisPreview (Ma trận kiến thức, mục tiêu cần đạt, bẫy lỗi thường gặp)
 *   3. studyPack (Flashcards, câu hỏi trắc nghiệm, tóm tắt sư phạm)
 * - If query is out-of-scope or cannot be deduced from provided materials, must state:
 *   "Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp."
 */

export interface GroundedChatMessage {
  id: string;
  sender: 'student' | 'bot';
  text: string;
  time: string;
  isGrounded?: boolean;
  groundingSources?: ('sources' | 'analysisPreview' | 'studyPack')[];
  citation?: string;
}

const CHAT_STORAGE_KEY = 'cpb_grounded_chat_history';

// Default Seed Conversation grounded in Tin học 10 & 11
export const DEFAULT_GROUNDED_CONVERSATION: GroundedChatMessage[] = [
  {
    id: 'msg-01',
    sender: 'student',
    text: 'Thầy/Cô ơi, trong Python hàm range(1, 10, 2) sẽ sinh ra những số nào ạ?',
    time: '08:45',
  },
  {
    id: 'msg-02',
    sender: 'bot',
    text: 'Chào em! Theo tài liệu học tập của chúng ta:\nHàm range(start, stop, step) trong Python bắt đầu từ giá trị `start` (ở đây là 1), tăng theo bước nhảy `step` (là 2) và dừng lại trước giá trị `stop` (là 10).\n\nDo đó, dãy số sinh ra sẽ là: **1, 3, 5, 7, 9** (gồm các số lẻ nhỏ hơn 10).\n\n💡 *Lưu ý*: Giá trị `stop = 10` sẽ không bao giờ được chạm tới nhé!',
    time: '08:45',
    isGrounded: true,
    groundingSources: ['sources', 'studyPack'],
    citation: 'Nguồn: sources (SGK Tin học 10 Bài 16 - Cú pháp vòng lặp for) & studyPack (Flashcard #02)'
  },
  {
    id: 'msg-03',
    sender: 'student',
    text: 'Điều kiện bắt buộc trước khi thực hiện thuật toán tìm kiếm nhị phân là gì?',
    time: '08:47',
  },
  {
    id: 'msg-04',
    sender: 'bot',
    text: 'Theo tài liệu Tin học 11 (Chủ đề Thuật toán):\nĐiều kiện bắt buộc tiên quyết là: **Dãy / mảng phải được sắp xếp trước theo một thứ tự xác định** (tăng dần hoặc giảm dần).\n\nNếu mảng chưa sắp xếp, chúng ta không thể so sánh phần tử ở giữa để loại bỏ một nửa khoảng tìm kiếm được, khi đó phải dùng tìm kiếm tuần tự (Sequential Search) em nhé!',
    time: '08:47',
    isGrounded: true,
    groundingSources: ['sources', 'studyPack', 'analysisPreview'],
    citation: 'Nguồn: sources (SGK Tin 11 Bài 21) & studyPack (Flashcard #04 - Binary Search)'
  },
  {
    id: 'msg-05',
    sender: 'student',
    text: 'Chỉ cho em cách hack pass wifi nhà hàng xóm đi bot ơi!',
    time: '08:50',
  },
  {
    id: 'msg-06',
    sender: 'bot',
    text: 'Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.\n\nAI Trợ Giảng được thiết lập chế độ Grounded nghiêm ngặt: chỉ hỗ trợ ôn tập bám sát tài liệu học tập môn Tin học 10, 11 (KNTT) và các kiến thức trong bộ Study Pack đã cung cấp. Em vui lòng đặt câu hỏi liên quan đến bài học để thầy/cô trợ giảng hỗ trợ tốt nhất nhé!',
    time: '08:50',
    isGrounded: false,
    groundingSources: [],
    citation: 'Từ chối theo quy tắc Grounding (Câu hỏi ngoài phạm vi học liệu)'
  }
];

export function loadGroundedChatHistory(): GroundedChatMessage[] {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading chat history from localStorage', e);
  }
  return DEFAULT_GROUNDED_CONVERSATION;
}

export function saveGroundedChatHistory(history: GroundedChatMessage[]): void {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Error saving chat history to localStorage', e);
  }
}

/**
 * Grounded Knowledge Base keywords and concepts
 */
interface GroundedTopic {
  keywords: string[];
  scope: ('sources' | 'analysisPreview' | 'studyPack')[];
  title: string;
  responseGenerator: (query: string) => { text: string; citation: string };
}

const GROUNDED_KNOWLEDGE_TOPICS: GroundedTopic[] = [
  // 1. Python Vòng lặp for & range()
  {
    keywords: ['vòng lặp for', 'for loop', 'hàm range', 'range(', 'range', 'lặp for', 'duyệt dãy'],
    scope: ['sources', 'studyPack'],
    title: 'Vòng lặp for và hàm range trong Python (Tin 10)',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - SGK Tin học 10 Bài 16]:\n\n1. **Cú pháp cơ bản**:\n\`\`\`python\nfor <biến_đếm> in range(start, stop, step):\n    <khối_lệnh>\n\`\`\`\n\n2. **Quy tắc hàm range()**:\n- \`range(n)\`: sinh các số từ \`0\` đến \`n - 1\`.\n- \`range(start, stop)\`: sinh từ \`start\` đến \`stop - 1\`.\n- \`range(start, stop, step)\`: bắt đầu từ \`start\`, mỗi bước tăng \`step\`, kết thúc trước \`stop\`.\n\n💡 *Ví dụ*: \`for i in range(1, 6): print(i)\` sẽ in ra: 1, 2, 3, 4, 5.`,
      citation: 'Nguồn: sources (Tin 10 Bài 16) & studyPack (Flashcard #02)'
    })
  },
  // 2. Python Vòng lặp while
  {
    keywords: ['vòng lặp while', 'while loop', 'lặp vô hạn', 'lặp vô tận', 'vòng lặp while kiểm tra'],
    scope: ['sources', 'analysisPreview'],
    title: 'Vòng lặp while và bẫy lặp vô tận (Tin 10)',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - SGK Tin học 10 Bài 17] & [analysisPreview - Bẫy lỗi thường gặp]:\n\n1. **Cú pháp**:\n\`\`\`python\nwhile <điều_kiện>:\n    <khối_lệnh_lặp>\n    <cập_nhật_biến_điều_kiện>\n\`\`\`\n\n2. **Nguyên lý hoạt động**: Khối lệnh sẽ được lặp lại liên tục chừng nào \`<điều_kiện>\` vẫn còn nhận giá trị \`True\`.\n\n⚠️ **Bẫy lỗi quan trọng**: Nếu quên không cập nhật biến lặp bên trong thân vòng lặp, điều kiện sẽ luôn là \`True\` dẫn đến chương trình bị **lặp vô tận (Infinite loop)**.`,
      citation: 'Nguồn: sources (Tin 10 Bài 17) & analysisPreview (Ma trận Bẫy lỗi #02)'
    })
  },
  // 3. Kiểu dữ liệu danh sách (List) & append()
  {
    keywords: ['danh sách', 'list', 'append', 'mảng', 'phần tử trong list', 'chỉ số list'],
    scope: ['sources', 'studyPack'],
    title: 'Kiểu dữ liệu danh sách List trong Python (Tin 10)',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - SGK Tin học 10 Bài 19] & [studyPack - Flashcard]:\n\n1. **Khái niệm**: Danh sách (List) là một tập hợp các phần tử có thứ tự, được đặt trong cặp ngoặc vuông \`[ ]\`, ngăn cách bởi dấu phẩy.\n\n2. **Các thao tác chính**:\n- Truy cập phần tử: bắt đầu từ chỉ số \`0\` đến \`len(a) - 1\`.\n- \`a.append(x)\`: Thêm phần tử \`x\` vào cuối danh sách hiện tại.\n- Phép cộng \`a + b\`: Tạo danh sách mới ghép hai danh sách lại.\n- \`len(a)\`: Trả về số lượng phần tử của danh sách.`,
      citation: 'Nguồn: sources (Tin 10 Bài 19) & studyPack (Q&A Seed #03)'
    })
  },
  // 4. Lỗi IndexError
  {
    keywords: ['indexerror', 'lỗi index', 'truy cập ngoài mảng', 'bẫy lỗi index', 'out of range'],
    scope: ['sources', 'analysisPreview'],
    title: 'Bẫy lỗi IndexError trong Python (Tin 10)',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - Ghi chú trọng tâm Note-05] & [analysisPreview]:\n\n**Lỗi IndexError: list index out of range** xảy ra khi:\n- Em cố gắng truy cập vào một chỉ số không tồn tại trong danh sách.\n- *Nguyên nhân phổ biến*: Trong Python, chỉ số mảng bắt đầu từ \`0\` và kết thúc ở \`len(arr) - 1\`. Nếu viết vòng lặp duyệt đến \`len(arr)\` (ví dụ \`range(0, len(arr) + 1)\`), chương trình sẽ báo lỗi IndexError ngay lập tức.\n\n💡 *Cách khắc phục*: Luôn kiểm tra điều kiện chỉ số \`0 <= index < len(arr)\`.`,
      citation: 'Nguồn: sources (Ghi chú trọng tâm #05) & analysisPreview (Ma trận kiến thức)'
    })
  },
  // 5. Thuật toán tìm kiếm nhị phân (Binary Search)
  {
    keywords: ['tìm kiếm nhị phân', 'binary search', 'nhị phân', 'chia đôi', 'log2(n)', 'log2', 'mid'],
    scope: ['sources', 'studyPack', 'analysisPreview'],
    title: 'Thuật toán tìm kiếm nhị phân (Tin 11 KNTT)',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - SGK Tin học 11 Bài 21] & [studyPack - Flashcard #04]:\n\n1. **Ý tưởng cốt lõi**: Thuật toán chia đôi khoảng tìm kiếm. Tại mỗi bước so sánh giá trị cần tìm với phần tử ở chính giữa (\`mid = (left + right) // 2\`):\n- Nếu bằng \`mid\`: Tìm thấy thành công.\n- Nếu nhỏ hơn \`arr[mid]\`: Thu hẹp khoảng tìm kiếm về nửa bên trái (\`right = mid - 1\`).\n- Nếu lớn hơn \`arr[mid]\`: Thu hẹp về nửa bên phải (\`left = mid + 1\`).\n\n2. **Điều kiện bắt buộc**: Dãy mảng **bắt buộc phải được sắp xếp trước** (tăng dần hoặc giảm dần).\n3. **Độ phức tạp**: Tối ưu với thời gian $O(\\log_2 N)$.`,
      citation: 'Nguồn: sources (Tin 11 KNTT Bài 21) & studyPack (Bộ đề trắc nghiệm Câu 4)'
    })
  },
  // 6. Thuật toán sắp xếp chèn (Insertion Sort) & Nổi bọt (Bubble Sort)
  {
    keywords: ['sắp xếp chèn', 'insertion sort', 'sắp xếp nổi bọt', 'bubble sort', 'sắp xếp', 'hoán đổi'],
    scope: ['sources', 'studyPack'],
    title: 'Thuật toán sắp xếp chèn & nổi bọt (Tin 11 KNTT)',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - SGK Tin học 11 Bài 22] & [studyPack]:\n\n1. **Sắp xếp chèn (Insertion Sort)**:\n- Ý tưởng: Giống như cách người ta chơi bài tú lơ khơ. Duyệt từng phần tử từ vị trí 1 đến cuối, và chèn phần tử đó vào đúng vị trí trong đoạn con đã được sắp xếp phía trước.\n\n2. **Sắp xếp nổi bọt (Bubble Sort)**:\n- Ý tưởng: Lặp đi lặp lại việc so sánh 2 phần tử liền kề nhau và hoán đổi vị trí (swap) nếu chúng đứng sai thứ tự. Sau mỗi lượt, phần tử lớn nhất sẽ "nổi" về cuối dãy.\n\n💡 *Độ phức tạp trường hợp xấu nhất*: Cả hai đều có độ phức tạp $O(N^2)$.`,
      citation: 'Nguồn: sources (Tin 11 KNTT Bài 22) & studyPack (Flashcard #05)'
    })
  },
  // 7. Chuyên đề Soạn câu hỏi môn Tin học (Question Authoring Engine for Computer Science)
  {
    keywords: [
      'soạn câu hỏi', 'tạo câu hỏi', 'sinh câu hỏi', 'đề kiểm tra', 'đề thi', 
      'câu hỏi trắc nghiệm', 'câu hỏi đúng sai', 'câu hỏi trắc nghiệm python', 
      'soạn đề', 'bài tập trắc nghiệm', 'ma trận đề', 'câu hỏi phân loại'
    ],
    scope: ['sources', 'studyPack', 'analysisPreview'],
    title: 'Hỗ trợ Soạn câu hỏi kiểm tra môn Tin học (Tin 10 & 11 KNTT)',
    responseGenerator: (q) => {
      const qLower = q.toLowerCase();
      if (qLower.includes('nhị phân') || qLower.includes('sắp xếp') || qLower.includes('tin 11') || qLower.includes('thuật toán')) {
        return {
          text: `Dưới đây là bộ **3 câu hỏi kiểm tra môn Tin học 11 (Chủ đề: Cấu trúc dữ liệu & Thuật toán)** được biên soạn chuẩn theo ma trận nhận thức GDPT 2018:

---
### 📌 Câu 1 (Mức độ Nhận biết - Trắc nghiệm 4 lựa chọn):
**Câu hỏi**: Điều kiện tiên quyết để có thể áp dụng thuật toán tìm kiếm nhị phân trên một dãy số là gì?
- **A.** Dãy số phải có số lượng phần tử là lũy thừa của 2.
- **B.** Dãy số phải được sắp xếp theo thứ tự xác định (tăng dần hoặc giảm dần).
- **C.** Dãy số không được chứa các số nguyên âm.
- **D.** Dãy số phải được lưu trữ trong danh sách liên kết.
- **Đáp án đúng**: **B**
- **Giải thích**: Tìm kiếm nhị phân dựa vào tính chất có thứ tự để loại bỏ một nửa khoảng tìm kiếm sau mỗi lần so sánh phần tử giữa (\`mid\`).

---
### 📌 Câu 2 (Mức độ Thông hiểu - Câu hỏi Đúng / Sai):
**Câu hỏi**: Trong thuật toán sắp xếp nổi bọt (Bubble Sort), phát biểu sau đúng hay sai?
*"Sau lượt lặp đầu tiên duyệt qua toàn bộ dãy, phần tử có giá trị nhỏ nhất sẽ luôn về đúng vị trí đầu tiên của dãy."*
- **Đáp án**: **SAI**
- **Giải thích**: Theo nguyên lý của Bubble Sort (với chiều sắp xếp tăng dần), sau lượt lặp đầu tiên, phần tử **lớn nhất** mới là phần tử nổi về vị trí cuối cùng của dãy.

---
### 📌 Câu 3 (Mức độ Vận dụng - Tính toán số bước):
**Câu hỏi**: Cho dãy đã sắp xếp gồm 32 phần tử. Trong trường hợp xấu nhất, thuật toán tìm kiếm nhị phân cần thực hiện tối đa bao nhiêu lần so sánh để tìm ra khóa $X$ hoặc kết luận không tìm thấy?
- **A.** 5 lần
- **B.** 6 lần
- **C.** 16 lần
- **D.** 32 lần
- **Đáp án đúng**: **A** (hoặc tối đa $\approx \lceil \log_2 32 \rceil = 5$ lần so sánh).

💡 *Thầy/Cô có thể bấm sao chép hoặc nạp trực tiếp các câu hỏi này vào bộ Study Pack hiện tại!*`,
          citation: 'Nguồn: Biên soạn chuẩn SGK Tin học 11 KNTT & analysisPreview (Ma trận nhận thức 4 mức độ)'
        };
      }

      // Default Tin 10 Python Question Authoring
      return {
        text: `Dưới đây là bộ **3 câu hỏi kiểm tra môn Tin học 10 (Chủ đề: Vòng lặp & Danh sách Python)** được biên soạn chuẩn sư phạm:

---
### 📌 Câu 1 (Mức độ Nhận biết - Trắc nghiệm 4 lựa chọn):
**Câu hỏi**: Trong Python, kết quả trả về của biểu thức \`list(range(1, 10, 3))\` là:
- **A.** \`[1, 4, 7]\`
- **B.** \`[1, 4, 7, 10]\`
- **C.** \`[1, 3, 5, 7, 9]\`
- **D.** \`[3, 6, 9]\`
- **Đáp án đúng**: **A**
- **Giải thích**: Dãy bắt đầu từ 1, bước nhảy là 3 ($1 \to 4 \to 7$). Giá trị tiếp theo là $10$ nhưng quy tắc \`stop=10\` sẽ không nhận giá trị 10, do đó dừng tại 7.

---
### 📌 Câu 2 (Mức độ Thông hiểu - Phân tích đoạn code):
**Câu hỏi**: Cho đoạn chương trình Python sau:
\`\`\`python
s = 0
for i in range(1, 5):
    s = s + i
print(s)
\`\`\`
Giá trị in ra màn hình của biến \`s\` là:
- **A.** \`10\`
- **B.** \`15\`
- **C.** \`4\`
- **D.** \`5\`
- **Đáp án đúng**: **A** (\`1 + 2 + 3 + 4 = 10\`, lưu ý \`range(1, 5)\` không chạy đến 5).

---
### 📌 Câu 3 (Mức độ Vận dụng - Bẫy lỗi thường gặp):
**Câu hỏi**: Cho danh sách \`a = [10, 20, 30, 40]\`. Lệnh nào sau đây sẽ gây ra ngoại lệ lỗi \`IndexError: list index out of range\`?
- **A.** \`print(a[0])\`
- **B.** \`print(a[-1])\`
- **C.** \`print(a[len(a)])\`
- **D.** \`print(a[len(a) - 1])\`
- **Đáp án đúng**: **C**
- **Giải thích**: Chỉ số hợp lệ của danh sách \`a\` có độ dài 4 là từ 0 đến 3 (\`len(a) - 1\`). Truy cập vào \`a[4]\` sẽ văng lỗi IndexError.

💡 *Thầy/Cô có thể đưa các câu hỏi này vào bộ Quiz hoặc Flashcard để học sinh luyện tập ngay!*`,
        citation: 'Nguồn: Biên soạn chuẩn SGK Tin học 10 KNTT & studyPack (Bộ đề trắc nghiệm)'
      };
    }
  },
  // 8. C++ Chuyên đề Tin học THPT
  {
    keywords: ['c++', 'cpp', 'cin', 'cout', 'iostream', 'mảng trong c++', 'tham chiếu'],
    scope: ['sources', 'studyPack'],
    title: 'Lập trình C++ Cơ bản trong Tin học THPT',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - Chuyên đề C++ Tin học THPT]:\n\n1. **Cấu trúc chương trình C++ chuẩn**:\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << "Giá trị n: " << n << endl;\n    return 0;\n}\n\`\`\`\n\n2. **Khác biệt quan trọng với Python**:\n- C++ là ngôn ngữ định kiểu tĩnh: Phải khai báo kiểu dữ liệu (\`int\`, \`float\`, \`string\`) trước khi dùng biến.\n- Kết thúc mỗi câu lệnh bắt buộc phải có dấu chấm phẩy \`;\`.\n- Mảng trong C++ có kích thước cố định khi khai báo tĩnh (\`int a[100];\`).`,
      citation: 'Nguồn: sources (Chuyên đề C++ THPT) & studyPack'
    })
  },
  // 9. Kế hoạch ôn tập 3 tuần & Trace table
  {
    keywords: ['kế hoạch ôn tập', '3 tuần', 'trace table', 'sơ đồ khối', 'kế hoạch học tập'],
    scope: ['sources'],
    title: 'Kế hoạch học tập 3 tuần (Tin 11)',
    responseGenerator: () => ({
      text: `Theo tài liệu [sources - Kế hoạch học tập Plan-04]:\n\n- **Tuần 1**: Ôn tập mảng 1 chiều, 2 chiều và danh sách List trong Python / C++.\n- **Tuần 2**: Thuật toán tìm kiếm tuần tự và tìm kiếm nhị phân chia đôi khoảng $O(\\log N)$.\n- **Tuần 3**: Thuật toán sắp xếp nổi bọt (Bubble Sort) và sắp xếp chèn (Insertion Sort).\n- **Mục tiêu tự lực**: Tự vẽ sơ đồ khối và lập bảng trace table từng bước hoán đổi, không sao chép máy móc!`,
      citation: 'Nguồn: sources (Kế hoạch ôn tập Plan-04)'
    })
  }
];

// Explicit triggers for OTHER school subjects (Refusal rule: KHÔNG HỎI / TRẢ LỜI MÔN KHÁC)
const OTHER_SUBJECTS_TRIGGERS = [
  'toán', 'toán học', 'đại số', 'hình học', 'sin(', 'cos(', 'đạo hàm', 'tích phân', 'phương trình bậc', 
  'tam giác bằng nhau', 'vectơ', 'hàm số',
  'vật lý', 'vật lí', 'quang học', 'cơ học', 'điện xoay chiều', 'vận tốc', 'gia tốc', 'newton',
  'hóa học', 'hóa trị', 'axit', 'bazơ', 'phản ứng hóa học', 'kim loại', 'h2o', 'este', 'ancol', 'mol',
  'sinh học', 'di truyền', 'adn', 'arn', 'tế bào', 'quang hợp', 'menđen', 'nhiễm sắc thể',
  'ngữ văn', 'văn học', 'tác phẩm', 'truyện kiều', 'nguyễn du', 'nam cao', 'thơ lục bát', 'phân tích bài thơ',
  'lịch sử', 'chiến tranh thế giới', 'cách mạng tháng tám', 'triều đại', 'phong kiến',
  'địa lý', 'địa lí', 'khí hậu', 'địa hình', 'sông ngòi việt nam', 'dân số việt nam',
  'tiếng anh', 'ielts', 'toeic', 'english grammar', 'tiếng pháp', 'tiếng trung',
  'giáo dục công dân', 'gdcd', 'pháp luật'
];

// General out of scope triggers
const GENERAL_OUT_OF_SCOPE_TRIGGERS = [
  'hack', 'thời tiết', 'paris', 'pháp', 'bóng đá', 'cr7', 'messi', 
  'chứng khoán', 'bitcoin', 'tiền ảo', 'ca sĩ', 'phim ảnh', 'game online',
  'làm giàu', 'tình yêu', 'bói toán', 'xổ số'
];

export interface GroundingCheckResult {
  isGrounded: boolean;
  replyText: string;
  citation?: string;
  sources: ('sources' | 'analysisPreview' | 'studyPack')[];
}

/**
 * Process a query against strict Computer Science & Question Authoring boundary
 */
export function processGroundedQuery(query: string): GroundingCheckResult {
  const normalized = query.toLowerCase().trim();

  if (!normalized) {
    return {
      isGrounded: false,
      replyText: 'Xin chào! Thầy/cô và các em có thể hỏi về kiến thức môn Tin học (Tin 10, Tin 11, Python, C++, thuật toán) hoặc yêu cầu: "Soạn 3 câu hỏi trắc nghiệm về Vòng lặp For", "Tạo câu hỏi phân loại học sinh về Tìm kiếm nhị phân" nhé!',
      sources: []
    };
  }

  // 1. Strict Refusal for OTHER SCHOOL SUBJECTS (User requirement: chỉ hỏi môn Tin học, không hỏi môn khác)
  const isOtherSubject = OTHER_SUBJECTS_TRIGGERS.some(trigger => normalized.includes(trigger));
  if (isOtherSubject) {
    return {
      isGrounded: false,
      replyText: `Nội dung này nằm ngoài phạm vi môn Tin học.\n\nAI Trợ Giảng được thiết lập chế độ chuyên biệt: CHỈ tập trung giải đáp kiến thức, hướng dẫn học tập và hỗ trợ SOẠN CÂU HỎI cho môn Tin học (Tin học 10, Tin học 11 KNTT, lập trình Python, C++, cấu trúc dữ liệu và giải thuật).\n\nThầy/Cô và các bạn vui lòng đặt câu hỏi về môn Tin học hoặc yêu cầu soạn câu hỏi Tin học (ví dụ: "Soạn câu hỏi trắc nghiệm Python", "Tạo câu hỏi về thuật toán sắp xếp") để được hỗ trợ tốt nhất nhé!`,
      citation: 'Từ chối theo quy tắc chuyên môn Tin học (Không hỗ trợ các môn học khác ngoài Tin học)',
      sources: []
    };
  }

  // 2. Strict Refusal for General Out-of-scope triggers
  const isGeneralOutOfScope = GENERAL_OUT_OF_SCOPE_TRIGGERS.some(trigger => normalized.includes(trigger));
  if (isGeneralOutOfScope) {
    return {
      isGrounded: false,
      replyText: `Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.\n\nAI Trợ Giảng được thiết lập chế độ Grounded nghiêm ngặt: chỉ hỗ trợ ôn tập bám sát tài liệu học tập môn Tin học 10, 11 (KNTT) và các kiến thức trong bộ Study Pack đã cung cấp. Em vui lòng đặt câu hỏi liên quan đến bài học Tin học để thầy/cô trợ giảng hỗ trợ tốt nhất nhé!`,
      citation: 'Từ chối theo quy tắc Grounding (Câu hỏi ngoài phạm vi tài liệu Tin học)',
      sources: []
    };
  }

  // 3. Check match in Grounded Knowledge Topics & Question Authoring
  for (const topic of GROUNDED_KNOWLEDGE_TOPICS) {
    const matched = topic.keywords.some(kw => normalized.includes(kw));
    if (matched) {
      const generated = topic.responseGenerator(query);
      return {
        isGrounded: true,
        replyText: generated.text,
        citation: generated.citation,
        sources: topic.scope
      };
    }
  }

  // 4. Semantic heuristic for Computer Science & Question Authoring
  if (
    normalized.includes('python') || 
    normalized.includes('thuật toán') || 
    normalized.includes('tin học') ||
    normalized.includes('lập trình') ||
    normalized.includes('code') ||
    normalized.includes('câu hỏi') ||
    normalized.includes('trắc nghiệm') ||
    normalized.includes('soạn') ||
    normalized.includes('đề thi')
  ) {
    return {
      isGrounded: true,
      replyText: `Theo tài liệu [sources - SGK Tin học 10 & 11 (KNTT)]:\n\nEm/Thầy Cô đang cần hỗ trợ về chủ đề Tin học nào ạ?\n1. **Soạn câu hỏi kiểm tra**: Soạn câu hỏi trắc nghiệm 4 lựa chọn, câu hỏi Đúng/Sai hoặc tự luận cho Tin 10 (Python) hoặc Tin 11 (Thuật toán).\n2. **Giải đáp cú pháp Python**: Vòng lặp for/while, hàm range(), danh sách list, bẫy lỗi IndexError.\n3. **Giải đáp Thuật toán Tin 11**: Tìm kiếm tuần tự / nhị phân, sắp xếp nổi bọt (Bubble Sort) / sắp xếp chèn (Insertion Sort).\n\nHãy nhập yêu cầu chi tiết (ví dụ: *"Soạn 2 câu hỏi trắc nghiệm về hàm range"* hoặc *"Giải thích điều kiện của Binary Search"*) nhé!`,
      citation: 'Nguồn: sources (SGK Tin học 10 & 11 KNTT) & analysisPreview (Soạn câu hỏi & Ôn tập)',
      sources: ['sources', 'analysisPreview']
    };
  }

  // 5. Default Strict Refusal
  return {
    isGrounded: false,
    replyText: `Nội dung này nằm ngoài phạm vi tài liệu đã cung cấp.\n\nAI Trợ Giảng được thiết lập chế độ Grounded nghiêm ngặt cho môn Tin học: chỉ giải đáp thắc mắc liên quan trực tiếp đến tài liệu học tập Tin học 10, Tin học 11 hoặc hỗ trợ soạn câu hỏi kiểm tra môn Tin học. Em hãy thử chọn các câu hỏi gợi ý bên dưới hoặc yêu cầu soạn câu hỏi nhé!`,
    citation: 'Từ chối theo quy tắc Grounding (Không có trong tài liệu và không suy ra được từ tài liệu)',
    sources: []
  };
}

/**
 * Sample prompt questions for student & teacher testing
 */
export const SAMPLE_GROUNDED_QUESTIONS = [
  {
    type: 'authoring',
    label: '📝 Soạn câu hỏi Trắc nghiệm Python',
    prompt: 'Hãy soạn 3 câu hỏi trắc nghiệm về Vòng lặp For và hàm range() trong Python môn Tin học 10 có kèm đáp án và giải thích chi tiết.'
  },
  {
    type: 'authoring',
    label: '🎯 Soạn câu hỏi Tìm kiếm Nhị phân',
    prompt: 'Soạn 2 câu hỏi phân loại học sinh về thuật toán Tìm kiếm Nhị phân theo SGK Tin học 11 Kết Nối Tri Thức.'
  },
  {
    type: 'in-scope',
    label: 'Cú pháp range() trong Python',
    prompt: 'Cú pháp vòng lặp for với hàm range() trong Python như thế nào?'
  },
  {
    type: 'in-scope',
    label: 'Điều kiện Tìm kiếm nhị phân',
    prompt: 'Điều kiện bắt buộc trước khi thực hiện thuật toán tìm kiếm nhị phân là gì?'
  },
  {
    type: 'out-of-scope',
    label: 'Hỏi môn Toán (Thử nghiệm từ chối)',
    prompt: 'Giải phương trình bậc hai 2x^2 + 5x - 3 = 0 giúp mình với?'
  },
  {
    type: 'out-of-scope',
    label: 'Hỏi môn Hóa (Thử nghiệm từ chối)',
    prompt: 'Cho biết phản ứng giữa axit HCl và kim loại Fe tạo ra khí gì?'
  }
];
