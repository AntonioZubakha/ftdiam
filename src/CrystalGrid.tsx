import { useEffect, useRef } from 'react';
import './CrystalGrid.css';

interface Node {
  x: number;
  y: number;
  pulseDelay: number;
}

interface Line {
  startNode: number;
  endNode: number;
  glowDelay: number;
}

const CrystalGrid = () => {
  const nodesRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const diamondsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Generate crystal nodes and grid
    const generateCrystalGrid = () => {
      // Generate nodes
      const nodes: Node[] = [];
      const gridSize = 200; // Distance between nodes
      
      // Calculate how many nodes we need
      const columns = Math.ceil(windowWidth / gridSize) + 1;
      const rows = Math.ceil(windowHeight / gridSize) + 1;
      
      // Create nodes
      for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
          // Add some randomness to position
          const randomOffsetX = Math.random() * 40 - 20;
          const randomOffsetY = Math.random() * 40 - 20;
          
          nodes.push({
            x: col * gridSize + randomOffsetX,
            y: row * gridSize + randomOffsetY,
            pulseDelay: Math.random() * 5 // Random delay for pulse animation
          });
        }
      }
      
      // Create node elements
      if (nodesRef.current) {
        nodes.forEach((node) => {
          const nodeEl = document.createElement('div');
          nodeEl.className = 'crystal-node';
          nodeEl.style.left = `${node.x}px`;
          nodeEl.style.top = `${node.y}px`;
          // Возвращаем анимацию пульсации
          nodeEl.style.animation = `nodePulse ${3 + Math.random() * 2}s ${node.pulseDelay}s infinite alternate`;
          nodesRef.current?.appendChild(nodeEl);
        });
      }
      
      // Create lines between nodes
      const lines: Line[] = [];
      if (linesRef.current) {
        // Connect nodes horizontally and vertically
        for (let i = 0; i < nodes.length; i++) {
          // Find nodes that are close to this one
          for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
              Math.pow(nodes[i].x - nodes[j].x, 2) + 
              Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            // Only connect if they're close enough
            if (distance < gridSize * 1.5) {
              lines.push({
                startNode: i,
                endNode: j,
                glowDelay: Math.random() * 5
              });
            }
          }
        }
        
        // Create line elements
        lines.forEach(line => {
          const lineEl = document.createElement('div');
          lineEl.className = 'crystal-line';
          
          const startNode = nodes[line.startNode];
          const endNode = nodes[line.endNode];
          
          // Calculate length and angle
          const length = Math.sqrt(
            Math.pow(endNode.x - startNode.x, 2) + 
            Math.pow(endNode.y - startNode.y, 2)
          );
          
          const angle = Math.atan2(
            endNode.y - startNode.y,
            endNode.x - startNode.x
          );
          
          // Position and rotate line
          lineEl.style.left = `${startNode.x}px`;
          lineEl.style.top = `${startNode.y}px`;
          lineEl.style.width = `${length}px`;
          lineEl.style.transform = `rotate(${angle}rad)`;
          // Возвращаем анимацию свечения
          lineEl.style.animation = `lineGlow ${4 + Math.random() * 3}s ${line.glowDelay}s infinite alternate`;
          
          linesRef.current?.appendChild(lineEl);
        });
      }
      
      return nodes;
    };
    
    // Generate floating diamonds
    const generateFloatingDiamonds = () => {
      if (diamondsRef.current) {
        // Create 5 floating diamonds
        for (let i = 0; i < 5; i++) {
          const diamondEl = document.createElement('div');
          diamondEl.className = 'floating-diamond';
          diamondEl.style.left = `${Math.random() * windowWidth}px`;
          diamondEl.style.top = `${Math.random() * windowHeight}px`;
          diamondEl.style.animationDelay = `${Math.random() * 5}s`;
          // Random size
          const size = 30 + Math.random() * 50;
          diamondEl.style.width = `${size}px`;
          diamondEl.style.height = `${size}px`;
          // Random rotation
          diamondEl.style.transform = `rotate(${45 + Math.random() * 45}deg)`;
          diamondsRef.current?.appendChild(diamondEl);
        }
      }
    };
    
    // Initialize everything
    generateCrystalGrid();
    generateFloatingDiamonds();
    
    // Handle window resize
    const handleResize = () => {
      // Clear all elements
      if (nodesRef.current) nodesRef.current.innerHTML = '';
      if (linesRef.current) linesRef.current.innerHTML = '';
      if (diamondsRef.current) diamondsRef.current.innerHTML = '';
      
      // Regenerate everything
      generateCrystalGrid();
      generateFloatingDiamonds();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (nodesRef.current) nodesRef.current.innerHTML = '';
      if (linesRef.current) linesRef.current.innerHTML = '';
      if (diamondsRef.current) diamondsRef.current.innerHTML = '';
    };
  }, []);
  
  return (
    <div className="crystal-grid">
      <div className="crystal-structure"></div>
      <div className="parallax-overlay"></div>
      <div className="crystal-nodes" ref={nodesRef}></div>
      <div className="crystal-lines" ref={linesRef}></div>
      <div className="floating-diamonds" ref={diamondsRef}></div>
      
      <div className="diamond-molecule">
        <div className="carbon-atom center"></div>
        <div className="carbon-atom top"></div>
        <div className="carbon-atom right"></div>
        <div className="carbon-atom bottom"></div>
        <div className="carbon-atom left"></div>
        
        <div className="carbon-bond center-top"></div>
        <div className="carbon-bond center-right"></div>
        <div className="carbon-bond center-bottom"></div>
        <div className="carbon-bond center-left"></div>
      </div>
    </div>
  );
};

export default CrystalGrid; 