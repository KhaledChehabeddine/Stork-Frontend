import React, { useCallback, useState, useReducer } from 'react';
import getApiClient from '../../api_client/getApiClient';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import { useNavigate } from "react-router-dom";
import Spinner from '../Utils/Spinner';
import NavBar from "../Utils/Navbar";
import "../../Styles/FormStyle.css"
import {Breadcrumb} from "react-bootstrap";

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
  const [address, setAddress] = useState('');
  
  const addEmployeeHandler = useCallback(() => {
    dispatch({ type: 'adding-employee' });
    getApiClient().addEmployee('/add', id, firstName, lastName, email, jobTitle, phone, address, 'https://bootdey.com/img/Content/avatar/avatar3.png')
      .then(response => {
        dispatch({ type: 'employee-added' });
        navigate(`/employee/all`);
      }).catch(error => {
        console.log(error);
      })
  }, [id, firstName, lastName, email, jobTitle, phone, address,  navigate]);

  return (
    <>
      <NavBar/>
      <Breadcrumb className="form-breadcrumb">
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/employees">Employees</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Employee</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="form-header" style={{ padding: '1rem' }}>Employee Form</h1>
      {state.addingEmployee ? <Spinner />
        :
        <div className="form-container">
          <Form className = "form flex-form" onSubmit={event => { event.preventDefault(); }}>
            <Input className="form-input left" onChange={event => { setFirstName(event.target.value); }} placeholder='First Name' />
            <Input className="form-input right" onChange={event => { setJobTitle(event.target.value); }} placeholder='Job Title' />
            <Input className="form-input left" onChange={event => { setLastName(event.target.value); }} placeholder='Last Name' />
            <Input className="form-input right" onChange={event => { setId(event.target.value); }} placeholder='ID' />
            <Input className="form-input left" onChange={event => { setPhone(event.target.value); }} placeholder='Phone Number' />
            <Input className="form-input left" onChange={event => { setAddress(event.target.value); }} placeholder='Address' />
            <Input className="form-input right" onChange={event => { setEmail(event.target.value); }} placeholder='Email' />
            <div style={{width:"100%", marginRight:'29px'}}>
            <Button className="form-button right" onClick={addEmployeeHandler}>Add Employee</Button>
            <Button className="form-button right" onClick={() => { navigate('/home') }}>Cancel</Button>
            </div>
          </Form>
        </div>}
    </>
  )
}

export default EmployeeForm;

