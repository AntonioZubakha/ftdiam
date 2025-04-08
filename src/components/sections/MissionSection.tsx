import React from 'react';
import '../../styles/mission.css';

const MissionSection = () => {
  return (
    <section 
      id="mission" 
      className="mission-section" 
      style={{ 
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      <div className="container">
        <h2 className="mission-headline gradient-headline">Our Mission</h2>
        
        <div className="mission-content">
          <div className="mission-logo-container">
            <img src="/images/Logo.png" alt="FTDiam Logo" className="mission-logo" />
          </div>
          
          <div className="mission-text">
            <div className="quote-mark" dangerouslySetInnerHTML={{ __html: "&ldquo;" }}></div>
            <p className="mission-description">
            Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection; 