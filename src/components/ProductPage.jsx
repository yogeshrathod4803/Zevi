import React, { useState, useMemo } from "react";
import styles from "../components/ProductsPage.module.css";
import IconSearch from "../icons/SeachIcon";
import Heart from "../icons/HeartIcon";
import { useProductContext } from "../context/ContextApi";
import Sidebar from "./SideBar";

const ProductPage = () => {
  const { data, loading } = useProductContext();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredProducts = useMemo(() => {
    return data.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [data, searchValue]);

  return (
    <>
      <div className={styles.mainProductContainer}>
        <Sidebar className={styles.Sidebarcontainer} />
        <div className={styles.searchContainer}>
          <div className={styles.searchBarContainer}>
            <IconSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchBar}
            />
          </div>
          <div className={styles.companyName}>Z e v i</div>
        </div>
        <div className={styles.container}>
          <div className={styles.productPage}>
            {loading && <p>Loading...</p>}
            <div className={styles.productList}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={styles.product}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage}
                  />
                  <Heart className={styles.wishlist} />
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>
                      {product.title.trim().split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <p className={styles.productPrice}>
                      Price: ${product.price}
                    </p>
                    <button>Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
