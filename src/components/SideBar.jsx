import React, { useState } from "react";
import { useProductContext } from "../context/ContextApi";
import styles from "../components/SideBar.module.css";

const Sidebar = () => {
  const { data, loading } = useProductContext();
  const [category, setCategory] = useState("");
  const [priceRangeUnder500, setPriceRangeUnder500] = useState(false);
  const [priceRangeUnder1000, setPriceRangeUnder1000] = useState(false);
  const [rating, setRating] = useState("");

  const handleFilter = () => {
    if (loading) {
      console.log("Loading data...");
      return;
    }

    const filteredProducts = data.filter((product) => {
      return (
        (category === "" || product.category === category) &&
        ((priceRangeUnder500 && product.price < 500) ||
          (priceRangeUnder1000 &&
            product.price >= 500 &&
            product.price < 1000)) &&
        (rating === "" || product.rating === parseInt(rating))
      );
    });

    console.log("Filtered Products:", filteredProducts);
  };

  return (
    <div className={styles.SidebarContainer}>
      <h2>Search results</h2>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
        </select>
      </label>
      <br />
      <label>
        Price Range:
        <label>
          <input
            type="checkbox"
            checked={priceRangeUnder500}
            onChange={() => setPriceRangeUnder500(!priceRangeUnder500)}
          />
          Under $500
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={priceRangeUnder1000}
            onChange={() => setPriceRangeUnder1000(!priceRangeUnder1000)}
          />
          $500 - $1000
        </label>
      </label>
      <br />
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <br />
      <button onClick={handleFilter}>Apply Filters</button>
      <div>
        <h2>NOTE:</h2>
        <p>Sidebar filters can be tested in console</p>
      </div>
    </div>
  );
};

export default Sidebar;
