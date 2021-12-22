import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ inCart, products, search, handleSearchProducts }) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="" alt="Logo" />
        </Link>
      </div>
      <div className="navbar-container">
        <nav>
          <ul className="navbar">
            <li className="header-search">
              <div>
                {displaySearch ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="header-searchbar"
                      onChange={handleSearchProducts}
                    />
                    {search && (
                      <ul className="search-results">
                        {products
                          .filter((product) => product.name.includes(search))
                          .map((item) => {
                            return <li key={item.id}>{item.name}</li>;
                          })}
                      </ul>
                    )}
                  </div>
                ) : null}
              </div>
              <button onClick={() => setDisplaySearch(!displaySearch)}>
                <div className="magnify-img-wrapper">
                  <img
                    src={process.env.PUBLIC_URL + "/images/magnify.png"}
                    alt=""
                    className="magnify-img"
                  />
                </div>
              </button>
            </li>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <li className="header-products">Products</li>
            </Link>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <li className="header-cart">
                <div className="cart-img-wrap">
                  <img
                    src={process.env.PUBLIC_URL + "/images/cart.png"}
                    alt=""
                    className="cart-img"
                  />
                </div>
                <div className="cart-qty">{inCart > 0 ? inCart : null}</div>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
