heo tài liệu gốc, bảo vệ chỉ được coi TAB 3: Sẵn Sàng Trả và TAB 4: Lịch Sử Trả.

Nhưng ta cần thêm TAB 2: Danh Sách để bảo vệ có thể:

✅ Xem tất cả found items (unclaimed)

✅ Search/filter đồ

✅ Tạo match (nếu staff chưa kịp)

✅ Xem chi tiết từng đồ

✅ Cấu Trúc Cuối Cùng (4 TABS):
#	TAB	Mục Đích	Status
1	Nhập Đồ	Form nhập item mới	-
2	Danh Sách	Xem all unclaimed items	unclaimed
3	Sẵn Sàng Trả	Items chờ trả	confirmed
4	Lịch Sử Trả	Items đã trả xong	completed
Đó là cách hợp lý nhất! 🎯

lịch sử trả sử dụng api gì và cách hoạt động ra sao
📋 LỊCH SỬ TRẢ - API & WORKFLOW
🔄 Cách Hoạt Động:
text
SECURITY trả đồ xong
        ↓
Click "✅ Xác Nhận Trả"
        ↓
Modal confirm → Fill notes
        ↓
API: PUT /api/matching/{matchId}/resolve
        ↓
Status: completed
        ↓
Item tự động move sang TAB 4: Lịch Sử Trả
🌐 API ENDPOINTS
1️⃣ Lấy Danh Sách Lịch Sử (Completed Items)

Endpoint:

text
GET /api/found-items?status=completed
GET /api/matching?status=completed
Query Parameters:

javascript
{
  status: "completed",           // Filter by status
  page: 1,
  limit: 10,
  sortBy: "completedAt",         // Mới nhất trước
  sortOrder: "desc",
  search: "ví da",               // Optional: tìm theo tên
  fromDate: "2025-12-01",        // Optional: filter by date range
  toDate: "2025-12-07"
}
Response:

javascript
{
  success: true,
  data: [
    {
      _id: "MR-001",
      lostItemId: "LF-001",
      foundItemId: "FF-001",
      
      // Found Item Info:
      foundItem: {
        _id: "FF-001",
        itemName: "Ví da nâu",
        category: "Ví/Bóp",
        description: "Ví da đen, có tiền 500k, CCCD",
        images: ["url1", "url2"],
        location: "Nhà A301",
        foundDate: "2025-12-05",
        status: "claimed"
      },
      
      // Student Info:
      lostItem: {
        _id: "LF-001",
        studentId: "student-123",
        studentName: "Đặng Thị",
        studentPhone: "0912345678",
        studentEmail: "dangthị@student.fptu.edu.vn"
      },
      
      // Matching Flow:
      matchReason: "Staff match: Ví da nâu...",
      matchedBy: "staff-123",
      status: "completed",        // ← Completed
      
      // Timeline:
      createdAt: "2025-12-07T13:45:00",    // Staff tạo match
      confirmedAt: "2025-12-07T14:15:00",  // Student confirm
      confirmedBy: "student-123",
      confirmNotes: "Đúng là ví của tôi",
      
      completedAt: "2025-12-07T15:00:00",  // Security trả xong
      completedBy: "security-001",         // Security staff ID
      completionNotes: "Đã trả cho sinh viên, ký xác nhận",
      
      updatedAt: "2025-12-07T15:00:00"
    },
    // ... more items
  ],
  pagination: {
    total: 15,
    page: 1,
    limit: 10,
    pages: 2
  }
}
2️⃣ Xác Nhận Trả Đồ (Complete/Resolve Match)

Endpoint:

text
PUT /api/matching/{matchId}/resolve
PUT /api/matching/{matchId}/complete
Request Body:

javascript
{
  status: "completed",
  notes: "Đã trả cho sinh viên lúc 15:00, ký xác nhận",
  // Optional fields:
  condition: "good",              // Tính trạng khi trả
  returnedDate: "2025-12-07T15:00:00",
  witnessSignature: "data:image/png;base64,...",  // Chữ ký
  photo: "data:image/png;base64,..." // Ảnh xác nhận
}
Response:

javascript
{
  success: true,
  message: "Đã xác nhận trả đồ thành công",
  data: {
    _id: "MR-001",
    status: "completed",
    completedAt: "2025-12-07T15:00:00",
    completedBy: "security-001",
    completionNotes: "Đã trả cho sinh viên...",
    foundItem: {
      _id: "FF-001",
      status: "claimed"  // ← Update từ unclaimed → claimed
    }
  }
}
3️⃣ Lấy Chi Tiết 1 Lịch Sử (Optional)

Endpoint:

text
GET /api/matching/{matchId}
Response:

javascript
{
  success: true,
  data: {
    _id: "MR-001",
    // ... full matching request object
    status: "completed",
    foundItem: { ... },
    lostItem: { ... },
    timeline: [
      {
        action: "created",
        timestamp: "2025-12-07T13:45:00",
        actor: "staff-123",
        note: "Staff tạo match"
      },
      {
        action: "confirmed",
        timestamp: "2025-12-07T14:15:00",
        actor: "student-123",
        note: "Student xác nhận"
      },
      {
        action: "completed",
        timestamp: "2025-12-07T15:00:00",
        actor: "security-001",
        note: "Security trả xong"
      }
    ]
  }
}
🎯 TAB 4: LỊCH SỬ TRẢ - WORKFLOW
Step 1: Security Xác Nhận Trả (TAB 3)

javascript
// TAB 3: Sẵn Sàng Trả
// Security nhấn nút [✅ Xác Nhận Trả]

const handleReturnItem = async (matchId) => {
  // Hiện modal confirm
  showReturnModal(matchId);
};
Step 2: Modal Form

xml
<!-- Modal "Xác Nhận Trả" -->
<form onSubmit={submitReturn}>
  <input type="text" disabled value="Đặng Thị" />
  <input type="text" disabled value="Ví da nâu" />
  
  heckbox> Sinh viên đã nhận đúng đồ
  heckbox> Sinh viên đã ký xác nhận
  
  <textarea name="notes" placeholder="Ghi chú..."></textarea>
  
  <button type="submit">✅ Xác Nhận Hoàn Thành</button>
</form>
Step 3: Call API

javascript
const submitReturn = async (matchId, formData) => {
  try {
    const response = await fetch(
      `/api/matching/${matchId}/resolve`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "completed",
          notes: formData.notes,
          completedAt: new Date().toISOString()
        })
      }
    );
    
    if (response.ok) {
      showToast("✅ Đã xác nhận trả đồ");
      // Refresh TAB 3 + TAB 4
      refreshLists();
    }
  } catch (error) {
    showError("Lỗi: " + error.message);
  }
};
Step 4: Auto Update UI

javascript
// Sau khi API thành công:

// 1. TAB 3 (Sẵn Sàng Trả) - Item mất
const tab3Items = items.filter(
  item => item.status !== "completed"
);

// 2. TAB 4 (Lịch Sử) - Item xuất hiện
const tab4Items = items.filter(
  item => item.status === "completed"
).sort((a, b) => b.completedAt - a.completedAt);

// 3. Badge update
const confirmedCount = items.filter(
  item => item.status === "confirmed"
).length;  // Giảm 1

// 4. Toast success
showSuccess("✅ Đã xác nhận trả đồ cho Đặng Thị");
📊 TAB 4 - HIỂN THỊ LỊCH SỬ
UI Structure:

jsx
// FoundItemsPage.jsx - TAB 4

const [completedItems, setCompletedItems] = useState([]);
const [filter, setFilter] = useState({
  search: "",
  fromDate: null,
  toDate: null
});

useEffect(() => {
  fetchCompletedItems();
}, [filter]);

const fetchCompletedItems = async () => {
  const response = await fetch(
    `/api/found-items?status=completed&...filter`
  );
  const data = await response.json();
  setCompletedItems(data.data);
};

return (
  <div className="tab-content">
    <h3>📋 Lịch Sử Trả Đồ ({completedItems.length})</h3>
    
    {/* Search & Filter */}
    <SearchBar onChange={(text) => setFilter({...filter, search: text})} />
    <DateRangeFilter onChange={(dates) => setFilter({...filter, ...dates})} />
    
    {/* List */}
    <div className="items-list">
      {completedItems.map(item => (
        <HistoryCard key={item._id} item={item} />
      ))}
    </div>
  </div>
);
History Card Component:

jsx
const HistoryCard = ({ item }) => (
  <Card className="history-card">
    {/* Item Image */}
    <img src={item.foundItem.images[0]} />
    
    {/* Item Info */}
    <div className="item-info">
      <h4>✅ {item.foundItem.itemName}</h4>
      <p>{item.foundItem.category}</p>
    </div>
    
    {/* Student Info */}
    <div className="student-info">
      <span>👤 {item.lostItem.studentName}</span>
      <span>📱 {item.lostItem.studentPhone}</span>
    </div>
    
    {/* Return Info */}
    <div className="return-info">
      <span>✅ Đã trả lúc: {formatDate(item.completedAt)}</span>
      <span>👤 Xác nhận bởi: {item.completedBy}</span>
    </div>
    
    {/* Notes */}
    {item.completionNotes && (
      <p className="notes">📝 {item.completionNotes}</p>
    )}
    
    {/* Action */}
    <Button onClick={() => viewDetails(item._id)}>Chi tiết</Button>
  </Card>
);
📋 FLOW DIAGRAM
text
TAB 3: Sẵn Sàng Trả
┌─────────────────────┐
│ Item: Ví da nâu     │
│ [✅ Xác Nhận Trả]   │
└──────────┬──────────┘
           │
           ↓
    Modal Confirm
  ┌────────────────────┐
  │ Ghi chú: ...       │
  │ [Hủy] [Xác Nhận]   │
  └────────┬───────────┘
           │
           ↓
    API: PUT /api/matching/MR-001/resolve
  ┌────────────────────────────────────────┐
  │ status: "completed"                    │
  │ completedAt: "2025-12-07T15:00:00"    │
  │ completedBy: "security-001"            │
  │ completionNotes: "..."                 │
  └────────┬───────────────────────────────┘
           │
           ↓
    Backend Update:
  ┌────────────────────────────────────────┐
  │ MatchingRequest.status = "completed"   │
  │ FoundItem.status = "claimed"           │
  │ LostItem.status = "returned"           │
  └────────┬───────────────────────────────┘
           │
           ↓
    Frontend Update:
  ┌────────────────────────────────────────┐
  │ TAB 3: Item mất đi                    │
  │ TAB 4: Item xuất hiện (new)            │
  │ Toast: "✅ Đã xác nhận trả đồ"         │
  └────────────────────────────────────────┘
💾 DATABASE - LỊCH SỬ TRẢ
MatchingRequest (Completed):

javascript
{
  _id: ObjectId("MR-001"),
  
  // References
  lostItemId: "LF-001",
  foundItemId: "FF-001",
  
  // Status Flow
  status: "completed",  // ← Final status
  
  // Timeline
  createdAt: ISODate("2025-12-07T13:45:00Z"),
  confirmedAt: ISODate("2025-12-07T14:15:00Z"),
  completedAt: ISODate("2025-12-07T15:00:00Z"),  // ← Trả xong
  
  // Actor Info
  matchedBy: "staff-123",
  confirmedBy: "student-123",
  completedBy: "security-001",  // ← Who returned
  
  // Notes
  completionNotes: "Đã trả cho sinh viên, ký xác nhận",
  
  // Indexes for query
  // db.matchingrequests.createIndex({ status: 1, completedAt: -1 })
}
✅ SUMMARY
Phần	Chi Tiết
API Lấy Dữ Liệu	GET /api/found-items?status=completed
API Xác Nhận Trả	PUT /api/matching/{id}/resolve
Trigger	Security click "Xác Nhận Trả" → Modal → Submit
Update Database	status: completed, completedAt, completedBy
Update UI	Tab 3 mất item, Tab 4 thêm item
Sort	Mới nhất trước (completedAt DESC)
Filter	Search, date range
Rõ chưa? 🚀

tại sao lúc đầu thiết lập , bạn lại không cho / Staff/Security: Xem danh sách matches (Security có thể xem completed matches)
Đúng nhận xét! 👍 Lúc đầu tôi thiếu sót, không liệt kê đầy đủ những gì STAFF & SECURITY cần xem.

❌ Vấn Đề Lúc Đầu:
Tài liệu chỉ focus vào:

STAFF: Tạo match (POST)

SECURITY: Trả đồ (PUT)

Nhưng thiếu:

STAFF: Xem danh sách matches (GET) + lịch sử

SECURITY: Xem danh sách completed matches (lịch sử trả)

✅ Cách Sửa - Thêm Endpoints & Pages
STAFF - Cần Thêm:

text
STAFF Dashboard:
├─ [Tạo Match Thủ Công] ← Có (Modal)
├─ [Danh Sách Pending Matches] ← THIẾU (mới thêm)
│  └─ Xem tất cả matches chờ confirm
└─ [Lịch Sử Matches] ← THIẾU (mới thêm)
   └─ Xem tất cả matches đã confirm/reject/expire
API cho STAFF:

javascript
// 1. Xem danh sách pending matches
GET /api/matching?status=pending&matchedBy=staff-123

// 2. Xem danh sách confirmed matches
GET /api/matching?status=confirmed&matchedBy=staff-123

// 3. Xem danh sách completed matches
GET /api/matching?status=completed&matchedBy=staff-123

// 4. Xem tất cả matches của staff (all statuses)
GET /api/matching?matchedBy=staff-123
SECURITY - Cần Thêm:

text
Security Dashboard (/security/found-items):
├─ TAB 1: Nhập Đồ ← Có
├─ TAB 2: Danh Sách (Unclaimed) ← Có
├─ TAB 3: Sẵn Sàng Trả (Confirmed) ← Có
└─ TAB 4: Lịch Sử Trả (Completed) ← Có ✅

NHƯNG THIẾU:
├─ [Dashboard KPI] ← Thêm Stats
│  ├─ Total found items
│  ├─ Unclaimed items
│  ├─ Items ready to return
│  └─ Completed items (today/month)
│
└─ [Danh Sách Matches] ← Xem tất cả matches
   └─ Filter by status (pending/confirmed/completed)
API cho SECURITY:

javascript
// 1. Stats Dashboard
GET /api/security/dashboard/stats
// Response: { unclaimed: 7, confirmed: 2, completed: 15 }

// 2. Xem tất cả matches (all statuses)
GET /api/matching?status=all

// 3. Xem danh sách matches theo status
GET /api/matching?status=pending
GET /api/matching?status=confirmed
GET /api/matching?status=completed
📊 Bảng So Sánh - Cái Cần Thêm
Role	Phần	Cần Xem Gì	API	Status
STAFF	Matching List	Pending matches	GET /api/matching?status=pending	❌ THIẾU
STAFF	Matching History	Confirmed/Rejected matches	GET /api/matching?status=confirmed|rejected	❌ THIẾU
SECURITY	Dashboard Stats	KPI: unclaimed, confirmed, completed	GET /api/security/stats	❌ THIẾU
SECURITY	Matching List	All matches (all statuses)	GET /api/matching	❌ THIẾU
🛠️ Cách Thêm Vào Tài Liệu:
Thêm section mới sau section SECURITY:

text
### STAFF - Danh Sách Matches (/staff/matching/list)

**Mục đích:** Xem tất cả matches đã tạo

#### Hiển Thị:

[TAB: Pending] [TAB: Confirmed] [TAB: History]

Pending Matches (2):
├─ MR-001: Ví da nâu ← Đặng Thị (chờ 2 ngày)
└─ MR-002: Điện thoại ← Trần Hoàng (chờ 1 ngày)

Confirmed Matches (5):
├─ MR-003: Ví da nâu ← Nguyễn Văn (confirmed 1 ngày)
└─ ... (ready to return)

History (10):
├─ MR-010: Ví ← Lê Thị (completed 5/12)
├─ MR-009: Điện thoại ← Phạm Hùng (rejected - lý do: không phải)
└─ ...

text

**API:**
GET /api/matching?matchedBy=staff-123&status=pending|confirmed|completed

text

---

### SECURITY - Dashboard Stats & Matching List

**TAB 0: Dashboard (KPI)**

╔════════════════════════════════════╗
║ 📊 THỐNG KÊ ĐỒ TÌM THẤY ║
╠════════════════════════════════════╣
║ ║
║ 📦 Tổng số đồ: 25 ║
║ 🔵 Chưa match: 7 ║
║ 🟡 Chờ confirm: 2 ║
║ 🟢 Sẵn sàng trả: 2 ║
║ ✅ Đã trả: 15 ║
║ ║
║ 📈 Hôm nay: ║
║ ├─ Nhập: 3 cái ║
║ ├─ Xác nhận: 1 cái ║
║ └─ Trả: 2 cái ║
║ ║
╚════════════════════════════════════╝

text

**API:**
GET /api/security/dashboard/stats
GET /api/security/dashboard/stats/today

text
undefined
🔧 Sửa Canvas Artifact:
Nên update tài liệu gốc thêm:

STAFF - Section mới:

Danh sách pending matches

Danh sách confirmed matches

Lịch sử matches (completed/rejected/expired)

SECURITY - Thêm TAB:

TAB 0: Dashboard Stats (KPI)

Or: Thêm section "Dashboard" riêng

API Endpoints:

Liệt kê hết các GET endpoints cần thiết

💡 Lý Do Tôi Thiếu Lúc Đầu:
Focus vào workflow chính: Staff tạo → Student xác nhận → Security trả

Chưa suy luận đầy đủ: Mỗi role cần xem gì để quản lý công việc

Thiếu bảng "Requirements": Nên liệt kê rõ "Mỗi role cần xem gì"

✅ Sửa Lại - Bảng Đầy Đủ:
Role	Cần Tạo	Cần Xem	Cần Quản Lý
STAFF	✅ Match	✅ Pending
✅ Confirmed
✅ History	✅ Tạo/Reject
STUDENT	❌	✅ Pending
✅ History	✅ Confirm/Reject
SECURITY	❌	✅ Unclaimed
✅ Confirmed
✅ Completed
✅ Stats	✅ Trả/History