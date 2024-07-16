import React, { useEffect, useState } from "react";
import "./Team.css";

// Imports
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs , doc, deleteDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


function UserTeam() {

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
    position:"",
    phonenumber:"",
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
    const imgs = ref(imgDb, `Images/Ngos/TeamImages/${v4()}`);
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
      toast.error("You need to be logged in to add a team member.", {
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

    const ValRef = collection(txtDb, "Ngos", ngoID, "Team");
    await addDoc(ValRef, {
      txtVal: formdata.text,
      imgURL: formdata.img,
      memberPosition:formdata.position,
      memberContact:formdata.phonenumber,
    }).then((val) => {
      toast.success("Team Member Added successfully", {
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
      toast.error("Error adding team member: " + error.message, {
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
    const ValRef = collection(txtDb, "Ngos", ngoID, "Team");
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
        toast.error("You need to be logged in to delete a team member", {
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
      const deleteVal = doc(txtDb, "Ngos", ngoID, "Team", id);
      await deleteDoc(deleteVal);
      toast.success("Team Member deleted successfully", {
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
      toast.error("Error deleting team member: " + error.message, {
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
    <>
      <table className="individual_page_team">
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th colSpan={4}>Designation</th>
          <th colSpan={1}>Contact</th>
        </tr>


        {data.map((data, index) => {
            return (
              <tr key={data.id}>
          <td>
            <img src={data.imgURL} alt="" />
          </td>
          <td>{data.txtVal}</td>
          <td colSpan={4}>{data.memberPosition}</td>
          <td>
            {data.memberContact}
          </td>
          <td>
            <i className="fa-solid fa-trash delete_icon_for_teamMember" onClick={() => handleDelete(data.id)}></i>
          </td>
          
        </tr> 
            );
          })}

       
      </table>
      <div className="addteamMembers">
        <h3>Member Registration Form</h3>
        <label htmlFor="profile">Profile Image</label>
        <input type="file" onChange={handleUpload} />
        <label htmlFor="title">Name</label>
        <input type="text" name="text" autoComplete="off" onChange={handleChange} value={formdata.text}/>
        <label htmlFor="title">Designation</label>
        <input type="text" name="position" autoComplete="off" onChange={handleChange} value={formdata.position}/>
        <label htmlFor="title">Contact</label>
        <input type="phone" name="phonenumber" autoComplete="off" onChange={handleChange} value={formdata.phonenumber}/>
        <button onClick={handleClick}> Add </button>
        <ToastContainer/>
      </div>
    </>
  );
}

export default UserTeam;
