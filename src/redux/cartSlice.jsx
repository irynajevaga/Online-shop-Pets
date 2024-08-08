import { createSlice } from "@reduxjs/toolkit";

// Функция для загрузки корзины из localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");  // Получаем данные корзины из localStorage
    if (serializedCart) {
      return JSON.parse(serializedCart);  // Парсим строку JSON и возвращаем объект
    }
  } catch (err) {
    console.error("Failed to load cart from localStorage", err);  // Логируем ошибку, если парсинг или доступ к localStorage не удались
  }
  return { items: [] };  // Возвращаем пустую корзину по умолчанию, если данных нет или произошла ошибка
};

// Создаем slice для корзины с помощью Redux Toolkit
export const cartSlice = createSlice({
  name: "cart",  // Имя слайса
  initialState: loadCartFromLocalStorage(),  // Начальное состояние корзины загружается из localStorage
  reducers: {
    // Редьюсер для добавления товара в корзину
    addToCart: (state, action) => {
      const { id, title, image, price, discont_price, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;  // Увеличиваем количество, если товар уже есть в корзине
      } else {
        state.items.push({
          id,
          quantity,
          title,
          image,
          price,
          discont_price,
        });  // Добавляем новый товар в корзину
      }
      saveCartToLocalStorage(state);  // Сохраняем обновленную корзину в localStorage
    },
    // Редьюсер для уменьшения количества товара в корзине
    decrementFromCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);  // Удаляем товар из корзины, если его количество равно 1
      } else {
        existingItem.quantity--;  // Уменьшаем количество товара на 1
      }
      saveCartToLocalStorage(state);  // Сохраняем обновленную корзину в localStorage
    },
    // Редьюсер для обновления количества товара в корзине
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;  // Обновляем количество товара
      }
      saveCartToLocalStorage(state);  // Сохраняем обновленную корзину в localStorage
    },
    // Редьюсер для удаления товара из корзины
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);  // Удаляем товар из корзины по id
      saveCartToLocalStorage(state);  // Сохраняем обновленную корзину в localStorage
    },
    // Редьюсер для очистки всей корзины
    clearCart: (state) => {
      state.items = [];  // Очищаем корзину
      saveCartToLocalStorage(state);  // Сохраняем пустую корзину в localStorage
    },
  },
});

// Функция для сохранения корзины в localStorage
const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedCart = JSON.stringify(cartState);  // Сериализуем состояние корзины в строку JSON
    localStorage.setItem("cart", serializedCart);  // Сохраняем строку JSON в localStorage
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);  // Логируем ошибку, если сохранение не удалось
  }
};

// Экспортируем действия редьюсера
export const {
  addToCart,
  decrementFromCart,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

// Экспортируем редьюсер по умолчанию
export default cartSlice.reducer;
