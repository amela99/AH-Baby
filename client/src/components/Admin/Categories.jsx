import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Categories.css";

export const Categories = ({ token, admin }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to load categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        alert("Error loading categories: " + err.message);
      }
    };

    // Om ej admin, skicka till denied
    if (!token || parseInt(admin) !== 1) {
      navigate("/denied");
    } else {
      fetchCategories();
    }
  }, [token, admin, navigate]);

  const deleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort denna kategori?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== categoryId));
        alert("Kategori borttagen");
      } else {
        alert("Kunde inte ta bort kategorin");
      }
    } catch (err) {
      alert("Error deleting category: " + err.message);
    }
  };

  return (
    <div className="admin-container">
      <div className="main-content">
        <div className="sidebar">
          <ul>
            <li>
              <Link to="/admin">Produkter</Link>
            </li>
            <li>
              <Link to="/admin/categories">Kategorier</Link>
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
            <h2 className="section-title">Kategorier</h2>
            <div className="button-group">
              <Link to="/admin/newcategories" className="btn">
                Ny kategori
              </Link>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Åtgärd</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, i) => (
                  <tr key={i}>
                    <td>{category.name}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteCategory(category.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Inga kategorier tillgängliga</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
