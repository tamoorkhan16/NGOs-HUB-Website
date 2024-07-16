import React, {useState, useEffect} from "react";
// import "./RenderComponents.css"
import "./Gallery.css";
import {  txtDb} from "../Firebase/firebase";
import LightGallery from "lightgallery/react";
import {useParams} from 'react-router-dom'
import {  collection, getDocs } from "firebase/firestore";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgShare from "lightgallery/plugins/share";
import lgRotate from "lightgallery/plugins/rotate";



function Gallery() {
  // get data from firestore
  const [data, setData] = useState([]);
  const params = useParams();
  

  useEffect(() => {
    const ngoID = params.ngoID; // Assuming params.ngoID contains the NGO ID
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);
  // Function Get data from firestore
  const getData = async () => {
  

    const ngoID = params.ngoID;
    const ValRef = collection(txtDb, "Ngos", ngoID, "Gallery");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []); // Run getData when user changes



  return (
    <>
      <section className="indiviual_page_gallery">
        <LightGallery
          // onInit={onInit}
          speed={500}
          plugins={[
            lgThumbnail,
            lgZoom,
            lgAutoplay,
            lgFullscreen,
            lgRotate,
            lgShare,
          ]}
        >


          {data.map((data, index) => {
            return (
              <a href={data.imgURL}>
                <img
                  className="gallery_image"
                  alt={data.txtVal}
                  src={data.imgURL}
                />
              </a>
            );
          })}

        
        </LightGallery>
      </section>
    </>
  );
}

export default Gallery;
