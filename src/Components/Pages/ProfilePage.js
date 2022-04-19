import React, {useCallback, useEffect, useReducer} from 'react';
import '../../Styles/ProfilePage.css'
import ActionTable from "../Tables/ActionTable";
import NavBar from "../Utils/Navbar";
import {formatDate, getHashCode} from "../Utils/utils";
import CIcon from "@coreui/icons-react";
import {cilCalendar, cilHome, cilPhone, cilUser, cilUserFemale} from "@coreui/icons";
import {cilMail} from "@coreui/icons-pro";
import getApiClient from "../../api_client/getApiClient";
import Spinner from "../Utils/Spinner";
import {CFormInput, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle} from "@coreui/react";
import {useNavigate} from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-actions':
      return { ...state, actions: action.actions, actionsLoaded: true };
    case 'set-confirm-rejection':
      return { ...state, confirmRejection: action.value };
    case 'set-text-box-visible':
      return { ...state, textBoxVisible: action.value };
    case 'set-email-text':
      return { ...state, emailText: action.value };
    case 'set-contact-visible':
      return { ...state, contactVisible: action.value };
    case 'set-contact-text':
      return { ...state, contactText: action.value };
    default:
      return { ...state }
  }
}

const getGenderIcon = (candidate) => {
  if (candidate.sex === "Male") return <CIcon className="profile-icon" icon={cilUser}/>
  else return <CIcon icon={cilUserFemale}/>
}

const ProfilePage = ({ candidate }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    actions: [],
    actionsLoaded: false,
    textBoxVisible: false,
    confirmSendOffer: false,
    confirmRejection: false,
    contactVisible: false,
    emailText: '',
    contactText: ''
  });

  const scheduleInterview = useCallback(() => {
    navigate('/interview/add', {
      state: {
        candidate: candidate
      }
    });
  }, []);

  const sendOffer = useCallback((text) => {
    getApiClient().sendEmail(candidate.email, 'Job Offer', text);
    getApiClient().updateStatus(candidate, 'Offer Sent').catch(error => console.log(error));
    getApiClient().addAction('Offer Recieved', candidate.id).catch(error => console.log(error));
    alert('Email sent successfully!');
    dispatch({ type: 'set-text-box-visible', value: false });
    dispatch({ type: 'set-email-text', value: '' });
  }, []);

  const sendRejection = useCallback(() => {
    let rejectionText = 'Dear ' + candidate.firstName + ' ' + candidate.lastName + '\n'
                      + 'Hope this email finds you well.\n'
                      + 'We are very sad to inform you that your application has not been considered successful.\n\n'
                      + 'Regards,\n'
                      + window.localStorage.getItem('name');
    getApiClient().sendEmail(candidate.email, 'Application', rejectionText)
    getApiClient().updateStatus(candidate, 'Rejected').catch(error => console.log(error));
    getApiClient().addAction('Rejected', candidate.id).catch(error => console.log(error));
    alert('Candidate Rejected');
  }, []);

  const contact = useCallback((text) => {
    getApiClient().sendEmail(candidate.email, 'Application', text);
    alert('Message Sent');
    dispatch({ type: 'set-contact-visible', value: false });
    dispatch({ type: 'set-contact-text', value: '' });
  }, []);

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
                  <button className="view-resume" onClick={() => {
                    navigate(`/resume/${getHashCode(candidate.id)}`, {
                      state: {
                        candidate: candidate
                      }
                    })
                  }}>View Resumé</button>
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
                <button className="action-button" onClick={scheduleInterview}>Schedule Interview</button>
                <button className="action-button" onClick={() => {
                  dispatch({ type: 'set-contact-visible', value: true });
                }}>Contact</button>
                <button className="action-button" onClick={() => {
                  dispatch({ type: 'set-text-box-visible', value: true });
                }}>Send Offer</button>
                <button className="action-button" onClick={() => {
                  dispatch({ type: 'set-confirm-rejection', value: true });
                }}>Reject</button>
              </div>
            </div>
          </div>
          <div>
            <CModal alignment="center"
                    backdrop={"static"}
                    visible={state.confirmRejection}
                    onClose={() => dispatch({type: 'set-confirm-rejection', value: false})}>
              <CModalHeader>
                <CModalTitle>Reject</CModalTitle>
              </CModalHeader>
              <CModalBody>Are you sure you want reject this candidate?</CModalBody>
              <CModalFooter>
                <button className="confirm-button" onClick={sendRejection}>Confirm</button>
              </CModalFooter>
            </CModal>
            <CModal alignment="center"
                    backdrop={"static"}
                    visible={state.textBoxVisible}
                    onClose={() => dispatch({type: 'set-text-box-visible', value: false})}>
              <CModalHeader>
                <CModalTitle>Write a letter</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <textarea
                  placeholder='Type an offer...'
                  style={{width: '100%', height: '250px'}}
                  onChange={(event) => {
                  dispatch({ type: 'set-email-text', value: event.target.value });
                }}/>
              </CModalBody>
              <CModalFooter>
                <button className="confirm-button" onClick={() => sendOffer(state.emailText)}>Confirm</button>
              </CModalFooter>
            </CModal>
            <CModal alignment="center"
                    backdrop={"static"}
                    visible={state.contactVisible}
                    onClose={() => dispatch({type: 'set-contact-visible', value: false})}>
              <CModalHeader>
                <CModalTitle>Write a letter</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <textarea
                  placeholder='Type a message...'
                  style={{width: '100%', height: '250px'}}
                  onChange={(event) => {
                    dispatch({ type: 'set-contact-text', value: event.target.value });
                }}/>
              </CModalBody>
              <CModalFooter>
                <button className="confirm-button" onClick={() => contact(state.contactText)}>Confirm</button>
              </CModalFooter>
            </CModal>
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
