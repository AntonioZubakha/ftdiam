import { useRef, useEffect } from 'react';

const HomeSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set playback rate to 0.5 for video
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5;
    }
  }, []);

  return (
    <section id="home" className="section home-section">
      <div className="home-video-container">
        <video 
          ref={videoRef}
          className="background-video" 
          autoPlay 
          muted 
          playsInline 
          loop
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
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