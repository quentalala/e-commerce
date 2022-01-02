import React from "react";
import Product from "../components/Product/Product";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const Products = ({ products }) => {
  return (
    <>
      <h1
        style={{
          margin: "3rem 0 3rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        PRODUCTS
      </h1>
      <div className="products-wrapper" style={{}}>
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
                  style={{ textDecoration: "none", listStyleType: "none" }}
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
