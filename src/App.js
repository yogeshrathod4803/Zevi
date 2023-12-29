import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import ECommerceSearchPage from "./components/ECommerceSearchPage ";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/" element={<ECommerceSearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
