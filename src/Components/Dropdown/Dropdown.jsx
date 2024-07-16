import React, { useState } from "react";
import "./Dropdown.css"


function Dropdown() {
  const [dropdown, setDropdown ]=useState(false);
  return (
    <div>
      <div className="dropdown">
        <ul className={dropdown ?"dropdown_list  dropdown_clicked" :"dropdown_list"}>
          <li className="dropdown_item ">
            <a className="menu-link" href="/AdminLogin" onClick={()=>{setDropdown(false)}}>Login As Admin</a>
          </li>
          <li className="dropdown_item ">
            <a className="menu-link" href="/NgoMangerLogin" onClick={()=>{setDropdown(false)}}>Login As NGO Manager</a>
          </li>
      
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
