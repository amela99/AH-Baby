const fetchCart = async () => {
  try {
    const response = await fetch("/api/cart");
    const data = await response.json();
    setCart(data);
  } catch (error) {
    console.error("Fel vid hämtning av varukorgen:", error);
  }
};

useEffect(() => {
  fetchCart();
}, []);

const addToCart = async (product, quantity) => {
  try {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: quantity,
      }),
    });

    const data = await response.json();
    if (data.success) {
      console.log("Product added to cart successfully");
      fetchCart();
    } else {
      console.error("Failed to add product to cart:", data.message);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

const increment = (productId) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decrement = (productId) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.product_id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};
