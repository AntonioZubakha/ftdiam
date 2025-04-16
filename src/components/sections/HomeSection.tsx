import { useRef, useEffect, useState } from 'react';

const HomeSection = () => {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Set normal playback rate (1.0) for videos
    const leftVideo = leftVideoRef.current;
    const rightVideo = rightVideoRef.current;
    const mobileVideo = mobileVideoRef.current;
    
    if (leftVideo) {
      leftVideo.playbackRate = 1.0;
    }
    
    if (rightVideo) {
      rightVideo.playbackRate = 1.0;
    }

    if (mobileVideo) {
      mobileVideo.playbackRate = 1.0;
    }
  }, []);

  return (
    <section id="home" className="section home-section">
      <div className="home-video-container">
        {isMobile ? (
          // Мобильная версия - одно видео
          <div className="mobile-screen">
            <video
              ref={mobileVideoRef}
              className="background-video"
              autoPlay
              muted
              playsInline
              loop
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                position: 'absolute'
              }}
            >
              <source src="/video/mobile.mp4" type="video/mp4" />
            </video>
          </div>
        ) : (
          // Десктоп версия - два видео
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
        )}
        
        {/* Визуальный маркер для центра экрана (будет скрыт на продакшене) */}
        <div className="center-marker"></div>
      </div>
      
      <div className="content-wrapper">
        <div className="hero-content">
          <div className="hero-text-background"></div>
          <div className="hero-text">
            <div className="text-with-shadow">
              <div className="text-shadow-element">Single Crystal Diamond Substrates</div>
              <h2 className="hero-subheadline">Single Crystal Diamond Substrates</h2>
            </div>
            <div className="text-with-shadow">
              <div className="text-shadow-element">Advanced HPHT technology for cutting-edge applications</div>
              <p className="hero-description">Advanced HPHT technology for cutting-edge applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection; 