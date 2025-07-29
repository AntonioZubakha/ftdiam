import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const ContactsSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } catch {
      setSubmitError('Failed to send message. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="contacts-section">
      <div className="container">
        <h2 className="contacts-headline gradient-headline">
          Contacts
        </h2>
        
        <div className="contacts-content">
          <div className="contact-info">
            <div className="contact-info-header">
              <h2>Contact Information</h2>
            </div>
            <div className="contact-info-content">
              <div className="contact-info-item">
                <a href="mailto:info@ftdiam.com" className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <div className="contact-text">
                  <div className="contact-label-row">
                    <span className="contact-label">Email</span>
                  </div>
                  <a href="mailto:info@ftdiam.com" className="contact-value">
                    info@ftdiam.com
                  </a>
                </div>
              </div>
              
              <div className="contact-info-item">
                <a href="tel:+19298224798" className="contact-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </a>
                <div className="contact-text">
                  <div className="contact-label-row">
                    <span className="contact-label">Phone</span>
                  </div>
                  <a href="tel:+19298224798" className="contact-value">
                    +1 929 822 4798
                  </a>
                </div>
              </div>
              
              <div className="contact-info-item">
                <a 
                  href="https://www.linkedin.com/company/ftdiam" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-icon"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <div className="contact-text">
                  <div className="contact-label-row">
                    <span className="contact-label">LinkedIn</span>
                  </div>
                  <a 
                    href="https://www.linkedin.com/company/ftdiam" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value"
                  >
                    Follow us
                  </a>
                </div>
              </div>
            
              <div className="contact-info-item">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=220+Park+Ave+PMB+83131+New+York+NY+10003+USA" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-icon"
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                </a>
                <div className="contact-text">
                  <div className="contact-label-row">
                    <span className="contact-label">Address</span>
                  </div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=220+Park+Ave+PMB+83131+New+York+NY+10003+USA" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value"
                  >
                    220 Park Ave PMB 83131<br />
                    New York, NY 10003, USA
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form" id="contact-form">
            <div className="form-header">
              <h3 className="form-title">Get in touch</h3>
            </div>
            
            {formSubmitted ? (
              <div className="form-message form-success">
                <p className="success-title">Thank you!</p>
                <p>Your message has been sent successfully.</p>
                <p className="success-note">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form action="https://formsubmit.co/info@ftdiam.com" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="New message from FTDiam website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <input type="hidden" name="_autoresponse" value="Thank you for contacting FTDiam. We have received your message and will get back to you soon." />
                
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your name" 
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your email" 
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Your message" 
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {submitError && (
                  <div className="form-message form-error">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <p className="form-note">
                  By submitting this form, you agree to our privacy policy. First-time users may receive a confirmation email from FormSubmit.
                </p>
                
                <button type="submit" className="contact-submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection; 