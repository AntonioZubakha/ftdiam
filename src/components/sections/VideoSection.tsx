import React, { useRef, useEffect } from 'react';

const VideoSection: React.FC = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Handle video loop and playback
    const handleVideo1End = () => {
      if (videoRef1.current) {
        videoRef1.current.play();
      }
    };

    const handleVideo2End = () => {
      if (videoRef2.current) {
        videoRef2.current.play();
      }
    };

    // Add event listeners
    if (videoRef1.current) {
      videoRef1.current.addEventListener('ended', handleVideo1End);
      videoRef1.current.play();
    }

    if (videoRef2.current) {
      videoRef2.current.addEventListener('ended', handleVideo2End);
      videoRef2.current.play();
    }

    // Clean up
    return () => {
      if (videoRef1.current) {
        videoRef1.current.removeEventListener('ended', handleVideo1End);
      }
      if (videoRef2.current) {
        videoRef2.current.removeEventListener('ended', handleVideo2End);
      }
    };
  }, []);

  return (
    <section id="video-section" className="section video-section">
      <div className="video-container">
        <div className="video-wrapper left-video animate-fade-left delay-1">
          <video
            ref={videoRef1}
            muted
            playsInline
            autoPlay
            loop
            className="fullscreen-video"
          >
            <source src="/video/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-wrapper right-video animate-fade-right delay-2">
          <video
            ref={videoRef2}
            muted
            playsInline
            autoPlay
            loop
            className="fullscreen-video"
          >
            <source src="/video/2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 