import React from "react";
import "./AdminElement.css";
import {  useNavigate} from "react-router-dom";

function AdminElement() {
  const navigate=useNavigate();
  return (
    <>
      <div className="admin_element_container">
        <div class="admin_element_card" onClick={()=>{navigate("/ManageNgos")}}>Manage NGOs</div>
        <div class="admin_element_card" onClick={()=>{navigate("/AddEvents")}}>Add Events</div>
      </div>
    </>
  );
}

export default AdminElement;
