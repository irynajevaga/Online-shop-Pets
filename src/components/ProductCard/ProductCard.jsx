// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import AddBlueButton from '../Buttons/AddBlueButton/AddBlueButton';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 })); // Добавляем товар с количеством 1
  };

  const calculateDiscountPercentage = (price, discountPrice) => {
    if (price && discountPrice) {
      const discount = ((price - discountPrice) / price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <li className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img src={`https://pet-shop-backend.slavab.kz/${product.image}`} alt={product.title} className={styles.productImage} />
        {product.discont_price && (
          <div className={styles.discountFlag}>
            -{calculateDiscountPercentage(product.price, product.discont_price)}%
          </div>
        )}
        <div className={styles.addButtonContainer}>
          <AddBlueButton onClick={handleAddToCart} />
        </div>
      </div>
      <Link to={`/products/${product.id}`} className={styles.productLink}>
        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <div className={styles.priceContainer}>
            {product.discont_price ? (
              <>
                <span className={styles.currentPrice}>${product.discont_price}</span>
                <span className={styles.originalPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.currentPrice}>${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;