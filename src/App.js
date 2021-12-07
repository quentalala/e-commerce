import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Product from "./components/Product";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

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
      <div className="App">
        <Header />
        <h1 className="homepage-title">Homepage</h1>
        <div className="products-container">
          <ul className="products">
            {products.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </ul>
        </div>
      </div>
      {/* Insert Footer component later */}
      <Footer />
    </>
  );
}

export default App;
