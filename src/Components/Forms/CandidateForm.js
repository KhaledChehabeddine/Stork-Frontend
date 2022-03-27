import {Breadcrumb} from "react-bootstrap";
import {CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect} from '@coreui/react';
import {countries, genders} from '../Utils/utils';
import {formStyle} from '../Utils/Styles';
import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';

const CandidateForm = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValid(true);
  };

  const onSubmit = useCallback( () => {
    const nameRegex = new RegExp('^[A-Za-z]{2,26}$');
    const emailRegex = new RegExp('^[^ ].+@[^ ].+$');
    const phoneRegex = new RegExp('^\\d{10}$');
    if (!nameRegex.test(first_name)) return;
    if (!nameRegex.test(last_name)) return;
    if (!emailRegex.test(email)) return;
    if (!country) return;
    if (!gender) return;
    if (!phoneRegex.test(phone)) return;
    if (!resume) return;
    getApiClient().addCandidate(first_name, last_name, country, gender, email, phone)
      .then(response =>
        getApiClient().addResume(response.data.id, resume).catch(error => console.log(error))
      ).catch(error => console.log(error));
    alert('Your application has been successfully submitted!');
    navigate('/home');
  }, [first_name, last_name, country, gender, email, phone, resume, navigate]);

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
            {countries.map(country => <option value={country}>{country}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid country</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer06'>Gender</CFormLabel>
          <CFormSelect id='validationServer06' required
                       onChange={(event) => setGender(event.target.value)}
          >
            <option selected disabled value=''>Choose...</option>
            {genders.map(gender => <option value={gender}>{gender}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid sex</CFormFeedback>
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
