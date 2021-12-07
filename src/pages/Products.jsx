import React from "react";
import Product from "../components/Product";

const Products = ({ products }) => {
  return (
    <>
      <div className="products-container">
        <ul className="products">
          {products.map((product) => {
            return <Product product={product} key={product.id} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;
