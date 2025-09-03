import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProducts.css";

const categoryList = [
  "Bodies",
  "Starter Kits",
  "Kostymer",
  "Klänningar",
  "Jumpsuits",
  "Nappar",
  "Filtar",
  "Snuttefiltar",
];

const NewProducts = ({ token, admin }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImageFileName(e.target.files[0]?.name || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFileName) {
      alert("Ange filnamn för bilden som finns i public!");
      return;
    }

    const product = {
      name,
      description,
      SKU,
      price,
      published_date: publishedDate,
      categories: [selectedCategory],
      image: `/${imageFileName}`,
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to save product");

      const data = await response.json();
      console.log("Product saved:", data);

      navigate("/admin");
    } catch (error) {
      console.error("Error:", error);
      alert("Fel vid sparande av produkt");
    }
  };

  if (admin !== 1) return <p>Du har inte behörighet att se denna sida.</p>;

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

          <h2 className="section-title">Ny produkt</h2>

          <form className="product-form" onSubmit={handleSubmit}>
            <label>Titel</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ange produktnamn"
              required
              maxLength="15"
            />

            <label>Beskrivning</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ange beskrivning."
              required
              maxLength="50"
            ></textarea>

            <label>Bild</label>
            <input type="file" onChange={handleFileChange} required />

            <label>SKU</label>
            <input
              type="text"
              value={SKU}
              onChange={(e) => setSKU(e.target.value)}
              placeholder="ABC123"
              pattern="[A-Za-z]{3}[0-9]{3}"
              title="SKU måste vara 3 bokstäver följt av 3 siffror"
              required
            />

            <label>Pris</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ange pris"
              required
              maxLength="10"
            />

            <label>Publiceringsdatum</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />

            <label>Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">-- Välj kategori --</option>
              {categoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button type="submit">Lägg till produkt</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
