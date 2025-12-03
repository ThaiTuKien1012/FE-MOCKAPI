# 📡 BẢNG API HOÀN CHỈNH 100% - 40 ENDPOINTS

## FPTU HCM Lost & Found Tracking System

**Ngày tạo:** 4 tháng 12, 2025  
**Tổng APIs:** 40  
**Phiên bản:** 1.0

---

## 📋 BẢNG TỔNG HỢP TẤT CẢ 40 APIs

| # | Method | Endpoint | Mô Tả | Auth | Role | Status |
|---|--------|----------|-------|------|------|--------|
| **AUTHENTICATION (4 APIs)** | | | | | | |
| 1 | POST | `/api/auth/register` | Đăng ký người dùng | ✗ | Public | 201 |
| 2 | POST | `/api/auth/login` | Đăng nhập | ✗ | Public | 200 |
| 3 | POST | `/api/auth/refresh` | Refresh token | ✓ | Any | 200 |
| 4 | POST | `/api/auth/logout` | Đăng xuất | ✓ | Any | 200 |
| **LOST ITEMS (6 APIs)** | | | | | | |
| 5 | POST | `/api/lost-items` | Báo mất vật dụng | ✓ | Student | 201 |
| 6 | GET | `/api/lost-items/:id` | Xem chi tiết báo mất | ✓ | Any | 200 |
| 7 | GET | `/api/lost-items/my-reports` | Xem báo cáo của tôi | ✓ | Student | 200 |
| 8 | PUT | `/api/lost-items/:id` | Cập nhật báo mất | ✓ | Student/Owner | 200 |
| 9 | DELETE | `/api/lost-items/:id` | Xóa báo mất | ✓ | Student/Owner\|Staff | 200 |
| 10 | GET | `/api/lost-items/search` | Tìm kiếm báo mất | ✗ | Public | 200 |
| **FOUND ITEMS (6 APIs)** | | | | | | |
| 11 | POST | `/api/found-items` | Ghi nhận tìm được | ✓ | Security | 201 |
| 12 | GET | `/api/found-items/:id` | Xem chi tiết đồ tìm được | ✓ | Any | 200 |
| 13 | GET | `/api/found-items` | Danh sách đồ tìm được | ✓ | Security\|Staff | 200 |
| 14 | PUT | `/api/found-items/:id` | Cập nhật đồ tìm được | ✓ | Security/Owner | 200 |
| 15 | DELETE | `/api/found-items/:id` | Xóa đồ tìm được | ✓ | Security\|Staff | 200 |
| 16 | GET | `/api/found-items/search` | Tìm kiếm đồ tìm được | ✗ | Public | 200 |
| **UPLOAD (2 APIs)** | | | | | | |
| 17 | POST | `/api/upload/images` | Upload ảnh | ✓ | Student\|Security | 201 |
| 18 | DELETE | `/api/upload/images/:fileId` | Xóa ảnh | ✓ | User/Owner | 200 |
| **MATCHING (5 APIs)** | | | | | | |
| 19 | GET | `/api/matching/suggestions` | Gợi ý match | ✓ | Student | 200 |
| 20 | POST | `/api/matching/:matchId/confirm` | Xác nhận match | ✓ | Student | 200 |
| 21 | POST | `/api/matching/:matchId/reject` | Từ chối match | ✓ | Student | 200 |
| 22 | GET | `/api/matching` | Danh sách match | ✓ | Staff | 200 |
| 23 | PUT | `/api/matching/:matchId/resolve` | Giải quyết match | ✓ | Staff | 200 |
| **RETURNS (5 APIs)** | | | | | | |
| 24 | POST | `/api/returns` | Ghi nhận trả đồ | ✓ | Security | 201 |
| 25 | GET | `/api/returns/:transactionId` | Chi tiết trả | ✓ | Any | 200 |
| 26 | GET | `/api/returns/my-transactions` | Lịch sử trả của tôi | ✓ | Student | 200 |
| 27 | GET | `/api/returns` | Danh sách trả (Staff) | ✓ | Staff | 200 |
| 28 | PUT | `/api/returns/:transactionId` | Cập nhật trả | ✓ | Security | 200 |
| **REPORTS (7 APIs)** | | | | | | |
| 29 | GET | `/api/reports/dashboard` | Dashboard tổng hợp | ✓ | Staff\|Admin | 200 |
| 30 | GET | `/api/reports/lost-by-category` | Báo cáo theo loại | ✓ | Staff | 200 |
| 31 | GET | `/api/reports/campus-comparison` | So sánh 2 campus | ✓ | Staff | 200 |
| 32 | GET | `/api/reports/monthly` | Báo cáo hàng tháng | ✓ | Staff\|Admin | 200 |
| 33 | GET | `/api/reports/weekly` | Báo cáo hàng tuần | ✓ | Staff | 200 |
| 34 | GET | `/api/reports/statistics` | Thống kê chi tiết | ✓ | Staff\|Admin | 200 |
| 35 | GET | `/api/reports/export` | Xuất PDF/Excel | ✓ | Staff\|Admin | 200 |
| **USERS (5 APIs)** | | | | | | |
| 36 | GET | `/api/users/profile` | Xem profile | ✓ | Any | 200 |
| 37 | PUT | `/api/users/profile` | Cập nhật profile | ✓ | User/Own | 200 |
| 38 | POST | `/api/users/change-password` | Đổi mật khẩu | ✓ | Any | 200 |
| 39 | GET | `/api/users` | Danh sách user | ✓ | Admin | 200 |
| 40 | PUT | `/api/users/:userId` | Cập nhật user | ✓ | Admin | 200 |

---

## 📝 CHI TIẾT TỪ API #1 ĐẾN #40

### 1️⃣ POST `/api/auth/register` - Đăng Ký

**Auth:** ✗ Public  
**Role:** Public  
**Status:** 201 Created

**Request Body:**
```json
{
  "userId": "sv001",
  "email": "sv001@fptu.edu.vn",
  "password": "SecurePass123!",
  "firstName": "Nguyễn",
  "lastName": "Văn A",
  "phone": "0901234567",
  "role": "student"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "sv001",
      "email": "sv001@fptu.edu.vn",
      "firstName": "Nguyễn",
      "lastName": "Văn A",
      "role": "student",
      "createdAt": "2025-12-04T00:15:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  },
  "message": "User registered successfully"
}
```

---

### 2️⃣ POST `/api/auth/login` - Đăng Nhập

**Auth:** ✗ Public  
**Role:** Public  
**Status:** 200 OK

**Request Body:**
```json
{
  "email": "sv001@fptu.edu.vn",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "sv001",
      "email": "sv001@fptu.edu.vn",
      "role": "student",
      "campus": "NVH"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
      "expiresIn": "7d"
    }
  }
}
```

---

### 3️⃣ POST `/api/auth/refresh` - Refresh Token

**Auth:** ✓ Required  
**Role:** Any  
**Status:** 200 OK

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "7d"
  }
}
```

---

### 4️⃣ POST `/api/auth/logout` - Đăng Xuất

**Auth:** ✓ Required  
**Role:** Any  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 5️⃣ POST `/api/lost-items` - Báo Mất Vật Dụng

**Auth:** ✓ Required  
**Role:** Student  
**Status:** 201 Created

**Request Body:**
```json
{
  "itemName": "Điện thoại iPhone 13",
  "description": "Mặt lưng xước, bao da đỏ",
  "category": "PHONE",
  "color": "Black",
  "features": ["Vết xước mặt sau", "Bao da đỏ"],
  "dateLost": "2025-12-03T14:30:00Z",
  "locationLost": "Phòng A101, Tầng 1, Building A",
  "campus": "NVH",
  "images": ["url1", "url2", "url3"],
  "phone": "0901234567"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "reportId": "LF-NVH-2025-001",
    "studentId": "sv001",
    "itemName": "Điện thoại iPhone 13",
    "status": "pending",
    "priority": "normal",
    "createdAt": "2025-12-04T14:35:00Z"
  },
  "message": "Report created successfully"
}
```

---

### 6️⃣ GET `/api/lost-items/:id` - Xem Chi Tiết Báo Mất

**Auth:** ✓ Required  
**Role:** Any  
**Status:** 200 OK

**URL Params:**
```
:id = LF-NVH-2025-001
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reportId": "LF-NVH-2025-001",
    "studentId": "sv001",
    "itemName": "Điện thoại iPhone 13",
    "description": "Mặt lưng xước, bao da đỏ",
    "category": "PHONE",
    "color": "Black",
    "features": ["Vết xước mặt sau", "Bao da đỏ"],
    "dateLost": "2025-12-03T14:30:00Z",
    "locationLost": "Phòng A101, Tầng 1",
    "campus": "NVH",
    "status": "verified",
    "priority": "high",
    "images": ["url1", "url2", "url3"],
    "verifiedBy": "staff001",
    "verifiedAt": "2025-12-03T15:00:00Z",
    "matchedWithFoundId": "FF-NVH-2025-005",
    "returnedAt": "2025-12-05T10:30:00Z",
    "createdAt": "2025-12-03T14:35:00Z"
  }
}
```

---

### 7️⃣ GET `/api/lost-items/my-reports` - Xem Báo Cáo Của Tôi

**Auth:** ✓ Required  
**Role:** Student  
**Status:** 200 OK

**Query Params:**
```
?status=verified&campus=NVH&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "reportId": "LF-NVH-2025-001",
      "itemName": "Điện thoại iPhone 13",
      "category": "PHONE",
      "status": "verified",
      "priority": "high",
      "campus": "NVH",
      "dateLost": "2025-12-03T14:30:00Z",
      "createdAt": "2025-12-03T14:35:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

---

### 8️⃣ PUT `/api/lost-items/:id` - Cập Nhật Báo Mất

**Auth:** ✓ Required  
**Role:** Student (Owner)  
**Status:** 200 OK

**Request Body:**
```json
{
  "description": "Mặt lưng xước nhiều, bao da đỏ",
  "features": ["Vết xước lớn mặt sau", "Bao da đỏ", "Pin yếu"],
  "images": ["url1", "url2", "url3", "url4"]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reportId": "LF-NVH-2025-001",
    "description": "Mặt lưng xước nhiều, bao da đỏ",
    "features": ["Vết xước lớn mặt sau", "Bao da đỏ", "Pin yếu"],
    "updatedAt": "2025-12-04T10:20:00Z"
  },
  "message": "Report updated successfully"
}
```

---

### 9️⃣ DELETE `/api/lost-items/:id` - Xóa Báo Mất

**Auth:** ✓ Required  
**Role:** Student (Owner) | Staff  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "message": "Report deleted successfully"
}
```

---

### 🔟 GET `/api/lost-items/search` - Tìm Kiếm Báo Mất

**Auth:** ✗ Public  
**Role:** Public  
**Status:** 200 OK

**Query Params:**
```
?keyword=iPhone&category=PHONE&campus=NVH&page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "reportId": "LF-NVH-2025-001",
      "itemName": "Điện thoại iPhone 13",
      "category": "PHONE",
      "color": "Black",
      "campus": "NVH",
      "status": "verified",
      "dateLost": "2025-12-03T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

---

### 1️⃣1️⃣ POST `/api/found-items` - Ghi Nhận Tìm Được

**Auth:** ✓ Required  
**Role:** Security Officer  
**Status:** 201 Created

**Request Body:**
```json
{
  "itemName": "Điện thoại màu đen",
  "description": "Có vết xước phía sau, bao da đỏ",
  "category": "PHONE",
  "color": "Black",
  "condition": "good",
  "campus": "NVH",
  "dateFound": "2025-12-04T09:00:00Z",
  "locationFound": "Quầy tiếp tân",
  "images": ["url1", "url2"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "foundId": "FF-NVH-2025-005",
    "itemName": "Điện thoại màu đen",
    "campus": "NVH",
    "status": "unclaimed",
    "condition": "good",
    "createdAt": "2025-12-04T09:15:00Z"
  },
  "message": "Found item recorded successfully"
}
```

---

### 1️⃣2️⃣ GET `/api/found-items/:id` - Xem Chi Tiết Đồ Tìm Được

**Auth:** ✓ Required  
**Role:** Any  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "data": {
    "foundId": "FF-NVH-2025-005",
    "itemName": "Điện thoại màu đen",
    "category": "PHONE",
    "color": "Black",
    "campus": "NVH",
    "condition": "good",
    "status": "returned",
    "dateFound": "2025-12-04T09:00:00Z",
    "locationFound": "Quầy tiếp tân",
    "warehouseLocation": "Kệ A-01",
    "images": ["url1", "url2"],
    "returnedToStudent": {
      "studentId": "sv001",
      "returnedDate": "2025-12-05T10:30:00Z",
      "returnedBy": "sec001"
    },
    "createdAt": "2025-12-04T09:15:00Z"
  }
}
```

---

### 1️⃣3️⃣ GET `/api/found-items` - Danh Sách Đồ Tìm Được

**Auth:** ✓ Required  
**Role:** Security, Staff  
**Status:** 200 OK

**Query Params:**
```
?campus=NVH&status=unclaimed&page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "foundId": "FF-NVH-2025-005",
      "itemName": "Điện thoại màu đen",
      "category": "PHONE",
      "campus": "NVH",
      "status": "unclaimed",
      "dateFound": "2025-12-04T09:00:00Z"
    }
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

---

### 1️⃣4️⃣ PUT `/api/found-items/:id` - Cập Nhật Đồ Tìm Được

**Auth:** ✓ Required  
**Role:** Security (Owner)  
**Status:** 200 OK

**Request Body:**
```json
{
  "condition": "slightly_damaged",
  "warehouseLocation": "Kệ A-02",
  "notes": "Found in admin office"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "foundId": "FF-NVH-2025-005",
    "condition": "slightly_damaged",
    "warehouseLocation": "Kệ A-02",
    "updatedAt": "2025-12-04T10:00:00Z"
  }
}
```

---

### 1️⃣5️⃣ DELETE `/api/found-items/:id` - Xóa Đồ Tìm Được

**Auth:** ✓ Required  
**Role:** Security | Staff  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "message": "Found item deleted successfully"
}
```

---

### 1️⃣6️⃣ GET `/api/found-items/search` - Tìm Kiếm Đồ Tìm Được

**Auth:** ✗ Public  
**Role:** Public  
**Status:** 200 OK

**Query Params:**
```
?keyword=điện thoại&category=PHONE&campus=NVH
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "foundId": "FF-NVH-2025-005",
      "itemName": "Điện thoại màu đen",
      "category": "PHONE",
      "campus": "NVH",
      "status": "unclaimed"
    }
  ]
}
```

---

### 1️⃣7️⃣ POST `/api/upload/images` - Upload Ảnh

**Auth:** ✓ Required  
**Role:** Student, Security  
**Status:** 201 Created

**Request:**
- Content-Type: multipart/form-data
- Max: 5 files, 5MB each

**Response (201):**
```json
{
  "success": true,
  "data": {
    "urls": [
      "https://cdn.example.com/image1.jpg",
      "https://cdn.example.com/image2.jpg"
    ],
    "fileIds": ["file-id-1", "file-id-2"]
  },
  "message": "Images uploaded successfully"
}
```

---

### 1️⃣8️⃣ DELETE `/api/upload/images/:fileId` - Xóa Ảnh

**Auth:** ✓ Required  
**Role:** User (Owner)  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

### 1️⃣9️⃣ GET `/api/matching/suggestions` - Gợi Ý Match

**Auth:** ✓ Required  
**Role:** Student  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "matchId": "MR-2025-001",
      "foundItemId": "FF-NVH-2025-005",
      "itemName": "Điện thoại màu đen",
      "matchConfidence": 95,
      "matchReason": "Khớp 100% về loại, màu, đặc điểm",
      "dateFound": "2025-12-04T09:00:00Z"
    }
  ]
}
```

---

### 2️⃣0️⃣ POST `/api/matching/:matchId/confirm` - Xác Nhận Match

**Auth:** ✓ Required  
**Role:** Student  
**Status:** 200 OK

**Request Body:**
```json
{
  "confirmation": "yes",
  "notes": "Chắc chắn đó là đồ của tôi"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "matchId": "MR-2025-001",
    "status": "confirmed",
    "studentResponse": "confirmed",
    "confirmedAt": "2025-12-04T09:30:00Z"
  },
  "message": "Match confirmed successfully"
}
```

---

### 2️⃣1️⃣ POST `/api/matching/:matchId/reject` - Từ Chối Match

**Auth:** ✓ Required  
**Role:** Student  
**Status:** 200 OK

**Request Body:**
```json
{
  "reason": "Màu sắc không khớp"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "matchId": "MR-2025-001",
    "status": "rejected",
    "studentResponse": "rejected",
    "rejectionReason": "Màu sắc không khớp"
  }
}
```

---

### 2️⃣2️⃣ GET `/api/matching` - Danh Sách Match

**Auth:** ✓ Required  
**Role:** Staff  
**Status:** 200 OK

**Query Params:**
```
?status=confirmed&page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "matchId": "MR-2025-001",
      "lostItemId": "LF-NVH-2025-001",
      "foundItemId": "FF-NVH-2025-005",
      "status": "confirmed",
      "matchConfidence": 95,
      "createdAt": "2025-12-04T08:00:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1
  }
}
```

---

### 2️⃣3️⃣ PUT `/api/matching/:matchId/resolve` - Giải Quyết Match

**Auth:** ✓ Required  
**Role:** Staff  
**Status:** 200 OK

**Request Body:**
```json
{
  "status": "resolved",
  "notes": "Completed - Student picked up at 10:30 AM"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "matchId": "MR-2025-001",
    "status": "resolved",
    "resolvedAt": "2025-12-04T10:00:00Z"
  }
}
```

---

### 2️⃣4️⃣ POST `/api/returns` - Ghi Nhận Trả Đồ

**Auth:** ✓ Required  
**Role:** Security Officer  
**Status:** 201 Created

**Request Body:**
```json
{
  "foundItemId": "FF-NVH-2025-005",
  "studentId": "sv001",
  "campus": "NVH",
  "returnDetails": {
    "returnedDate": "2025-12-05T10:30:00Z",
    "verificationMethod": "signature",
    "condition": "good"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "transactionId": "RT-2025-001",
    "foundItemId": "FF-NVH-2025-005",
    "studentId": "sv001",
    "campus": "NVH",
    "returnedDate": "2025-12-05T10:30:00Z",
    "status": "completed",
    "createdAt": "2025-12-05T10:30:00Z"
  }
}
```

---

### 2️⃣5️⃣ GET `/api/returns/:transactionId` - Chi Tiết Trả

**Auth:** ✓ Required  
**Role:** Any  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactionId": "RT-2025-001",
    "lostItemId": "LF-NVH-2025-001",
    "foundItemId": "FF-NVH-2025-005",
    "studentId": "sv001",
    "securityOfficerId": "sec001",
    "campus": "NVH",
    "returnedDate": "2025-12-05T10:30:00Z",
    "verificationMethod": "signature",
    "condition": "good",
    "notes": "Perfect condition",
    "createdAt": "2025-12-05T10:30:00Z"
  }
}
```

---

### 2️⃣6️⃣ GET `/api/returns/my-transactions` - Lịch Sử Trả Của Tôi

**Auth:** ✓ Required  
**Role:** Student  
**Status:** 200 OK

**Query Params:**
```
?page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "transactionId": "RT-2025-001",
      "itemName": "Điện thoại iPhone 13",
      "returnedDate": "2025-12-05T10:30:00Z",
      "campus": "NVH",
      "status": "completed"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1
  }
}
```

---

### 2️⃣7️⃣ GET `/api/returns` - Danh Sách Trả (Staff)

**Auth:** ✓ Required  
**Role:** Staff  
**Status:** 200 OK

**Query Params:**
```
?campus=NVH&date=2025-12&page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "transactionId": "RT-2025-001",
      "studentId": "sv001",
      "foundItemId": "FF-NVH-2025-005",
      "campus": "NVH",
      "returnedDate": "2025-12-05T10:30:00Z",
      "status": "completed"
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1
  }
}
```

---

### 2️⃣8️⃣ PUT `/api/returns/:transactionId` - Cập Nhật Trả

**Auth:** ✓ Required  
**Role:** Security Officer  
**Status:** 200 OK

**Request Body:**
```json
{
  "condition": "slightly_damaged",
  "notes": "Small scratch on screen"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactionId": "RT-2025-001",
    "condition": "slightly_damaged",
    "notes": "Small scratch on screen",
    "updatedAt": "2025-12-05T11:00:00Z"
  }
}
```

---

### 2️⃣9️⃣ GET `/api/reports/dashboard` - Dashboard Tổng Hợp

**Auth:** ✓ Required  
**Role:** Staff, Admin  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalLost": 150,
    "totalFound": 120,
    "totalReturned": 100,
    "recoveryRate": "80%",
    "pendingVerification": 10,
    "activeMatches": 8,
    "overdueClaims": 2,
    "campusStats": {
      "NVH": {
        "lost": 90,
        "found": 70,
        "returned": 65
      },
      "SHTP": {
        "lost": 60,
        "found": 50,
        "returned": 45
      }
    }
  }
}
```

---

### 3️⃣0️⃣ GET `/api/reports/lost-by-category` - Báo Cáo Theo Loại

**Auth:** ✓ Required  
**Role:** Staff  
**Status:** 200 OK

**Query Params:**
```
?startDate=2025-12-01&endDate=2025-12-31&campus=NVH
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "category": "PHONE",
      "count": 45,
      "recovered": 38,
      "recoveryRate": "84%"
    },
    {
      "category": "WALLET",
      "count": 30,
      "recovered": 25,
      "recoveryRate": "83%"
    },
    {
      "category": "BAG",
      "count": 25,
      "recovered": 20,
      "recoveryRate": "80%"
    }
  ]
}
```

---

### 3️⃣1️⃣ GET `/api/reports/campus-comparison` - So Sánh 2 Campus

**Auth:** ✓ Required  
**Role:** Staff  
**Status:** 200 OK

**Query Params:**
```
?startDate=2025-12-01&endDate=2025-12-31
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "NVH": {
      "reported": 90,
      "found": 70,
      "returned": 65,
      "avgTimeToReturn": "3.2 days",
      "recoveryRate": "77.8%"
    },
    "SHTP": {
      "reported": 60,
      "found": 50,
      "returned": 45,
      "avgTimeToReturn": "2.8 days",
      "recoveryRate": "83.3%"
    }
  }
}
```

---

### 3️⃣2️⃣ GET `/api/reports/monthly` - Báo Cáo Hàng Tháng

**Auth:** ✓ Required  
**Role:** Staff, Admin  
**Status:** 200 OK

**Query Params:**
```
?year=2025&month=12&campus=NVH
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "month": "December 2025",
    "campus": "NVH",
    "reported": 15,
    "found": 12,
    "returned": 10,
    "avgTimeToReturn": "3.1 days",
    "recoveryRate": "80%"
  }
}
```

---

### 3️⃣3️⃣ GET `/api/reports/weekly` - Báo Cáo Hàng Tuần

**Auth:** ✓ Required  
**Role:** Staff  
**Status:** 200 OK

**Query Params:**
```
?week=49&year=2025
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "week": "Week 49, 2025",
    "dateRange": "2025-12-01 to 2025-12-07",
    "reported": 5,
    "found": 4,
    "returned": 3,
    "newMatches": 2,
    "resolvedMatches": 1
  }
}
```

---

### 3️⃣4️⃣ GET `/api/reports/statistics` - Thống Kê Chi Tiết

**Auth:** ✓ Required  
**Role:** Staff, Admin  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalReports": 150,
    "verifiedReports": 140,
    "rejectedReports": 5,
    "pendingReports": 5,
    "averageTimeToMatch": "2.5 days",
    "averageTimeToReturn": "3.0 days",
    "matchSuccessRate": "80%",
    "topCategories": ["PHONE", "WALLET", "BAG"],
    "topLocations": ["Quầy tiếp tân", "Phòng học", "Thư viện"]
  }
}
```

---

### 3️⃣5️⃣ GET `/api/reports/export` - Xuất PDF/Excel

**Auth:** ✓ Required  
**Role:** Staff, Admin  
**Status:** 200 OK

**Query Params:**
```
?format=excel&startDate=2025-12-01&endDate=2025-12-31
```

**Response (200):**
```
Binary file content (Excel/PDF)
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

---

### 3️⃣6️⃣ GET `/api/users/profile` - Xem Profile

**Auth:** ✓ Required  
**Role:** Any  
**Status:** 200 OK

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "sv001",
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "email": "sv001@fptu.edu.vn",
    "phone": "0901234567",
    "role": "student",
    "campus": "NVH",
    "profileImage": "url",
    "createdAt": "2025-01-15T08:00:00Z",
    "lastLogin": "2025-12-04T12:00:00Z"
  }
}
```

---

### 3️⃣7️⃣ PUT `/api/users/profile` - Cập Nhật Profile

**Auth:** ✓ Required  
**Role:** User (Own)  
**Status:** 200 OK

**Request Body:**
```json
{
  "firstName": "Nguyễn",
  "lastName": "Văn A",
  "phone": "0987654321"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "sv001",
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "phone": "0987654321",
    "updatedAt": "2025-12-04T12:30:00Z"
  }
}
```

---

### 3️⃣8️⃣ POST `/api/users/change-password` - Đổi Mật Khẩu

**Auth:** ✓ Required  
**Role:** Any  
**Status:** 200 OK

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 3️⃣9️⃣ GET `/api/users` - Danh Sách User

**Auth:** ✓ Required  
**Role:** Admin  
**Status:** 200 OK

**Query Params:**
```
?role=student&campus=NVH&page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "userId": "sv001",
      "email": "sv001@fptu.edu.vn",
      "firstName": "Nguyễn",
      "lastName": "Văn A",
      "role": "student",
      "campus": "NVH",
      "isActive": true,
      "createdAt": "2025-01-15T08:00:00Z"
    }
  ],
  "pagination": {
    "total": 500,
    "page": 1,
    "limit": 20,
    "pages": 25
  }
}
```

---

### 4️⃣0️⃣ PUT `/api/users/:userId` - Cập Nhật User

**Auth:** ✓ Required  
**Role:** Admin  
**Status:** 200 OK

**Request Body:**
```json
{
  "role": "staff",
  "campus": "NVH",
  "isActive": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "sv001",
    "role": "staff",
    "campus": "NVH",
    "isActive": true,
    "updatedAt": "2025-12-04T13:00:00Z"
  },
  "message": "User updated successfully"
}
```

---

## 📊 BẢNG TÓM TẮT 40 APIs

| Danh Mục | Số API | Tổng |
|---|---|---|
| **Authentication** | 4 | 4 |
| **Lost Items** | 6 | 10 |
| **Found Items** | 6 | 16 |
| **Upload** | 2 | 18 |
| **Matching** | 5 | 23 |
| **Returns** | 5 | 28 |
| **Reports** | 7 | 35 |
| **Users** | 5 | **40** |

---

## 🔐 AUTHORIZATION SUMMARY

### Public APIs (3)
- GET /api/lost-items/search
- GET /api/found-items/search
- Any /api/auth/* (register, login)

### Authenticated APIs (37)
- Student: 12 APIs
- Staff: 28 APIs
- Security: 15 APIs
- Admin: 5 APIs

---

## ✅ COMPLETE CHECKLIST

- ✅ 40 APIs đầy đủ
- ✅ Chi tiết Request/Response
- ✅ Quyền hạn theo Role
- ✅ HTTP Status Codes
- ✅ Query Params
- ✅ URL Params
- ✅ Request/Response Examples
- ✅ 100% Coverage

---

*Tài liệu được tạo ngày 4 tháng 12, 2025*
*Version 1.0 - FPTU Lost & Found System*
