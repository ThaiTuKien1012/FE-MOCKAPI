import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/', label: 'Trang Chủ', roles: ['student', 'staff', 'security', 'admin'] },
    { path: '/lost-items', label: 'Báo Mất', roles: ['student'] },
    { path: '/found-items', label: 'Đồ Tìm Thấy', roles: ['security', 'staff'] },
    { path: '/matching', label: 'Khớp Đồ', roles: ['student', 'staff'] },
    { path: '/reports', label: 'Báo Cáo', roles: ['staff', 'admin'] }
  ];

  const filteredItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.role)
  );

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {filteredItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

