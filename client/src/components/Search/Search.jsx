import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q")?.trim().toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div className="search-page">
      <h2>Hittade {filteredProducts.length} produkter</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="product-card">
              <Link to={`/products/${product.url_slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                {new Date() - new Date(product.published_date) <
                  7 * 24 * 60 * 60 * 1000 && (
                  <span className="badge">Nyhet</span>
                )}
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Inga produkter matchar din sökning.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
