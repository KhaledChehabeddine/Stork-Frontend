import CIcon from "@coreui/icons-react";
import React, {useCallback, useState} from 'react';
import {
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CFormTextarea,
  CFormSelect,
  CModalBody, CModalFooter, CModal, CHeader, CButton, CModalHeader, CRow
} from '@coreui/react';
import {cilX} from "@coreui/icons";
import {countries} from '../Utils/utils';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import {useData} from "../../Context/Use";
import {useNavigate} from 'react-router-dom'
import '../../Styles/Form.css';
import '../../Styles/Modal.css';

const JobForm = () => {
  const { values: { jobPositions }, actions: { setJobPositions } } = useData();
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [employmentType, setEmploymentType] = useState(null);
  const [jobPosition, setJobPosition] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [valid, setValid] = useState(false);
  const [visible, setVisible] = useState(false);
  const [workType, setWorkType] = useState(null);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setValid(true);
    if (!city) return;
    if (!country) return;
    if (!employmentType) return;
    if (!jobTitle) return;
    if (!workType) return;
    getApiClient().addVacancy(jobTitle, startDate, country, city, workType, employmentType, notes)
      .then(response => {
          jobPositions.push(response.data);
          setJobPositions(jobPositions);
          setJobPosition(response.data);
      }).catch(error => console.log(error));
    setVisible(true);
  }, [city, country, employmentType, jobPositions, jobTitle, notes, setJobPositions, startDate, workType]);

  return (
    <div>
      <NavBar/>

      <CForm className='form form-background g-3 row'
             validated={valid}>

        <CHeader className='form-background form-title'>Job Form</CHeader>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Job Title</CFormLabel>
          <CFormInput className='form-background form-input'
                      placeholder='ex: Software Engineer'
                      required
                      type='text'
                      onChange={(event) => setJobTitle(event.target.value)}/>
          <CFormFeedback invalid>Must be 1 or more characters long.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Start Date</CFormLabel>
          <CFormInput className='form-background form-input'
                      required
                      type='date'
                      onChange={(event) => setStartDate(event.target.value)}/>
          <CFormFeedback invalid>Invalid start date selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Country</CFormLabel>
          <CFormSelect className='form-background form-input form-input-cursor'
                       defaultValue=''
                       required
                       onChange={(event) => {setCountry(event.target.value)}}>
            <option disabled value=''>Choose...</option>
            {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
          </CFormSelect>
          <CFormFeedback invalid>Invalid country selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>City</CFormLabel>
          <CFormInput className='form-background form-input'
                      placeholder='ex: Beirut'
                      required
                      type='text'
                      onChange={(event) => setCity(event.target.value)}/>
          <CFormFeedback invalid>Must be 1 or more characters long.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Workplace Type</CFormLabel>
          <CFormSelect className='form-background form-input form-input-cursor'
                       defaultValue=''
                       required
                       onChange={(event) => setWorkType(event.target.value)}>
            <option disabled value=''>Choose...</option>
            <option key='On-site' value='On-site'>On-site</option>
            <option key='Hybrid' value='Hybrid'>Hybrid</option>
            <option key='Remote' value='Remote'>Remote</option>
          </CFormSelect>
          <CFormFeedback invalid>Invalid workplace type selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Employment Type</CFormLabel>
          <CFormSelect className='form-background form-input form-input-cursor'
                       defaultValue=''
                       required
                       onChange={(event) => setEmploymentType(event.target.value)}>
            <option disabled value=''>Choose...</option>
            <option key='Full-time' value='Full-time'>Full-time</option>
            <option key='Part-time' value='Part-time'>Part-time</option>
            <option key='Contract' value='Contract'>Contract</option>
            <option key='Temporary' value='Temporary'>Temporary</option>
            <option key='Volunteer' value='Volunteer'>Volunteer</option>
            <option key='Internship' value='Internship'>Internship</option>
          </CFormSelect>
          <CFormFeedback invalid>Invalid employment type selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={12}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Notes</CFormLabel>
          <CFormTextarea className='form-background form-input'
                         rows='5'
                         onChange={(event) => setNotes(event.target.value)}>
          </CFormTextarea>
        </CCol>

        <CCol>
          <CButton className='form-button'
                   shape='rounded-pill'
                   onClick={handleSubmit}>Submit</CButton>
        </CCol>
      </CForm>

      <CModal alignment='center'
              backdrop='static'
              visible={visible}>
        <CModalHeader className='modal-background modal-header'
                      closeButton={false}>
          {jobTitle}
          <CIcon className='modal-close-icon'
                 icon={cilX}
                 size='xl'
                 onClick={() => window.location.reload()}/>
        </CModalHeader>
        <CModalBody className='modal-background'>Job position has been successfully added.</CModalBody>
        <CModalFooter className='modal-background'>
          <CButton className='me-2 modal-button'
                   shape='rounded-pill'
                   onClick={() => navigate('/job/all')}>View Jobs</CButton>
          <CButton className='modal-button'
                   shape='rounded-pill'
                   onClick={() =>
                     navigate('/candidate/add', {state: {jobPosition: jobPosition}})
                   }>Add Candidate</CButton>
        </CModalFooter>
      </CModal>

      <CRow className='mt-3'/>
    </div>
  );
};

export default JobForm;
