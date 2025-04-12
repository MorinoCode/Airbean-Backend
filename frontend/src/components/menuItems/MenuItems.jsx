import React from "react";
import "./MenuItems.css";
import MenuItem from "../../components/menuItem/MenuItem";

const MenuItems = ({ menu }) => {
  return (
    <div className="menu-items">
      {menu.map((item) => (
        <MenuItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default MenuItems;
