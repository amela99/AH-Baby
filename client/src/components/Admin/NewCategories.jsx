import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NewCategories.css";

const NewCategories = ({ token, admin }) => {
  const [categories, setCategories] = useState([""]); // flera inputs
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleAdd = () => setCategories([...categories, ""]);
  const handleRemove = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ta bort tomma inputs
    const filtered = categories.map((c) => c.trim()).filter((c) => c);
    if (!filtered.length) {
      alert("Lägg till minst en kategori!");
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categories: filtered }),
      });

      if (!response.ok) throw new Error("Failed to create categories");

      const data = await response.json();
      console.log("Kategorier skapade:", data);
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error:", error);
      alert("Fel vid skapande av kategori");
    }
  };

  if (parseInt(admin) !== 1)
    return <p>Du har inte behörighet att se denna sida.</p>;

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

          <h2 className="section-title">Nya kategorier</h2>

          <form className="category-form" onSubmit={handleSubmit}>
            {categories.map((cat, index) => (
              <div key={index} className="category-input">
                <input
                  type="text"
                  value={cat}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Ange kategori"
                  required
                />
                {categories.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemove(index)}
                  >
                    Ta bort
                  </button>
                )}
              </div>
            ))}

            <button type="submit">Skapa kategori</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategories;
