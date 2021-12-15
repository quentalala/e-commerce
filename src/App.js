import React, { useState, useEffect } from "react";
import { commerce } from "./library/commerce";
import "./App.css";
import Header from "./components/Header/Header";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  };

  const handleDeleteFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  };

  const handleUpdateCart = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Header inCart={cart.total_items} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  handleDeleteFromCart={handleDeleteFromCart}
                  handleEmptyCart={handleEmptyCart}
                  handleUpdateCart={handleUpdateCart}
                />
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProductView
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
