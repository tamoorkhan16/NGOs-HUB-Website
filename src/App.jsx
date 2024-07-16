import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import FaqsPage from "./Pages/FaqsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import AboutUsPage from "./Pages/AboutUsPage";
import NgoHubChatBot from "./Components/ContactUs/NgoHubChatBot";
import SignupPage from "./Pages/SignupPage";
import NgoDataForm from "./Components/NgoDetailsForm/NgoDataForm";
import EventsPage from "./Pages/EventsPage";
import ProfilePage from "./Pages/ProfilePage";
import IndividualNgoPage from "./Pages/IndividualNgoPage"
import UserNgoPage from "./Pages/UserNgoPage";
import MemberRegistrationPage from "./Pages/MemberRegistrationPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import NgoManagerLoginPage from "./Pages/NgoManagerLoginPage";
import AdminPage from "./Pages/AdminPage";
import ManageNgosPage from "./Pages/ManageNgosPage";
import AddEventsPage from "./Pages/AddEventsPage";
import AddEventFormPage from "./Pages/AddEventFormPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Faqs" element={<FaqsPage />} />
        <Route path="/Contact" element={<ContactUsPage />} />
        <Route path="/NgosHubChat" element={<NgoHubChatBot />} />
        <Route path="/About" element={<AboutUsPage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/NgoDetailsForm" element={<NgoDataForm />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/ManageNgos" element={<ManageNgosPage />} />
        <Route path="/AddEvents" element={<AddEventsPage />} />
        <Route path="/AddEventForm" element={<AddEventFormPage />} />
        <Route path="/NgoMangerLogin" element={<NgoManagerLoginPage />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
        <Route
          path="/UserNgoPage/view/:ngoID"
          element={<UserNgoPage />}
        />
        <Route
          path="/NgoPage/view/:ngoID"
          element={<IndividualNgoPage />}
        />
        <Route
          path="/NgoPage/view/:ngoID/MemberRegistration"
          element={<MemberRegistrationPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
