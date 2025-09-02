import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./New.css";

const New = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const today = new Date();
  const newProducts = products.filter((product) => {
    const publishedDate = new Date(product.published_date);
    const diffTime = today - publishedDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  return (
    <div className="new-page">
      <h2>NYHETER</h2>
      <div className="product-grid">
        {newProducts.length === 0 && <p>Inga nya produkter just nu.</p>}
        {newProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.url_slug}`}>
              <img
                src={`/public/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3>
                {product.name} <span className="badge">Nyhet</span>
              </h3>
              <p>{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default New;
