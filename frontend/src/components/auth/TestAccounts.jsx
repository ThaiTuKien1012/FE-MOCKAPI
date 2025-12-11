import React, { useState } from 'react';
import { FiUser, FiCopy, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { getMockUsers } from '../../api/mockAuthService';

const TestAccounts = ({ onSelectAccount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const contentRef = React.useRef(null);
  
  let mockUsers = [];
  try {
    mockUsers = getMockUsers();
    console.log('📋 Mock users loaded:', mockUsers.length);
  } catch (error) {
    console.error('Error getting mock users:', error);
  }

  // Group users by role
  const groupedUsers = mockUsers.reduce((acc, user) => {
    if (!acc[user.role]) {
      acc[user.role] = [];
    }
    acc[user.role].push(user);
    return acc;
  }, {});

  // Animation when expanding
  React.useEffect(() => {
    if (isExpanded && contentRef.current) {
      // Animate content appearance
      const items = contentRef.current.querySelectorAll('.test-account-item');
      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          item.style.transition = 'all 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 50);
      });
    }
  }, [isExpanded]);

  const roleLabels = {
    student: '👨‍🎓 Sinh Viên',
    staff: '👨‍💼 Nhân Viên',
    security: '🛡️ Bảo Vệ'
  };

  const roleColors = {
    student: '#4CAF50',
    staff: '#2196F3',
    security: '#FF9800'
  };

  const handleCopy = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSelect = (email, password) => {
    console.log('🔘 Account selected:', email);
    if (onSelectAccount) {
      onSelectAccount({ email, password });
    }
  };

  const handleToggle = () => {
    console.log('🔄 Toggle expanded:', !isExpanded);
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="test-accounts-container">
      <button
        type="button"
        className="test-accounts-toggle"
        onClick={handleToggle}
      >
        <span className="test-accounts-title">
          <FiUser /> Tài Khoản Test
        </span>
        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isExpanded && (
        <div 
          ref={contentRef} 
          className="test-accounts-content"
          style={{ display: 'block', visibility: 'visible' }}
        >
          <div className="test-accounts-note">
            💡 Click vào tài khoản để tự động điền thông tin đăng nhập
          </div>
          
          {Object.keys(groupedUsers).length === 0 ? (
            <div className="test-accounts-empty">
              Không có tài khoản test nào. Vui lòng kiểm tra console để debug.
            </div>
          ) : (
            Object.entries(groupedUsers).map(([role, users]) => (
            <div key={role} className="test-accounts-group">
              <div 
                className="test-accounts-group-header"
                style={{ borderLeftColor: roleColors[role] }}
              >
                {roleLabels[role] || role}
              </div>
              
              <div className="test-accounts-list">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="test-account-item"
                    onClick={() => handleSelect(user.email, user.password)}
                  >
                    <div className="test-account-info">
                      <div className="test-account-name">{user.name}</div>
                      <div className="test-account-email">
                        {user.email}
                        <button
                          className="copy-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(user.email);
                          }}
                          title="Copy email"
                        >
                          {copiedEmail === user.email ? (
                            <FiCheck className="copy-icon copied" />
                          ) : (
                            <FiCopy className="copy-icon" />
                          )}
                        </button>
                      </div>
                      <div className="test-account-password">
                        Password: <code>{user.password}</code>
                      </div>
                    </div>
                    <div 
                      className="test-account-badge"
                      style={{ backgroundColor: roleColors[role] }}
                    >
                      {role.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
          )}
        </div>
      )}
    </div>
  );
};

export default TestAccounts;

