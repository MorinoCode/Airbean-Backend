import React, { useContext } from "react";
import { MyContext } from "../../App";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { cart, setCart } = useContext(MyContext);

  const increaseQuantity = () => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.title === item.title
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = () => {
    const updatedCart = cart
      .map((cartItem) => {
        if (cartItem.title === item.title) {
          if (cartItem.quantity > 1) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else {
            return null; // Vi tar bort item
          }
        }
        return cartItem;
      })
      .filter(Boolean); // Tar bort null (borttagna)

    setCart(updatedCart);
  };

  return (
    <div className="cart-item">
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      <span>{item.price} kr</span>
      <span> x {item.quantity}</span>
      <div className="quantity-buttons">
        <button className="decrease-btn" onClick={decreaseQuantity}>-</button>
        <button className="increase-btn" onClick={increaseQuantity}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
