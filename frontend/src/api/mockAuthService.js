// Mock API Service for Authentication
// Sử dụng khi không có backend server

// Mock users database
const mockUsers = {
  // Student accounts
  'student@fptu.edu.vn': {
    email: 'student@fptu.edu.vn',
    password: 'student123',
    role: 'student',
    name: 'Nguyễn Văn Sinh Viên',
    studentId: 'SE123456',
    campus: 'NVH',
    phone: '0901234567'
  },
  'student2@fptu.edu.vn': {
    email: 'student2@fptu.edu.vn',
    password: 'student123',
    role: 'student',
    name: 'Trần Thị Học Sinh',
    studentId: 'SE789012',
    campus: 'SHTP',
    phone: '0907654321'
  },
  
  // Staff accounts
  'staff@fptu.edu.vn': {
    email: 'staff@fptu.edu.vn',
    password: 'staff123',
    role: 'staff',
    name: 'Lê Văn Nhân Viên',
    employeeId: 'ST001',
    campus: 'NVH',
    phone: '0901111111'
  },
  'staff2@fptu.edu.vn': {
    email: 'staff2@fptu.edu.vn',
    password: 'staff123',
    role: 'staff',
    name: 'Phạm Thị Quản Lý',
    employeeId: 'ST002',
    campus: 'SHTP',
    phone: '0902222222'
  },
  
  // Security accounts
  'security@fptu.edu.vn': {
    email: 'security@fptu.edu.vn',
    password: 'security123',
    role: 'security',
    name: 'Hoàng Văn Bảo Vệ',
    employeeId: 'SEC001',
    campus: 'NVH',
    phone: '0903333333'
  },
  'security2@fptu.edu.vn': {
    email: 'security2@fptu.edu.vn',
    password: 'security123',
    role: 'security',
    name: 'Võ Thị An Ninh',
    employeeId: 'SEC002',
    campus: 'SHTP',
    phone: '0904444444'
  }
};

// Generate mock JWT token
const generateMockToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId: user.email,
    role: user.role,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }));
  return `${header}.${payload}.mock-signature`;
};

// Simulate API delay
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const mockAuthService = {
  login: async (credentials) => {
    await delay(800); // Simulate network delay
    
    const { email, password } = credentials;
    
    // Debug log
    if (import.meta.env.DEV) {
      console.log('🔐 Mock API Login:', { email, passwordLength: password?.length });
    }
    
    const user = mockUsers[email];
    
    if (!user) {
      if (import.meta.env.DEV) {
        console.log('❌ User not found:', email);
      }
      return {
        success: false,
        error: 'Email không tồn tại trong hệ thống'
      };
    }
    
    if (user.password !== password) {
      if (import.meta.env.DEV) {
        console.log('❌ Password incorrect for:', email);
      }
      return {
        success: false,
        error: 'Mật khẩu không chính xác'
      };
    }
    
    if (import.meta.env.DEV) {
      console.log('✅ Login successful:', { email, role: user.role });
    }
    
    // Generate tokens
    const accessToken = generateMockToken(user);
    const refreshToken = generateMockToken({ ...user, type: 'refresh' });
    
    // Prepare user data
    const userData = {
      _id: `mock_${user.role}_${Date.now()}`,
      email: user.email,
      name: user.name,
      role: user.role,
      campus: user.campus,
      phone: user.phone,
      ...(user.studentId && { studentId: user.studentId }),
      ...(user.employeeId && { employeeId: user.employeeId }),
      createdAt: new Date().toISOString()
    };
    
    return {
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: userData,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    };
  },

  register: async (userData) => {
    await delay(1000);
    
    const { email, password } = userData;
    
    // Check if user already exists
    if (mockUsers[email]) {
      return {
        success: false,
        error: 'Email đã được sử dụng'
      };
    }
    
    // Create new user (only students can register)
    const newUser = {
      email,
      password,
      role: 'student',
      name: userData.name || 'Sinh Viên Mới',
      studentId: userData.studentId || `SE${Date.now()}`,
      campus: userData.campus || 'NVH',
      phone: userData.phone || ''
    };
    
    // Add to mock database
    mockUsers[email] = newUser;
    
    // Generate tokens
    const accessToken = generateMockToken(newUser);
    const refreshToken = generateMockToken({ ...newUser, type: 'refresh' });
    
    const userResponse = {
      _id: `mock_student_${Date.now()}`,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      campus: newUser.campus,
      phone: newUser.phone,
      studentId: newUser.studentId,
      createdAt: new Date().toISOString()
    };
    
    return {
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    };
  },

  refreshToken: async (refreshToken) => {
    await delay(500);
    
    // In a real scenario, we'd decode and verify the refresh token
    // For mock, we'll just generate a new access token
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!currentUser.email) {
      return {
        success: false,
        error: 'Không tìm thấy thông tin người dùng'
      };
    }
    
    const user = mockUsers[currentUser.email];
    if (!user) {
      return {
        success: false,
        error: 'Người dùng không tồn tại'
      };
    }
    
    const newAccessToken = generateMockToken(user);
    
    return {
      success: true,
      data: {
        accessToken: newAccessToken
      }
    };
  }
};

export default mockAuthService;

// Export mock users for reference
export const getMockUsers = () => {
  return Object.keys(mockUsers).map(email => ({
    email,
    role: mockUsers[email].role,
    name: mockUsers[email].name,
    password: mockUsers[email].password
  }));
};

