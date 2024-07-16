import React from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  // For Navigation From  Landing Page to Home Page
  const navigate = useNavigate();
  return (
    <>
      <section className="herosection_container">
        <div className="right">
          <h2 className="hero_heading">Welcome to NGO Hub</h2>
          <h4>Strenght in Solidarity</h4>
          <p>
            NGO Hub is your centralized platform for social impact. Connect with
            NGOs, organizations, and individuals passionate about making a
            difference. Join forces, share resources, and drive positive change
            together.
          </p>
          <button
            className="heroSectionButton"
            onClick={() => {
              navigate("/Home");
            }}
          >
            Explore NGOs HUB
          </button>
        </div>
        <div className="left">
          <div className="upper">
            <div className="first">
              {" "}
              <img src="Images/LandingPage/image1.png" alt="Donation Image" />
            </div>
            <div className="second">
              <img src="Images/LandingPage/image2.png" alt="Donation Image" />
            </div>
          </div>
          <div className="lower">
            <div className="third">
              <img src="Images/LandingPage/image3.png" alt="Donation Image" />
            </div>
            <div className="fourth">
              {" "}
              <img src="Images/LandingPage/image4.png" alt="Donation Image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
