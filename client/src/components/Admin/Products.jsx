import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

export const Products = ({ token, admin }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && parseInt(admin) === 1) {
      loadProducts();
    }
  }, [token, admin]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      alert("Error loading products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort denna produkt?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  if (!token || parseInt(admin) !== 1) {
    return <p>Du har inte behörighet att se denna sida.</p>;
  }

  return (
    <div className="admin-container">
      <div className="main-content">
        <div className="sidebar">
          <ul>
            <li>
              <a href="/admin">Produkter</a>
            </li>
            <li>
              <a href="#">Kategorier</a>
            </li>
            <li>
              <a href="#">Kundhantering</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        <div className="content-area">
          <div className="header">
            <h1>Administration</h1>
          </div>

          <div className="content-section">
            <h2 className="section-title">Produkter</h2>
            <div className="button-group">
              <button className="btn" onClick={loadProducts} disabled={loading}>
                {loading ? "Laddar..." : "Ladda om produkter"}
              </button>
              <Link to="/admin/newproducts" className="btn">
                Ny produkt
              </Link>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Titel</th>
                <th>SKU</th>
                <th>Pris</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, i) => (
                  <tr key={i}>
                    <td>{product.name}</td>
                    <td>{product.SKU}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteProduct(product.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Inga produkter tillgängliga</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
