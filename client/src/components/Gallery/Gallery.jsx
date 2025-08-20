import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";
import Hero from "../Hero/Hero";

export const Gallery = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateProducts = () => {
      if (window.innerWidth <= 544 && products.length > 4) {
        // Slumpa 4 produkter på mobil
        const productsCopy = [...products];
        const selected = [];
        for (let i = 0; i < 4; i++) {
          const randIndex = Math.floor(Math.random() * productsCopy.length);
          selected.push(productsCopy[randIndex]);
          productsCopy.splice(randIndex, 1);
        }
        setDisplayProducts(selected);
      } else {
        setDisplayProducts(products);
      }
    };

    updateProducts();
    window.addEventListener("resize", updateProducts);
    return () => window.removeEventListener("resize", updateProducts);
  }, [products]);

  const sortedProducts = [...displayProducts].sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  );

  return (
    <>
      <Hero />
      <section className="gallery">
        {sortedProducts.map((product, index) => (
          <div key={`${product.url_slug}-${index}`} className="card">
            <div className="image-container">
              <Link to={`/products/${product.url_slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-image default-image"
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={product.name}
                    className="card-image hover-image"
                  />
                )}
              </Link>
              <button
                className="favorite-btn"
                onClick={() => {}}
                aria-label="Lägg till i favoriter"
              >
                <i className="fa-regular fa-heart"></i>
              </button>
              <button
                className="add add-overlay"
                onClick={() => addToCart(product)}
              >
                Lägg till i varukorgen
              </button>
              {index === 0 && <span className="badge">Nyhet</span>}
            </div>
            <h3 className="card-title">{product.name}</h3>
            <p className="card-price">{product.price}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Gallery;
