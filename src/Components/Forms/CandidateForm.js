import React, {useCallback, useState} from 'react';
import getApiClient from '../../api_client/getApiClient';
import {useNavigate} from 'react-router-dom';
import NavBar from '../Utils/Navbar';
import {
  CButton,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react';
import {formStyle} from '../Utils/Styles';
import {Breadcrumb} from "react-bootstrap";
import {countries} from '../Utils/utils';

const sexes = ['Male', 'Female'];

const CandidateForm = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(null);
  const [sex, setSex] = useState(null);
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } setValid(true);
  };

  const onSubmit = useCallback( () => {
    const nameRegex = new RegExp('^[A-Za-z]{2,26}$');
    const emailRegex = new RegExp('^[^ ].+@[^ ].+$');
    const phoneRegex = new RegExp('^\\d{10}$');
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) return;
    if (!emailRegex.test(email)) return;
    if (!country) return;
    if (!sex) return;
    if (!phoneRegex.test(phone)) return;
    if (!resume) return;
    getApiClient().addCandidate(firstName, lastName, email, phone, country, sex)
      .then(response => {
        getApiClient().addResume(resume, response.data.id)
          .then(response => {
            console.log(response.data);
          }).catch(error => console.log(error));
        alert('Your application has been successfully submitted!');
      }).catch(error => console.log(error));
    navigate('/home');
  }, [firstName, lastName, email, phone, country, sex, resume, navigate]);

  return (
    <div>
      <NavBar />
      <Breadcrumb className="form-breadcrumb">
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/candidate/all">Candidates</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Candidates</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="form-header">Candidate Form</h1>
      <CForm
        className='row g-3 needs-validation'
        noValidate
        validated={valid}
        onSubmit={handleSubmit}
        style={formStyle}
        encType="multipart/form-data"
      >
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer01'>First Name</CFormLabel>
          <CFormInput type='text' placeholder='ex: Jonathon' id='validationServer01' required
                      onChange={(event) => {setFirstName(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid first name</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer02'>Last Name</CFormLabel>
          <CFormInput type='text' placeholder='ex: Walker' id='validationServer02' required
                      onChange={(event) => {setLastName(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid last name</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer05'>Country</CFormLabel>
          <CFormSelect id='validationServer05' required
                       onChange={(event) => {setCountry(event.target.value)}}
          >
            <option selected disabled value=''>Choose...</option>
            {countries.map(country => <option key={country}>{country}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid country</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer06'>Sex</CFormLabel>
          <CFormSelect id='validationServer06' required
                       onChange={(event) => {setSex(event.target.value)}}
          >
            <option selected disabled value=''>Choose...</option>
            {sexes.map(sex => <option key={sex}>{sex}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid sex</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={7} className="position-relative">
          <CFormLabel htmlFor='validationServer03'>Email Address</CFormLabel>
          <CFormInput type='email' placeholder='ex: example@email.com' id='validationServer03' required
                      onChange={(event) => {setEmail(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid email address</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={5} className="position-relative">
          <CFormLabel htmlFor='validationServer04'>Phone Number</CFormLabel>
          <CFormInput type='tel' placeholder='ex: 1234567890' id='validationServer04' required
                      onChange={(event) => {setPhone(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid phone number</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={12} className="position-relative">
          <CFormLabel htmlFor='validationServer07'>Resume</CFormLabel>
          <CFormInput type='file' id='validationServer07' accept='.pdf' aria-label='file example' required
                      onChange={(event) => {setResume(event.target.files[0])}}
          />
          <CFormFeedback tooltip invalid>Invalid resume</CFormFeedback>
        </CCol>
        <CCol xs={12}>
          <center><CButton color='dark' type='submit' onClick={onSubmit}>Submit</CButton></center>
        </CCol>
      </CForm>
    </div>
  );
}

export default CandidateForm;
