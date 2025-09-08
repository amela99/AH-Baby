import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Gallery from "./components/Gallery/Gallery";
import Details from "./components/Details/Details";
import Search from "./components/Search/Search";
import New from "./components/Categories/New/New";
import Girl from "./components/Categories/Girl/Girl";
import Boy from "./components/Categories/Boy/Boy";
import Basket from "./components/Basket/Basket";
import Checkout from "./components/Checkout/Checkout";
import Confirmation from "./components/Confirmation/Confirmation";
import Login from "./components/Login/Login";
import Favorites from "./components/Favorites/Favorites";
import Products from "./components/Admin/Products";
import NewProducts from "./components/Admin/NewProducts";
import Categories from "./components/Admin/Categories";
import NewCategories from "./components/Admin/NewCategories";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";

const AdminRoute = ({ isAdmin, children }) => {
  return isAdmin === 1 ? children : <NotAuthorized />; // Visa innehållet endast om admin
};

export const App = () => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchCart();
    // Restore authentication state from localStorage
    const savedToken = localStorage.getItem('token');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedIsAdmin) {
      setIsAdmin(parseInt(savedIsAdmin));
    }
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
      if (data.success) fetchCart();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`/api/cart/remove?productId=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) fetchCart();
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`/api/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity }),
      });
      const data = await response.json();
      if (data.success) fetchCart();
    } catch (error) {
      console.error("Fel vid ändring av antal:", error);
    }
  };

  // FAVORITER
  const addToFavorites = (product) => {
    setFavorites((prev) => {
      if (!prev.find((p) => p.id === product.id)) return [...prev, product];
      return prev;
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  };

  // LOGOUT
  const logout = () => {
    setToken("");
    setIsAdmin(0);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  return (
    <>
      <Header
        cart={cart}
        token={token}
        setToken={setToken}
        isAdmin={isAdmin}
        favorites={favorites}
        logout={logout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Gallery
              addToCart={addToCart}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/products/:url_slug"
          element={<Details addToCart={addToCart} />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/categories/new" element={<New />} />
        <Route path="/categories/girl" element={<Girl />} />
        <Route path="/categories/boy" element={<Boy />} />
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
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route
          path="/confirmation"
          element={<Confirmation setCart={setCart} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setToken={(t, admin) => {
                setToken(t);
                setIsAdmin(admin);
                // Save to localStorage for persistence
                localStorage.setItem('token', t);
                localStorage.setItem('isAdmin', admin.toString());
              }}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <Products token={token} admin={isAdmin} />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/newproducts"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <NewProducts token={token} admin={isAdmin} />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <Categories token={token} admin={isAdmin} />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/newcategories"
          element={
            <AdminRoute isAdmin={isAdmin}>
              <NewCategories token={token} admin={isAdmin} />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
