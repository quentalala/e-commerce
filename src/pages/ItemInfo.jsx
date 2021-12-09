import React from "react";
import { useParams } from "react-router-dom";

const Item = ({ products }) => {
  let id = useParams(); // Gets the product id
  let product_index = id.id;
  let current_product = products.filter(
    (product) => product.id === product_index
  )[0];

  return (
    <>
      <h1 className="page-title">Test</h1>
      <div>
        <h3>{current_product.name}</h3>
        <img src={current_product.media.source} alt="" style={{ width: 300 }} />
      </div>
    </>
  );
};

export default Item;
