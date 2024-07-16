import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "./ContactUsElement.css";
function ContactUsElement() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_shrixnx", "template_h33wnp3", form.current, {
        publicKey: "LtS2v1KaFL9z0uBTM",
      })
      .then(
        () => {
          toast.success("Message sent successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        },
        (error) => {
          // alert("FAILED...", error.text);
          toast.error("FAILED...", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      );
  };

  return (
    <>
      <main>
        <section className="contact_container_upper">
          <div className="info_box">
            <div className="icon">
              <a href="tel:+91-310-7150594">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </a>
            </div>
            <h3>Phone</h3>
          </div>
          <div className="info_box">
            <div className="icon">
              <a href="mailto: ngoshub@gmail.com">
                <i className="fa fa-envelope " area-hidden="true"></i>
              </a>
            </div>
            <h3>Email</h3>
          </div>
          <div className="info_box">
            <div className="icon">
              <a href="/NgosHubChat">
                <i class="fa-solid fa-comments"></i>
              </a>
            </div>
            <h3>Chat</h3>
          </div>
        </section>
        <section className="contact_container_lower">
          <article className="contact_form_side">
            <form className="colorful-form" ref={form} onSubmit={sendEmail}>
              <h2>Contact Us</h2>
              <div className="group_one">
                <div class="relative ">
                  <input
                    className="input-cal input-base input"
                    placeholder=""
                    type="text"
                    name="from_name"
                  />
                  <label className="contact_form_label_white">Full Name</label>
                </div>
                <div class="relative group_relative_right">
                  <input
                    className="input-cal input-base input"
                    placeholder=""
                    type="text"
                    name="from_email"
                  />
                  <label className="contact_form_label_white">Email</label>
                </div>
              </div>

              <div className="group_two">
             
                <div class="relative">
                  <textarea
                    className="input-cal input-base input"
                    placeholder=""
                    type="text"
                    name="message"
                  ></textarea>
                  <label className="contact_form_label_white textarea_label">
                    Message
                  </label>
                </div>
              </div>
              <button className="form-button" type="submit">
                Submit
              </button>
              <ToastContainer/>
            </form>
          </article>
          <aside className="aside_picture">
            <img src="Images\Contact\Blood_donation.png" alt="Aside Help Image" />
          </aside>
        </section>
        
      </main>
    </>
  );
}

export default ContactUsElement;
