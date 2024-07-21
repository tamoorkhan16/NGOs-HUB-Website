import React, { useEffect, useState } from "react";
import "./ManageNgo.css";
import AdminPanel from "./AdminPanel";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EventLoadingPage from "../Loading/EventLoadingPage";

function ManageNgos() {
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
  const [loading, setLoading] = useState(true); // Loading state
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
  }, [auth]);

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
    getData(); // Refresh data after adding
  };

  // Function Get data from firestore
  const getData = async () => {
    const ValRef = collection(txtDb, "Ngos");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    setLoading(false); // Set loading to false after data is fetched
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

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const deleteVal = doc(txtDb, "Ngos", id);
      await deleteDoc(deleteVal);
      toast.success("Ngo deleted successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",});
      getData(); // Refresh data after deletion
    } catch (error) {
      console.log(error);
      toast.error("Error deleting NGO: " + error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",});
    }
  };

  if (loading) {
    return <EventLoadingPage/>;
  }

  return (
    <>
      <AdminPanel />
      <div className="manageNgo_container">
        <ul className="manageNGO_list">
          {data.map((v) => (
            <li key={v.id} className="manageNgo_single_item">
              <div className="manageNgo_group">
                <img src={v.imgURL} alt="" />
                <p className="manageNgo_name">{v.txtVal}</p>
              </div>
              <i className="fa-solid fa-trash" onClick={() => handleDelete(v.id)}></i>
            
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </>
  );
}

export default ManageNgos;
