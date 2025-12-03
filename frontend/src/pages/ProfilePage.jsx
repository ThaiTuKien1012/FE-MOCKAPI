import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>Hồ Sơ Cá Nhân</h1>
      {user && (
        <div className="profile-info">
          <p><strong>Họ tên:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Vai trò:</strong> {user.role}</p>
          <p><strong>Campus:</strong> {user.campus}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

