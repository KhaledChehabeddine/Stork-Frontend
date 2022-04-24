import React, {useReducer, useEffect, useCallback} from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea, CHeader, CModal,
  CModalBody, CModalFooter
} from "@coreui/react";
import {formStyle} from "../Utils/Styles";
import {getHashCode} from "../Utils/utils";
import {useLocation, useNavigate} from "react-router-dom";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import '../../Styles/FormStyle.css';

const initialState = {
  candidate: {firstName: '', lastName: ''},
  candidateId: null,
  candidates: [],
  date_time: null,
  description: "",
  jobPositionId: null,
  jobPositions: [],
  jobTitle: '',
  managerId: null,
  managers: [],
  pageLoaded: false,
  redirected: false,
  valid: false,
  visible: false
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'load-page':
      return {...state, candidates: action.candidates, jobPositions: action.jobPositions,
              managers: action.managers, pageLoaded: true};
    case 'set-candidate':
      return {...state, candidate: action.candidate};
    case 'set-candidate-id':
      return {...state, candidateId: action.candidateId};
    case 'set-date-time':
      return {...state, date_time: action.date_time};
    case 'set-description':
      return {...state, description: action.description};
    case 'set-job-position-id':
      return {...state, jobPositionId: action.jobPositionId};
    case 'set-job-title':
      return {...state, jobTitle: action.jobTitle};
    case 'set-manager-id':
      return {...state, managerId: action.managerId};
    case 'set-redirected':
      return {...state, redirected: true};
    case 'set-valid':
      return {...state, valid: true};
    case 'set-visible':
      return {...state, visible: action.visible};
    default:
      return {...state};
  }
};

const InterviewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getApiClient().getAllCandidates().then(candidates =>
      getApiClient().getAllVacancies().then(job_positions =>
        getApiClient().getAllManagers().then(managers =>
          dispatch({
            type: 'load-page',
            candidates: candidates.data,
            jobPositions: job_positions.data,
            managers: managers.data
          })
        ).catch(error => console.log(error))
      ).catch(error => console.log(error))
    ).catch(error => console.log(error));
    if (location.state)
      if (location.state.candidate) {
        dispatch({type: 'set-candidate', candidate: location.state.candidate});
        dispatch({type: 'set-candidate-id', candidateId: location.state.candidate.id});
        dispatch({type: 'set-job-position-id', jobPositionId: location.state.candidate.jobPositionId});
        dispatch({type: 'set-redirected'});
        getApiClient().findVacancy(location.state.candidate.jobPositionId).then(job_position =>
          dispatch({
            type: 'set-job-title',
            jobTitle: job_position.data.jobTitle + ' (' + job_position.data.country + ')'
          })
        ).catch(error => console.log(error));
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

  const handleClick = useCallback((event) => {
    event.preventDefault();
    if (!state.candidateId) return;
    if (!state.date_time) return;
    if (!state.jobPositionId) return;
    if (!state.managerId) return;
    getApiClient().getCandidate(state.candidateId).then(response =>
      dispatch({type: 'set-candidate', candidate: response.data})).catch(error => console.log(error));
    getApiClient().addInterview(state.candidateId, state.date_time, state.description,
                                state.jobPositionId, state.managerId).then(() => {
      getApiClient().getNumInterviewsPerCandidate(state.candidateId).then(response => {
        console.log(response.data);
        getApiClient().addAction(`Interview #${response.data} scheduled`, state.candidateId)
          .catch(error => console.log(error));
        getApiClient().updateStatus(state.candidate,
          `Interview #${response.data} scheduled`).catch(error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
    dispatch({type: 'set-visible', visible: true});
  }, [state]);

  return (
    <div>
      <NavBar/>
      <div className="page-background">
        <h1 className='form-title'>Interview Form</h1>
        {state.pageLoaded ?
          <div>
            <CForm className='form row g-3 needs-validation'
                   noValidate
                   style={formStyle}
                   validated={state.valid}>

              <CHeader>
                <h1 className='form-title'>Interview Form</h1>
              </CHeader>

              <CCol className='position-relative'
                    md={6}
                    style={{marginBottom: '1rem'}}>
                <CFormLabel>Candidate</CFormLabel>
                {state.redirected ?
                  <CFormInput defaultValue={state.candidate.firstName + ' ' + state.candidate.lastName}
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
                  <CFormInput defaultValue={state.jobTitle}
                              plainText
                              readOnly
                              type='text'/> :
                  <CFormSelect defaultValue=''
                               required
                               onChange={(event) => dispatch(
                                 {type: 'set-job-position-id', jobPositionId: event.target.value}
                               )}>
                    <option disabled value=''>Choose...</option>
                    {state.jobPositions.map(jobPosition => <option key={jobPosition.id} value={jobPosition.id}>
                      {jobPosition.jobTitle + ' (' + jobPosition.country + ')'}
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
                               {type: 'set-manager-id', managerId: event.target.value}
                             )}>
                  <option disabled value=''>Choose...</option>
                  {state.managers.map(manager => <option key={manager.id} value={manager.id}>
                    {manager.firstName + ' ' + manager.lastName}</option>)}
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
                  <button className="form-button"
                          type='submit'
                          onClick={handleClick}>Submit</button>
                </center>
              </CCol>
            </CForm>

            <CModal alignment='center'
                    backdrop='static'
                    visible={state.visible}
                    onClose={() => dispatch({type: 'set-visible', visible: false})}>
              <CModalBody>{'Interview with ' + state.candidate.firstName + ' ' +
              state.candidate.lastName + ' has been successfully scheduled.'}
              </CModalBody>
              <CModalFooter>
                <CButton color='secondary'
                         onClick={() => dispatch({type: 'set-visible', visible: false})}>Close</CButton>
                <CButton color='info'
                         onClick={() => {
                           dispatch({type: 'set-visible', visible: false})
                           navigate(`/candidate/${getHashCode(state.candidateId)}`);
                         }}>View Candidate</CButton>
              </CModalFooter>
            </CModal>
          </div> : <Spinner/>}
      </div>
    </div>
  );
};

export default InterviewForm;
