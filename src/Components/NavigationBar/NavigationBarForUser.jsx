import React, { useState } from "react";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";
import {app} from "../Firebase/firebase"
import { getAuth , signOut} from "firebase/auth";

function NavigationBarForUser() {

const auth =getAuth(app);
  // Handle Logout Function

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate('/home'); // Redirect to login page or homepage
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const navigate = useNavigate();
  const [burgerClass, setBurgerClass] = useState("burgerBar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setisMenuClicked] = useState(false);
  // Hamburger Menu Function
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burgerBar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burgerBar unclicked");
      setMenuClass("menu hidden");
    }
    setisMenuClicked(!isMenuClicked);
  };
  return (
    <>
      <header>
        <div className="navigation-bar">
          <div className="hamburger">
            <div className="burger-menu" onClick={updateMenu}>
              <div className={burgerClass}></div>
              <div className={burgerClass}></div>
              <div className={burgerClass}></div>
            </div>
          </div>

          <div className="logo"  onClick={()=>{navigate("/home")}} >NGOs HUB</div>

          <div className="register_profile_class">
            <ul>
              
              <li >
                <a  className="menu__link" onClick={handleLogout}>
                  Logout
                </a>
 
              </li>


            </ul>
          </div>
        </div>
        <div className={menuClass}>
          <ul>
            <li>
              <a className="menu-link" href="/Home">
                Home
              </a>
            </li>
           
            <li>
              <a className="menu-link" href="/Profile">
                Profile
              </a>
            </li>
            <li>
              <a className="menu-link" href="/Events">
                Events
              </a>
            </li>
    
            <li>
              <a className="menu-link" href="/Signup">
                Add Ngo
              </a>
            </li>
            <li>
              <a className="menu-link" href="/About">
                About Us
              </a>
            </li>
            <li>
              <a className="menu-link" href="/Contact">
                Contact Us
              </a>
            </li>
            <li>
              <a className="menu-link" href="/FAQs">
                FAQS
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default NavigationBarForUser;
