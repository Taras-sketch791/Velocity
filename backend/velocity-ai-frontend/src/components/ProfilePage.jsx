import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
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

  if (!user) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Профиль: {user.username}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};