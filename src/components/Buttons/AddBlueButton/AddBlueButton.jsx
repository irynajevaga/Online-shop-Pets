import { useState } from 'react';
import styles from './AddBlueButton.module.css';

function AddBlueButton({ onClick }) {
  const [state, setState] = useState('normal');

  const handleClick = (e) => {
    setState('added');
    if (onClick) {
      onClick(e);
    }
    setTimeout(() => setState('normal'), 2000);
  };

  return (
    <button
      className={`${styles.addBlueButton} ${state === 'added' ? styles.addedState : ''}`}
      onClick={handleClick}
    >
      {state === 'added' ? 'Added' : 'Add to cart'}
    </button>
  );
}

export default AddBlueButton;
