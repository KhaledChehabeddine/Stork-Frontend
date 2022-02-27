import React, {useCallback, useState} from 'react';
import {CForm, CCol, CFormLabel, CFormInput, CFormFeedback, CButton, CFormTextarea} from '@coreui/react';
import NavBar from "../Utils/Navbar";
import Header from "../Utils/Header";
import { formStyle } from "../Utils/styles";
import getApiClient from "../../api_client/getApiClient";
import {useNavigate} from "react-router-dom";

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
  }, [jobTitle, country, city, jobDescription, deadline]);
  return (
    <div>
      <NavBar />
      <Header text={'New Vacancy'} />
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        style={formStyle}
      >
        <CCol md={7}>
          <CFormLabel htmlFor="validationCustom01">Job Title</CFormLabel>
          <CFormInput type="text" id="validationCustom01" placeholder="Software Engineer" required
            onChange={(event) => {setJobTitle(event.target.value)}} />
          <CFormFeedback valid>Looks good!</CFormFeedback>
          <CFormFeedback invalid>Please provide a job title.</CFormFeedback>
        </CCol>

        <CCol md={5}>
          <CFormLabel htmlFor="validationCustom03">Country</CFormLabel>
          <CFormInput type="text" id="validationCustom03" placeholder="Lebanon" required
                      onChange={(event) => {setCountry(event.target.value)}}/>
          <CFormFeedback valid>Looks good!</CFormFeedback>
          <CFormFeedback invalid>Please provide a valid country.</CFormFeedback>
        </CCol>
        <CCol md={7}>
          <CFormLabel htmlFor="validationCustom05">City</CFormLabel>
          <CFormInput type="text" id="validationCustom05" placeholder="Beirut" required
                      onChange={(event) => {setCity(event.target.value)}}/>
          <CFormFeedback valid>Looks good!</CFormFeedback>
          <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
        </CCol>
        <CCol md={5}>
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
          <CButton color="primary" type="submit" onClick={onSubmit}>
            Submit
          </CButton>
        </CCol>
      </CForm>
    </div>
  );
};

export default VacancyForm;
