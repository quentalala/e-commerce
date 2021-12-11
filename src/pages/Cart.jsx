import React, { useState, useEffect } from "react";
import { commerce } from "../library/commerce";

function Cart() {
  const [cartDisplay, setCartDisplay] = useState([]);

  const fetchCartContent = async () => {
    const response = await commerce.cart.retrieve();
    const { line_items } = response;
    setCartDisplay(line_items);
  };

  useEffect(() => {
    fetchCartContent();
  }, []);

  const EmptyCart = () => {
    return <div>I'm empty :(</div>;
  };

  const NonEmptyCart = () => {
    return (
      <div>
        {cartDisplay.map((item) => {
          return (
            <div key={item.id}>
              <li>{item.name}</li>
              <div className="product-img-container">
                <img src={item.media.source} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <h1 className="page-title">Cart</h1>
      <div>{cartDisplay.length === 0 ? <EmptyCart /> : <NonEmptyCart />}</div>
    </>
  );
}

export default Cart;
