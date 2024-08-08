// import React from 'react';
// import styles from './Counter.module.css';

// const Counter = ({ quantity, setQuantity }) => {
//   const handleIncrement = () => setQuantity(quantity + 1);
//   const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   return (
//     <div className={styles.counterContainer}>
//       <button className={styles.button} onClick={handleDecrement}></button>
//       <span className={styles.quantity}>{quantity}</span>
//       <button className={styles.button} onClick={handleIncrement}></button>
//     </div>
//   );
// };

// export default Counter;

// import React from 'react';
// import styles from './Counter.module.css';

// const Counter = ({ quantity, setQuantity }) => {
//   const handleIncrement = () => setQuantity(quantity + 1);
//   const handleDecrement = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

//   return (
//     <div className={styles.counterContainer}>
//       <button className={styles.button} onClick={handleDecrement}></button>
//       <input 
//         type="number" 
//         value={quantity} 
//         onChange={(e) => setQuantity(Number(e.target.value))} 
//         className={styles.quantityInput}
//         min="0"
//       />
//       <button className={styles.button} onClick={handleIncrement}></button>
//     </div>
//   );
// };

// export default Counter;


import React from 'react';
import styles from './Counter.module.css';

const Counter = ({ quantity, setQuantity }) => {
  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    setQuantity(Number(e.target.value));
  };

  return (
    <div className={styles.counterContainer}>
      <button className={styles.button} onClick={handleDecrement}></button>
      <input 
        type="number" 
        value={quantity} 
        onChange={handleChange} 
        className={styles.quantityInput}
        min="1"
        onFocus={(e) => e.stopPropagation()} // Ensure focus doesn't cause issues
      />
      <button className={styles.button} onClick={handleIncrement}></button>
    </div>
  );
};

export default Counter;
