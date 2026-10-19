export type ActiveTab = 'materials' | 'terminal' | 'study_pack' | 'structure' | 'milestone' | 'quiz' | 'flashcards' | 'ai_tutor' | 'ai_principles' | 'about';
export type GradeFilter = 'all' | 'tin10' | 'tin11' | 'cpp';
export type TerminalTheme = 'light' | 'dark';
export type FourTheme = 'technology' | 'nature' | 'greenery' | 'lecturer';
export type AppLanguage = 'vi' | 'en' | 'zh';
export type TypingSpeed = 'slow' | 'normal' | 'fast';
export type LanguageType = 'python' | 'cpp';
export type FontFamilyType = 'python' | 'arial' | 'calibri' | 'times' | 'segoe' | 'roboto' | 'fira' | 'lora';
export type SoundSoftness = 'gentle' | 'whisper' | 'normal';

export type PracticeQuestionType = 'true_false' | 'multiple_choice' | 'fill_in_blank' | 'short_answer';

export interface PracticeQuestion {
  id: string;
  type: PracticeQuestionType;
  grade: string; // e.g. "Lớp 10", "Lớp 11", "Lớp 7+"
  subjectTopic: string;
  lessonRef?: string;
  question: string;
  codeSnippet?: string;
  options?: string[]; // for multiple_choice
  correctOptionIndex?: number; // for multiple_choice
  correctBool?: boolean; // for true_false
  correctBlankAnswer?: string; // for fill_in_blank
  acceptableAnswers?: string[]; // for fill_in_blank
  sampleAnswer?: string; // for short_answer
  keyPointsNeeded?: string[]; // for short_answer
  explanation: string;
  dateAdded?: string;
}

export interface Flashcard {
  id: string;
  subject: string;
  front: string;
  back: string;
  category?: 'khái niệm' | 'định nghĩa' | 'ví dụ' | 'phân biệt' | 'quy tắc';
  dateAdded?: string;
}

export interface QASeedItem {
  id: string;
  subject: string;
  topic: string;
  question: string;
  shortAnswer: string;
  dateAdded?: string;
}

export interface GeneratedSummaryResult {
  summary: string;
  keyPoints: string[];
  coreConcepts?: string[];
  pedagogyTip?: string;
  targetAudience?: string; // Phù hợp lớp 7+
  generatedAt?: string;
}

export interface StudyMaterial {
  id: string;
  type: 'text' | 'image' | 'url' | 'plan' | 'note';
  title: string;
  subjectTopic?: string;
  content: string;
  images?: string[]; // Supports at least 2 images for image sources
  sourceUrl?: string;
  dateAdded?: string;
  createdAt?: string;
  notes?: string;
  promptText?: string; // Prompt format for AI interaction
  targetCategory?: 'plan' | 'note';
  grade?: 'tin10' | 'tin11' | 'cpp';
  lessonNumber?: number;
  summary?: string;
  keyPoints?: string[];
  practicalTip?: string;
}

export interface CodeSnippet {
  id: string;
  grade: 'tin10' | 'tin11' | 'cpp';
  language: 'python' | 'cpp';
  lessonNumber: number;
  title: string;
  chapter: string;
  topic: string;
  description: string;
  code: string;
  expectedOutput: string;
}

export interface QuizPlaceholder {
  id: string;
  grade: 'tin10' | 'tin11' | 'cpp';
  lessonRef: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface FlashcardPlaceholder {
  id: string;
  grade: 'tin10' | 'tin11' | 'cpp';
  front: string;
  back: string;
  tag: string;
}

export interface ChatPlaceholder {
  id: string;
  sender: 'student' | 'ai';
  text: string;
  time: string;
}


