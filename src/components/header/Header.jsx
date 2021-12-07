import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="" alt="Logo" />
      </div>
      <div className="navbar-container">
        <nav>
          <ul className="navbar">
            <li>
              <button>Search</button>
            </li>
            <li>
              <button>Account</button>
            </li>
            <li>
              <button>Cart</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
