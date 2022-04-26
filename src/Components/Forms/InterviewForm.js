import React, {useReducer, useEffect, useCallback, useState} from 'react';
import {
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
import {add30Mins, getHashCode} from "../Utils/utils";
import {useLocation, useNavigate} from "react-router-dom";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import '../../Styles/FormStyle.css';
import {useData} from "../../Context/Use";
import Calendar from '../Calendar/Calendar';

const reducer = (state, action) => {
  switch(action.type) {
    case 'set-candidate':
      return {...state, candidate: action.candidate};
    case 'set-candidate-id':
      return {...state, candidateId: action.candidateId};
    case 'set-vacancy-id':
      return {...state, vacancyId: action.vacancyId};
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
    case 'set-interviews':
      return {...state, interviews: action.interviews};
    case 'set-error':
      return {...state, errorMessage: action.message};
    default:
      return {...state};
  }
};

function overlaps(interview, datetime) {
  const s1 = new Date(interview.dateTime).getTime();
  const e1 = s1 + 1800 * 1000;
  const s2 = new Date(datetime).getTime();
  const e2 = s2 + 1800 * 1000;
  if (s1 === s2) return true;
  if ((s1 === e2) || (s2 === e1)) return false;
  if (e1 === e2) return true;
  if (s1 > s2 && s1 < e2) return true;
  return e1 > s2 && e1 < e2;

}

function timeConflict(interviews, datetime) {
  for (let i = 0; i < interviews.length; ++i) {
    if (overlaps(interviews[i], datetime)) return true;
  }
  return false;
}

const InterviewForm = () => {
  const { values: { jobPositions, candidates, managers } } = useData(); // context, to avoid repetition, and to manage the state
  const location = useLocation();
  const navigate = useNavigate();
  const [manager, setManager] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    candidate: null,
    candidateId: null,
    date_time: null,
    description: "",
    jobPositionId: null,
    jobTitle: '',
    managerId: null,
    pageLoaded: true,
    redirected: false,
    valid: false,
    visible: false,
    interviews: [],
    errorMessage: ""
  });



  const interviewEvents= state.interviews.map(interview => ({
    id: interview.id, 
    start: new Date(interview.dateTime), 
    end: new Date(new Date(interview.dateTime).getTime() + 1800 * 1000),
    title: interview.description
  }))
  const { managerId }= state; // destructure.
  useEffect(() => {
    if (managerId == null) return;
    getApiClient().getInterviewsByManagerId(managerId)
      .then(response => {
        dispatch({type: 'set-interviews', interviews: response.data});
        // response.data is the data given from the backend.
      }).catch(error => console.log(error));
    getApiClient().getManager(managerId)
      .then(response => {
        console.log(response.data);
        setManager(response.data);
      }).catch(error => console.log(error));
    getApiClient().getCandidate(state.candidateId)
      .then(response => {
        console.log(response.data);
        dispatch({ type: 'set-candidate', candidate: response.data });
      }).catch(error => console.log(error));
  }, [state.candidateId, managerId]); // anything inside the dependency list if it changes the effect runs again.

  useEffect(() => {
    if (location.state)
      if (location.state.candidate) {
        dispatch({type: 'set-candidate', candidate: location.state.candidate});
        dispatch({type: 'set-candidate-id', candidateId: location.state.candidate.id});
        dispatch({type: 'set-job-position-id', jobPositionId: location.state.candidate.jobPosition.id});
        dispatch({type: 'set-redirected'});
        dispatch({
          type: 'set-job-title',
          jobTitle: location.state.candidate.jobPosition.jobTitle +
            ' (' + location.state.candidate.jobPosition.country + ')'
        });
      }

  }, [location]);

  const handleClick = useCallback((event) => {
    console.log(state.date_time);
    console.log(add30Mins(state.date_time));
    event.preventDefault();
    dispatch({ type: 'set-valid' });
    if (!state.candidateId) {
      dispatch({type: 'set-error', message: "Select a candidate!"});
      return;
    }
    if (!state.date_time) {
      dispatch({type: 'set-error', message: "Select an interview time!"});
      return;
    }
    if (!state.jobPositionId) {
      dispatch({type: 'set-error', message: "Select a job position!"});
      return;
    }
    if (!state.managerId) {
      dispatch({type: 'set-error', message: "Select a hiring manager!"});
      return;
    }
    if (timeConflict(state.interviews, state.date_time)) {
      dispatch({type: 'set-error', message: "There is a time conflict, check the calendar!"});
      return;
    }
    getApiClient().getCandidate(state.candidateId)
      .then(candidate => {
        console.log(candidate.data);
        getApiClient().getManager(state.managerId)
          .then(manager => {
            getApiClient().addInterview(candidate.data, state.date_time, state.description, state.candidate.jobPosition,
              manager.data)
              .then(() => {
                getApiClient().getNumInterviewsPerCandidate(state.candidateId).then(response => {
                  getApiClient().addAction(`Interview #${response.data} scheduled`, candidate.data)
                    .then(response => {
                      console.log(response);
                    }).catch(error => console.log(error));
                  getApiClient().updateStatus(candidate.data, `Interview #${response.data} scheduled`)
                    .then(r => console.log(r))
                    .catch(error => console.log(error));
                }).catch(error => console.log(error));
              }).catch(error => console.log(error));
            dispatch({type: 'set-visible', visible: true});
          })
      }).catch(error => console.log(error));
  }, [state]);

  const onViewCandidate = useCallback(() => {
    const interval = setInterval(() => {
      navigate(`/candidate/${getHashCode(state.candidateId)}`);
      window.location.reload();
    }, [1500]);
    return () => clearInterval(interval);
  }, [navigate, state.candidateId]);

  return (
    <div>
      <NavBar/>
        {state.pageLoaded ?
          <div>
            <CForm className='form row g-3 needs-validation'
                   noValidate
                   style={formStyle}
                   validated={state.valid}>
              <CHeader>
                <h1 className='form-title'>Interview Form</h1>
              </CHeader>
              <CCol className='position-relative' md={6} style={{marginBottom: '1rem'}}>
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
                    {candidates.map(candidate => <option key={candidate.id} value={candidate.id}>
                      {candidate.firstName + ' ' + candidate.lastName}</option>)}
                  </CFormSelect>}
                <CFormFeedback invalid>Invalid candidate selected.</CFormFeedback>
              </CCol>

              <CCol className='position-relative' md={6} style={{marginBottom: '1rem'}}>
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
                    {jobPositions.map(jobPosition => <option key={jobPosition.id} value={jobPosition.id}>
                      {jobPosition.jobTitle + ' (' + jobPosition.country + ')'}
                    </option>)}
                  </CFormSelect>}
                <CFormFeedback invalid>Invalid job position selected.</CFormFeedback>
              </CCol>

              <CCol className='position-relative' md={6} style={{marginBottom: '1rem'}}>
                <CFormLabel>Hiring Manager</CFormLabel>
                <CFormSelect defaultValue=''
                             required
                             onChange={(event) => dispatch(
                               {type: 'set-manager-id', managerId: event.target.value}
                             )}>
                  <option disabled value=''>Choose...</option>
                  {managers.map(manager => <option key={manager.id} value={manager.id}>
                    {manager.firstName + ' ' + manager.lastName}</option>)}
                </CFormSelect>
                <CFormFeedback invalid>Invalid hiring manager selected.</CFormFeedback>
              </CCol>

              <CCol className='position-relative' md={6} style={{marginBottom: '1rem'}}>
                <CFormLabel>Date and time</CFormLabel>
                <CFormInput required
                            type='datetime-local'
                            onChange={(event) => dispatch(
                              {type: 'set-date-time', date_time: event.target.value}
                            )}/>
                <CFormFeedback invalid>Invalid date or time selected.</CFormFeedback>
              </CCol>

              <CCol className='position-relative' md={12} style={{marginBottom: '0.7rem'}}>
                <CFormLabel>Hiring Manager's Calendar</CFormLabel>
                  <Calendar events={interviewEvents} />
              </CCol>


              <CCol className='position-relative' md={12} style={{marginBottom: '0.7rem'}}>
                <CFormLabel>Description</CFormLabel>
                <CFormTextarea rows='5'
                               type='text'
                               onChange={(event) => dispatch(
                                 {type: 'set-description', description: event.target.value})}/>
              </CCol>

              <CCol>
                <center>
                  <button className="form-button" type='submit' onClick={handleClick}>Submit</button>
                  {state.errorMessage && <p style={{color: 'red'}}>{state.errorMessage}</p>}
                </center>
              </CCol>
            </CForm>

            <CModal alignment='center'
                    backdrop='static'
                    visible={state.visible}
                    onClose={() => dispatch({type: 'set-visible', visible: false})}>
              <CModalBody>{'Interview with ' + (state.candidate && state.candidate.firstName) + ' ' +
              (state.candidate && state.candidate.lastName) + ' has been successfully scheduled.'}
              </CModalBody>
              <CModalFooter>
                <button className="form-button"
                         onClick={() => {
                           dispatch({type: 'set-visible', visible: false});
                           navigate('/home');
                         }}>Close</button>
                <button className="form-button" style={{width: "40%"}}
                         onClick={() => {
                           dispatch({type: 'set-visible', visible: false});
                           onViewCandidate();
                         }}>View Candidate</button>
              </CModalFooter>
            </CModal>
          </div> : <Spinner/>}
    </div>
  );
};

export default InterviewForm;
