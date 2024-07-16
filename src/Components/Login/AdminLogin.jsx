import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  console.log(pass);
  console.log(email);

  const handlelogin = (e) => {
    e.preventDefault();
    if (email === "Admin@gmail.com" && pass === "Admin123") {
      navigate("/Admin");
    } else if (email === "" && pass === "") {
      toast.error("Enter all fields properly", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Invalid Credientals", {
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

  const navigate = useNavigate();

  return (
    <>
      <div className="LoginContainer">
        <section className="main_box">
          <h2>Admin Login Form</h2>
          <div className="logo_register">
            <img src="Images\Favicon\Favicon_Image.png" alt="" />
          </div>
 

          <form action="" className="signup_form">
            <div class="relative">
              <input
                className="input-cal input-base input input_sign_up_form"
                placeholder=""
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label className="label-input">Email</label>
            </div>
            <div class="relative">
              <input
                className="input-cal input-base input input_sign_up_form"
                placeholder=""
                type="password"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
              <label className="label-input">Password</label>
            </div>

            <button className="Signup_btn" onClick={handlelogin}>
              {" "}
              Login
            </button>
            <ToastContainer />

            {/* <a className="anchor_style_register forget_anchor_style_register">
              Forgot Password?
            </a> */}
          </form>
        </section>
      </div>
    </>
  );
}

export default AdminLogin;
