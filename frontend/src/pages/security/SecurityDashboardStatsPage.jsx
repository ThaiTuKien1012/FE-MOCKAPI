import React, { useEffect, useRef } from 'react';
import { useFetch } from '../../hooks/useFetch';
import securityService from '../../api/securityService';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import { gsap } from 'gsap';
import { FiPackage, FiClock, FiCheckCircle, FiTrendingUp, FiBarChart2, FiMapPin } from 'react-icons/fi';

const SecurityDashboardStatsPage = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsCardsRef = useRef([]);
  const todayCardsRef = useRef([]);

  const { data, loading, error } = useFetch(
    () => securityService.getDashboardStats(),
    []
  );

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Animate stats cards
    if (data?.data && statsCardsRef.current.length > 0) {
      gsap.fromTo(statsCardsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );
    }

    // Animate today stats cards
    if (data?.data?.today && todayCardsRef.current.length > 0) {
      gsap.fromTo(todayCardsRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );
    }
  }, [data]);

  if (loading) {
    return (
      <div className="home-page-enhanced">
        <AnimatedBackground intensity={0.15} />
        <div className="page-content">
          <div className="loading-enhanced">
            <div className="spinner"></div>
            <p>Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = typeof error === 'string' ? error : (error?.message || error?.code || 'Có lỗi xảy ra');
    return (
      <div className="home-page-enhanced">
        <AnimatedBackground intensity={0.15} />
        <div className="page-content">
          <div className="error-enhanced">
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = data?.data || {};

  return (
    <div ref={pageRef} className="home-page-enhanced">
      <AnimatedBackground intensity={0.15} />
      
      <div className="hero-section-enhanced">
        <h1 ref={titleRef} className="hero-title">
          Thống Kê Đồ Tìm Thấy
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Tổng quan về đồ vật tại campus {stats.campus || 'N/A'}
        </p>
      </div>

      {stats && (
        <div className="staff-dashboard-stats">
          <div className="stats-grid-enhanced">
            <div 
              ref={el => statsCardsRef.current[0] = el}
              className="stat-card-enhanced stat-blue"
            >
              <div className="stat-icon-wrapper">
                <FiPackage className="stat-icon" />
              </div>
              <div className="stat-content">
                <p className="stat-title">TỔNG SỐ ĐỒ</p>
                <p className="stat-value">{stats.total || 0}</p>
              </div>
            </div>

            <div 
              ref={el => statsCardsRef.current[1] = el}
              className="stat-card-enhanced stat-cyan"
            >
              <div className="stat-icon-wrapper">
                <FiPackage className="stat-icon" />
              </div>
              <div className="stat-content">
                <p className="stat-title">CHƯA MATCH</p>
                <p className="stat-value">{stats.unclaimed || 0}</p>
              </div>
            </div>

            <div 
              ref={el => statsCardsRef.current[2] = el}
              className="stat-card-enhanced stat-pink"
            >
              <div className="stat-icon-wrapper">
                <FiClock className="stat-icon" />
              </div>
              <div className="stat-content">
                <p className="stat-title">CHỜ CONFIRM</p>
                <p className="stat-value">{stats.pending || 0}</p>
              </div>
            </div>

            <div 
              ref={el => statsCardsRef.current[3] = el}
              className="stat-card-enhanced stat-yellow"
            >
              <div className="stat-icon-wrapper">
                <FiCheckCircle className="stat-icon" />
              </div>
              <div className="stat-content">
                <p className="stat-title">SẴN SÀNG TRẢ</p>
                <p className="stat-value">{stats.confirmed || 0}</p>
              </div>
            </div>

            <div 
              ref={el => statsCardsRef.current[4] = el}
              className="stat-card-enhanced stat-green"
            >
              <div className="stat-icon-wrapper">
                <FiTrendingUp className="stat-icon" />
              </div>
              <div className="stat-content">
                <p className="stat-title">ĐÃ TRẢ</p>
                <p className="stat-value">{stats.completed || 0}</p>
              </div>
            </div>
          </div>

          {/* Today's Stats */}
          {stats.today && (
            <div className="today-stats-section" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
                📈 Thống Kê Hôm Nay
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div 
                  ref={el => todayCardsRef.current[0] = el}
                  style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Nhập</div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#667eea' }}>
                    {stats.today.found || 0} cái
                  </div>
                </div>
                <div 
                  ref={el => todayCardsRef.current[1] = el}
                  style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Xác nhận</div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#fa709a' }}>
                    {stats.today.confirmed || 0} cái
                  </div>
                </div>
                <div 
                  ref={el => todayCardsRef.current[2] = el}
                  style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Trả</div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#43e97b' }}>
                    {stats.today.completed || 0} cái
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecurityDashboardStatsPage;

