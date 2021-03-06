import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({
  inCart,
  products,
  search,
  setSearch,
  handleSearchProducts,
}) => {
  const [displaySearch, setDisplaySearch] = useState(false);

  const unfocusSearch = () => {
    setDisplaySearch(!displaySearch);
    setSearch("");
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
          <img src="" alt="LOGO" />
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
            <button onClick={unfocusSearch} className="search-btn">
              <div className="magnify-img-wrapper">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `${displaySearch ? "/images/x.png" : "/images/magnify.png"}`
                  }
                  alt=""
                  className="magnify-img"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="search-results-wrapper" onBlur={unfocusSearch}>
          {search && (
            <ul
              className="header-search-results"
              style={{
                zIndex: 99,
                padding: 0,
              }}
            >
              <h4 style={{ display: "flex", justifyContent: "center" }}>
                {products.filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                ).length
                  ? `Matching Products`
                  : `No Matches :(`}
              </h4>
              {products
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 5) // limit search results to 5 items
                .map((item) => {
                  return (
                    <Link
                      to={`/products/${item.id}`}
                      key={item.id}
                      style={{
                        textDecoration: "none",
                        listStyle: "none",
                        color: "#000000",
                        zIndex: 1000,
                      }}
                      onClick={unfocusSearch}
                    >
                      <li
                        className="header-search-result"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {item.name}
                      </li>
                    </Link>
                  );
                })}
            </ul>
          )}
        </div>
        <nav className="navbar-wrapper">
          <ul className="navbar">
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <li className="latest-arrivals">LATEST ARRIVALS</li>
            </Link>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <li>
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
