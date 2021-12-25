import React from "react";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import "./Products.css";
import { Grid } from "@mui/material";

const Products = ({ products }) => {
  return (
    <>
      <h1 className="page-title">Products</h1>
      <div className="products-container">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          className="products"
        >
          {products.map((product) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                xl={3}
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  outline: "1px",
                }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="product-container"
                  style={{ textDecoration: "none" }}
                >
                  <Product product={product} />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Products;
