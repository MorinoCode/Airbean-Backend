import "./OrderHistoryPage.css";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import OrderHistoryItem from "../../components/orderHistoryItem/orderHistoryItem"
import { useParams } from "react-router-dom";

const OrderHistoryPage = () => {
  const { user } = useContext(MyContext); 
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState([]);
  const { userEmail } = useParams(); 
  

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/order/orderHistory?userEmail=${userEmail}`,{
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();
      
      if (!response.ok) {
        setErrors(data);
        return;
      }

      setOrders(data[0].orders);

    } catch (err) {
      console.log("Fel vid hämtning av orderhistorik:", err);
      setErrors([{ message: "Något gick fel. Försök igen senare." }]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <div>
      <Navbar />
      <main className="orderHistoryContainer">
        <h2>Din Orderhistorik</h2>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => (
              <li key={index} className="error">
                {err.message}
              </li>
            ))}
          </ul>
        )}
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderHistoryItem key={order._id} order={order} />
          ))
        ) : (
          <p>Du har inga tidigare beställningar.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
