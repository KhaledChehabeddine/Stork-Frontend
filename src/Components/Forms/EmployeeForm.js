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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  
  const addEmployeeHandler = useCallback(() => {
    dispatch({ type: 'adding-employee' });
    getApiClient().addEmployee('/add', id, name, email, jobTitle, phone, 'https://bootdey.com/img/Content/avatar/avatar3.png')
      .then(response => {
        dispatch({ type: 'employee-added' });
        navigate(`/employee/${id}`);
      }).catch(error => {
        console.log(error);
      })
  }, [id, name, email, jobTitle, phone]);

  return (
    <>
      <NavBar/>
      {state.addingEmployee ? <Spinner />
        :
          <div align='center'>
            <Form onSubmit={event => { event.preventDefault(); }}>
              <h1 style={{ padding: '1rem' }}>Employee Adder</h1>
              <Input onChange={event => { setId(event.target.value); }} placeholder='Id' />
              <Input onChange={event => { setName(event.target.value); }} placeholder='Name' />
              <Input onChange={event => { setEmail(event.target.value); }} placeholder='Email' />
              <Input onChange={event => { setJobTitle(event.target.value); }} placeholder='Job Title' />
              <Input onChange={event => { setPhone(event.target.value); }} placeholder='Phone' />
              <Button onClick={addEmployeeHandler}>Add Employee</Button>
            </Form>
          </div>}
    </>
  )
}

export default EmployeeForm;

