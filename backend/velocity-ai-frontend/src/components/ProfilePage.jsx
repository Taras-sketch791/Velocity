import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      const res = await fetch('http://127.0.0.1:8000/api/profile/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div style={{ padding: '20px' }}>{t('common.loading')}</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t('profile.title', 'Профиль')}: {user.username}</h1>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Добавьте сюда другие поля профиля, если они есть */}
      </div>
    </div>
  );
};

export default ProfilePage;