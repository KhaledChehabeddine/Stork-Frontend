import React, {useCallback, useState} from 'react';
import {CForm, CCol, CFormLabel, CFormInput, CFormFeedback, CButton, CFormTextarea, CFormSelect} from '@coreui/react';
import NavBar from "../Utils/Navbar";
import { formStyle } from "../Utils/Styles";
import getApiClient from "../../api_client/getApiClient";
import {useNavigate} from "react-router-dom";
import {Breadcrumb} from "react-bootstrap";
import {countries} from "../Utils/utils";
import '../../Styles/Breadcrumbs.css'
import '../../Styles/FormStyle.css'
import Button from "../Utils/Button";

const VacancyForm = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  }
  const onSubmit = useCallback(() => {
    if (!jobTitle) return;
    if (!country) return;
    if (!city) return;
    if(!jobDescription) return;
    if (!deadline) return;
    getApiClient().addVacancy(jobTitle, country, city, jobDescription, deadline)
      .then(response => {
        alert('New Vacancy has been added successfully!');
        console.log(response.data);
        navigate('/home');
      }).catch(error => console.log(error));
    navigate('/home');
  }, [jobTitle, country, city, jobDescription, deadline, navigate]);
  return (
    <div>
      <NavBar />
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/vacancies">Vacancies</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Vacancy</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="page-header">Vacancy Form</h1>
      <CForm
        className="form row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={formStyle}
      >
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor="validationCustom01">Job Title</CFormLabel>
          <CFormInput type="text" id="validationCustom01" placeholder="Software Engineer" required
            onChange={(event) => {setJobTitle(event.target.value)}} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
          <CFormFeedback invalid>Please provide a job title.</CFormFeedback>
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
          <CFormLabel htmlFor="validationCustom05">City</CFormLabel>
          <CFormInput type="text" id="validationCustom05" placeholder="Beirut" required
                      onChange={(event) => {setCity(event.target.value)}}/>
          <CFormFeedback valid>Looks good!</CFormFeedback>
          <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor="validationCustom05">Deadline</CFormLabel>
          <CFormInput type="date" id="validationCustom05" required
                      onChange={(event) => {console.log(event.target.value); setDeadline(event.target.value)}}/>
          <CFormFeedback valid>Looks good!</CFormFeedback>
          <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
        </CCol>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlTextarea1">Job Description</CFormLabel>
          <CFormTextarea id="exampleFormControlTextarea1" rows="4" required
                         onChange={(event) => {setJobDescription(event.target.value)}}>
          </CFormTextarea>
          <CFormFeedback valid>Looks good!</CFormFeedback>
          <CFormFeedback invalid>Please provide job description.</CFormFeedback>
        </div>
        <CCol xs={12}>
          <center><Button className='form-button' color='dark' type='submit' onClick={onSubmit}>Submit</Button></center>
        </CCol>
      </CForm>
    </div>
  );
};

export default VacancyForm;
