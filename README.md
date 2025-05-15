# Trình tạo bài tập XÁC SUẤT THỐNG KÊ

## Tổng quan

Trình tạo bài tập Toán học là một ứng dụng Python được thiết kế để tạo và quản lý các bài tập toán học dựa trên các công thức do người dùng định nghĩa. Ứng dụng hiện sử dụng Flask để cung cấp giao diện web, giúp người dùng dễ dàng tương tác thông qua trình duyệt.

## Tính năng

- **Tạo bài tập động**: Ứng dụng tạo các bài tập dựa trên các giá trị ngẫu nhiên của a0, a1, a2, v.v., và tính toán các giá trị chênh lệch cho X.
- **Xử lý đầu vào của người dùng**: Người dùng có thể nhập đáp án của mình, và ứng dụng sẽ kiểm tra tính chính xác.
- **Phản hồi trực quan**: Các ô nhập liệu thay đổi màu sắc dựa trên độ chính xác của đáp án, cung cấp phản hồi ngay lập tức.
- **Giao diện web hiện đại**: Sử dụng HTML, CSS và JavaScript để cung cấp giao diện thân thiện với người dùng.

math-exercise-generator
├── src
│ ├── app.py # Điểm khởi chạy Flask và định tuyến cho các bài
│ ├── logic # Gói chứa các logic tính toán
│ │ ├── **init**.py
│ │ ├── calculations.py # Logic Bài 1
│ │ ├── bai_tap_2.py # Logic Bài 2
│ │ ├── bai_tap_3.py # Logic Bài 3
│ │ ├── bai_tap_4.py # Logic Bài 4
│ │ ├── bai_tap_5.py # Logic Bài 5
│ │ ├── bai_tap_6.py # Logic Bài 6
│ │ ├── bai_tap_8.py # Logic Bài 8
│ │ └── bai_tap_8b.py # Logic Bài 8b
│ ├── templates
│ │ └── index.html # Giao diện chính (HTML)
│ └── static
│ ├── styles.css # CSS chung
│ └── script.js # JavaScript xử lý các bài
├── requirements.txt # Thư viện cần thiết
└── README.md # Hướng dẫn sử dụng

## Cài đặt

Để chạy ứng dụng, hãy đảm bảo bạn đã cài đặt Python trên hệ thống của mình. Sau đó, cài đặt các thư viện cần thiết bằng cách chạy lệnh:
pip install -r requirements.txt
(hãy chạy các lệnh này trong terminal và di chuyển vào mục chứa tệp requirements.txt trước qua lệnh cd .\math-exercise-generator\ )
(nếu dùng VSCode thì có thể thấy dưới thanh debug có phần TERMINAL, ấn vào đó và nhập các lệnh)

## Sử dụng

1. Chạy ứng dụng Flask bằng cách thực thi tệp app.py: (nhớ di chuyển vào mục chứa tệp app.py trước qua lệnh cd .\math-exercise-generator\ )
   python src/app.py

2. Mở trình duyệt và truy cập địa chỉ:
   http://127.0.0.1:5000
   (hoặc trong phần TERMINAL khi chạy lệnh thì nó cũng sẽ hiển thị tên địa chỉ kia ra và ta có thể ấn Ctrl + click chuột trái vào để mở)

3. Giao diện web sẽ hiển thị bài tập. Nhập đáp án của bạn vào các ô nhập liệu được cung cấp.

4. Nhấn nút "Tạo bài tập" để tạo bài tập mới.

5. Nhấn nút "Kiểm tra bài tập ..." để kiểm tra mình có làm đúng không. Lưu ý phải nhập đầy đủ các ô input của 1 bài thì mới kiểm tra được bài đó. Ô input sẽ hiện màu xanh nếu đáp án nhập vào đúng, còn hiện màu đỏ nếu đáp án nhập vào sai. Chấp nhận các đáp án với mức sai số +-0.001.

## Đóng góp

Các đóng góp để cải thiện chức năng hoặc nâng cao ứng dụng đều được hoan nghênh. Vui lòng fork repository và gửi pull request với các thay đổi của bạn. Sửa lại cái giao diện cho tui thì tốt tại tui lười sửa giao diện quá.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT. Xem tệp LICENSE để biết thêm chi tiết. Đoạn này CHATGPT bảo viết thêm chứ tôi cũng không thực sự biết có cần hay không.
