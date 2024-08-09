import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './SaleBlock.module.css';
import ProductCard from '../ProductCard/ProductCard';

const SaleBlock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pet-shop-backend.slavab.kz/products/all');
        // Фильтруем товары, чтобы оставить только те, у которых есть discont_price
        const discountedProducts = response.data.filter(product => product.discont_price);
        // Ограничиваем количество товаров до 4
        setProducts(discountedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="globalContainer">
      <div className={styles.saleBlock}>
        
        <div className="titleBlock">
          <h2>Sale</h2>
          <div className="titleBlockLine"></div>
          <Link to="/discounted-products" className="titleBlockButton">
            All sales
          </Link>
        </div>

        <ul className={styles.gridProductContainer}>
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        
      </div>
    </div>
  );
};

export default SaleBlock;
