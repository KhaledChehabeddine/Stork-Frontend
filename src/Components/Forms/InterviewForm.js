import '../../Styles/FormStyle.css';
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea} from "@coreui/react";
import {formStyle} from "../Utils/Styles";
import {useLocation, useNavigate} from "react-router-dom";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import React, {useReducer, useEffect, useCallback, useState} from 'react';
import Spinner from '../Utils/Spinner';

const initialState = {
  candidateId: null,
  candidates: [],
  date_time: null,
  description: "",
  jobPositionId: null,
  jobPositions: [],
  jobTitle: '',
  numInterviews: 0,
  pageLoaded: false,
  redirected: false,
  valid: false
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'load-page':
      return {...state, candidates: action.candidates, pageLoaded: true, vacancies: action.vacancies};
    case 'set-valid':
      return {...state, valid: true};
    case 'set-candidate-id':
      return {...state, candidateId: action.candidateId};
    case 'set-vacancy':
      return {...state, vacancy: action.vacancy};
    case 'set-date-time':
      return {...state, date_time: action.date_time};
    case 'set-description':
      return {...state, description: action.description};
    case 'set-num-interviews':
      return { ...state, numInterviews: action.numInterviews };
    case 'set-redirected':
      return { ...state, redirected: action.redirected };
    default:
      return {...state};
  }
};

const InterviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobTitle, setJobTitle] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getApiClient().getAllCandidates().then(candidates => {
        getApiClient().getAllVacancies().then(job_positions => {
            dispatch({
              type: 'load-page',
              candidates: candidates.data,
              vacancies: job_positions.data
            })
          }).catch(error => console.log(error))
      }).catch(error => console.log(error))
  }, []);

  useEffect(() => {
    if (location.state) {
      if (location.state.candidate) {
        dispatch({ type: 'set-candidate-id', candidateId: location.state.candidate.id });
        dispatch({ type: 'set-vacancy', vacancy: location.state.candidate.jobPositionId })
        dispatch({ type: 'set-redirected', redirected: true });
        getApiClient().findVacancy(location.state.candidate.jobPositionId)
          .then(response => {
            setJobTitle(response.data.jobTitle + ' (' + response.data.country + ')');
          }).catch(error => console.log(error));
      }
    }
  }, [location]);


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    dispatch({type: 'set-valid'});
  };

  const onSubmit = useCallback(() => {
    if (!state.candidateId) return;
    if (!state.vacancy) return;
    if (!state.date_time) return;
    getApiClient().addInterview(state.candidateId, state.vacancy, state.date_time, state.description)
      .then(response => {
        alert('Your interview has been successfully scheduled!');
        getApiClient().getNumInterviewsPerCandidate(response.data.id)
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              dispatch({ type: 'set-num-interviews', numInterviews: response.data[0]});
            }
          }).catch(error => console.log(error));
        getApiClient().addAction(`Interview #${state.numInterviews+1} scheduled`, state.candidateId)
          .then(response => console.log(response))
          .catch(error => console.log(error));
        getApiClient().updateStatus(getApiClient().getCandidate(parseInt(state.candidateId)),
                             `Interview #${state.numInterviews+1} scheduled`)
          .then(response => {
            alert('Candidate status has been successfully updated to "' + response.data.status + '"');
            navigate('/candidate/all');
          }).catch(error => console.log(error));
      }).catch(error => console.log(error));
  }, [state.candidateId, state.vacancy, state.date_time, state.description, navigate]);

  return (
    <div>
      <NavBar/>
      <h1 className='profile-name'>Interview Form</h1>
      {state.pageLoaded ?
          <CForm className='form row g-3 needs-validation'
                 noValidate
                 style={formStyle}
                 validated={state.valid}
                 onSubmit={handleSubmit}>
            <CCol className='position-relative'
                  md={6}
                  style={{marginBottom: '1rem'}}>
              <CFormLabel>Candidate</CFormLabel>
              {state.redirected ?
                <CFormInput defaultValue={location.state.candidate.firstName + ' ' + location.state.candidate.lastName}
                            plainText
                            readOnly
                            type='text'/> :
                <CFormSelect defaultValue=''
                             required
                             onChange={(event) => dispatch(
                               {type: 'set-candidate-id', candidateId: event.target.value}
                             )}>
                  <option disabled value=''>Choose...</option>
                  {state.candidates.map(candidate => <option key={candidate.id} value={candidate.id}>
                    {candidate.firstName + ' ' + candidate.lastName}</option>)}
                </CFormSelect>}
              <CFormFeedback invalid>Invalid candidate selected.</CFormFeedback>
            </CCol>

            <CCol className='position-relative'
                  md={6}
                  style={{marginBottom: '1rem'}}>
              <CFormLabel>Job Position</CFormLabel>
              {state.redirected ?
                <CFormInput defaultValue={jobTitle}
                            plainText
                            readOnly
                            type='text'/> :
                <CFormSelect defaultValue=''
                             required
                             onChange={(event) => dispatch(
                               {type: 'set-vacancy', vacancy: event.target.value}
                             )}>
                  <option disabled value=''>Choose...</option>
                  {state.vacancies.map(vacancy => <option key={vacancy.id} value={vacancy.id}>
                    {vacancy.jobTitle + ' (' + vacancy.country + ')'}
                  </option>)}
                </CFormSelect>}
              <CFormFeedback invalid>Invalid job position selected.</CFormFeedback>
            </CCol>

            <CCol className='position-relative'
                  md={6}
                  style={{marginBottom: '1rem'}}>
              <CFormLabel>Hiring Manager</CFormLabel>
              <CFormSelect defaultValue=''
                           required
                           onChange={(event) => dispatch(
                             {type: 'set-manager', manager: event.target.value}
                           )}>
                <option disabled value=''>Choose...</option>
              </CFormSelect>
              <CFormFeedback invalid>Invalid hiring manager selected.</CFormFeedback>
            </CCol>

            <CCol className='position-relative'
                  md={6}
                  style={{marginBottom: '1rem'}}>
              <CFormLabel>Date and time</CFormLabel>
              <CFormInput required
                          type='datetime-local'
                          onChange={(event) => dispatch(
                            {type: 'set-date-time', date_time: event.target.value}
                          )}/>
              <CFormFeedback invalid>Invalid date or time selected.</CFormFeedback>
            </CCol>

            <CCol className='position-relative'
                  md={12}
                  style={{marginBottom: '0.7rem'}}>
              <CFormLabel>Description</CFormLabel>
              <CFormTextarea rows='5'
                             type='text'
                             onChange={(event) => dispatch(
                               {type: 'set-description', description: event.target.value}
                            )}/>
            </CCol>

            <CCol>
              <center>
                <CButton color='dark'
                         type='submit'
                         onClick={onSubmit}>Submit</CButton>
              </center>
            </CCol>
          </CForm> : <Spinner/>}
    </div>
  );
};

export default InterviewForm;
