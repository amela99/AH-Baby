import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isRegister ? "/api/users/register" : "/api/users/login";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister ? { username, email, password } : { email, password }
        ),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (isRegister) {
        alert("Registrering lyckades! Logga in nu.");
        setIsRegister(false);
      } else {
        // Skicka tillbaka token + adminstatus till App.jsx
        setToken(data.token, data.admin === 1 ? 1 : 0);

        if (data.admin === 1) navigate("/admin");
        else navigate("/");
      }
    } catch (err) {
      setError("Något gick fel vid inloggning/registrering");
    }
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Registrera dig" : "Logga in"}</h2>
        {error && <p className="login-error">{error}</p>}

        {isRegister && (
          <input
            type="text"
            className="login-input"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          className="login-input"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          {isRegister ? "Registrera" : "Logga in"}
        </button>

        <p className="login-toggle">
          {isRegister ? "Har du redan ett konto?" : "Har du inget konto?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Logga in" : "Registrera"}
          </span>
        </p>
      </form>
    </div>
  );
}
