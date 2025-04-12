import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import CartItem from "../../components/cartItem/CartItem";
import "./CartPage.css";

const CartPage = () => {
  const { cart, totalPrice, setTotalPrice, user,setCart} =useContext(MyContext)
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  //beräknar totalpriset
  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    setTotalPrice(totalPrice);
  }, [cart]);
  

  //orderHandler
  const orderHandler = async () => {
    //radera gamla error
    setErrors([]);
  
    //spara ordertiden
    const timestamp = Date.now();
    const readableDate = new Date(timestamp);
    const date = readableDate.toLocaleString("sv-SE");
    

    try {
      const response = await fetch("http://localhost:8000/api/order", {
        method: "POST",
        headers: { "content-type": "application/json", Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ order:cart , date , totalPrice , user : user.user.email }),
      });
      
      const data = await response.json();
  
      // om order skapades inte
      if (!response.ok) {
        setErrors(data);
        return;
      }

      // om order skapas
      
        navigate(`/status/${data[0].newOrder._id}`);
      
      
      setCart([])
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="cart-container">
        <h2>Din Kundvagn</h2>
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
        {cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
            <div className="cart-total">
              <h3>Totalt: {totalPrice} kr</h3>
              {user.user ? <button className="checkout-btn" onClick={orderHandler}>
                Ta mina pengar
              </button>:<p><Link to={'/login'}>Logga in</Link> för att beställa </p>}
            </div>
          </>
        ) : (
          <p>Kundvagnen är tom.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
