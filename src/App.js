import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/header/Header";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
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
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
