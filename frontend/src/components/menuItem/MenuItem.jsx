import React from "react";
import "./MenuItem.css";
import { useContext } from "react";
import { MyContext } from "../../App";

const MenuItem = ({ item }) => {
  const { cart, setCart } = useContext(MyContext) || {};

  const addToCartHandler = (item) => {
  
    setCart((prevCart) => {
      const updatedCart = [...(prevCart || [])];
      const existingIndex = updatedCart.findIndex((cartItem) => cartItem.title === item.title);
  
      if (existingIndex !== -1) {
        // Produkten finns redan, öka quantity
        updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
      } else {
        // Ny produkt, lägg till med quantity = 1
        updatedCart.push({
          title: item.title,
          desc: item.desc,
          price: item.price,
          quantity: 1,
        });
      }
  
      return updatedCart;
    });
  };
  
  
  

  return (
    <div className="menu-item" onClick={() => addToCartHandler(item)}>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <span>{item.price} kr</span>
    </div>
  );
};

export default MenuItem;
