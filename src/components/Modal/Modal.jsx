import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const content = Array.isArray(children)
    ? children.map((child, index) => <p key={index}>{child}</p>)
    : children;

  return (
    <div className={styles.Modal} onClick={onClose}>
      <div 
        className={styles.ModalContent} 
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          className={styles.CloseButton} 
          onClick={onClose} 
          aria-label="Close modal" 
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M33 11L11 33" stroke="none" strokeWidth="3.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 11L33 33" stroke="none" strokeWidth="3.66667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
