import React, { useEffect, useState } from 'react';
import '../../styles/clients.css';

const ClientsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the screen is mobile-sized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clients = [
    { 
      name: 'XYZ Electronics', 
      description: 'Semiconductor equipment manufacturer',
      industry: 'Electronics'
    },
    { 
      name: 'Quantum Tech', 
      description: 'Quantum computing research',
      industry: 'Research'
    },
    { 
      name: 'Advanced Materials Inc', 
      description: 'Industrial diamond applications',
      industry: 'Materials'
    },
    { 
      name: 'SemiCorp', 
      description: 'Semiconductor fabrication',
      industry: 'Manufacturing'
    },
    { 
      name: 'Opti-Wave', 
      description: 'Optical component manufacturer',
      industry: 'Optics'
    },
    { 
      name: 'Diamond Research Lab', 
      description: 'Advanced materials R&D',
      industry: 'Research'
    }
  ];

  return (
    <section className={`clients-section ${isMobile ? 'mobile' : ''}`} id="clients">
      <div className="section-container">
        <h2 className="section-title">We Collaborate With</h2>
        
        <div className="clients-grid">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="client-card"
              style={{
                '--animation-order': index,
              } as React.CSSProperties}
            >
              <div className="client-logo-container">
                <div className="client-logo-placeholder">
                  {client.name.charAt(0)}
                </div>
              </div>
              <h3 className="client-name">{client.name}</h3>
              <p className="client-industry">{client.industry}</p>
              <p className="client-description">{client.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection; 