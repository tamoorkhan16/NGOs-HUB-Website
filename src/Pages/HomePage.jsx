import React from "react";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import MenuBar from "../Components/MenuBar/MenuBar";
import Slider from "../Components/Slider/Slider";
import Footer from "../Components/Footer/Footer";
import HomeNgoCards from "../Components/Ngos/HomeNgoCards";


function HomePage() {
  return (
    <>
      <div className="home_body">
      <NavigationBar />
      <MenuBar />
      <Slider />
      <HomeNgoCards/>
      <Footer/>
      </div>
    </>
  );
}

export default HomePage;
