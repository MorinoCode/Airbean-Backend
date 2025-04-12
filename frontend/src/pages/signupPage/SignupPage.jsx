import React, { useState } from "react";
import "./SignupPage.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  //spara email och password i separata variabler
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      //radera gamla error
      setErrors([]);
    try {

      //skicka request för att skapa konto till api
      const response = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors(data);
        return;
      }
      setSuccess(data[0].message);
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar isLoggedIn={false} />
      <main className="signup-container">
        <h2>Skapa Konto</h2>
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
          {/* visa en meddelande om kunde skapade konto */}
          {success && <p className="success">{success}</p>}
          <button type="submit">Skapa konto</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
