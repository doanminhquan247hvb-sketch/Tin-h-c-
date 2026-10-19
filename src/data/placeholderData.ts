import { CodeSnippet, QuizPlaceholder, FlashcardPlaceholder, ChatPlaceholder } from '../types';

export const PYTHON_LESSONS: CodeSnippet[] = [
  // =========================================================================
  // TIN HỌC 10 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (BÀI 1 ĐẾN BÀI 25+)
  // =========================================================================
  {
    id: 'tin10-bai01',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 1,
    chapter: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài 1: Thông tin và xử lý thông tin',
    topic: 'Khái niệm thông tin, dữ liệu & Đơn vị đo lường',
    description: 'SGK Tin 10 KNTT - Tính toán dung lượng bộ nhớ (Bit, Byte, KB, MB, GB) và mô phỏng mã hóa nhị phân.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 1: THÔNG TIN VÀ XỬ LÝ THÔNG TIN ===
# 1. Đơn vị đo lượng thông tin trong máy tính
byte_val = 1
kb_val = 1024 * byte_val
mb_val = 1024 * kb_val
gb_val = 1024 * mb_val

print("BẢNG QUY ĐỔI ĐƠN VỊ THÔNG TIN:")
print(f"  1 Byte  = 8 bit")
print(f"  1 KB    = {kb_val:,} Bytes")
print(f"  1 MB    = {mb_val:,} Bytes")
print(f"  1 GB    = {gb_val:,} Bytes")

# 2. Ví dụ: Chuyển đổi một chuỗi văn bản sang mã nhị phân 8-bit
thong_diep = "TIN10"
print(f"\\nMã hóa xâu '{thong_diep}' sang nhị phân ASCII:")
for ky_tu in thong_diep:
    ma_nhi_phan = format(ord(ky_tu), '08b')
    print(f"  Ký tự '{ky_tu}' -> Mã thập phân: {ord(ky_tu):3d} -> Nhị phân: {ma_nhi_phan}")
`,
    expectedOutput: `BẢNG QUY ĐỔI ĐƠN VỊ THÔNG TIN:
  1 Byte  = 8 bit
  1 KB    = 1,024 Bytes
  1 MB    = 1,048,576 Bytes
  1 GB    = 1,073,741,824 Bytes

Mã hóa xâu 'TIN10' sang nhị phân ASCII:
  Ký tự 'T' -> Mã thập phân:  84 -> Nhị phân: 01010100
  Ký tự 'I' -> Mã thập phân:  73 -> Nhị phân: 01001001
  Ký tự 'N' -> Mã thập phân:  78 -> Nhị phân: 01001110
  Ký tự '1' -> Mã thập phân:  49 -> Nhị phân: 00110001
  Ký tự '0' -> Mã thập phân:  48 -> Nhị phân: 00110000`
  },
  {
    id: 'tin10-bai02',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 2,
    chapter: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài 2: Vai trò của thiết bị thông minh và tin học',
    topic: 'IoT & Tự động hóa trong thời đại 4.0',
    description: 'SGK Tin 10 KNTT - Thu thập và xử lý tín hiệu số từ cảm biến thông minh IoT (Nhiệt độ, độ ẩm).',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 2: THIẾT BỊ THÔNG MINH & TIN HỌC ===
# Mô phỏng dữ liệu cảm biến nông nghiệp công nghệ cao IoT
cam_bien_nhiet_do = [26.5, 27.0, 28.2, 29.5, 31.0, 28.4]
cam_bien_do_am = [75, 72, 68, 60, 55, 65]

print("HỆ THỐNG GIÁM SÁT THIẾT BỊ THÔNG MINH IOT:")
for i in range(len(cam_bien_nhiet_do)):
    t = cam_bien_nhiet_do[i]
    h = cam_bien_do_am[i]
    canh_bao = "BÌNH THƯỜNG"
    if t > 30.0:
        canh_bao = "BẬT HỆ THỐNG LÀM MÁT TỰ ĐỘNG!"
    print(f"  [Trạm {i+1}]: Nhiệt độ = {t}°C | Độ ẩm = {h}% => Trạng thái: {canh_bao}")
`,
    expectedOutput: `HỆ THỐNG GIÁM SÁT THIẾT BỊ THÔNG MINH IOT:
  [Trạm 1]: Nhiệt độ = 26.5°C | Độ ẩm = 75% => Trạng thái: BÌNH THƯỜNG
  [Trạm 2]: Nhiệt độ = 27.0°C | Độ ẩm = 72% => Trạng thái: BÌNH THƯỜNG
  [Trạm 3]: Nhiệt độ = 28.2°C | Độ ẩm = 68% => Trạng thái: BÌNH THƯỜNG
  [Trạm 4]: Nhiệt độ = 29.5°C | Độ ẩm = 60% => Trạng thái: BÌNH THƯỜNG
  [Trạm 5]: Nhiệt độ = 31.0°C | Độ ẩm = 55% => Trạng thái: BẬT HỆ THỐNG LÀM MÁT TỰ ĐỘNG!
  [Trạm 6]: Nhiệt độ = 28.4°C | Độ ẩm = 65% => Trạng thái: BÌNH THƯỜNG`
  },
  {
    id: 'tin10-bai03',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 3,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 3: Một số kiểu mạng máy tính thông dụng',
    topic: 'Mạng LAN, WAN, Có dây và Không dây',
    description: 'SGK Tin 10 KNTT - Khảo sát cấu trúc mạng cục bộ (LAN) và mạng diện rộng (WAN).',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 3: MẠNG MÁY TÍNH THÔNG DỤNG ===
cac_kieu_mang = {
    "LAN": "Local Area Network - Mạng cục bộ (Phòng máy, trường học, gia đình)",
    "WAN": "Wide Area Network - Mạng diện rộng (Kết nối giữa các tỉnh, quốc gia)",
    "WLAN": "Wireless LAN - Mạng cục bộ không dây (Wi-Fi 2.4GHz / 5GHz)",
    "PAN": "Personal Area Network - Mạng cá nhân (Bluetooth, tai nghe, đồng hồ thông minh)"
}

print("DANH MỤC CÁC LOẠI MẠNG MÁY TÍNH PHỔ BIẾN:")
for loai, mo_ta in cac_kieu_mang.items():
    print(f"- {loai:5s}: {mo_ta}")
`,
    expectedOutput: `DANH MỤC CÁC LOẠI MẠNG MÁY TÍNH PHỔ BIẾN:
- LAN  : Local Area Network - Mạng cục bộ (Phòng máy, trường học, gia đình)
- WAN  : Wide Area Network - Mạng diện rộng (Kết nối giữa các tỉnh, quốc gia)
- WLAN : Wireless LAN - Mạng cục bộ không dây (Wi-Fi 2.4GHz / 5GHz)
- PAN  : Personal Area Network - Mạng cá nhân (Bluetooth, tai nghe, đồng hồ thông minh)`
  },
  {
    id: 'tin10-bai04',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 4,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 4: Mạng máy tính và Internet',
    topic: 'Giao thức TCP/IP, Địa chỉ IPv4 & Tên miền DNS',
    description: 'SGK Tin 10 KNTT - Kiểm tra tính hợp lệ của địa chỉ IPv4 và phân tích tên miền.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 4: MẠNG MÁY TÍNH VÀ INTERNET ===
def kiem_tra_ipv4(ip):
    octets = ip.split('.')
    if len(octets) != 4:
        return False
    for num in octets:
        if not num.isdigit() or not (0 <= int(num) <= 255):
            return False
    return True

danh_sach_ip = ["192.168.1.1", "10.0.0.254", "172.16.256.1", "8.8.8.8"]
for ip in danh_sach_ip:
    hop_le = "HỢP LỆ" if kiem_tra_ipv4(ip) else "KHÔNG HỢP LỆ"
    print(f"Địa chỉ IP: {ip:15s} -> {hop_le}")
`,
    expectedOutput: `Địa chỉ IP: 192.168.1.1     -> HỢP LỆ
Địa chỉ IP: 10.0.0.254      -> HỢP LỆ
Địa chỉ IP: 172.16.256.1    -> KHÔNG HỢP LỆ
Địa chỉ IP: 8.8.8.8         -> HỢP LỆ`
  },
  {
    id: 'tin10-bai05',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 5,
    chapter: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài 5: Dữ liệu lôgic',
    topic: 'Phép toán AND, OR, NOT & Bảng chân trị',
    description: 'SGK Tin 10 KNTT - Tạo bảng chân lý (Truth Table) cho các phép toán logic cơ bản.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 5: DỮ LIỆU LÔGIC ===
# Bảng chân lý cho hai mệnh đề logic P và Q
print(" P     | Q     | NOT P | P AND Q | P OR Q")
print("------------------------------------------")

for p in [True, False]:
    for q in [True, False]:
        not_p = not p
        p_and_q = p and q
        p_or_q = p or q
        print(f"{str(p):5s} | {str(q):5s} | {str(not_p):5s} | {str(p_and_q):7s} | {str(p_or_q):5s}")
`,
    expectedOutput: ` P     | Q     | NOT P | P AND Q | P OR Q
------------------------------------------
True  | True  | False | True    | True 
True  | False | False | False   | True 
False | True  | True  | False   | True 
False | False | True  | False   | False`
  },
  {
    id: 'tin10-bai06',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 6,
    chapter: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài 6: Dữ liệu âm thanh và hình ảnh',
    topic: 'Rời rạc hóa tín hiệu, Pixel & Hệ màu RGB',
    description: 'SGK Tin 10 KNTT - Tính dung lượng ảnh số chưa nén theo công thức Pixel x Độ sâu màu.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 6: DỮ LIỆU ÂM THANH & HÌNH ẢNH ===
# Tính dung lượng tệp ảnh số chuẩn RGB (24-bit màu = 3 Bytes/pixel)
chieu_rong = 1920
chieu_cao = 1080
do_sau_mau_byte = 3  # RGB: mỗi kênh 8 bit = 24 bit = 3 byte

tong_pixel = chieu_rong * chieu_cao
dung_luong_bytes = tong_pixel * do_sau_mau_byte
dung_luong_mb = dung_luong_bytes / (1024 * 1024)

print(f"Độ phân giải hình ảnh: {chieu_rong} x {chieu_cao} (Full HD)")
print(f"Tổng số điểm ảnh (pixels): {tong_pixel:,} pixels")
print(f"Dung lượng ảnh gốc không nén: {dung_luong_bytes:,} Bytes (~{dung_luong_mb:.2f} MB)")
`,
    expectedOutput: `Độ phân giải hình ảnh: 1920 x 1080 (Full HD)
Tổng số điểm ảnh (pixels): 2,073,600 pixels
Dung lượng ảnh gốc không nén: 6,220,800 Bytes (~5.93 MB)`
  },
  {
    id: 'tin10-bai07',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 7,
    chapter: 'Chủ đề 1: Máy tính và xã hội tri thức',
    title: 'Bài 7: Thực hành sử dụng thiết bị số thông dụng',
    topic: 'Quản lý tệp & Thiết bị lưu trữ ngoại vi',
    description: 'SGK Tin 10 KNTT - Tính toán thời gian sao chép dữ liệu qua các chuẩn cổng USB 2.0 / 3.0.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 7: THỰC HÀNH THIẾT BỊ SỐ ===
dung_luong_file_gb = 4.7  # Dung lượng đĩa DVD ISO
toc_do_usb2_mbs = 30     # USB 2.0: ~30 MB/s
toc_do_usb3_mbs = 150    # USB 3.0: ~150 MB/s

dung_luong_mb = dung_luong_file_gb * 1024
thoi_gian_usb2 = dung_luong_mb / toc_do_usb2_mbs
thoi_gian_usb3 = dung_luong_mb / toc_do_usb3_mbs

print(f"Sao chép tệp {dung_luong_file_gb} GB ({dung_luong_mb:.0f} MB):")
print(f"- Qua cổng USB 2.0: mất khoảng {thoi_gian_usb2:.1f} giây ({thoi_gian_usb2/60:.1f} phút)")
print(f"- Qua cổng USB 3.0: mất khoảng {thoi_gian_usb3:.1f} giây ({thoi_gian_usb3/60:.1f} phút)")
`,
    expectedOutput: `Sao chép tệp 4.7 GB (4813 MB):
- Qua cổng USB 2.0: mất khoảng 160.4 giây (2.7 phút)
- Qua cổng USB 3.0: mất khoảng 32.1 giây (0.5 phút)`
  },
  {
    id: 'tin10-bai08',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 8,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 8: Mạng máy tính trong cuộc sống hiện đại',
    topic: 'Điện toán đám mây & Dịch vụ số SaaS, PaaS, IaaS',
    description: 'SGK Tin 10 KNTT - Phân biệt các mô hình dịch vụ đám mây trong giáo dục và đời sống.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 8: MẠNG TRONG CUỘC SỐNG HIỆN ĐẠI ===
dich_vu_cloud = [
    {"loai": "SaaS (Software as a Service)", "vi_du": "Google Classroom, Canva, Office 365"},
    {"loai": "PaaS (Platform as a Service)", "vi_du": "Google App Engine, Firebase, Vercel"},
    {"loai": "IaaS (Infrastructure as a Service)", "vi_du": "Google Cloud Compute Engine, AWS EC2"}
]

print("CÁC MÔ HÌNH DỊCH VỤ ĐIỆN TOÁN ĐÁM MÂY (CLOUD COMPUTING):")
for item in dich_vu_cloud:
    print(f"• {item['loai']}")
    print(f"  Ứng dụng thực tế: {item['vi_du']}")
`,
    expectedOutput: `CÁC MÔ HÌNH DỊCH VỤ ĐIỆN TOÁN ĐÁM MÂY (CLOUD COMPUTING):
• SaaS (Software as a Service)
  Ứng dụng thực tế: Google Classroom, Canva, Office 365
• PaaS (Platform as a Service)
  Ứng dụng thực tế: Google App Engine, Firebase, Vercel
• IaaS (Infrastructure as a Service)
  Ứng dụng thực tế: Google Cloud Compute Engine, AWS EC2`
  },
  {
    id: 'tin10-bai09',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 9,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 9: An toàn trên không gian mạng',
    topic: 'Độ mạnh mật khẩu & Bảo mật 2 lớp 2FA',
    description: 'SGK Tin 10 KNTT - Xây dựng thuật toán kiểm tra độ mạnh mật khẩu bảo vệ tài khoản học sinh.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 9: AN TOÀN TRÊN KHÔNG GIAN MẠNG ===
def danh_gia_mat_khau(mk):
    if len(mk) < 8:
        return "YẾU: Độ dài phải từ 8 ký tự trở lên!"
    co_hoa = any(c.isupper() for c in mk)
    co_thuong = any(c.islower() for c in mk)
    co_so = any(c.isdigit() for c in mk)
    co_ky_tu_db = any(c in "!@#$%^&*()_+-=" for c in mk)

    diem = sum([co_hoa, co_thuong, co_so, co_ky_tu_db])
    if diem == 4:
        return "RẤT MẠNH: Đạt chuẩn an toàn không gian mạng!"
    elif diem >= 3:
        return "TRUNG BÌNH: Nên bổ sung ký tự đặc biệt hoặc số."
    else:
        return "YẾU: Dễ bị bẻ khóa từ điển."

cac_mk = ["123456", "hocsinh10", "TinHoc@2024"]
for p in cac_mk:
    print(f"Mật khẩu: {p:15s} => Đánh giá: {danh_gia_mat_khau(p)}")
`,
    expectedOutput: `Mật khẩu: 123456          => Đánh giá: YẾU: Độ dài phải từ 8 ký tự trở lên!
Mật khẩu: hocsinh10       => Đánh giá: TRUNG BÌNH: Nên bổ sung ký tự đặc biệt hoặc số.
Mật khẩu: TinHoc@2024     => Đánh giá: RẤT MẠNH: Đạt chuẩn an toàn không gian mạng!`
  },
  {
    id: 'tin10-bai10',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 10,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 10: Thực hành khai thác tài nguyên Internet',
    topic: 'Tìm kiếm nâng cao & Bản quyền kỹ thuật số',
    description: 'SGK Tin 10 KNTT - Cú pháp toán tử tìm kiếm chuyên nghiệp (site:, filetype:, dấu ngoặc kép).',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 10: TÀI NGUYÊN TRÊN INTERNET ===
toan_tu_tim_kiem = {
    '"Tin hoc 10"': 'Tìm kiếm chính xác nguyên cụm từ',
    'filetype:pdf': 'Giới hạn định dạng tệp tải về là PDF',
    'site:edu.vn': 'Chỉ tìm kiếm trong các trang web giáo dục Việt Nam',
    '-quangcao': 'Loại bỏ các kết quả chứa từ không mong muốn'
}

print("CÚ PHÁP TÌM KIẾM TÀI LIỆU TIN HỌC CHUẨN XÁC:")
truy_van = '"Tin hoc 10 Ket noi tri thuc" site:edu.vn filetype:pdf'
print(f"Cụm tìm kiếm mẫu:\\n-> {truy_van}")
print("\\nÝ nghĩa từng thành phần:")
for k, v in toan_tu_tim_kiem.items():
    print(f"  + {k:15s}: {v}")
`,
    expectedOutput: `CÚ PHÁP TÌM KIẾM TÀI LIỆU TIN HỌC CHUẨN XÁC:
Cụm tìm kiếm mẫu:
-> "Tin hoc 10 Ket noi tri thuc" site:edu.vn filetype:pdf

Ý nghĩa từng thành phần:
  + "Tin hoc 10"   : Tìm kiếm chính xác nguyên cụm từ
  + filetype:pdf   : Giới hạn định dạng tệp tải về là PDF
  + site:edu.vn    : Chỉ tìm kiếm trong các trang web giáo dục Việt Nam
  + -quangcao      : Loại bỏ các kết quả chứa từ không mong muốn`
  },
  {
    id: 'tin10-bai11',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 11,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 11: Ứng dụng trên môi trường số',
    topic: 'Cộng tác trực tuyến & Văn hóa ứng xử số',
    description: 'SGK Tin 10 KNTT - Các quy tắc bảo vệ danh tính số và làm việc nhóm trực tuyến hiệu quả.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 11: ỨNG DỤNG MÔI TRƯỜNG SỐ ===
quy_tac_so = [
    "Tôn trọng bản quyền tác giả và dẫn nguồn tài liệu đầy đủ",
    "Không chia sẻ thông tin cá nhân (CCCD, địa chỉ nhà) lên mạng xã hội",
    "Sử dụng ngôn từ lịch sự, văn minh khi thảo luận nhóm trực tuyến",
    "Thường xuyên sao lưu dữ liệu bài tập lên đám mây (Cloud Backup)"
]

print("4 QUY TẮC VĂN HÓA SỐ DÀNH CHO HỌC SINH THPT:")
for i, rule in enumerate(quy_tac_so, 1):
    print(f"  {i}. {rule}")
`,
    expectedOutput: `4 QUY TẮC VĂN HÓA SỐ DÀNH CHO HỌC SINH THPT:
  1. Tôn trọng bản quyền tác giả và dẫn nguồn tài liệu đầy đủ
  2. Không chia sẻ thông tin cá nhân (CCCD, địa chỉ nhà) lên mạng xã hội
  3. Sử dụng ngôn từ lịch sự, văn minh khi thảo luận nhóm trực tuyến
  4. Thường xuyên sao lưu dữ liệu bài tập lên đám mây (Cloud Backup)`
  },
  {
    id: 'tin10-bai12',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 12,
    chapter: 'Chủ đề 3: Đạo đức, pháp luật và văn hóa số / Đồ họa',
    title: 'Bài 12: Phần mềm thiết kế đồ hoạ',
    topic: 'Đồ họa Vector vs Đồ họa Raster Bitmap',
    description: 'SGK Tin 10 KNTT - So sánh đặc điểm hình ảnh Vector (SVG) và hình ảnh Raster (JPG, PNG).',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 12: THIẾT KẾ ĐỒ HỌA ===
so_sanh = {
    "Đặc điểm": ["Bản chất", "Phóng to / Thu nhỏ", "Phần mềm", "Định dạng"],
    "Vector": ["Tập hợp phương trình toán học", "Không vỡ hạt, sắc nét", "Inkscape, Illustrator", ".svg, .ai"],
    "Raster": ["Lưới các điểm ảnh (Pixels)", "Bị vỡ hạt (Pixelated)", "GIMP, Photoshop", ".png, .jpg, .bmp"]
}

print(f"{'Đặc điểm':<22} | {'Đồ họa Vector':<25} | {'Đồ họa Raster':<25}")
print("-" * 75)
for i in range(len(so_sanh["Đặc điểm"])):
    print(f"{so_sanh['Đặc điểm'][i]:<22} | {so_sanh['Vector'][i]:<25} | {so_sanh['Raster'][i]:<25}")
`,
    expectedOutput: `Đặc điểm               | Đồ họa Vector             | Đồ họa Raster            
---------------------------------------------------------------------------
Bản chất               | Tập hợp phương trình toán | Lưới các điểm ảnh (Pixel
Phóng to / Thu nhỏ     | Không vỡ hạt, sắc nét     | Bị vỡ hạt (Pixelated)   
Phần mềm               | Inkscape, Illustrator     | GIMP, Photoshop         
Định dạng              | .svg, .ai                 | .png, .jpg, .bmp`
  },
  {
    id: 'tin10-bai13',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 13,
    chapter: 'Chủ đề 3: Đồ họa máy tính',
    title: 'Bài 13: Bổ sung các đối tượng đồ hoạ',
    topic: 'Tọa độ hình học & Thuộc tính đối tượng SVG',
    description: 'SGK Tin 10 KNTT - Mô phỏng cấu trúc mã nguồn đồ họa Vector SVG đối tượng cơ bản.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 13: ĐỐI TƯỢNG ĐỒ HỌA SVG ===
# Tạo đối tượng hình học vector hình chữ nhật và hình tròn
rect_svg = '<rect x="10" y="10" width="100" height="50" fill="#38bdf8" stroke="#0284c7" />'
circle_svg = '<circle cx="150" cy="150" r="40" fill="#34d399" />'

print("MÃ NGUỒN ĐỒ HỌA VECTOR SVG (BÀI 13 SGK KNTT):")
print("1. Hình chữ nhật màu xanh dương:")
print("  ", rect_svg)
print("2. Hình tròn màu xanh lá:")
print("  ", circle_svg)
`,
    expectedOutput: `MÃ NGUỒN ĐỒ HỌA VECTOR SVG (BÀI 13 SGK KNTT):
1. Hình chữ nhật màu xanh dương:
   <rect x="10" y="10" width="100" height="50" fill="#38bdf8" stroke="#0284c7" />
2. Hình tròn màu xanh lá:
   <circle cx="150" cy="150" r="40" fill="#34d399" />`
  },
  {
    id: 'tin10-bai14',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 14,
    chapter: 'Chủ đề 3: Đồ họa máy tính',
    title: 'Bài 14: Làm việc với đối tượng đường và văn bản',
    topic: 'Đường cong Bezier & Hiệu ứng chữ nghệ thuật',
    description: 'SGK Tin 10 KNTT - Cấu trúc thẻ path đường cong và thẻ text trong thiết kế đồ họa.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 14: ĐỐI TƯỢNG ĐƯỜNG VÀ VĂN BẢN ===
path_code = '<path d="M 10 80 Q 95 10 180 80" stroke="#f59e0b" fill="transparent"/>'
text_code = '<text x="20" y="40" font-family="JetBrains Mono" font-size="16">Tin Hoc 10</text>'

print("ĐƯỜNG CONG VÀ VĂN BẢN NGHỆ THUẬT:")
print(f"Đường cong Bezier bậc 2: {path_code}")
print(f"Văn bản đồ họa định dạng: {text_code}")
`,
    expectedOutput: `ĐƯỜNG CONG VÀ VĂN BẢN NGHỆ THUẬT:
Đường cong Bezier bậc 2: <path d="M 10 80 Q 95 10 180 80" stroke="#f59e0b" fill="transparent"/>
Văn bản đồ họa định dạng: <text x="20" y="40" font-family="JetBrains Mono" font-size="16">Tin Hoc 10</text>`
  },
  {
    id: 'tin10-bai15',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 15,
    chapter: 'Chủ đề 3: Đồ họa máy tính',
    title: 'Bài 15: Hoàn thiện hình ảnh đồ hoạ',
    topic: 'Quản lý Layer & Xuất tệp sản phẩm',
    description: 'SGK Tin 10 KNTT - Quản lý thứ tự hiển thị các lớp layer và xuất tệp đồ họa chuẩn.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 15: HOÀN THIỆN ĐỒ HỌA ===
layers = ["Layer 1: Nền phong cảnh", "Layer 2: Nhân vật hoạt hình", "Layer 3: Tiêu đề poster"]

print("THỨ TỰ XẾP LỚP ĐỒ HỌA (TỪ DƯỚI LÊN TRÊN):")
for i, layer in enumerate(layers, 1):
    print(f"  [Lớp {i}]: {layer}")
print("-> Xuất bản phẩm đồ họa: poster_tin10.png (Độ phân giải 300 DPI)")
`,
    expectedOutput: `THỨ TỰ XẾP LỚP ĐỒ HỌA (TỪ DƯỚI LÊN TRÊN):
  [Lớp 1]: Layer 1: Nền phong cảnh
  [Lớp 2]: Layer 2: Nhân vật hoạt hình
  [Lớp 3]: Layer 3: Tiêu đề poster
-> Xuất bản phẩm đồ họa: poster_tin10.png (Độ phân giải 300 DPI)`
  },
  {
    id: 'tin10-bai16',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 16,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 16: Ngôn ngữ lập trình bậc cao và Python',
    topic: 'Môi trường tương tác IDLE & Lệnh print()',
    description: 'SGK Tin 10 KNTT - Khởi động Python, thực hiện các phép tính số học và xuất kết quả.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 16: NGÔN NGỮ BẬC CAO VÀ PYTHON ===
print("=========================================")
print("  CHÀO MỪNG ĐẾN VỚI MÔN TIN HỌC LỚP 10  ")
print("  Bộ sách: Kết nối tri thức với cuộc sống ")
print("=========================================")

print("Tổng 2024 + 2025 =", 2024 + 2025)
print("Phép nhân 125 * 8 =", 125 * 8)
print("Lũy thừa 2 ** 10 =", 2 ** 10)
print("Phép chia lấy nguyên 17 // 5 =", 17 // 5)
print("Phép chia lấy dư 17 % 5 =", 17 % 5)
`,
    expectedOutput: `=========================================
  CHÀO MỪNG ĐẾN VỚI MÔN TIN HỌC LỚP 10  
  Bộ sách: Kết nối tri thức với cuộc sống 
=========================================
Tổng 2024 + 2025 = 4049
Phép nhân 125 * 8 = 1000
Lũy thừa 2 ** 10 = 1024
Phép chia lấy nguyên 17 // 5 = 3
Phép chia lấy dư 17 % 5 = 2`
  },
  {
    id: 'tin10-bai17',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 17,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 17: Biến và lệnh gán',
    topic: 'Quy tắc đặt tên biến & Kiểu dữ liệu cơ sở',
    description: 'SGK Tin 10 KNTT - Khai báo biến, lệnh gán = và 4 kiểu dữ liệu: int, float, str, bool.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 17: BIẾN VÀ LỆNH GÁN ===
ten_hoc_sinh = "Trần Minh Quân"     # Kiểu chuỗi str
tuoi = 16                           # Kiểu số nguyên int
diem_tin = 9.75                     # Kiểu số thực float
da_hoan_thanh = True                # Kiểu logic bool

print("Họ và tên:", ten_hoc_sinh, "- Kiểu:", type(ten_hoc_sinh).__name__)
print("Tuổi:", tuoi, "- Kiểu:", type(tuoi).__name__)
print("Điểm Tin Học:", diem_tin, "- Kiểu:", type(diem_tin).__name__)
print("Trạng thái nộp bài:", da_hoan_thanh, "- Kiểu:", type(da_hoan_thanh).__name__)
`,
    expectedOutput: `Họ và tên: Trần Minh Quân - Kiểu: str
Tuổi: 16 - Kiểu: int
Điểm Tin Học: 9.75 - Kiểu: float
Trạng thái nộp bài: True - Kiểu: bool`
  },
  {
    id: 'tin10-bai18',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 18,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 18: Các lệnh vào ra đơn giản',
    topic: 'Hàm input(), ép kiểu int() & float()',
    description: 'SGK Tin 10 KNTT - Nhập số từ bàn phím và tính diện tích hình chữ nhật.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 18: CÁC LỆNH VÀO RA ĐƠN GIẢN ===
# Mô phỏng nhập liệu: a = float(input("Nhập chiều dài: "))
chieu_dai = 12.5
chieu_rong = 6.0

chu_vi = (chieu_dai + chieu_rong) * 2
dien_tich = chieu_dai * chieu_rong

print(f"Chiều dài a = {chieu_dai} m, Chiều rộng b = {chieu_rong} m")
print(f"==> Chu vi hình chữ nhật P = {chu_vi:.2f} m")
print(f"==> Diện tích hình chữ nhật S = {dien_tich:.2f} m²")
`,
    expectedOutput: `Chiều dài a = 12.5 m, Chiều rộng b = 6.0 m
==> Chu vi hình chữ nhật P = 37.00 m
==> Diện tích hình chữ nhật S = 75.00 m²`
  },
  {
    id: 'tin10-bai19',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 19,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 19: Câu lệnh rẽ nhánh if',
    topic: 'Cấu trúc if - elif - else & Biểu thức điều kiện',
    description: 'SGK Tin 10 KNTT - Xếp loại học tập học sinh theo điểm trung bình môn.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 19: CÂU LỆNH RẼ NHÁNH IF ===
diem_tb = 8.6

if diem_tb >= 8.0:
    xep_loai = "Giỏi (Hoàn thành xuất sắc)"
elif diem_tb >= 6.5:
    xep_loai = "Khá"
elif diem_tb >= 5.0:
    xep_loai = "Đạt"
else:
    xep_loai = "Chưa đạt"

print(f"Điểm trung bình Tin học: {diem_tb}")
print(f"Xếp loại kết quả học tập: {xep_loai}")
`,
    expectedOutput: `Điểm trung bình Tin học: 8.6
Xếp loại kết quả học tập: Giỏi (Hoàn thành xuất sắc)`
  },
  {
    id: 'tin10-bai20',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 20,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 20: Câu lệnh lặp for',
    topic: 'Vòng lặp for & hàm range(start, stop, step)',
    description: 'SGK Tin 10 KNTT - Tính tổng các số lẻ từ 1 đến N bằng vòng lặp for.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 20: CÂU LỆNH LẶP FOR ===
n = 15
tong = 0

print(f"Duyệt các số lẻ từ 1 đến {n}:")
for i in range(1, n + 1, 2):
    print(f"  + Giá trị i = {i}")
    tong += i

print(f"==> Tổng các số lẻ từ 1 đến {n} là: {tong}")
`,
    expectedOutput: `Duyệt các số lẻ từ 1 đến 15:
  + Giá trị i = 1
  + Giá trị i = 3
  + Giá trị i = 5
  + Giá trị i = 7
  + Giá trị i = 9
  + Giá trị i = 11
  + Giá trị i = 13
  + Giá trị i = 15
==> Tổng các số lẻ từ 1 đến 15 là: 64`
  },
  {
    id: 'tin10-bai21',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 21,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 21: Câu lệnh lặp while',
    topic: 'Vòng lặp while & Thuật toán Euclid tìm UCLN',
    description: 'SGK Tin 10 KNTT - Thuật toán Ơ-clit tìm ước chung lớn nhất của hai số nguyên dương.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 21: CÂU LỆNH LẶP WHILE ===
a, b = 48, 18
goc_a, goc_b = a, b

while b != 0:
    du = a % b
    a = b
    b = du

print(f"Ước chung lớn nhất UCLN({goc_a}, {goc_b}) = {a}")
`,
    expectedOutput: `Ước chung lớn nhất UCLN(48, 18) = 6`
  },
  {
    id: 'tin10-bai22',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 22,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 22: Kiểu dữ liệu danh sách (List)',
    topic: 'Khởi tạo List, chỉ số index & hàm len()',
    description: 'SGK Tin 10 KNTT - Truy cập phần tử bằng chỉ số và duyệt danh sách tính trung bình.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 22: KIỂU DỮ LIỆU DANH SÁCH ===
diem_so = [8.5, 9.0, 7.5, 10.0, 9.5]

print("Số lượng đầu điểm:", len(diem_so))
print("Phần tử đầu tiên (index 0):", diem_so[0])
print("Phần tử cuối cùng (index -1):", diem_so[-1])

diem_tb = sum(diem_so) / len(diem_so)
print(f"==> Điểm trung bình cả kỳ: {diem_tb:.2f}")
`,
    expectedOutput: `Số lượng đầu điểm: 5
Phần tử đầu tiên (index 0): 8.5
Phần tử cuối cùng (index -1): 10.0
==> Điểm trung bình cả kỳ: 8.90`
  },
  {
    id: 'tin10-bai23',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 23,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 23: Một số lệnh làm việc với danh sách',
    topic: 'Phương thức append(), insert(), remove(), sort()',
    description: 'SGK Tin 10 KNTT - Thao tác thêm, chèn, xóa và sắp xếp các phần tử trong List.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 23: CÁC LỆNH LÀM VIỆC VỚI LIST ===
danh_sach = ["Python", "Biến", "Điều kiện", "Vòng lặp"]

danh_sach.append("Danh sách List")      # Thêm đuôi
danh_sach.insert(1, "Lệnh print")       # Chèn vị trí 1
danh_sach.sort()                        # Sắp xếp theo A-Z

print("Danh sách sau các thao tác:", danh_sach)
print("Có học 'Python' không?", "Python" in danh_sach)
`,
    expectedOutput: `Danh sách sau các thao tác: ['Biến', 'Danh sách List', 'Điều kiện', 'Lệnh print', 'Python', 'Vòng lặp']
Có học 'Python' không? True`
  },
  {
    id: 'tin10-bai24',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 24,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 24: Xâu ký tự (String)',
    topic: 'Cắt lát xâu [start:stop:step] & Hàm len()',
    description: 'SGK Tin 10 KNTT - Truy cập từng ký tự, ghép xâu và đảo ngược chuỗi.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 24: XÂU KÝ TỰ ===
s = "Ket noi tri thuc"

print("Độ dài xâu ký tự:", len(s))
print("3 ký tự đầu tiên:", s[:3])
print("4 ký tự cuối cùng:", s[-4:])
print("Đảo ngược xâu ký tự:", s[::-1])
`,
    expectedOutput: `Độ dài xâu ký tự: 16
3 ký tự đầu tiên: Ket
4 ký tự cuối cùng: thuc
Đảo ngược xâu ký tự: cuht irt ion teK`
  },
  {
    id: 'tin10-bai25',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 25,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 25: Một số lệnh làm việc với xâu ký tự',
    topic: 'Phương thức split(), join(), find() & replace()',
    description: 'SGK Tin 10 KNTT - Tách câu thành danh sách từ, nối xâu và tìm kiếm từ khóa.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 25: MỘT SỐ LỆNH VỚI XÂU KÝ TỰ ===
cau = "Ket noi tri thuc voi cuoc song"

# 1. Tách chuỗi thành danh sách các từ
tu = cau.split()
print("Danh sách từ:", tu)
print("Số lượng từ trong câu:", len(tu))

# 2. Nối lại với dấu gạch ngang
cau_noi = "-".join(tu)
print("Xâu sau khi nối:", cau_noi)

# 3. Thay thế từ trong chuỗi
cau_moi = cau.replace("cuoc song", "tuong lai")
print("Sau khi thay thế:", cau_moi)
`,
    expectedOutput: `Danh sách từ: ['Ket', 'noi', 'tri', 'thuc', 'voi', 'cuoc', 'song']
Số lượng từ trong câu: 7
Xâu sau khi nối: Ket-noi-tri-thuc-voi-cuoc-song
Sau khi thay thế: Ket noi tri thuc voi tuong lai`
  },
  {
    id: 'tin10-bai26',
    grade: 'tin10',
    language: 'python',
    lessonNumber: 26,
    chapter: 'Chủ đề 4: Lập trình với Python',
    title: 'Bài 26: Hàm trong Python (def & return)',
    topic: 'Khai báo hàm, tham số và giá trị trả về',
    description: 'SGK Tin 10 KNTT - Xây dựng hàm kiểm tra số nguyên tố và áp dụng trong chương trình.',
    code: `# === TIN HỌC 10 (KNTT) - BÀI 26: HÀM TRONG PYTHON ===
def la_so_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

day_so = [2, 7, 9, 13, 21, 29]
for x in day_so:
    ket_qua = "LÀ số nguyên tố" if la_so_nguyen_to(x) else "KHÔNG phải số nguyên tố"
    print(f"Số {x:2d} : {ket_qua}")
`,
    expectedOutput: `Số  2 : LÀ số nguyên tố
Số  7 : LÀ số nguyên tố
Số  9 : KHÔNG phải số nguyên tố
Số 13 : LÀ số nguyên tố
Số 21 : KHÔNG phải số nguyên tố
Số 29 : LÀ số nguyên tố`
  },

  // =========================================================================
  // TIN HỌC 11 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (CHUYÊN ĐỀ CS & NÂNG CAO)
  // =========================================================================
  {
    id: 'tin11-bai01',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 1,
    chapter: 'Chuyên đề 1: Cấu trúc dữ liệu & Thuật toán',
    title: 'Bài 1 (Tin 11): Danh sách 2 chiều (Ma trận số)',
    topic: 'Bảng số 2 chiều & Duyệt ma trận hàng cột',
    description: 'SGK Tin 11 KNTT - Danh sách trong danh sách, tính tổng từng hàng và đường chéo.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 1: DANH SÁCH 2 CHIỀU ===
ma_tran = [
    [10, 20, 30],
    [15, 25, 35],
    [50, 60, 70]
]

print("Ma trận 3x3:")
for r in range(len(ma_tran)):
    print(f"  Hàng {r+1}: {ma_tran[r]} -> Tổng = {sum(ma_tran[r])}")

tong_duong_cheo = sum(ma_tran[i][i] for i in range(3))
print(f"==> Tổng đường chéo chính: {tong_duong_cheo}")
`,
    expectedOutput: `Ma trận 3x3:
  Hàng 1: [10, 20, 30] -> Tổng = 60
  Hàng 2: [15, 25, 35] -> Tổng = 75
  Hàng 3: [50, 60, 70] -> Tổng = 180
==> Tổng đường chéo chính: 105`
  },
  {
    id: 'tin11-bai02',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 2,
    chapter: 'Chuyên đề 1: Cấu trúc dữ liệu & Thuật toán',
    title: 'Bài 2 (Tin 11): Thuật toán tìm kiếm nhị phân',
    topic: 'Binary Search O(log n) trên mảng đã sắp xếp',
    description: 'SGK Tin 11 KNTT - Cài đặt thuật toán chia để trị tìm kiếm nhị phân trong mảng.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 2: TÌM KIẾM NHỊ PHÂN ===
def tim_kiem_nhi_phan(arr, x):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            left = mid + 1
        else:
            right = mid - 1
    return -1

day_so = [12, 24, 35, 47, 59, 68, 80, 95]
can_tim = 59
vi_tri = tim_kiem_nhi_phan(day_so, can_tim)

print(f"Mảng đã sắp xếp: {day_so}")
print(f"Giá trị {can_tim} nằm ở vị trí index = {vi_tri}")
`,
    expectedOutput: `Mảng đã sắp xếp: [12, 24, 35, 47, 59, 68, 80, 95]
Giá trị 59 nằm ở vị trí index = 4`
  },
  {
    id: 'tin11-bai03',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 3,
    chapter: 'Chuyên đề 1: Cấu trúc dữ liệu & Thuật toán',
    title: 'Bài 3 (Tin 11): Thuật toán sắp xếp nổi bọt (Bubble Sort)',
    topic: 'Sắp xếp danh sách điểm theo thứ tự tăng dần',
    description: 'SGK Tin 11 KNTT - Thuật toán Bubble Sort hoán đổi các cặp phần tử liền kề.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 3: THUẬT TOÁN SẮP XẾP BUBBLE SORT ===
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

diem = [8.0, 6.5, 9.5, 7.0, 5.5, 10.0]
print("Mảng ban đầu:", diem)
ket_qua = bubble_sort(diem)
print("Sau khi sắp xếp tăng dần:", ket_qua)
`,
    expectedOutput: `Mảng ban đầu: [8.0, 6.5, 9.5, 7.0, 5.5, 10.0]
Sau khi sắp xếp tăng dần: [5.5, 6.5, 7.0, 8.0, 9.5, 10.0]`
  },
  {
    id: 'tin11-bai04',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 4,
    chapter: 'Chuyên đề 2: Xử lý tệp & Dữ liệu',
    title: 'Bài 4 (Tin 11): Thao tác với tệp văn bản (File I/O)',
    topic: 'Đọc & Ghi tệp an toàn với with open()',
    description: 'SGK Tin 11 KNTT - Mở, ghi dòng dữ liệu và đọc nội dung tệp văn bản.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 4: THAO TÁC VỚI TỆP VĂN BẢN ===
ten_tep = "diem_hoc_sinh.txt"
du_lieu = ["Nguyen Van A: 9.5", "Tran Thi B: 8.8", "Le Van C: 10.0"]

print(f"1. Ghi {len(du_lieu)} bản ghi vào tệp '{ten_tep}'...")
# with open(ten_tep, 'w', encoding='utf-8') as f:
#     for dong in du_lieu:
#         f.write(dong + "\\n")

print(f"2. Đọc nội dung tệp '{ten_tep}':")
for i, line in enumerate(du_lieu, 1):
    print(f"  [Dòng {i}]: {line}")
print("-> Tệp đã được đóng tự động an toàn.")
`,
    expectedOutput: `1. Ghi 3 bản ghi vào tệp 'diem_hoc_sinh.txt'...
2. Đọc nội dung tệp 'diem_hoc_sinh.txt':
  [Dòng 1]: Nguyen Van A: 9.5
  [Dòng 2]: Tran Thi B: 8.8
  [Dòng 3]: Le Van C: 10.0
-> Tệp đã được đóng tự động an toàn.`
  },
  {
    id: 'tin11-bai05',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 5,
    chapter: 'Chuyên đề 1: Cấu trúc dữ liệu & Thuật toán',
    title: 'Bài 5 (Tin 11): Thuật toán đệ quy (Recursion)',
    topic: 'Hàm tính giai thừa và dãy số Fibonacci đệ quy',
    description: 'SGK Tin 11 KNTT - Điểm dừng đệ quy (Base case) và bước đệ quy (Recursive step).',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 5: THUẬT TOÁN ĐỆ QUY ===
def giai_thua(n):
    if n <= 1:
        return 1
    return n * giai_thua(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Giai thừa 5! =", giai_thua(5))
print("Giai thừa 7! =", giai_thua(7))
print("Dãy 8 số Fibonacci đầu tiên:")
print([fibonacci(i) for i in range(8)])
`,
    expectedOutput: `Giai thừa 5! = 120
Giai thừa 7! = 5040
Dãy 8 số Fibonacci đầu tiên:
[0, 1, 1, 2, 3, 5, 8, 13]`
  },
  {
    id: 'tin11-bai06',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 6,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 6 (Tin 11): Lưu trữ và chia sẻ tệp trên Internet',
    topic: 'Điện toán đám mây & Quản lý phân quyền tệp số',
    description: 'SGK Tin 11 KNTT - Mô phỏng cấu trúc siêu dữ liệu (metadata) lưu trữ đám mây và phân quyền truy cập (Read/Write).',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 6: LƯU TRỮ TRÊN INTERNET ===
tep_tin_cloud = [
    {"ten": "De_cuong_Tin11.pdf", "size_kb": 1024, "quyen": "Xem"},
    {"ten": "SourceCode_Bai25.py", "size_kb": 256, "quyen": "Chỉnh sửa"},
    {"ten": "BangDiem_HocKy1.xlsx", "size_kb": 512, "quyen": "Riêng tư"}
]

print("DANH SÁCH TỆP TRÊN CLOUD DRIVE:")
tong_dung_luong = sum(f["size_kb"] for f in tep_tin_cloud)
for f in tep_tin_cloud:
    print(f"- {f['ten']:25s} | {f['size_kb']:4d} KB | Quyền: {f['quyen']}")
print(f"Tổng dung lượng đã dùng: {tong_dung_luong / 1024:.2f} MB")
`,
    expectedOutput: `DANH SÁCH TỆP TRÊN CLOUD DRIVE:
- De_cuong_Tin11.pdf        | 1024 KB | Quyền: Xem
- SourceCode_Bai25.py       |  256 KB | Quyền: Chỉnh sửa
- BangDiem_HocKy1.xlsx      |  512 KB | Quyền: Riêng tư
Tổng dung lượng đã dùng: 1.75 MB`
  },
  {
    id: 'tin11-bai07',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 7,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 7 (Tin 11): Thực hành tìm kiếm thông tin trên Internet',
    topic: 'Toán tử tìm kiếm logic (AND, OR, site:, filetype:)',
    description: 'SGK Tin 11 KNTT - Xây dựng bộ lọc chuỗi tìm kiếm thông tin chính xác theo cú pháp truy vấn nâng cao.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 7: TÌM KIẾM THÔNG TIN ===
def tao_truy_van(tu_khoa, mien="", loai_tep=""):
    truy_van = f'"{tu_khoa}"'
    if mien:
        truy_van += f" site:{mien}"
    if loai_tep:
        truy_van += f" filetype:{loai_tep}"
    return truy_van

q1 = tao_truy_van("Tin học 11 Kết nối tri thức", "edu.vn", "pdf")
q2 = tao_truy_van("Thuật toán sắp xếp", "moet.gov.vn")

print("CÚ PHÁP TÌM KIẾM TỐI ƯU:")
print("1.", q1)
print("2.", q2)
`,
    expectedOutput: `CÚ PHÁP TÌM KIẾM TỐI ƯU:
1. "Tin học 11 Kết nối tri thức" site:edu.vn filetype:pdf
2. "Thuật toán sắp xếp" site:moet.gov.vn`
  },
  {
    id: 'tin11-bai08',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 8,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    title: 'Bài 8 (Tin 11): Thư điện tử và mạng xã hội nâng cao',
    topic: 'Cấu trúc tiêu đề email, bộ lọc thư rác Spam & Đính kèm',
    description: 'SGK Tin 11 KNTT - Kiểm tra định dạng địa chỉ email và phát hiện từ khóa lừa đảo mạo danh.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 8: AN TOÀN EMAIL & MẠNG XÃ HỘI ===
tu_khoa_spam = ["trúng thưởng", "chuyển tiền ngay", "mật khẩu của bạn", "khẩn cấp"]

def kiem_tra_email_spam(tieu_de, noi_dung):
    text = (tieu_de + " " + noi_dung).lower()
    phat_hien = [k for k in tu_khoa_spam if k in text]
    return len(phat_hien) > 0, phat_hien

tieu_de = "Thông báo: Bạn đã trúng thưởng kỳ thi Olympic"
la_spam, ly_do = kiem_tra_email_spam(tieu_de, "Nhấp link chuyển tiền ngay để nhận")
print(f"Tiêu đề: '{tieu_de}'")
print(f"Phân loại Spam: {la_spam} -> Dấu hiệu: {ly_do}")
`,
    expectedOutput: `Tiêu đề: 'Thông báo: Bạn đã trúng thưởng kỳ thi Olympic'
Phân loại Spam: True -> Dấu hiệu: ['trúng thưởng', 'chuyển tiền ngay']`
  },
  {
    id: 'tin11-bai09',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 9,
    chapter: 'Chủ đề 3: Đạo đức, pháp luật & Văn hóa mạng',
    title: 'Bài 9 (Tin 11): Giao tiếp an toàn trên không gian mạng',
    topic: 'Bảo mật mật khẩu mạnh & Xác thực 2 bước (2FA)',
    description: 'SGK Tin 11 KNTT - Kiểm tra độ mạnh của mật khẩu (độ dài, chữ hoa, chữ thường, số, ký tự đặc biệt).',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 9: BẢO VỆ DỮ LIỆU CÁ NHÂN ===
def danh_gia_mat_khau(pwd):
    dai = len(pwd) >= 8
    hoa = any(c.isupper() for c in pwd)
    thuong = any(c.islower() for c in pwd)
    so = any(c.isdigit() for c in pwd)
    dac_biet = any(c in "!@#$%^&*()-_" for c in pwd)
    diem = sum([dai, hoa, thuong, so, dac_biet])
    return diem

mk1 = "123456"
mk2 = "TinHoc11@2026"
print(f"Mật khẩu '{mk1}': Điểm = {danh_gia_mat_khau(mk1)}/5 (Yếu)")
print(f"Mật khẩu '{mk2}': Điểm = {danh_gia_mat_khau(mk2)}/5 (Rất mạnh)")
`,
    expectedOutput: `Mật khẩu '123456': Điểm = 0/5 (Yếu)
Mật khẩu 'TinHoc11@2026': Điểm = 5/5 (Rất mạnh)`
  },
  {
    id: 'tin11-bai10',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 10,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 10 (Tin 11): Lưu trữ dữ liệu và hệ quản trị CSDL',
    topic: 'Khái niệm CSDL, tính toàn vẹn và giảm thiểu dư thừa',
    description: 'SGK Tin 11 KNTT - So sánh mô hình lưu tệp rời rạc với hệ thống quản lý CSDL có cấu trúc.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 10: HỆ QUẢN TRỊ CSDL ===
print("SO SÁNH HỆ QUẢN TRỊ TỆP VÀ CSDL:")
print("- Tệp rời rạc (File-based): Dư thừa dữ liệu, khó đồng bộ, dễ sai sót.")
print("- CSDL (Database): Dữ liệu tập trung, toàn vẹn, bảo mật cao, hỗ trợ nhiều người dùng.")
`,
    expectedOutput: `SO SÁNH HỆ QUẢN TRỊ TỆP VÀ CSDL:
- Tệp rời rạc (File-based): Dư thừa dữ liệu, khó đồng bộ, dễ sai sót.
- CSDL (Database): Dữ liệu tập trung, toàn vẹn, bảo mật cao, hỗ trợ nhiều người dùng.`
  },
  {
    id: 'tin11-bai11',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 11,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 11 (Tin 11): Cơ sở dữ liệu quan hệ (Relational DB)',
    topic: 'Bảng (Table), Trường (Field), Bản ghi (Record), Khóa chính (Primary Key)',
    description: 'SGK Tin 11 KNTT - Định nghĩa thực thể Bảng Học Sinh với khóa chính là Mã số học sinh.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 11: CSDL QUAN HỆ ===
bang_hoc_sinh = [
    {"ma_hs": "HS001", "ho_ten": "Lê Văn An", "lop": "11A1", "diem_tb": 8.8},
    {"ma_hs": "HS002", "ho_ten": "Trần Thị Mai", "lop": "11A1", "diem_tb": 9.2},
    {"ma_hs": "HS003", "ho_ten": "Ngô Gia Bảo", "lop": "11A2", "diem_tb": 7.9}
]

print("BẢNG HỌC SINH (Khóa chính: ma_hs):")
for r in bang_hoc_sinh:
    print(f"  [{r['ma_hs']}] {r['ho_ten']:15s} | Lớp: {r['lop']} | Điểm: {r['diem_tb']}")
`,
    expectedOutput: `BẢNG HỌC SINH (Khóa chính: ma_hs):
  [HS001] Lê Văn An       | Lớp: 11A1 | Điểm: 8.8
  [HS002] Trần Thị Mai    | Lớp: 11A1 | Điểm: 9.2
  [HS003] Ngô Gia Bảo     | Lớp: 11A2 | Điểm: 7.9`
  },
  {
    id: 'tin11-bai12',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 12,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 12 (Tin 11): Hệ quản trị CSDL & Hệ CSDL',
    topic: 'Kiến trúc máy chủ CSDL, các vai trò Quản trị viên (DBA)',
    description: 'SGK Tin 11 KNTT - Phân loại các chức năng định nghĩa dữ liệu, cập nhật và truy xuất dữ liệu.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 12: CHỨC NĂNG HỆ CSDL ===
chuc_nang = {
    "DDL": "Data Definition Language - Khai báo cấu trúc bảng, kiểu dữ liệu",
    "DML": "Data Manipulation Language - Thêm, sửa, xóa các bản ghi",
    "DQL": "Data Query Language - Truy vấn, tìm kiếm và lọc dữ liệu"
}
for k, v in chuc_nang.items():
    print(f"{k}: {v}")
`,
    expectedOutput: `DDL: Data Definition Language - Khai báo cấu trúc bảng, kiểu dữ liệu
DML: Data Manipulation Language - Thêm, sửa, xóa các bản ghi
DQL: Data Query Language - Truy vấn, tìm kiếm và lọc dữ liệu`
  },
  {
    id: 'tin11-bai13',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 13,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 13 (Tin 11): Tạo lập cơ sở dữ liệu với SQL',
    topic: 'Câu lệnh CREATE TABLE, kiểu dữ liệu INT, VARCHAR, FLOAT',
    description: 'SGK Tin 11 KNTT - Viết câu lệnh DDL định nghĩa bảng dữ liệu môn học và điểm số.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 13: TẠO LẬP CSDL ===
sql_script = """
CREATE TABLE HOC_SINH (
    MaHS VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(50) NOT NULL,
    NgaySinh DATE,
    DiemTinHoc FLOAT CHECK (DiemTinHoc >= 0 AND DiemTinHoc <= 10)
);
"""
print("CÂU LỆNH SQL KHỞI TẠO BẢNG HỌC SINH:")
print(sql_script.strip())
`,
    expectedOutput: `CÂU LỆNH SQL KHỞI TẠO BẢNG HỌC SINH:
CREATE TABLE HOC_SINH (
    MaHS VARCHAR(10) PRIMARY KEY,
    HoTen VARCHAR(50) NOT NULL,
    NgaySinh DATE,
    DiemTinHoc FLOAT CHECK (DiemTinHoc >= 0 AND DiemTinHoc <= 10)
);`
  },
  {
    id: 'tin11-bai14',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 14,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 14 (Tin 11): Định dạng dữ liệu và liên kết giữa các bảng',
    topic: 'Khóa ngoại (Foreign Key) & Mối liên kết 1 - Nhiều (1:N)',
    description: 'SGK Tin 11 KNTT - Tạo quan hệ liên kết giữa Bảng LỚP HỌC và Bảng HỌC SINH để tránh trùng lặp thông tin.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 14: LIÊN KẾT BẢNG ===
lop_hoc = {"11A1": "Thầy Bình", "11A2": "Cô Hương"}
hoc_sinh = [
    {"ma": "HS1", "ten": "Tuấn", "ma_lop": "11A1"},
    {"ma": "HS2", "ten": "Lan", "ma_lop": "11A1"},
    {"ma": "HS3", "ten": "Huy", "ma_lop": "11A2"}
]

print("KẾT QUẢ KẾT NỐI HAI BẢNG QUA KHÓA NGOẠI ma_lop:")
for hs in hoc_sinh:
    gv = lop_hoc.get(hs["ma_lop"], "Chưa phân công")
    print(f"Học sinh: {hs['ten']} -> Lớp: {hs['ma_lop']} -> GVCN: {gv}")
`,
    expectedOutput: `KẾT QUẢ KẾT NỐI HAI BẢNG QUA KHÓA NGOẠI ma_lop:
Học sinh: Tuấn -> Lớp: 11A1 -> GVCN: Thầy Bình
Học sinh: Lan -> Lớp: 11A1 -> GVCN: Thầy Bình
Học sinh: Huy -> Lớp: 11A2 -> GVCN: Cô Hương`
  },
  {
    id: 'tin11-bai15',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 15,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 15 (Tin 11): Tạo và thao tác với biểu mẫu (Forms)',
    topic: 'Giao diện nhập liệu, kiểm tra hợp lệ dữ liệu (Validation)',
    description: 'SGK Tin 11 KNTT - Mô phỏng biểu mẫu nhập điểm với điều kiện chặn điểm âm hoặc lớn hơn 10.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 15: BIỂU MẪU NHẬP LIỆU ===
def nhap_diem_kiem_tra(diem):
    if not (0 <= diem <= 10):
        return False, "Lỗi: Điểm phải từ 0 đến 10!"
    return True, "Hợp lệ"

cac_diem_thu = [8.5, 11.0, -1.0, 9.75]
for d in cac_diem_thu:
    hop_le, msg = nhap_diem_kiem_tra(d)
    print(f"Điểm {d:5.2f} => {msg}")
`,
    expectedOutput: `Điểm  8.50 => Hợp lệ
Điểm 11.00 => Lỗi: Điểm phải từ 0 đến 10!
Điểm -1.00 => Lỗi: Điểm phải từ 0 đến 10!
Điểm  9.75 => Hợp lệ`
  },
  {
    id: 'tin11-bai16',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 16,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 16 (Tin 11): Truy vấn dữ liệu với SQL (SELECT, WHERE)',
    topic: 'Lọc danh sách học sinh đạt điểm giỏi Tin học (>= 8.0)',
    description: 'SGK Tin 11 KNTT - Câu lệnh SQL SELECT lọc và sắp xếp danh sách theo thứ tự giảm dần.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 16: TRUY VẤN DỮ LIỆU SQL ===
ds_hoc_sinh = [
    {"ten": "An", "diem": 9.0},
    {"ten": "Bình", "diem": 7.5},
    {"ten": "Cường", "diem": 8.5},
    {"ten": "Dung", "diem": 6.8}
]

# Mô phỏng: SELECT * FROM ds_hoc_sinh WHERE diem >= 8.0 ORDER BY diem DESC
ket_qua = [hs for hs in ds_hoc_sinh if hs["diem"] >= 8.0]
ket_qua.sort(key=lambda x: x["diem"], reverse=True)

print("KẾT QUẢ TRUY VẤN HỌC SINH GIỎI TIN HỌC (Điểm >= 8.0):")
for hs in ket_qua:
    print(f"- {hs['ten']}: {hs['diem']} điểm")
`,
    expectedOutput: `KẾT QUẢ TRUY VẤN HỌC SINH GIỎI TIN HỌC (Điểm >= 8.0):
- An: 9.0 điểm
- Cường: 8.5 điểm`
  },
  {
    id: 'tin11-bai17',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 17,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 17 (Tin 11): Quản trị và phân quyền trong CSDL',
    topic: 'Bảo mật CSDL, quyền Admin, Giáo viên và Học sinh',
    description: 'SGK Tin 11 KNTT - Kiểm soát quyền ghi điểm thi và quyền xem điểm của từng vai trò người dùng.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 17: PHÂN QUYỀN CSDL ===
vai_tro = {
    "admin": ["xem", "sua", "xoa", "phan_quyen"],
    "giao_vien": ["xem", "nhap_diem", "sua_diem"],
    "hoc_sinh": ["xem_diem_ca_nhan"]
}

for user, quyen in vai_tro.items():
    print(f"Vai trò [{user.upper():10s}]: {', '.join(quyen)}")
`,
    expectedOutput: `Vai trò [ADMIN     ]: xem, sua, xoa, phan_quyen
Vai trò [GIAO_VIEN ]: xem, nhap_diem, sua_diem
Vai trò [HOC_SINH  ]: xem_diem_ca_nhan`
  },
  {
    id: 'tin11-bai18',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 18,
    chapter: 'Chủ đề 5: Cơ sở dữ liệu (CSDL)',
    title: 'Bài 18 (Tin 11): Báo cáo trong cơ sở dữ liệu (Reports)',
    topic: 'Tổng kết điểm thi, tính trung bình (AVG), cao nhất (MAX)',
    description: 'SGK Tin 11 KNTT - Xuất bảng báo cáo tổng kết kết quả học tập môn Tin học cả lớp.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 18: BÁO CÁO CSDL ===
diem_lop = [8.5, 9.0, 7.0, 10.0, 6.5, 8.0, 9.5]

print("BÁO CÁO THỐNG KÊ MÔN TIN HỌC:")
print(f"  Tổng số bài kiểm tra: {len(diem_lop)}")
print(f"  Điểm trung bình lớp : {sum(diem_lop) / len(diem_lop):.2f}")
print(f"  Điểm cao nhất       : {max(diem_lop):.2f}")
print(f"  Điểm thấp nhất      : {min(diem_lop):.2f}")
`,
    expectedOutput: `BÁO CÁO THỐNG KÊ MÔN TIN HỌC:
  Tổng số bài kiểm tra: 7
  Điểm trung bình lớp : 8.36
  Điểm cao nhất       : 10.00
  Điểm thấp nhất      : 6.50`
  },
  {
    id: 'tin11-bai19',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 19,
    chapter: 'Chuyên đề: Khoa học máy tính & Thuật toán',
    title: 'Bài 19 (Tin 11): Biểu diễn dữ liệu số học trong máy tính',
    topic: 'Số nguyên có dấu, bù 2 & biểu diễn số thực dấu phẩy động',
    description: 'SGK Tin 11 KNTT - Chuyển đổi số nguyên âm sang mã bù hai (Two\'s Complement) 8-bit.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 19: BIỂU DIỄN SỐ TRONG MÁY TÍNH ===
def bu_hai_8bit(n):
    if n < 0:
        return format((1 << 8) + n, '08b')
    return format(n, '08b')

for x in [5, -5, 12, -12]:
    print(f"Số {x:3d} biểu diễn 8-bit bù 2: {bu_hai_8bit(x)}")
`,
    expectedOutput: `Số   5 biểu diễn 8-bit bù 2: 00000101
Số  -5 biểu diễn 8-bit bù 2: 11111011
Số  12 biểu diễn 8-bit bù 2: 00001100
Số -12 biểu diễn 8-bit bù 2: 11110100`
  },
  {
    id: 'tin11-bai20',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 20,
    chapter: 'Chuyên đề: Khoa học máy tính & Thuật toán',
    title: 'Bài 20 (Tin 11): Mảng 2 chiều và duyệt ma trận',
    topic: 'Bảng số hàng cột & tính tổng các phần tử biên',
    description: 'SGK Tin 11 KNTT - Duyệt mảng hai chiều, xử lý các phần tử trên viền bao quanh của ma trận số.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 20: MẢNG 2 CHIỀU ===
A = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
m, n = len(A), len(A[0])
tong_bien = 0
for r in range(m):
    for c in range(n):
        if r == 0 or r == m-1 or c == 0 or c == n-1:
            tong_bien += A[r][c]

print("Ma trận A 3x3:")
for row in A:
    print(" ", row)
print("Tổng các phần tử nằm trên đường biên ma trận:", tong_bien)
`,
    expectedOutput: `Ma trận A 3x3:
  [1, 2, 3]
  [4, 5, 6]
  [7, 8, 9]
Tổng các phần tử nằm trên đường biên ma trận: 40`
  },
  {
    id: 'tin11-bai21',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 21,
    chapter: 'Chuyên đề: Khoa học máy tính & Thuật toán',
    title: 'Bài 21 (Tin 11): Thuật toán tìm kiếm tuần tự & nhị phân',
    topic: 'Đánh giá số bước so sánh thực tế giữa Sequential & Binary Search',
    description: 'SGK Tin 11 KNTT - So sánh hiệu năng tìm kiếm tuần tự O(n) và nhị phân O(log n) trên mảng lớn.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 21: SO SÁNH TÌM KIẾM ===
day = list(range(1, 101)) # Dãy 100 số đã sắp xếp
muc_tieu = 73

# Tuần tự: duyệt từ đầu đến đích
so_buoc_tuan_tu = muc_tieu

# Nhị phân:
left, right = 0, len(day) - 1
so_buoc_nhi_phan = 0
while left <= right:
    so_buoc_nhi_phan += 1
    mid = (left + right) // 2
    if day[mid] == muc_tieu:
        break
    elif day[mid] < muc_tieu:
        left = mid + 1
    else:
        right = mid - 1

print(f"Tìm số {muc_tieu} trong 100 phần tử:")
print(f"- Tìm kiếm tuần tự: cần {so_buoc_tuan_tu} phép so sánh")
print(f"- Tìm kiếm nhị phân: chỉ cần {so_buoc_nhi_phan} phép so sánh!")
`,
    expectedOutput: `Tìm số 73 trong 100 phần tử:
- Tìm kiếm tuần tự: cần 73 phép so sánh
- Tìm kiếm nhị phân: chỉ cần 6 phép so sánh!`
  },
  {
    id: 'tin11-bai22',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 22,
    chapter: 'Chuyên đề: Khoa học máy tính & Thuật toán',
    title: 'Bài 22 (Tin 11): Thuật toán sắp xếp chèn (Insertion Sort)',
    topic: 'Chèn từng phần tử vào vị trí thích hợp trong dãy con đã có thứ tự',
    description: 'SGK Tin 11 KNTT - Cài đặt thuật toán Insertion Sort từng bước rõ ràng, dễ hiểu cho học sinh.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 22: SẮP XẾP CHÈN (INSERTION SORT) ===
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

a = [29, 10, 14, 37, 13]
print("Dãy ban đầu:", a)
print("Sau khi sắp xếp chèn:", insertion_sort(a))
`,
    expectedOutput: `Dãy ban đầu: [29, 10, 14, 37, 13]
Sau khi sắp xếp chèn: [10, 13, 14, 29, 37]`
  },
  {
    id: 'tin11-bai23',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 23,
    chapter: 'Chuyên đề: Khoa học máy tính & Thuật toán',
    title: 'Bài 23 (Tin 11): Thuật toán đệ quy & Tháp Hà Nội',
    topic: 'Bài toán kinh điển Tháp Hà Nội n tầng chuyển đĩa',
    description: 'SGK Tin 11 KNTT - Mô phỏng các bước chuyển n đĩa từ cọc nguồn sang cọc đích dùng cọc trung gian.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 23: THÁP HÀ NỘI ĐỆ QUY ===
buoc = 1
def thap_ha_noi(n, nguon, dich, phu):
    global buoc
    if n == 1:
        print(f"Bước {buoc}: Chuyển đĩa 1 từ {nguon} sang {dich}")
        buoc += 1
        return
    thap_ha_noi(n - 1, nguon, phu, dich)
    print(f"Bước {buoc}: Chuyển đĩa {n} từ {nguon} sang {dich}")
    buoc += 1
    thap_ha_noi(n - 1, phu, dich, nguon)

print("GIẢI BÀI TOÁN THÁP HÀ NỘI VỚI 3 ĐĨA:")
thap_ha_noi(3, 'Cọc A', 'Cọc C', 'Cọc B')
`,
    expectedOutput: `GIẢI BÀI TOÁN THÁP HÀ NỘI VỚI 3 ĐĨA:
Bước 1: Chuyển đĩa 1 từ Cọc A sang Cọc C
Bước 2: Chuyển đĩa 2 từ Cọc A sang Cọc B
Bước 3: Chuyển đĩa 1 từ Cọc C sang Cọc B
Bước 4: Chuyển đĩa 3 từ Cọc A sang Cọc C
Bước 5: Chuyển đĩa 1 từ Cọc B sang Cọc A
Bước 6: Chuyển đĩa 2 từ Cọc B sang Cọc C
Bước 7: Chuyển đĩa 1 từ Cọc A sang Cọc C`
  },
  {
    id: 'tin11-bai24',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 24,
    chapter: 'Chuyên đề: Khoa học máy tính & Thuật toán',
    title: 'Bài 24 (Tin 11): Dự án thực tế - Quản lý sổ điểm học sinh',
    topic: 'Kết hợp Dictionary, Danh sách, Hàm và Sắp xếp xếp hạng',
    description: 'SGK Tin 11 KNTT - Xây dựng chương trình tính điểm tổng kết và xếp loại học lực (Xuất sắc, Giỏi, Khá).',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 24: DỰ ÁN QUẢN LÝ SỔ ĐIỂM ===
hoc_sinh = [
    {"ten": "Hoàng Nam", "toan": 9.0, "tin": 9.5},
    {"ten": "Ngọc Mai", "toan": 8.0, "tin": 8.5},
    {"ten": "Bảo Long", "toan": 7.0, "tin": 7.5}
]

for hs in hoc_sinh:
    tb = (hs["toan"] + hs["tin"]) / 2
    xep_loai = "Giỏi" if tb >= 8.0 else "Khá"
    print(f"Học sinh: {hs['ten']:10s} | Điểm TB: {tb:4.1f} | Xếp loại: {xep_loai}")
`,
    expectedOutput: `Học sinh: Hoàng Nam  | Điểm TB:  9.2 | Xếp loại: Giỏi
Học sinh: Ngọc Mai   | Điểm TB:  8.2 | Xếp loại: Giỏi
Học sinh: Bảo Long   | Điểm TB:  7.2 | Xếp loại: Khá`
  },
  {
    id: 'tin11-bai25',
    grade: 'tin11',
    language: 'python',
    lessonNumber: 25,
    chapter: 'Chuyên đề: Khoa học máy tính & Thuật toán',
    title: 'Bài 25 (Tin 11): Đánh giá độ phức tạp thuật toán O(n)',
    topic: 'Ký hiệu Big-O: O(1), O(log n), O(n), O(n^2) trong lập trình',
    description: 'SGK Tin 11 KNTT - Đo lường số phép toán và thời gian chạy khi kích thước dữ liệu tăng từ 10 lên 1,000.',
    code: `# === TIN HỌC 11 (KNTT) - BÀI 25: ĐỘ PHỨC TẠP THUẬT TOÁN BIG-O ===
def tinh_so_phep_toan(n):
    o_1 = 1
    import math
    o_logn = math.ceil(math.log2(n)) if n > 0 else 0
    o_n = n
    o_n2 = n * n
    return o_1, o_logn, o_n, o_n2

print("BẢNG SO SÁNH SỐ PHÉP TOÁN KHI KÍCH THƯỚC ĐẦU VÀO N TĂNG:")
for size in [10, 100, 1000]:
    c, l, n, n2 = tinh_so_phep_toan(size)
    print(f"N = {size:4d} => O(1)={c} | O(log n)≈{l} | O(n)={n} | O(n^2)={n2:,}")
`,
    expectedOutput: `BẢNG SO SÁNH SỐ PHÉP TOÁN KHI KÍCH THƯỚC ĐẦU VÀO N TĂNG:
N =   10 => O(1)=1 | O(log n)≈4 | O(n)=10 | O(n^2)=100
N =  100 => O(1)=1 | O(log n)≈7 | O(n)=100 | O(n^2)=10,000
N = 1000 => O(1)=1 | O(log n)≈10 | O(n)=1000 | O(n^2)=1,000,000`
  },

  // =========================================================================
  // BONUS: CHUYÊN ĐỀ C++ LẬP TRÌNH THUẬT TOÁN THPT & HSG
  // =========================================================================
  {
    id: 'cpp-bai01',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 1,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 1: Cấu trúc chương trình C++ & Xuất cout',
    topic: '#include <iostream>, namespace std & hàm main()',
    description: 'C++ Cơ bản THPT - Khởi đầu với cấu trúc chuẩn của một tệp mã nguồn C++.',
    code: `// === BONUS C++ THPT - BÀI 1: CẤU TRÚC CHƯƠNG TRÌNH C++ ===
#include <iostream>
using namespace std;

int main() {
    cout << "========================================" << endl;
    cout << "  CHÀO MỪNG ĐẾN VỚI LẬP TRÌNH C++ THPT  " << endl;
    cout << "  Chuyên đề bổ trợ ôn thi HSG & Tin học  " << endl;
    cout << "========================================" << endl;

    int a = 125, b = 8;
    cout << "Phép nhân: " << a << " * " << b << " = " << (a * b) << endl;
    cout << "Tổng 2024 + 2025 = " << (2024 + 2025) << endl;

    return 0;
}
`,
    expectedOutput: `========================================
  CHÀO MỪNG ĐẾN VỚI LẬP TRÌNH C++ THPT  
  Chuyên đề bổ trợ ôn thi HSG & Tin học  
========================================
Phép nhân: 125 * 8 = 1000
Tổng 2024 + 2025 = 4049`
  },
  {
    id: 'cpp-bai02',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 2,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 2: Biến, kiểu dữ liệu & Nhập xuất cin / cout',
    topic: 'Kiểu int, long long, double, string, bool',
    description: 'C++ Cơ bản THPT - Khai báo biến, nhập giá trị với cin và định dạng xuất cout.',
    code: `// === BONUS C++ THPT - BÀI 2: BIẾN & NHẬP XUẤT CIN / COUT ===
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string ten = "Nguyen Van An";
    int tuoi = 16;
    double diem_tin = 9.85;
    bool dat_chuan = true;

    cout << "Họ và tên: " << ten << endl;
    cout << "Tuổi: " << tuoi << endl;
    cout << fixed << setprecision(2);
    cout << "Điểm Tin Học C++: " << diem_tin << endl;
    cout << "Đạt chuẩn Olympic: " << (dat_chuan ? "TRUE" : "FALSE") << endl;

    return 0;
}
`,
    expectedOutput: `Họ và tên: Nguyen Van An
Tuổi: 16
Điểm Tin Học C++: 9.85
Đạt chuẩn Olympic: TRUE`
  },
  {
    id: 'cpp-bai03',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 3,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 3: Cấu trúc rẽ nhánh if - else & switch - case',
    topic: 'Kiểm tra điều kiện & Bảng xếp loại điểm số',
    description: 'C++ Cơ bản THPT - Phân nhánh luồng thực thi chương trình trong C++.',
    code: `// === BONUS C++ THPT - BÀI 3: RẼ NHÁNH IF - ELSE TRONG C++ ===
#include <iostream>
using namespace std;

int main() {
    double diem = 8.75;
    string xep_loai;

    if (diem >= 8.0) {
        xep_loai = "Giỏi (Đạt giải cao môn Tin)";
    } else if (diem >= 6.5) {
        xep_loai = "Khá";
    } else {
        xep_loai = "Trung bình";
    }

    cout << "Điểm thi C++: " << diem << endl;
    cout << "Kết quả xếp loại: " << xep_loai << endl;

    return 0;
}
`,
    expectedOutput: `Điểm thi C++: 8.75
Kết quả xếp loại: Giỏi (Đạt giải cao môn Tin)`
  },
  {
    id: 'cpp-bai04',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 4,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 4: Các vòng lặp for, while & do - while',
    topic: 'Lặp số lần biết trước và thuật toán tính tổng',
    description: 'C++ Cơ bản THPT - Vòng lặp for tính tổng các số lẻ từ 1 đến N trong C++.',
    code: `// === BONUS C++ THPT - BÀI 4: VÒNG LẶP FOR TRONG C++ ===
#include <iostream>
using namespace std;

int main() {
    int n = 15;
    long long tong = 0;

    cout << "Các số lẻ từ 1 đến " << n << ":" << endl;
    for (int i = 1; i <= n; i += 2) {
        cout << "  + Số: " << i << endl;
        tong += i;
    }

    cout << "==> Tổng các số lẻ = " << tong << endl;
    return 0;
}
`,
    expectedOutput: `Các số lẻ từ 1 đến 15:
  + Số: 1
  + Số: 3
  + Số: 5
  + Số: 7
  + Số: 9
  + Số: 11
  + Số: 13
  + Số: 15
==> Tổng các số lẻ = 64`
  },
  {
    id: 'cpp-bai05',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 5,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 5: Mảng 1 chiều & std::vector',
    topic: 'Mảng động vector & Các phương thức push_back()',
    description: 'C++ Nâng cao THPT - Sử dụng std::vector để lưu trữ danh sách động tiện lợi.',
    code: `// === BONUS C++ THPT - BÀI 5: MẢNG VÀ STD::VECTOR ===
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {10, 25, 30, 45, 50};
    a.push_back(65);  // Thêm phần tử vào cuối vector

    cout << "Kích thước vector: " << a.size() << endl;
    cout << "Các phần tử trong vector: ";
    for (int x : a) {
        cout << x << " ";
    }
    cout << endl;

    cout << "Phần tử đầu: " << a.front() << ", phần tử cuối: " << a.back() << endl;
    return 0;
}
`,
    expectedOutput: `Kích thước vector: 6
Các phần tử trong vector: 10 25 30 45 50 65 
Phần tử đầu: 10, phần tử cuối: 65`
  },
  {
    id: 'cpp-bai06',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 6,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 6: Ma trận 2 chiều trong C++',
    topic: 'Mảng hai chiều int a[m][n] & Duyệt hàng cột',
    description: 'C++ Nâng cao THPT - Khai báo ma trận 3x3 và tính tổng các phần tử.',
    code: `// === BONUS C++ THPT - BÀI 6: MA TRẬN 2 CHIỀU TRONG C++ ===
#include <iostream>
using namespace std;

int main() {
    int mt[3][3] = {
        {10, 20, 30},
        {15, 25, 35},
        {50, 60, 70}
    };

    cout << "Duyệt ma trận C++ 3x3:" << endl;
    for (int i = 0; i < 3; i++) {
        int tong_hang = 0;
        for (int j = 0; j < 3; j++) {
            tong_hang += mt[i][j];
        }
        cout << "Hàng " << (i + 1) << " -> Tổng = " << tong_hang << endl;
    }

    return 0;
}
`,
    expectedOutput: `Duyệt ma trận C++ 3x3:
Hàng 1 -> Tổng = 60
Hàng 2 -> Tổng = 75
Hàng 3 -> Tổng = 180`
  },
  {
    id: 'cpp-bai07',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 7,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 7: Xử lý xâu ký tự std::string',
    topic: 'Hàm length(), substr(), find() & đảo xâu',
    description: 'C++ Cơ bản THPT - Thao tác chuỗi ký tự trong thư viện chuẩn <string>.',
    code: `// === BONUS C++ THPT - BÀI 7: XỬ LÝ XÂU TRONG C++ ===
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "Ket noi tri thuc";

    cout << "Độ dài xâu: " << s.length() << endl;
    cout << "Trích xâu con (3 ký tự đầu): " << s.substr(0, 3) << endl;

    reverse(s.begin(), s.end());
    cout << "Xâu sau khi đảo ngược: " << s << endl;

    return 0;
}
`,
    expectedOutput: `Độ dài xâu: 16
Trích xâu con (3 ký tự đầu): Ket
Xâu sau khi đảo ngược: cuht irt ion teK`
  },
  {
    id: 'cpp-bai08',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 8,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 8: Hàm & Tham chiếu (&) trong C++',
    topic: 'Truyền tham trị vs Truyền tham chiếu để hoán vị swap()',
    description: 'C++ Nâng cao THPT - Viết hàm hoán đổi 2 số nguyên sử dụng tham chiếu &.',
    code: `// === BONUS C++ THPT - BÀI 8: HÀM VÀ THAM CHIẾU TRONG C++ ===
#include <iostream>
using namespace std;

// Hàm hoán vị sử dụng tham chiếu &
void hoan_vi(int &x, int &y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 15, b = 99;
    cout << "Trước khi hoán vị: a = " << a << ", b = " << b << endl;

    hoan_vi(a, b);
    cout << "Sau khi hoán vị:   a = " << a << ", b = " << b << endl;

    return 0;
}
`,
    expectedOutput: `Trước khi hoán vị: a = 15, b = 99
Sau khi hoán vị:   a = 99, b = 15`
  },
  {
    id: 'cpp-bai09',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 9,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 9: Thuật toán sort() & binary_search()',
    topic: 'Thư viện <algorithm> tăng tốc giải bài thi Tin học',
    description: 'C++ Thi HSG - Tận dụng std::sort O(n log n) và std::binary_search trong STL.',
    code: `// === BONUS C++ THPT - BÀI 9: THƯ VIỆN <ALGORITHM> C++ ===
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {45, 12, 89, 34, 23, 78};

    cout << "Trước khi sắp xếp: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    sort(v.begin(), v.end());  // Sắp xếp tăng dần O(n log n)
    cout << "Sau khi sort():    ";
    for (int x : v) cout << x << " ";
    cout << endl;

    int can_tim = 34;
    bool co = binary_search(v.begin(), v.end(), can_tim);
    cout << "Tìm số " << can_tim << ": " << (co ? "TÌM THẤY!" : "KHÔNG THẤY") << endl;

    return 0;
}
`,
    expectedOutput: `Trước khi sắp xếp: 45 12 89 34 23 78 
Sau khi sort():    12 23 34 45 78 89 
Tìm số 34: TÌM THẤY!`
  },
  {
    id: 'cpp-bai10',
    grade: 'cpp',
    language: 'cpp',
    lessonNumber: 10,
    chapter: 'Bonus: C++ Lập Trình Thuật Toán THPT',
    title: 'C++ Bài 10: Xử lý tệp (freopen) thi HSG Tin Học',
    topic: 'freopen("input.txt", "r", stdin) thi Tin học trẻ & HSG',
    description: 'C++ Thi HSG - Kỹ thuật chuyển hướng luồng dữ liệu tệp chuẩn trong các kỳ thi.',
    code: `// === BONUS C++ THPT - BÀI 10: NHẬP XUẤT TỆP THI HSG ===
#include <iostream>
using namespace std;

int main() {
    cout << "MẪU CODE ĐỌC/GHI TỆP KỲ THI HỌC SINH GIỎI TIN HỌC:" << endl;
    cout << "freopen(\\"BAI1.INP\\", \\"r\\", stdin);" << endl;
    cout << "freopen(\\"BAI1.OUT\\", \\"w\\", stdout);" << endl;
    cout << "ios_base::sync_with_stdio(false); cin.tie(NULL);" << endl;
    cout << "-> Đã cấu hình tối ưu I/O tốc độ cao cho C++." << endl;

    return 0;
}
`,
    expectedOutput: `MẪU CODE ĐỌC/GHI TỆP KỲ THI HỌC SINH GIỎI TIN HỌC:
freopen("BAI1.INP", "r", stdin);
freopen("BAI1.OUT", "w", stdout);
ios_base::sync_with_stdio(false); cin.tie(NULL);
-> Đã cấu hình tối ưu I/O tốc độ cao cho C++.`
  }
];

export const MOCK_QUIZ_PLACEHOLDERS: QuizPlaceholder[] = [
  {
    id: 'q-1',
    grade: 'tin10',
    lessonRef: 'Bài 1 - Tin 10 KNTT',
    question: '[Tin 10 KNTT - Bài 1] 1 Megabyte (MB) quy đổi chính xác bằng bao nhiêu Kilobyte (KB)?',
    options: ['A. 1000 KB', 'B. 1024 KB', 'C. 1048576 KB', 'D. 8192 KB'],
    correctOptionIndex: 1,
    explanation: 'Theo chuẩn kiến trúc máy tính và SGK Tin học 10, 1 KB = 1024 Byte và 1 MB = 1024 KB.'
  },
  {
    id: 'q-2',
    grade: 'tin10',
    lessonRef: 'Bài 17 - Tin 10 KNTT',
    question: '[Tin 10 KNTT - Bài 17] Tên biến nào sau đây là HỢP LỆ trong ngôn ngữ lập trình Python?',
    options: ['A. 2_tong_diem', 'B. tong-diem', 'C. tong_diem_2024', 'D. def'],
    correctOptionIndex: 2,
    explanation: 'Trong Python, tên biến chỉ chứa chữ cái, chữ số và gạch dưới (_), không bắt đầu bằng số và không trùng từ khóa của ngôn ngữ.'
  },
  {
    id: 'q-3',
    grade: 'tin10',
    lessonRef: 'Bài 18 - Tin 10 KNTT',
    question: '[Tin 10 KNTT - Bài 18] Để nhập một số nguyên từ bàn phím gán cho biến n trong Python, cú pháp chuẩn là gì?',
    options: [
      'A. n = read_int()',
      'B. n = int(input())',
      'C. n = input(int)',
      'D. n = float(input())'
    ],
    correctOptionIndex: 1,
    explanation: 'Hàm input() trả về dữ liệu kiểu chuỗi (str), cần dùng hàm int() để ép kiểu sang số nguyên.'
  },
  {
    id: 'q-4',
    grade: 'tin10',
    lessonRef: 'Bài 20 - Tin 10 KNTT',
    question: '[Tin 10 KNTT - Bài 20] Lệnh list(range(2, 9, 2)) sẽ sinh ra danh sách gồm các số nào?',
    options: ['A. [2, 4, 6, 8]', 'B. [2, 3, 4, 5, 6, 7, 8, 9]', 'C. [2, 4, 6, 8, 10]', 'D. [4, 6, 8]'],
    correctOptionIndex: 0,
    explanation: 'range(start=2, stop=9, step=2) bắt đầu từ 2, cộng thêm 2 mỗi bước và dừng trước 9, thu được 2, 4, 6, 8.'
  },
  {
    id: 'q-5',
    grade: 'tin10',
    lessonRef: 'Bài 25 - Tin 10 KNTT',
    question: '[Tin 10 KNTT - Bài 25] Trong Python, câu lệnh "Tin-hoc-10".split("-") cho kết quả là gì?',
    options: [
      'A. "Tin hoc 10"',
      'B. [\'Tin\', \'hoc\', \'10\']',
      'C. (\'Tin\', \'hoc\', \'10\')',
      'D. [\'Tin-hoc-10\']'
    ],
    correctOptionIndex: 1,
    explanation: 'Phương thức split("-") tách xâu thành một danh sách các từ dựa trên ký tự ngăn cách dấu gạch ngang.'
  },
  {
    id: 'q-6',
    grade: 'tin11',
    lessonRef: 'Bài 2 - Tin 11 KNTT',
    question: '[Tin 11 KNTT - Bài 2] Điều kiện tiên quyết để áp dụng thuật toán Tìm kiếm nhị phân (Binary Search) là gì?',
    options: [
      'A. Dãy số phải có số lượng phần tử là số chẵn',
      'B. Dãy số phải được sắp xếp theo thứ tự (tăng hoặc giảm)',
      'C. Dãy số chỉ được chứa các số nguyên dương',
      'D. Dãy số không được có phần tử trùng nhau'
    ],
    correctOptionIndex: 1,
    explanation: 'Thuật toán tìm kiếm nhị phân yêu cầu mảng phải được sắp xếp trước để chia đôi phạm vi tìm kiếm sau mỗi lần so sánh.'
  },
  {
    id: 'q-7',
    grade: 'cpp',
    lessonRef: 'C++ Bài 8 - HSG THPT',
    question: '[Bonus C++ THPT] Để truyền tham chiếu thay đổi trực tiếp giá trị của biến ngoài hàm trong C++, ta dùng ký tự nào?',
    options: [
      'A. Con trỏ *',
      'B. Ký tự tham chiếu &',
      'C. Ký tự %',
      'D. Ký tự #'
    ],
    correctOptionIndex: 1,
    explanation: 'Ký tự & đặt trước tên tham số hàm (vd: void swap(int &a, int &b)) biểu thị truyền tham chiếu (Pass by reference) trong C++.'
  }
];

export const MOCK_FLASHCARD_PLACEHOLDERS: FlashcardPlaceholder[] = [
  {
    id: 'fc-1',
    grade: 'tin10',
    front: 'Quy tắc thụt lề (Indentation) trong Python có bắt buộc không?',
    back: 'BẮT BUỘC. Python sử dụng khoảng thụt dòng (thường là 4 dấu cách) để xác định khối lệnh (block) sau dấu hai chấm (:), thay vì dùng cặp ngoặc nhọn {}.',
    tag: 'Tin 10 • Cú pháp'
  },
  {
    id: 'fc-2',
    grade: 'tin10',
    front: 'Sự khác biệt giữa toán tử // và toán tử % trong Python?',
    back: '// là phép chia lấy thương nguyên (làm tròn xuống). % là phép chia lấy số dư. Ví dụ: 17 // 5 = 3 và 17 % 5 = 2.',
    tag: 'Tin 10 • Toán tử'
  },
  {
    id: 'fc-3',
    grade: 'tin10',
    front: 'Các lệnh làm việc với xâu ký tự Bài 25 Tin 10 KNTT?',
    back: 'split(sep): tách xâu thành list; sep.join(list): nối list thành xâu; find(sub): tìm vị trí; replace(old, new): thay thế.',
    tag: 'Tin 10 • Xâu ký tự'
  },
  {
    id: 'fc-4',
    grade: 'tin11',
    front: 'Độ phức tạp thời gian của thuật toán Tìm kiếm nhị phân?',
    back: 'O(log n). Sau mỗi bước lặp, không gian tìm kiếm giảm đi một nửa, nhanh hơn nhiều so với tìm kiếm tuần tự O(n).',
    tag: 'Tin 11 • Thuật toán'
  },
  {
    id: 'fc-5',
    grade: 'cpp',
    front: 'Ưu điểm của thư viện STL <algorithm> (std::sort) trong C++?',
    back: 'std::sort() sử dụng thuật toán Introsort (kết hợp QuickSort, HeapSort, InsertionSort) đạt độ phức tạp O(n log n) trong mọi trường hợp, tối ưu cho kỳ thi HSG.',
    tag: 'Bonus C++ • STL'
  },
  {
    id: 'fc-6',
    grade: 'cpp',
    front: 'Cú pháp mở tệp nhanh freopen() trong C++ thi Tin học?',
    back: 'freopen("TEN_TEP.INP", "r", stdin); và freopen("TEN_TEP.OUT", "w", stdout); chuyển toàn bộ lệnh cin / cout đọc ghi trực tiếp qua tệp.',
    tag: 'Bonus C++ • Tệp thi HSG'
  }
];

export const MOCK_CHAT_PLACEHOLDERS: ChatPlaceholder[] = [
  {
    id: 'm-1',
    sender: 'ai',
    text: 'Xin chào học sinh! Mình là AI Trợ Giảng môn Tin học 10 & 11 (KNTT) và Chuyên đề C++. Hệ thống đã nạp đầy đủ từ Bài 1 đến Bài 25+ Tin 10, Tin 11 và 10 bài C++ thi HSG. Đây là bản App Shell v0.1 với giao diện sáng rõ!',
    time: '08:00 AM'
  },
  {
    id: 'm-2',
    sender: 'student',
    text: 'Thưa thầy/cô, sự khác nhau lớn nhất khi viết vòng lặp for giữa Python (Bài 20) và C++ (Bài 4) là gì ạ?',
    time: '08:01 AM'
  },
  {
    id: 'm-3',
    sender: 'ai',
    text: '[Dữ liệu mẫu phản hồi v0.1]: Trong Python, ta dùng vòng lặp duyệt khoảng giá trị: for i in range(start, stop, step):. Còn trong C++, cú pháp lặp rõ ràng 3 mệnh đề: for (int i = start; i < stop; i += step) { ... }. Cả hai đều cùng chung bản chất tư duy thuật toán!',
    time: '08:01 AM'
  }
];
