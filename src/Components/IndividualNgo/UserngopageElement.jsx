import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./IndividualNgoPage.css";
import UserButtonGroup from "./UserButtonGroup"
import UserRenderComponent from "./UserRenderComponent";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./UserngopageElement.css"

function UserngopageElement() {
  const params = useParams();

  // For User State
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();

  // Add data to firestore
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

  // Get data from firestore
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
  const getData = async (ngoID) => {
    try {
      const docRef = doc(txtDb, "Ngos", ngoID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setData(data);
        console.log("NGO data:", data);
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    const ngoID = params.ngoID; // Assuming params.ngoID contains the NGO ID
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);

  // Handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [isSelected, setIsselected] = useState(0);
  const buttons_render = [
    "Description",
    "Projects",
    "Gallery",
    "Team",
    "Community",
  ];
  const navigate = useNavigate();
  return (
    <>
      <main className="ind_ngoPage_main_container">
      <div className="ind_ngoPage_main_container_heading">


   <h2>Hello! {data.userEmail}</h2>
   </div>
        <section className="ind_ngoPage_header">
          <div className="ind_ngoPage_logo">
            <img src={data.imgURL} alt="" />
            <div className="ind_ngoName">
              <h1>{data.txtVal}</h1>
              <p>{data.ngoDomain}</p>
            </div>
          </div>

          <div className="ind_ngoPage_header_buttons">
            {/* <button className="header_button"><i class="fa-solid fa-heart"></i></button>
            <button className="header_button"><i class="fa-solid fa-share-nodes"></i></button> */}
            
          </div>
        </section>

        <section className="ind_ngoPage_bar">
          <UserButtonGroup
            buttons_render={buttons_render}
            isSelected={isSelected}
            setIsselected={setIsselected}
          />

          {/* <li>Description</li>
                <li>Projects</li>
                <li>Gallery</li>
                <li>Team</li>
                <li>Community</li> */}
        </section>
        <UserRenderComponent index={isSelected} data={data} />
      </main>
    </>
  );
}

export default UserngopageElement;
