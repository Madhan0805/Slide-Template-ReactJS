import React from "react"; //import react
import { Route, Routes } from "react-router-dom"; //import react router dom
import "./App.css"; //import css
import Signup from "./components/Signup"; //import signup from components
import Login from "./components/Login"; //import login from components
import Home from "./components/Home"; //import home from components
import CreateNewSlide from "./components/CreateNewSlide"; //import create new slide from components
import MySlide from "./components/MySlide"; //import myslide from components
import Profile from "./components/Profile"; //import profile from components
import About from "./components/About"; //import about from components
import ProtectedRoute from "./components/ProtectedRoute"; //import protected route from components
import EditProfile from "./components/EditProfile";
import ManageSlides from "./components/ManageSlides";
import EditSlide from "./components/EditSlide";

function App() {
  //function App
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/create-new-slide" element={<CreateNewSlide />} />
          <Route path="/manage-slides" element={<ManageSlides />} />
          <Route path="/my-slide" element={<MySlide />} />
          <Route path="/edit-slide/:id" element={<EditSlide />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App; //export app
