import { QASeedItem } from '../types';

const STORAGE_KEY = 'cpb_qa_seed';

export const DEFAULT_QA_SEEDS: QASeedItem[] = [
  {
    id: 'qa-01',
    subject: 'Toán học (Lớp 7)',
    topic: 'Biểu thức đại số',
    question: 'Biểu thức đại số là gì và gồm những thành phần nào?',
    shortAnswer: 'Là biểu thức chứa các số, chữ (biến số) liên kết với nhau bằng các phép tính (+, -, *, /, lũy thừa). Ví dụ: 2x + 3y - 5.',
    dateAdded: 'Mặc định'
  },
  {
    id: 'qa-02',
    subject: 'Tin học 10 (KNTT)',
    topic: 'Cấu trúc lặp for & range',
    question: 'Hàm range(start, stop) trong vòng lặp for của Python duyệt đến giá trị nào?',
    shortAnswer: 'Duyệt từ start đến stop - 1 (giá trị stop không bao giờ được chạm tới). Ví dụ range(1, 5) duyệt qua 1, 2, 3, 4.',
    dateAdded: 'Mặc định'
  },
  {
    id: 'qa-03',
    subject: 'Tin học 10 (KNTT)',
    topic: 'Kiểu dữ liệu danh sách (List)',
    question: 'Phương thức append() khác gì với phép toán cộng hai danh sách (+)?',
    shortAnswer: 'append(x) thêm 1 phần tử x vào đuôi danh sách gốc ngay tại chỗ; còn a + b tạo ra một danh sách mới nối cả hai.',
    dateAdded: 'Mặc định'
  },
  {
    id: 'qa-04',
    subject: 'Tin học 11 (KNTT)',
    topic: 'Thuật toán tìm kiếm nhị phân',
    question: 'Điều kiện bắt buộc của mảng trước khi chạy tìm kiếm nhị phân là gì?',
    shortAnswer: 'Mảng bắt buộc phải được sắp xếp trước theo thứ tự tăng dần hoặc giảm dần để chia đôi khoảng tìm kiếm.',
    dateAdded: 'Mặc định'
  },
  {
    id: 'qa-05',
    subject: 'Toán học (Lớp 7)',
    topic: 'Tam giác bằng nhau',
    question: 'Ba trường hợp bằng nhau cơ bản của hai tam giác là những trường hợp nào?',
    shortAnswer: 'Cạnh - Cạnh - Cạnh (c-c-c), Cạnh - Góc - Cạnh (c-g-c), và Góc - Cạnh - Góc (g-c-g).',
    dateAdded: 'Mặc định'
  }
];

export function loadQASeedsFromStorage(): QASeedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading QA seeds from localStorage', e);
  }
  return DEFAULT_QA_SEEDS;
}

export function saveQASeedsToStorage(seeds: QASeedItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  } catch (e) {
    console.warn('Error writing QA seeds to localStorage', e);
  }
}
