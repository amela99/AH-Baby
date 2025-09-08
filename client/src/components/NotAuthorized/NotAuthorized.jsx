import "./NotAuthorized.css";

const NotAuthorized = () => {
  return (
    <div className="not-authorized">
      <h2>Åtkomst nekad</h2>
      <p>Du har inte behörighet att komma åt denna sida.</p>
      <p>Kontakta administratören för mer information.</p>
    </div>
  );
};

export default NotAuthorized;
