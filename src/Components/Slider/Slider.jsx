import React, { useState, useEffect } from "react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Slider.css";
import Loading from "../Loading/Loading";

function Slider() {
  const [active, setactive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const Slide_Images = [
    { image: "Images/Slider/Slider1.jpg" },
    // { image: "Images/Slider/Slider5.jpg" },
    { image: "Images/Slider/Slider2.jpg" },
    { image: "Images/Slider/Slider4.jpg" },
  ];

  useEffect(() => {
    if (imagesLoaded === Slide_Images.length) {
      setLoading(false);
    }
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <div>
      {loading && <Loading />}
      <div className={`container_outer_Swiper ${loading ? "loading" : ""}`}>
        <Swiper
          onSlideChange={(cur) => setactive(cur.realIndex)}
          effect={"coverflow"}
          grabCursor={"true"}
          centeredSlides={"true"}
          loop={"true"}
          slidesPerView={"auto"}
          speed={800}
          autoplay={{
            delay: 3000,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container"
        >
          {Slide_Images.map((Slide_Image, i) => {
            return (
              <SwiperSlide
                key={i}
                className={`image_for_swipe ${active === i && "card_active"}`}
              >
                <img
                  src={Slide_Image.image}
                  alt="Slide_Image"
                  onLoad={handleImageLoad}
                />
              </SwiperSlide>
            );
          })}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon
                name="arrow-back-outline"
                className="ion-icon"
              ></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon
                name="arrow-forward-outline"
                className="ion-icon"
              ></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
