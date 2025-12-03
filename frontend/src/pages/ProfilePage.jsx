import React, { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { gsap } from 'gsap';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { FiUser, FiMail, FiShield, FiMapPin, FiEdit } from 'react-icons/fi';

const ProfilePage = () => {
  const { user } = useAuth();
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const infoItemsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo(cardRef.current,
      { opacity: 0, y: 50, rotationX: -15 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(infoItemsRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );
  }, [user]);

  const profileInfo = [
    { icon: FiUser, label: 'Họ tên', value: `${user?.firstName} ${user?.lastName}` },
    { icon: FiMail, label: 'Email', value: user?.email },
    { icon: FiShield, label: 'Vai trò', value: user?.role },
    { icon: FiMapPin, label: 'Campus', value: user?.campus }
  ];

  return (
    <div ref={pageRef} className="profile-page-enhanced">
      <AnimatedBackground intensity={0.1} />
      
      <div className="page-header-enhanced">
        <div className="title-wrapper">
          <FiUser className="title-icon" />
          <h1 ref={titleRef} className="page-title">Hồ Sơ Cá Nhân</h1>
        </div>
      </div>

      {user && (
        <div ref={cardRef} className="profile-card-enhanced">
          <div className="profile-avatar-section">
            <div className="avatar-wrapper">
              <div className="avatar-circle">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
            </div>
            <button className="btn-edit-profile">
              <FiEdit />
              Chỉnh sửa
            </button>
          </div>

          <div className="profile-info-section">
            {profileInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  ref={el => infoItemsRef.current[index] = el}
                  className="info-item-enhanced"
                >
                  <div className="info-icon-wrapper">
                    <Icon className="info-icon" />
                  </div>
                  <div className="info-content">
                    <span className="info-label">{info.label}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

