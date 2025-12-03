# 📚 Swagger API Documentation

## Truy cập Swagger UI

Sau khi khởi động server, truy cập Swagger UI tại:

```
http://localhost:5000/api-docs
```

## Cấu trúc Documentation

### Tags (Nhóm API)

1. **Authentication** - Đăng ký, đăng nhập, refresh token
2. **Lost Items** - Báo mất vật dụng
3. **Found Items** - Đồ tìm được
4. **Upload** - Upload ảnh
5. **Matching** - Khớp đồ
6. **Returns** - Trả đồ
7. **Reports** - Báo cáo và thống kê
8. **Users** - Quản lý người dùng

## Sử dụng Swagger UI

### 1. Xem tất cả APIs

Swagger UI hiển thị tất cả 40 endpoints được nhóm theo tags.

### 2. Test API trực tiếp

1. Click vào endpoint muốn test
2. Click "Try it out"
3. Điền thông tin vào request body (nếu có)
4. Click "Execute"
5. Xem response

### 3. Authentication

Để test các protected endpoints:

1. Đăng nhập qua `/api/auth/login` để lấy token
2. Copy `accessToken` từ response
3. Click nút "Authorize" ở đầu trang Swagger
4. Nhập token: `Bearer <your-token>`
5. Click "Authorize"
6. Bây giờ có thể test các protected endpoints

## Thêm Documentation cho Endpoint mới

Thêm JSDoc comments vào route file:

```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Mô tả ngắn gọn
 *     tags: [Your Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: param
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/your-endpoint', controller);
```

## Schemas

Các schemas đã được định nghĩa:
- `User` - Thông tin người dùng
- `LostItem` - Báo mất
- `FoundItem` - Đồ tìm được
- `Error` - Lỗi
- `Success` - Thành công

## Lưu ý

- Swagger UI chỉ hoạt động trong môi trường development
- Đảm bảo server đang chạy trên port 5000
- Token JWT có thời hạn, cần refresh nếu hết hạn

