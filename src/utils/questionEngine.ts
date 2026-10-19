import { PracticeQuestion, PracticeQuestionType } from '../types';

/**
 * Question Generator Engine for Informatics Practice Questions (GDPT 2018)
 * Fulfills all requirements from Prompt #04:
 * - Đa dạng ở mức cơ bản: Đúng/Sai, Lựa chọn, Điền từ ngắn, Hỏi-đáp ngắn
 * - Phù hợp học sinh lớp [chọn lớp: Lớp 10, Lớp 11, Lớp 7, 8, 9, 12]
 * - Ưu tiên giúp ôn bài trên trường (SGK Kết Nối Tri Thức Với Cuộc Sống)
 * - Chưa cần game hóa mạnh (giao diện tập trung, sư phạm)
 * - Lưu danh sách câu hỏi vào LocalStorage
 * - Tránh câu hỏi chung chung / meta; bám kiến thức thật (code Python, C++, thuật toán)
 */

export const DEFAULT_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // 1. Dạng Đúng / Sai (True / False) - Tin 10: Vòng lặp for
  {
    id: 'pq-01',
    type: 'true_false',
    grade: 'Lớp 10',
    subjectTopic: 'Chủ đề 4: Lập trình Python cơ bản - Vòng lặp for & hàm range()',
    lessonRef: 'Bài 16: Cấu trúc lặp',
    question: 'Trong Python, lệnh "for i in range(1, 5):" sẽ duyệt biến i qua các giá trị lần lượt là 1, 2, 3, 4, 5. Nhận định này ĐÚNG hay SAI?',
    codeSnippet: 'for i in range(1, 5):\n    print(i, end=" ")',
    correctBool: false,
    explanation: 'SAI. Hàm range(start, stop) trong Python duyệt từ start đến stop - 1 (cận trên luôn bị loại trừ). Do đó biến i chỉ nhận các giá trị là 1, 2, 3, 4 (tổng cộng 4 lần lặp, không có số 5).',
    dateAdded: 'Mặc định chuẩn SGK'
  },
  // 2. Dạng Lựa chọn (Multiple Choice) - Tin 10: Kiểu dữ liệu xâu ký tự
  {
    id: 'pq-02',
    type: 'multiple_choice',
    grade: 'Lớp 10',
    subjectTopic: 'Chủ đề 4: Lập trình Python - Kiểu dữ liệu xâu ký tự (String)',
    lessonRef: 'Bài 24: Xâu ký tự trong Python',
    question: 'Cho xâu s = "TIN HỌC 10". Kết quả của biểu thức s[0:3] trong Python là gì?',
    codeSnippet: 's = "TIN HỌC 10"\nprint(s[0:3])',
    options: [
      '"TIN"',
      '"TIN "',
      '"TI"',
      '"TIN H"'
    ],
    correctOptionIndex: 0,
    explanation: 'Cú pháp cắt lát s[start:stop] lấy các ký tự từ chỉ số 0 đến 2 (vị trí 3 bị loại trừ). s[0]=\'T\', s[1]=\'I\', s[2]=\'N\'. Kết quả là xâu "TIN".',
    dateAdded: 'Mặc định chuẩn SGK'
  },
  // 3. Dạng Điền từ ngắn (Fill in the blank) - Tin 10: Thêm phần tử vào danh sách
  {
    id: 'pq-03',
    type: 'fill_in_blank',
    grade: 'Lớp 10',
    subjectTopic: 'Chủ đề 4: Kiểu dữ liệu danh sách (List)',
    lessonRef: 'Bài 20: Câu lệnh lặp for và danh sách',
    question: 'Hãy điền tên phương thức (tên hàm) còn thiếu vào chỗ trống để thêm giá trị 100 vào cuối danh sách a.',
    codeSnippet: 'a = [10, 20, 30]\na._______(100)\nprint(a) # Output: [10, 20, 30, 100]',
    correctBlankAnswer: 'append',
    acceptableAnswers: ['append', 'append()', 'a.append'],
    explanation: 'Trong Python, phương thức a.append(x) được dùng để chèn phần tử x vào vị trí cuối cùng của danh sách a.',
    dateAdded: 'Mặc định chuẩn SGK'
  },
  // 4. Dạng Hỏi - Đáp ngắn (Short Q&A) - Tin 11: Tìm kiếm nhị phân
  {
    id: 'pq-04',
    type: 'short_answer',
    grade: 'Lớp 11',
    subjectTopic: 'Chủ đề 1: Thuật toán tìm kiếm nhị phân (Binary Search)',
    lessonRef: 'Bài 12: Thuật toán tìm kiếm nhị phân',
    question: 'Để áp dụng được thuật toán tìm kiếm nhị phân trên một mảng số nguyên, mảng đó BẮT BUỘC phải thỏa mãn điều kiện tiên quyết nào?',
    codeSnippet: '# Tìm kiếm nhị phân chỉ chạy đúng khi:\n# Mảng A = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]',
    sampleAnswer: 'Mảng bắt buộc phải được sắp xếp trước theo một trật tự xác định (tăng dần hoặc giảm dần).',
    keyPointsNeeded: ['đã sắp xếp', 'thứ tự tăng dần hoặc giảm dần', 'sắp xếp trước'],
    explanation: 'Tìm kiếm nhị phân dựa trên nguyên tắc so sánh khóa với phần tử ở giữa (mid) để loại bỏ một nửa số phần tử. Nếu mảng chưa sắp xếp, việc loại bỏ một nửa có thể làm mất phần tử cần tìm.',
    dateAdded: 'Mặc định chuẩn SGK'
  },
  // 5. Dạng Đúng / Sai (True / False) - Tin 11: Thuật toán sắp xếp nổi bọt
  {
    id: 'pq-05',
    type: 'true_false',
    grade: 'Lớp 11',
    subjectTopic: 'Chủ đề 1: Thuật toán sắp xếp nổi bọt (Bubble Sort)',
    lessonRef: 'Bài 13: Thuật toán sắp xếp nổi bọt',
    question: 'Trong thuật toán sắp xếp nổi bọt tăng dần, sau lượt duyệt (pass) đầu tiên, phần tử CÓ GIÁ TRỊ LỚN NHẤT trong mảng chắc chắn sẽ nằm ở vị trí cuối cùng của mảng. Nhận định này ĐÚNG hay SAI?',
    codeSnippet: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]',
    correctBool: true,
    explanation: 'ĐÚNG. Ở mỗi lượt so sánh hai phần tử liền kề, phần tử lớn hơn luôn được đẩy dần về phía sau. Sau lượt quét thứ nhất, phần tử lớn nhất chắc chắn đã "nổi" về đúng vị trí cuối cùng.',
    dateAdded: 'Mặc định chuẩn SGK'
  },
  // 6. Dạng Lựa chọn (Multiple Choice) - Tin 10: Vòng lặp while
  {
    id: 'pq-06',
    type: 'multiple_choice',
    grade: 'Lớp 10',
    subjectTopic: 'Chủ đề 4: Cấu trúc lặp while',
    lessonRef: 'Bài 17: Vòng lặp while',
    question: 'Đoạn mã sau đây sẽ in ra màn hình giá trị của biến count là bao nhiêu?',
    codeSnippet: 'count = 1\nwhile count < 8:\n    count = count * 2\nprint(count)',
    options: [
      '8',
      '4',
      '16',
      'Vòng lặp vô tận không in ra kết quả'
    ],
    correctOptionIndex: 0,
    explanation: 'Lần 1: count=1 (<8) -> count=2. Lần 2: count=2 (<8) -> count=4. Lần 3: count=4 (<8) -> count=8. Lần 4: count=8 (không còn < 8) -> dừng lặp. Lệnh print in ra 8.',
    dateAdded: 'Mặc định chuẩn SGK'
  },
  // 7. Dạng Điền từ ngắn (Fill in the blank) - Tin 10 / C++: Nhập xuất dữ liệu
  {
    id: 'pq-07',
    type: 'fill_in_blank',
    grade: 'Lớp 10',
    subjectTopic: 'Chủ đề 4: Nhập dữ liệu số nguyên từ bàn phím',
    lessonRef: 'Bài 6: Dữ liệu và các phép toán',
    question: 'Hàm input() trong Python luôn trả về dữ liệu kiểu chuỗi ký tự (str). Để chuyển giá trị người dùng nhập vào thành số nguyên, ta dùng hàm nào bọc bên ngoài?',
    codeSnippet: 'n = ______(input("Nhập số nguyên n: "))',
    correctBlankAnswer: 'int',
    acceptableAnswers: ['int', 'int()'],
    explanation: 'Hàm int() dùng để ép kiểu (chuyển đổi) dữ liệu từ chuỗi chữ số hoặc số thực thành số nguyên (integer).',
    dateAdded: 'Mặc định chuẩn SGK'
  },
  // 8. Dạng Hỏi - Đáp ngắn (Short Q&A) - Tin 10: Hàm và chương trình con
  {
    id: 'pq-08',
    type: 'short_answer',
    grade: 'Lớp 10',
    subjectTopic: 'Chủ đề 4: Chương trình con và Hàm (Functions)',
    lessonRef: 'Bài 26: Hàm trong Python',
    question: 'Từ khóa nào trong Python được dùng để định nghĩa một hàm mới, và từ khóa nào được dùng để trả kết quả từ trong hàm về nơi gọi?',
    codeSnippet: 'def tinh_tong(a, b):\n    return a + b',
    sampleAnswer: 'Dùng từ khóa "def" để định nghĩa hàm, và từ khóa "return" để trả kết quả về.',
    keyPointsNeeded: ['def', 'return', 'định nghĩa def', 'trả về return'],
    explanation: 'Cú pháp định nghĩa hàm: def ten_ham(tham_so): và bên trong thân hàm sử dụng return <gia_tri> để trả về dữ liệu kết quả.',
    dateAdded: 'Mặc định chuẩn SGK'
  }
];

/**
 * Storage helpers for LocalStorage persistence
 */
const STORAGE_KEY = 'cpb_practice_questions';

export function loadPracticeQuestionsFromStorage(): PracticeQuestion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading practice questions from LocalStorage', e);
  }
  return DEFAULT_PRACTICE_QUESTIONS;
}

export function savePracticeQuestionsToStorage(questions: PracticeQuestion[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Error saving practice questions to LocalStorage', e);
  }
}

/**
 * Question generator by topic and grade level
 */
export function generateCurriculumQuestionSet(
  targetTopic: string,
  targetGrade: string = 'Lớp 10'
): PracticeQuestion[] {
  const now = new Date().toLocaleTimeString('vi-VN');
  const lowerTopic = targetTopic.toLowerCase();

  // If topic is about loops/vòng lặp
  if (lowerTopic.includes('lặp') || lowerTopic.includes('for') || lowerTopic.includes('while') || lowerTopic.includes('loop')) {
    return [
      {
        id: `gen-q-${Date.now()}-1`,
        type: 'true_false',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Vòng lặp "while điều_kiện:" trong Python kiểm tra điều kiện lặp TRƯỚC KHI thực hiện khối lệnh bên trong. Đúng hay Sai?',
        codeSnippet: 'i = 0\nwhile i < 3:\n    print(i)\n    i += 1',
        correctBool: true,
        explanation: 'ĐÚNG. Vòng lặp while là vòng lặp với số lần lặp chưa biết trước, luôn kiểm tra điều kiện lặp trước mỗi lần thực thi. Nếu điều kiện đúng thì chạy lệnh, sai thì thoát.',
        dateAdded: `Tạo lúc ${now}`
      },
      {
        id: `gen-q-${Date.now()}-2`,
        type: 'multiple_choice',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Lệnh range(2, 10, 3) trong Python sẽ sinh ra dãy các số nào sau đây?',
        codeSnippet: 'for x in range(2, 10, 3):\n    print(x, end=" ")',
        options: ['2, 5, 8', '2, 5, 8, 11', '3, 6, 9', '2, 3, 4, 5, 6, 7, 8, 9'],
        correctOptionIndex: 0,
        explanation: 'range(start, stop, step): Bắt đầu từ 2, cộng thêm 3 sau mỗi bước: 2 + 3 = 5; 5 + 3 = 8; 8 + 3 = 11 (vượt quá cận 10 nên dừng). Dãy số là: 2, 5, 8.',
        dateAdded: `Tạo lúc ${now}`
      },
      {
        id: `gen-q-${Date.now()}-3`,
        type: 'fill_in_blank',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Để dừng và thoát ngay lập tức khỏi một vòng lặp trước khi nó kết thúc bình thường, ta dùng lệnh gì?',
        codeSnippet: 'for i in range(10):\n    if i == 5:\n        _____\n    print(i)',
        correctBlankAnswer: 'break',
        acceptableAnswers: ['break', 'break;'],
        explanation: 'Lệnh "break" dùng để ngắt và thoát khỏi vòng lặp for hoặc while gần nhất đang chứa nó.',
        dateAdded: `Tạo lúc ${now}`
      },
      {
        id: `gen-q-${Date.now()}-4`,
        type: 'short_answer',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Hiện tượng "vòng lặp vô tận" (infinite loop) trong vòng lặp while thường xảy ra do nguyên nhân cốt lõi nào?',
        codeSnippet: 'x = 1\nwhile x > 0:\n    print(x)\n    # Quên cập nhật x!',
        sampleAnswer: 'Do biểu thức điều kiện luôn nhận giá trị True và bên trong vòng lặp không có lệnh cập nhật làm thay đổi điều kiện dừng.',
        keyPointsNeeded: ['điều kiện luôn đúng', 'không có lệnh cập nhật', 'không bao giờ False'],
        explanation: 'Để tránh lặp vô tận, trong thân vòng lặp while bắt buộc phải có câu lệnh làm thay đổi giá trị của các biến trong biểu thức điều kiện sao cho đến một lúc nào đó điều kiện sẽ trở thành False.',
        dateAdded: `Tạo lúc ${now}`
      }
    ];
  }

  // If topic is about array/list/danh sách
  if (lowerTopic.includes('list') || lowerTopic.includes('danh sách') || lowerTopic.includes('mảng') || lowerTopic.includes('array')) {
    return [
      {
        id: `gen-q-${Date.now()}-1`,
        type: 'true_false',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Trong Python, chỉ số (index) của phần tử đầu tiên trong danh sách luôn là 1. Đúng hay Sai?',
        codeSnippet: 'arr = [10, 20, 30]\nprint(arr[0]) # In ra 10',
        correctBool: false,
        explanation: 'SAI. Trong hầu hết các ngôn ngữ lập trình hiện đại như Python và C++, chỉ số phần tử đầu tiên bắt đầu từ số 0 (Zero-based indexing).',
        dateAdded: `Tạo lúc ${now}`
      },
      {
        id: `gen-q-${Date.now()}-2`,
        type: 'multiple_choice',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Cho mảng a = [5, 12, 7, 3, 9]. Hàm len(a) trả về kết quả là bao nhiêu?',
        codeSnippet: 'a = [5, 12, 7, 3, 9]\nprint(len(a))',
        options: ['5', '4', '12', '9'],
        correctOptionIndex: 0,
        explanation: 'Hàm len(a) đếm tổng số lượng phần tử hiện có trong danh sách a. Ở đây danh sách có 5 phần tử nên len(a) = 5.',
        dateAdded: `Tạo lúc ${now}`
      },
      {
        id: `gen-q-${Date.now()}-3`,
        type: 'fill_in_blank',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Để lấy phần tử CUỐI CÙNG của danh sách lst bằng chỉ số âm trong Python, ta dùng chỉ số bao nhiêu?',
        codeSnippet: 'last_item = lst[___]',
        correctBlankAnswer: '-1',
        acceptableAnswers: ['-1', 'len(lst)-1'],
        explanation: 'Trong Python, chỉ số âm được đếm ngược từ cuối danh sách: lst[-1] là phần tử cuối cùng, lst[-2] là phần tử áp chót.',
        dateAdded: `Tạo lúc ${now}`
      },
      {
        id: `gen-q-${Date.now()}-4`,
        type: 'short_answer',
        grade: targetGrade,
        subjectTopic: targetTopic,
        question: 'Lỗi "IndexError: list index out of range" xuất hiện khi nào trong quá trình chạy chương trình?',
        codeSnippet: 'a = [1, 2, 3]\nprint(a[5]) # Gây ra IndexError',
        sampleAnswer: 'Khi chương trình cố gắng truy cập vào một phần tử có chỉ số vượt quá phạm vi độ dài của danh sách.',
        keyPointsNeeded: ['chỉ số vượt quá', 'ngoài phạm vi', 'lớn hơn len - 1'],
        explanation: 'Nếu danh sách có n phần tử, các chỉ số hợp lệ chỉ từ 0 đến n-1 (hoặc -n đến -1). Mọi truy cập vào chỉ số ngoài phạm vi này đều gây lỗi IndexError.',
        dateAdded: `Tạo lúc ${now}`
      }
    ];
  }

  // General Informatics Question Set (bám sát chương trình phổ thông)
  return [
    {
      id: `gen-q-${Date.now()}-1`,
      type: 'true_false',
      grade: targetGrade,
      subjectTopic: targetTopic,
      question: `Trong Tin học phổ thông, bài toán "${targetTopic}" đòi hỏi phải xác định rõ ràng Input (dữ liệu đầu vào) và Output (kết quả đầu ra). Đúng hay Sai?`,
      codeSnippet: '# Xác định Input & Output là bước đầu tiên của thuật toán',
      correctBool: true,
      explanation: 'ĐÚNG. Mọi thuật toán giải quyết bài toán trên máy tính đều phải có Input (đầu vào xác định) và Output (kết quả đầu ra mong muốn theo yêu cầu).',
      dateAdded: `Tạo lúc ${now}`
    },
    {
      id: `gen-q-${Date.now()}-2`,
      type: 'multiple_choice',
      grade: targetGrade,
      subjectTopic: targetTopic,
      question: `Khi viết mã nguồn giải quyết "${targetTopic}", quy tắc nào sau đây giúp mã nguồn dễ hiểu và đạt điểm thực hành cao trên trường?`,
      options: [
        'Đặt tên biến có ý nghĩa gợi nhớ và thụt đầu dòng (indentation) chuẩn xác',
        'Viết toàn bộ chương trình trên một dòng duy nhất để tiết kiệm dòng',
        'Đặt tất cả tên biến là a, b, c, x, y, z mà không có chú thích',
        'Sao chép mã từ internet mà không cần kiểm thử lại'
      ],
      correctOptionIndex: 0,
      explanation: 'Theo chuẩn sư phạm GDPT 2018, học sinh cần rèn luyện thói quen đặt tên biến rõ nghĩa (VD: tong_diem, so_luong) và định dạng thụt lề chuẩn để chương trình mạch lạc, tránh lỗi cú pháp.',
      dateAdded: `Tạo lúc ${now}`
    },
    {
      id: `gen-q-${Date.now()}-3`,
      type: 'fill_in_blank',
      grade: targetGrade,
      subjectTopic: targetTopic,
      question: 'Ký tự nào được dùng ở đầu dòng để viết dòng chú thích (comment) đơn dòng trong ngôn ngữ Python?',
      codeSnippet: '__ Đây là dòng chú thích giải thích thuật toán',
      correctBlankAnswer: '#',
      acceptableAnswers: ['#', 'dấu #'],
      explanation: 'Trong Python, dấu thăng (#) được dùng để bắt đầu một dòng chú thích. Trình thông dịch sẽ bỏ qua toàn bộ ký tự phía sau dấu # trên dòng đó.',
      dateAdded: `Tạo lúc ${now}`
    },
    {
      id: `gen-q-${Date.now()}-4`,
      type: 'short_answer',
      grade: targetGrade,
      subjectTopic: targetTopic,
      question: `Nêu 2 bước cơ bản mà học sinh cần thực hiện trước khi nộp bài thực hành "${targetTopic}" cho thầy cô giáo.`,
      sampleAnswer: '1. Chạy thử nghiệm với các bộ dữ liệu mẫu và dữ liệu biên để kiểm tra tính đúng đắn; 2. Tự giải thích được ý nghĩa các câu lệnh chính trong bài.',
      keyPointsNeeded: ['chạy thử test case', 'kiểm tra dữ liệu biên', 'giải thích được code'],
      explanation: 'Rèn luyện thói quen tự kiểm thử mã nguồn (test cases) và bảo đảm tính liêm chính học thuật (hiểu rõ từng dòng lệnh mình viết) là mục tiêu cốt lõi của môn Tin học.',
      dateAdded: `Tạo lúc ${now}`
    }
  ];
}
