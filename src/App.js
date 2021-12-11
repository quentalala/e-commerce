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

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  };

  const handleAddToCart = async (productId, quantity) => {
    const product = await commerce.cart.add(productId, quantity);
    setCart(product.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
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
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route
              path="/products/:id"
              element={
                <ProductView
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
