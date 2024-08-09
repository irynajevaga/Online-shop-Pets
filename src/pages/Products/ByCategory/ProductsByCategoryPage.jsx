import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from "../../../components/ProductCard/ProductCard";
import Filter from "../../../components/FilterContainer/Filter/Filter";
import DiscountedItems from "../../../components/FilterContainer/DiscountedItems/DiscountedItems";
import SelectSort from "../../../components/FilterContainer/SelectSort/SelectSort";
import styles from "./ProductsByCategoryPage.module.css";

function ProductsByCategoryPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [sortType, setSortType] = useState(searchParams.get("sortType") || "default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://pet-shop-backend.slavab.kz/categories/${categoryId}`);
        if (response.status === 200) {
          setProducts(response.data.data);
          setCategoryName(response.data.category.title);
        } else {
          setError("Failed to fetch products. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const filteredProducts = products
    .filter((product) => {
      const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
      const maxPrice = parseFloat(searchParams.get("maxPrice")) || Infinity;
      const includeDiscount = searchParams.get("includeDiscount") === "true";
      const productPrice = product.discont_price || product.price;

      if (productPrice < minPrice || productPrice > maxPrice) return false;
      if (includeDiscount && !product.discont_price) return false;

      return true;
    })
    .sort((a, b) => {
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
      <div className={styles.productsByCategoryPage}>
        <Breadcrumbs
          items={[
            { path: '/', label: 'Main page' },
            { path: '/categories', label: 'Categories' },
            { path: `/categories/${categoryId}`, label: categoryName, isActive: true }
          ]}
        />
        <div className={styles.categoryPageTitle}>
          <h2>{categoryName}</h2>
        </div>
        <div className={styles.filterContainer}>
          <Filter searchParams={searchParams} setSearchParams={setSearchParams} />
          <DiscountedItems searchParams={searchParams} setSearchParams={setSearchParams} />
          <div className={styles.selectSort}>
            <span className={styles.sortTitle}>Sorted</span>
            <SelectSort sortType={sortType} setSortType={setSortType} searchParams={searchParams} setSearchParams={setSearchParams} />
          </div>
        </div>
        <div className={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={(product) => console.log("Added to cart:", product)}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsByCategoryPage;
