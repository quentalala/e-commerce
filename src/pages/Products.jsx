import React from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = ({ products }) => {
  return (
    <>
      <h1 className="page-title">Products</h1>
      <div className="products-container">
        <ul className="products">
          {products.map((product) => {
            return (
              <Link
                to={`/products/${product.id}`}
                className="product-container"
                key={product.id}
              >
                <Product product={product} />
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Products;
