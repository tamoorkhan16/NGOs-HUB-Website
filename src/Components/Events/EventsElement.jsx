import React, { useEffect, useState } from "react";
import "./EventsElement.css";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function EventsElement() {
  const navigate = useNavigate();
  // For User State
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();
  // add data to firestore
  const [formdata, setFormData] = useState({
    text: "",
    img: "",
    location: "",
    date: "",
    description: "",
    time: "",
  });

  // get data from firestore
  const [data, setData] = useState([]);

  // To Check User State
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

  // Function add Image to firestore
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDb, `Images/Ngos/Logos/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((value) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          img: value,
        }));
      });
    });
  };

  // Function add data to firestore
  const handleClick = async (e) => {
    e.preventDefault();
    const ValRef = collection(txtDb, "Events");
    await addDoc(ValRef, {
      txtVal: formdata.text,
      imgURL: formdata.img,
      eventLocation: formdata.location,
      eventDate: formdata.date,
      eventDescription: formdata.description,
      eventTime: formdata.time,
      userID: user.uid,
      userEmail: user.email,
    });
  };

  // Function Get data from firestore
  const getData = async () => {
    const ValRef = collection(txtDb, "Events");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    // console.log(dataDB);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="events_main_container">
        <div className="events_main_container_heading">Events</div>

        {data.map((v) => (
          <div className="event_card">
            <img src={v.imgURL} alt="Event" />
            <div className="event__card__content">
              <div className="event__card__content__inner__box">
                <div className="event_card_content_left_side">
                  <p className="event__card__title">{v.txtVal}</p>
                  <p className="event__card__description">
                    {v.eventDescription}
                  </p>

                  <div className="event_card_group">
                    <h3>Location:</h3>
                    <p className="event__card__location">
                      <a
                        href="https://maps.app.goo.gl/naHMZBghSrCcKprf6"
                        target="_blank"
                      >
                        {v.eventLocation}
                      </a>
                    </p>
                  </div>
                  <div className="event__card__datetime_box">
                    <div className="event_card_group">
                      <h3>Date:</h3>
                      <p className="event__card__date">{v.eventDate}</p>
                    </div>

                    <div className="event_card_group">
                      <h3>Time:</h3>
                      <p className="event__card__time">{v.eventTime}</p>
                    </div>
                  </div>
                </div>

                <div className="event_card_content_right_side">
                  <img src={v.imgURL} alt="" srcset="" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventsElement;
