import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/discountPage.css';

const DiscountPage: React.FC = () => {
  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]');
    const prevContent = existing?.getAttribute('content') ?? null;
    let meta = existing as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');
    return () => {
      if (prevContent) {
        meta?.setAttribute('content', prevContent);
      } else {
        meta?.remove();
      }
    };
  }, []);

  return (
    <div className="discount-page">
      <div className="discount-page__content">
        <img
          src="/images/Logo.png"
          alt="FTDiam"
          className="discount-page__logo"
        />
        <p className="discount-page__text">
          Send the words
          <br />
          &ldquo;I ate a chocolate plate&rdquo;
          <br />
          to{' '}
          <a href="mailto:info@ftdiam.com" className="discount-page__email">
            info@ftdiam.com
          </a>
          <br />
          and receive a 10% discount on your next order :)
        </p>
        <Link to="/" className="discount-page__link">
          Go to FTDiam website
        </Link>
      </div>
    </div>
  );
};

export default DiscountPage;
