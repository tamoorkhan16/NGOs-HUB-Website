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

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();
  const [formdata, setFormData] = useState({
    text: "",
    contact: "",
    email: "",
    blood: "",
    province: "",
    city: "",
    address: "",
  });
  const [data, setData] = useState([]);

  // Check User State
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

  // Get data from Firestore
  useEffect(() => {
    const ngoID = params.ngoID;
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);

  // Add Data to Firestore

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
        memCity: formdata.city,
        memProvince: formdata.province,
        memEmail: formdata.email,
        memBlood: formdata.blood,
        memAddress: formdata.address,
      })
        .then((val) => {
          toast.success("Member registered successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          getData(ngoID);

          setFormData({
            text: "",
            contact: "",
            email: "",
            blood: "",
            province: "",
            city: "",
            address: "",
          });

          setErrors({}); // Refresh data after adding new member
        })
        .catch((error) => {
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
      console.error("Error:", error); // Added logging
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

  return (
    <>
      <section className="Contact_info_outer_container registerNgo_outer_container">
        <header className="registerNgo_header">NGO Contact Information</header>
        <section className="registerNgo_container">
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
                  {errors && (
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
                  {errors && (
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
                  {errors && (
                    <div className="signupformerror">{errors.contact}</div>
                  )}
                </div>
                <div className="registerNgo_input-box">
                  <label>Blood Group</label>
                  <input
                    required
                    placeholder="Enter your Blood Group"
                    type="text"
                    name="blood"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formdata.blood}
                  />
                  {errors && (
                    <div className="signupformerror">{errors.blood}</div>
                  )}
                </div>
              </div>

              <div className="registerNgo_input_group">
                <div className="registerNgo_input-box">
                  <label>Province</label>
                  <input
                    type="text"
                    name="province"
                    id="province"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formdata.province}
                    placeholder="Enter your province"
                  />
                  {errors && (
                    <div className="signupformerror">{errors.province}</div>
                  )}
                </div>
                <div className="registerNgo_input-box">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter your city"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formdata.city}
                  />
                  {errors && (
                    <div className="signupformerror">{errors.city}</div>
                  )}
                </div>
              </div>
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
                {errors && (
                  <div className="signupformerror">{errors.address}</div>
                )}
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
