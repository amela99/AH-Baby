import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = ({ cart, token, setToken }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img className="logo" src="/logo.png" alt="AH baby logo" />
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          className="search-btn"
          onClick={() =>
            searchTerm.trim() && navigate(`/search?q=${searchTerm}`)
          }
          aria-label="Sök"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>

      <nav className={`nav-container ${menuOpen ? "open" : ""}`}>
        <ul className="category-list">
          <li>
            <Link to="/categories/Girl" className="category-link">
              Flicka
            </Link>
          </li>
          <li>
            <Link to="/categories/Boy" className="category-link">
              Pojke
            </Link>
          </li>
          <li>
            <Link to="/categories/New" className="category-link">
              Nyheter
            </Link>
          </li>
        </ul>
      </nav>

      <div className="icon-container">
        <Link to="/favorites" className="icon-link" aria-label="Favoriter">
          <i className="fa-solid fa-heart" />
        </Link>

        {/* Visa Logga in eller Logga ut */}
        {!token ? (
          <Link to="/login" className="icon-link" aria-label="Användare">
            <i className="fa-regular fa-user" />
          </Link>
        ) : (
          <button className="icon-link logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </button>
        )}

        <Link
          to="/basket"
          className="icon-link basket-link"
          aria-label="Varukorg"
        >
          <i className="fa-solid fa-cart-shopping" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
