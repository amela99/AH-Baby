import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hämta söktermen från URL:en
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]); // Kör om sökparametern ändras

  // Filtrera produkter baserat på söktermen
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  if (loading) {
    return <p>Laddar produkter...</p>;
  }

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
