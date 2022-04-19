import React, {useEffect, useReducer} from 'react';
import '../../Styles/ProfilePage.css'
import ActionTable from "../Tables/ActionTable";
import NavBar from "../Utils/Navbar";
import {formatDate} from "../Utils/utils";
import CIcon from "@coreui/icons-react";
import {cilCalendar, cilHome, cilPhone, cilUser, cilUserFemale} from "@coreui/icons";
import {cilMail} from "@coreui/icons-pro";
import getApiClient from "../../api_client/getApiClient";
import Spinner from "../Utils/Spinner";

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-actions':
      return { ...state, actions: action.actions, actionsLoaded: true };
    default:
      return { ...state }
  }
}

const getGenderIcon = (candidate) => {
  if (candidate.sex === "Male") return <CIcon className="profile-icon" icon={cilUser}/>
  else return <CIcon icon={cilUserFemale}/>
}

const ProfilePage = ({ candidate }) => {
  const [state, dispatch] = useReducer(reducer, {
    actions: [],
    actionsLoaded: false
  });

  useEffect(() => {
    getApiClient().getActionsByCandidateId(candidate.id)
      .then(response => {
        dispatch({ type: 'set-actions', actions: response.data });
      }).catch(error => console.log(error));
  }, [candidate]);

  const getActionTable = (candidate) => {
    if (state.actions.length === 0) return <h1 className="profile-name">You have not made any actions yet.</h1>
    else return <ActionTable actions={state.actions}/>
  }

  return (
    <>
      {state.actionsLoaded === true
        ?
        <div>
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
              <div style={{marginBottom: "30%"}}>
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
            <div className="buttons-table" style={{float: "right", marginBottom:"5%"}}>
              <div className="button-container" style={{paddingTop: "20%", marginBottom:"33%"}}>
                <h1 className="profile-name">Actions</h1>
                <button className="action-button">Send Acceptance Letter</button>
                <button className="action-button">Send Rejection Letter</button>
                <button className="action-button">Schedule Interview</button>
                <button className="action-button">Contact</button>
              </div>
            </div>
          </div>
          <div className="actions-table" style={{paddingBottom:"5%"}}>
            {getActionTable(candidate)}
          </div>
        </div>
        : <Spinner/>
        }
    </>
  );
};

export default ProfilePage;
