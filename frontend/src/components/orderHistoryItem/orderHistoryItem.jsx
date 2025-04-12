import React, { useState, useEffect } from "react";
import './orderHistoryItem.css';

const OrderHistoryItem = ({ order }) => {
  // hantera dropdown av orderhistorik
  // och nedräkning av leveranstid
  // och formatering av tid kvar i HH:MM:SS
  // och visa mer eller mindre av orderhistorik

  const [showDetails, setShowDetails] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  // Formatera datum till lokal tid
  const orderDate = new Date(order.date).toLocaleDateString();
  
  const deliveryDate = new Date(order.deliveryTime);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Formatera tid kvar i HH:MM:SS
  const formatTimeLeft = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Timer för nedräkning
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = deliveryDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null); // Levererat, sluta visa timer
      } else {
        setTimeLeft(formatTimeLeft(diff));
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up
  }, [order.deliveryTime]);

  return (
    <div className="order-history-item">
      <div className="order-summary">
        <p>
          <strong>Ordernummer:</strong> {order._id}
        </p>
        <p>
          <strong>Beställningsdatum:</strong> {orderDate}
        </p>
        <button className="toggle-details-btn" onClick={toggleDetails}>
          {showDetails ? "Visa mindre" : "Visa mer"}
        </button>
      </div>

      {showDetails && (
        <div className="order-details-canvas">
          <p>
            <strong>Leveransdatum:</strong> {deliveryDate.toLocaleString()}
          </p>
          {timeLeft && (
            <p className="delivery-countdown">
              <strong>Tid kvar till leverans:</strong> {timeLeft}
            </p>
          )}
          <div className="order-items">
            <strong>Beställda produkter:</strong>
            <ul>
              {order.order.map((item, index) => (
                <li key={index}>
                  {item.title} - {item.quantity} stycken - pris per styck : {item.price} SEK
                </li>
              ))}
            </ul>
            <p>
              <strong>Totalpris:</strong> {order.totalPrice} SEK
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryItem;
