# 📊 BẢNG SO SÁNH CHỨC NĂNG 3 ROLE

## FPTU HCM Lost & Found Tracking System

**Ngày tạo:** 4 tháng 12, 2025  
**Hệ thống:** FPTU HCM Lost & Found Tracking  
**Phiên bản:** 1.0  
**Người tạo:** Development Team

---

## BẢNG TỔNG HỢP CHI TIẾT

### So Sánh Student, Staff, Security Officer

| Chức Năng | Student | Staff | Security Officer | Mô Tả |
|---|---|---|---|---|
| **BÁNG MẤT VẬT DỤNG** | | | | |
| Tạo báo mất | ✅ | ❌ | ❌ | Sinh viên báo cáo vật dụng bị mất |
| Xem báo mất của mình | ✅ | ❌ | ❌ | Xem các báo cáo mà mình tạo |
| Xem tất cả báo mất | ❌ | ✅ | ❌ | Staff quản lý toàn bộ báo cáo |
| Cập nhật báo mất | ✅ (của mình) | ❌ | ❌ | Sửa thông tin báo cáo của mình |
| Xóa báo mất | ✅ (của mình) | ✅ | ❌ | Xóa báo cáo (Staff xóa tất cả) |
| Tìm kiếm báo mất | ✅ | ✅ | ❌ | Tìm kiếm theo keyword, loại, campus |
| **ĐỒ VẬT TÌM ĐƯỢC** | | | | |
| Tạo báo tìm được | ❌ | ❌ | ✅ | Chỉ bảo vệ ghi nhận vật dụng tìm được |
| Xem danh sách đồ tìm được | ❌ | ✅ | ✅ (của mình) | Xem các vật dụng trong kho |
| Xem chi tiết đồ tìm được | ❌ | ✅ | ✅ | Xem thông tin chi tiết từng vật dụng |
| Cập nhật đồ tìm được | ❌ | ❌ | ✅ (của mình) | Sửa thông tin vật dụng |
| Xóa đồ tìm được | ❌ | ✅ | ✅ | Xóa vật dụng khỏi hệ thống |
| Tìm kiếm đồ tìm được | ✅ | ✅ | ✅ | Tìm kiếm vật dụng trong kho |
| Quản lý kho lưu giữ | ❌ | ✅ (tổng hợp) | ✅ (campus của mình) | Quản lý kho vật dụng |
| **MATCHING (ĐỐI SÁN)** | | | | |
| Xem gợi ý match | ✅ | ❌ | ❌ | Hệ thống gợi ý vật dụng có thể là của mình |
| Xác nhận match | ✅ | ❌ | ❌ | Xác minh "đúng, đó là đồ của tôi" |
| Từ chối match | ✅ | ❌ | ❌ | Từ chối gợi ý không phù hợp |
| Xem danh sách match | ❌ | ✅ | ❌ | Staff xem tất cả lệnh match |
| Giải quyết match | ❌ | ✅ | ❌ | Staff cập nhật trạng thái match cuối cùng |
| Tạo match thủ công | ❌ | ✅ | ❌ | Staff match báo mất với tìm được thủ công |
| **UPLOAD & HÌNH ẢNH** | | | | |
| Upload ảnh | ✅ | ❌ | ✅ | Upload ảnh khi báo mất hoặc ghi nhận tìm được |
| Xóa ảnh | ✅ (của mình) | ❌ | ✅ (của mình) | Xóa ảnh đã upload |
| Xem ảnh | ✅ | ✅ | ✅ | Xem ảnh của báo cáo/vật dụng |
| Max 5 ảnh/báo cáo | ✅ | ✅ | ✅ | Giới hạn 5 ảnh, 5MB mỗi ảnh |
| **TRẢ ĐỒ VẬT** | | | | |
| Nhận thông báo trả | ✅ | ❌ | ❌ | Thông báo khi vật dụng sẵn sàng trả |
| Xem lịch sử trả của mình | ✅ | ❌ | ❌ | Xem các vật dụng đã nhận lại |
| Ghi nhận trả đồ | ❌ | ✅ | ✅ | Bảo vệ ghi nhận quá trình trả đồ |
| Xem danh sách trả | ❌ | ✅ | ❌ | Staff xem tất cả giao dịch trả |
| Cập nhật trả đồ | ❌ | ✅ | ✅ | Cập nhật trạng thái, ghi chú trả |
| Xác minh danh tính | ❌ | ❌ | ✅ | Bảo vệ kiểm tra FPTU ID sinh viên |
| Ghi nhận chữ ký/OTP | ❌ | ❌ | ✅ | Bảo vệ lưu chứng minh trả đồ |
| **XÉT DUYỆT & QUẢN LÝ** | | | | |
| Xác minh báo mất | ❌ | ✅ | ❌ | Staff kiểm tra tính hợp lệ báo cáo |
| Từ chối báo mất | ❌ | ✅ | ❌ | Staff từ chối báo cáo không hợp lệ |
| Ghi chú xác minh | ❌ | ✅ | ❌ | Staff ghi lý do xác minh/từ chối |
| Quản lý ưu tiên báo | ❌ | ✅ | ❌ | Staff đặt ưu tiên (cao/bình thường/thấp) |
| **BÁNG CÁO & THỐNG KÊ** | | | | |
| Xem dashboard | ❌ | ✅ | ❌ | Dashboard tổng hợp của Staff |
| Báo cáo theo loại | ❌ | ✅ | ❌ | Thống kê theo loại vật dụng |
| So sánh 2 campus | ❌ | ✅ | ❌ | So sánh metrics giữa NVH và SHTP |
| Báo cáo hàng tháng | ❌ | ✅ | ❌ | Báo cáo theo tháng |
| Báo cáo hàng tuần | ❌ | ✅ | ❌ | Báo cáo theo tuần |
| Thống kê chi tiết | ❌ | ✅ | ❌ | Thống kê thời gian trả, recovery rate |
| Xuất PDF/Excel | ❌ | ✅ | ❌ | Xuất báo cáo dưới dạng file |
| **THÔNG BÁO & LIÊN LẠC** | | | | |
| Nhận thông báo match | ✅ | ❌ | ❌ | Thông báo khi có match gợi ý |
| Nhận email thông báo | ✅ | ❌ | ✅ | Email thông báo quan trọng |
| Liên lạc với bảo vệ | ✅ | ❌ | ❌ | Sinh viên liên hệ bảo vệ để hẹn trả |
| Liên lạc với sinh viên | ❌ | ❌ | ✅ | Bảo vệ liên hệ sinh viên để xác minh |
| **QUẢN LÝ HỆ THỐNG** | | | | |
| Quản lý user | ❌ | ❌ | ❌ | Chỉ Admin có quyền này |
| Quản lý campus | ❌ | ✅ (view) | ✅ (view) | Xem thông tin campus |
| Quản lý loại vật dụng | ❌ | ✅ | ❌ | Staff quản lý danh mục loại |
| Audit log | ❌ | ✅ | ❌ | Xem lịch sử hoạt động hệ thống |
| **PROFILE & CÀI ĐẶT** | | | | |
| Xem profile | ✅ | ✅ | ✅ | Xem thông tin cá nhân |
| Cập nhật profile | ✅ | ✅ | ✅ | Sửa thông tin cá nhân |
| Đổi mật khẩu | ✅ | ✅ | ✅ | Thay đổi mật khẩu |
| Đăng xuất | ✅ | ✅ | ✅ | Thoát khỏi hệ thống |

---

## BẢNG TÓM TẮT SỐ LƯỢNG CHỨC NĂNG

| Metric | Student | Staff | Security Officer |
|---|---|---|---|
| **Tổng chức năng** | 15 | 27 | 18 |
| **Chức năng chính** | Báo + Tìm | Quản lý toàn bộ | Ghi nhận + Trả |
| **APIs có thể sử dụng** | 12/40 | 28/40 | 15/40 |
| **Có thể xem được** | ✅ Báo của mình | ✅ Toàn bộ | ✅ Campus của mình |
| **Có quyền xóa** | ❌ | ✅ | ✅ |
| **Có quyền sửa** | ✅ (của mình) | ✅ | ✅ (của mình) |
| **Quản lý dữ liệu** | Cá nhân | Toàn hệ thống | Campus riêng |

---

## PHÂN LOẠI THEO QUYỀN CHI TIẾT

### STUDENT (Sinh Viên) - 15 Chức Năng

**Mục tiêu:** Báo mất vật dụng, tìm kiếm, xác minh match, nhận lại đồ

**Chức năng chính:**
1. Báo mất vật dụng (POST /api/lost-items)
2. Xem báo cáo của mình (GET /api/lost-items/my-reports)
3. Cập nhật báo mất (PUT /api/lost-items/:id)
4. Tìm kiếm đồ tìm được (GET /api/found-items/search)
5. Upload ảnh (POST /api/upload/images)
6. Xem gợi ý match (GET /api/matching/suggestions)
7. Xác nhận match (POST /api/matching/:matchId/confirm)
8. Từ chối match (POST /api/matching/:matchId/reject)
9. Nhận thông báo
10. Xem lịch sử trả (GET /api/returns/my-transactions)
11. Xem profile (GET /api/users/profile)
12. Cập nhật profile (PUT /api/users/profile)
13. Đổi mật khẩu (POST /api/users/change-password)
14. Đăng xuất (POST /api/auth/logout)
15. Nhận email thông báo

### STAFF (Nhân Viên) - 27 Chức Năng

**Mục tiêu:** Quản lý toàn hệ thống, xác minh báo cáo, điều phối 2 campus, tạo báo cáo

**Chức năng chính:**
1. Xem tất cả báo mất (GET /api/lost-items)
2. Xác minh báo mất (PUT /api/lost-items/:id/verify)
3. Từ chối báo mất (PUT /api/lost-items/:id/reject)
4. Tìm kiếm báo mất (GET /api/lost-items/search)
5. Xem danh sách đồ tìm được (GET /api/found-items)
6. Tìm kiếm đồ tìm được (GET /api/found-items/search)
7. Xóa đồ tìm được (DELETE /api/found-items/:id)
8. Xem danh sách match (GET /api/matching)
9. Tạo match thủ công
10. Giải quyết match (PUT /api/matching/:matchId/resolve)
11. Xem danh sách trả (GET /api/returns)
12. Dashboard tổng hợp (GET /api/reports/dashboard)
13. Báo cáo theo loại (GET /api/reports/lost-by-category)
14. So sánh 2 campus (GET /api/reports/campus-comparison)
15. Báo cáo hàng tháng (GET /api/reports/monthly)
16. Báo cáo hàng tuần (GET /api/reports/weekly)
17. Thống kê chi tiết (GET /api/reports/statistics)
18. Xuất PDF/Excel (GET /api/reports/export)
19. Xem danh sách user (GET /api/users)
20. Cập nhật user (PUT /api/users/:userId)
21. Quản lý loại vật dụng
22. Xem thông tin campus
23. Xem audit log
24. Xem profile (GET /api/users/profile)
25. Cập nhật profile (PUT /api/users/profile)
26. Đổi mật khẩu (POST /api/users/change-password)
27. Đăng xuất (POST /api/auth/logout)

### SECURITY OFFICER (Bảo Vệ) - 18 Chức Năng

**Mục tiêu:** Ghi nhận tìm được, quản lý kho, trả đồ, xác minh danh tính

**Chức năng chính:**
1. Tạo báo tìm được (POST /api/found-items)
2. Xem danh sách đồ tìm được (GET /api/found-items) - campus của mình
3. Xem chi tiết đồ tìm được (GET /api/found-items/:id)
4. Cập nhật đồ tìm được (PUT /api/found-items/:id)
5. Tìm kiếm đồ tìm được (GET /api/found-items/search)
6. Quản lý kho lưu giữ (campus của mình)
7. Upload ảnh (POST /api/upload/images)
8. Xóa ảnh (DELETE /api/upload/images/:fileId)
9. Ghi nhận trả đồ (POST /api/returns)
10. Xem danh sách trả chi tiết (GET /api/returns/:transactionId)
11. Cập nhật trả đồ (PUT /api/returns/:transactionId)
12. Xác minh danh tính sinh viên
13. Ghi nhận chữ ký/OTP
14. Nhận email thông báo
15. Xem profile (GET /api/users/profile)
16. Cập nhật profile (PUT /api/users/profile)
17. Đổi mật khẩu (POST /api/users/change-password)
18. Đăng xuất (POST /api/auth/logout)

---

## MỨC ĐỘ QUYỀN HẠN

ADMIN (Cao nhất)
↓
STAFF (Quản lý + Xác minh + Báo cáo)
↓
SECURITY (Ghi nhận + Trả + Quản lý kho)
↓
STUDENT (Báo + Tìm + Xác minh match)
↓
Thấp nhất (Công khai: tìm kiếm)

---

## ĐIỂM NHẤN QUAN TRỌNG

### STUDENT (Sinh Viên)
✅ Chỉ được quản lý báo cáo của mình
✅ Có thể cập nhật/xóa báo của mình
✅ Tìm kiếm công khai vật dụng tìm được
✅ Xác minh match và nhận lại đồ
❌ Không được xem báo của người khác
❌ Không được ghi nhận vật dụng tìm được
❌ Không được trả đồ (bảo vệ thực hiện)

### STAFF (Nhân Viên)
✅ Quản lý toàn bộ báo mất từ sinh viên
✅ Toàn quyền điều phối giữa 2 campus
✅ Xác minh và từ chối báo cáo
✅ Tạo match thủ công
✅ Xuất báo cáo & thống kê
✅ Quản lý user (thêm/sửa/xóa)
✅ Xem audit log
❌ Không được ghi nhận vật dụng tìm được
❌ Không được trực tiếp trả đồ (bảo vệ thực hiện)

### SECURITY OFFICER (Bảo Vệ)
✅ Ghi nhận tất cả vật dụng tìm được tại campus
✅ Quản lý kho lưu giữ campus của mình
✅ Xác minh danh tính sinh viên
✅ Ghi nhận trả đồ
✅ Upload ảnh chất lượng cao
❌ Không được xem báo mất từ campus khác
❌ Không được xác minh báo mất
❌ Không được xem báo cáo/thống kê
❌ Chỉ quản lý campus của mình

---

## KẾ HOẠCH PHÂN CÔNG

| Công Việc | Người Phụ Trách | Quyền Cần |
|---|---|---|
| Báo mất vật dụng | Student | Tạo + Upload ảnh |
| Ghi nhận tìm được | Security | Tạo Found Item |
| Xác minh báo | Staff | Verify/Reject |
| Đối sánh | Staff | Create Match |
| Trả đồ | Security | Record Return |
| Báo cáo | Staff | Export Report |
| Kiểm duyệt | Admin | All permissions |

---

## BẢO MẬT DỮ LIỆU

| Loại Dữ Liệu | Student | Staff | Security |
|---|---|---|---|
| Báo của mình | ✅ Đầy đủ | ✅ Đầy đủ | ❌ |
| Báo của người khác | ❌ | ✅ Đầy đủ | ❌ |
| Vật dụng tại campus | ❌ | ✅ Tất cả | ✅ Campus riêng |
| Lịch sử trả cá nhân | ✅ Riêng mình | ✅ Tất cả | ❌ |
| Báo cáo hệ thống | ❌ | ✅ | ❌ |

---

## KẾT LUẬN

Hệ thống FPTU Lost & Found được thiết kế với **nguyên tắc bảo mật cao**:

- STUDENT có quyền quản lý riêng lẻ
- STAFF là quản lý trung ương
- SECURITY quản lý từng campus
- ADMIN toàn quyền hệ thống

**Điều này đảm bảo:**
✅ Bảo mật dữ liệu cá nhân
✅ Phân công rõ ràng
✅ Tránh lạm dụng quyền
✅ Giám sát hiệu quả
✅ Dễ dàng kiểm tra (audit log)

---

*Tài liệu được tạo ngày 4 tháng 12, 2025*
*Version 1.0*
