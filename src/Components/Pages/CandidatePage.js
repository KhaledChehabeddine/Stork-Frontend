import axios from 'axios';
import CIcon from '@coreui/icons-react';
import React, {useCallback, useEffect, useReducer} from 'react';
import {
  cilArrowCircleLeft,
  cilBriefcase,
  cilCalendar,
  cilGlobeAlt,
  cilHome,
  cilPhone,
  cilUser,
  cilUserFemale
} from '@coreui/icons';
import {cilCalendarEvent, cilCity, cilMail, cilNote} from '@coreui/icons-pro';
import {
  CButton, CCard,
  CCardBody, CCardText, CCardTitle, CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle, CRow
} from '@coreui/react';
import ActionTable from '../Tables/ActionTable';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import Spinner from '../Utils/Spinner';
import {formatDate} from '../Utils/utils';
import {useNavigate} from 'react-router-dom';
import '../../Styles/ProfilePage.css'
import FeedbackTable from "../Tables/FeedbackTable";
import '../../Styles/ViewPage.css'

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

const CandidatePage = ({ candidate }) => {
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

  const setGenderIcon = () => {
    return candidate.sex === 'Male' ? <CIcon className='me-3'
                                             icon={cilUser}/> : <CIcon className='me-3'
                                                                       icon={cilUserFemale}/>;
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
                      + "Thank you for your interest in the " + candidate.jobPosition.jobTitle + " position.\n"+
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
    getApiClient().addFeedback(candidate, text)
      .then(response => {
        console.log(response);
        window.location.reload();
      }).catch(error => console.log(error));
    dispatch({ type: 'set-feedback-visible', value: false });
    dispatch({ type: 'set-feedback-text', value: '' });
  }, [candidate]);

  return (
    <>
      {state.actionsLoaded ?
        <div>
          <NavBar/>

          <div style={{height: '5px'}}>
            <CIcon className='view-back-button view-back-cursor'
                   icon={cilArrowCircleLeft}
                   size='xxl'
                   onClick={() => {navigate('/candidate/all')}}/>
          </div>

          <div className='full-height'>
            <CCard className='m-auto mt-5 mb-5 p-5 view-card'
                   style={{borderRadius: '2rem'}}>
              <CCardBody>
                <CRow>
                  <CCol className='position-relative'
                        style={{left: '10%'}}>
                    <CCardTitle className='mb-4 fw-bold fs-2 profile-name'>
                      {candidate.firstName + ' ' + candidate.lastName}
                    </CCardTitle>
                  </CCol>
                  <CCol className='d-sm-flex justify-content-sm-center'>
                    <CCardTitle className='mb-4 fw-bold fs-2 profile-name'>Actions</CCardTitle>
                  </CCol>
                </CRow>

                <CRow className='mb-3'>
                  <CCol className='position-relative'
                        style={{left: '10%'}}>
                    <CCardText className='mb-2'>
                      {setGenderIcon()}
                      {candidate.sex}
                    </CCardText>
                  </CCol>
                  <CCol className='d-sm-flex justify-content-sm-center'>
                    <CButton className='view-page-button'
                             shape='rounded-pill'
                             onClick={downloadResume}>View resume</CButton>
                  </CCol>
                </CRow>

                <CRow className='mb-3'>
                  <CCol className='position-relative'
                        style={{left: '10%'}}>
                    <CCardText className='mb-2'>
                      <CIcon className='me-3'
                             icon={cilHome}/>
                      {candidate.country}
                    </CCardText>
                  </CCol>
                  <CCol className='d-sm-flex justify-content-sm-center'>
                    {candidate.status.toLowerCase() === 'offer sent' ||
                     candidate.status.toLowerCase() === 'accepted' ||
                     candidate.status.toLowerCase() === 'rejected' ?
                      <CButton className='view-page-button-disabled'
                               shape='rounded-pill'>Schedule interview</CButton> :
                      <CButton className='view-page-button'
                               shape='rounded-pill'
                               onClick={scheduleInterview}>Schedule interview</CButton>}
                  </CCol>
                </CRow>

                <CRow className='mb-3'>
                  <CCol className='position-relative'
                        style={{left: '10%'}}>
                    <CCardText className='mb-2'>
                      <CIcon className='me-3'
                             icon={cilPhone}/>
                      {candidate.phone}
                    </CCardText>
                  </CCol>
                  <CCol className='d-sm-flex justify-content-sm-center'>
                    {candidate.status.toLowerCase() === 'offer sent' ||
                     candidate.status.toLowerCase() === 'accepted' ||
                     candidate.status.toLowerCase() === 'rejected' ?
                      <CButton className='view-page-button-disabled'
                               shape='rounded-pill'>Send offer</CButton> :
                      <CButton className='view-page-button'
                               shape='rounded-pill'
                               onClick={() => dispatch({
                                 type: 'set-text-box-visible', value: true
                               })}>Send offer</CButton>}
                  </CCol>
                </CRow>

                <CRow className='mb-3'>
                  <CCol className='position-relative'
                        style={{left: '10%'}}>
                    <CCardText className='mb-2'>
                      <CIcon className='me-3'
                             icon={cilMail}/>
                      {candidate.email}
                    </CCardText>
                  </CCol>
                  <CCol className='d-sm-flex justify-content-sm-center'>
                    {candidate.status.toLowerCase() === 'offer sent' ||
                     candidate.status.toLowerCase() === 'accepted' ||
                     candidate.status.toLowerCase() === 'rejected' ?
                      <CButton className='view-page-button-disabled'
                               shape='rounded-pill'>Reject</CButton> :
                      <CButton className='view-page-button'
                               shape='rounded-pill'
                               onClick={() => dispatch({
                                 type: 'set-confirm-rejection', value: true
                               })}>Reject</CButton>}
                  </CCol>
                </CRow>

                <CRow className='mb-3'>
                  <CCol className='position-relative'
                        style={{left: '10%'}}>
                    <CCardText className='mb-2'>
                      <CIcon className='me-3'
                             icon={cilBriefcase}/>
                      {state.jobPosition.jobTitle}
                    </CCardText>
                  </CCol>
                  <CCol className='d-sm-flex justify-content-sm-center'>
                    {candidate.status.toLowerCase() === 'accepted' ||
                     candidate.status.toLowerCase() === 'rejected' ?
                      <CButton className='view-page-button-disabled'
                               shape='rounded-pill'>Accept</CButton> :
                      <CButton className='view-page-button'
                               shape='rounded-pill'
                               onClick={() => dispatch({
                                 type: 'set-confirm-acceptance', value: true
                               })}>Accept</CButton>}
                  </CCol>
                </CRow>

                <CRow className='mb-3'>
                  <CCol className='position-relative'
                        style={{left: '10%'}}>
                    <CCardText className='mb-2'>
                      <CIcon className='me-3'
                             icon={cilCalendar}/>
                      {formatDate(candidate.date)}
                    </CCardText>
                  </CCol>
                  <CCol className='d-sm-flex justify-content-sm-center'>
                    {candidate.status.toLowerCase() === 'offer sent' ||
                     candidate.status.toLowerCase() === 'accepted' ||
                     candidate.status.toLowerCase() === 'rejected' ?
                      <CButton className='view-page-button-disabled'
                               shape='rounded-pill'>Contact</CButton> :
                      <CButton className='view-page-button'
                               shape='rounded-pill'
                               onClick={() => dispatch({
                                 type: 'set-contact-visible', value: true
                               })}>Contact</CButton>}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </div>

          <CCard className='m-auto mt-5 mb-5 pt-5 pb-5 view-card'
                 style={{borderRadius: '2rem'}}>
            {getActionTable(candidate)}
          </CCard>

          <CCard className='m-auto mt-5 mb-5 pt-5 pb-5 view-card'
                 style={{borderRadius: '2rem'}}>
            <div className='d-flex justify-content-center mb-4'>
              <h1 className='feedback-title'>Feedback Notes</h1>
              <button className="icon-button" onClick={() => dispatch({ type: 'set-feedback-visible', value: true })} style={{paddingLeft: "2%"}}>
                <CIcon icon={cilNote}/>
              </button>
            </div>
            {getFeedbackTable()}
          </CCard>

          <CRow className='mt-3'/>

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
        </div>
        : <Spinner/>}
    </>
  );
};

export default CandidatePage;
