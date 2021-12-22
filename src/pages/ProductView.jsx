import React, { useState, useEffect } from "react";
import { commerce } from "../library/commerce";
import { useParams } from "react-router-dom";
import "./ProductView.css";

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
      {/* <h1 className="page-title">Product Page</h1> */}
      <div className="productview-wrapper">
        <div className="productview-container">
          <div className="productview-container-left">
            <div className="productview-img-wrapper">
              <img src={product.src} alt="" className="productview-img" />
            </div>
          </div>
          <div className="productview-desc">
            <h1 className="productview-desc-title">{product.name}</h1>
            <h3 className="productview-desc-price">{product.price}</h3>
            <button
              name="Add to cart"
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product.identification, 1)}
            >
              Add to Cart
            </button>
            <h4>Description</h4>
            <p className="productview-description">
              {product.description
                ? product.description.replace(regex, "\n")
                : // ? product.description.replace(regex, "")
                  null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
