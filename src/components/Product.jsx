import React from "react";

const Product = ({ product }) => {
  return (
    <li key={product.id} className="product">
      <div>
        <h3>{product.title}</h3>
        <div>
          <div className="product-img-container">
            <img src={product.image} alt="product" />
          </div>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </li>
  );
};

export default Product;
