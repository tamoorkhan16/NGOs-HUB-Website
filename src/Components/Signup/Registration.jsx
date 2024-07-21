import React, { useState } from "react";
import { UserSignupSchema } from "../ValidationSchemas/SignUpValidation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth";
import { app } from "../Firebase/firebase";
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
  const [errors, setErrors] = useState({});
  const [showpass, setShowpass] = useState(false);
  const [showconfirmpass, setShowconfirmpass] = useState(false);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const signupwithgoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/NgoDetailsForm");
      })
      .catch((error) => {
        toast.error(error.message, {
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

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formSignUpData.email,
        formSignUpData.password
      );
      await sendEmailVerification(auth.currentUser).then(    toast.success("Verification email sent! Please check your inbox.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }));
  
      // Automatically navigate to a page to inform the user to check their email.
      navigate("/CheckEmail");
    } catch (error) {
      toast.error(error.message, {
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
  };

 
  const handleShowpass = () => {
    setShowpass(!showpass);
  };

  const handleShowconfirmpass = () => {
    setShowconfirmpass(!showconfirmpass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UserSignupSchema.validate(formSignUpData, { abortEarly: false });
      createUser();
      setErrors({});
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormSignUpData({
      ...formSignUpData,
      [name]: value,
    });
  };

  return (
    <>
      <section className="main_box">
        <h2>Signup Form</h2>
        <div className="logo_register">
          <img src="Images/Favicon/Favicon_Image.png" alt="Logo" />
        </div>
        <button onClick={signupwithgoogle}>
          <img src="Images\Favicon\google_logo.png" alt="Google Logo" /> Continue with Google
        </button>
        <div className="or">
          <hr />
          <h4>OR</h4>
          <hr />
        </div>

        <form className="signup_form" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              className="input-cal input-base input input_sign_up_form"
              placeholder=""
              type="email"
              name="email"
              autoComplete="off"
              value={formSignUpData.email}
              onChange={handlechange}
            />
            {errors.email && <div className="signupformerror">{errors.email}</div>}
            <label htmlFor="email" className="label-input">
              Email
            </label>
          </div>
          <div className="relative">
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
            {errors.password && <div className="signupformerror">{errors.password}</div>}
            <label htmlFor="password" className="label-input">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              className="input-cal input-base input input_sign_up_form"
              placeholder=""
              type={showconfirmpass ? "text" : "password"}
              name="confirmPassword"
              autoComplete="off"
              value={formSignUpData.confirmPassword}
              onChange={handlechange}
            />
            <i className="fa-solid fa-eye" onClick={handleShowconfirmpass}></i>
            {errors.confirmPassword && <div className="signupformerror">{errors.confirmPassword}</div>}
            <label htmlFor="confirmPassword" className="label-input">
              Confirm Password
            </label>
          </div>

          <button className="Signup_btn" type="submit">
            Signup
          </button>

          {/* <button className="Signup_btn" type="button" onClick={checkEmailVerification}>
            I have verified my email
          </button> */}
          <ToastContainer />

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
