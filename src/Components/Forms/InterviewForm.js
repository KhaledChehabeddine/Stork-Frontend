import '../../Styles/FormStyle.css';
import {Breadcrumb} from "react-bootstrap"
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea} from "@coreui/react";
import {formStyle} from "../Utils/Styles";
import {useLocation, useNavigate} from "react-router-dom";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import React, {useReducer, useEffect, useCallback, useState} from 'react';
import Spinner from '../Utils/Spinner';

const reducer = (state, action) => {
  switch(action.type) {
    case 'page-loaded':
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
  const [state, dispatch] = useReducer(reducer, {
    candidateId: null,
    candidates: [],
    date_time: null,
    description: "",
    pageLoaded: false,
    vacancy: null,
    vacancies: [],
    valid: false,
    numInterviews: 0,
    redirected: false
  });

  useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response1 => {
        getApiClient().getAllVacancies()
          .then(response2 => {
            dispatch({
              type: 'page-loaded',
              candidates: response1.data,
              vacancies: response2.data
            })
          }
        ).catch(error => console.log(error))
      }
    ).catch(error => console.log(error))
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
    let candidate = null;
    for (let c in state.candidates) {
      if (state.candidates[c].id === parseInt(state.candidateId)) {
        candidate = state.candidates[c];
        break;
      }
    }
    if (!candidate) return;
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
        getApiClient().updateStatus(candidate, `Interview #${state.numInterviews+1} scheduled`)
          .then(response => {
            alert('Candidate status has been successfully updated to "' + response.data.status + '"');
            navigate('/candidate/all');
          }).catch(error => console.log(error));
      }).catch(error => console.log(error));
  }, [state.candidateId, state.vacancy, state.date_time, state.description, navigate]);

  return (
    <div>
      <NavBar/>
      {state.pageLoaded ?
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Breadcrumb className='form-breadcrumb' style={{marginTop:"50px"}}>
            <Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
            <Breadcrumb.Item href='/interview/all'>Interviews</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Interview</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className='form-header'>Interview Form</h1>
          <CForm
            className='row g-3 needs-validation'
            noValidate
            validated={state.valid}
            onSubmit={e => e.preventDefault()}
            style={formStyle}
            encType="multipart/form-data"
          >
            <CCol style={{marginBottom: '0.7rem'}} md={12} className='position-relative'>
              <CFormLabel htmlFor='validationServer01'>Candidate</CFormLabel>
              {state.redirected
              ?
                <h5>{location.state.candidate.firstName + ' ' + location.state.candidate.lastName}</h5>
              :
                <CFormSelect
                  id='validationServer01'
                  defaultValue='Choose...'
                  required
                  onChange={(event) => dispatch(
                    {type: 'set-candidate-id', candidateId: event.target.value}
                  )}
                >
                  <option disabled value='Choose...'>Choose...</option>
                  {state.candidates.map(candidate => <option key={candidate.id} value={candidate.id}>
                    {candidate.firstName + ' ' + candidate.lastName}
                  </option>)}
                </CFormSelect>}
              <CFormFeedback tooltip invalid>Invalid candidate</CFormFeedback>
            </CCol>
            <CCol style={{marginBottom: '0.7rem'}} md={12} className='position-relative'>
              <CFormLabel htmlFor='validationServer02'>Vacancy</CFormLabel>
              {state.redirected
                ?
                <h5>{jobTitle}</h5>
                :
                <CFormSelect
                  id='validationServer02'
                  defaultValue='Choose...'
                  required
                  onChange={(event) => dispatch(
                    {type: 'set-vacancy', vacancy: event.target.value}
                  )}
                >
                  <option disabled value='Choose...'>Choose...</option>
                  {state.vacancies.map(vacancy => <option key={vacancy.id} value={vacancy.id}>
                    {vacancy.jobTitle + ' (' + vacancy.country + ')'}
                  </option>)}
                </CFormSelect>}
              <CFormFeedback tooltip invalid>Invalid vacancy</CFormFeedback>
            </CCol>
            <CCol style={{marginBottom: '0.7rem'}} md={12} className='position-relative'>
              <CFormLabel htmlFor='validationServer03'>Time</CFormLabel>
              <CFormInput type='datetime-local' id='validationServer03' required
                          onChange={(event) => dispatch(
                            {type: 'set-date-time', date_time: event.target.value}
                          )}/>
              <CFormFeedback tooltip invalid>Invalid time</CFormFeedback>
            </CCol>
            <CCol style={{marginBottom: '0.7rem'}} md={12} className='position-relative'>
              <CFormLabel htmlFor='validationServer04'>Description</CFormLabel>
              <CFormTextarea type='text' id='validationServer04' required rows='5'
                            onChange={(event) => dispatch(
                              {type: 'set-description', description: event.target.value}
                            )}
              />
              <CFormFeedback tooltip invalid>Invalid description</CFormFeedback>
            </CCol>
            <CCol xs={12}>
              <center><CButton color='dark' type='submit' onClick={onSubmit}>Submit</CButton></center>
            </CCol>
          </CForm>
        </div>
        : <Spinner />}
    </div>
  );
};

export default InterviewForm;
