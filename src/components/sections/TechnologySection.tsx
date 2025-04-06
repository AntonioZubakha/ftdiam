import React from 'react';

const TechnologySection = () => {
  return (
    <section id="technology" className="section technology-section">
      <div className="background"></div>
      <div className="content-wrapper">
        <h2 className="headline">Our Technology (Advanced HPHT)</h2>
        <p className="section-description">
          An added technological setup that allows for controlling and adjusting parameters to achieve the optimal synthesis conditions.
          Specialized software for monitoring synthesis parameters.
          Unique know-how in the composition 
          and preparation methods of the synthesis cell for crystal growth.
        </p>
        
        <div className="technology-content">
          {/* Process Description */}
          <div className="process-content">
            
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
          
          {/* Advantages */}
          <h3 className="subheadline">Key Advantages</h3>
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
      </div>
    </section>
  );
};

export default TechnologySection; 