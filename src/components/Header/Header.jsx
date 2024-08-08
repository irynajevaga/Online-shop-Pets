// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import styles from './Header.module.css';
// import Logo from '../../assets/icons/logo.svg';
// import cartIcon from '../../assets/icons/cart.svg';

// export default function Header() {
//   const cartItems = useSelector((state) => state.cart.items);
//   const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <header className={styles.Header}>
//       <div className="globalContainer">
//         <div className={styles.headerContent}>
//           <Link to="/">
//             <img src={Logo} alt="Logo" />
//           </Link>
//           <nav className={styles.navBlock}>
//             <ul>
//               <li>
//                 <Link to="/" className={styles.navLink}>Main Page</Link>
//               </li>
//               <li>
//                 <Link to="/categories" className={styles.navLink}>Categories</Link>
//               </li>
//               <li>
//                 <Link to="/products" className={styles.navLink}>All Products</Link>
//               </li>
//               <li>
//                 <Link to="/discounted-products" className={styles.navLink}>All Sales</Link>
//               </li>
//             </ul>
//           </nav>
//           <Link to="/cart" className={styles.cartLink}>
//             <img src={cartIcon} alt="Cart" />
//             {cartItemsCount > 0 && (
//               <span className={styles.cartBadge}>{cartItemsCount}</span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.css';
import Logo from '../../assets/icons/logo.svg';
import cartIcon from '../../assets/icons/cart.svg';

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.Header}>
      <div className="globalContainer">
        <div className={styles.headerContent}>
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <div
            className={`${styles.burgerMenu} ${menuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </div>
          <nav className={`${styles.navBlock} ${menuOpen ? styles.open : ''}`}>
            <ul>
              <li>
                <Link to="/" className={styles.navLink}>Main Page</Link>
              </li>
              <li>
                <Link to="/categories" className={styles.navLink}>Categories</Link>
              </li>
              <li>
                <Link to="/products" className={styles.navLink}>All Products</Link>
              </li>
              <li>
                <Link to="/discounted-products" className={styles.navLink}>All Sales</Link>
              </li>
            </ul>
          </nav>
          <Link to="/cart" className={styles.cartLink}>
            <img src={cartIcon} alt="Cart" />
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
