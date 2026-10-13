# Tổng quan hệ thống

### Giao diện

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption><p>Hình 3-1. Giao diện trang Tổng quan.</p></figcaption></figure>

### Ý nghĩa các chỉ số

Các chỉ số phía trên màn hình giúp người dùng đánh giá nhanh tình trạng hoạt động chung của hệ thống.

| Chỉ số                    | Ý nghĩa                                                          |
| ------------------------- | ---------------------------------------------------------------- |
| **Tổng phòng học**        | Tổng số phòng học đã được tạo và quản lý trong hệ thống.         |
| **Phòng đang hoạt động**  | Số phòng học đang có hoạt động hoặc đang được hệ thống giám sát. |
| **Tổng thiết bị**         | Tổng số thiết bị đã được cấu hình trong các phòng học.           |
| **Cảnh báo chưa xử lý**   | Số cảnh báo chưa được người dùng kiểm tra hoặc xử lý.            |
| **Lớp học đang diễn ra**  | Các phiên học đang diễn ra.                                      |
| **Học sinh trực tuyến**   | Số học sinh đang tham gia học.                                   |

### Các khu vực giám sát

#### 1. Phòng học đang hoạt động

Khu vực **Phòng học đang hoạt động** hiển thị thông tin về phòng học đang có hoạt động tại thời điểm hiện tại.

Người dùng có thể theo dõi nhanh trạng thái phòng học và nhấn **Xem tất cả** để chuyển đến chức năng **Phòng học**.

Khi không có phòng học nào đang hoạt động, hệ thống hiển thị thông báo **Chưa có phòng đang hoạt động**.

#### 2. Cảnh báo mới nhất

Khu vực **Cảnh báo mới nhất** hiển thị các cảnh báo gần đây được hệ thống ghi nhận.

Mỗi cảnh báo có thể bao gồm:

* Tên cảnh báo.
* Nội dung cảnh báo.
* Mức độ cảnh báo.
* Thời gian phát sinh.

Người dùng có thể nhấn **Xem tất cả** để chuyển đến chức năng **Cảnh báo** và kiểm tra chi tiết.

#### 3. Hoạt động gần đây

Khu vực Hoạt động gần đây hiển thị các hoạt động gần nhất do người dùng thực hiện.

Các hoạt động có thể bao gồm:

* Tạo hoặc cập nhật người dùng.
* Thêm hoặc kiểm tra thiết bị.
* Thay đổi thông tin phòng học.
* Cập nhật cấu hình hệ thống.
* Thực hiện các thao tác quản trị khác.

Người dùng có thể nhấn **Xem tất cả** để chuyển đến chức năng **Nhật ký hệ thống**.

### Theo dõi trạng thái hệ thống

Người dùng có thể quan sát các chỉ số và các khu vực giám sát để đánh giá nhanh tình trạng của hệ thống.

Khi phát hiện thông tin bất thường, người dùng có thể chuyển đến chức năng tương ứng để kiểm tra chi tiết.

Ví dụ:

* **Số camera trực tuyến giảm đột ngột** → Kiểm tra chức năng **Camera**.
* **Cảnh báo tăng bất thường** → Kiểm tra chức năng **Cảnh báo**.
* **Xuất hiện thiết bị ngoại tuyến** → Kiểm tra chức năng **Thiết bị**.
* **Không có phòng học đang hoạt động** → Kiểm tra chức năng **Phòng học** hoặc **Trực tuyến**.
* **Xuất hiện hoạt động bất thường** → Kiểm tra chức năng **Nhật ký hệ thống**.

### Lưu ý

> Các thông tin trên trang Tổng quan được cập nhật theo trạng thái hiện tại của hệ thống và có thể thay đổi khi trạng thái phòng học, camera hoặc thiết bị thay đổi.
>
> Một sự cố có thể đồng thời xuất hiện tại khu vực **Cảnh báo mới nhất** và **Thiết bị cần kiểm tra**.
