import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductFilters = ({ onChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedValue = type === 'checkbox' ? checked.toString() : value;

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(name, updatedValue);
      onChange(newParams);
      return newParams;
    });
  };

  return (
    <div className="filtersContainer">
      <label>
        Min price
        <input
          name="minPrice"
          type="number"
          value={searchParams.get("minPrice") || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Max price
        <input
          name="maxPrice"
          type="number"
          value={searchParams.get("maxPrice") || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Include discount
        <input
          name="includeDiscount"
          type="checkbox"
          onChange={handleChange}
          checked={searchParams.get("includeDiscount") === "true"}
        />
      </label>
      <label>
        Sort type
        <select
          name="sortType"
          value={searchParams.get("sortType") || "default"}
          onChange={handleChange}
        >
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="priceHighToLow">price: high-low</option>
          <option value="priceLowToHigh">price: low-high</option>
        </select>
      </label>
    </div>
  );
};

export default ProductFilters;
