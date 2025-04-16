import React, { useState, useEffect, useRef } from 'react';
import '../styles/contact-modal.css';
import ReactDOM from 'react-dom';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Блокируем скролл страницы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Предотвращаем скролл на body
      document.body.classList.add('modal-open');
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      // Восстанавливаем скролл на body
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);
  
  // Функция для обработки нажатия клавиши Escape
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  
  // Reset form when modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay for closing animation
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setErrors({
          name: '',
          email: '',
          message: '',
        });
        setIsSubmitted(false);
        setIsLoading(false);
      }, 300);
    }
  }, [isOpen]);
  
  // Закрытие при клике вне модального окна
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate sending data to server
      setIsLoading(true);
      
      // Here would be the API call to submit the form
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        console.log('Form submitted:', formData);
        
        // Automatically close modal 3 seconds after successful submission
        setTimeout(() => {
          onClose();
        }, 3000);
      }, 1000);
    }
  };
  
  if (!isOpen) return null;
  
  // Используем портал для рендеринга модального окна в конце body
  return ReactDOM.createPortal(
    <div className="contact-modal-overlay" onClick={handleOutsideClick}>
      <div className="contact-modal-container" ref={modalRef}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close">×</button>
        
        <div className="contact-modal-header">
          <h2>Contact Us</h2>
        </div>
        
        <div className="contact-modal-content">
          {isSubmitted ? (
            <div className="contact-success-message">
              <i className="fas fa-check-circle contact-success-icon"></i>
              <h3>Thank you for your message!</h3>
              <p>We will get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.name && <p className="contact-error-text">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.email && <p className="contact-error-text">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-phone">Phone (optional)</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.message && <p className="contact-error-text">{errors.message}</p>}
              </div>
              
              <button 
                type="submit" 
                className={`contact-submit-button ${isLoading ? 'loading' : ''}`} 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal; 