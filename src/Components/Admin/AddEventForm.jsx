import React, { useEffect, useState } from "react";
import "./AddEventForm.css";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {eventValidationSchema} from "../ValidationSchemas/eventValidationSchema"

function AddEventForm() {
  const navigate = useNavigate();
  // For User State
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();
  // add data to firestore
  const [formdata, setFormData] = useState({
    text: "",
    img: "",
    location: "",
    date: "",
    description: "",
    time:"",
   
    
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
  }, []);
// Handle Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const imgs = ref(imgDb, `Images/Ngos/Events/${v4()}`);
    uploadBytes(imgs, file).then((data) => {
      getDownloadURL(data.ref).then((value) => {
        console.log("File URL:", value); // Debug log for file URL
        setFormData((prevFormData) => ({
          ...prevFormData,
          img: {
            url: value,
            file: file,
          },
        }));
      });
    });
  };
  
  // Handle Click
  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Form Data before validation:", formdata); // Debug log for form data
      await eventValidationSchema.validate(formdata, { abortEarly: false });
  
      const ValRef = collection(txtDb, "Events");
      await addDoc(ValRef, {
        txtVal: formdata.text,
        imgURL: formdata.img.url, // Ensure you're passing the URL here
        eventLocation: formdata.location,
        eventDate: formdata.date,
        eventDescription: formdata.description,
        eventTime: formdata.time,
        userID: user.uid,
        userEmail: user.email,
      }).then((val) => {
        toast.success("Data Added successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });


        setFormData({
          text: "",
          img: "",
          location: "",
          date: "",
          description: "",
          time:"",
         
        })
        setErrors({});
      });
    } catch (error) {
      const newError = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          newError[err.path] = err.message;
        });
      } else {
        newError.general = error.message;
      }
  
      setErrors(newError);
      console.error("Error:", error); // Added logging
    }
  };
  
  // Function Get data from firestore
  const getData = async () => {
    const ValRef = collection(txtDb, "Ngos");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    // console.log(dataDB);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
// Handle Navigate
const handleNavigate=()=>{
  navigate("/AddEvents")
}
  return (
    <>
      <section class="registerNgo_outer_container addEventForm_outer_container">
        <header className="registerNgo_header">Event Registration Form</header>
        <section class="registerNgo_container">
          <form class="registerNgo_form" onSubmit={handleClick}>
            <div className="ngoregistration_textfield_plus_figure">
              <div className="text_fields_Ngo_registration">
                <div class="registerNgo_input-box">
                  <label>Event Name</label>
                  <input
                    required=""
                    placeholder="Enter your event name"
                    type="text"
                    name="text"
                    value={formdata.text}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                                {errors && <div className="signupformerror">{errors.text}</div>}
                </div>

                <div class="registerNgo_input-box">
                  <label>Location</label>
                  <input
                    required=""
                    placeholder="Enter your location"
                    type="location"
                    name="location"
                    value={formdata.location}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                                                  {errors && <div className="signupformerror">{errors.location}</div>}
                </div>

                <div className="registerNgo_input-box_group">
                  <div class="registerNgo_input-box">
                    <label>Date</label>
                    <input
                      required=""
                      placeholder="Enter established date"
                      type="date"
                      name="date"
                      value={formdata.date}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                      {errors && <div className="signupformerror">{errors.date}</div>}
                  </div>
                  <div class="registerNgo_input-box">
                    <label>Time</label>
                    <input
                      required=""
                      placeholder="Enter your location"
                      type="time"
                      name="time"
                      value={formdata.time}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                      {errors && <div className="signupformerror">{errors.time}</div>}
                  </div>
                </div>

                <div class="registerNgo_input-box address">
                  <label>Description</label>
                  <textarea
                    name="description"
                    id=""
                    value={formdata.description}
                    placeholder="Enter your event description"
                    onChange={handleChange}
                    autoComplete="off"
                  ></textarea>
                    {errors && <div className="signupformerror">{errors.description}</div>}
                </div>
                <figure className="ngo_registration_logo event_front_image">
                  <label class="custum-file-upload cfu_upload" forHtml="file">
                    <div class="custum-file-upload_icon">
                      <i class="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <div class="custum-file-upload_text">
                      <span>Click to upload logo</span>
                    </div>
                    <input type="file"     onChange={handleUpload}
                    autoComplete="off"/>
                  </label>
                  {errors && <div className="signupformerror">{errors.img}</div>}
                </figure>
                {/* <div class="registerNgo_input-box address">
                  <label >Event Image</label>
                <input type="file" onChange={handleUpload} />
                    {errors && <div className="signupformerror">{errors.img}</div>}
                </div> */}
              </div>

              <div className="registerNgo_container_left">
                {/* <div class="registerNgo_input-box">
                  <label>Speakers</label>
                  <input
                    required=""
                    placeholder="Enter your speakers"
                    type="text"
                  />
                </div> */}
                {/* <div class="registerNgo_input-box">
              <label>Media Partners</label>
              <input
                required=""
                placeholder="Enter your location"
                type="file"
              />
            </div> */}
                {/* <div class="registerNgo_input-box">
                  <label htmlFor="">Media Partners</label>

                  <div class="input-div">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      fill="none"
                      stroke="currentColor"
                      class="icon"
                    >
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line y2="21" x2="12" y1="12" x1="12"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                    <input
                      class="input"
                      name="file"
                      type="file"
                      multiple="multiple"
                           onChange={handleChange}
                    autoComplete="off"
                    />
                  </div>
                </div> */}
                    
                
              </div>
            </div>
            <div className="individual_cabin_button">
            <button className="home_ngo_card_load_more_button">Add </button>
            <button className="home_ngo_card_load_more_button" onClick={handleNavigate}>Back</button>
            </div>
            <ToastContainer />
          </form>
        </section>
      </section>
    </>
  );
}

export default AddEventForm;
