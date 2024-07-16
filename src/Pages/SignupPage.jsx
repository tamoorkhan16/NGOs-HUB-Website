import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Components/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import Registration from "../Components/Signup/Registration";


function SignupPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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

  if (!user) {
    return <Registration />;
  } else {
    return navigate("/NgoDetailsForm");
  }
}

export default SignupPage;
