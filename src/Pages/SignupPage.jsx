// src/Pages/SignupPage.js
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Components/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import Registration from "../Components/Signup/Registration";
import EventLoadingPage from "../Components/Loading/EventLoadingPage";

function SignupPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          navigate("/NgoDetailsForm");
        } else {
          navigate("/CheckEmail");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return <EventLoadingPage />;
  }

  return <Registration />;
}

export default SignupPage;
