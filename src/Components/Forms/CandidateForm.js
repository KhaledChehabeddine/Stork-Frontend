import React, {useCallback, useState} from 'react';
import {Breadcrumb} from "react-bootstrap";
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect} from '@coreui/react';
import {countries, genders} from '../Utils/utils';
import {formStyle} from '../Utils/Styles';
import {useNavigate} from 'react-router-dom';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import '../../Styles/Breadcrumbs.css'
import '../../Styles/FormStyle.css'

const CandidateForm = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState(null);
  const [sex, setSex] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } setValid(true);
  };

  const onSubmit = useCallback( () => {
    //const nameRegex = new RegExp('^[A-Za-z]{2,26}$');
    //const emailRegex = new RegExp('^[^ ].+@[^ ].+$');
    //const phoneRegex = new RegExp('^\\d{10}$');
    //if (!nameRegex.test(firstName)) return;
    //if (!nameRegex.test(lastName)) return;
    //if (!emailRegex.test(email)) return;
    if (!firstName) return;
    if (!lastName) return;
    if (!email) return;
    if (!country) return;
    if (!sex) return;
    if (!phone) return;
    //if (!phoneRegex.test(phone)) return;
    if (!resume) return;
    getApiClient().addCandidate(firstName, lastName, country, sex, email, phone)
      .then(response =>
        getApiClient().addResume(response.data.id, resume).catch(error => console.log(error))
      ).catch(error => console.log(error));
    alert('Your application has been successfully submitted!');
    navigate('/home');
  }, [firstName, lastName, country, sex, email, phone, resume, navigate]);

  return (
    <div>
      <NavBar />
      <Breadcrumb className="form-breadcrumb" style={{marginTop:"50px"}}>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/candidate/all">Candidates</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Candidate</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-header">Candidate Form</h1>
      <CForm
        className='form row g-3 needs-validation'
        noValidate
        validated={valid}
        style={formStyle}
        encType="multipart/form-data"
      >
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer01'>First Name</CFormLabel>
          <CFormInput type='text' placeholder='ex: Jonathon' id='validationServer01' required
                      onChange={(event) => setFirstName(event.target.value)}
          />
          <CFormFeedback tooltip invalid>Invalid first name</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer02'>Last Name</CFormLabel>
          <CFormInput type='text' placeholder='ex: Walker' id='validationServer02' required
                      onChange={(event) => setLastName(event.target.value)}
          />
          <CFormFeedback tooltip invalid>Invalid last name</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer05'>Country</CFormLabel>
          <CFormSelect id='validationServer05' required
                       onChange={(event) => setCountry(event.target.value)}
          >
            <option selected disabled value=''>Choose...</option>
            {countries.map(country => <option key={country} value={country}>{country}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid country</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer06'>Gender</CFormLabel>
          <CFormSelect id='validationServer06' required
                       onChange={(event) => setSex(event.target.value)}
          >
            <option selected disabled value=''>Choose...</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid gender</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={7} className="position-relative">
          <CFormLabel htmlFor='validationServer03'>Email Address</CFormLabel>
          <CFormInput type='email' placeholder='ex: example@email.com' id='validationServer03' required
                      onChange={(event) => setEmail(event.target.value)}
          />
          <CFormFeedback tooltip invalid>Invalid email address</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={5} className="position-relative">
          <CFormLabel htmlFor='validationServer04'>Phone Number</CFormLabel>
          <CFormInput type='tel' placeholder='ex: 1234567890' id='validationServer04' required
                      onChange={(event) => setPhone(event.target.value)}
          />
          <CFormFeedback tooltip invalid>Invalid phone number</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={12} className="position-relative">
          <CFormLabel htmlFor='validationServer07'>Resume</CFormLabel>
          <CFormInput type='file' id='validationServer07' accept='.pdf' aria-label='file example' required
                      onChange={(event) => setResume(event.target.files[0])}
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
