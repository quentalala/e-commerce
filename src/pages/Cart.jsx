import React from "react";

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
        <div className="cart-container">
          <div>
            {cart.line_items.map((item) => {
              return (
                <div key={item.id} className="cart-item">
                  <div className="product-img-container">
                    <img src={item.media.source} alt="" />
                  </div>
                  <li>{item.name}</li>
                  <div>
                    <button
                      onClick={() =>
                        handleUpdateCart(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <h3>{`Quantity : ${item.quantity}`}</h3>
                    <button
                      onClick={() =>
                        handleUpdateCart(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                  </div>
                  <div>Price: {item.price.formatted_with_symbol}</div>
                  <button onClick={() => handleDeleteFromCart(item.id)}>
                    Remove from cart
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cart">
            <div className="cart-summary">
              <div>
                <h2>Subtotal: {cart.subtotal.formatted_with_symbol}</h2>
              </div>
              <p>{`Number of items in cart: ${cart.total_items}`}</p>
              <button onClick={handleEmptyCart}>Empty Cart</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return "Give me a second :)";

  return (
    <>
      <div>
        <h1 className="page-title">Cart</h1>
        <div>{!cart.line_items.length ? <EmptyCart /> : <NonEmptyCart />}</div>
      </div>
    </>
  );
};

export default Cart;
