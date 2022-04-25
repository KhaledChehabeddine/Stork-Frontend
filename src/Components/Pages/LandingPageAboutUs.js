import React from "react";
import Background from "../Utils/Background";
import LandingPageNavBar from "../Utils/LandingPageNavbar";
import photo1 from '../Images/LynneIsmail.jpg'

const LandingPageAboutUs = () => {
  return (
    <>
      <div className="landing-page">
        <Background/>
        <LandingPageNavBar/>
        <div className="aboutus-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo1} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name" style={{color: "black"}}>Ahmad Zaaroura</h1>
            <h1 className="role-name">FullStack Developer</h1>
          </div>
        </div>
        <div className="aboutus-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo1} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name" style={{color: "black"}}>Lynne Ismail</h1>
            <h1 className="role-name">UI/UX Designer & Frontend Developer</h1>
          </div>
        </div>
        <div className="aboutus-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo1} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name" style={{color: "black"}}>Khaled Chehabeddine</h1>
            <h1 className="role-name">FullStack Developer</h1>
          </div>
        </div>
        <div className="aboutus-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo1} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name" style={{color: "black"}}>Diana Shmoury</h1>
            <h1 className="role-name">Frontend Developer</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPageAboutUs;