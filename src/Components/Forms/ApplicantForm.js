import React, {useCallback, useState} from 'react';
import getApiClient from '../../api_client/getApiClient';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import NavBar from "../Utils/Navbar";

const ApplicantForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);

  const onFileChange = useCallback(event => {
    setResume(event.target.files[0]);
  }, []);

  const addApplicantHandler = useCallback(() => {
    console.log(resume);
    getApiClient().addApplicant('/add', name, email, phone, resume, 'https://bootdey.com/img/Content/avatar/avatar3.png')
      .then(response => {
        alert('Applicant ' + response.data.name + ' with email ' + response.data.email + ' has been added succesfully!');
      }).catch(error => {
        console.log(error);
    });
    console.log('applicant added');
  }, [name, email, phone, resume]);

  return (
    <div align='center'>
      <NavBar/>
      <Form onSubmit={event => { event.preventDefault() }}>
        <h1 style={{padding: '1rem'}}>Applicant Form</h1>
        <Input onChange={event => { setName(event.target.value) }} placeholder='Name'/>
        <Input onChange={event => { setEmail(event.target.value) }} placeholder='Email'/>
        <Input onChange={event => { setPhone(event.target.value) }} placeholder='Phone'/>
        <h3 align='left' style={{ textIndent: 35 }}>Add Resume:</h3>
        <input type='file' onChange={onFileChange} align='left' />
        <Button onClick={addApplicantHandler}>Add Applicant</Button>
      </Form>
    </div>
  );
}

export default ApplicantForm;

