import React, { createContext, useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/homePage/Homepage';
import SignupPage from './pages/signupPage/SignupPage';
import AboutPage from "./pages/aboutPage/AboutPage"; 
import LoginPage from './pages/loginPage/LoginPage';
import MenuPage from './pages/menuPage/MenuPage';
import CartPage from './pages/cartPage/CartPage';
import StatusPage from './pages/statusPage/StatusPage';
import OrderHistoryPage from './pages/orderHistoryPage/orderHistoryPage';
import ForgotPassPage from './pages/forgotPassPage/ForgotPassPage';

export const MyContext = createContext();

const App = () => {

  const [user, setUser] = useState({})
  const [menu, setMenu] = useState({})
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const navigate = useNavigate()

  // Kontrollera om användaren är inloggad via localStorage
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));  // Återställ användarinformationen från localStorage
        navigate('/');  // Om användaren redan är inloggad, navigera till startsidan
      }
    }, [setUser, navigate]);

  
  return (
   
     <MyContext.Provider value={{ user, setUser , menu, setMenu, cart, setCart ,totalPrice, setTotalPrice, orders, setOrders,order, setOrder}}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/om-oss" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/status/:orderId" element={<StatusPage />} />
        <Route path="/orderHistory/:userEmail" element={<OrderHistoryPage />} />
        <Route path="/forgottPassword" element={<ForgotPassPage />} />
      </Routes>
      </MyContext.Provider>
    
  );
};

export default App;
