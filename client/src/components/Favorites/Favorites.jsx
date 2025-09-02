import { Link } from "react-router-dom";
import "./Favorites.css";

export const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites-page">
      <h2>DINA FAVORITER</h2>
      {favorites.length === 0 ? (
        <p>Inga favoriter ännu</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((product) => (
            <div key={product.id} className="favorite-card">
              <Link to={`/products/${product.url_slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="favorite-image"
                />
              </Link>
              <h3 className="favorite-title">{product.name}</h3>
              <p className="favorite-price">{product.price}</p>
              <button
                className="btn favorite-remove-btn"
                onClick={() => removeFromFavorites(product.id)}
              >
                Ta bort
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
