import React, { useState } from 'react';
import { 
  BookOpen, FileText, Image as ImageIcon, Link as LinkIcon, Plus, Trash2, 
  CheckCircle2, Eye, ExternalLink, Sparkles, Layers, ArrowRight, Edit3, 
  Search, RotateCcw, X, Copy, Check, ListOrdered, Download, Upload, 
  Calendar, Bookmark, CheckCheck, Zap, ChevronDown, ChevronUp, FileCheck, Lightbulb
} from 'lucide-react';
import { StudyMaterial, AppLanguage, FourTheme, TerminalTheme, GeneratedSummaryResult } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playMechanicalKeyClick } from '../utils/audio';
import { 
  generatePedagogicalSummary, 
  saveSummaryToLocalStorage, 
  saveAsNewSummaryMaterial, 
  formatSummaryForCopy 
} from '../utils/summaryEngine';

interface InputMaterialsViewProps {
  language?: AppLanguage;
  fourTheme?: FourTheme;
  theme?: TerminalTheme;
  materials?: StudyMaterial[];
  onAddMaterial?: (material: Omit<StudyMaterial, 'id' | 'createdAt'>) => void;
  onUpdateMaterial?: (material: StudyMaterial) => void;
  onDeleteMaterial?: (id: string) => void;
  onResetMaterials?: () => void;
}

// Initial educational study materials with at least 2 sample images and PLAN / NOTE samples
const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-01',
    type: 'text',
    title: 'Ghi chép lý thuyết: Cú pháp vòng lặp for và while trong Python',
    subjectTopic: 'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python (Bài 1 - 26)',
    content: `1. Cú pháp vòng lặp for với range():
- range(n): sinh dãy từ 0 đến n-1
- range(start, stop, step): bắt đầu từ start, tăng từng bước step đến trước stop
Ví dụ:
for i in range(1, 10, 2):
    print(i, end=' ') # In ra các số lẻ: 1 3 5 7 9

2. Vòng lặp while kiểm tra điều kiện lặp trước khi thực thi khối lệnh:
while điều_kiện:
    # lệnh lặp
    # cần cập nhật biến lặp để tránh lặp vô tận`,
    dateAdded: 'Hôm nay, 14:30',
    notes: 'Trọng tâm ôn thi giữa kỳ I'
  },
  {
    id: 'mat-02',
    type: 'image',
    title: 'Ảnh chụp bài tập & Sơ đồ thuật toán SGK Tin 11 (2 trang)',
    subjectTopic: 'Tin học 11 (KNTT) - Chủ đề 1: Cấu trúc dữ liệu & Thuật toán (Bài 1 - 25)',
    content: 'Bộ 2 hình ảnh chụp từ sách giáo khoa Tin học 11: Sơ đồ khối thuật toán sắp xếp nổi bọt và Bảng theo dõi từng bước hoán đổi giá trị.',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80'
    ],
    dateAdded: 'Hôm qua, 09:15',
    notes: 'Nguồn ảnh tối thiểu 2 trang bài tập'
  },
  {
    id: 'mat-03',
    type: 'url',
    title: 'Chuyên đề: Cấu trúc dữ liệu và giải thuật trong Tin học THPT',
    subjectTopic: 'Chuyên đề C++ & Python HSG THPT',
    content: 'Liên kết bài giảng trực tuyến tổng hợp 25 dạng bài cơ bản đến nâng cao cho học sinh lớp 10 và 11.',
    sourceUrl: 'https://vietjack.com/tin-hoc-11/chuyen-de-sap-xep-tim-kiem.jsp',
    dateAdded: '2 ngày trước',
    notes: 'Tài liệu tham khảo mở rộng'
  },
  {
    id: 'mat-04',
    type: 'plan',
    title: 'Kế hoạch ôn tập 3 tuần: Cấu trúc dữ liệu & Thuật toán Tin 11',
    subjectTopic: 'Tin học 11 (KNTT) - Chủ đề 1: Cấu trúc dữ liệu & Thuật toán (Bài 1 - 25)',
    content: `[LOẠI: PLAN - KẾ HOẠCH HỌC TẬP]
• Tuần 1: Ôn tập mảng 1 chiều, 2 chiều và danh sách List trong Python / C++.
• Tuần 2: Thuật toán tìm kiếm tuần tự và tìm kiếm nhị phân chia đôi khoảng O(logN).
• Tuần 3: Thuật toán sắp xếp nổi bọt (Bubble Sort) và sắp xếp chèn (Insertion Sort).
• Mục tiêu tự lực: Tự vẽ sơ đồ khối và trace table từng bước, không sao chép máy móc từ AI.`,
    promptText: 'Hãy đóng vai Trợ giảng Tin học THPT: Đưa ra 3 câu hỏi gợi ý tư duy cho thuật toán tìm kiếm nhị phân theo SGK Tin 11 Kết Nối Tri Thức, không đưa ra code hoàn chỉnh.',
    dateAdded: 'Hôm nay, 08:15',
    notes: 'Kế hoạch học tập trọng tâm'
  },
  {
    id: 'mat-05',
    type: 'note',
    title: 'Ghi chú trọng tâm: 3 Bẫy lỗi thường gặp khi viết vòng lặp và danh sách',
    subjectTopic: 'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python (Bài 1 - 26)',
    content: `[LOẠI: NOTE - GHI CHÚ TRỌNG TÂM]
1. Bẫy lỗi IndexError: Chỉ số trong Python bắt đầu từ 0 đến len(arr)-1, duyệt range(1, len(arr)+1) sẽ gây lỗi truy cập ngoài mảng.
2. Bẫy vòng lặp vô tận while: Luôn đảm bảo biến điều kiện được cập nhật sau mỗi vòng lặp.
3. Bẫy kiểu dữ liệu nhập vào: input() luôn trả về chuỗi str, cần dùng int(input()) hoặc float(input()) để tính toán số học.`,
    promptText: 'Em đang làm bài tập kiểm tra số nguyên tố bằng Python. Khi chạy với số âm hoặc số 1 thì chương trình báo kết quả sai. Hãy chỉ ra điều kiện biên cần lưu ý theo SGK Tin 10.',
    dateAdded: 'Hôm qua, 16:30',
    notes: 'Ghi chú phòng thi'
  }
];

export const InputMaterialsView: React.FC<InputMaterialsViewProps> = ({
  language = 'vi',
  fourTheme: _fourTheme,
  theme = 'light',
  materials: externalMaterials,
  onAddMaterial,
  onUpdateMaterial,
  onDeleteMaterial,
  onResetMaterials
}) => {
  const safeLang = language && TRANSLATIONS[language] ? language : 'vi';
  const t = TRANSLATIONS[safeLang] || TRANSLATIONS.vi;
  const isLight = theme === 'light';

  // Topic subjects list
  const SUBJECT_TOPICS = [
    'Tin học 10 (KNTT) - Chủ đề 4: Lập trình với Python (Bài 1 - 26)',
    'Tin học 10 (KNTT) - Chủ đề 1: Máy tính và xã hội tri thức',
    'Tin học 11 (KNTT) - Chủ đề 1: Cấu trúc dữ liệu & Thuật toán (Bài 1 - 25)',
    'Tin học 11 (KNTT) - Chủ đề 3: Cơ sở dữ liệu & Truy vấn SQL',
    'Chuyên đề C++ THPT - Thuật toán tìm kiếm & Sắp xếp Olympic'
  ];

  const [selectedTopic, setSelectedTopic] = useState<string>(SUBJECT_TOPICS[0]);
  const [sourceType, setSourceType] = useState<'text' | 'image' | 'url' | 'plan' | 'note'>('text');
  const [internalMaterials, setInternalMaterials] = useState<StudyMaterial[]>(() => {
    try {
      const saved = localStorage.getItem('mindx_study_materials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MATERIALS;
  });

  const materialsList = externalMaterials && externalMaterials.length > 0 ? externalMaterials : internalMaterials;
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image' | 'url' | 'plan' | 'note'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // CRUD Edit mode state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states - Text
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  
  // Image states - minimum 2 images capability
  const [imageTitle, setImageTitle] = useState('');
  const [imageNotes, setImageNotes] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80'
  ]);
  const [previewImageModal, setPreviewImageModal] = useState<string | null>(null);

  // URL states
  const [urlTitle, setUrlTitle] = useState('');
  const [urlAddress, setUrlAddress] = useState('');
  const [urlDescription, setUrlDescription] = useState('');

  // PLAN states
  const [planTitle, setPlanTitle] = useState('');
  const [planContent, setPlanContent] = useState('');
  const [planPrompt, setPlanPrompt] = useState('');

  // NOTE states
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [notePrompt, setNotePrompt] = useState('');

  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Backup / Restore Modal states
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);

  // Notification feedback
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Summary & Key Points Generator Workflow States [LOẠI: FUNCTION]
  const [summaryWorkflowSelectedId, setSummaryWorkflowSelectedId] = useState<string>(() => {
    return 'mat-01';
  });
  const [summaryWorkflowResult, setSummaryWorkflowResult] = useState<GeneratedSummaryResult | null>(null);
  const [isGeneratingWorkflow, setIsGeneratingWorkflow] = useState<boolean>(false);
  const [expandedSummaryCardIds, setExpandedSummaryCardIds] = useState<Record<string, boolean>>({});
  const [summaryWorkflowToast, setSummaryWorkflowToast] = useState<string | null>(null);

  // Quick Copy Helper with Web Audio mechanical click & visual toast
  const handleCopyText = (text: string, id: string) => {
    playMechanicalKeyClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Export JSON function for LocalStorage backup
  const handleExportJson = () => {
    playMechanicalKeyClick();
    const dataStr = JSON.stringify(materialsList, null, 2);
    // Copy to clipboard
    navigator.clipboard.writeText(dataStr);
    
    // Also trigger file download
    try {
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mindx_study_materials_${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('File download fallback', e);
    }

    setSaveSuccessMessage(
      language === 'vi' 
        ? 'Đã sao chép JSON vào Clipboard và tải về file sao lưu LocalStorage!' 
        : 'JSON copied to Clipboard and backup file downloaded!'
    );
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  // Import JSON function for LocalStorage restore
  const handleImportJson = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalKeyClick();
    if (!importJsonText.trim()) return;

    try {
      const parsed = JSON.parse(importJsonText.trim());
      if (!Array.isArray(parsed)) {
        throw new Error('Dữ liệu không phải là danh sách (Array)');
      }

      // Validate items have id and title
      const validated: StudyMaterial[] = parsed.map((item, idx) => ({
        id: item.id || `mat-imported-${Date.now()}-${idx}`,
        type: ['text', 'image', 'url', 'plan', 'note'].includes(item.type) ? item.type : 'text',
        title: item.title || `Học liệu nạp #${idx + 1}`,
        subjectTopic: item.subjectTopic || SUBJECT_TOPICS[0],
        content: item.content || '',
        images: Array.isArray(item.images) ? item.images : undefined,
        sourceUrl: item.sourceUrl,
        promptText: item.promptText,
        dateAdded: `Nhập lúc ${new Date().toLocaleTimeString('vi-VN')}`,
        notes: item.notes
      }));

      // Update state and LocalStorage
      setInternalMaterials(validated);
      try {
        localStorage.setItem('mindx_study_materials', JSON.stringify(validated));
      } catch (err) {
        console.error(err);
      }

      setImportStatusMessage(language === 'vi' ? `Thành công! Đã nạp ${validated.length} học liệu vào LocalStorage.` : `Success! Imported ${validated.length} materials into LocalStorage.`);
      setTimeout(() => {
        setShowBackupModal(false);
        setImportStatusMessage(null);
        setImportJsonText('');
      }, 1500);
    } catch (err: any) {
      setImportStatusMessage(language === 'vi' ? `Lỗi định dạng JSON: ${err.message}` : `JSON Error: ${err.message}`);
    }
  };

  // Quick insert 3 bullet points template
  const handleInsertThreeBulletPoints = () => {
    playMechanicalKeyClick();
    const template = `• [Trọng tâm 1]: Cú pháp & Khái niệm cốt lõi theo SGK
• [Trọng tâm 2]: Ví dụ minh họa và trường hợp ứng dụng thực tế
• [Trọng tâm 3]: Lưu ý tránh lỗi cú pháp, bẫy logic khi chạy chương trình`;
    setTextContent(prev => prev ? `${prev}\n\n${template}` : template);
  };

  // Quick insert template for PLAN
  const handleInsertPlanTemplate = () => {
    playMechanicalKeyClick();
    setPlanTitle('Kế hoạch 3 tuần: Cấu trúc dữ liệu & Lập trình thuật toán');
    setPlanContent(`[LOẠI: PLAN - KẾ HOẠCH HỌC TẬP]
• Tuần 1: Ôn lại mảng 1 chiều, 2 chiều và danh sách List trong Python / C++.
• Tuần 2: Thuật toán tìm kiếm tuần tự và tìm kiếm nhị phân chia đôi khoảng O(logN).
• Tuần 3: Thuật toán sắp xếp nổi bọt (Bubble Sort) và sắp xếp chèn (Insertion Sort).
• Mục tiêu tự lực: Tự vẽ sơ đồ khối và trace table từng bước, không sao chép máy móc từ AI.`);
    setPlanPrompt('Hãy đóng vai Trợ giảng Tin học THPT: Đưa ra 3 câu hỏi gợi ý tư duy cho thuật toán tìm kiếm nhị phân theo SGK Tin 11 Kết Nối Tri Thức, không đưa ra code hoàn chỉnh.');
  };

  // Quick insert template for NOTE
  const handleInsertNoteTemplate = () => {
    playMechanicalKeyClick();
    setNoteTitle('Ghi chú trọng tâm: 3 Bẫy lỗi thường gặp môn Tin học');
    setNoteContent(`[LOẠI: NOTE - GHI CHÚ TRỌNG TÂM]
1. Bẫy lỗi IndexError: Chỉ số trong Python bắt đầu từ 0 đến len(arr)-1, duyệt range(1, len(arr)+1) sẽ gây lỗi truy cập ngoài mảng.
2. Bẫy vòng lặp vô tận while: Luôn đảm bảo biến điều kiện được cập nhật sau mỗi vòng lặp.
3. Bẫy kiểu dữ liệu nhập vào: input() luôn trả về chuỗi str, cần dùng int(input()) hoặc float(input()) để tính toán số học.`);
    setNotePrompt('Em đang làm bài tập kiểm tra số nguyên tố bằng Python. Khi chạy với số âm hoặc số 1 thì chương trình báo kết quả sai. Hãy chỉ ra điều kiện biên cần lưu ý theo SGK Tin 10.');
  };

  // Trigger generator for top workflow [LOẠI: FUNCTION]
  const handleGenerateWorkflowSummary = () => {
    playMechanicalKeyClick();
    const sourceMat = materialsList.find(m => m.id === summaryWorkflowSelectedId) || materialsList[0];
    if (!sourceMat) return;

    setIsGeneratingWorkflow(true);
    setTimeout(() => {
      const res = generatePedagogicalSummary({
        title: sourceMat.title,
        content: sourceMat.content,
        subjectTopic: sourceMat.subjectTopic,
        type: sourceMat.type
      });
      setSummaryWorkflowResult(res);
      setIsGeneratingWorkflow(false);

      // Save to LocalStorage per requirements!
      const updated = saveSummaryToLocalStorage(sourceMat.id, res);
      if (updated.length > 0) {
        setInternalMaterials(updated);
      }
      setSummaryWorkflowToast(
        language === 'vi' 
          ? `Đã tạo & lưu Summary & Key Points cho "${sourceMat.title.slice(0, 32)}..." vào LocalStorage!`
          : 'Summary & Key Points generated and persisted to LocalStorage!'
      );
      setTimeout(() => setSummaryWorkflowToast(null), 4000);
    }, 350);
  };

  // Save as standalone note material in LocalStorage
  const handleSaveWorkflowAsNote = () => {
    if (!summaryWorkflowResult) return;
    playMechanicalKeyClick();
    const sourceMat = materialsList.find(m => m.id === summaryWorkflowSelectedId) || materialsList[0];
    const newNote = saveAsNewSummaryMaterial(
      sourceMat?.title || 'Học liệu Tin học',
      summaryWorkflowResult,
      sourceMat?.subjectTopic || 'Tin học 10 & 11 KNTT'
    );
    setInternalMaterials(prev => [newNote, ...prev]);
    setSummaryWorkflowToast(
      language === 'vi' 
        ? 'Đã tạo thành công Học liệu Note mới và lưu vào LocalStorage!' 
        : 'New Note material created and saved to LocalStorage!'
    );
    setTimeout(() => setSummaryWorkflowToast(null), 3500);
  };

  // Card-specific summary generator
  const handleGenerateCardSummary = (mat: StudyMaterial) => {
    playMechanicalKeyClick();
    const res = generatePedagogicalSummary({
      title: mat.title,
      content: mat.content,
      subjectTopic: mat.subjectTopic,
      type: mat.type
    });

    const updated = saveSummaryToLocalStorage(mat.id, res);
    if (updated.length > 0) {
      setInternalMaterials(updated);
    }
    setExpandedSummaryCardIds(prev => ({ ...prev, [mat.id]: true }));
    setSaveSuccessMessage(
      language === 'vi'
        ? `Đã tạo & lưu Summary & Key Points cho "${mat.title.slice(0, 25)}..." vào LocalStorage!`
        : 'Summary generated & saved to LocalStorage!'
    );
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  const handleToggleCardSummaryExpand = (matId: string) => {
    playMechanicalKeyClick();
    setExpandedSummaryCardIds(prev => ({ ...prev, [matId]: !prev[matId] }));
  };

  // Start editing a material (CRUD - Update)
  const handleStartEdit = (mat: StudyMaterial) => {
    playMechanicalKeyClick();
    setEditingId(mat.id);
    setSourceType(mat.type);
    if (mat.subjectTopic) {
      setSelectedTopic(mat.subjectTopic);
    }
    if (mat.type === 'text') {
      setTextTitle(mat.title);
      setTextContent(mat.content);
    } else if (mat.type === 'image') {
      setImageTitle(mat.title);
      setImageNotes(mat.content);
      if (mat.images && mat.images.length > 0) {
        setUploadedImages([...mat.images]);
      }
    } else if (mat.type === 'url') {
      setUrlTitle(mat.title);
      setUrlAddress(mat.sourceUrl || '');
      setUrlDescription(mat.content);
    } else if (mat.type === 'plan') {
      setPlanTitle(mat.title);
      setPlanContent(mat.content);
      setPlanPrompt(mat.promptText || '');
    } else if (mat.type === 'note') {
      setNoteTitle(mat.title);
      setNoteContent(mat.content);
      setNotePrompt(mat.promptText || '');
    }

    const formEl = document.getElementById('materials-form-container');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    playMechanicalKeyClick();
    setEditingId(null);
    setTextTitle('');
    setTextContent('');
    setImageTitle('');
    setImageNotes('');
    setUrlTitle('');
    setUrlAddress('');
    setUrlDescription('');
    setPlanTitle('');
    setPlanContent('');
    setPlanPrompt('');
    setNoteTitle('');
    setNoteContent('');
    setNotePrompt('');
  };

  // Handle image upload via file reader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playMechanicalKeyClick();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages(prev => [...prev, String(event.target?.result)]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove: number) => {
    playMechanicalKeyClick();
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Add or Update material (CRUD: Create & Update)
  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalKeyClick();

    const now = new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', { hour: '2-digit', minute: '2-digit' });

    if (editingId) {
      // Update existing item
      const existing = materialsList.find(m => m.id === editingId);
      let updatedMaterial: StudyMaterial;

      if (sourceType === 'text') {
        if (!textTitle.trim() || !textContent.trim()) {
          alert(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung bài học!' : 'Please enter title and content!');
          return;
        }
        updatedMaterial = {
          ...existing,
          id: editingId,
          type: 'text',
          title: textTitle.trim(),
          subjectTopic: selectedTopic,
          content: textContent.trim(),
          dateAdded: `${language === 'vi' ? 'Đã sửa lúc' : 'Updated at'} ${now}`
        };
      } else if (sourceType === 'image') {
        if (uploadedImages.length < 2) {
          alert(language === 'vi' ? 'Yêu cầu tối thiểu 2 ảnh để bảo đảm đầy đủ học liệu!' : 'Please upload at least 2 images as required!');
          return;
        }
        updatedMaterial = {
          ...existing,
          id: editingId,
          type: 'image',
          title: imageTitle.trim() || `Tài liệu hình ảnh (${uploadedImages.length} ảnh)`,
          subjectTopic: selectedTopic,
          content: imageNotes.trim() || `Bộ sưu tập ${uploadedImages.length} ảnh học liệu minh họa SGK`,
          images: [...uploadedImages],
          dateAdded: `${language === 'vi' ? 'Đã sửa lúc' : 'Updated at'} ${now}`
        };
      } else if (sourceType === 'url') {
        if (!urlAddress.trim()) {
          alert(language === 'vi' ? 'Vui lòng nhập đường dẫn URL bài giảng!' : 'Please enter a valid lecture URL!');
          return;
        }
        updatedMaterial = {
          ...existing,
          id: editingId,
          type: 'url',
          title: urlTitle.trim() || urlAddress.trim(),
          subjectTopic: selectedTopic,
          content: urlDescription.trim() || 'Tài liệu tham khảo trực tuyến môn Tin học',
          sourceUrl: urlAddress.trim(),
          dateAdded: `${language === 'vi' ? 'Đã sửa lúc' : 'Updated at'} ${now}`
        };
      } else if (sourceType === 'plan') {
        if (!planTitle.trim() || !planContent.trim()) {
          alert(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung kế hoạch học tập!' : 'Please enter plan title and content!');
          return;
        }
        updatedMaterial = {
          ...existing,
          id: editingId,
          type: 'plan',
          title: planTitle.trim(),
          subjectTopic: selectedTopic,
          content: planContent.trim(),
          promptText: planPrompt.trim(),
          dateAdded: `${language === 'vi' ? 'Đã sửa lúc' : 'Updated at'} ${now}`
        };
      } else {
        if (!noteTitle.trim() || !noteContent.trim()) {
          alert(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung ghi chú!' : 'Please enter note title and content!');
          return;
        }
        updatedMaterial = {
          ...existing,
          id: editingId,
          type: 'note',
          title: noteTitle.trim(),
          subjectTopic: selectedTopic,
          content: noteContent.trim(),
          promptText: notePrompt.trim(),
          dateAdded: `${language === 'vi' ? 'Đã sửa lúc' : 'Updated at'} ${now}`
        };
      }

      if (onUpdateMaterial) {
        onUpdateMaterial(updatedMaterial);
      } else {
        setInternalMaterials(prev => {
          const updated = prev.map(m => m.id === editingId ? updatedMaterial : m);
          try {
            localStorage.setItem('mindx_study_materials', JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
          return updated;
        });
      }

      handleCancelEdit();
      setSaveSuccessMessage(
        language === 'vi'
          ? 'Đã cập nhật học liệu và lưu vào LocalStorage thành công!'
          : 'Material updated and saved to LocalStorage successfully!'
      );
      setTimeout(() => setSaveSuccessMessage(null), 3500);
      return;
    }

    // Create new item
    let newMaterial: StudyMaterial;

    if (sourceType === 'text') {
      if (!textTitle.trim() || !textContent.trim()) {
        alert(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung bài học!' : 'Please enter title and content!');
        return;
      }
      newMaterial = {
        id: `mat-${Date.now()}`,
        type: 'text',
        title: textTitle.trim(),
        subjectTopic: selectedTopic,
        content: textContent.trim(),
        dateAdded: `${language === 'vi' ? 'Vừa xong' : 'Just now'}, ${now}`
      };
      setTextTitle('');
      setTextContent('');
    } else if (sourceType === 'image') {
      if (uploadedImages.length < 2) {
        alert(language === 'vi' ? 'Yêu cầu tải lên tối thiểu 2 ảnh để bảo đảm đầy đủ học liệu!' : 'Please upload at least 2 images as required!');
        return;
      }
      newMaterial = {
        id: `mat-${Date.now()}`,
        type: 'image',
        title: imageTitle.trim() || (language === 'vi' ? `Tài liệu hình ảnh (${uploadedImages.length} ảnh)` : `Image document (${uploadedImages.length} pics)`),
        subjectTopic: selectedTopic,
        content: imageNotes.trim() || (language === 'vi' ? `Bộ sưu tập ${uploadedImages.length} ảnh học liệu minh họa SGK` : `Collection of ${uploadedImages.length} study pictures`),
        images: [...uploadedImages],
        dateAdded: `${language === 'vi' ? 'Vừa xong' : 'Just now'}, ${now}`
      };
      setImageTitle('');
      setImageNotes('');
    } else if (sourceType === 'url') {
      if (!urlAddress.trim()) {
        alert(language === 'vi' ? 'Vui lòng nhập đường dẫn URL bài giảng!' : 'Please enter a valid lecture URL!');
        return;
      }
      newMaterial = {
        id: `mat-${Date.now()}`,
        type: 'url',
        title: urlTitle.trim() || urlAddress.trim(),
        subjectTopic: selectedTopic,
        content: urlDescription.trim() || (language === 'vi' ? 'Tài liệu tham khảo trực tuyến môn Tin học' : 'Online reference study resource'),
        sourceUrl: urlAddress.trim(),
        dateAdded: `${language === 'vi' ? 'Vừa xong' : 'Just now'}, ${now}`
      };
      setUrlTitle('');
      setUrlAddress('');
      setUrlDescription('');
    } else if (sourceType === 'plan') {
      if (!planTitle.trim() || !planContent.trim()) {
        alert(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung kế hoạch học tập!' : 'Please enter plan title and content!');
        return;
      }
      newMaterial = {
        id: `mat-${Date.now()}`,
        type: 'plan',
        title: planTitle.trim(),
        subjectTopic: selectedTopic,
        content: planContent.trim(),
        promptText: planPrompt.trim(),
        dateAdded: `${language === 'vi' ? 'Vừa xong' : 'Just now'}, ${now}`
      };
      setPlanTitle('');
      setPlanContent('');
      setPlanPrompt('');
    } else {
      if (!noteTitle.trim() || !noteContent.trim()) {
        alert(language === 'vi' ? 'Vui lòng nhập tiêu đề và nội dung ghi chú!' : 'Please enter note title and content!');
        return;
      }
      newMaterial = {
        id: `mat-${Date.now()}`,
        type: 'note',
        title: noteTitle.trim(),
        subjectTopic: selectedTopic,
        content: noteContent.trim(),
        promptText: notePrompt.trim(),
        dateAdded: `${language === 'vi' ? 'Vừa xong' : 'Just now'}, ${now}`
      };
      setNoteTitle('');
      setNoteContent('');
      setNotePrompt('');
    }

    if (onAddMaterial) {
      onAddMaterial(newMaterial);
    } else {
      setInternalMaterials(prev => {
        const updated = [newMaterial, ...prev];
        try {
          localStorage.setItem('mindx_study_materials', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }

    setSaveSuccessMessage(
      language === 'vi' 
        ? 'Đã tạo và lưu học liệu vào LocalStorage thành công!' 
        : 'Material saved to LocalStorage successfully!'
    );
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  // Delete material (CRUD: Delete)
  const handleDeleteMaterial = (id: string, title?: string) => {
    playMechanicalKeyClick();
    if (window.confirm(language === 'vi' 
      ? `Bạn có chắc chắn muốn xóa học liệu "${title || 'này'}" khỏi danh mục và LocalStorage?` 
      : `Are you sure you want to delete this material?`)) {
      if (editingId === id) {
        handleCancelEdit();
      }
      if (onDeleteMaterial) {
        onDeleteMaterial(id);
      } else {
        setInternalMaterials(prev => {
          const updated = prev.filter(item => item.id !== id);
          try {
            localStorage.setItem('mindx_study_materials', JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
          return updated;
        });
      }
      setSaveSuccessMessage(language === 'vi' ? 'Đã xóa học liệu khỏi LocalStorage.' : 'Material deleted from LocalStorage.');
      setTimeout(() => setSaveSuccessMessage(null), 2500);
    }
  };

  // Reset materials to default
  const handleResetToDefault = () => {
    playMechanicalKeyClick();
    if (window.confirm(language === 'vi' 
      ? 'Khôi phục danh sách học liệu chuẩn ban đầu của SGK KNTT 10 & 11?' 
      : 'Reset to default study materials?')) {
      if (onResetMaterials) {
        onResetMaterials();
      } else {
        setInternalMaterials(INITIAL_MATERIALS);
        try {
          localStorage.setItem('mindx_study_materials', JSON.stringify(INITIAL_MATERIALS));
        } catch (e) {
          console.error(e);
        }
      }
      handleCancelEdit();
      setSaveSuccessMessage(language === 'vi' ? 'Đã khôi phục dữ liệu mẫu thành công!' : 'Reset to sample materials successfully!');
      setTimeout(() => setSaveSuccessMessage(null), 2500);
    }
  };

  // Filter & Search logic
  const filteredMaterials = materialsList.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    if (!matchesType) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      (item.subjectTopic && item.subjectTopic.toLowerCase().includes(term)) ||
      item.content.toLowerCase().includes(term)
    );
  });

  return (
    <div id="materials-input-screen" className="space-y-4">
      {/* Top Banner Notice */}
      <div
        className={`rounded-xl border p-3 sm:p-4 backdrop-blur-md transition-all ${
          isLight
            ? 'bg-white/50 border-blue-200/80 shadow-xs'
            : 'bg-neutral-900/50 border-blue-900/40 text-neutral-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {t.materialsScreen.badge}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.materialsScreen.title}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                {t.materialsScreen.subtitle}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100/80 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Nguồn ảnh: Tối thiểu 2 ảnh</span>
          </div>
        </div>
      </div>

      {/* LUỒNG TẠO SUMMARY VÀ KEY POINTS TỪ DỮ LIỆU NGUỒN ĐÃ CÓ [LOẠI: FUNCTION] */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 backdrop-blur-md transition-all shadow-sm ${
          isLight
            ? 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white border-neutral-800'
            : 'bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white border-neutral-800'
        }`}
      >
        {/* Terminal Header matching image.png */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {/* Mac / Terminal dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                LOẠI: FUNCTION
              </span>
              <span className="text-xs font-mono font-semibold text-neutral-300">
                Luồng tạo Summary & Key Points từ dữ liệu nguồn
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleCopyText(
              `Hãy bổ sung vào app nút hoặc luồng tạo summary và key points từ dữ liệu nguồn đã có.\n\nYêu cầu:\n- summary ngắn, dễ hiểu\n- key points rõ ràng\n- bám đúng phạm vi môn/chủ đề\n- ưu tiên nội dung cốt lõi, không chỉ lặp keyword bề mặt\n- dữ liệu sinh ra được lưu lại trong LocalStorage\n- ngôn ngữ phù hợp học sinh lớp 7 trở lên`,
              'prompt-function-banner'
            )}
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded cursor-pointer transition-all border ${
              copiedId === 'prompt-function-banner'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
            }`}
          >
            {copiedId === 'prompt-function-banner' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'prompt-function-banner' ? 'ĐÃ COPY YÊU CẦU!' : 'CLICK TO COPY'}</span>
          </button>
        </div>

        {/* Requirements Prompt Box as displayed in image.png */}
        <div className="my-3 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed space-y-2">
          <p className="text-neutral-100 font-semibold">
            Hãy bổ sung vào app nút hoặc luồng tạo summary và key points từ dữ liệu nguồn đã có.
          </p>
          <div className="text-neutral-300 text-[11px] space-y-1">
            <p className="text-neutral-400 font-bold">Yêu cầu:</p>
            <p className="flex items-center gap-1.5"><span className="text-blue-400">-</span> summary ngắn, dễ hiểu</p>
            <p className="flex items-center gap-1.5"><span className="text-blue-400">-</span> key points rõ ràng</p>
            <p className="flex items-center gap-1.5"><span className="text-blue-400">-</span> bám đúng phạm vi môn/chủ đề</p>
            <p className="flex items-center gap-1.5"><span className="text-blue-400">-</span> ưu tiên nội dung cốt lõi, không chỉ lặp keyword bề mặt</p>
            <p className="flex items-center gap-1.5"><span className="text-blue-400">-</span> dữ liệu sinh ra được lưu lại trong LocalStorage</p>
            <p className="flex items-center gap-1.5"><span className="text-blue-400">-</span> ngôn ngữ phù hợp học sinh lớp 7 trở lên</p>
          </div>
        </div>

        {/* Interactive Engine Controls */}
        <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-neutral-300 mb-1">
                Chọn học liệu nguồn (từ danh sách đã lưu trữ trong LocalStorage):
              </label>
              <select
                value={summaryWorkflowSelectedId}
                onChange={(e) => setSummaryWorkflowSelectedId(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none focus:border-blue-500 font-sans cursor-pointer"
              >
                {materialsList.map((m) => (
                  <option key={m.id} value={m.id}>
                    [{m.type.toUpperCase()}] {m.title} ({m.subjectTopic || 'Tin học'})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleGenerateWorkflowSummary}
              disabled={isGeneratingWorkflow}
              className="mt-auto sm:self-end px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
            >
              <Zap className={`w-4 h-4 text-amber-300 ${isGeneratingWorkflow ? 'animate-spin' : ''}`} />
              <span>{isGeneratingWorkflow ? 'Đang trích xuất...' : '⚡ Tạo Summary & Key Points'}</span>
            </button>
          </div>

          {/* Feedback Toast if any */}
          {summaryWorkflowToast && (
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{summaryWorkflowToast}</span>
              </div>
            </div>
          )}

          {/* Result Output Preview */}
          {summaryWorkflowResult && (
            <div className="mt-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-700 space-y-3 font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900 text-blue-200 font-bold">
                    KẾT QUẢ TRÍCH XUẤT [LỚP 7+]
                  </span>
                  <span className="text-xs text-neutral-400">
                    Bám sát SGK Kết Nối Tri Thức
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      const sel = materialsList.find(m => m.id === summaryWorkflowSelectedId);
                      const copyText = formatSummaryForCopy(sel?.title || 'Học liệu Tin học', summaryWorkflowResult);
                      handleCopyText(copyText, 'workflow-result-copy');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800 cursor-pointer transition-colors"
                  >
                    {copiedId === 'workflow-result-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'workflow-result-copy' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveWorkflowAsNote}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-xs transition-colors"
                    title="Lưu lại kết quả này thành 1 học liệu Note độc lập trong LocalStorage"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Lưu thành Note mới</span>
                  </button>
                </div>
              </div>

              {/* 1. Summary Box */}
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>1. Tóm tắt cốt lõi (Summary - Ngắn gọn, dễ hiểu):</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  {summaryWorkflowResult.summary}
                </p>
              </div>

              {/* 2. Key Points Box */}
              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>2. Các điểm then chốt (Key Points - Không lặp keyword bề mặt):</span>
                </div>
                <div className="space-y-1.5">
                  {summaryWorkflowResult.keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-200">
                      <span className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-emerald-800">
                        {pIdx + 1}
                      </span>
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Pedagogy Tip */}
              {summaryWorkflowResult.pedagogyTip && (
                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-900/60 text-xs text-amber-200 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">Góc nhìn Sư phạm & Lời khuyên tư duy: </span>
                    <span>{summaryWorkflowResult.pedagogyTip}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Left is Input Form, Right is Added Materials List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Form: 7 cols */}
        <div
          id="materials-form-container"
          className={`lg:col-span-7 rounded-xl border p-4 backdrop-blur-md transition-all flex flex-col ${
            isLight
              ? 'bg-white/50 border-slate-200 shadow-xs'
              : 'bg-neutral-950/50 border-neutral-800 text-white'
          } ${editingId ? 'ring-2 ring-blue-500/50' : ''}`}
        >
          {/* Edit Mode Notice Banner */}
          {editingId && (
            <div className="mb-3 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-bold text-blue-900 dark:text-blue-200">
                  {language === 'vi' ? 'Đang ở chế độ chỉnh sửa học liệu (CRUD: Update)' : 'Editing study material (CRUD: Update)'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-2 py-0.5 rounded bg-blue-200/80 dark:bg-blue-900 hover:bg-blue-300 text-blue-900 dark:text-blue-100 font-semibold cursor-pointer text-[11px]"
              >
                {language === 'vi' ? 'Hủy sửa' : 'Cancel'}
              </button>
            </div>
          )}

          <form onSubmit={handleSaveMaterial} className="space-y-4 flex-1 flex flex-col">
            {/* Step 1: Select Subject & Topic */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-neutral-200 mb-1 flex items-center justify-between">
                <span>{t.materialsScreen.selectSubject}</span>
                <span className="text-[11px] font-normal text-slate-500 dark:text-neutral-400">
                  {t.materialsScreen.subjectHelp}
                </span>
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => {
                  playMechanicalKeyClick();
                  setSelectedTopic(e.target.value);
                }}
                className={`w-full px-3 py-2 rounded-lg text-xs font-sans outline-none border transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                    : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                }`}
              >
                {SUBJECT_TOPICS.map((topic, idx) => (
                  <option key={idx} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Choose Source Type (Text, Image, URL, PLAN, NOTE) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-neutral-200">
                  {t.materialsScreen.inputSources}
                </label>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  LOẠI: PLAN / NOTE
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playMechanicalKeyClick();
                    setSourceType('text');
                  }}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    sourceType === 'text'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-bold'
                      : isLight
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate">{t.materialsScreen.tabText}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playMechanicalKeyClick();
                    setSourceType('image');
                  }}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    sourceType === 'image'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-bold'
                      : isLight
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="truncate">Ảnh (≥ 2 ảnh)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playMechanicalKeyClick();
                    setSourceType('url');
                  }}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    sourceType === 'url'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs font-bold'
                      : isLight
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span className="truncate">{t.materialsScreen.tabUrl}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playMechanicalKeyClick();
                    setSourceType('plan');
                  }}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    sourceType === 'plan'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs font-bold'
                      : isLight
                      ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                      : 'bg-amber-950/40 text-amber-200 border-amber-800/80 hover:bg-amber-900/60'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="truncate font-bold">LOẠI: PLAN</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playMechanicalKeyClick();
                    setSourceType('note');
                  }}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    sourceType === 'note'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs font-bold'
                      : isLight
                      ? 'bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100'
                      : 'bg-rose-950/40 text-rose-200 border-rose-800/80 hover:bg-rose-900/60'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="truncate font-bold">LOẠI: NOTE</span>
                </button>
              </div>
            </div>

            {/* Render Selected Input Box */}
            {sourceType === 'text' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
                    {t.materialsScreen.textTitleLabel}
                  </label>
                  <input
                    type="text"
                    value={textTitle}
                    onChange={(e) => setTextTitle(e.target.value)}
                    placeholder={t.materialsScreen.textTitlePlaceholder}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300">
                      {t.materialsScreen.textContentLabel}
                    </label>
                    <button
                      type="button"
                      onClick={handleInsertThreeBulletPoints}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 px-2 py-0.5 rounded cursor-pointer transition-colors border border-blue-200 dark:border-blue-800"
                      title="Tạo nhanh 3 gạch đầu dòng chuẩn cho ghi chú bài học"
                    >
                      <ListOrdered className="w-3 h-3" />
                      <span>+ Chèn 3 gạch đầu dòng chuẩn SGK</span>
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder={t.materialsScreen.textContentPlaceholder}
                    className={`w-full flex-1 p-3 rounded-lg text-xs font-mono outline-none border transition-colors resize-none ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500 placeholder:text-slate-400'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500 placeholder:text-neutral-500'
                    }`}
                  ></textarea>
                </div>
              </div>
            )}

            {sourceType === 'image' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
                    {t.materialsScreen.imageTitleLabel}
                  </label>
                  <input
                    type="text"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder={t.materialsScreen.imageTitlePlaceholder}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Minimum 2 Images Guarantee & Previews */}
                <div
                  className={`p-3 rounded-lg border ${
                    isLight
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      {t.materialsScreen.imageMinNotice}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold">
                      {uploadedImages.length} ảnh đã chọn (Đạt chuẩn ≥ 2)
                    </span>
                  </div>

                  {/* Images Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {uploadedImages.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden border border-emerald-300 dark:border-emerald-700 bg-black aspect-video flex items-center justify-center"
                      >
                        <img
                          src={imgUrl}
                          alt={`Học liệu ảnh ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewImageModal(imgUrl)}
                            className="p-1 rounded bg-white/90 text-black hover:bg-white text-xs cursor-pointer"
                            title="Phóng to xem ảnh"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {uploadedImages.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="p-1 rounded bg-red-600 text-white hover:bg-red-700 text-xs cursor-pointer"
                              title="Xóa ảnh"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 text-white px-1 rounded">
                          Trang {index + 1}
                        </span>
                      </div>
                    ))}

                    {/* Add Image Button */}
                    <label className="rounded-lg border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-blue-500 transition-colors flex flex-col items-center justify-center p-2 text-center cursor-pointer aspect-video bg-white/40 dark:bg-neutral-900/40">
                      <Plus className="w-4 h-4 text-blue-600 mb-1" />
                      <span className="text-[10px] font-semibold text-slate-600 dark:text-neutral-400">
                        {t.materialsScreen.uploadAction}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
                    Ghi chú tóm tắt nội dung bộ ảnh
                  </label>
                  <input
                    type="text"
                    value={imageNotes}
                    onChange={(e) => setImageNotes(e.target.value)}
                    placeholder="VD: Thuật toán sắp xếp nổi bọt & Bảng biến thiên trang 88..."
                    className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>
            )}

            {sourceType === 'url' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
                    {t.materialsScreen.urlTitleLabel}
                  </label>
                  <input
                    type="text"
                    value={urlTitle}
                    onChange={(e) => setUrlTitle(e.target.value)}
                    placeholder={t.materialsScreen.urlTitlePlaceholder}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
                    Đường dẫn liên kết (URL)
                  </label>
                  <input
                    type="url"
                    value={urlAddress}
                    onChange={(e) => setUrlAddress(e.target.value)}
                    placeholder={t.materialsScreen.urlLinkPlaceholder}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 mb-1">
                    Mô tả / Ý chính của bài viết
                  </label>
                  <textarea
                    rows={3}
                    value={urlDescription}
                    onChange={(e) => setUrlDescription(e.target.value)}
                    placeholder="VD: Tổng hợp các bài giải bài tập Tin học 11 từ nguồn uy tín..."
                    className={`w-full p-2.5 rounded-lg text-xs outline-none border transition-colors resize-none ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                    }`}
                  ></textarea>
                </div>
              </div>
            )}

            {/* PLAN INPUT SECTION */}
            {sourceType === 'plan' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300">
                    Tiêu đề Kế Hoạch Học Tập [LOẠI: PLAN]
                  </label>
                  <button
                    type="button"
                    onClick={handleInsertPlanTemplate}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-300 cursor-pointer"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>+ Chèn Mẫu Kế Hoạch 3 Tuần</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={planTitle}
                  onChange={(e) => setPlanTitle(e.target.value)}
                  placeholder="VD: Kế hoạch ôn tập Cấu trúc dữ liệu & Thuật toán Tin 11..."
                  className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
                      : 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-500'
                  }`}
                />

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300">
                      Nội dung lộ trình & phân bổ thời gian
                    </label>
                    {planContent && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(planContent, 'form-plan-content')}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 cursor-pointer"
                      >
                        {copiedId === 'form-plan-content' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === 'form-plan-content' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={planContent}
                    onChange={(e) => setPlanContent(e.target.value)}
                    placeholder="Nhập các tuần/ngày ôn tập, mục tiêu thuật toán, bài tập tự luyện..."
                    className={`w-full p-2.5 rounded-lg text-xs font-mono outline-none border transition-colors resize-none ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-500'
                    }`}
                  ></textarea>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Prompt AI đồng hành (Chuẩn 5 nguyên tắc đạo đức)</span>
                    </label>
                    {planPrompt && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(planPrompt, 'form-plan-prompt')}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 cursor-pointer"
                      >
                        {copiedId === 'form-plan-prompt' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === 'form-plan-prompt' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY PROMPT'}</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={planPrompt}
                    onChange={(e) => setPlanPrompt(e.target.value)}
                    placeholder="VD: Hãy đóng vai Trợ giảng: Đưa ra 3 câu hỏi gợi ý tư duy thuật toán, không đưa code..."
                    className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* NOTE INPUT SECTION */}
            {sourceType === 'note' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300">
                    Tiêu đề Ghi Chú Trọng Tâm [LOẠI: NOTE]
                  </label>
                  <button
                    type="button"
                    onClick={handleInsertNoteTemplate}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded border border-rose-300 cursor-pointer"
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>+ Chèn Mẫu Bẫy Lỗi Phòng Thi</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="VD: Ghi chú bẫy lỗi thường gặp khi viết vòng lặp và danh sách..."
                  className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-rose-500'
                      : 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-500'
                  }`}
                />

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300">
                      Nội dung ghi chú & điểm mấu chốt
                    </label>
                    {noteContent && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(noteContent, 'form-note-content')}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border border-rose-300 cursor-pointer"
                      >
                        {copiedId === 'form-note-content' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === 'form-note-content' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY'}</span>
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Ghi lại các bẫy logic, cú pháp đặc biệt, lưu ý khi nộp bài..."
                    className={`w-full p-2.5 rounded-lg text-xs font-mono outline-none border transition-colors resize-none ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-rose-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-500'
                    }`}
                  ></textarea>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-neutral-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-rose-600" />
                      <span>Prompt AI gỡ lỗi (Bám sát SGK Kết Nối Tri Thức)</span>
                    </label>
                    {notePrompt && (
                      <button
                        type="button"
                        onClick={() => handleCopyText(notePrompt, 'form-note-prompt')}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border border-rose-300 cursor-pointer"
                      >
                        {copiedId === 'form-note-prompt' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === 'form-note-prompt' ? 'ĐÃ SAO CHÉP!' : 'CLICK TO COPY PROMPT'}</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={notePrompt}
                    onChange={(e) => setNotePrompt(e.target.value)}
                    placeholder="VD: Em bị lỗi IndexError trong danh sách Python. Hãy chỉ ra điều kiện biên cần lưu ý..."
                    className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-rose-500'
                        : 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-500'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Save / Update Button */}
            <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
              {saveSuccessMessage ? (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveSuccessMessage}</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                  {editingId 
                    ? (language === 'vi' ? 'Đang cập nhật mục đã chọn' : 'Updating selected material') 
                    : (language === 'vi' ? 'Dữ liệu được lưu trữ tự động vào LocalStorage' : 'Saved automatically to LocalStorage')}
                </span>
              )}

              <div className="flex items-center gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    {language === 'vi' ? 'Hủy' : 'Cancel'}
                  </button>
                )}

                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                    editingId 
                      ? 'bg-amber-600 hover:bg-amber-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {editingId ? (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Lưu Cập Nhật Học Liệu' : 'Save Changes'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.materialsScreen.saveButton}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: List of Added Materials (5 cols) */}
        <div
          className={`lg:col-span-5 rounded-xl border p-4 backdrop-blur-md transition-all flex flex-col ${
            isLight
              ? 'bg-white/50 border-slate-200 shadow-xs'
              : 'bg-neutral-950/50 border-neutral-800 text-white'
          }`}
        >
          <div className="pb-3 mb-3 border-b border-slate-200 dark:border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>{t.materialsScreen.addedListTitle}</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                  {materialsList.length} nguồn tài liệu • CRUD & LocalStorage
                </p>
              </div>

              {/* Data Tools: Backup JSON, Import JSON & Reset */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200 dark:border-blue-800 cursor-pointer transition-colors"
                  title="Xuất dữ liệu học liệu ra file JSON & sao chép vào clipboard"
                >
                  <Download className="w-3 h-3" />
                  <span>Xuất JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowBackupModal(true)}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800 cursor-pointer transition-colors"
                  title="Nhập và khôi phục dữ liệu học liệu từ mã JSON vào LocalStorage"
                >
                  <Upload className="w-3 h-3" />
                  <span>Nhập JSON</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 cursor-pointer transition-colors"
                  title="Khôi phục danh sách tài liệu mẫu SGK KNTT ban đầu"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Khôi phục mẫu</span>
                </button>
              </div>
            </div>

            {/* Search Box & Filters */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo từ khóa (for, while, thuật toán, SQL, PLAN...)"
                className={`w-full pl-8 pr-7 py-1.5 rounded-lg text-xs outline-none border transition-colors ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                    : 'bg-neutral-900 border-neutral-800 text-white focus:border-blue-500'
                }`}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills with PLAN & NOTE */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pt-0.5">
              <button
                onClick={() => {
                  playMechanicalKeyClick();
                  setFilterType('all');
                }}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold cursor-pointer whitespace-nowrap ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white'
                    : isLight
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Tất cả ({materialsList.length})
              </button>
              <button
                onClick={() => {
                  playMechanicalKeyClick();
                  setFilterType('text');
                }}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold cursor-pointer whitespace-nowrap ${
                  filterType === 'text'
                    ? 'bg-blue-600 text-white'
                    : isLight
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Văn bản ({materialsList.filter(m => m.type === 'text').length})
              </button>
              <button
                onClick={() => {
                  playMechanicalKeyClick();
                  setFilterType('image');
                }}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold cursor-pointer whitespace-nowrap ${
                  filterType === 'image'
                    ? 'bg-emerald-600 text-white'
                    : isLight
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Ảnh ({materialsList.filter(m => m.type === 'image').length})
              </button>
              <button
                onClick={() => {
                  playMechanicalKeyClick();
                  setFilterType('url');
                }}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold cursor-pointer whitespace-nowrap ${
                  filterType === 'url'
                    ? 'bg-purple-600 text-white'
                    : isLight
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-neutral-900 text-neutral-400'
                }`}
              >
                Liên kết ({materialsList.filter(m => m.type === 'url').length})
              </button>
              <button
                onClick={() => {
                  playMechanicalKeyClick();
                  setFilterType('plan');
                }}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold cursor-pointer whitespace-nowrap ${
                  filterType === 'plan'
                    ? 'bg-amber-600 text-white font-bold'
                    : isLight
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-amber-950/50 text-amber-300 border border-amber-800'
                }`}
              >
                Kế hoạch ({materialsList.filter(m => m.type === 'plan').length})
              </button>
              <button
                onClick={() => {
                  playMechanicalKeyClick();
                  setFilterType('note');
                }}
                className={`text-[10px] px-2 py-0.5 rounded font-semibold cursor-pointer whitespace-nowrap ${
                  filterType === 'note'
                    ? 'bg-rose-600 text-white font-bold'
                    : isLight
                    ? 'bg-rose-50 text-rose-900 border border-rose-200'
                    : 'bg-rose-950/50 text-rose-300 border border-rose-800'
                }`}
              >
                Ghi chú ({materialsList.filter(m => m.type === 'note').length})
              </button>
            </div>
          </div>

          {/* Materials List Scrollable Area */}
          <div className="space-y-2.5 overflow-y-auto max-h-[500px] pr-1 scrollbar-none flex-1">
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                {searchTerm ? 'Không tìm thấy học liệu khớp với từ khóa tìm kiếm.' : t.materialsScreen.emptyList}
              </div>
            ) : (
              filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className={`p-3 rounded-lg border transition-all ${
                    editingId === mat.id
                      ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50/40 dark:bg-blue-950/30'
                      : isLight
                      ? 'bg-white/80 border-slate-200 hover:border-blue-300'
                      : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          mat.type === 'text'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : mat.type === 'image'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : mat.type === 'url'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                            : mat.type === 'plan'
                            ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300'
                            : 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200 border border-rose-300'
                        }`}
                      >
                        {mat.type === 'text' && t.materialsScreen.typeTextBadge}
                        {mat.type === 'image' && t.materialsScreen.typeImageBadge}
                        {mat.type === 'url' && t.materialsScreen.typeUrlBadge}
                        {mat.type === 'plan' && 'LOẠI: PLAN'}
                        {mat.type === 'note' && 'LOẠI: NOTE'}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-400">
                        {mat.dateAdded}
                      </span>
                    </div>

                    {/* Action buttons: Edit & Delete */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEdit(mat)}
                        className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-1 cursor-pointer rounded hover:bg-amber-50 dark:hover:bg-amber-950/40"
                        title="Chỉnh sửa học liệu (CRUD Update)"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(mat.id, mat.title)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer rounded hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Xóa học liệu (CRUD Delete)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 dark:text-neutral-100 mt-1.5 line-clamp-1">
                    {mat.title}
                  </h4>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mb-1.5">
                    {mat.subjectTopic}
                  </p>

                  {/* Thumbnail gallery if images */}
                  {mat.images && mat.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 my-2">
                      {mat.images.slice(0, 2).map((img, i) => (
                        <div
                          key={i}
                          onClick={() => setPreviewImageModal(img)}
                          className="relative rounded overflow-hidden aspect-video cursor-pointer group border border-slate-200 dark:border-neutral-800"
                        >
                          <img
                            src={img}
                            alt={`ảnh ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3 h-3 text-white" />
                          </div>
                          <span className="absolute bottom-1 right-1 text-[8px] bg-black/60 text-white px-1 rounded">
                            Ảnh #{i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {mat.sourceUrl && (
                    <a
                      href={mat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline mb-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="line-clamp-1">{mat.sourceUrl}</span>
                    </a>
                  )}

                  {/* Formatted Content with Bullet points support */}
                  <div className="mt-1.5 text-[11px] text-slate-600 dark:text-neutral-300 leading-relaxed space-y-1">
                    {mat.content.includes('\n') || mat.content.includes('•') ? (
                      mat.content
                        .split('\n')
                        .filter(line => line.trim().length > 0)
                        .slice(0, 5)
                        .map((line, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold shrink-0">•</span>
                            <span className="line-clamp-2 font-mono text-[10.5px]">
                              {line.replace(/^[•\-\*]\s*/, '')}
                            </span>
                          </div>
                        ))
                    ) : (
                      <p className="line-clamp-3">{mat.content}</p>
                    )}
                  </div>

                  {/* Prompt Box if present */}
                  {mat.promptText && (
                    <div className="mt-2 p-2 rounded bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[10.5px]">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1 text-[10px]">
                          <Sparkles className="w-3 h-3" />
                          Prompt AI tương tác:
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(mat.promptText!, `card-prompt-${mat.id}`)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100 hover:bg-amber-300 cursor-pointer transition-colors"
                        >
                          {copiedId === `card-prompt-${mat.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === `card-prompt-${mat.id}` ? 'ĐÃ CHÉP!' : 'CLICK TO COPY PROMPT'}</span>
                        </button>
                      </div>
                      <p className="font-mono text-slate-700 dark:text-neutral-300 line-clamp-2">
                        {mat.promptText}
                      </p>
                    </div>
                  )}

                  {/* Summary & Key Points Section [LOẠI: FUNCTION] */}
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-neutral-800/80">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                          LOẠI: FUNCTION
                        </span>
                        <span className="text-[10px] font-semibold text-slate-600 dark:text-neutral-400">
                          Summary & Key Points
                        </span>
                      </div>

                      {mat.summary ? (
                        <button
                          type="button"
                          onClick={() => handleToggleCardSummaryExpand(mat.id)}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          <span>{expandedSummaryCardIds[mat.id] === false ? 'Xem chi tiết' : 'Thu gọn'}</span>
                          {expandedSummaryCardIds[mat.id] === false ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleGenerateCardSummary(mat)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 hover:bg-blue-200 cursor-pointer border border-blue-200 dark:border-blue-800 transition-colors"
                        >
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>Tạo Summary & Key Points</span>
                        </button>
                      )}
                    </div>

                    {/* Expandable Summary & Key Points content */}
                    {mat.summary && expandedSummaryCardIds[mat.id] !== false && (
                      <div className="mt-1.5 p-2.5 rounded-lg bg-blue-50/60 dark:bg-neutral-950/80 border border-blue-200/70 dark:border-neutral-800 space-y-2 text-[11px]">
                        <div>
                          <span className="font-bold text-blue-800 dark:text-blue-300 block mb-0.5">
                            📌 Tóm tắt cốt lõi (Lớp 7+):
                          </span>
                          <p className="text-slate-700 dark:text-neutral-300 leading-relaxed text-[10.5px]">
                            {mat.summary}
                          </p>
                        </div>

                        {mat.keyPoints && mat.keyPoints.length > 0 && (
                          <div>
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                              🔑 Điểm then chốt:
                            </span>
                            <div className="space-y-1">
                              {mat.keyPoints.slice(0, 3).map((kp, kIdx) => (
                                <div key={kIdx} className="flex items-start gap-1 text-[10.5px] text-slate-700 dark:text-neutral-300">
                                  <span className="text-emerald-500 font-bold">•</span>
                                  <span>{kp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-blue-200/50 dark:border-neutral-800">
                          <span className="text-[9px] text-slate-400 font-mono">
                            Đã lưu trong LocalStorage
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const copyStr = `[LOẠI: FUNCTION] TÓM TẮT & ĐIỂM THEN CHỐT:\n${mat.title}\n\n1. TÓM TẮT: ${mat.summary}\n\n2. ĐIỂM THEN CHỐT:\n${(mat.keyPoints || []).join('\n')}`;
                              handleCopyText(copyStr, `copy-card-summary-${mat.id}`);
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 cursor-pointer"
                          >
                            {copiedId === `copy-card-summary-${mat.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === `copy-card-summary-${mat.id}` ? 'ĐÃ COPY!' : 'CLICK TO COPY'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Quick One-Click Copy Bar */}
                  <div className="mt-2.5 pt-1.5 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {mat.id}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopyText(mat.content, `card-content-${mat.id}`)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer border ${
                        copiedId === `card-content-${mat.id}`
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                          : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border-slate-200 dark:border-neutral-700'
                      }`}
                      title="Sao chép toàn bộ nội dung học liệu vào clipboard"
                    >
                      {copiedId === `card-content-${mat.id}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>ĐÃ SAO CHÉP!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>CLICK TO COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Backup / Restore LocalStorage Modal */}
      {showBackupModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowBackupModal(false)}
        >
          <div
            className={`max-w-xl w-full rounded-2xl border p-5 shadow-2xl relative transition-colors ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-neutral-900 border-neutral-800 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm">Nhập Dữ Liệu Học Liệu (Import JSON - LocalStorage)</h3>
              </div>
              <button
                onClick={() => setShowBackupModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Dán chuỗi dữ liệu JSON của bạn vào ô dưới đây để nạp vào hệ thống và tự động lưu vào <code>localStorage('mindx_study_materials')</code>.
            </p>

            <form onSubmit={handleImportJson} className="space-y-3">
              <textarea
                rows={6}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='[ { "id": "mat-01", "type": "text", "title": "...", "content": "..." } ]'
                className={`w-full p-3 rounded-lg text-xs font-mono outline-none border transition-colors ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                    : 'bg-black border-neutral-800 text-white focus:border-emerald-500'
                }`}
              ></textarea>

              {importStatusMessage && (
                <div className={`p-2 rounded text-xs font-semibold ${
                  importStatusMessage.includes('Thành công') || importStatusMessage.includes('Success')
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  {importStatusMessage}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBackupModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 text-xs font-semibold cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Xác Nhận Nạp Dữ Liệu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Lightbox Modal */}
      {previewImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImageModal(null)}
        >
          <div
            className="max-w-2xl w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-2xl p-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-2 border-b border-neutral-800 text-white text-xs">
              <span className="font-bold">Xem ảnh chi tiết học liệu SGK</span>
              <button
                onClick={() => setPreviewImageModal(null)}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 rounded text-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
            <div className="p-2 flex items-center justify-center">
              <img
                src={previewImageModal}
                alt="Phóng to học liệu"
                className="max-h-[70vh] rounded object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
