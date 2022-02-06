import React, {useCallback, useState} from 'react';
import getApiClient from '../../api_client/getApiClient';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';

const ApplicantForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');

  const addApplicantHandler = useCallback(() => {
//    getApiClient().addApplicant('/add', name, email, phone, sex, 'https://bootdey.com/img/Content/avatar/avatar3.png')
//      .then(response => {
//        alert('Employee ' + response.data.name + ' with email ' + response.data.email + ' has been added succesfully!');
//      }).catch(error => {
//        console.log(error);
//    });
    console.log('applicant added');
  }, [name, email, phone, sex]);

  return (
    <div align='center'>
      <Form onSubmit={event => { event.preventDefault() }}>
          <h1 style={{padding: '1rem'}}>Applicant Form</h1>
          <Input onChange={event => { setName(event.target.value) }} placeholder='Name'/>
          <Input onChange={event => { setEmail(event.target.value) }} placeholder='Email'/>
          <Input onChange={event => { setPhone(event.target.value) }} placeholder='Phone'/>
          <Input onChange={event => { setSex(event.target.value) }} placeholder='Sex'/>
          <Button onClick={addApplicantHandler}>Add Applicant</Button>
      </Form>
    </div>
  );
}

export default ApplicantForm;

