import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 544px)").matches
  );
  const [openColumns, setOpenColumns] = useState([false, false, false]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 544px)");
    const handleResize = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setOpenColumns([true, true, true]); // desktop: allt öppet
      }
    };
    mql.addEventListener("change", handleResize);
    return () => mql.removeEventListener("change", handleResize);
  }, []);

  const toggleColumn = (idx) => {
    if (isMobile) {
      setOpenColumns((prev) =>
        prev.map((open, i) => (i === idx ? !open : open))
      );
    }
  };

  return (
    <footer>
      <div className="footer-container">
        <div class="baby-club">
          <h2>Baby Club</h2>
          <p>
            Som medlem i Baby Club får du 10% rabatt på ditt första köp. Du får
            unika erbjudanden, alltid fri frakt (till ombud) vid köp över 500 kr
            samt samlar poäng på alla köp och aktiviteter.
          </p>
          <button class="join-button">Bli medlem →</button>
          <h3>Följ oss på</h3>
          <a
            href="https://github.com/amela99"
            target="_blank"
            class="social-icon"
          >
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
        <div className="footer-links">
          {["Hjälp", "Om AH Baby", "Populära länkar"].map((title, idx) => (
            <div
              key={title}
              className={`footer-column${openColumns[idx] ? " open" : ""}`}
            >
              <h3 onClick={() => toggleColumn(idx)}>{title}</h3>
              <ul>
                {idx === 0 && (
                  <>
                    <li>
                      <a href="#">Kundservice</a>
                    </li>
                    <li>
                      <a href="#">Vanliga frågor</a>
                    </li>
                    <li>
                      <a href="#">Beställning</a>
                    </li>
                    <li>
                      <a href="#">Kontakta oss</a>
                    </li>
                  </>
                )}
                {idx === 1 && (
                  <>
                    <li>
                      <a href="#">Om oss</a>
                    </li>
                    <li>
                      <a href="#">Hållbarhet</a>
                    </li>
                    <li>
                      <a href="#">Karriär</a>
                    </li>
                    <li>
                      <a href="#">Press & Nyheter</a>
                    </li>
                  </>
                )}
                {idx === 2 && (
                  <>
                    <li>
                      <a href="#">Logga in</a>
                    </li>
                    <li>
                      <a href="#">Hitta butik</a>
                    </li>
                    <li>
                      <a href="#">Baby Club</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="copyright">Copyright &copy; 2025 by AH Baby</div>
    </footer>
  );
};

export default Footer;
