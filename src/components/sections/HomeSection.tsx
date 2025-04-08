import { useRef, useEffect } from 'react';

const HomeSection = () => {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set normal playback rate (1.0) for videos
    const leftVideo = leftVideoRef.current;
    const rightVideo = rightVideoRef.current;
    
    if (leftVideo) {
      leftVideo.playbackRate = 1.0;
    }
    
    if (rightVideo) {
      rightVideo.playbackRate = 1.0;
    }
  }, []);

  return (
    <section id="home" className="section home-section">
      <div className="home-video-container">
        <div className="split-screen">
          <div className="split-screen-left" style={{ overflow: 'hidden' }}>
            <video 
              ref={leftVideoRef}
              className="background-video" 
              autoPlay 
              muted 
              playsInline 
              loop
              style={{ 
                objectFit: 'cover',
                width: '110%', // Увеличиваем размер на 10% для большего растяжения
                height: '110%',
                left: '-5%', // Центрируем видео
                top: '-5%',
                position: 'absolute'
              }} 
            >
              <source src="/video/nature.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="split-screen-right">
            <video 
              ref={rightVideoRef}
              className="background-video" 
              autoPlay 
              muted 
              playsInline 
              loop
            >
              <source src="/video/tech.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        
        {/* Визуальный маркер для центра экрана (будет скрыт на продакшене) */}
        <div className="center-marker"></div>
      </div>
      
      {/* Логотип, центрированный абсолютно */}
      <div className="logo-container">
        <img 
          src="/images/Logo_white.png" 
          alt="FTDiam Logo" 
          className="absolute-center-logo" 
        />
      </div>
      
      <div className="content-wrapper">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-subheadline">Single Crystal Diamond Substrates</h2>
            <p className="hero-description">Advanced HPHT technology for cutting-edge applications</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 