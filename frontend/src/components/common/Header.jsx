import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>FPTU Lost & Found</h1>
        </Link>
        
        {isAuthenticated && (
          <nav className="nav">
            <Link to="/lost-items">Báo Mất</Link>
            <Link to="/found-items">Đồ Tìm Thấy</Link>
            <Link to="/matching">Khớp Đồ</Link>
            <Link to="/reports">Báo Cáo</Link>
            <Link to="/profile">Hồ Sơ</Link>
            <div className="user-menu">
              <span>{user?.firstName} {user?.lastName}</span>
              <button onClick={handleLogout} className="btn btn-small">
                Đăng xuất
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

