import React, {useCallback, useState} from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CFormTextarea,
  CFormSelect,
  CButton
} from '@coreui/react';
import {countries} from '../Utils/utils';
import {formStyle} from '../Utils/Styles';
import {useNavigate} from 'react-router-dom'
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import '../../Styles/Breadcrumbs.css'
import '../../Styles/FormStyle.css'

const VacancyForm = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [workType, setWorkType] = useState(null);
  const [employmentType, setEmploymentType] = useState(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValid(true);
  }

  const onSubmit = useCallback(() => {
    if (!jobTitle) return;
    if (!country) return;
    if (!city) return;
    if (!workType) return;
    if (!employmentType) return;
    getApiClient().addVacancy(jobTitle, country, city, workType, employmentType, notes)
      .catch(error => console.log(error));
    alert('Job position has been successfully added!');
    navigate('/home');
  }, [jobTitle, country, city, workType, employmentType, notes, navigate]);

  return (
    <div>
      <NavBar />
      <Breadcrumb className='form-breadcrumb' style={{marginTop:'50px'}}>
        <Breadcrumb.Item href='/home'>Home</Breadcrumb.Item>
        <Breadcrumb.Item href='/vacancies'>Job Positions</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Job Position</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className='page-header'>Job Position Form</h1>
      <CForm
        className='row g-3 needs-validation'
        noValidate
        onSubmit={handleSubmit}
        style={formStyle}
        validated={valid}>
        <CCol style={{marginBottom: '1rem'}} md={12} className='position-relative'>
          <CFormLabel htmlFor='validationServer01'>Job Title</CFormLabel>
          <CFormInput
            id='validationServer01'
            type='text'
            placeholder='ex: Software Engineer'
            required
            onChange={(event) => setJobTitle(event.target.value)}/>
          <CFormFeedback invalid tooltip>Invalid job title.</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer03'>Country</CFormLabel>
          <CFormSelect
            id='validationServer03'
            defaultValue={''}
            required
            onChange={(event) => {setCountry(event.target.value)}}>
            <option value='' disabled>Choose...</option>
            {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
          </CFormSelect>
          <CFormFeedback invalid tooltip>Invalid country</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer04'>City</CFormLabel>
          <CFormInput
            id='validationServer04'
            type='text'
            placeholder='ex: Beirut'
            required
            onChange={(event) => setCity(event.target.value)}/>
          <CFormFeedback invalid tooltip>Invalid city.</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer05'>Workplace Type</CFormLabel>
          <CFormSelect
            id='validationServer05'
            defaultValue={''}
            required
            onChange={(event) => setWorkType(event.target.value)}>
            <option value='' disabled>Choose...</option>
            <option key='On-site' value='On-site'>On-site</option>
            <option key='Hybrid' value='Hybrid'>Hybrid</option>
            <option key='Remote' value='Remote'>Remote</option>
          </CFormSelect>
          <CFormFeedback invalid tooltip>Invalid workplace type.</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer06'>Employment Type</CFormLabel>
          <CFormSelect
            id='validationServer06'
            defaultValue={''}
            required
            onChange={(event) => setEmploymentType(event.target.value)}>
            <option value='' disabled>Choose...</option>
            <option key='Full-time' value='Full-time'>Full-time</option>
            <option key='Part-time' value='Part-time'>Part-time</option>
            <option key='Contract' value='Contract'>Contract</option>
            <option key='Temporary' value='Temporary'>Temporary</option>
            <option key='Volunteer' value='Volunteer'>Volunteer</option>
            <option key='Internship' value='Internship'>Internship</option>
          </CFormSelect>
          <CFormFeedback invalid tooltip>Invalid employment type.</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={12} className='position-relative'>
          <CFormLabel>Notes</CFormLabel>
          <CFormTextarea
            rows='4'
            onChange={(event) => setNotes(event.target.value)}>
          </CFormTextarea>
        </CCol>

        <CCol xs={12}>
          <center>
            <CButton
              color='dark'
              type='submit'
              onClick={onSubmit}>Submit</CButton>
          </center>
        </CCol>
      </CForm>
    </div>
  );
};

export default VacancyForm;
