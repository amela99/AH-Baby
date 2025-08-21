import { Link } from "react-router-dom";
import { useState } from "react";
import "./Checkout.css";

const Checkout = ({ cart }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postcode: "",
    city: "",
    newsletter: false,
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Din varukorg är tom!");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, ...formData }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order skickad! Tack för ditt köp.");
      } else {
        alert("Checkout misslyckades: " + data.message);
      }
    } catch (error) {
      console.error("Fel vid checkout:", error);
      alert("Ett fel uppstod. Försök igen senare.");
    }
  };

  return (
    <div className="information-container">
      <h2 className="h2">Dina uppgifter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row name-row">
          <div>
            <label>Förnamn</label>
            <input
              type="text"
              id="firstName"
              required
              maxLength="15"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Efternamn</label>
            <input
              type="text"
              id="lastName"
              required
              maxLength="15"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>E-mail</label>
            <input
              type="email"
              id="email"
              required
              maxLength="25"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Adress</label>
            <input
              type="text"
              id="address"
              required
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Postnummer</label>
            <input
              type="text"
              id="postcode"
              required
              value={formData.postcode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Stad</label>
            <input
              type="text"
              id="city"
              required
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="newsletter">
          <input
            type="checkbox"
            id="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
          />
          <label>Jag vill ta emot nyhetsbrev</label>
        </div>

        <Link to="/confirmation" className="buy">
          Köp
        </Link>
      </form>
    </div>
  );
};

export default Checkout;
