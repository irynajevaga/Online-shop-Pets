import React, { useState, useRef, useEffect } from 'react';
import styles from './SelectSort.module.css';
import arrowIcon from '../../../assets/icons/arrow.svg';

const SelectSort = ({ sortType, setSortType, searchParams, setSearchParams }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const options = [
    { value: "default", label: "by default" },
    { value: "newest", label: "newest" },
    { value: "priceHighToLow", label: "price: high-low" },
    { value: "priceLowToHigh", label: "price: low-high" },
  ];

  const handleSelectChange = (newValue) => {
    setSortType(newValue);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sortType", newValue);
    setSearchParams(newSearchParams);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelectContainer} ref={selectRef}>
      <label className={styles.sortType} tabIndex="0">
        <div
          className={`${styles.customSelectHeader} ${isOpen ? styles.open : ''}`}
          onClick={handleToggle}
        >
          <span>
            {options.find(option => option.value === sortType)?.label || 'Select an option'}
          </span>
          <img
            src={arrowIcon}
            alt="Arrow"
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          />
        </div>
        {isOpen && (
          <div className={styles.customSelectOptions}>
            {options.map(option => (
              <div
                key={option.value}
                className={`${styles.customSelectOption} ${sortType === option.value ? styles.selected : ''}`}
                onClick={() => handleSelectChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </label>
    </div>
  );
};

export default SelectSort;
