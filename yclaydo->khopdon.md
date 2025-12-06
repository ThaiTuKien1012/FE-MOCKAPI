Sinh viên nhấn "Yêu cầu lấy đồ"
         ↓
Frontend: POST /api/matching/claim
         ↓
Backend: Tạo MatchingRequest (status: pending)
         ↓
Staff xem trong "Quản Lý Khớp Đồ"
         ↓
Staff xác minh và quyết định
         ├─→ Resolve (chấp nhận)
         │      ↓
         │   Cập nhật status = "resolved"
         │      ↓
         │   Security tạo Return Transaction
         │      ↓
         │   Cập nhật FoundItem status = "returned"
         │      ↓
         │   Sinh viên nhận đồ
         │
         └─→ Reject (từ chối)
                ↓
             Cập nhật status = "rejected"
                ↓
             Thông báo cho sinh viên