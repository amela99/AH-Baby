import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Details.css";

export const Details = ({ addToCart }) => {
  const { url_slug } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${url_slug}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkt:", error);
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const shuffledProducts = data.sort(() => Math.random() - 0.5);
        setSimilarProducts(shuffledProducts.slice(0, 5));
      } catch (error) {
        console.error("Fel vid hämtning av liknande produkter:", error);
      }
    };

    fetchProduct();
    fetchSimilarProducts();
  }, [url_slug]);

  if (!product) {
    return <h2 className="error-message">Laddar produkt....</h2>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <img
          src={`/public/${product.image}`}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price}</p>
          <p className="description">{product.description}</p>
          <button
            className="add-to-cart"
            onClick={() => addToCart(product, quantity)}
          >
            Lägg i varukorg
          </button>
        </div>
      </div>

      <h2 className="similar-products-title">Du kanske också gillar</h2>
      <div className="similar-products">
        {similarProducts.map((similar, index) => (
          <Link
            key={`${similar.url_slug}-${index}`}
            to={`/products/${similar.url_slug}`}
            className="similar-product-card"
          >
            <img
              src={`/public/${similar.image}`}
              alt={similar.name}
              className="similar-product-image"
            />
            <p className="similar-name">{similar.name}</p>
            <p className="similar-price">{similar.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Details;
