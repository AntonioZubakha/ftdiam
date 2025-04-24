import React, { useEffect, useState, useRef } from 'react';

const ClientsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollPos = useRef(0);
  const rafID = useRef<number | null>(null);
  
  // Client logos array
  const clientLogos = [
    { logo: '/images/client1.png', alt: 'Applied Diamond, Inc.' },
    { logo: '/images/client2.png', alt: 'Michigan State University' },
    { logo: '/images/client3.jpg', alt: 'Argonne National Laboratory' },
//    { logo: '/images/client4.jpg', alt: 'ESRF' },
    { logo: '/images/client5.png', alt: 'HiQuTe Diamond' },
    { logo: '/images/client6.png', alt: 'LSPM-CNRS' },
    { logo: '/images/client7.jpg', alt: 'DIAMFAB' },
    { logo: '/images/client8.jpg', alt: 'UC Santa Barbara' }
  ];
  
  // Create 3 sets of logos for better infinite effect
  const tripleLogos = [...clientLogos, ...clientLogos, ...clientLogos];
  
  useEffect(() => {
    // Check if the screen is mobile-sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    const slider = sliderRef.current;
    const track = trackRef.current;
    
    if (!slider || !track) return;
    
    // Get the width of one logo set (8 logos)
    const getLogoSetWidth = () => {
      const slides = document.querySelectorAll('.logo-slide');
      if (!slides.length) return 2000; // Fallback value
      
      // Calculate widths based on screen size
      if (window.innerWidth <= 576) return slides[0].clientWidth * 8;
      if (window.innerWidth <= 768) return 180 * 8;
      if (window.innerWidth <= 992) return 200 * 8;
      if (window.innerWidth <= 1200) return 225 * 8;
      return 250 * 8;
    };
    
    // Create a dynamic keyframe animation
    const createKeyframeAnimation = (startPosition: number) => {
      // Remove any existing keyframe animation with this name
      const existingStyle = document.getElementById('carousel-keyframes');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Calculate the total width of one set of logos
      const setWidth = getLogoSetWidth();
      
      // Ensure startPosition is within the bounds of one set
      const normalizedPosition = startPosition % setWidth;
      
      // Create a new style element with updated keyframes
      const styleSheet = document.createElement('style');
      styleSheet.id = 'carousel-keyframes';
      styleSheet.textContent = `
        @keyframes scroll-dynamic {
          0% {
            transform: translateX(${normalizedPosition}px);
          }
          100% {
            transform: translateX(${normalizedPosition - setWidth}px);
          }
        }
      `;
      document.head.appendChild(styleSheet);
    };
    
    // Function to disable animation and capture current position
    const disableAnimation = () => {
      const transform = window.getComputedStyle(track).getPropertyValue('transform');
      const matrix = new DOMMatrix(transform);
      const currentTranslateX = matrix.m41;
      
      // Stop the animation
      track.style.animation = 'none';
      // Force reflow
      track.offsetHeight;
      
      // Apply the current transform position as an inline style
      track.style.transform = `translateX(${currentTranslateX}px)`;
      
      return currentTranslateX;
    };
    
    // Function to enable animation from the current position
    const enableAnimation = (currentPosition: number) => {
      // Create a new dynamic keyframe animation starting from the current position
      createKeyframeAnimation(currentPosition);
      
      // Apply the new animation
      track.style.transform = '';
      track.style.animation = 'scroll-dynamic 30s linear infinite';
    };
    
    // Handle mouse down event
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      
      // Clear any ongoing animation frame
      if (rafID.current !== null) {
        cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      
      // Mark as dragging and add visual cues
      isDragging.current = true;
      slider.classList.add('active');
      track.classList.add('grabbing');
      
      // Save start position
      startPos.current = e.clientX;
      
      // Capture current position and disable animation
      const currentPosition = disableAnimation();
      scrollPos.current = currentPosition;
    };
    
    // Handle mouse move event
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      // Calculate how far we've moved
      const currentPos = e.clientX;
      const diff = currentPos - startPos.current;
      
      // Apply the new transform
      const newPos = scrollPos.current + diff;
      track.style.transform = `translateX(${newPos}px)`;
    };
    
    // Handle mouse up event
    const handleMouseUp = () => {
      if (!isDragging.current) return;
      
      // Get final position after dragging
      const transform = window.getComputedStyle(track).getPropertyValue('transform');
      const matrix = new DOMMatrix(transform);
      const finalPosition = matrix.m41;
      
      // No longer dragging
      isDragging.current = false;
      slider.classList.remove('active');
      track.classList.remove('grabbing');
      
      // Resume animation from the current position with a slight delay
      setTimeout(() => {
        enableAnimation(finalPosition);
      }, 50);
    };
    
    // Handle touch start
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      
      // Clear any ongoing animation frame
      if (rafID.current !== null) {
        cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      
      // Mark as dragging and add visual cues
      isDragging.current = true;
      slider.classList.add('active');
      track.classList.add('grabbing');
      
      // Save start position
      startPos.current = e.touches[0].clientX;
      
      // Capture current position and disable animation
      const currentPosition = disableAnimation();
      scrollPos.current = currentPosition;
    };
    
    // Handle touch move
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      e.preventDefault();
      
      // Calculate how far we've moved
      const currentPos = e.touches[0].clientX;
      const diff = currentPos - startPos.current;
      
      // Apply the new transform
      const newPos = scrollPos.current + diff;
      track.style.transform = `translateX(${newPos}px)`;
    };
    
    // Initialize the animation with a dynamic keyframe
    createKeyframeAnimation(0);
    track.style.animation = 'scroll-dynamic 30s linear infinite';
    
    // Add event listeners
    slider.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    
    // Touch events
    slider.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', checkMobile);
      
      slider.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
      
      slider.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
      
      // Remove dynamic style element
      const styleElement = document.getElementById('carousel-keyframes');
      if (styleElement) {
        styleElement.remove();
      }
      
      // Cancel any running animation frame
      if (rafID.current !== null) {
        cancelAnimationFrame(rafID.current);
      }
    };
  }, []);
  
  return (
    <section className="clients-section" id="clients">
      <div className="section-container">
        <h2 className="section-title">Our Clients</h2>
        
        <div className="logo-slider" ref={sliderRef}>
          <div className="logo-slide-track" ref={trackRef}>
            {tripleLogos.map((client, index) => (
              <div key={`logo-${index}`} className="logo-slide">
                <img 
                  src={client.logo} 
                  alt={client.alt} 
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection; 