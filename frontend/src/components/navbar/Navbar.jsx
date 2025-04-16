import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { user, setUser, cart } = useContext(MyContext) || {};
  const navigate = useNavigate();

  // Kontrollera om användaren är inloggad
  const isLoggedIn = user.token;

  // Hantera utloggning
  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser({});
    
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  //skickas till homePage
  const sendToHomePage = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 onClick={sendToHomePage} className="logo">
        Airbean ☕
      </h1>
      <ul className="nav-links">
        <li>
          <Link to="/menu">Meny</Link>
        </li>
        <li>
          <Link to="/om-oss">Om oss</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to={`/orderHistory/${user.user.email}`}>Orderhistorik</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logga ut</Link>
            </li>
            <li className="cart-icon">
              <Link to="/cart">
                <ShoppingCart size={24} onClick={() => navigate("/cart")} />
                {cart && <span className="cartQuantity">{cart.length}</span>}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Skapa konto</Link>
            </li>
            <li>
              <Link to="/login">Logga in</Link>
            </li>
            <li className="cart-icon">
              <Link to="/cart">
                <ShoppingCart size={24} onClick={() => navigate("/cart")} />
                {cart && <span className="cartQuantity">{cart.length}</span>}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
