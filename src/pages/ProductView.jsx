import React, { useState, useEffect } from "react";
import { commerce } from "../library/commerce";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
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

  console.log(product.description, typeof product.description);

  return (
    <div>
      <div className="pview-wrapper">
        {" "}
        <div className="pview-container">
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={12} sm={12} md={6} xl={6}>
              <div className="pview-left">
                <div className="pview-img-wrapper">
                  <img src={product.src} alt="" className="pview-img" />
                </div>
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              xl={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="pview-right">
                  <h1 className="pview-title">{product.name}</h1>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 className="pview-price">{product.price}</h3>
                    <button
                      name="Add to cart"
                      className="pview-cart-btn"
                      onClick={() => handleAddToCart(product.identification, 1)}
                    >
                      ADD TO CART
                    </button>
                  </div>

                  <div
                    className="pview-desc"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <h4>Description</h4>
                    <p>
                      {product.description
                        ? product.description.replace(regex, "\n")
                        : null}
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
