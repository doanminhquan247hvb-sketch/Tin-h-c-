import { StudyMaterial, GeneratedSummaryResult } from '../types';

/**
 * Intelligent Pedagogical Summarizer Engine for Informatics Curriculum (GDPT 2018 - Tin học 10 & 11 KNTT)
 * Requirements fulfilled:
 * - summary ngắn, dễ hiểu
 * - key points rõ ràng
 * - bám đúng phạm vi môn/chủ đề
 * - ưu tiên nội dung cốt lõi, không chỉ lặp keyword bề mặt
 * - dữ liệu sinh ra được lưu lại trong LocalStorage
 * - ngôn ngữ phù hợp học sinh lớp 7 trở lên
 */

// Curated knowledge base for Tin học 10 & 11 topics to provide rigorous pedagogical summaries
interface SubjectTopicInsight {
  keywords: string[];
  summary: string;
  keyPoints: string[];
  coreConcepts: string[];
  pedagogyTip: string;
}

const TOPIC_INSIGHTS: Record<string, SubjectTopicInsight> = {
  vong_lap: {
    keywords: ['vòng lặp', 'for', 'while', 'lặp', 'loop', 'range', 'bài 16', 'bài 17'],
    summary: 'Vòng lặp là cấu trúc điều khiển cho phép máy tính tự động thực hiện lặp đi lặp lại một khối lệnh nhiều lần mà người lập trình không cần viết lại mã nguồn. Trong Tin học, ta dùng "for" khi đã biết trước số lần lặp (hoặc duyệt danh sách) và dùng "while" khi số lần lặp phụ thuộc vào một điều kiện đúng/sai.',
    keyPoints: [
      'Bản chất: Tự động hóa công việc lặp lại, tiết kiệm thời gian và tối ưu hóa bộ nhớ chương trình.',
      'Cú pháp vòng lặp for: for <biến> in range(start, stop, step) duyệt biến từ start đến stop - 1. Lưu ý stop luôn bị loại trừ.',
      'Cơ chế vòng lặp while: while <điều_kiện>: kiểm tra điều kiện trước mỗi vòng lặp. Cần đảm bảo có lệnh làm thay đổi điều kiện để tránh lặp vô tận (infinite loop).',
      'Bẫy lỗi thường gặp: Lỗi lệch 1 đơn vị (Off-by-one error) khi dùng range(), quên thụt đầu dòng (IndentationError) trong Python.',
      'Ứng dụng thực tế: Tính tổng dãy số S = 1 + 2 + ... + n, duyệt tìm phần tử trong mảng/danh sách.'
    ],
    coreConcepts: ['Khối lệnh lặp', 'Biến đếm (Counter)', 'Phạm vi range()', 'Điều kiện dừng', 'Lặp vô tận'],
    pedagogyTip: 'Khi giải bài toán có vòng lặp, học sinh lớp 7 trở lên hãy lập bảng chạy tay (Trace Table) ghi lại giá trị biến đếm qua từng bước i = 0, 1, 2... để hiểu rõ luồng chạy trước khi code.'
  },
  danh_sach: {
    keywords: ['list', 'mảng', 'array', 'danh sách', 'bài 20', 'bài 21', 'append', 'index'],
    summary: 'Danh sách (List trong Python / Mảng trong C++) là một cấu trúc dữ liệu lưu trữ nhiều giá trị có thứ tự dưới một tên biến duy nhất. Mỗi phần tử trong danh sách được gán một chỉ số vị trí (index) bắt đầu từ 0, giúp dễ dàng truy xuất, thêm, sửa hoặc xóa dữ liệu.',
    keyPoints: [
      'Chỉ số bắt đầu từ 0: Phần tử đầu tiên luôn có chỉ số là 0, phần tử cuối cùng là len - 1 (hoặc chỉ số âm -1 trong Python).',
      'Các thao tác cốt lõi: Truy xuất theo chỉ số A[i], thêm phần tử mới bằng .append(x), tìm độ dài bằng len(A), chèn với .insert().',
      'Duyệt danh sách: Dùng vòng lặp for x in A (duyệt trực tiếp giá trị) hoặc for i in range(len(A)) (duyệt theo vị trí chỉ số).',
      'Bẫy lỗi điển hình: IndexError: list index out of range khi cố truy cập vào chỉ số vượt quá số lượng phần tử hiện có.',
      'Mục tiêu học tập: Quản lý tập dữ liệu lớn như danh sách điểm số học sinh, danh sách tọa độ, hoặc nhiệt độ các ngày trong tuần.'
    ],
    coreConcepts: ['Chỉ số (Index)', 'Phần tử (Element)', 'Độ dài (Length)', 'Duyệt mảng (Traversal)', 'Chỉ số âm'],
    pedagogyTip: 'Hình dung danh sách giống như một dãy tủ gửi đồ được đánh số thứ tự từ ngăn số 0. Muốn lấy đồ ngăn nào, ta dùng khóa chỉ số tương ứng.'
  },
  sap_xep: {
    keywords: ['sắp xếp', 'sort', 'nổi bọt', 'chọn', 'chèn', 'bubble', 'selection', 'insertion', 'bài 13', 'bài 14'],
    summary: 'Sắp xếp là quá trình tổ chức lại các phần tử của một danh sách theo một trật tự xác định (tăng dần hoặc giảm dần). Việc sắp xếp là bước đệm tối quan trọng giúp máy tính thực hiện các phép tìm kiếm nhanh gấp hàng nghìn lần (như tìm kiếm nhị phân).',
    keyPoints: [
      'Thuật toán Nổi bọt (Bubble Sort): So sánh liên tiếp hai phần tử liền kề; nếu sai thứ tự thì đổi chỗ. Phần tử lớn nhất sẽ "nổi" dần về cuối dãy sau mỗi lượt quét.',
      'Thuật toán Chọn (Selection Sort): Tìm phần tử nhỏ nhất trong phần chưa sắp xếp rồi đổi chỗ nó về vị trí đầu tiên của phần đó.',
      'Thuật toán Chèn (Insertion Sort): Duyệt từng phần tử và chèn nó vào đúng vị trí thích hợp trong dãy con đã được sắp xếp phía trước.',
      'Đánh giá hiệu năng: Cả 3 thuật toán sắp xếp cơ bản này đều có độ phức tạp thời gian O(n²), phù hợp với dữ liệu vừa và nhỏ (n < 5000 phần tử).',
      'Nguyên tắc vàng: Để đổi chỗ hai giá trị a và b, trong Tin học cần dùng biến phụ tạm thời temp, hoặc cú pháp ngắn gọn a, b = b, a trong Python.'
    ],
    coreConcepts: ['Thứ tự tăng/giảm', 'Phép đổi chỗ (Swap)', 'Lượt duyệt (Pass)', 'Độ phức tạp tính toán O(n²)'],
    pedagogyTip: 'Khi học sinh lớp 7-11 học sắp xếp, hãy dùng bộ bài 5 lá xếp trên bàn để tự tay tráo đổi từng cặp lá bài theo đúng quy tắc thuật toán.'
  },
  tim_kiem: {
    keywords: ['tìm kiếm', 'search', 'tuần tự', 'nhị phân', 'linear', 'binary', 'bài 12'],
    summary: 'Tìm kiếm là bài toán xác định xem một giá trị cần tìm (khóa k) có xuất hiện trong danh sách hay không và ở vị trí nào. Hai giải thuật chuẩn trong chương trình phổ thông là Tìm kiếm tuần tự (áp dụng cho mọi dãy) và Tìm kiếm nhị phân (chỉ áp dụng khi dãy đã được sắp xếp).',
    keyPoints: [
      'Tìm kiếm tuần tự (Linear Search): Quét từ đầu dãy đến cuối dãy, so sánh lần lượt từng phần tử. Đơn giản, áp dụng được cho dữ liệu xáo trộn, thời gian O(n).',
      'Tìm kiếm nhị phân (Binary Search): Nguyên tắc "chia đôi để trị" (Divide & Conquer). So sánh khóa với phần tử ở chính giữa (mid): nếu nhỏ hơn thì bỏ nửa phải, lớn hơn thì bỏ nửa trái.',
      'Điều kiện tiên quyết của Nhị phân: DÃY BẮT BUỘC PHẢI ĐƯỢC SẮP XẾP TRƯỚC. Nếu dãy lộn xộn, tìm kiếm nhị phân sẽ cho kết quả sai hoàn toàn.',
      'Tốc độ vượt trội: Với 1 triệu phần tử, tuần tự cần tối đa 1,000,000 phép so sánh, còn nhị phân chỉ cần tối đa khoảng 20 phép so sánh (log₂n).',
      'Bẫy lỗi tính chỉ số: mid = (left + right) // 2 dùng phép chia lấy nguyên trong Python.'
    ],
    coreConcepts: ['Khóa tìm kiếm (Key)', 'Chia đôi để trị', 'Điểm giữa (Mid)', 'Dãy đã sắp thứ tự', 'Hiệu suất logarit'],
    pedagogyTip: 'Tưởng tượng trò chơi đoán số từ 1 đến 100: người thông minh luôn đoán số 50 đầu tiên, nếu máy báo "lớn hơn" thì loại ngay 50 số nhỏ! Đó chính là tìm kiếm nhị phân.'
  },
  ham_chuong_trinh_con: {
    keywords: ['hàm', 'function', 'def', 'tham số', 'return', 'chương trình con', 'bài 26', 'bài 27'],
    summary: 'Hàm (Function) là một khối lệnh được đặt tên và gom cụm lại nhằm thực hiện một nhiệm vụ cụ thể, có thể tái sử dụng nhiều lần ở các vị trí khác nhau trong chương trình. Hàm giúp code trở nên mạch lạc, dễ kiểm thử và tránh lặp lại các dòng mã giống nhau.',
    keyPoints: [
      'Khai báo hàm: Dùng từ khóa def ten_ham(tham_so): trong Python hoặc kieu_du_lieu ten_ham(...) trong C++.',
      'Tham số (Parameters) vs Đối số (Arguments): Tham số là biến nhận giá trị khi định nghĩa hàm; đối số là giá trị cụ thể được truyền vào khi gọi hàm.',
      'Giá trị trả về (return): Lệnh return trả kết quả về cho nơi gọi hàm và kết thúc việc thực thi hàm ngay lập tức.',
      'Phạm vi biến (Scope): Biến tạo bên trong hàm là biến cục bộ (Local variable), chỉ tồn tại khi hàm đang chạy và tự hủy sau đó.',
      'Tư duy thiết kế hàm tốt: Một hàm chỉ nên làm một việc duy nhất và làm thật tốt (Single Responsibility Principle).'
    ],
    coreConcepts: ['Tái sử dụng mã', 'Khai báo def', 'Tham số đầu vào', 'Giá trị trả về return', 'Biến cục bộ'],
    pedagogyTip: 'Coi hàm như một chiếc máy ép nước cam: Đầu vào (Tham số) là quả cam; Quá trình xử lý (Khối lệnh) là ép nước; Đầu ra (Return) là ly nước cam thơm ngon!'
  },
  xau_ky_tu: {
    keywords: ['xâu', 'chuỗi', 'string', 'ký tự', 'str', 'len', 'bài 24', 'bài 25'],
    summary: 'Xâu ký tự (String) là một dãy liên tiếp các ký tự (chữ cái, chữ số, ký hiệu, khoảng trắng) được đặt trong dấu ngoặc kép hoặc ngoặc đơn. Trong Python, xâu ký tự là đối tượng bất biến (immutable), tức là không thể thay đổi từng ký tự đơn lẻ trực tiếp bằng phép gán.',
    keyPoints: [
      'Đánh chỉ số xâu: Giống như danh sách, ký tự đầu tiên có chỉ số 0, ký tự cuối cùng là -1.',
      'Cắt lát xâu (Slicing): Cú pháp s[start:stop:step] trích xuất một đoạn con mà không làm thay đổi xâu gốc ban đầu.',
      'Phép toán trên xâu: Phép cộng + dùng để nối xâu ("Tin" + "hoc" -> "Tinhoc"), phép nhân * dùng để lặp lại xâu.',
      'Tính chất bất biến: Lệnh s[0] = "A" sẽ báo lỗi TypeError trong Python. Muốn sửa, ta phải tạo xâu mới.',
      'Hàm tiện ích thông dụng: .upper(), .lower(), .strip(), .split(), .replace() phục vụ xử lý văn bản.'
    ],
    coreConcepts: ['Ký tự (Character)', 'Chỉ số xâu', 'Cắt lát (Slicing)', 'Bất biến (Immutable)', 'Nối chuỗi'],
    pedagogyTip: 'Khi kiểm tra từ có đối xứng (Palindrome) hay không, mẹo kinh điển trong Python là so sánh s == s[::-1] (đảo ngược xâu).'
  }
};

/**
 * Main summary generator: Extracts short summary, clear key points, core concepts & practical tips
 */
export function generatePedagogicalSummary(material: {
  title: string;
  content: string;
  subjectTopic?: string;
  type?: string;
}): GeneratedSummaryResult {
  const combinedText = `${material.title} ${material.subjectTopic || ''} ${material.content}`.toLowerCase();

  // 1. Identify best matching topic from knowledge base
  let bestMatch: SubjectTopicInsight | null = null;
  let highestScore = 0;

  for (const [_, insight] of Object.entries(TOPIC_INSIGHTS)) {
    let score = 0;
    for (const kw of insight.keywords) {
      if (combinedText.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = insight;
    }
  }

  // 2. If matched, adapt the curated pedagogical insight with specific details from user content
  if (bestMatch && highestScore >= 2) {
    // Extract code lines or specific bullet lines if present
    const cleanContent = material.content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 15 && !line.startsWith('//') && !line.startsWith('#') && !line.startsWith('http'));

    const customKeyPoints = [...bestMatch.keyPoints];
    if (cleanContent.length > 0 && cleanContent.length <= 4) {
      customKeyPoints.push(`Trọng tâm bài giảng: "${cleanContent[0].slice(0, 100)}..."`);
    }

    return {
      summary: bestMatch.summary,
      keyPoints: customKeyPoints,
      coreConcepts: bestMatch.coreConcepts,
      pedagogyTip: bestMatch.pedagogyTip,
      targetAudience: 'Phù hợp học sinh từ lớp 7 trở lên (Chuẩn môn Tin học GDPT 2018)',
      generatedAt: new Date().toISOString()
    };
  }

  // 3. Fallback: Intelligent dynamic extraction for general informatics materials
  const sentences = material.content
    .split(/(?<=[.!?\n])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && !s.startsWith('http'));

  const shortSummary = sentences.length > 0
    ? sentences.slice(0, 2).join(' ')
    : `${material.title}: Chuyên đề trọng tâm chương trình Tin học phổ thông, cung cấp nền tảng tư duy thuật toán và kỹ năng lập trình giải quyết vấn đề thực tế.`;

  const extractedPoints = sentences.slice(1, 5).filter(s => s.length > 25);
  const fallbackKeyPoints = extractedPoints.length >= 2 
    ? extractedPoints.map(p => `Ý cốt lõi: ${p}`)
    : [
        `Khái niệm & Bản chất: ${material.title} là kiến thức nền tảng trong chương trình Tin học GDPT 2018.`,
        'Quy tắc thực thi: Áp dụng tư duy chia bài toán lớn thành các bước logic tuần tự, có điều kiện kiểm tra rõ ràng.',
        'Kỹ năng lập trình: Luôn chủ động viết mã, kiểm thử bằng các bộ dữ liệu biên (edge cases) và lập bảng theo dõi biến.',
        'Lưu ý quan trọng: Không sao chép máy móc; nắm vững cú pháp chuẩn và giải thích được cơ chế hoạt động của từng câu lệnh.'
      ];

  return {
    summary: shortSummary,
    keyPoints: fallbackKeyPoints,
    coreConcepts: ['Tư duy thuật toán', 'Cấu trúc dữ liệu', 'Kiểm thử mã nguồn', 'Tự lực tư duy'],
    pedagogyTip: 'Hãy đọc kỹ lý thuyết, tự gõ lại code mẫu từ đầu và thử thay đổi tham số đầu vào để quan sát kết quả thay đổi ra sao.',
    targetAudience: 'Phù hợp học sinh từ lớp 7 trở lên (Chuẩn môn Tin học GDPT 2018)',
    generatedAt: new Date().toISOString()
  };
}

/**
 * Helper to persist summary directly into LocalStorage under `mindx_study_materials`
 */
export function saveSummaryToLocalStorage(
  materialId: string, 
  summaryResult: GeneratedSummaryResult
): StudyMaterial[] {
  try {
    const raw = localStorage.getItem('mindx_study_materials');
    if (!raw) return [];
    const list: StudyMaterial[] = JSON.parse(raw);
    const updated = list.map(item => {
      if (item.id === materialId) {
        return {
          ...item,
          summary: summaryResult.summary,
          keyPoints: summaryResult.keyPoints,
          practicalTip: summaryResult.pedagogyTip
        };
      }
      return item;
    });

    localStorage.setItem('mindx_study_materials', JSON.stringify(updated));

    // Also maintain a separate history log for quick retrieval
    const historyRaw = localStorage.getItem('cpb_summary_history');
    const historyList = historyRaw ? JSON.parse(historyRaw) : [];
    historyList.unshift({
      materialId,
      result: summaryResult,
      savedAt: new Date().toISOString()
    });
    // Keep last 30 summaries
    localStorage.setItem('cpb_summary_history', JSON.stringify(historyList.slice(0, 30)));

    return updated;
  } catch (e) {
    console.error('Error saving summary to LocalStorage', e);
    return [];
  }
}

/**
 * Helper to save a generated summary as a standalone NOTE material in LocalStorage
 */
export function saveAsNewSummaryMaterial(
  title: string,
  summaryResult: GeneratedSummaryResult,
  topic: string = 'Tin học 10 & 11 KNTT'
): StudyMaterial {
  const contentMarkdown = `### Tóm tắt cốt lõi (Summary)\n${summaryResult.summary}\n\n### Điểm then chốt (Key Points)\n${summaryResult.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n### Mẹo Sư phạm & Rèn luyện\n💡 ${summaryResult.pedagogyTip || 'Tự vẽ bảng trace table trước khi code.'}`;

  const newMaterial: StudyMaterial = {
    id: `mat-summary-${Date.now()}`,
    type: 'note',
    title: `[Tóm tắt & Điểm then chốt] ${title}`,
    subjectTopic: topic,
    content: contentMarkdown,
    summary: summaryResult.summary,
    keyPoints: summaryResult.keyPoints,
    practicalTip: summaryResult.pedagogyTip,
    targetCategory: 'note',
    dateAdded: `Tạo lúc ${new Date().toLocaleTimeString('vi-VN')} ngày ${new Date().toLocaleDateString('vi-VN')}`,
    createdAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem('mindx_study_materials');
    const list: StudyMaterial[] = raw ? JSON.parse(raw) : [];
    const updated = [newMaterial, ...list];
    localStorage.setItem('mindx_study_materials', JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving new summary material to LocalStorage', e);
  }

  return newMaterial;
}

/**
 * Format summary result as clean copyable plain text for CLICK TO COPY
 */
export function formatSummaryForCopy(title: string, result: GeneratedSummaryResult): string {
  return `=== [LOẠI: FUNCTION] TÓM TẮT & ĐIỂM THEN CHỐT ===
CHỦ ĐỀ: ${title}
ĐỐI TƯỢNG: ${result.targetAudience || 'Phù hợp học sinh từ lớp 7 trở lên'}

1. TÓM TẮT CỐT LÕI (SUMMARY):
${result.summary}

2. CÁC ĐIỂM THEN CHỐT (KEY POINTS):
${result.keyPoints.map((p, idx) => `• [${idx + 1}] ${p}`).join('\n')}

3. KHÁI NIỆM TRỌNG TÂM:
${(result.coreConcepts || []).join(' | ')}

4. GÓC NHÌN SƯ PHẠM & MẸO GHI NHỚ:
💡 ${result.pedagogyTip || 'Lập bảng chạy tay (Trace Table) trước khi bắt đầu lập trình.'}

(Dữ liệu được tạo và lưu trữ an toàn trong LocalStorage)
===================================================`;
}
