import React from "react";
import "./RenderComponents.css";
import "./Description.css";
function Description({ data }) {

// console.log(data.ngoLink)



  return (
    <>
      <section className="Individual_page_description">
        <div className="description_boxes">
          <h2>Details</h2>
          <p>{data.ngoDescription}</p>
        </div>
        <div className="description_boxes">
          <h2>Contact</h2>
          <div className="description_contact_list">
            <div className="description_contact_item">
              <i class="fa-solid fa-phone"></i>
              <h3>Phone:</h3>
              <span>{data.ngoPhone}</span>
            </div>
            <div className="description_contact_item">
              <i class="fa-regular fa-envelope"></i>
              <h3>Email:</h3> {data.ngoEmail}
            </div>
            <div className="description_contact_item">
            <i class="fa-solid fa-location-dot"></i>
              <h3>Address:</h3> {data.ngoAddress}
            </div>
            <div className="description_contact_item">
            <i class="fa-regular fa-calendar-days"></i>
              <h3>Established Date:</h3> {data.ngoDate}
            </div>
          </div> 
        </div>
        <div className="description_boxes">
          <h2>Online Presence</h2>
          <ul className="online_presence_icon">
            <li>
              <a href={data.ngoLink}><i className="fa-solid fa-globe"></i></a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Description;
