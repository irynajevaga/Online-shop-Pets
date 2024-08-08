import React from 'react';
import styles from './DiscountedItems.module.css';

const DiscountedItems = ({ searchParams, setSearchParams }) => {
  const includeDiscount = searchParams.get("includeDiscount") === "true";

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    if (checked) {
      newSearchParams.set("includeDiscount", "true");
    } else {
      newSearchParams.delete("includeDiscount");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <label className={styles.discountedItems}>
      <span>Discounted items</span>
      <input
        className={styles.customCheckbox}
        type="checkbox"
        checked={includeDiscount}
        onChange={handleCheckboxChange}
      />
      <span></span>
    </label>
  );
};

export default DiscountedItems;
