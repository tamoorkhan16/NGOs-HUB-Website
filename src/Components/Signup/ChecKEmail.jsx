import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../Firebase/firebase";
import "./CheckEmail.css";

function CheckEmail() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const checkEmailVerification = async () => {
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        toast.success("Email verified successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/NgoDetailsForm");
      } else {
        toast.error("Please verify your email to continue.", {
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

  return (
    <section className="check-email-section">
      <h2>Email Verification</h2>
      <p>
        We have sent a verification email to your email address. Please check your inbox and click on the verification link to continue.
      </p>
      <button className="check-email-btn" onClick={checkEmailVerification}>
        I have verified my email
      </button>
      <ToastContainer />
    </section>
  );
}

export default CheckEmail;
