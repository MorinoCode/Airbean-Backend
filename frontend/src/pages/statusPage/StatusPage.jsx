import "./StatusPage.css";
import Drone from "../../assets/pics/drone.svg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const StatusPage= () => {
  const { order, setOrder, user } = useContext(MyContext); 
  const [errors, setErrors] = useState([]);
  const { orderId } = useParams(); 

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/order/status?orderId=${orderId}`,{
        headers: {  Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data);
        return;
      }
      
      setOrder(data[0].order);
    } catch (err) {
      console.log("Fel vid hämtning av orderstatus:", err);
      setErrors([{ message: "Något gick fel. Försök igen senare." }]);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  // Beräkna återstående tid i minuter
  const remainingTime = order?.deliveryTime
    ? Math.max(0, Math.round((new Date(order.deliveryTime) - Date.now()) / 60000))
    : 0;

  return (
    <div>
      <Navbar />
      <main className="statusContainer">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => (
              <li key={index} className="error">{err.message}</li>
            ))}
          </ul>
        )}

        <p>Ordernummer <b>{order?._id || "Inga order hittade"}</b></p>
        <img src={Drone} alt="dronePic" />
        <h3>Din beställning är på väg!</h3>
        <p><b>{remainingTime}</b> Minuter kvar</p>

        <Link to={`/orderHistory/${user.user.email}`} className="order-history-btn">
          Ok, Kul! Visa mig min orderhistorik!
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;
