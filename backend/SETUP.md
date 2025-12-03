# 🚀 Setup Guide

## 1. Cài đặt Dependencies

```bash
npm install
```

## 2. Cấu hình Environment Variables

File `.env` đã được tạo với cấu hình mặc định. Bạn cần cập nhật:

### MongoDB Connection

**Option 1: Local MongoDB**
```env
MONGODB_DEV=mongodb://localhost:27017/fptu_lostfound
```

Đảm bảo MongoDB đang chạy:
```bash
# macOS với Homebrew
brew services start mongodb-community

# Hoặc chạy trực tiếp
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fptu_lostfound
```

### JWT Secrets

Thay đổi các secret keys trong production:
```env
JWT_SECRET=your_super_secret_key_min_32_chars_here_2025
REFRESH_TOKEN_SECRET=your_refresh_secret_key_min_32_chars_2025
```

## 3. Khởi động Server

### Development Mode (với auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 4. Kiểm tra Server

- Health Check: http://localhost:5000/health
- Swagger Docs: http://localhost:5000/api-docs
- API Base: http://localhost:5000/api

## 5. Troubleshooting

### Port 5000 đã được sử dụng
```bash
npm run kill-port
# hoặc
npm run restart
```

### MongoDB Connection Error
1. Kiểm tra MongoDB đang chạy: `mongosh` hoặc `mongo`
2. Kiểm tra connection string trong `.env`
3. Đảm bảo MongoDB service đã được start

### Missing Environment Variables
- Đảm bảo file `.env` tồn tại trong thư mục `backend/`
- Kiểm tra các biến: `MONGODB_URI` hoặc `MONGODB_DEV`

## 6. Tạo Database và Collections

MongoDB sẽ tự động tạo database và collections khi bạn sử dụng API lần đầu.

Hoặc có thể tạo thủ công:
```bash
mongosh
use fptu_lostfound
```

## 📝 Notes

- File `.env` không được commit vào git (đã có trong .gitignore)
- Sử dụng `.env.example` làm template cho team members
- Trong production, sử dụng environment variables từ hosting platform

