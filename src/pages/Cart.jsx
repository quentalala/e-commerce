import React, { useState, useEffect } from "react";
import { commerce } from "../library/commerce";

function Cart({ cart, handleDeleteFromCart }) {
  const [cartDisplay, setCartDisplay] = useState([]);

  const fetchCartContent = async () => {
    const response = await commerce.cart.contents();
    setCartDisplay(response);
  };

  useEffect(() => {
    fetchCartContent();
  }, [cart]); // Every time the cart gets modified, cartDisplay state updates

  const EmptyCart = () => {
    return <div>Cart is empty :(</div>;
  };

  const NonEmptyCart = () => {
    return (
      <div>
        {cartDisplay.map((item) => {
          return (
            <div key={item.id} className="cart-item">
              <li>{item.name}</li>
              <div className="product-img-container">
                <img src={item.media.source} alt="" />
              </div>
              <button onClick={() => handleDeleteFromCart(item.id)}>
                Remove from cart
              </button>
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
