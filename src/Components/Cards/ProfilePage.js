import React from 'react';
import '../../Styles/ProfilePage.css'
import ActionTable from "../Tables/ActionTable";
import NavBar from "../Utils/Navbar";
import {formatDate} from "../Utils/utils";
import CIcon from "@coreui/icons-react";
import {cilCalendar, cilHome, cilPhone, cilUser, cilUserFemale} from "@coreui/icons";
import {cilMail} from "@coreui/icons-pro";

const getGenderIcon = (candidate) => {
  if (candidate.sex === "Male") return <CIcon className="profile-icon" icon={cilUser}/>
  else return <CIcon icon={cilUserFemale}/>
}
const ProfilePage = ({ candidate }) => {
  return (
    <>
      <NavBar />
      <div style={{display: "flex", height: "110%"}}>
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
          <h1 className="profile-name">{candidate.firstName + " " + candidate.lastName}</h1>
          <div className="profile-field">
            <div className="profile-icon-container" style={{float: "left"}}>
              {getGenderIcon(candidate)}
            </div>
            <h3 className="card-text" style={{float: "right"}}>{candidate.sex}</h3>
          </div>
          <div className="profile-field">
            <div className="profile-icon-container" style={{float: "left"}}>
              <CIcon className="profile-icon" icon={cilHome}/>
            </div>
            <h3 className="card-text" style={{float: "right"}}>{candidate.country}</h3>
          </div>
          <div className="profile-field">
            <div className="profile-icon-container" style={{float: "left"}}>
              <CIcon className="profile-icon" icon={cilPhone}/>
            </div>
            <h3 className="card-text" style={{float: "right"}}>{candidate.phone}</h3>
          </div>
          <div className="profile-field">
            <div className="profile-icon-container" style={{float: "left"}}>
              <CIcon className="profile-icon" icon={cilMail}/>
            </div>
            <h3 className="card-text" style={{float: "right"}}>{candidate.email}</h3>
          </div>
          <div className="profile-field">
            <div className="profile-icon-container" style={{float: "left"}}>
              <CIcon className="profile-icon" icon={cilCalendar}/>
            </div>
            <h3 className="card-text" style={{float: "right"}}>{formatDate(candidate.date)}</h3>
          </div>
          <div className="view-resume-container">
            <button className="view-resume">View Resumé</button>
          </div>
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
        <div className="buttons-table" style={{float: "right"}}>
          <div className="button-container" style={{paddingTop: "20%"}}>
            <h1 className="profile-name">Actions</h1>
            <button className="action-button">Send Acceptance Letter</button>
            <button className="action-button">Send Rejection Letter</button>
            <button className="action-button">Schedule Interview</button>
            <button className="action-button">Contact</button>
          </div>
        </div>
      </div>
      <div className="actions-table">
        <ActionTable candidate={candidate} />
      </div>
    </>
  );
};

export default ProfilePage;
