import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged , signOut} from "firebase/auth";
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { imgDb, txtDb, app } from "../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NgoMangerLoginElement from "./NgoMangerLoginElement";
import Loading from "../Loading/Loading";
import NavigationBarForUser from "../NavigationBar/NavigationBarForUser";

function NgoMangerLogin() {
  const params = useParams();
  const navigate = useNavigate();

  // Form data state
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

  // Data state
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async (userEmail) => {
      try {
        console.log(`Fetching data for email: ${userEmail}`);
        const q = query(
          collection(txtDb, "Ngos"),
          where("userEmail", "==", userEmail)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No matching documents.");
        } else {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUserData(data);
          console.log("User data:", data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData(user.email);
    }
  }, [user]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <NgoMangerLoginElement />;
  }

  // Function to handle image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(imgDb, `Images/Ngos/Logos/${v4()}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          img: url,
        }));
      });
    });
  };

  // Function to handle form submission
  const handleClick = async () => {
    const docRef = collection(txtDb, "Ngos");
    await addDoc(docRef, formdata);
    alert("Data Added successfully");
  };

  // Function to handle form data changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };





  // Render user data
  return (
    <>

    <NavigationBarForUser/>
      <div className="userNgoMainContainer">
        
       <div className="Profile_Logout">
        <h2> Hello! {user.email}</h2>
        {/* <h2>Log Out</h2> */}
        </div> 

        <div className="userNgoOuterContainer">
        {userData ? (
        
        userData.map((data) => (
        
            <div
              class="card"
              onClick={() => {
                navigate(`/UserNgoPage/view/${data.id}`);
              }}
            >
              <img src={data.imgURL} alt="" loading="lazy" />
              <div class="card__content">
                <h3 class="name">{data.txtVal}</h3>
                <p class="category">{data.ngoDomain}</p>
                <p class="description">{data.ngoDescription}</p>
              </div>
            </div> 
          ))


        ) : (
          <p>No data found for this user.</p>
        )}
        </div>
        
      </div>
    </>
  );
}

export default NgoMangerLogin;
