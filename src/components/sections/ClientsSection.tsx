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
      name: 'Applied Diamond, Inc.', 
      description: 'Leading manufacturer of CVD diamond products',
      industry: 'Manufacturing',
      logo: '/images/client1.png'
    },
    { 
      name: 'Michigan State University', 
      description: 'Research institution with diamond technology development',
      industry: 'Education & Research',
      logo: '/images/client2.png'
    },
    { 
      name: 'Argonne National Laboratory', 
      description: 'U.S. Department of Energy multidisciplinary science and engineering research center',
      industry: 'Research',
      logo: '/images/client3.jpg'
    },
    { 
      name: 'The European Synchrotron Radiation Facility', 
      description: 'International research facility for cutting-edge research with photons',
      industry: 'Research',
      logo: '/images/client4.jpg'
    },
    { 
      name: 'HiQuTe Diamond', 
      description: 'High-quality technical diamond solutions provider',
      industry: 'Technology',
      logo: '/images/client5.png'
    },
    { 
      name: 'LSPM-CNRS', 
      description: 'Laboratoire des Sciences des Procédés et des Matériaux',
      industry: 'Research',
      logo: '/images/client6.png'
    },
    { 
      name: 'DIAMFAB', 
      description: 'Diamond semiconductor device manufacturer',
      industry: 'Electronics',
      logo: '/images/client7.jpg'
    },
    { 
      name: 'UC Santa Barbara', 
      description: 'Leading research university with diamond materials research',
      industry: 'Education & Research',
      logo: '/images/client8.jpg'
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
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`} 
                  className="client-logo" 
                />
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