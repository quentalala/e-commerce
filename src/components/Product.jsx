import React from "react";

const Product = ({ product }) => {
  return (
    <li key={product.id} className="product">
      <h3>{product.title}</h3>
      <div className="product-img-container">
        <img src={product.image} alt="product" />
      </div>
      <div>
        <p>${product.price}</p>
        <div className="desc-container">
          <p>{product.description}</p>
        </div>
      </div>
    </li>
  );
};

export default Product;
