import React, { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import MenuItems from "../../components/menuItems/MenuItems";
import "./MenuPage.css";

const MenuPage = () => {
  const { menu, setMenu } = useContext(MyContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/menu");
        if (!response.ok) throw new Error("Något gick fel!");
        
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Kunde inte hämta menyn", error);
      }
    };

    fetchMenu();
  }, [setMenu]); 

  return (
    <div>
      <Navbar />
      <main className="menu-container">
        <h2>Vår Meny</h2>
        {menu && menu.length > 0 ? <MenuItems menu={menu} /> : <p>Laddar meny...</p>}
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
