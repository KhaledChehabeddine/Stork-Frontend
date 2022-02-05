import React, { useCallback, useState } from 'react';
import getApiClient from '../../api_client/getApiClient';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';

const EmployeeForm = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  
  const addEmployeeHandler = useCallback(() => {
    getApiClient().addEmployee('/add', id, name, email, jobTitle, phone, 'https://bootdey.com/img/Content/avatar/avatar3.png')
      .then(response => {
        alert('Employee ' + response.data.name + ' with id ' + response.data.id + ' has been added successfully!');
      }).catch(error => {
        console.log(error);
      })
  }, [id, name, email, jobTitle, phone]);

  return (
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
    </div>
  )
}

export default EmployeeForm;

