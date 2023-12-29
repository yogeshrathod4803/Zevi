import React, { useState } from "react";
import Styles from "./ECommerceSearchPage.module.css";
import IconSearch from "../icons/SeachIcon";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ContextApi";

const ECommerceSearchPage = () => {
  const { data, loading } = useProductContext();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSelect = (value, item) => {
    console.log("Selected:", value, item);
    setSearchValue(value);
  };

  const renderSuggestions = () => {
    const filteredProducts = data
      .filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(0, 1);

    return filteredProducts.map((product) => (
      <div
        className={Styles.card}
        key={product.id}
        onClick={() => handleSelect(product.title, product)}
      >
        <p className={Styles.latestTrends}>Latest Trends</p>
        <div className={Styles.productContainer}>
          {data.slice(0, 4).map((product, index) => (
            <div className={Styles.productCard} key={index}>
              <img
                src={product.image}
                alt={product.title}
                className={Styles.productImage}
              />
              <div className={Styles.productTitle}>
                {product.title.trim().split(" ").slice(0, 3).join(" ")}
              </div>
            </div>
          ))}
        </div>
        <ul className={Styles.popularSuggestions}>
          <li className={Styles.suggestionTitle}>Popular Suggestions</li>
          <li className={Styles.suggestionItem}>White Gold Plated Princess</li>
          <li className={Styles.suggestionItem}>Pierced Owl Rose Gold</li>
          <li className={Styles.suggestionItem}>Lock and Love Women's</li>
        </ul>
        <Link to={`/product/${product.id}`}>
          <button>Veiw All Products</button>
        </Link>
      </div>
    ));
  };

  return (
    <>
      <div className={Styles.mainContainer}>
        <div className={Styles.searchContainer}>
          <div className={Styles.searchBarContainer}>
            <IconSearch className={Styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className={Styles.searchBar}
            />
          </div>
          {loading && <p>Loading...</p>}
          {searchValue && (
            <div className={Styles.suggestions}>{renderSuggestions()}</div>
          )}
        </div>
        <div className={Styles.companyName}>Z e v i</div>
      </div>
    </>
  );
};

export default ECommerceSearchPage;
