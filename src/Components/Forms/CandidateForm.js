import React, {useCallback, useReducer, useState} from 'react';
import getApiClient from '../../api_client/getApiClient';
import Button from '../Utils/Button';
import Form from '../Utils/Form';
import Input from '../Utils/Input';
import {useNavigate} from "react-router-dom";
import Spinner from "../Utils/Spinner";
import NavBar from "../Utils/Navbar";
import {Breadcrumb} from "react-bootstrap";
import '../../Styles/FormStyle.css'

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);

  const onFileChange = useCallback(event => {
    setResume(event.target.files[0]);
  }, []);

  const addCandidateHandler = useCallback(() => {
    console.log(resume);
    const reader = new FileReader();
    console.log('result: ' + reader.result);
    dispatch({ type: 'adding-candidate' });
    getApiClient().addCandidate('/add', firstName, lastName, email, phone, null, 'https://bootdey.com/img/Content/avatar/avatar3.png')
      .then(response => {
        dispatch({ type: 'candidate-added' });
        navigate(`/candidate/all`);
      }).catch(error => {
        console.log(error);
    });
  }, [firstName, lastName, email, phone, resume, navigate]);

  return (
    <>
      <NavBar/>
      <Breadcrumb className="form-breadcrumb">
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/employees">Candidates</Breadcrumb.Item>
        <Breadcrumb.Item active>Apply</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="form-header" style={{ padding: '1rem' }}>Application Form</h1>
      {state.addingCandidate ? <Spinner />
        :
        <div className="form-container" align='center'>
          <Form className="form" onSubmit={event => { event.preventDefault() }}>
            <div className="flex-form" align='center'>
              <Input className="form-input left" onChange={event => { setFirstName(event.target.value) }} placeholder='First Name'/>
              <Input className="form-input right" onChange={event => { setEmail(event.target.value) }} placeholder='Email'/>
              <Input className="form-input left" onChange={event => { setLastName(event.target.value) }} placeholder='Last Name'/>
              <Input className="form-input right" onChange={event => { setPhone(event.target.value) }} placeholder='Phone'/>
            </div>
            <hr/>
            <div style={{display:'flex', alignItems:'baseline'}}>
            <h3 className="form-text" style={{ textIndent: 20, paddingRight:'110px' }}>Resume</h3>
            <input className="form-input" type='file' onChange={onFileChange} align='left' />
            </div>
            <hr/>
            <Button className="form-button" onClick={addCandidateHandler}>Apply</Button>
          </Form>
        </div>}
    </>
  );
}

export default CandidateForm;

