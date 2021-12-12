import React from "react";
import "./Cart.css";

const Cart = ({
  cart,
  handleDeleteFromCart,
  handleEmptyCart,
  handleUpdateCart,
}) => {
  const EmptyCart = () => {
    return <div>Cart is empty :(</div>;
  };

  const NonEmptyCart = () => {
    return (
      <>
        <div>
          <table className="cart-table">
            <thead></thead>
            <tbody>
              {cart.line_items.map((item) => {
                return (
                  <tr key={item.id} className="cart-item">
                    <td className="cart-item-img-wrapper">
                      <img
                        src={item.media.source}
                        alt=""
                        className="cart-item-img"
                      />
                    </td>
                    <td className="cart-item-name">{item.name}</td>
                    <td className="cart-item-qty">
                      <div></div>
                      <button
                        onClick={() =>
                          handleUpdateCart(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <h3>{item.quantity}</h3>
                      <button
                        onClick={() =>
                          handleUpdateCart(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                    </td>
                    <td className="cart-item-price">
                      {item.price.formatted_with_symbol}
                    </td>
                    <td
                      onClick={() => handleDeleteFromCart(item.id)}
                      className="cart-item-rm"
                    >
                      <div className="cart-item-rm-img-wrapper">
                        <img
                          src={process.env.PUBLIC_URL + "/images/garbage.png"}
                          alt="garbage bin"
                          className="cart-item-rm-img"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="cart-summary">
            <div>
              <h2>Subtotal: {cart.subtotal.formatted_with_symbol}</h2>
            </div>
            <p>{`Number of items in cart: ${cart.total_items}`}</p>
            <button onClick={handleEmptyCart}>Empty Cart</button>
          </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return "Give me a second :)";

  return (
    <>
      <h1 className="page-title">Cart</h1>
      <div className="cart-container">
        {!cart.line_items.length ? <EmptyCart /> : <NonEmptyCart />}
      </div>
    </>
  );
};

export default Cart;
