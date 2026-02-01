import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(255,255,255,0.3)',
          borderRadius: '50%',
          borderTopColor: 'white',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <h2>Velocity AI</h2>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;