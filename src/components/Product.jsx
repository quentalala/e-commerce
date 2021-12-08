import React from "react";

const Product = ({ product }) => {
  return (
    <li key={product.id} className="product">
      <div className="product-img">
        <div className="product-img-container">
          <img src={product.image} alt="product" />
        </div>
      </div>
      <div className="product-desc">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        {/* <div className="desc-container">
          <p>{product.description}</p>
        </div> */}
      </div>
    </li>
  );
};

export default Product;
