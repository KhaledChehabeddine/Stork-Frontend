import React, {useCallback, useEffect, useReducer, useState} from 'react';
import '../../Styles/ProfilePage.css'
import ActionTable from "../Tables/ActionTable";
import NavBar from "../Utils/Navbar";
import {formatDate} from "../Utils/utils";
import CIcon from "@coreui/icons-react";
import {cilArrowCircleLeft, cilBriefcase, cilCalendar, cilHome, cilPhone, cilUser, cilUserFemale} from "@coreui/icons";
import {cilMail, cilNote} from "@coreui/icons-pro";
import getApiClient from "../../api_client/getApiClient";
import Spinner from "../Utils/Spinner";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {useNavigate} from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-actions':
      return { ...state, actions: action.actions, actionsLoaded: true };
    case 'set-confirm-rejection':
      return { ...state, confirmRejection: action.value };
    case 'set-confirm-acceptance':
      return { ...state, confirmAcceptance: action.value };
    case 'set-text-box-visible':
      return { ...state, textBoxVisible: action.value };
    case 'set-email-text':
      return { ...state, emailText: action.value };
    case 'set-contact-visible':
      return { ...state, contactVisible: action.value };
    case 'set-contact-text':
      return { ...state, contactText: action.value };
    case 'set-job-position':
      return { ...state, jobPosition: action.jobPosition};
    default:
      return { ...state }
  }
}

  const getGenderIcon = (candidate) => {
  if (candidate.sex === "Male") return <CIcon className="profile-icon" icon={cilUser}/>
  else return <CIcon icon={cilUserFemale}/>
}

const ProfilePage = ({ candidate }) => {
  const [resume, setResume] = useState(null)

  useEffect(() => {
    getApiClient().findResume(candidate.id)
      .then(response => {
        if (response.status === 200) {
          setResume(response.data);
        }
      }).catch(error => console.log(error));
  }, [candidate.id]);


  useEffect(() => {
    getApiClient().findVacancy(candidate.jobPositionId).then(response => {
      dispatch({type: 'set-job-position', jobPosition: response.data});
    }).catch(error => console.log(error));
  }, [candidate.jobPositionId]);

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    actions: [],
    actionsLoaded: false,
    textBoxVisible: false,
    confirmSendOffer: false,
    confirmRejection: false,
    confirmAcceptance: false,
    contactVisible: false,
    emailText: '',
    contactText: '',
    jobPosition: null
  });

  const showFile = useCallback((blob) => {
    // const newBlob = new Blob([blob], {type: "application/pdf"});
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   console.log(1);
    //   window.navigator.msSaveOrOpenBlob(newBlob);
    // }
    // Create blob link to download
    console.log(blob);
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${candidate.firstName + ' ' + candidate.lastName}-Resume.pdf`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }, [candidate]);


  const scheduleInterview = useCallback(() => {
    navigate('/interview/add', {
      state: {
        candidate: candidate
      }
    });
  }, [candidate, navigate]);

  const sendOffer = useCallback((text) => {
    getApiClient().sendEmail(candidate.email, 'Job Offer', text);
    getApiClient().updateStatus(candidate, 'Offer Sent').catch(error => console.log(error));
    getApiClient().addAction('Offer Recieved', candidate.id).catch(error => console.log(error));
    alert('Email sent successfully!');
    dispatch({ type: 'set-text-box-visible', value: false });
    dispatch({ type: 'set-email-text', value: '' });
  }, [candidate]);

  const sendRejection = useCallback(() => {
    let rejectionText = 'Dear ' + candidate.firstName + ' ' + candidate.lastName + '\n'
                      + 'Hope this email finds you well.\n'
                      + 'We are very sad to inform you that your application has not been considered successful.\n\n'
                      + 'Regards,\n'
                      + window.localStorage.getItem('name');
    getApiClient().sendEmail(candidate.email, 'Application', rejectionText)
    getApiClient().updateStatus(candidate, 'Rejected').catch(error => console.log(error));
    getApiClient().addAction('Rejected', candidate.id).catch(error => console.log(error));
  }, [candidate]);

  const Acceptance = useCallback(() => {
    getApiClient().updateStatus(candidate, 'Accepted').catch(error => console.log(error));
    getApiClient().addAction('Accepted', candidate.id).catch(error => console.log(error));
  }, [candidate]);

  const contact = useCallback((text) => {
    getApiClient().sendEmail(candidate.email, 'Application', text);
    alert('Message Sent');
    dispatch({ type: 'set-contact-visible', value: false });
    dispatch({ type: 'set-contact-text', value: '' });
  }, [candidate.email]);

  useEffect(() => {
    getApiClient().getActionsByCandidateId(candidate.id)
      .then(response => {
        dispatch({ type: 'set-actions', actions: response.data });
      }).catch(error => console.log(error));
  }, [candidate]);

  const getActionTable = () => {
    if (state.actions.length === 0) return <h1 className="profile-name">You have not made any actions yet.</h1>
    else return <ActionTable actions={state.actions}/>
  }

  return (
    <>
      {state.actionsLoaded === true
        ?
        <div>
          <NavBar />
          <button className="back-icon-container" onClick={() => navigate("/candidate/all")}>
            <CIcon className="back-icon" icon={cilArrowCircleLeft}/>
          </button>
            <div className="profile-card" style={{display: "flex", justifyContent: "space-evenly"}}>
              <div className="profile-info">
                <h1 className="profile-name" style={{paddingTop: "2%"}}>{candidate.firstName + " " + candidate.lastName}</h1>
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
                    <CIcon className="profile-icon" icon={cilBriefcase}/>
                  </div>
                  <h3 className="card-text" style={{float: "right"}}>{state.jobPosition.jobTitle}</h3>
                </div>
                <div className="profile-field">
                  <div className="profile-icon-container" style={{float: "left"}}>
                    <CIcon className="profile-icon" icon={cilCalendar}/>
                  </div>
                  <h3 className="card-text" style={{float: "right"}}>{formatDate(candidate.date)}</h3>
                </div>
              </div>
            <div className="button-container" style={{float: "right", width: "35%"}}>
              <h1 className="profile-name" style={{paddingTop: "2%"}}>Actions</h1>
              <button className="action-button" onClick={() => {showFile(resume)}}>View Resumé</button>
              <button className="action-button" onClick={scheduleInterview}>Schedule Interview</button>
              <button className="action-button" onClick={() => {
                dispatch({ type: 'set-text-box-visible', value: true });
              }}>Send Offer</button>
              <button className="action-button" onClick={() => {
                dispatch({ type: 'set-confirm-rejection', value: true });
              }}>Reject</button>
              <button className="action-button" onClick={() => {
                dispatch({ type: 'set-confirm-acceptance', value: true });
              }}>Accept</button>
              <button className="action-button" style={{marginBottom: "5%"}} onClick={() => {
                dispatch({ type: 'set-contact-visible', value: true });
              }}>Contact</button>
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
                    visible={state.confirmAcceptance}
                    onClose={() => dispatch({type: 'set-confirm-acceptance', value: false})}>
              <CModalHeader>
                <CModalTitle>Accept</CModalTitle>
              </CModalHeader>
              <CModalBody>Are you sure you want accept this candidate?</CModalBody>
              <CModalFooter>
                <button className="confirm-button" onClick={Acceptance}>Confirm</button>
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
          <div className="profile-card" style={{paddingBottom:"5%", marginBottom: "5%"}}>
            {getActionTable(candidate)}
          </div>
          <div className="profile-card" style={{paddingBottom:"5%"}}>
            <div style={{display: "flex", paddingTop: "5%"}}>
              <h1 className="feedback-title">Feedback Notes</h1>
              <div style={{display: "inline-block", float: "right"}}>
                <CIcon icon={cilNote}/>
              </div>
            </div>
{/*            <div className="feedback-notes">
              <CInputGroup>
                <CFormTextarea aria-label="With textarea">test</CFormTextarea>
              </CInputGroup>
            </div>*/}
          </div>
        </div>
        : <Spinner/>
        }
    </>
  );
};

export default ProfilePage;
