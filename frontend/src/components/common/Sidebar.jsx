import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { gsap } from 'gsap';
import { FiHome, FiPackage, FiSearch, FiBarChart2, FiTrendingUp } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const sidebarRef = useRef(null);
  const itemsRef = useRef([]);

  const menuItems = [
    { path: '/', label: 'Trang Chủ', icon: FiHome, roles: ['student', 'staff', 'security', 'admin'] },
    { path: '/lost-items', label: 'Báo Mất', icon: FiPackage, roles: ['student'] },
    { path: '/found-items', label: 'Đồ Tìm Thấy', icon: FiSearch, roles: ['security', 'staff'] },
    { path: '/matching', label: 'Khớp Đồ', icon: FiTrendingUp, roles: ['student', 'staff'] },
    { path: '/reports', label: 'Báo Cáo', icon: FiBarChart2, roles: ['staff', 'admin'] }
  ];

  const filteredItems = menuItems.filter(item => 
    !item.roles || item.roles.includes(user?.role)
  );

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    gsap.fromTo(items,
      { 
        opacity: 0, 
        x: -50,
        rotationY: -90
      },
      { 
        opacity: 1, 
        x: 0,
        rotationY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  }, [location.pathname]);

  const handleItemHover = (index, isHovering) => {
    const item = itemsRef.current[index];
    if (!item) return;

    gsap.to(item, {
      x: isHovering ? 10 : 0,
      scale: isHovering ? 1.05 : 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <aside ref={sidebarRef} className="sidebar-enhanced">
      <nav className="sidebar-nav">
        {filteredItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              ref={el => itemsRef.current[index] = el}
              to={item.path}
              className={`sidebar-item-enhanced ${isActive ? 'active' : ''}`}
              onMouseEnter={() => handleItemHover(index, true)}
              onMouseLeave={() => handleItemHover(index, false)}
            >
              <div className="sidebar-item-icon">
                <Icon />
              </div>
              <span className="sidebar-item-label">{item.label}</span>
              {isActive && (
                <div className="sidebar-item-indicator" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

