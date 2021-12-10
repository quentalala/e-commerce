import React, { useState, useEffect } from "react";
// import axios from "axios";
import { commerce } from "./library/commerce";
import "./App.css";
import Header from "./components/header/Header";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/products/:id"
              element={<ProductView products={products} />}
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
