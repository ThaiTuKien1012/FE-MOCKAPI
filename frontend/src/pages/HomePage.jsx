import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Chào mừng, {user?.firstName} {user?.lastName}!</h1>
        <p>Hệ thống tìm kiếm đồ thất lạc FPTU</p>
      </div>

      <div className="quick-actions">
        {user?.role === 'student' && (
          <Link to="/lost-items" className="action-card">
            <h3>Báo Mất Đồ</h3>
            <p>Báo cáo đồ vật bị mất</p>
          </Link>
        )}

        {user?.role === 'security' && (
          <Link to="/found-items" className="action-card">
            <h3>Ghi Nhận Đồ Tìm Thấy</h3>
            <p>Ghi nhận đồ vật được tìm thấy</p>
          </Link>
        )}

        <Link to="/matching" className="action-card">
          <h3>Khớp Đồ</h3>
          <p>Xem các gợi ý khớp đồ</p>
        </Link>

        {(user?.role === 'staff' || user?.role === 'admin') && (
          <Link to="/reports" className="action-card">
            <h3>Báo Cáo</h3>
            <p>Xem báo cáo và thống kê</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;

