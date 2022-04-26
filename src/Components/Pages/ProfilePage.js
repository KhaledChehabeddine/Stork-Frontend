import axios from 'axios';
import CIcon from '@coreui/icons-react';
import React, {useCallback, useEffect, useReducer} from 'react';
import {cilArrowCircleLeft, cilBriefcase, cilCalendar, cilHome, cilPhone, cilUser, cilUserFemale} from '@coreui/icons';
import {cilMail, cilNote} from '@coreui/icons-pro';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle
} from '@coreui/react';
import ActionTable from '../Tables/ActionTable';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import Spinner from '../Utils/Spinner';
import {formatDate} from '../Utils/utils';
import {useNavigate} from 'react-router-dom';
import '../../Styles/ProfilePage.css'
import FeedbackTable from "../Tables/FeedbackTable";

const initialState = {
  actions: [],
  actionsLoaded: false,
  confirmSendOffer: false,
  confirmRejection: false,
  confirmAcceptance: false,
  contactText: '',
  contactVisible: false,
  emailText: '',
  jobPosition: null,
  resume: null,
  textBoxVisible: false,
  feedbackText: '',
  feedbackVisible: false,
  feedbacks: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-actions':
      return {...state, actions: action.actions, actionsLoaded: true};
    case 'set-confirm-rejection':
      return {...state, confirmRejection: action.value};
    case 'set-confirm-acceptance':
      return { ...state, confirmAcceptance: action.value };
    case 'set-contact-text':
      return {...state, contactText: action.value};
    case 'set-contact-visible':
      return {...state, contactVisible: action.value};
    case 'set-email-text':
      return {...state, emailText: action.value};
    case 'set-job-position':
      return {...state, jobPosition: action.jobPosition};
    case 'set-resume':
      return {...state, resume: action.resume};
    case 'set-text-box-visible':
      return {...state, textBoxVisible: action.value};
    case 'set-feedback-text':
      return {...state, feedbackText: action.value};
    case 'set-feedback-visible':
      return {...state, feedbackVisible: action.value};
    case 'set-feedbacks':
      return {...state, feedbacks: action.value}
    default:
      return {...state}
  }
}

const ProfilePage = ({ candidate }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(candidate);
    dispatch({type: 'set-job-position', jobPosition: candidate.jobPosition});
  }, [candidate.jobPosition]);

  useEffect(() => {
    getApiClient().getActionsByCandidateId(candidate.id).then(response => {
      dispatch({ type: 'set-actions', actions: response.data });
    }).catch(error => console.log(error));
  }, [candidate.id]);

  useEffect(() => {
    getApiClient().getFeedbacksByCandidateId(candidate.id).then(notes => {
      dispatch({ type: 'set-feedbacks', value: notes.data });
    }).catch(error => console.log(error));
  }, [candidate.id]);

  const interviewButton = () => {
    return <button className='action-button' onClick={scheduleInterview}>Schedule Interview</button>
  }

  const offerButton = () => {
    return <button className='action-button' onClick={() => dispatch({ type: 'set-text-box-visible', value: true })}>Send Offer</button>
  }

  const rejectButton = () => {
    return <button className='action-button' onClick={() => dispatch({ type: 'set-confirm-rejection', value: true })}>Reject</button>
  }

  const acceptButton = () => {
    return <button className='action-button' onClick={() => dispatch({ type: 'set-confirm-acceptance', value: true })}>Accept</button>
  }

  const getActionButtons = () => {
    let status = (candidate.status).toLowerCase();
    if (status.includes("pending") || status.includes("interview"))
      return <div style={{textAlign: "center"}}>{interviewButton()}{offerButton()}{rejectButton()}{acceptButton()}</div>;
    else if (status.includes("sent")) return <div style={{textAlign: "center"}}>{acceptButton()}</div>;
    else if (status.includes("accepted")) return null;
    else if (status.includes("rejected")) return null;
    else return null
  }

  const setGenderIcon = () => {
    return candidate.sex === 'Male' ? <CIcon icon={cilUser}/> : <CIcon icon={cilUserFemale}/>;
  }

  const getActionTable = () => {
    return state.actions.length ? <ActionTable actions={state.actions}/> :
      <h1 className='alert-text'>You have not made any actions yet.</h1>
  }

  const getFeedbackTable = () => {
    return state.feedbacks.length ? <FeedbackTable feedbacks={state.feedbacks}/> :
      <h1 className='alert-text'>You have not written any feedback yet.</h1>
  }

  const downloadResume = useCallback(() => {
    axios({
      url: `https://storkrecruit-api.herokuapp.com/resume/find?id=${candidate.id}`,
      method: 'GET',
      responseType: 'blob'
    }).then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    }).catch(error => console.log(error));
  }, [candidate]);

  const scheduleInterview = useCallback(() => {
    navigate('/interview/add', {state: {candidate: candidate}});
  }, [candidate, navigate]);

  const sendOffer = useCallback((text) => {
    getApiClient().sendEmail(candidate.email, 'Job Offer', text);
    getApiClient().updateStatus(candidate, 'Offer Sent').catch(error => console.log(error));
    getApiClient().addAction('Offer Received', candidate).catch(error => console.log(error));
    dispatch({ type: 'set-text-box-visible', value: false });
    dispatch({ type: 'set-email-text', value: '' });
  }, [candidate]);

  const sendRejection = useCallback(() => {
    let rejectionText = "Dear " + candidate.firstName + " " + candidate.lastName + ",\n"
                      + "Thank you for your interest in the " + state.jobPosition.jobTitle + " position.\n"+
                      + "After careful consideration, we regret to inform you that you were not selected for the position.\n\n"
                      + "Best Regards,\n"
                      + window.localStorage.getItem('name');
    getApiClient().sendEmail(candidate.email, 'Application', rejectionText)
    getApiClient().updateStatus(candidate, 'Rejected').catch(error => console.log(error));
    getApiClient().addAction('Rejected', candidate).catch(error => console.log(error));
    dispatch({ type: 'set-confirm-rejection', value: false });
  }, [candidate]);

  const Acceptance = useCallback(() => {
    getApiClient().updateStatus(candidate, 'Accepted').catch(error => console.log(error));
    getApiClient().addAction('Accepted', candidate).catch(error => console.log(error));
    dispatch({ type: 'set-confirm-acceptance', value: false });
  }, [candidate]);

  const contact = useCallback((text) => {
    getApiClient().sendEmail(candidate.email, 'Application', text+`\n`);
    dispatch({ type: 'set-contact-visible', value: false });
    dispatch({ type: 'set-contact-text', value: '' });
  }, [candidate.email]);

  const feedback = useCallback((text) => {
    getApiClient().addFeedback(candidate.id, text)
      .then(response => {
        console.log(response);
        window.location.reload();
      }).catch(error => console.log(error));
    dispatch({ type: 'set-feedback-visible', value: false });
    dispatch({ type: 'set-feedback-text', value: '' });
  }, [candidate.id]);

  return (
    <>
      {state.actionsLoaded ?
        <div>
          <NavBar/>
          <div style={{height: "10px"}}>
            <button className="back-icon-container" onClick={() => {navigate('/candidate/all')}} style={{paddingLeft: "2%"}}>
              <CIcon className="back-icon" icon={cilArrowCircleLeft}/>
            </button>
          </div>
          <div className='profile-card'
               style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div className='profile-info'>
              <h1 className='profile-name'
                  style={{paddingTop: '2%'}}>{candidate.firstName + ' ' + candidate.lastName}</h1>
              <div className='profile-field'>
                <div className='profile-icon-container'
                     style={{float: 'left'}}>{setGenderIcon()}</div>
                <h3 className='card-text'
                    style={{float: 'right'}}>{candidate.sex}</h3>
              </div>
              <div className='profile-field'>
                <div className='profile-icon-container'
                     style={{float: 'left'}}><CIcon icon={cilHome}/></div>
                <h3 className='card-text'
                    style={{float: 'right'}}>{candidate.country}</h3>
              </div>
              <div className='profile-field'>
                <div className='profile-icon-container'
                     style={{float: 'left'}}><CIcon icon={cilPhone}/></div>
                <h3 className='card-text'
                    style={{float: 'right'}}>{candidate.phone}</h3>
              </div>
              <div className='profile-field'>
                <div className='profile-icon-container'
                     style={{float: 'left'}}><CIcon icon={cilMail}/></div>
                <h3 className='card-text'
                    style={{float: 'right'}}>{candidate.email}</h3>
              </div>
              <div className='profile-field'>
                <div className='profile-icon-container'
                     style={{float: 'left'}}><CIcon icon={cilBriefcase}/></div>
                <h3 className='card-text'
                    style={{float: 'right'}}>{state.jobPosition.jobTitle}</h3>
              </div>
              <div className='profile-field'>
                <div className='profile-icon-container'
                     style={{float: 'left'}}><CIcon icon={cilCalendar}/></div>
                <h3 className='card-text'
                    style={{float: 'right'}}>{formatDate(candidate.date)}</h3>
              </div>
            </div>
          <div className='button-container'
               style={{float: 'right', width: '35%'}}>
            <h1 className='profile-name'
                style={{paddingTop: '2%'}}>Actions</h1>
            <button className='action-button'
                    onClick={() => downloadResume()}>View Resume</button>
            {getActionButtons()}
            <button className='action-button'
                    style={{marginBottom: '5%'}}
                    onClick={() => dispatch({ type: 'set-contact-visible', value: true })}>Contact</button>
          </div>
        </div>

        <CModal alignment='center'
                backdrop='static'
                visible={state.confirmRejection}
                onClose={() => dispatch({type: 'set-confirm-rejection', value: false})}>
          <CModalBody>Are you sure you want to reject this candidate?</CModalBody>
          <CModalFooter>
            <button className="form-button" onClick={() => dispatch({type: 'set-confirm-rejection', value: false})}>Cancel</button>
            <button className="form-button" onClick={sendRejection}>Confirm</button>
          </CModalFooter>
        </CModal>
          <CModal alignment='center'
                  backdrop='static'
                  visible={state.confirmAcceptance}
                  onClose={() => dispatch({type: 'set-confirm-acceptance', value: false})}>
            <CModalBody>Are you sure you want to accept this candidate?</CModalBody>
            <CModalFooter>
              <button className="form-button" onClick={() => dispatch({type: 'set-confirm-acceptance', value: false})}>Cancel</button>
              <button className="form-button" onClick={Acceptance}>Confirm</button>
            </CModalFooter>
          </CModal>
          <CModal alignment='center'
                  backdrop={'static'}
                  visible={state.textBoxVisible}
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  onClose={() => dispatch({type: 'set-text-box-visible', value: false})}>
            <CModalTitle style={{margin:"3%"}}>Send An Offer</CModalTitle>
            <CModalBody>
              <textarea
                placeholder='Type an email...'
                style={{width: '100%', height: '250px'}}
                onChange={(event) => {
                dispatch({ type: 'set-email-text', value: event.target.value });
              }}/>
            </CModalBody>
            <CModalFooter>
              <button className="form-button" onClick={() => dispatch({type: 'set-text-box-visible', value: false})}>Cancel</button>
              <button className='form-button' onClick={() => sendOffer(state.emailText)}>Confirm</button>
            </CModalFooter>
          </CModal>
          <CModal alignment='center'
                  backdrop={'static'}
                  visible={state.contactVisible}
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  onClose={() => dispatch({type: 'set-contact-visible', value: false})}>
            <CModalTitle style={{margin: "3%"}}>Send An Email</CModalTitle>
            <CModalBody>
              <textarea
                placeholder='Type a message...'
                style={{width: '100%', height: '250px'}}
                onChange={(event) => {
                  dispatch({ type: 'set-contact-text', value: event.target.value });
              }}/>
            </CModalBody>
            <CModalFooter>
              <button className="form-button" onClick={() => dispatch({type: 'set-contact-visible', value: false})}>Cancel</button>
              <button className='form-button'
                      onClick={() => contact(state.contactText)}>Confirm</button>
            </CModalFooter>
          </CModal>
          <CModal alignment='center'
                  backdrop={'static'}
                  visible={state.feedbackVisible}
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  onClose={() => dispatch({type: 'set-feedback-visible', value: false})}>
            <CModalTitle style={{margin: "3%"}}>Write Feedback</CModalTitle>
            <CModalBody>
              <textarea
                placeholder='Type your notes...'
                style={{width: '100%', height: '250px'}}
                onChange={(event) => {
                  dispatch({ type: 'set-feedback-text', value: event.target.value });
                }}/>
            </CModalBody>
            <CModalFooter>
              <button className="form-button" onClick={() => dispatch({type: 'set-feedback-visible', value: false})}>Cancel</button>
              <button className='form-button'
                      onClick={() => feedback(state.feedbackText)}>Confirm</button>
            </CModalFooter>
          </CModal>
        <div className='profile-card'
             style={{paddingBottom:'5%', marginBottom: '5%'}}>
          {getActionTable(candidate)}
        </div>
        <div className='profile-card'
             style={{paddingBottom:'5%'}}>
          <div style={{display: 'flex', justifyContent: "center", marginBottom: "5%"}}>
            <h1 className='feedback-title'>Feedback Notes</h1>
            <button className="icon-button" onClick={() => dispatch({ type: 'set-feedback-visible', value: true })} style={{paddingLeft: "2%"}}>
              <CIcon icon={cilNote}/>
            </button>
          </div>
          {getFeedbackTable()}
        </div>
        </div>
        : <Spinner/>}
    </>
  );
};

export default ProfilePage;
