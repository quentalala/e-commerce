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
      <div className="header-right">
        <div className="header-search-wrapper">
          <div className="header-search">
            <div>
              {displaySearch ? (
                <div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="header-searchbar"
                    onChange={handleSearchProducts}
                    style={{ display: "absolute", zIndex: 100 }}
                  />
                </div>
              ) : null}
            </div>
            <button
              onClick={() => setDisplaySearch(!displaySearch)}
              className="search-btn"
            >
              <div className="magnify-img-wrapper">
                <img
                  src={process.env.PUBLIC_URL + "/images/magnify.png"}
                  alt=""
                  className="magnify-img"
                />
              </div>
            </button>
          </div>
        </div>
        <div>
          {search && (
            <ul
              className="header-search-results"
              style={{
                border: "1px solid black",
                zIndex: 99,
                padding: 0,
              }}
            >
              {products
                .filter((product) => product.name.includes(search))
                .map((item) => {
                  return (
                    <Link
                      to={`/products/${item.id}`}
                      key={item.id}
                      style={{
                        textDecoration: "none",
                        listStyle: "none",
                        zIndex: 1000,
                      }}
                    >
                      <li className="header-search-result">{item.name}</li>
                    </Link>
                  );
                })}
            </ul>
          )}
        </div>
        <nav className="navbar-wrapper">
          <ul className="navbar">
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
