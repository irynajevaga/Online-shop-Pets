import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        padding: '10px 20px',
        fontSize: '18px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#0D50FF',
        color: '#FFFFFF',
        cursor: 'pointer',
        display: isVisible ? 'block' : 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'opacity 0.3s',
        zIndex: '1000',
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;