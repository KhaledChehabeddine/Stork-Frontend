import React from 'react';
import '../../Styles/ProfilePage.css'
import ActionTable from "../Tables/ActionTable";
import NavBar from "../Utils/Navbar";
import {formatDate} from "../Utils/utils";
import CIcon from "@coreui/icons-react";
import {cilUser, cilUserFemale} from "@coreui/icons";

const getGenderIcon = (candidate) => {
  if (candidate.sex === "Male") return <CIcon icon={cilUser}/>
  else return <CIcon icon={cilUserFemale}/>
}
const ProfilePage = ({ candidate }) => {
  return (
    <>
      <NavBar />
      <div className="profile-card" style={{float: "left"}}>
        <svg className="profile-wave-top" viewBox="0 0 1440 420" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id='sineWave' fill="black" fillOpacity="0.3" d="M0,160 C320,300,420,300,740,160 C1060,20,1120,20,1440,160 V0 H0"/>
          </defs>
          <use className="wave" href="#sineWave"/>
          <use className="wave" x="-100%" href="#sineWave"/>
          <use className="wave1" href="#sineWave"/>
          <use className="wave1" x="-100%" href="#sineWave"/>
          <use className="wave2" href="#sineWave"/>
          <use className="wave2" x="-100%" href="#sineWave"/>
        </svg>
        <h1 className="card-text">{candidate.firstName + " " + candidate.lastName}</h1>
        <div className="profile-field">
          <div style={{float: "left"}}>
            {getGenderIcon(candidate)}
          </div>
          <h3 style={{float: "right"}}>{candidate.sex}</h3>
        </div>
        <h3 className="profile-field">{candidate.email}</h3>
        <h3 className="profile-field">{candidate.phone}</h3>
        <h3 className="profile-field">{formatDate(candidate.date)}</h3>
        <h3 className="profile-field">{candidate.country}</h3>
        <svg className="profile-wave-bottom" viewBox="0 0 1440 420" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id='sineWave' fillOpacity="0.2" d="M0,160 C320,300,420,300,740,160 C1060,20,1120,20,1440,160 V0 H0"/>
          </defs>
          <use className="wave" href="#sineWave"/>
          <use className="wave" x="-100%" href="#sineWave"/>
          <use className="wave1" href="#sineWave"/>
          <use className="wave1" x="-100%" href="#sineWave"/>
          <use className="wave2" href="#sineWave"/>
          <use className="wave2" x="-100%" href="#sineWave"/>
        </svg>
      </div>
      <div style={{width: "70%", float: "right"}}>
        <h3>{candidate.email}</h3>
        <h3>{candidate.phone}</h3>
        <h3>{formatDate(candidate.date)}</h3>
        <h3>{candidate.country}</h3>
        <h3>{candidate.sex}</h3>
      </div>
      <ActionTable candidate={candidate} />
    </>
  );
};

export default ProfilePage;
