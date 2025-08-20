import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Gallery from "./components/Gallery/Gallery";
import Details from "./components/Details/Details";
import Basket from "./components/Basket/Basket";

export const App = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Fel vid hämtning av varukorgen:", error);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity }),
      });

      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
        console.error("Failed to add product:", data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Ta bort produkt från varukorgen
  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`/api/cart/remove?productId=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
        console.error("Kunde inte ta bort produkt:", data.message);
      }
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
    }
  };

  // Ändra antal i varukorgen
  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`/api/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity }),
      });
      const data = await response.json();
      if (data.success) {
        fetchCart();
      } else {
        console.error("Kunde inte ändra antal:", data.message);
      }
    } catch (error) {
      console.error("Fel vid ändring av antal:", error);
    }
  };

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route
          path="/products/:url_slug"
          element={<Details addToCart={addToCart} />}
        />
        <Route
          path="/basket"
          element={
            <Basket
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
