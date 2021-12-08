import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src="" alt="Logo" />
        </Link>
      </div>
      <div className="navbar-container">
        <nav>
          <ul className="navbar">
            <li>
              <input type="text" placeholder="Search" />
            </li>
            <Link to="/products">
              <li>Products</li>
            </Link>
            <Link to="/cart">
              <li>Cart</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
