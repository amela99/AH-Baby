import "./Features.css ";

export const Features = () => {
  return (
    <div className="fetures-container">
      <div className="feature">
        <i className="fas fa-fire feature-icon"></i>
        <p className="feature-title">Nyheter varje dag</p>
      </div>
      <div className="feature">
        <i className="fa-solid fa-truck feature-icon"></i>
        <p className="feature-title">Snabbleverans 1-2 arbetsdagar</p>
      </div>

      <div className="feature">
        <i className="fas fa-box feature-icon"></i>
        <p className="feature-title">Fri frakt över 499 kr</p>
      </div>

      <div className="feature">
        <i className="fas fa-recycle feature-icon"></i>
        <p className="feature-title">Fri retur vid ny order</p>
      </div>
    </div>
  );
};
