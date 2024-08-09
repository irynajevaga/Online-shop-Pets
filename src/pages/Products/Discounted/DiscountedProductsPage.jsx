import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../../components/ProductCard/ProductCard';
import Filter from '../../../components/FilterContainer/Filter/Filter';
import SelectSort from '../../../components/FilterContainer/SelectSort/SelectSort';
import styles from './DiscountedProductsPage.module.css';

const DiscountedProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState(searchParams.get("sortType") || "default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://pet-shop-backend.slavab.kz/products/all');
        const discountedProducts = response.data.filter(product => product.discont_price);
        setProducts(discountedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("An error occurred while fetching products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterAndSortProducts = () => {
      const minPrice = parseFloat(searchParams.get("minPrice") || "0");
      const maxPrice = parseFloat(searchParams.get("maxPrice") || Infinity);
      const includeDiscount = searchParams.get("includeDiscount") === "true";

      const filtered = products.filter(product => {
        const productPrice = product.discont_price || product.price;
        if (productPrice < minPrice || productPrice > maxPrice) return false;
        if (includeDiscount && !product.discont_price) return false;
        return true;
      });

      const sorted = filtered.sort((a, b) => {
        if (sortType === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortType === "priceHighToLow") {
          return (b.discont_price || b.price) - (a.discont_price || a.price);
        }
        if (sortType === "priceLowToHigh") {
          return (a.discont_price || a.price) - (b.discont_price || b.price);
        }
        return 0;
      });

      setFilteredProducts(sorted);
    };

    filterAndSortProducts();
  }, [products, searchParams, sortType]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return (
    <div style={{
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      {error}
    </div>
  );

  return (
    <div className="globalContainer">
      <div className={styles.discountedProductsPage}>
        <Breadcrumbs
          items={[
            { path: '/', label: 'Main page' },
            { path: '/categories', label: 'Discounted items', isActive: true }
          ]}
        />
        <div className={styles.pageTitle}>
          <h2>Discounted items</h2>
        </div>
        <div className={styles.filterContainer}>
          <Filter searchParams={searchParams} setSearchParams={setSearchParams} />
          <div className={styles.selectSort}>
            <span className={styles.sortTitle}>Sorted by</span>
            <SelectSort sortType={sortType} setSortType={setSortType} searchParams={searchParams} setSearchParams={setSearchParams} />
          </div>
        </div>
        <div className={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No discounted products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountedProductsPage;
