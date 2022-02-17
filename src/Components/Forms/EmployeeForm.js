import React, { useCallback, useState, useReducer } from 'react';
import getApiClient from '../../api_client/getApiClient';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import { useNavigate } from "react-router-dom";
import Spinner from '../Utils/Spinner';
import NavBar from "../Utils/Navbar";

const reducer = (state, action) => {
  switch(action.type) {
    case 'adding-employee':
      return { ...state, addingEmployee: true };
    case 'employee-added':
      return { ...state, employeeAdded: true, addingEmployee: false };
    default:
      return { ...state };
  }
}

const EmployeeForm = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    addingEmployee: false,
    employeeAdded: false
  });
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  
  const addEmployeeHandler = useCallback(() => {
    dispatch({ type: 'adding-employee' });
    getApiClient().addEmployee('/add', id, firstName, lastName, email, jobTitle, phone, 'https://bootdey.com/img/Content/avatar/avatar3.png')
      .then(response => {
        dispatch({ type: 'employee-added' });
        navigate(`/employee/all`);
      }).catch(error => {
        console.log(error);
      })
  }, [id, firstName, lastName, email, jobTitle, phone, navigate]);

  return (
    <>
      <NavBar/>
      {state.addingEmployee ? <Spinner />
        :
          <div className = "employee-form" align='center'>
            <Form onSubmit={event => { event.preventDefault(); }}>
              <h1 style={{ padding: '1rem' }}>Employee Adder</h1>
              <Input className="employee-form-ID" onChange={event => { setId(event.target.value); }} placeholder='ID' />
              <Input className="employee-form-firstName" onChange={event => { setFirstName(event.target.value); }} placeholder='First Name' />
              <Input className="employee-form-lastName" onChange={event => { setLastName(event.target.value); }} placeholder='Last Name' />
              <Input className="employee-form-email" onChange={event => { setEmail(event.target.value); }} placeholder='Email' />
              <Input className="employee-form-jobTitle" onChange={event => { setJobTitle(event.target.value); }} placeholder='Job Title' />
              <Input className="employee-form-phone" onChange={event => { setPhone(event.target.value); }} placeholder='Phone Number' />
              <Button className="employee-form-saveChanges" onClick={addEmployeeHandler}>Add Employee</Button>
            </Form>
          </div>}
    </>
  )
}

export default EmployeeForm;

