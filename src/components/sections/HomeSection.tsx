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
          <div className="split-screen-left">
            <video 
              ref={leftVideoRef}
              className="background-video" 
              autoPlay 
              muted 
              playsInline 
              loop
              style={{ objectFit: 'cover' }}
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
      </div>
      
      <div className="content-wrapper">
        <div className="hero-content">
          <img src="/images/Logo_white.png" alt="FTDiam Logo" className="hero-logo" />
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