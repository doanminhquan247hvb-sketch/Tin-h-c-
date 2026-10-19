/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Topic Snapshot Engine - Save & Load Working Copy for Subject & Study Pack
 * 
 * Requirements:
 * - Khi bấm "Lưu chủ đề này": Lưu snapshot working copy hiện tại (không chỉ lưu tên)
 *   Tối thiểu gồm: subject, sources, analysisPreview, studyPack, metadata cần thiết
 * - Khi bấm "Mở": Restore snapshot đó về app hiện tại và UI thay đổi rõ
 * - Mở lại trang vẫn xem được môn đã học (Lưu LocalStorage bền vững)
 * - Có thể đổi tên ngắn hoặc xóa môn không dùng
 * - Giữ mức cơ bản, dễ thao tác
 */

import { StudyMaterial, Flashcard, PracticeQuestion, QASeedItem } from '../types';

export interface AnalysisPreviewSnapshot {
  summary: string;
  keyPoints: string[];
  coreConcepts: string[];
  commonMistakes: string[];
  pedagogyTip: string;
  targetAudience: string;
}

export interface StudyPackSnapshot {
  flashcards: Flashcard[];
  questions: PracticeQuestion[];
  qaSeeds: QASeedItem[];
}

export interface TopicSnapshot {
  id: string;
  title: string;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    version: string;
    targetGrade: 'tin10' | 'tin11' | 'cpp' | 'general';
    sourcesCount: number;
    flashcardCount: number;
    questionCount: number;
    qaSeedCount: number;
  };
  sources: StudyMaterial[];
  analysisPreview: AnalysisPreviewSnapshot;
  studyPack: StudyPackSnapshot;
}

const SNAPSHOTS_STORAGE_KEY = 'cpb_saved_topic_snapshots';
const ACTIVE_SNAPSHOT_ID_KEY = 'cpb_active_topic_snapshot_id';

// Default pre-populated snapshots for Tin học 10 & 11 (KNTT) & C++
export const DEFAULT_PRESET_SNAPSHOTS: TopicSnapshot[] = [
  {
    id: 'snap-tin10-python-loop',
    title: 'Tin 10 - Vòng lặp For/While & List Python',
    subject: 'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python',
    description: 'Bộ ôn tập trọng tâm về cú pháp vòng lặp for với range(), vòng lặp while, kiểu dữ liệu danh sách List và xử lý ngoại lệ IndexError.',
    createdAt: '2026-10-10T08:00:00.000Z',
    updatedAt: '2026-10-12T04:30:00.000Z',
    metadata: {
      version: '1.0',
      targetGrade: 'tin10',
      sourcesCount: 2,
      flashcardCount: 3,
      questionCount: 3,
      qaSeedCount: 2,
    },
    sources: [
      {
        id: 'src-tin10-01',
        type: 'text',
        title: 'Lý thuyết Vòng lặp For & While trong Python',
        subjectTopic: 'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python',
        content: `1. Cú pháp vòng lặp for với range():
- range(n): sinh dãy từ 0 đến n-1
- range(start, stop, step): bắt đầu từ start, bước nhảy step, dừng trước stop.
Ví dụ: for i in range(1, 10, 2): in các số lẻ 1 3 5 7 9.

2. Vòng lặp while: lặp khi điều kiện vẫn là True. Lưu ý cập nhật biến lặp tránh lặp vô tận.`,
        dateAdded: '10/10/2026',
        createdAt: '2026-10-10T08:00:00.000Z',
        notes: 'Chuẩn kiến thức SGK Tin học 10 KNTT'
      },
      {
        id: 'src-tin10-02',
        type: 'note',
        title: 'Bẫy lỗi IndexError & Thao tác Danh sách List',
        subjectTopic: 'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python',
        content: `1. Bẫy lỗi IndexError: Chỉ số mảng Python từ 0 đến len(arr)-1.
2. Phương thức append(x): thêm phần tử vào cuối danh sách.
3. input() luôn trả về chuỗi, cần dùng int(input()) khi tính toán số học.`,
        dateAdded: '11/10/2026',
        createdAt: '2026-10-11T09:00:00.000Z',
        notes: 'Ghi chú trọng tâm phòng tránh bẫy lỗi'
      }
    ],
    analysisPreview: {
      summary: 'Chủ đề tập trung vào hai cấu trúc lặp cơ bản trong Python (for/while) và kiểu dữ liệu danh sách có thứ tự. Nắm vững cơ chế sinh số của hàm range() và kiểm soát biến đếm.',
      keyPoints: [
        'Cú pháp range(start, stop, step)',
        'Điều kiện dừng của vòng lặp while',
        'Cách truy cập chỉ số và thêm phần tử trong list'
      ],
      coreConcepts: ['Vòng lặp xác định', 'Vòng lặp không xác định', 'List index', 'range()'],
      commonMistakes: [
        'Nhầm lẫn cận stop của hàm range(n) - range chỉ chạy đến n-1',
        'Quên cập nhật biến điều kiện trong vòng lặp while gây treo máy',
        'Lỗi IndexError khi truy cập arr[len(arr)]'
      ],
      pedagogyTip: 'Nên cho học sinh vẽ bảng trace table ghi lại giá trị biến đếm qua từng bước lặp.',
      targetAudience: 'Học sinh lớp 10 theo chương trình GDPT 2018'
    },
    studyPack: {
      flashcards: [
        {
          id: 'fc-snap-10-01',
          subject: 'Tin học 10 (KNTT)',
          front: 'Cú pháp cơ bản của hàm range(start, stop, step) trong Python là gì?',
          back: 'range(start, stop, step) sinh ra dãy số bắt đầu từ start, tăng từng bước step và kết thúc trước stop (không bao gồm stop).',
          category: 'cú pháp' as any,
          dateAdded: '12/10/2026'
        },
        {
          id: 'fc-snap-10-02',
          subject: 'Tin học 10 (KNTT)',
          front: 'Lỗi IndexError: list index out of range xuất hiện khi nào?',
          back: 'Xuất hiện khi chương trình cố gắng truy cập vào một chỉ số index không tồn tại trong danh sách (chỉ số hợp lệ chỉ từ 0 đến len(arr)-1).',
          category: 'quy tắc',
          dateAdded: '12/10/2026'
        },
        {
          id: 'fc-snap-10-03',
          subject: 'Tin học 10 (KNTT)',
          front: 'Lệnh nào dùng để thêm phần tử x vào cuối danh sách list a?',
          back: 'Lệnh a.append(x)',
          category: 'khái niệm',
          dateAdded: '12/10/2026'
        }
      ],
      questions: [
        {
          id: 'q-snap-10-01',
          type: 'multiple_choice',
          grade: 'Lớp 10',
          subjectTopic: 'Vòng lặp Python',
          question: 'Lệnh print(list(range(2, 9, 3))) sẽ cho kết quả là dãy số nào?',
          options: ['[2, 5, 8]', '[2, 5, 8, 11]', '[3, 6, 9]', '[2, 4, 6, 8]'],
          correctOptionIndex: 0,
          explanation: 'Bắt đầu từ 2, tăng 3 được 5, tăng 3 được 8. Bước tiếp theo là 11 >= 9 nên dừng lại.',
          dateAdded: '12/10/2026'
        },
        {
          id: 'q-snap-10-02',
          type: 'true_false',
          grade: 'Lớp 10',
          subjectTopic: 'Vòng lặp while',
          question: 'Trong Python, vòng lặp while chỉ thực hiện khối lệnh khi điều kiện lặp nhận giá trị False.',
          correctBool: false,
          explanation: 'Sai. Vòng lặp while thực hiện khối lệnh khi điều kiện là True. Khi điều kiện nhận giá trị False thì vòng lặp kết thúc.',
          dateAdded: '12/10/2026'
        },
        {
          id: 'q-snap-10-03',
          type: 'multiple_choice',
          grade: 'Lớp 10',
          subjectTopic: 'Danh sách List',
          question: 'Cho mảng a = [10, 20, 30]. Lệnh a.append(40) sẽ làm danh sách a trở thành:',
          options: ['[40, 10, 20, 30]', '[10, 20, 30, 40]', '[10, 20, 40]', '[40]'],
          correctOptionIndex: 1,
          explanation: 'append() luôn thêm phần tử vào cuối danh sách, do đó kết quả là [10, 20, 30, 40].',
          dateAdded: '12/10/2026'
        }
      ],
      qaSeeds: [
        {
          id: 'qa-snap-10-01',
          subject: 'Tin học 10',
          topic: 'Vòng lặp for',
          question: 'Tại sao range(5) chỉ in từ 0 đến 4 mà không có số 5?',
          shortAnswer: 'Vì quy ước của Python chỉ số bắt đầu từ 0 và có đúng 5 phần tử (0, 1, 2, 3, 4).',
          dateAdded: '12/10/2026'
        }
      ]
    }
  },
  {
    id: 'snap-tin11-algorithms',
    title: 'Tin 11 - Thuật toán Tìm kiếm & Sắp xếp',
    subject: 'Tin học 11 (KNTT) - Chủ đề: Cấu trúc dữ liệu & Thuật toán',
    description: 'Bộ ôn tập thuật toán tìm kiếm tuần tự, tìm kiếm nhị phân chia đôi khoảng, thuật toán sắp xếp nổi bọt (Bubble Sort) và sắp xếp chèn (Insertion Sort).',
    createdAt: '2026-10-11T10:00:00.000Z',
    updatedAt: '2026-10-12T04:35:00.000Z',
    metadata: {
      version: '1.0',
      targetGrade: 'tin11',
      sourcesCount: 2,
      flashcardCount: 3,
      questionCount: 3,
      qaSeedCount: 2,
    },
    sources: [
      {
        id: 'src-tin11-01',
        type: 'text',
        title: 'Thuật toán tìm kiếm nhị phân (Binary Search)',
        subjectTopic: 'Tin học 11 (KNTT) - Bài 21',
        content: `1. Ý tưởng: Chia đôi khoảng tìm kiếm, so sánh khóa cần tìm với phần tử chính giữa mid = (left + right) // 2.
2. Điều kiện tiên quyết: Dãy mảng PHẢI ĐÃ ĐƯỢC SẮP XẾP.
3. Độ phức tạp: O(log2 N), tối ưu hơn nhiều so với tìm kiếm tuần tự O(N).`,
        dateAdded: '11/10/2026',
        createdAt: '2026-10-11T10:00:00.000Z'
      },
      {
        id: 'src-tin11-02',
        type: 'text',
        title: 'Thuật toán sắp xếp nổi bọt và sắp xếp chèn',
        subjectTopic: 'Tin học 11 (KNTT) - Bài 22',
        content: `1. Sắp xếp nổi bọt: So sánh các cặp liền kề, đổi chỗ nếu sai thứ tự. Sau mỗi lượt phần tử lớn nhất về cuối dãy.
2. Sắp xếp chèn: Duyệt từ vị trí 1 đến n-1, chèn phần tử vào đoạn con đã sắp xếp phía trước.
Độ phức tạp trường hợp xấu nhất: O(N^2).`,
        dateAdded: '11/10/2026',
        createdAt: '2026-10-11T11:00:00.000Z'
      }
    ],
    analysisPreview: {
      summary: 'Cung cấp cơ sở lý thuyết và cài đặt hai thuật toán tìm kiếm (tuần tự, nhị phân) và hai thuật toán sắp xếp cơ bản (nổi bọt, chèn). Trọng tâm là phân tích điều kiện áp dụng và độ phức tạp.',
      keyPoints: [
        'Điều kiện mảng có thứ tự của tìm kiếm nhị phân',
        'Quy tắc hoán đổi cặp liền kề trong Bubble Sort',
        'Cách dịch chuyển phần tử để chèn trong Insertion Sort'
      ],
      coreConcepts: ['Chia đôi khoảng', 'Độ phức tạp O(logN)', 'Hoán vị phần tử', 'Đoạn con có thứ tự'],
      commonMistakes: [
        'Áp dụng tìm kiếm nhị phân cho mảng chưa sắp xếp',
        'Tính sai chỉ số mid = (left + right) // 2 dẫn đến lặp vô tận',
        'Quên lệnh gán hoán đổi (swap) trong thuật toán sắp xếp'
      ],
      pedagogyTip: 'Yêu cầu học sinh vẽ bảng trace table từng lượt chạy với mảng cụ thể 5-6 phần tử.',
      targetAudience: 'Học sinh lớp 11 theo SGK Tin học Kết Nối Tri Thức'
    },
    studyPack: {
      flashcards: [
        {
          id: 'fc-snap-11-01',
          subject: 'Tin học 11 (KNTT)',
          front: 'Điều kiện bắt buộc trước khi thực hiện thuật toán tìm kiếm nhị phân là gì?',
          back: 'Dãy / mảng phải được sắp xếp trước theo một thứ tự xác định (tăng dần hoặc giảm dần).',
          category: 'quy tắc',
          dateAdded: '12/10/2026'
        },
        {
          id: 'fc-snap-11-02',
          subject: 'Tin học 11 (KNTT)',
          front: 'Độ phức tạp thời gian của thuật toán tìm kiếm nhị phân là bao nhiêu?',
          back: 'O(log2 N) - thời gian tăng theo logarit số phần tử của mảng.',
          category: 'định nghĩa',
          dateAdded: '12/10/2026'
        },
        {
          id: 'fc-snap-11-03',
          subject: 'Tin học 11 (KNTT)',
          front: 'Nguyên lý hoạt động của thuật toán sắp xếp nổi bọt (Bubble Sort) là gì?',
          back: 'Liên tục so sánh hai phần tử liền kề và đổi chỗ nếu chúng sai thứ tự, làm cho phần tử lớn nhất dần nổi về cuối dãy sau mỗi vòng lặp.',
          category: 'khái niệm',
          dateAdded: '12/10/2026'
        }
      ],
      questions: [
        {
          id: 'q-snap-11-01',
          type: 'multiple_choice',
          grade: 'Lớp 11',
          subjectTopic: 'Tìm kiếm nhị phân',
          question: 'Với dãy 64 phần tử đã sắp xếp, thuật toán tìm kiếm nhị phân cần tối đa bao nhiêu lần so sánh?',
          options: ['6 lần', '32 lần', '64 lần', '7 lần'],
          correctOptionIndex: 0,
          explanation: 'Vì 2^6 = 64, nên số phép so sánh tối đa là log2(64) = 6 lần.',
          dateAdded: '12/10/2026'
        },
        {
          id: 'q-snap-11-02',
          type: 'true_false',
          grade: 'Lớp 11',
          subjectTopic: 'Thuật toán sắp xếp',
          question: 'Thuật toán sắp xếp chèn (Insertion Sort) có độ phức tạp trong trường hợp tốt nhất (mảng đã có thứ tự sẵn) là O(N).',
          correctBool: true,
          explanation: 'Đúng. Khi mảng đã sắp xếp sẵn, mỗi phần tử chỉ cần 1 lần so sánh với phần tử trước đó và không cần dịch chuyển mảng, do đó thời gian là O(N).',
          dateAdded: '12/10/2026'
        },
        {
          id: 'q-snap-11-03',
          type: 'multiple_choice',
          grade: 'Lớp 11',
          subjectTopic: 'Tìm kiếm tuần tự vs Nhị phân',
          question: 'Khi mảng chưa được sắp xếp và ta chỉ cần tìm kiếm 1 lần duy nhất, giải pháp nào tối ưu nhất?',
          options: [
            'Dùng tìm kiếm tuần tự O(N)',
            'Sắp xếp mảng rồi tìm kiếm nhị phân',
            'Đảo ngược mảng rồi tìm',
            'Cả hai cách đều như nhau'
          ],
          correctOptionIndex: 0,
          explanation: 'Nếu sắp xếp mảng mất O(N log N) rồi mới tìm mất O(log N) thì tổng thời gian lâu hơn nhiều so với tìm kiếm tuần tự trực tiếp chỉ mất O(N).',
          dateAdded: '12/10/2026'
        }
      ],
      qaSeeds: [
        {
          id: 'qa-snap-11-01',
          subject: 'Tin học 11',
          topic: 'Thuật toán',
          question: 'Tại sao gọi là thuật toán sắp xếp nổi bọt?',
          shortAnswer: 'Vì các phần tử lớn nhất dần dần nổi lên vị trí cuối dãy giống như bọt khí nổi lên mặt nước.',
          dateAdded: '12/10/2026'
        }
      ]
    }
  },
  {
    id: 'snap-cpp-fundamentals',
    title: 'Tin THPT - Lập trình C++ Cơ bản & Mảng',
    subject: 'Tin học THPT - Lập trình C++ Chuyên đề',
    description: 'Bộ ôn tập ngôn ngữ C++: Nhập xuất cin/cout, khai báo biến, mảng tĩnh 1 chiều, truyền tham số tham chiếu (&) và giải thuật cơ bản.',
    createdAt: '2026-10-11T14:00:00.000Z',
    updatedAt: '2026-10-12T04:40:00.000Z',
    metadata: {
      version: '1.0',
      targetGrade: 'cpp',
      sourcesCount: 1,
      flashcardCount: 2,
      questionCount: 2,
      qaSeedCount: 1,
    },
    sources: [
      {
        id: 'src-cpp-01',
        type: 'text',
        title: 'Cơ bản về C++ & Mảng 1 chiều',
        subjectTopic: 'Lập trình C++',
        content: `1. Nhập xuất trong C++:
#include <iostream>
using namespace std;
cin >> n; cout << n << endl;

2. Mảng tĩnh: int arr[100]; chỉ số từ 0 đến n-1.
3. Tham chiếu: void hoanDoi(int &a, int &b) giúp thay đổi giá trị của biến thực sự bên ngoài hàm.`,
        dateAdded: '11/10/2026',
        createdAt: '2026-10-11T14:00:00.000Z'
      }
    ],
    analysisPreview: {
      summary: 'Tổng hợp cú pháp căn bản của ngôn ngữ C++, so sánh với Python về định kiểu tĩnh và cú pháp khối lệnh cặp ngoặc nhọn {}.',
      keyPoints: ['Thư viện iostream', 'Toán tử cin/cout', 'Truyền tham chiếu &'],
      coreConcepts: ['Kiểu dữ liệu tĩnh', 'Mảng 1 chiều', 'Hàm tham chiếu'],
      commonMistakes: ['Quên dấu chấm phẩy ;', 'Khai báo kích thước mảng nhỏ hơn thực tế gây lỗi bộ nhớ'],
      pedagogyTip: 'Nhắc học sinh luôn khởi tạo giá trị ban đầu cho biến trong C++.',
      targetAudience: 'Học sinh học C++ chuyên đề hoặc đội tuyển Tin THPT'
    },
    studyPack: {
      flashcards: [
        {
          id: 'fc-snap-cpp-01',
          subject: 'C++ THPT',
          front: 'Để hoán đổi giá trị 2 biến a và b qua hàm trong C++, ta cần truyền tham số theo dạng nào?',
          back: 'Truyền theo tham chiếu (dùng dấu & trước tên biến tham số: void swap(int &a, int &b)).',
          category: 'quy tắc',
          dateAdded: '12/10/2026'
        },
        {
          id: 'fc-snap-cpp-02',
          subject: 'C++ THPT',
          front: 'Toán tử nào trong C++ dùng để nhập dữ liệu từ bàn phím vào biến x?',
          back: 'Toán tử cin >> x (sử dụng thư viện <iostream>).',
          category: 'cú pháp' as any,
          dateAdded: '12/10/2026'
        }
      ],
      questions: [
        {
          id: 'q-snap-cpp-01',
          type: 'multiple_choice',
          grade: 'C++',
          subjectTopic: 'Cú pháp C++',
          question: 'Đoạn mã cout << (7 / 2); trong C++ sẽ in ra màn hình kết quả gì?',
          options: ['3.5', '3', '4', 'Báo lỗi biên dịch'],
          correctOptionIndex: 1,
          explanation: 'Vì cả 7 và 2 đều là số nguyên (int), phép chia / sẽ là phép chia lấy phần nguyên, kết quả là 3.',
          dateAdded: '12/10/2026'
        },
        {
          id: 'q-snap-cpp-02',
          type: 'true_false',
          grade: 'C++',
          subjectTopic: 'Mảng C++',
          question: 'Trong C++, chỉ số phần tử của mảng arr[N] bắt đầu từ 1 đến N.',
          correctBool: false,
          explanation: 'Sai. Trong C++, chỉ số mảng bắt đầu từ 0 đến N-1.',
          dateAdded: '12/10/2026'
        }
      ],
      qaSeeds: [
        {
          id: 'qa-snap-cpp-01',
          subject: 'C++',
          topic: 'Kiểu dữ liệu',
          question: 'Sự khác nhau cơ bản giữa int và double trong C++ là gì?',
          shortAnswer: 'int là kiểu số nguyên, còn double là kiểu số thực có dấu phẩy động.',
          dateAdded: '12/10/2026'
        }
      ]
    }
  }
];

/**
 * Load all snapshots from localStorage or fall back to preset defaults
 */
export function loadSnapshotsFromStorage(): TopicSnapshot[] {
  try {
    const raw = localStorage.getItem(SNAPSHOTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading snapshots from localStorage', e);
  }
  return DEFAULT_PRESET_SNAPSHOTS;
}

/**
 * Save snapshots list to localStorage
 */
export function saveSnapshotsToStorage(snapshots: TopicSnapshot[]): void {
  try {
    localStorage.setItem(SNAPSHOTS_STORAGE_KEY, JSON.stringify(snapshots));
  } catch (e) {
    console.error('Error writing snapshots to localStorage', e);
  }
}

/**
 * Get active snapshot ID
 */
export function getActiveSnapshotId(): string {
  try {
    return localStorage.getItem(ACTIVE_SNAPSHOT_ID_KEY) || DEFAULT_PRESET_SNAPSHOTS[0].id;
  } catch {
    return DEFAULT_PRESET_SNAPSHOTS[0].id;
  }
}

/**
 * Set active snapshot ID
 */
export function setActiveSnapshotId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_SNAPSHOT_ID_KEY, id);
  } catch {}
}

/**
 * Build a full TopicSnapshot from current working copy
 */
export function buildSnapshotFromWorkingCopy(params: {
  id?: string;
  title: string;
  subject: string;
  description?: string;
  sources: StudyMaterial[];
  flashcards: Flashcard[];
  questions: PracticeQuestion[];
  qaSeeds?: QASeedItem[];
  analysisPreview?: Partial<AnalysisPreviewSnapshot>;
}): TopicSnapshot {
  const now = new Date().toISOString();
  const id = params.id || `snap-${Date.now()}`;
  
  let targetGrade: 'tin10' | 'tin11' | 'cpp' | 'general' = 'tin10';
  const subLower = (params.subject + ' ' + params.title).toLowerCase();
  if (subLower.includes('11')) targetGrade = 'tin11';
  else if (subLower.includes('c++')) targetGrade = 'cpp';
  else if (subLower.includes('10')) targetGrade = 'tin10';

  const defaultAnalysis: AnalysisPreviewSnapshot = {
    summary: `Bộ ôn tập bám sát chủ đề: ${params.title}. Tập trung vào các kiến thức cốt lõi môn Tin học, giải thích rõ nguyên lý và ví dụ minh họa.`,
    keyPoints: [
      `Khái niệm và cú pháp trọng tâm theo chuẩn SGK`,
      `Phương pháp phân tích bài toán và cài đặt thuật toán`,
      `Các tình huống lỗi thường gặp và cách xử lý`
    ],
    coreConcepts: [params.title, 'Kiến thức cốt lõi', 'Bài tập thực hành'],
    commonMistakes: [
      'Bẫy lỗi chỉ số và điều kiện biên',
      'Nhầm lẫn giữa các cấu trúc điều khiển',
      'Quên kiểm tra trường hợp đặc biệt'
    ],
    pedagogyTip: 'Học sinh nên tự tay gõ lại code và chạy thử với nhiều bộ test khác nhau.',
    targetAudience: 'Học sinh THPT học theo chương trình GDPT 2018'
  };

  return {
    id,
    title: params.title.trim(),
    subject: params.subject.trim(),
    description: params.description || `Bộ ôn tập ${params.title} gồm ${params.sources.length} học liệu, ${params.flashcards.length} thẻ flashcard và ${params.questions.length} câu hỏi.`,
    createdAt: now,
    updatedAt: now,
    metadata: {
      version: '1.0',
      targetGrade,
      sourcesCount: params.sources.length,
      flashcardCount: params.flashcards.length,
      questionCount: params.questions.length,
      qaSeedCount: params.qaSeeds?.length || 0,
    },
    sources: params.sources,
    analysisPreview: {
      ...defaultAnalysis,
      ...(params.analysisPreview || {})
    },
    studyPack: {
      flashcards: params.flashcards,
      questions: params.questions,
      qaSeeds: params.qaSeeds || []
    }
  };
}

/**
 * Save current topic as a new snapshot or update existing
 */
export function saveTopicSnapshot(snapshot: TopicSnapshot): TopicSnapshot[] {
  const currentList = loadSnapshotsFromStorage();
  const existingIndex = currentList.findIndex(s => s.id === snapshot.id);
  let updatedList: TopicSnapshot[];
  if (existingIndex >= 0) {
    updatedList = [...currentList];
    updatedList[existingIndex] = {
      ...snapshot,
      updatedAt: new Date().toISOString()
    };
  } else {
    updatedList = [snapshot, ...currentList];
  }
  saveSnapshotsToStorage(updatedList);
  setActiveSnapshotId(snapshot.id);
  return updatedList;
}

/**
 * Rename snapshot (Short name update)
 */
export function renameTopicSnapshot(id: string, newTitle: string): TopicSnapshot[] {
  const currentList = loadSnapshotsFromStorage();
  const updatedList = currentList.map(item => {
    if (item.id === id) {
      return {
        ...item,
        title: newTitle.trim(),
        updatedAt: new Date().toISOString()
      };
    }
    return item;
  });
  saveSnapshotsToStorage(updatedList);
  return updatedList;
}

/**
 * Delete a topic snapshot
 */
export function deleteTopicSnapshot(id: string): TopicSnapshot[] {
  const currentList = loadSnapshotsFromStorage();
  const filtered = currentList.filter(s => s.id !== id);
  // Ensure we keep at least 1 snapshot
  const finalList = filtered.length > 0 ? filtered : DEFAULT_PRESET_SNAPSHOTS;
  saveSnapshotsToStorage(finalList);
  
  if (getActiveSnapshotId() === id) {
    setActiveSnapshotId(finalList[0].id);
  }
  return finalList;
}

/**
 * Interface for search results in "Trước khi lưu" (Current Working Copy / Draft)
 */
export interface DraftSearchResult {
  id: string;
  category: 'source' | 'flashcard' | 'question' | 'qa';
  categoryLabel: string;
  title: string;
  snippet: string;
  targetTab: 'materials' | 'flashcards' | 'quiz' | 'study_pack';
}

/**
 * Interface for search results in "Sau khi lưu" (Saved Topics / Snapshots in Store)
 */
export interface SavedSnapshotSearchResult {
  snapshot: TopicSnapshot;
  matchReasons: string[];
  matchedSourcesCount: number;
  matchedFlashcardsCount: number;
  matchedQuestionsCount: number;
}

/**
 * Search items in "Trước khi lưu" (Current Working Copy)
 */
export function searchDraftItems(
  query: string,
  data: {
    sources: StudyMaterial[];
    flashcards: Flashcard[];
    questions: PracticeQuestion[];
    qaSeeds?: QASeedItem[];
  }
): DraftSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: DraftSearchResult[] = [];

  // 1. Search in Sources (Học liệu)
  data.sources.forEach(src => {
    const titleMatch = src.title.toLowerCase().includes(q);
    const contentMatch = src.content.toLowerCase().includes(q);
    const topicMatch = src.subjectTopic.toLowerCase().includes(q);
    if (titleMatch || contentMatch || topicMatch) {
      const snippet = contentMatch 
        ? src.content.slice(0, 120) + (src.content.length > 120 ? '...' : '')
        : src.title;
      results.push({
        id: src.id,
        category: 'source',
        categoryLabel: 'Học liệu (Nguồn)',
        title: src.title,
        snippet,
        targetTab: 'materials'
      });
    }
  });

  // 2. Search in Flashcards
  data.flashcards.forEach(fc => {
    const frontMatch = fc.front.toLowerCase().includes(q);
    const backMatch = fc.back.toLowerCase().includes(q);
    const subjectMatch = fc.subject.toLowerCase().includes(q);
    if (frontMatch || backMatch || subjectMatch) {
      results.push({
        id: fc.id,
        category: 'flashcard',
        categoryLabel: 'Thẻ ghi nhớ (Flashcard)',
        title: fc.front,
        snippet: fc.back.slice(0, 120),
        targetTab: 'flashcards'
      });
    }
  });

  // 3. Search in Practice Questions
  data.questions.forEach(quest => {
    const qMatch = quest.question.toLowerCase().includes(q);
    const expMatch = quest.explanation.toLowerCase().includes(q);
    const optMatch = quest.options?.some(opt => opt.toLowerCase().includes(q));
    const topicMatch = quest.subjectTopic.toLowerCase().includes(q);
    if (qMatch || expMatch || optMatch || topicMatch) {
      results.push({
        id: quest.id,
        category: 'question',
        categoryLabel: quest.type === 'multiple_choice' ? 'Trắc nghiệm ABCD' : 'Câu hỏi Đúng/Sai',
        title: quest.question,
        snippet: quest.explanation.slice(0, 120),
        targetTab: 'quiz'
      });
    }
  });

  // 4. Search in QA Seeds
  data.qaSeeds?.forEach(seed => {
    const qMatch = seed.question.toLowerCase().includes(q);
    const aMatch = seed.shortAnswer.toLowerCase().includes(q);
    if (qMatch || aMatch) {
      results.push({
        id: seed.id,
        category: 'qa',
        categoryLabel: 'Hỏi đáp Q&A',
        title: seed.question,
        snippet: seed.shortAnswer.slice(0, 120),
        targetTab: 'study_pack'
      });
    }
  });

  return results;
}

/**
 * Search items in "Sau khi lưu" (Saved Topics / Snapshots)
 */
export function searchSavedSnapshots(
  query: string,
  snapshots: TopicSnapshot[]
): SavedSnapshotSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SavedSnapshotSearchResult[] = [];

  snapshots.forEach(snap => {
    const matchReasons: string[] = [];
    let matchedSources = 0;
    let matchedFlashcards = 0;
    let matchedQuestions = 0;

    // Check title / subject / description
    if (snap.title.toLowerCase().includes(q)) {
      matchReasons.push(`Khớp tiêu đề: "${snap.title}"`);
    }
    if (snap.subject.toLowerCase().includes(q)) {
      matchReasons.push(`Khớp môn học: "${snap.subject}"`);
    }
    if (snap.description.toLowerCase().includes(q)) {
      matchReasons.push('Khớp phần mô tả bộ ôn');
    }

    // Check inner sources
    snap.sources?.forEach(s => {
      if (s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)) {
        matchedSources++;
      }
    });
    if (matchedSources > 0) {
      matchReasons.push(`Khớp ${matchedSources} học liệu bên trong`);
    }

    // Check inner flashcards
    snap.studyPack?.flashcards?.forEach(fc => {
      if (fc.front.toLowerCase().includes(q) || fc.back.toLowerCase().includes(q)) {
        matchedFlashcards++;
      }
    });
    if (matchedFlashcards > 0) {
      matchReasons.push(`Khớp ${matchedFlashcards} thẻ flashcard bên trong`);
    }

    // Check inner questions
    snap.studyPack?.questions?.forEach(qst => {
      if (qst.question.toLowerCase().includes(q) || qst.explanation.toLowerCase().includes(q)) {
        matchedQuestions++;
      }
    });
    if (matchedQuestions > 0) {
      matchReasons.push(`Khớp ${matchedQuestions} câu hỏi trắc nghiệm bên trong`);
    }

    if (matchReasons.length > 0) {
      results.push({
        snapshot: snap,
        matchReasons,
        matchedSourcesCount: matchedSources,
        matchedFlashcardsCount: matchedFlashcards,
        matchedQuestionsCount: matchedQuestions
      });
    }
  });

  return results;
}
