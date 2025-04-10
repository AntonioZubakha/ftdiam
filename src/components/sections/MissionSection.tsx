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
        
        <div className="mission-content" style={{ position: 'relative' }}>
          <div className="mission-logo-container">
            <img src="/images/Logo.png" alt="FTDiam Logo" className="mission-logo" />
          </div>
          
          <div className="mission-text">
            <img 
              src="/images/quote.svg" 
              alt="" 
              aria-hidden="true"
              style={{ 
                position: "absolute",
                left: "-25px", 
                top: "-20px",
                width: "50px",
                height: "40px",
                opacity: 0.8
              }}
            />
            <p className="mission-description" style={{ 
              fontStyle: 'normal',
              paddingLeft: '30px',
              position: 'relative'
            }}>
            Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection; 