import { useState } from 'react';

const TechnologySection = () => {
  const [activeTab, setActiveTab] = useState('process');

  return (
    <section id="technology" className="section technology-section">
      <div className="content-wrapper">
        <h2 className="headline">Our Technology</h2>
        <p className="section-description">
          Our proprietary AHPHT (Advanced High Pressure High Temperature) technology
          enables us to produce the highest-quality single-crystal diamond substrates with
          unprecedented consistency and customization capabilities.
        </p>
        
        <div className="technology-tabs">
          <button 
            className={`tab-button ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            Process
          </button>
          <button 
            className={`tab-button ${activeTab === 'advantage' ? 'active' : ''}`}
            onClick={() => setActiveTab('advantage')}
          >
            Advantages
          </button>
          <button 
            className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            Comparison
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'process' && (
            <div className="process-content">
              <div className="process-overview">
                <p>Our AHPHT technology represents a significant advancement over traditional HPHT diamond synthesis methods. By precisely controlling pressure, temperature, and carbon source purity throughout the growth process, we achieve diamond crystals with exceptional quality and consistency.</p>
              </div>
              
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-details">
                    <h3>Material Preparation</h3>
                    <p>Ultra-pure carbon source materials are carefully selected and prepared.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-details">
                    <h3>Seed Placement</h3>
                    <p>Diamond seed crystals are precisely positioned in the growth chamber.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-details">
                    <h3>Pressure Application</h3>
                    <p>Advanced pressure systems create the extreme conditions necessary for diamond formation.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-details">
                    <h3>Controlled Growth</h3>
                    <p>Precise temperature gradient manipulation ensures optimal crystal growth.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">5</div>
                  <div className="step-details">
                    <h3>Quality Control</h3>
                    <p>Rigorous testing ensures each crystal meets our exacting standards.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'advantage' && (
            <div className="advantage-content">
              <div className="advantages-grid">
                <div className="advantage-card">
                  <div className="advantage-icon">
                    <i className="fas fa-gem"></i>
                  </div>
                  <h3>Superior Quality</h3>
                  <p>Ultra-low defect density and nitrogen content below 5 ppb.</p>
                </div>
                <div className="advantage-card">
                  <div className="advantage-icon">
                    <i className="fas fa-ruler-combined"></i>
                  </div>
                  <h3>Larger Sizes</h3>
                  <p>Up to 15x15 mm substrates, exceeding industry standards.</p>
                </div>
                <div className="advantage-card">
                  <div className="advantage-icon">
                    <i className="fas fa-balance-scale"></i>
                  </div>
                  <h3>Consistent Results</h3>
                  <p>Proprietary process ensures batch-to-batch consistency.</p>
                </div>
                <div className="advantage-card">
                  <div className="advantage-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <h3>Cost Efficiency</h3>
                  <p>Advanced technology enables more competitive pricing.</p>
                </div>
                <div className="advantage-card">
                  <div className="advantage-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h3>Customizable Properties</h3>
                  <p>Tailored solutions for specific applications.</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'comparison' && (
            <div className="comparison-content">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Standard HPHT</th>
                    <th>CVD</th>
                    <th>FTDiam AHPHT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nitrogen Content</td>
                    <td>50-200 ppb</td>
                    <td>5-50 ppb</td>
                    <td className="comparison-highlight">&lt;5 ppb</td>
                  </tr>
                  <tr>
                    <td>Maximum Size</td>
                    <td>8x8 mm</td>
                    <td>10x10 mm</td>
                    <td className="comparison-highlight">15x15 mm</td>
                  </tr>
                  <tr>
                    <td>Dislocation Density</td>
                    <td>10⁴-10⁵ cm⁻²</td>
                    <td>10³-10⁴ cm⁻²</td>
                    <td className="comparison-highlight">10¹ cm⁻²</td>
                  </tr>
                  <tr>
                    <td>Production Time</td>
                    <td>5-7 days</td>
                    <td>7-14 days</td>
                    <td className="comparison-highlight">3-5 days</td>
                  </tr>
                  <tr>
                    <td>Cost Efficiency</td>
                    <td>Medium</td>
                    <td>Low</td>
                    <td className="comparison-highlight">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection; 