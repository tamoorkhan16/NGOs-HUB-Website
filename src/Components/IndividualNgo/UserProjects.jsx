import React, { useEffect, useState } from "react";
import "./RenderComponents.css";

// Imports
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


function UserProjects() {
  const params = useParams();
  

  useEffect(() => {
    const ngoID = params.ngoID; // Assuming params.ngoID contains the NGO ID
    if (ngoID) {
      getData(ngoID);
    } else {
      console.error("Invalid NGO ID");
    }
  }, [params]);
 
  const navigate = useNavigate();
  // For User State
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();
  // Add data to firestore
  const [formdata, setFormData] = useState({
    text: "",
    img: "",
    description: "",
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
  }, [auth]);

  // Function add Image to firestore
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDb, `Images/Ngos/ProjectImages/${v4()}`);
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
    if (!user) {
      toast.error("You need to be logged in to add a project.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const ngoID = params.ngoID;

    const ValRef = collection(txtDb, "Ngos", ngoID, "Projects");
    await addDoc(ValRef, {
      txtVal: formdata.text,
      imgURL: formdata.img,
      projectDescription: formdata.description,
    }).then((val) => {
      toast.success("Project Added successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getData(); // Refresh data after adding new project
    }).catch((error) => {
      toast.error("Error adding project: " + error.message, {
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

  // Function Get data from firestore
  const getData = async () => {
    if (!user) return;

    const ngoID = params.ngoID;
    const ValRef = collection(txtDb, "Ngos", ngoID, "Projects");
    const dataDB = await getDocs(ValRef);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, [user]); // Run getData when user changes

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
      if (!user) {
        toast.error("You need to be logged in to delete a project.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const ngoID = params.ngoID;
      const deleteVal = doc(txtDb, "Ngos", ngoID, "Projects", id);
      await deleteDoc(deleteVal);
      toast.success("Project deleted successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getData(); // Refresh data after deletion
    } catch (error) {
      console.log(error);
      toast.error("Error deleting project: " + error.message, {
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

  // console.log("Projects" ,data)

  return (
    <>

    
      <section className="individual_page_projects">
        {data.map((data, index) => {
          return (
            <div className="event_card" key={index}>
              <img src={data.imgURL} alt="Event" />
              <div className="event__card__content">
                <div className="event__card__content__inner__box">
                  <div className="event_card_content_left_side">
                    <p className="event__card__title">{data.txtVal}</p>
                    <p className="event__card__description">{data.projectDescription}</p>
                    <i
                      className="fa-solid fa-trash project_delete_button"
                      onClick={() => handleDelete(data.id)}
                    ></i>
                  </div>

                  <div className="event_card_content_right_side">
                    <img src={data.imgURL} alt="" srcSet="" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <main className="ngo_project_form addteamMembers">
          <h3>Project</h3>

          <label htmlFor="profile">Project Cover Image</label>
          <input type="file" onChange={handleUpload} />
          <label htmlFor="title"> Project Name</label>
          <input
            type="text"
            name="text"
            autoComplete="off"
            onChange={handleChange}
            value={formdata.text}
          />
          <label htmlFor="title"> Project Description</label>
          <textarea
            type="text"
            name="description"
            autoComplete="off"
            onChange={handleChange}
            value={formdata.description}
          />

          <button onClick={handleClick}> Add New Project </button>
          <ToastContainer />
          
        </main>
      </section>
    </>
  );
}

export default UserProjects;
