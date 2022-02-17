import React, {useCallback, useReducer, useState} from 'react';
import getApiClient from '../../api_client/getApiClient';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import {useNavigate} from "react-router-dom";
import Spinner from "../Utils/Spinner";

const reducer = (state, action) => {
  switch(action.type) {
    case 'adding-candidate':
      return { ...state, addingCandidate: true };
    case 'candidate-added':
      return { ...state, candidateAdded: true, addingCandidate: false };
    default:
      return { ...state };
  }
}

const CandidateForm = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    addingCandidate: false,
    candidateAdded: false
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);

  const onFileChange = useCallback(event => {
    setResume(event.target.files[0]);
  }, []);

  const addApplicantHandler = useCallback(() => {
    console.log(resume);
    dispatch({ type: 'adding-candidate' });
    getApiClient().addCandidate('/add', name, email, phone, resume, 'https://bootdey.com/img/Content/avatar/avatar3.png')
      .then(response => {
        dispatch({ type: 'candidate-added' });
        navigate(`/applicant/${response.data.id}`);
      }).catch(error => {
        console.log(error);
    });
  }, [name, email, phone, resume, navigate]);

  return (
    <>
      {state.addingCandidate ? <Spinner />
        :
        <div align='center'>
          <Form onSubmit={event => { event.preventDefault() }}>
            <h1 style={{padding: '1rem'}}>Applicant Form</h1>
            <Input onChange={event => { setName(event.target.value) }} placeholder='Name'/>
            <Input onChange={event => { setEmail(event.target.value) }} placeholder='Email'/>
            <Input onChange={event => { setPhone(event.target.value) }} placeholder='Phone'/>
            <h3 align='left' style={{ textIndent: 35 }}>Add Resume:</h3>
            <input type='file' onChange={onFileChange} align='left' />
            <Button onClick={addApplicantHandler}>Add Applicant</Button>
          </Form>
        </div>}
    </>
  );
}

export default CandidateForm;

