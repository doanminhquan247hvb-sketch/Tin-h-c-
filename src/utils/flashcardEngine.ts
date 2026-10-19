import { Flashcard } from '../types';

const STORAGE_KEY = 'cpb_flashcards';

// Flashcards following prompt #05: khái niệm, định nghĩa, ví dụ, phân biệt, quy tắc/lưu ý, dễ ôn nhanh, phù hợp nhiều môn học
export const DEFAULT_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-01',
    subject: 'Toán lớp 7',
    front: 'Toán lớp 7 là gì?',
    back: 'Là một dãy các số và chữ cái nối với nhau bằng phép tính. VD: 2x + 3y - 5',
    category: 'khái niệm',
    dateAdded: 'Mặc định'
  },
  {
    id: 'fc-02',
    subject: 'Toán lớp 7',
    front: 'Biểu thức đại số là gì?',
    back: 'Định nghĩa: Biểu thức gồm số, chữ và các phép toán (+, -, *, /). Ví dụ: 3a + 2b - 7',
    category: 'định nghĩa',
    dateAdded: 'Mặc định'
  },
  {
    id: 'fc-03',
    subject: 'Tin học 10',
    front: 'Hàm range(start, stop) trong Python?',
    back: 'Quy tắc: Duyệt từ start đến stop - 1 (cận trên stop luôn bị loại trừ). VD: range(1, 4) -> 1, 2, 3',
    category: 'quy tắc',
    dateAdded: 'Mặc định'
  },
  {
    id: 'fc-04',
    subject: 'Tin học 10',
    front: 'Phân biệt vòng lặp for và vòng lặp while?',
    back: 'Phân biệt: for dùng khi biết trước số lần lặp; while dùng khi lặp với điều kiện dừng chưa biết trước số lần.',
    category: 'phân biệt',
    dateAdded: 'Mặc định'
  },
  {
    id: 'fc-05',
    subject: 'Tin học 11',
    front: 'Điều kiện tiên quyết của Tìm kiếm nhị phân?',
    back: 'Lưu ý cốt lõi: Mảng bắt buộc phải được sắp xếp theo thứ tự (tăng/giảm) trước khi tìm kiếm.',
    category: 'quy tắc',
    dateAdded: 'Mặc định'
  }
];

export function loadFlashcardsFromStorage(): Flashcard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading flashcards', e);
  }
  return DEFAULT_FLASHCARDS;
}

export function saveFlashcardsToStorage(flashcards: Flashcard[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  } catch (e) {
    console.warn('Error saving flashcards to LocalStorage', e);
  }
}
