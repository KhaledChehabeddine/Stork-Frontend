import React, {useCallback, useState, useReducer} from 'react';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import getApiClient from "../../api_client/getApiClient";
import Spinner from "../Utils/Spinner";

const reducer = (state, action) => {
  switch(action.type) {
    case 'scheduling-interview':
      return { ...state, schedulingInterview: true };
    default:
      return { ...state };
  }
}

const ScheduleForm = (props) => {
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
      {state.schedulingInterview ? <Spinner />
        :
        <div align='center'>
          <Form onSubmit={event => { event.preventDefault(); }}>
            <h1 style={{ padding: '1rem' }}>Scheduling an Interview</h1>
            <Input type='date' onChange={event => { setDate(event.target.value); }} placeholder='Date' />
            <Input type='time' onChange={event => { setTime(event.target.value); }} placeholder='Time' />
            <Input onChange={event => { setLocation(event.target.value); }} placeholder='Location' />
            <Input onChange={event => { setVacancyId(event.target.value); }} placeholder='Vacancy ID' />
            <Input onChange={event => { setInterviewers(event.target.value); }} placeholder='Interviewers' />
            <Input onChange={event => { setCandidateId(event.target.value); }} placeholder='Candidate ID' />
            <Button disabled onClick={onSubmitHandler}>Schedule</Button>
          </Form>
        </div>}
    </>
  );
};

export default ScheduleForm;
