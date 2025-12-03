# FPTU Lost & Found System - Backend API

Complete backend implementation for FPTU Lost & Found Tracking System with 40 APIs.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Configuration

1. Copy `.env.example` to `.env` (if available)
2. Update MongoDB connection string
3. Set JWT secrets and other environment variables

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

## 📡 API Endpoints

### Authentication (4 APIs)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Lost Items (6 APIs)
- `POST /api/lost-items` - Create lost item report
- `GET /api/lost-items/:id` - Get lost item details
- `GET /api/lost-items/my-reports` - Get my reports
- `PUT /api/lost-items/:id` - Update lost item
- `DELETE /api/lost-items/:id` - Delete lost item
- `GET /api/lost-items/search` - Search lost items

### Found Items (6 APIs)
- `POST /api/found-items` - Create found item
- `GET /api/found-items/:id` - Get found item details
- `GET /api/found-items` - List found items
- `PUT /api/found-items/:id` - Update found item
- `DELETE /api/found-items/:id` - Delete found item
- `GET /api/found-items/search` - Search found items

### Upload (2 APIs)
- `POST /api/upload/images` - Upload images
- `DELETE /api/upload/images/:fileId` - Delete image

### Matching (5 APIs)
- `GET /api/matching/suggestions` - Get match suggestions
- `POST /api/matching/:matchId/confirm` - Confirm match
- `POST /api/matching/:matchId/reject` - Reject match
- `GET /api/matching` - List matches
- `PUT /api/matching/:matchId/resolve` - Resolve match

### Returns (5 APIs)
- `POST /api/returns` - Create return transaction
- `GET /api/returns/:transactionId` - Get return details
- `GET /api/returns/my-transactions` - Get my transactions
- `GET /api/returns` - List returns
- `PUT /api/returns/:transactionId` - Update return

### Reports (7 APIs)
- `GET /api/reports/dashboard` - Dashboard stats
- `GET /api/reports/lost-by-category` - Lost by category
- `GET /api/reports/campus-comparison` - Campus comparison
- `GET /api/reports/monthly` - Monthly report
- `GET /api/reports/weekly` - Weekly report
- `GET /api/reports/statistics` - Statistics
- `GET /api/reports/export` - Export report

### Users (5 APIs)
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/change-password` - Change password
- `GET /api/users` - List users (Admin)
- `PUT /api/users/:userId` - Update user (Admin)

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── LostItem.js
│   │   ├── FoundItem.js
│   │   ├── MatchingRequest.js
│   │   ├── ReturnTransaction.js
│   │   ├── Campus.js
│   │   ├── ItemCategory.js
│   │   └── AuditLog.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── lostItemController.js
│   │   ├── foundItemController.js
│   │   ├── matchingController.js
│   │   ├── returnController.js
│   │   ├── reportController.js
│   │   ├── userController.js
│   │   └── uploadController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── lost-items.js
│   │   ├── found-items.js
│   │   ├── matching.js
│   │   ├── returns.js
│   │   ├── reports.js
│   │   ├── users.js
│   │   └── upload.js
│   ├── middleware/
│   │   └── auth.js
│   ├── services/
│   │   └── authService.js
│   ├── utils/
│   │   ├── idGenerator.js
│   │   └── validators.js
│   └── app.js
├── server.js
├── package.json
└── README.md
```

## 🔐 Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## 📝 Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time
- `PORT` - Server port (default: 5000)
- `UPLOAD_DIR` - Upload directory (default: ./uploads)
- `MAX_FILE_SIZE` - Max file size in bytes

## 📚 API Documentation (Swagger)

Swagger UI documentation is available at:

```
http://localhost:5000/api-docs
```

### Features:
- Interactive API documentation
- Test APIs directly from browser
- JWT authentication support
- All 40 endpoints documented
- Request/Response schemas

See [SWAGGER.md](./SWAGGER.md) for detailed usage instructions.

## ✅ Features

- ✅ 40 Complete APIs
- ✅ JWT Authentication
- ✅ Role-based Authorization
- ✅ File Upload Support
- ✅ MongoDB Integration
- ✅ Error Handling
- ✅ Input Validation
- ✅ Audit Logging
- ✅ Pagination Support
- ✅ Swagger API Documentation

## 📄 License

ISC

