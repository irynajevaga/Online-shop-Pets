import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import AddBlueButton from '../../components/Buttons/AddBlueButton/AddBlueButton';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Counter from '../../components/Counter/Counter';
import styles from './ProductDetailsPage.module.css';
import { addToCart } from '../../redux/cartSlice';

const API_URL = "https://pet-shop-backend.slavab.kz";  // URL для API запросов

function ProductDetailsPage() {
  const { productId } = useParams();  // Получаем параметр productId из URL
  const [product, setProduct] = useState(null);  // Состояние для хранения данных о продукте
  const [categories, setCategories] = useState([]);  // Состояние для хранения списка категорий
  const [error, setError] = useState(null);  // Состояние для хранения ошибки
  const [isLoading, setIsLoading] = useState(true);  // Состояние для отслеживания загрузки данных
  const [quantity, setQuantity] = useState(1);  // Состояние для хранения количества выбранного продукта
  const dispatch = useDispatch();  // Функция для отправки действий в Redux store
  const [isExpanded, setIsExpanded] = useState(false);  // Состояние для управления отображением полного описания продукта

  useEffect(() => {
    const fetchProductAndCategories = async () => {  // Функция для получения данных о продукте и категориях
      setIsLoading(true);
      setError(null);
      try {
        const productResponse = await axios.get(`${API_URL}/products/${productId}`);  // Запрос данных о продукте
        if (productResponse.data && productResponse.data.length > 0) {
          setProduct(productResponse.data[0]);  // Устанавливаем данные продукта в состояние
        } else {
          setProduct(null);
          setError("Product not found.");  // Устанавливаем ошибку, если продукт не найден
        }

        const categoriesResponse = await axios.get(`${API_URL}/categories/all`);  // Запрос данных о категориях
        setCategories(categoriesResponse.data);  // Устанавливаем список категорий в состояние
      } catch (error) {
        setError("An error occurred while fetching product details. Please try again later.");  // Устанавливаем ошибку в случае неудачи запроса
      } finally {
        setIsLoading(false);  // Устанавливаем состояние загрузки в false после завершения запросов
      }
    };

    fetchProductAndCategories();  // Вызываем функцию для получения данных
  }, [productId]);  // useEffect срабатывает при изменении productId

  const getCategoryName = (categoryId) => {  // Функция для получения названия категории по ее ID
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.title : 'Unknown Category';
  };

  const handleAddToCart = () => {  // Функция для добавления продукта в корзину
    if (product) {
      dispatch(addToCart({ ...product, quantity }));  // Отправляем действие для добавления продукта в корзину
    }
  };

  if (isLoading) return <p>Loading...</p>;  // Отображаем сообщение о загрузке, если данные еще не получены
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

  if (!product) return <p>Product not found.</p>;  // Отображаем сообщение, если продукт не найден

  return (
    <div className="globalContainer">
      <div className={styles.productDetailsPage}>
        <Breadcrumbs
          items={[
            { path: '/', label: 'Main page' },
            { path: '/categories', label: 'Categories' },
            { path: `/categories/${product.categoryId}`, label: getCategoryName(product.categoryId) },
            { path: `/products/${productId}`, label: product.title, isActive: true }
          ]}
        />
        <div className={styles.productContainer}>
          <div className={styles.productImageContainer}>
            <img src={`${API_URL}${product.image}`} alt={product.title} className={styles.productImage} />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <div className={styles.productPrice}>
              <span className={styles.currentPrice}>${product.discont_price || product.price}</span>
              {product.discont_price && (
                <>
                  <span className={styles.originalPrice}>${product.price}</span>
                  <span className={styles.discountFlag}>
                    -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                  </span>
                </>
              )}
            </div>
            <div className={styles.counterAndButton}>
              <Counter quantity={quantity} setQuantity={setQuantity} />
              <AddBlueButton onClick={handleAddToCart} />
            </div>
            <div className={styles.productDescription}>
              <h3>Description</h3>
              <p 
                className={`${styles.productDescriptionText} ${isExpanded ? styles.expanded : styles.collapsed}`}
              >
                {product.description}
              </p>
              <button 
                className={styles.readMoreButton} 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ display: product.description ? 'block' : 'none' }}
              >
                {isExpanded ? 'Close' : 'More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;






// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import AddBlueButton from '../../components/Buttons/AddBlueButton/AddBlueButton';
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
// import Counter from '../../components/Counter/Counter';
// import styles from './ProductDetailsPage.module.css';
// import { addToCart } from '../../redux/cartSlice';

// const API_URL = "http://localhost:3333";

// function ProductDetailsPage() {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [showReadMore, setShowReadMore] = useState(false);

//   const descriptionRef = useRef(null);

//   useEffect(() => {
//     const fetchProductAndCategories = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const productResponse = await axios.get(`${API_URL}/products/${productId}`);
//         if (productResponse.data && productResponse.data.length > 0) {
//           setProduct(productResponse.data[0]);
//         } else {
//           setProduct(null);
//           setError("Product not found.");
//         }

//         const categoriesResponse = await axios.get(`${API_URL}/categories/all`);
//         setCategories(categoriesResponse.data);
//       } catch (error) {
//         setError("An error occurred while fetching product details. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProductAndCategories();
//   }, [productId]);

//   useEffect(() => {
//     const updateReadMoreVisibility = () => {
//       if (descriptionRef.current) {
//         const lineHeight = parseFloat(window.getComputedStyle(descriptionRef.current).lineHeight);
//         const maxHeight = lineHeight * 8;
//         setShowReadMore(descriptionRef.current.scrollHeight > maxHeight);
//       }
//     };

//     // Call once on mount and after any expansion
//     updateReadMoreVisibility();

//     // Attach ResizeObserver to track height changes
//     const resizeObserver = new ResizeObserver(updateReadMoreVisibility);
//     if (descriptionRef.current) {
//       resizeObserver.observe(descriptionRef.current);
//     }

//     return () => {
//       if (descriptionRef.current) {
//         resizeObserver.unobserve(descriptionRef.current);
//       }
//     };
//   }, [product, isExpanded]);

//   const getCategoryName = (categoryId) => {
//     const category = categories.find(cat => cat.id === categoryId);
//     return category ? category.title : 'Unknown Category';
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart({ ...product, quantity }));
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return (
//     <div style={{
//       color: 'red',
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginTop: '50px'
//     }}>
//       {error}
//     </div>
//   );

//   if (!product) return <p>Product not found.</p>;

//   return (
//     <div className="globalContainer">
//       <div className={styles.productDetailsPage}>
//         <Breadcrumbs
//           items={[
//             { path: '/', label: 'Main page' },
//             { path: '/categories', label: 'Categories' },
//             { path: `/categories/${product.categoryId}`, label: getCategoryName(product.categoryId) },
//             { path: `/products/${productId}`, label: product.title, isActive: true }
//           ]}
//         />
//         <div className={styles.productContainer}>
//           <div className={styles.productImageContainer}>
//             <img src={`${API_URL}${product.image}`} alt={product.title} className={styles.productImage} />
//           </div>
//           <div className={styles.productInfo}>
//             <h2 className={styles.productTitle}>{product.title}</h2>
//             <div className={styles.productPrice}>
//               <span className={styles.currentPrice}>${product.discont_price || product.price}</span>
//               {product.discont_price && (
//                 <>
//                   <span className={styles.originalPrice}>${product.price}</span>
//                   <span className={styles.discountFlag}>
//                     -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
//                   </span>
//                 </>
//               )}
//             </div>
//             <div className={styles.counterAndButton}>
//               <Counter quantity={quantity} setQuantity={setQuantity} />
//               <AddBlueButton onClick={handleAddToCart} />
//             </div>
//             <div className={styles.productDescription}>
//               <h3>Description</h3>
//               <p 
//                 ref={descriptionRef} 
//                 className={`${styles.productDescriptionText} ${isExpanded ? styles.expanded : styles.collapsed}`}
//               >
//                 {product.description}
//               </p>
//               {showReadMore && (
//                 <button onClick={() => setIsExpanded(!isExpanded)}>
//                   {isExpanded ? 'Show less' : 'Show more'}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetailsPage;
