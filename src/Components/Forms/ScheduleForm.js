import React, { useState } from 'react';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';

const ScheduleForm = (props) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [vacancyJob, setVacancyJob] = useState('');
  const [interviewers, setInterviewers] = useState([]);
  const [applicant, setApplicant] = useState('');

  return (
    <div align='center'>
    <Form onSubmit={event => { event.preventDefault(); }}>
      <h1 style={{ padding: '1rem' }}>Scheduling an Interview</h1>
      <Input onChange={event => { setDate(event.target.value); }} placeholder='Date' />
      <Input onChange={event => { setTime(event.target.value); }} placeholder='Time' />
      <Input onChange={event => { setLocation(event.target.value); }} placeholder='Location' />
      <Input onChange={event => { setVacancyJob(event.target.value); }} placeholder='Vacancy Job' />
      <Input onChange={event => { setInterviewers(event.target.value); }} placeholder='Interviewers' />
      <Input onChange={event => { setApplicant(event.target.value); }} placeholder='Applicant' />
      <Button onClick={() => console.log('done')}>Add Employee</Button>
    </Form>
  </div>
  )
}

export default ScheduleForm;
