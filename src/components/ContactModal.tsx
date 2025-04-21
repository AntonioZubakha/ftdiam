import React, { useState, useEffect, useRef } from 'react';
import '../styles/contact-modal.css';
import ReactDOM from 'react-dom';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
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
        setIsSubmitted(false);
        setIsLoading(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 300);
    }
  }, [isOpen]);
  
  // Закрытие при клике вне модального окна
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    // FormSubmit обрабатывает отправку формы, но мы добавляем свою логику для UI
    setIsLoading(true);
    
    // Через 1.5 секунды после отправки показываем сообщение об успехе
    // Это только для улучшения UX, т.к. FormSubmit перенаправит на другую страницу
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Автоматически закрываем модальное окно через 3 секунды
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  // Используем портал для рендеринга модального окна в конце body
  return ReactDOM.createPortal(
    <div className="contact-modal-overlay" onClick={handleOutsideClick}>
      <div className="contact-modal-container" ref={modalRef}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        
        <div className="modal-header">
          <h2>Request a Quotation</h2>
        </div>
        
        <div className="modal-content">
          {isSubmitted ? (
            <div className="success-message">
              <i className="fas fa-check-circle success-icon"></i>
              <h3>Thank you for your request!</h3>
              <p>We will contact you shortly to discuss your quotation requirements.</p>
              <p className="success-note">
                <strong>Note:</strong> If this is your first time using our form, please check your email for a confirmation message from FormSubmit.
              </p>
            </div>
          ) : (
            <form 
              ref={formRef}
              className="contact-form" 
              action="https://formsubmit.co/info@ftdiam.com" 
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="Quotation Request from FTDiam Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={`${window.location.href.split('?')[0]}`} />
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-phone">Phone (optional)</label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Describe your requirements"
                  required
                  disabled={isLoading}
                />
              </div>
              

              
              <button 
                type="submit" 
                className={`submit-button ${isLoading ? 'loading' : ''}`} 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Request a Quotation'}
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