import React from 'react';

const FOUNDERS = [
  {
    name: 'Dmitry Semchenko',
    image: '/images/Dmitri.png',
    title: 'CTO',
    linkedin: 'https://www.linkedin.com/in/dmitry-semchenko-28272957/',
    bio: (
      <>
        Technical expert <br /> with 8+ years <br /> in diamond substrates<br />
        business and R&amp;D. <br /> Holder of AHPHT technology.
      </>
    ),
  },
  {
    name: 'Daniil Kurganov',
    image: '/images/Dan.png',
    title: 'CEO',
    linkedin: 'https://www.linkedin.com/in/daniel-kurganov-244638214/',
    bio: (
      <>
        15+ years <br /> in management, technical sales<br />
        and business development worldwide. Serial enterpreneur.
      </>
    ),
  },
] as const;

const BluePrint: React.FC = () => {
  return (
    <section className="blueprint-section" id="blueprint">
      <div className="blueprint-container">
        <h2 className="blueprint-headline blueprint-headline--section">Blueprint</h2>

        <div className="blueprint-content-layout">
          <div className="founder-column">
            <div className="founder-grid">
              {FOUNDERS.map((founder) => (
                <div key={founder.name} className="founder-block">
                  <div className="founder-photo-container">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="founder-photo-image"
                    />
                  </div>
                  <div className="founder-details">
                    <div className="founder-name-row">
                      <div className="founder-name-inner">
                        <h3 className="founder-name founder-name--inline">{founder.name}</h3>
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkedin-link linkedin-link--founder"
                          aria-label={`LinkedIn profile of ${founder.name}`}
                        >
                          in
                        </a>
                      </div>
                    </div>
                    <div className="founder-title-wrapper">
                      <div className="founder-title">{founder.title}</div>
                    </div>
                    <p className="founder-bio founder-bio--extended">{founder.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-column">
            <div className="info-block about-block">
              <h3 className="block-title">About Us</h3>
              <div className="block-content">
                <p className="info-block-text">
                  FTDiam is a US-based deep-tech start-up in advanced materials sector. We are revolutionizing the industry with the unique Advanced HPHT (AHPHT) technology. Since our inception, we&apos;ve been dedicated to producing the highest-quality single-crystal diamond substrates for cutting-edge applications.
                </p>
              </div>
            </div>

            <div className="info-block history-block">
              <h3 className="block-title">Our Mission</h3>
              <div className="block-content">
                <p className="info-block-text">
                  Our mission is to provide flawless technical diamonds that drive innovation across industries, from next-generation electronics to life-changing quantum solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BluePrint;
