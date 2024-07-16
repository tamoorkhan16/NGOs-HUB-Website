import React from "react";
import "./MenuBar.css"
function MenuBar() {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <a className="menu__link" href="/Home">
              Home
            </a>
          </li>
          <li>
            <a className="menu__link" href="/Profile">
              Profile
            </a>
          </li>
          <li>
            <a className="menu__link" href="/Events">
              Events
            </a>
          </li>

          <li>
            <a className="menu__link" href="/Signup">
              Add Ngo
            </a>
          </li>
          <li>
            <a className="menu__link" href="/About">
              About Us
            </a>
          </li>
          <li>
            <a className="menu__link" href="/Contact">
              Contact Us
            </a>
          </li>
          <li>
            <a className="menu__link" href="/Faqs">
              FAQs
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MenuBar;
