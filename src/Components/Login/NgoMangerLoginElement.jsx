import React, { useState} from "react";
import "./index.css";

import { UserLoginSchema } from "../ValidationSchemas/LoginValidation";

// Authentication
import {
  getAuth,
  signInWithEmailAndPassword,
  
} from "firebase/auth";
import { app } from "../Firebase/firebase";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Signup/Registration.css";
import { useNavigate } from "react-router-dom";

function NgoMangerLoginElement() {
  const [formSignUpData, setFormSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState();
  const [showpass, setShowpass] = useState(false);

  // Firebase Authentication
  const auth = getAuth(app);

  let loginUser = () => {
    signInWithEmailAndPassword(
      auth,
      formSignUpData.email,
      formSignUpData.password
    )
      .then((value) =>
        toast.success("Successfully login", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      )
      .then((value) => {
        setTimeout(() => {
          navigate("/NgoMangerLogin");
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.message;

        toast.error(errorMessage, {
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

  // Hide and Show Password
  const handleShowpass = () => {
    setShowpass(!showpass);
  };

  // Handle Submit

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UserLoginSchema.validate(formSignUpData, { abortEarly: false });
      // console.log("Form Submitted Data", formSignUpData);
      // alert("Signup Sucessfully");

      const isValid = await UserLoginSchema.isValid(formSignUpData);

      if (isValid) {
        loginUser();
      } else {
        toast.error("Enter valid email and password", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });

      setErrors(newError);
    }
  };

  // Handle Change

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormSignUpData({
      ...formSignUpData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

 
  return (
    <>
      <div className="LoginContainer">
        <section className="main_box">
          <h2>Manager Login Form</h2>
          <div className="logo_register">
            <img src="Images\Favicon\Favicon_Image.png" alt="" />
          </div>
        

          <form action="" className="signup_form" onSubmit={handleSubmit}>
            <div class="relative">
              <input
                className="input-cal input-base input input_sign_up_form"
                placeholder=""
                type="email"
                name="email"
                autoComplete="off"
                value={formSignUpData.email}
                onChange={handlechange}
              />
              {errors && <div className="signupformerror">{errors.email}</div>}
              <label className="label-input">Email</label>
            </div>
            <div class="relative">
              <input
                className="input-cal input-base input input_sign_up_form"
                placeholder=""
                type={showpass ? "text" : "password"}
                name="password"
                autoComplete="off"
                value={formSignUpData.password}
                onChange={handlechange}
              />
              <i className="fa-solid fa-eye" onClick={handleShowpass}></i>
              {errors && (
                <div className="signupformerror">{errors.password}</div>
              )}
              <label className="label-input">Password</label>
            </div>

            <button className="Signup_btn" onClick={handleSubmit}>
              {" "}
              Login
            </button>
            <ToastContainer />

            <a
              href="/ForgotPassword"
              className="anchor_style_register forget_anchor_style_register"
            >
              Forgot Password?
            </a>
            <span>
              Don't have an account?{" "}
              <a href="/signup" className="anchor_style_register">
                Signup
              </a>
            </span>
          </form>
        </section>
      </div>
    </>
  );
}

export default NgoMangerLoginElement;
