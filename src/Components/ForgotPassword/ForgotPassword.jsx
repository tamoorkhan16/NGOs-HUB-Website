import React, { useState } from "react";
import "./ForgotPassword.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../Firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [formSignUpData, setFormSignUpData] = useState({
    email: "",
  });

  // Handle Change

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormSignUpData({
      ...formSignUpData,
      [name]: value,
    });
  };

  const auth = getAuth(app);
  // Handle Reset
  const handleReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, formSignUpData.email)
      .then((val) =>
        toast.success("Password Reset Link has been sent to your email", {
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
      .catch((error) => {
        toast.error("Error: Password has not been reset ", error, {
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

  return (
    <>
      <div className="forgetPasswordcontainer">
        <h2>Forgot Password </h2>
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

          <label className="label-input">Enter Your Email</label>
        </div>
        <button className="forgotButton" onClick={handleReset}>
          Submit
        </button>
        <ToastContainer />
      </div>
    </>
  );
}

export default ForgotPassword;
