import React, { useEffect, useState } from "react";
// import "./RenderComponents.css"
import "./Gallery.css";

import LightGallery from "lightgallery/react";

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

// Imports
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate , useParams} from "react-router-dom";

function UserGallery() {

  const params = useParams();
  

  useEffect(() => {
    const ngoID = params.ngoID; // Assuming params.ngoID contains the NGO ID
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);
 
  const navigate = useNavigate();
  // For User State
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();
  // Add data to firestore
  const [formdata, setFormData] = useState({
    text: "",
    img: "",
  
  });

  // get data from firestore
  const [data, setData] = useState([]);

  // To Check User State
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  // Function add Image to firestore
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDb, `Images/Ngos/GalleryImages/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((value) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          img: value,
        }));
      });
    });
  };

  // Function add data to firestore
  const handleClick = async () => {
    if (!user) {
      toast.error("You need to be logged in to add a image", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const ngoID = params.ngoID;

    const ValRef = collection(txtDb, "Ngos", ngoID, "Gallery");
    await addDoc(ValRef, {
      txtVal: formdata.text,
      imgURL: formdata.img,

    }).then((val) => {
      toast.success("Image Added successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getData(); // Refresh data after adding new project
    }).catch((error) => {
      toast.error("Error adding image: " + error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  // Function Get data from firestore
  const getData = async () => {
    if (!user) return;

    const ngoID = params.ngoID;
    const ValRef = collection(txtDb, "Ngos", ngoID, "Gallery");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, [user]); // Run getData when user changes

  // Handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
 
  return (
    <>
      <section className="indiviual_page_gallery">
        <LightGallery
    
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
          <div className="addGalleryImage">

            <input type="file" onChange={handleUpload}/>
            <label htmlFor="title">Image Title</label>
            <input type="text" name="text" onChange={handleChange} value={formdata.text}  autoComplete="off"/>
<button onClick={handleClick}>Add</button>
<ToastContainer/>

          </div>
      </section>
    </>
  );
}

export default UserGallery;
