import React, { useState, useEffect } from "react";
import { commerce } from "../library/commerce";
import { useParams } from "react-router-dom";

const ProductView = ({ handleAddToCart }) => {
  const [product, setProduct] = useState([]);

  let id = useParams(); // Gets the product id
  let product_id = id.id;

  const fetchProduct = async (identification) => {
    const response = await commerce.products.retrieve(identification);
    const { name, price, media, quantity, description } = response;
    setProduct({
      identification,
      name,
      quantity,
      description,
      src: media.source,
      price: price.formatted_with_symbol,
    });
  };

  useEffect(() => {
    fetchProduct(product_id);
  }, [product_id]);

  let regex = /(<([^>]+)>)/gi;

  return (
    <div>
      <h1 className="page-title">{product.name}</h1>
      <div>
        <img src={product.src} alt="" style={{ width: 300 }} />
        <button
          name="Add to cart"
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(product.identification, 1)}
        >
          Add to Cart
        </button>
        <p>
          {product.description ? product.description.replace(regex, "") : null}
        </p>
      </div>
    </div>
  );
};

export default ProductView;
