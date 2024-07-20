import React, { useEffect, useState } from "react";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./NgoDataForm.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ngoValidationSchema } from "../ValidationSchemas/ngoValidationSchema";

function NgoDataForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [formdata, setFormData] = useState({
    text: "",
    img: "",
    domain: "",
    date: "",
    description: "",
    link: "",
    register: "",
    email: "",
    address: "",
    phone: "",
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
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgs = ref(imgDb, `Images/Ngos/Logos/${v4()}`);
    uploadBytes(imgs, file).then((data) => {
      getDownloadURL(data.ref).then((value) => {
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await ngoValidationSchema.validate(formdata, { abortEarly: false });

      const ValRef = collection(txtDb, "Ngos");
      await addDoc(ValRef, {
        txtVal: formdata.text,
        imgURL: formdata.img.url, // Ensure you're passing the URL here
        ngoEmail: formdata.email,
        ngoDomain: formdata.domain,
        ngoDescription: formdata.description,
        ngoPhone: formdata.phone,
        ngoAddress: formdata.address,
        ngoRegister: formdata.register,
        ngoLink: formdata.link,
        ngoDate: formdata.date,
        userID: user.uid,
        userEmail: user.email,
      }).then((val) => {
        toast
          .success("Data Added successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          .then(navigate("/Home"));
        // Reset form fields
        setFormData({
          text: "",
          img: "",
          domain: "",
          date: "",
          description: "",
          link: "",
          register: "",
          email: "",
          address: "",
          phone: "",
        });
      });

      setErrors({});
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

  const getData = async () => {
    const ValRef = collection(txtDb, "Ngos");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNavigate = () => {
    navigate("/Home");
  };

  return (
    <>
      <main className="NgoDataFormContainer">
      <i className="fa-solid fa-xmark cross-icon" onClick={handleNavigate}></i>  
        <div className="NgoRegisterationFormHeading">
          <h2>NGO Registration Form</h2>
        </div>

        <div className="individual_cabin">
          <div className="individual_field_box">
            <label htmlFor="">Ngo Name</label>
            <input
              type="text"
              name="text"
              onChange={handleChange}
              value={formdata.text}
              autoComplete="off"
            />
            {errors && <div className="signupformerror">{errors.text}</div>}
          </div>
          <div className="individual_field_box">
            <label htmlFor="">Ngo Domain</label>
            {/* <input
              type="text"
              name="domain"
              onChange={handleChange}
              value={formdata.domain}
              autoComplete="off"
            /> */}
            <select
              name="domain"
              id="domain"
              onChange={handleChange}
              value={formdata.domain}
            >
              <option value="Education">Education</option>
              <option value="Health Care">Health Care</option>
              <option value="Human Rights">Human Rights</option>
              <option value="Environmental Conservation">
                Environmental Conservation
              </option>
              <option value="Poverty Alleviation">Poverty Alleviation</option>
              <option value="Gender Equality">Gender Equality</option>
              <option value="Disaster Relief">Disaster Relief</option>
              <option value="Children and Youth">Children and Youth</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Arts and Culture">Arts and Culture</option>
              <option value="Community Development">
                Community Development
              </option>
              <option value="Mental Health">Mental Health</option>
            </select>
            {errors && <div className="signupformerror">{errors.domain}</div>}
          </div>
          <div className="individual_field_box">
            <label htmlFor="">Established Date</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={formdata.date}
              autoComplete="off"
            />
            {errors && <div className="signupformerror">{errors.date}</div>}
          </div>
        </div>

        <div className="individual_cabin">
          <div className="individual_field_box">
            <label htmlFor="">Ngo Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formdata.email}
              autoComplete="off"
            />
            {errors && <div className="signupformerror">{errors.email}</div>}
          </div>
          <div className="individual_field_box">
            <label htmlFor="">Ngo Phone Number</label>
            <input
              type="phone"
              name="phone"
              onChange={handleChange}
              value={formdata.phone}
              autoComplete="off"
            />
            {errors && <div className="signupformerror">{errors.phone}</div>}
          </div>
          <div className="individual_field_box">
            <label htmlFor="">Ngo Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={formdata.address}
              autoComplete="off"
            />
            {errors && <div className="signupformerror">{errors.address}</div>}
          </div>
        </div>
        <div className="individual_cabin">
          <div className="individual_field_box">
            <label htmlFor="">Ngo Online Presence</label>
            <input
              type="url"
              name="link"
              onChange={handleChange}
              value={formdata.link}
              autoComplete="off"
            />
            {errors && <div className="signupformerror">{errors.link}</div>}
          </div>
          <div className="individual_field_box">
            <label htmlFor="">Ngo Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formdata.description}
              autoComplete="off"
            />
            {errors && (
              <div className="signupformerror">{errors.description}</div>
            )}
          </div>
          <div className="individual_field_box">
            <label htmlFor="">Ngo Logo</label>
            <input type="file" onChange={handleUpload} autoComplete="off" />
            {errors && <div className="signupformerror">{errors.img}</div>}
          </div>
        </div>
        <div className="individual_cabin_button">
          <button
            onClick={handleClick}
            className="NgoDataFormButton home_ngo_card_load_more_button"
          >
            Register
            <ToastContainer />
          </button>
        </div>
      </main>
    </>
  );
}

export default NgoDataForm;
