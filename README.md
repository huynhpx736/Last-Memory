# THE LAST MEMORY.exe — Cinematic Landing Page

Một landing page kỷ niệm ngày nghỉ việc theo phong cách trailer phim: nền tối, neon xanh/hồng, hiệu ứng cuộn, thống kê chạy số, hồ sơ BẠN và 6 đồng nghiệp, boss deadline tương tác và credit cuối phim.

## Chạy trên máy

1. Giải nén file ZIP.
2. Mở thư mục `the-last-shift-cinematic`.
3. Mở `index.html` bằng Chrome/Edge.

Không cần cài Node.js, không cần backend, không cần database. Nếu muốn chạy bằng local server:
- VS Code: cài extension **Live Server**, bấm chuột phải `index.html` → **Open with Live Server**.
- Hoặc chạy `python -m http.server 8000` trong thư mục rồi mở `http://localhost:8000`.

## Cá nhân hóa nội dung

Mở `script.js`, sửa:
- `YOUR_NAME`: tên/bút danh của bạn xuất hiện ở credit cuối.
- `CREW`: mảng 7 nhân vật mẫu. Mỗi nhân vật có `name`, `role`, `icon`, `accent`, `bio`, `quote`.

Bạn nên thay các biệt danh và câu thoại mẫu bằng chuyện vui thật của nhóm. Giữ nội dung vui vẻ, tránh đưa thông tin riêng tư hoặc câu đùa khiến ai đó khó xử.

Trong `index.html`, bạn cũng có thể sửa:
- Các câu headline và đoạn chia tay.
- Các số liệu ước tính (999.999 ô, 8.472 lần copy-paste, 63 đơn vị cà phê).
- Tên người đóng vai chính trong credit: script tự thay bằng `YOUR_NAME`.

## Đưa website lên mạng miễn phí

### Cách A — GitHub Pages
1. Đăng nhập GitHub và tạo repository mới, ví dụ `the-last-shift`.
2. Upload `index.html`, `style.css`, `script.js` (và README nếu muốn) lên root của repository.
3. Vào **Settings → Pages**.
4. Ở **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn branch `main`, folder `/ (root)`, bấm **Save**.
6. Chờ GitHub tạo link dạng `https://TEN-GITHUB.github.io/the-last-shift/`.

### Cách B — Netlify Drop
1. Mở `https://app.netlify.com/drop`.
2. Kéo thả cả thư mục website đã giải nén vào trang đó.
3. Chờ deploy xong, sao chép URL được cấp để gửi cho đồng nghiệp.

## Tương tác có sẵn
- Thanh tiến độ cuộn trang.
- Hiệu ứng xuất hiện khi cuộn đến từng khu vực.
- Thống kê đếm số tăng dần.
- Bấm hồ sơ để mở popup chi tiết nhân vật.
- Nút bật/tắt âm thanh synth retro.
- Nút tấn công boss deadline; có thể dùng nút hoặc `Ctrl + S` (website chặn chức năng lưu trang trong lúc dùng phím tắt này).
- Credit cuối phim và replay.
- Responsive cho điện thoại, tablet và desktop; tôn trọng cài đặt giảm chuyển động.

## Lưu ý
Font từ Google Fonts cần internet; nếu mất mạng trang vẫn dùng font dự phòng. Không có tracking hoặc gửi dữ liệu người xem đi đâu cả.
