import React, { useState } from "react";
import "./Footer.css";
import { txtDb } from "../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NewsletterSchema } from "../ValidationSchemas/NewsletterSchema";

function Footer() {
  const [formSignUpData, setFormSignUpData] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await NewsletterSchema.validate(formSignUpData, { abortEarly: false });

      if (formSignUpData.email) {
        // Add to firebase
        const emailData = collection(txtDb, "Emails");
        await addDoc(emailData, {
          newsemail: formSignUpData.email,
          time: Date.now(),
        });
        setFormSignUpData({ email: "" });
        setErrors({}); // Clear errors on successful submission
        setMessage("Thank you for subscribing!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormSignUpData({
      ...formSignUpData,
      [name]: value,
    });
  };

  return (
    <>
      <footer>
        <div className="row1">
          <div className="col des">
            <h3>
              NGO HUB{" "}
              <div className="underlined">
                <span></span>
              </div>
            </h3>
            <p className="footer_ngoDescription_para">
              NGO Hub is your gateway to a thriving community of
              non-governmental organizations (NGOs) worldwide. We offer
              essential resources, connections, and support to amplify the
              impact of NGOs, fostering collaboration and driving positive
              change globally.
            </p>
          </div>

          <div className="col newsletter">
            <h3>
              Newsletter{" "}
              <div className="underlined">
                <span></span>
              </div>
            </h3>
            <form onSubmit={submitHandler}>
              <i className="fa fa-envelope"></i>
              <input
                className="email"
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your email id"
                onChange={handleChange}
                value={formSignUpData.email}
              />
              <button type="submit">
                <i className="fa fa-arrow-right"></i>
              </button>
            </form>
            {errors.email && <div className="signupformerror">{errors.email}</div>}
            {message && <p className="Newsletter_Message">{message}</p>}
          </div>
        </div>
        <div className="row2">
         
          <div className="links">
            <ul className="footer_social_links">
              <li className="icon-content">
                <a
                  href="https://www.facebook.com/"
                  aria-label="Facebook"
                  data-social="Facebook"
                >
                  <div className="filled"></div>
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <div className="tooltip">Facebook</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://www.instagram.com/"
                  aria-label="Instagram"
                  data-social="Instagram"
                >
                  <div className="filled"></div>
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <div className="tooltip">Instagram</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://Whatsapp.com/"
                  aria-label="WhatsApp"
                  data-social="WhatsApp"
                >
                  <div className="filled"></div>
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <div className="tooltip">WhatsApp</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://linkedin.com/"
                  aria-label="LinkedIn"
                  data-social="LinkedIn"
                >
                  <div className="filled"></div>
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <div className="tooltip">LinkedIn</div>
              </li>
              <li className="icon-content">
                <a
                  href="https://email.com/"
                  aria-label="Email"
                  data-social="Email"
                >
                  <div className="filled"></div>
                  <i className="fa-regular fa-envelope"></i>
                </a>
                <div className="tooltip">Email</div>
              </li>
              <li className="icon-content">
                <a href="https://X.com/" aria-label="X" data-social="X">
                  <div className="filled"></div>
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <div className="tooltip">X</div>
              </li>
            </ul>
          </div>
        
        </div>
        <p className="center copyright">
          All &copy;Copyrights are reserved NGO HUB
        </p>
      </footer>
    </>
  );
}

export default Footer;
