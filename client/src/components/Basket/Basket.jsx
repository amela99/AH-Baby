import { Link } from "react-router-dom";
import "./Basket.css";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const price = parseInt(item.price, 10) || 0;
  const quantity = parseInt(item.quantity, 10) || 0;
  const subtotal = price * quantity;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Pris: {subtotal} KR</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            onQuantityChange(item.id, parseInt(e.target.value, 10))
          }
          min="1"
        />
        <button onClick={() => onRemove(item.id)}>Ta bort</button>
      </div>
    </div>
  );
};

const Basket = ({ cart = [], removeFromCart, updateQuantity }) => {
  // Slå ihop dubbletter direkt i render
  const uniqueCart = cart.reduce((acc, item) => {
    const existing = acc.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity =
        (parseInt(existing.quantity, 10) || 0) +
        (parseInt(item.quantity, 10) || 0);
    } else {
      acc.push({ ...item, quantity: parseInt(item.quantity, 10) || 0 });
    }
    return acc;
  }, []);

  const total = uniqueCart.reduce(
    (sum, item) => sum + (parseInt(item.price, 10) || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="cart">
      <h2>Din varukorg</h2>
      {uniqueCart.length === 0 ? (
        <p>Din varukorg är tom</p>
      ) : (
        uniqueCart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onQuantityChange={updateQuantity}
          />
        ))
      )}
      <p>Total: {total} SEK</p>
      <Link to="/checkout" className="checkout-button">
        Till kassan
      </Link>
    </div>
  );
};

export default Basket;
