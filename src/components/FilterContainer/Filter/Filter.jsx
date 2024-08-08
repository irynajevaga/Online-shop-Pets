import React from "react";
import styles from "./Filter.module.css";

function Filter({ searchParams, setSearchParams }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className={styles.filterPrice}>
      <span>Price</span>
      <label>
        <input
          name="minPrice"
          type="number"
          placeholder="From"
          value={searchParams.get("minPrice") || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          name="maxPrice"
          type="number"
          placeholder="To"
          value={searchParams.get("maxPrice") || ""}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default Filter;
