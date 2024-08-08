import React, { useState } from 'react';
import styles from './GetDiscountButton.module.css';

function GetDiscountButton({ onClick, disabled }) {
  const [state, setState] = useState('normal');

  const handleClick = (e) => {
    if (disabled) return;

    setState('added');
    if (onClick) {
      onClick(e);
    }
    setTimeout(() => setState('normal'), 2000);
  };

  return (
    <button
      className={`${styles.getDiscountButton} ${state === 'added' ? styles.addedState : ''} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {state === 'added' ? 'Request Submitted' : 'Get a discount'}
    </button>
  );
}

export default GetDiscountButton;
