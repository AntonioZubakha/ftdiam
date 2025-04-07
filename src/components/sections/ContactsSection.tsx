import { useState, FormEvent } from 'react';

const ContactsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  // Минималистичный фон с градиентом
  const backgroundStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.95) 100%)',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: 'Thank you! We will contact you shortly.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1000);
  };

  return (
    <section id="contacts" className="section contacts-section">
      <div style={backgroundStyle}></div>
      <div className="content-wrapper">
        <div className="contacts-inner">
          {/* Контактная информация */}
          <div className="contact-details">
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h2 className="contact-headline">Get in Touch</h2>
              <p className="contact-tagline">We'd love to hear from you</p>
              <div className="contact-separator"></div>
            </div>
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-label">Email</span>
                <a href="mailto:info@ftdiam.com" className="contact-value">info@ftdiam.com</a>
              </div>
              
              <div className="contact-info-item">
                <span className="contact-label">Phone</span>
                <a href="tel:+16172752599" className="contact-value">+1 617 275 2599</a>
              </div>
              
              <div className="contact-info-item">
                <span className="contact-label">Address</span>
                <span className="contact-value">220 Park Ave PMB 83131<br />New York, NY 10003, USA</span>
              </div>
              
              <div className="contact-info-item" style={{ alignItems: 'center' }}>
                <span className="contact-label">Follow Us</span>
                <a href="https://www.linkedin.com/company/ftdiam" target="_blank" rel="noopener noreferrer" className="contact-value social-link">
                  <i className="fab fa-linkedin"></i>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          
          {/* Форма контактов */}
          <div className="contact-form-wrapper">
            <form className="contact-form-minimal" onSubmit={handleSubmit}>
              {formStatus && (
                <div className={`form-status-minimal ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <div className="form-field">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="Your name *"
                  className="minimal-input"
                />
              </div>
              
              <div className="form-field">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="Your email *"
                  className="minimal-input"
                />
              </div>
              
              <div className="form-field">
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message *"
                  className="minimal-textarea"
                ></textarea>
              </div>
              
              <button type="submit" className="minimal-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection; 