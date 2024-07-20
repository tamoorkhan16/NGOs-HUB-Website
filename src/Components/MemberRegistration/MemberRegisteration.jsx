import React, { useEffect, useState } from "react";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./MemberRegistration.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { memberValidationSchema } from "../ValidationSchemas/memberValidationSchema";

function MemberRegisteration() {
  const params = useParams();

console.log(params)

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [formdata, setFormData] = useState({
    text: "",
    contact: "",
    email: "",
    blood: "",
    address: "",
  });
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const ngoID = params.ngoID;
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);

  const handleClick = async (e) => {
    e.preventDefault();
    const ngoID = params.ngoID;

    try {
      await memberValidationSchema.validate(formdata, { abortEarly: false });
      if (!ngoID) {
        toast.error("Invalid NGO ID", {
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

      const ValRef = collection(txtDb, "Ngos", ngoID, "Members");
      await addDoc(ValRef, {
        memtxtVal: formdata.text,
        memContact: formdata.contact,
        memEmail: formdata.email,
        memBlood: formdata.blood,
        memAddress: formdata.address,
      })
        .then((val) => {
          console.log("Document written with ID: ", val.id);
          toast.success("Member registered successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }).then( navigate(`/NgoPage/view/${params.ngoID}`));
          getData(ngoID);

          setFormData({
            text: "",
            contact: "",
            email: "",
            blood: "",
            address: "",
          });

          setErrors({});
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error("Error registering member: " + error.message, {
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
      console.error("Validation Error:", error);
    }
  };

  const getData = async (ngoID) => {
    const ValRef = collection(txtDb, "Ngos", ngoID, "Members");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNavigate =()=>{
    navigate(`/NgoPage/view/${params.ngoID}`)
  }

  return (
    <>
      <section className="Contact_info_outer_container registerNgo_outer_container">
     
        <header className="registerNgo_header">NGO Contact Information</header>
        <section className="registerNgo_container">
          <i className="fa-solid fa-xmark cross_icon" onClick={handleNavigate}></i>  
          <form className="registerNgo_form" action="#">
            <div className="contact_info_form_container">
              <div className="registerNgo_input_group">
                <div className="registerNgo_input-box">
                  <label>Name</label>
                  <input
                    required=""
                    type="text"
                    name="text"
                    placeholder="Enter your name"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formdata.text}
                  />
                  {errors.text && (
                    <div className="signupformerror">{errors.text}</div>
                  )}
                </div>

                <div className="registerNgo_input-box">
                  <label>Email</label>
                  <input
                    required=""
                    placeholder="Enter your official NGO email"
                    type="email"
                    name="email"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formdata.email}
                  />
                  {errors.email && (
                    <div className="signupformerror">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="registerNgo_input_group">
                <div className="registerNgo_input-box">
                  <label>Contact</label>
                  <input
                    required=""
                    placeholder="Enter your contact number"
                    name="contact"
                    type="tel"
                    onChange={handleChange}
                    value={formdata.contact}
                    autoComplete="off"
                  />
                  {errors.contact && (
                    <div className="signupformerror">{errors.contact}</div>
                  )}
                </div>
                <div className="registerNgo_input-box">
                  <label>Blood Group</label>
                  <select
                    name="blood"
                    onChange={handleChange}
                    value={formdata.blood}
                    id="blood"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  {errors.blood && (
                    <div className="signupformerror">{errors.blood}</div>
                  )}
                </div>
              </div>

              <div className="registerNgo_input-group">
                <div className="registerNgo_input-box">
                  <label>Address</label>
                  <input
                    required=""
                    placeholder="Enter your address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formdata.address}
                  />
                  {errors.address && (
                    <div className="signupformerror">{errors.address}</div>
                  )}
                </div>
              </div>
            </div>
            <button
              className="home_ngo_card_load_more_button"
              onClick={handleClick}
            >
              Finish
            </button>
          
            <ToastContainer />
    
          </form>
        </section>
      </section>
    
    </>
  );
}

export default MemberRegisteration;
