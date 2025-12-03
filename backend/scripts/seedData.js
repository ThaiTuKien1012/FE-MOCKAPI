require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const LostItem = require('../src/models/LostItem');
const FoundItem = require('../src/models/FoundItem');
const MatchingRequest = require('../src/models/MatchingRequest');
const ReturnTransaction = require('../src/models/ReturnTransaction');
const Campus = require('../src/models/Campus');
const ItemCategory = require('../src/models/ItemCategory');
const idGenerator = require('../src/utils/idGenerator');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_DEV;
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await LostItem.deleteMany({});
    await FoundItem.deleteMany({});
    await MatchingRequest.deleteMany({});
    await ReturnTransaction.deleteMany({});
    await Campus.deleteMany({});
    await ItemCategory.deleteMany({});

    // Seed Users
    console.log('👤 Creating users...');
    const password = 'Password123!';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const usersData = [
      {
        userId: 'sv001',
        email: 'sv001@fptu.edu.vn',
        password: hashedPassword,
        firstName: 'Nguyễn',
        lastName: 'Văn A',
        phone: '0901234567',
        role: 'student',
        campus: 'NVH'
      },
      {
        userId: 'sv002',
        email: 'sv002@fptu.edu.vn',
        password: hashedPassword,
        firstName: 'Trần',
        lastName: 'Thị B',
        phone: '0901234568',
        role: 'student',
        campus: 'SHTP'
      },
      {
        userId: 'staff001',
        email: 'staff001@fptu.edu.vn',
        password: hashedPassword,
        firstName: 'Lê',
        lastName: 'Văn C',
        phone: '0901234569',
        role: 'staff',
        campus: 'NVH'
      },
      {
        userId: 'sec001',
        email: 'sec001@fptu.edu.vn',
        password: hashedPassword,
        firstName: 'Phạm',
        lastName: 'Văn D',
        phone: '0901234570',
        role: 'security',
        campus: 'NVH'
      },
      {
        userId: 'admin001',
        email: 'admin@fptu.edu.vn',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'System',
        phone: '0901234571',
        role: 'admin',
        campus: 'NVH'
      }
    ];
    
    const users = await User.insertMany(usersData);
    console.log(`✅ Created ${users.length} users`);

    // Seed Lost Items
    console.log('📝 Creating lost items...');
    const lostItems = await LostItem.insertMany([
      {
        reportId: idGenerator.generateLostItemId('NVH'),
        studentId: users[0]._id,
        itemName: 'Điện thoại iPhone 13',
        description: 'Mặt lưng xước, bao da đỏ, mất tại phòng A101',
        category: 'PHONE',
        color: 'Black',
        features: ['Vết xước mặt sau', 'Bao da đỏ'],
        dateLost: new Date('2025-12-01'),
        locationLost: 'Phòng A101, Tầng 1, Building A',
        campus: 'NVH',
        phone: '0901234567',
        status: 'verified',
        priority: 'high'
      },
      {
        reportId: idGenerator.generateLostItemId('SHTP'),
        studentId: users[1]._id,
        itemName: 'Ví da màu nâu',
        description: 'Ví da bò màu nâu, có thẻ sinh viên bên trong',
        category: 'WALLET',
        color: 'Brown',
        features: ['Có thẻ sinh viên', 'Ví da bò'],
        dateLost: new Date('2025-12-02'),
        locationLost: 'Thư viện, Tầng 2',
        campus: 'SHTP',
        phone: '0901234568',
        status: 'pending',
        priority: 'normal'
      }
    ]);
    console.log(`✅ Created ${lostItems.length} lost items`);

    // Seed Found Items
    console.log('🔍 Creating found items...');
    const foundItems = await FoundItem.insertMany([
      {
        foundId: idGenerator.generateFoundItemId('NVH'),
        securityOfficerId: users[3]._id.toString(),
        itemName: 'Điện thoại màu đen',
        description: 'Có vết xước phía sau, bao da đỏ',
        category: 'PHONE',
        color: 'Black',
        condition: 'good',
        campus: 'NVH',
        dateFound: new Date('2025-12-03'),
        locationFound: 'Quầy tiếp tân',
        status: 'unclaimed'
      },
      {
        foundId: idGenerator.generateFoundItemId('SHTP'),
        securityOfficerId: users[3]._id.toString(),
        itemName: 'Ví da màu nâu',
        description: 'Ví da bò màu nâu, có thẻ sinh viên',
        category: 'WALLET',
        color: 'Brown',
        condition: 'excellent',
        campus: 'SHTP',
        dateFound: new Date('2025-12-03'),
        locationFound: 'Thư viện',
        status: 'unclaimed'
      }
    ]);
    console.log(`✅ Created ${foundItems.length} found items`);

    // Seed Matching Requests
    console.log('🔗 Creating matching requests...');
    const matchingRequests = await MatchingRequest.insertMany([
      {
        requestId: idGenerator.generateMatchingRequestId(),
        lostItemId: lostItems[0]._id.toString(),
        foundItemId: foundItems[0]._id.toString(),
        studentId: users[0]._id.toString(),
        matchConfidence: 95,
        matchReason: 'Khớp 100% về loại, màu, đặc điểm',
        status: 'pending',
        autoGenerated: true
      }
    ]);
    console.log(`✅ Created ${matchingRequests.length} matching requests`);

    // Seed Return Transactions
    console.log('📦 Creating return transactions...');
    const returnTransactions = await ReturnTransaction.insertMany([
      {
        transactionId: idGenerator.generateReturnTransactionId(),
        foundItemId: foundItems[0]._id.toString(),
        studentId: users[0]._id.toString(),
        securityOfficerId: users[3]._id.toString(),
        campus: 'NVH',
        returnedDate: new Date('2025-12-05'),
        verificationMethod: 'signature',
        condition: 'good',
        items: [{
          foundItemId: foundItems[0]._id.toString(),
          condition: 'good',
          notes: 'Perfect condition'
        }],
        status: 'completed'
      }
    ]);
    console.log(`✅ Created ${returnTransactions.length} return transactions`);

    // Seed Campuses
    console.log('🏫 Creating campuses...');
    const campuses = await Campus.insertMany([
      {
        campusCode: 'NVH',
        campusName: 'Nam Sài Gòn',
        address: 'Đường D1, Khu Công nghệ cao, Quận 9, TP.HCM',
        phone: '02873001111',
        email: 'nvh@fptu.edu.vn',
        isActive: true
      },
      {
        campusCode: 'SHTP',
        campusName: 'Saigon Hi-Tech Park',
        address: 'Lô E2a-7, Đường D1, Khu Công nghệ cao, Quận 9, TP.HCM',
        phone: '02873001111',
        email: 'shtp@fptu.edu.vn',
        isActive: true
      }
    ]);
    console.log(`✅ Created ${campuses.length} campuses`);

    // Seed Item Categories
    console.log('📂 Creating item categories...');
    const categories = await ItemCategory.insertMany([
      {
        categoryCode: 'PHONE',
        categoryName: 'Điện thoại',
        description: 'Smartphone, điện thoại di động',
        commonColors: ['Black', 'White', 'Blue', 'Red'],
        commonFeatures: ['Màn hình', 'Pin', 'Camera'],
        priority: 1,
        isActive: true
      },
      {
        categoryCode: 'WALLET',
        categoryName: 'Ví/Bóp',
        description: 'Ví, bóp, ví da',
        commonColors: ['Brown', 'Black', 'Red'],
        commonFeatures: ['Thẻ', 'Tiền mặt'],
        priority: 2,
        isActive: true
      },
      {
        categoryCode: 'BAG',
        categoryName: 'Túi xách',
        description: 'Túi xách, ba lô, cặp',
        commonColors: ['Black', 'Blue', 'Red'],
        priority: 3,
        isActive: true
      },
      {
        categoryCode: 'LAPTOP',
        categoryName: 'Laptop',
        description: 'Máy tính xách tay',
        commonColors: ['Silver', 'Black', 'Gray'],
        priority: 4,
        isActive: true
      }
    ]);
    console.log(`✅ Created ${categories.length} item categories`);

    console.log('\n✅ Seed data completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Lost Items: ${lostItems.length}`);
    console.log(`   - Found Items: ${foundItems.length}`);
    console.log(`   - Matching Requests: ${matchingRequests.length}`);
    console.log(`   - Return Transactions: ${returnTransactions.length}`);
    console.log(`   - Campuses: ${campuses.length}`);
    console.log(`   - Item Categories: ${categories.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

