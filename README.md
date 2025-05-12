# Trình tạo bài tập XÁC SUẤT THỐNG KÊ

## Tổng quan

Trình tạo bài tập Toán học là một ứng dụng Python được thiết kế để tạo và quản lý các bài tập toán học dựa trên các công thức do người dùng định nghĩa. Ứng dụng hiện sử dụng Flask để cung cấp giao diện web, giúp người dùng dễ dàng tương tác thông qua trình duyệt.

## Tính năng

- **Tạo bài tập động**: Ứng dụng tạo các bài tập dựa trên các giá trị ngẫu nhiên của a0, a1, a2, v.v., và tính toán các giá trị chênh lệch cho X.
- **Xử lý đầu vào của người dùng**: Người dùng có thể nhập đáp án của mình, và ứng dụng sẽ kiểm tra tính chính xác.
- **Phản hồi trực quan**: Các ô nhập liệu thay đổi màu sắc dựa trên độ chính xác của đáp án, cung cấp phản hồi ngay lập tức.
- **Giao diện web hiện đại**: Sử dụng HTML, CSS và JavaScript để cung cấp giao diện thân thiện với người dùng.

## Cấu trúc dự án

math-exercise-generator
├── src
│ ├── app.py # Điểm khởi chạy Flask và định tuyến cho Bài 1,2,3
│ ├── logic # Gói chứa các logic tính toán
│ │ ├── **init**.py
│ │ ├── calculations.py # Logic Bài 1
│ │ ├── bai_tap_2.py # Logic Bài 2
│ │ └── bai_tap_3.py # Logic Bài 3 (Ước lượng điểm)
│ │ └── bai_tap_4.py # Logic Bài 4 (Ước lượng khoảng)
│ ├── templates
│ │ └── index.html # Giao diện chính (HTML) có 3 bài
│ └── static
│ ├── styles.css # CSS chung
│ └── script.js # JavaScript xử lý các bài 1,2,3,4
├── requirements.txt # Thư viện cần thiết
└── README.md # Hướng dẫn sử dụng

## Cài đặt

Để chạy ứng dụng, hãy đảm bảo bạn đã cài đặt Python trên hệ thống của mình. Sau đó, cài đặt các thư viện cần thiết bằng cách chạy lệnh:
pip install -r requirements.txt

## Sử dụng

1. Chạy ứng dụng Flask bằng cách thực thi tệp `app.py`:
   python src/app.py

2. Mở trình duyệt và truy cập địa chỉ:
   http://127.0.0.1:5000

3. Giao diện web sẽ hiển thị bài tập. Nhập đáp án của bạn vào các ô nhập liệu được cung cấp.

4. Nhấn nút "Tạo bài tập" để tạo bài tập mới.

## Đóng góp

Các đóng góp để cải thiện chức năng hoặc nâng cao ứng dụng đều được hoan nghênh. Vui lòng fork repository và gửi pull request với các thay đổi của bạn.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT. Xem tệp LICENSE để biết thêm chi tiết.
