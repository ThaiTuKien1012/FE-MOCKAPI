import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { gsap } from 'gsap';
import LoginForm from '../components/auth/LoginForm';
import VideoBackground from '../components/auth/VideoBackground';
import { FiShield, FiSearch, FiPackage } from 'react-icons/fi';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError, showSuccess } = useNotification();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Animate page entrance
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: -50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }
    )
    .fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.4'
    )
    .fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 50,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'power3.out'
      },
      '-=0.3'
    );

    // Floating animation for icons
    gsap.to('.floating-icon', {
      y: '+=20',
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.3
    });
  }, []);

  const handleLogin = async (values) => {
    const result = await login(values);
    if (result.success) {
      // Success animation
      gsap.to(cardRef.current, {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          showSuccess('Đăng nhập thành công!');
          navigate('/');
        }
      });
    } else {
      // Error shake animation
      gsap.to(cardRef.current, {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(cardRef.current, { x: 0 });
        }
      });
      showError(result.error?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div ref={containerRef} className="login-page-enhanced">
      <VideoBackground />
      
      <div className="login-content">
        <div className="login-header">
          <h1 ref={titleRef} className="login-title">
            <FiShield className="title-icon" />
            FPTU Lost & Found
          </h1>
          <p ref={subtitleRef} className="login-subtitle">
            Hệ thống tìm kiếm đồ thất lạc FPTU
          </p>
        </div>

        <div ref={cardRef} className="login-card-enhanced">
          <div className="card-header">
            <h2>Đăng Nhập</h2>
            <div className="card-decoration">
              <FiSearch className="floating-icon" />
              <FiPackage className="floating-icon" />
            </div>
          </div>

          <LoginForm onSubmit={handleLogin} />

          <div className="login-footer">
            <p className="register-link">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="link-animated">
                Đăng ký tại đây
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
