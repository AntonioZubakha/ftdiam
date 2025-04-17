import React, { useEffect, useState } from 'react';
import '../../styles/clients.css';

const ClientsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the screen is mobile-sized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Base section styles
  const sectionStyles = {
    padding: isMobile ? '40px 0 20px 0' : '120px 0 60px 0',
    backgroundColor: '#fff',
    position: 'relative' as const,
    marginBottom: '0',
    marginTop: '0',
    width: '100%',
    overflow: 'hidden'
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '0 15px' : '0 20px'
  };

  const headlineStyles = {
    fontSize: isMobile ? 'var(--section-headline-mobile-size)' : 'var(--section-headline-size)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    textAlign: 'center' as const,
    marginBottom: isMobile ? '1.5rem' : '2rem',
    position: 'relative' as const,
    fontWeight: '600' as const,
    letterSpacing: '0.5px',
    display: 'inline-block'
  };

  const subtitleStyles = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: '1.6',
    textAlign: 'center' as const,
    color: '#555',
    maxWidth: '800px',
    margin: '0 auto 40px',
    padding: '0 20px'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: isMobile ? '15px' : '30px',
    width: '100%',
    margin: isMobile ? '10px auto 0' : '20px auto 0',
    position: 'relative' as const,
    maxWidth: '1200px'
  };

  const logoContainerStyles = {
    width: '80px',
    height: '80px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const logoStyles = {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '2rem',
    fontWeight: 'bold'
  };

  const clientNameStyles = {
    fontSize: isMobile ? 'var(--h4-mobile)' : 'var(--h4-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    margin: '0 0 5px 0',
    fontWeight: '600' as const,
    textAlign: 'center' as const
  };

  const industryStyles = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: '#666',
    marginBottom: '10px',
    textAlign: 'center' as const
  };

  const descriptionStyles = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: '#555',
    lineHeight: '1.6',
    textAlign: 'center' as const
  };

  const testimonialsSectionStyles = {
    maxWidth: '800px',
    margin: '60px auto 0',
    textAlign: 'center' as const
  };

  const testimonialsHeadingStyles = {
    fontSize: isMobile ? 'var(--h3-mobile)' : 'var(--h3-desktop)',
    background: 'linear-gradient(to right, #00837f, #241e46)',
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    marginBottom: '30px',
    fontWeight: '600' as const
  };

  const testimonialBlockStyles = {
    background: '#fff',
    padding: isMobile ? '20px' : '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const quoteStyles = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    color: '#555',
    fontStyle: 'italic',
    marginBottom: '15px',
    lineHeight: '1.6'
  };

  const citeStyles = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: '#666'
  };

  // Временные данные для клиентов
  const clients = [
    {
      id: 1,
      name: 'Tech Industries',
      industry: 'Semiconductor Manufacturing',
      description: 'Leading provider of advanced semiconductor solutions',
      logo: '/images/client-placeholder-1.png'
    },
    {
      id: 2,
      name: 'Quantum Systems',
      industry: 'Quantum Computing',
      description: 'Pioneering quantum computing technologies',
      logo: '/images/client-placeholder-2.png'
    },
    {
      id: 3,
      name: 'OptoElectronics Corp',
      industry: 'Optoelectronics',
      description: 'Innovative optical and electronic components',
      logo: '/images/client-placeholder-3.png'
    }
  ];

  return (
    <section id="clients" style={sectionStyles}>
      <div style={containerStyles}>
        <div style={{textAlign: 'center'}}>
          <h2 style={headlineStyles}>Our Clients</h2>
        </div>
        
        <p style={subtitleStyles}>
          Trusted by industry leaders in semiconductor and quantum technologies
        </p>
        
        <div style={gridStyles}>
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="client-card"
              style={{
                '--animation-order': index
              } as React.CSSProperties}
            >
              <div style={logoContainerStyles}>
                <div style={logoStyles}>
                  {client.name.charAt(0)}
                </div>
              </div>
              <div>
                <h3 style={clientNameStyles}>{client.name}</h3>
                <p style={industryStyles}>{client.industry}</p>
                <p style={descriptionStyles}>{client.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={testimonialsSectionStyles}>
          <h3 style={testimonialsHeadingStyles}>What Our Clients Say</h3>
          <div style={testimonialBlockStyles}>
            <blockquote style={quoteStyles}>
              "FTD's diamond substrates have significantly improved our quantum sensing capabilities.
              Their consistent quality and reliability are unmatched in the industry."
            </blockquote>
            <cite style={citeStyles}>- Dr. Sarah Chen, Head of R&D at Quantum Systems</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection; 