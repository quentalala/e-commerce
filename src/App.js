import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
        <h1>My Store</h1>
        <ul>
          {products.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>
      </div>
      {/* Insert Footer component later */}
    </>
  );
}

export default App;
