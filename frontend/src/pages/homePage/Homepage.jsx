import React from "react";
import './HomePage.css'
import coffePic from '../../assets/pics/coffee.bean.png'
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = ({ isLoggedIn }) => {

  const navigate = useNavigate()
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="home-content">
        <h2>Välkommen till Airbean!</h2>
        <p>Beställ ditt favoritkaffe snabbt och enkelt.</p>
        <img src={coffePic} alt="Kaffe" className="coffee-img" onClick={()=>navigate('/menu')}/>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
