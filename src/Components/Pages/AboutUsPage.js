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
            <h1 className="role-name">ahmad.zaaroura.123@gmail.com</h1>
            <h2 className="aboutus-text" style={{color:"grey"}}>I am a Computer Science scholarship student at AUB. I enjoy fullstack development and love to build discord bots, play cards, and chess in my free time. </h2>
          </div>
        </div>
        <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo1} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name">Lynne Ismail</h1>
            <h1 className="role-name">UI/UX Designer & FullStack Developer</h1>
            <h1 className="role-name">lynneismael@hotmail.com</h1>
            <h2 className="aboutus-text" style={{color:"grey"}}>I am a Junior Computer Science major at the American University of Beirut. I am interested in the frontend aspect of software development, and like to do some game development on the side as a hobby.</h2>
          </div>
        </div>
        <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo3} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name">Khaled Chehabeddine</h1>
            <h1 className="role-name">FullStack Developer</h1>
            <h1 className="role-name">khaled.ch2002@gmail.com</h1>
            <h2 className="aboutus-text" style={{color:"grey"}}>I’m currently a Computer Science undergraduate at the American University of Beirut. I love to code and experiment with web development frameworks like React Js and SpringBoot and I aspire to be a full stack developer.</h2>
          </div>
        </div>
        <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
          <img className="aboutus-photo" style={{float:"left"}} src={photo4} alt="Logo" />
          <div style={{float: "right", width: "70%"}}>
            <h1 className="profile-name">Diana Shmoury</h1>
            <h1 className="role-name">Frontend Developer</h1>
            <h1 className="role-name">dshmouri@gmail.com</h1>
            <h2 className="aboutus-text" style={{color:"grey"}}>I am a USAID full scholarship at the American University of Beirut majoring in Computer Science. I am interested in developing new skills related to my major which are mostly algorithms, data structures and software development.</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;