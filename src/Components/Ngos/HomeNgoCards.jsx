import React, { useEffect, useState } from "react";
import "./HomeNgoCards.css";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const HomeNgoCards = () => {
  const navigate = useNavigate();
  // For User State
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();
  // add data to firestore
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
  const handleClick = async () => {
    const ValRef = collection(txtDb, "Ngos");
    await addDoc(ValRef, {
      txtVal: formdata.text,
      imgURL: formdata.img,
      ngoEmail: formdata.email,
      ngoDomain: formdata.domain,
      ngoDescription: formdata.description,
      ngoPhone: formdata.phone,
      ngoAddress: formdata.address,
      ngoRegister: formdata.register,
      ngoLink: formdata.link,
      ngoDate: formdata.date,
    });
    alert("Data Added successfully");
  };

  // Function Get data from firestore
  const getData = async () => {
    const ValRef = collection(txtDb, "Ngos");
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
      <div className="home_ngo_card_outer_container">
        <h2>NGOs</h2>

        <div className="ngo_outer_container">
          {data.map((v) => (
            <div
              class="card"
              onClick={() => {
                navigate(`/NgoPage/view/${v.id}`);
              }}
            >
              <img src={v.imgURL} alt="" loading="lazy" />
              <div class="card__content">
                <h3 class="name">{v.txtVal}</h3>
                <p class="category">{v.ngoDomain}</p>
                <p class="description">{v.ngoDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeNgoCards;
