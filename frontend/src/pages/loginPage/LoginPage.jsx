import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import "./LoginPage.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const {user, setUser} = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //radera gamla error
    setErrors("");

    try {
      //skicka request för att logga in till api
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
        return;
      }

      setUser({ user: data[0].user, token: data[0].token });
      setSuccess(data[0].message);

      // Navigera till startsidan efter inloggning
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.log("Serverfel, försök igen senare.");
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={false} />
      <main className="login-container">
        <h2>Logga in</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* visa error meddelande om user kunde inte skapa konto */}
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => (
                <li key={index} className="error">
                  {err.message}
                </li>
              ))}
            </ul>
          )}
          {/* visa success meddelande om user logga in */}
          {success && <p className="success">{success}</p>}
          <button type="submit">Logga in</button>
          <p>Har du inget konto? <Link to={'/signup'}>Skapa Konto</Link></p>
          <p>Glömde lösenord? <Link to={'/forgottPassword'}>Klicka här</Link></p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
