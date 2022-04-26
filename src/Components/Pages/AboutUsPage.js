import React from 'react';
import photo1 from '../Images/LynneIsmail.jpg';
import photo2 from '../Images/Ahmad Zaaroura.jpg';
import photo3 from '../Images/Khaled Chehabeddine.jpg';
import photo4 from '../Images/Diana Shmoury.jpg';
import NavBar from "../Utils/Navbar";

const AboutUsPage = () => {
  return (
    <>
      <div>
        <NavBar/>
        <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo2} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name">Ahmad Zaaroura</h1>
            <h1 className="role-name">FullStack Developer</h1>
          </div>
        </div>
        <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo1} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name">Lynne Ismail</h1>
            <h1 className="role-name">UI/UX Designer & FullStack Developer</h1>
          </div>
        </div>
        <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo3} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name">Khaled Chehabeddine</h1>
            <h1 className="role-name">FullStack Developer</h1>
          </div>
        </div>
        <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo4} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name">Diana Shmoury</h1>
            <h1 className="role-name">Frontend Developer</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;