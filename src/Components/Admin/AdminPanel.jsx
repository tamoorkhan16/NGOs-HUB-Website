import React from "react";
import "./AdminPanel.css";

function AdminPanel() {
  return (
    <>
      <nav className="navigation-bar adminPanel_naviagtionBar">
      <ul> <li>
       <a className="menu__link" href="/Admin">
          Admin Panel
        </a>
        </li></ul> 
        <div className="logo adminPanel_logo">NGOs HUB</div>
       <ul> <li>
       <a className="menu__link" href="/Home">
          Log out
        </a>
        </li></ul> 
      </nav>
    </>
  );
}

export default AdminPanel;
