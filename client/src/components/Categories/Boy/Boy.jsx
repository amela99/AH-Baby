import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Boy.css";

const Boy = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/pojke");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Fel vid hämtning av pojkeprodukter:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div className="boy-page">
      <h2>BABYKLÄDER POJKE</h2>

      <div className="product-grid">
        {products.map((product) => {
          const isNew =
            new Date() - new Date(product.published_date) <
            7 * 24 * 60 * 60 * 1000;

          return (
            <div key={product.id} className="product-card">
              {isNew && <span className="badge">Nyhet</span>}
              <Link to={`/products/${product.url_slug}`}>
                <img
                  src={`/public/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Boy;
