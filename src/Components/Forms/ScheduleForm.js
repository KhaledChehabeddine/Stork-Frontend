import React, {useCallback, useState, useReducer} from 'react';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import getApiClient from "../../api_client/getApiClient";
import Spinner from "../Utils/Spinner";
import NavBar from "../Utils/Navbar";
import {Breadcrumb} from "react-bootstrap"
import '../../Styles/FormStyle.css';
import {useNavigate} from "react-router-dom";

const reducer = (state, action) => {
  switch(action.type) {
    case 'scheduling-interview':
      return { ...state, schedulingInterview: true };
    default:
      return { ...state };
  }
}

const ScheduleForm = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    schedulingInterview: false
  });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [vacancyId, setVacancyId] = useState('');
  const [interviewers, setInterviewers] = useState([]);
  const [candidateId, setCandidateId] = useState('');

  const onSubmitHandler = useCallback(() => {
    dispatch({ type: 'scheduling-interview' });
    getApiClient().scheduleInterview(date, time, location, vacancyId, interviewers, candidateId)
      .then(response => {
        // to-do
        // navigate into interview page (a page that shows interview details)
      }).catch(error => console.log(error));
  }, [date, time, location, vacancyId, interviewers, candidateId]);

  return (
    <>
      <NavBar />
      <Breadcrumb className="form-breadcrumb">
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/candidates">Candidates</Breadcrumb.Item>
        <Breadcrumb.Item active>Schedule Interview</Breadcrumb.Item>
      </Breadcrumb>
      {state.schedulingInterview ? <Spinner />
        :
        <>
          <h1 className="form-header" style={{ padding: '1rem' }}>Schedule an Interview</h1>
          <div className="form-container">
            <Form className = "form flex-form" onSubmit={event => { event.preventDefault(); }}>
              <Input className="form-input left" type='date' onChange={event => { setDate(event.target.value); }} placeholder='Date' />
              <Input className="form-input right" type='time' onChange={event => { setTime(event.target.value); }} placeholder='Time' />
              <Input className="form-input left" onChange={event => { setVacancyId(event.target.value); }} placeholder='Vacancy Id' />
              <Input className="form-input right" onChange={event => { setCandidateId(event.target.value); }} placeholder='Candidate Id' />
              <Input className="form-input left" onChange={event => { setInterviewers(event.target.value); }} placeholder='Interviewers' />
              <Input className="form-input right" onChange={event => { setLocation(event.target.value); }} placeholder='Location' />
              <div style={{width:"100%", marginRight:'29px'}}>
                <Button className="form-button right" onClick={onSubmitHandler}>Schedule</Button>
                <Button className="form-button right" onClick={() => { navigate('/home') }}>Cancel</Button>
              </div>
            </Form>
          </div>
        </>}
    </>
  );
};

export default ScheduleForm;
