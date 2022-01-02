import React from "react";
import "../Product/Product.css";

const Product = ({ product }) => {
  return (
    <div className="product-wrapper">
      <li key={product.id} className="product">
        <div className="product-img">
          <div className="product-img-container">
            <img src={product.media.source} alt="product" />
          </div>
        </div>
        <div className="product-desc">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{product.price.formatted_with_symbol}</p>
        </div>
      </li>
    </div>
  );
};

export default Product;
