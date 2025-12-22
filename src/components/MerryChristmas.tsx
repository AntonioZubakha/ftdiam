import React from 'react';

const MerryChristmas: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <img 
        src="/images/Merry-3.jpg" 
        alt="Merry Christmas & Happy New Year from FTDiam"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
  );
};

export default MerryChristmas;

