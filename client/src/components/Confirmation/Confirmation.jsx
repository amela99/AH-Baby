import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = ({ setCart }) => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const response = await fetch(`/api/cart/${orderId}`);
        if (!response.ok) throw new Error("Order hittades inte");
        const data = await response.json();
        setOrder(data);

        setCart([]);
      } catch (error) {
        console.error("Fel vid hämtning av order:", error);
      }
    };
    fetchOrder();
  }, [orderId, setCart]);

  return (
    <div className="confirmation-container">
      <h2>Orderbekräftelse</h2>
      {order ? (
        <>
          <p>Tack för din order, {order.first_name}!</p>
          <p className="order-number">Ordernummer: #{order.id}</p>
          <p className="email">Vi skickar bekräftelse till: {order.email}</p>
        </>
      ) : (
        <p>Laddar orderinformation...</p>
      )}
    </div>
  );
};

export default Confirmation;
