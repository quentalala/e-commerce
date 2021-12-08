import React from "react";
import { useParams } from "react-router-dom";

const Item = ({ products }) => {
  let id = useParams(); // Gets the product id
  let product_index = id.id;
  let current_product = products[product_index - 1];
  return (
    <>
      <h1 className="page-title">Test</h1>
      <div>
        <h3>{current_product.title}</h3>
        <img src={current_product.image} alt="" style={{ width: 300 }} />
      </div>
    </>
  );
};

export default Item;
