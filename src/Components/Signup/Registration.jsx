import React, { useState } from "react";
import { UserSignupSchema } from "../ValidationSchemas/SignUpValidation";

// Authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../Firebase/firebase";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Registration.css";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [formSignUpData, setFormSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState();
  const [showpass, setShowpass] = useState(false);
  const [showconfirmpass, setShowconfirmpass] = useState(false);
  // Google Authentication
  const provider = new GoogleAuthProvider();
  const signupwithgoogle = () => {
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // alert(error)
    }
  };

  // Firebase Authentication
  const auth = getAuth(app);

  let createUser = async () => {
    await createUserWithEmailAndPassword(
      auth,
      formSignUpData.email,
      formSignUpData.password
    )
      .then((value) =>
        toast.success("Successful Signed up", {
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
          navigate("/Signup/NgoDataForm");
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
  const handleShowconfirmpass = () => {
    setShowconfirmpass(!showconfirmpass);
  };
  // Handle Submit

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UserSignupSchema.validate(formSignUpData, { abortEarly: false });
      // console.log("Form Submitted Data", formSignUpData);
      // alert("Signup Sucessfully");

      const isValid = await UserSignupSchema.isValid(formSignUpData);

      if (isValid) {
        createUser();
        setErrors({});
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
      <section className="main_box">
        <h2>Signup Form</h2>
        <div className="logo_register">
          <img src="Images\Favicon\Favicon_Image.png" alt="" />
        </div>
        <button onClick={signupwithgoogle}>
          <img src="Images\Google_logo.png" alt="" /> Continue with Google
        </button>
        <div className="or">
          <hr />
          <h4>OR</h4>
          <hr />
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
            <label htmlFor="email" className="label-input">
              Email
            </label>
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
            {errors && <div className="signupformerror">{errors.password}</div>}

            <label htmlFor="password" className="label-input">
              Password
            </label>
          </div>
          <div class="relative">
            <input
              className="input-cal input-base input input_sign_up_form"
              placeholder=""
              type={showconfirmpass ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="off"
              value={formSignUpData.confirmPassword}
              onChange={handlechange}
            />
            <i className="fa-solid fa-eye" onClick={handleShowconfirmpass}></i>
            {errors && (
              <div className="signupformerror">{errors.confirmPassword}</div>
            )}
            <label htmlFor="confirmPassword" className="label-input">
              Confirm Password
            </label>
          </div>

          <button className="Signup_btn" onClick={handleSubmit}>
            Signup
            <ToastContainer />
          </button>

          <span>
            Already have an account?{" "}
            <a href="/NgoMangerLogin" className="anchor_style_register">
              Login
            </a>
          </span>
        </form>
      </section>
    </>
  );
}

export default Registration;
