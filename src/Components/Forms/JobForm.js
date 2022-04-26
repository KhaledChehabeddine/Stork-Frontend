import React, {useCallback, useState} from 'react';
import {
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormFeedback,
  CFormTextarea,
  CFormSelect,
  CModalBody, CModalFooter, CModal, CHeader
} from '@coreui/react';
import {countries} from '../Utils/utils';
import {formStyle} from '../Utils/Styles';
import {useNavigate} from 'react-router-dom'
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import '../../Styles/Breadcrumbs.css'
import '../../Styles/FormStyle.css'
import {useData} from "../../Context/Use";

const JobForm = () => {
  const { values: { jobPositions }, actions: { setJobPositions } } = useData();
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [employmentType, setEmploymentType] = useState(null);
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
        if (response.status === 200) {
          jobPositions.push(response.data);
          setJobPositions(jobPositions);
        }
      }).catch(error => console.log(error));
    setVisible(true);
  }, [city, country, employmentType, jobTitle, notes, startDate, workType]);

  return (
    <div>
      <NavBar/>

      <CForm className='form row g-3 needs-validation'
             noValidate
             style={formStyle}
             validated={valid}>

        <CHeader>
          <h1 className='form-title'>Job Position Form</h1>
        </CHeader>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Job Title</CFormLabel>
          <CFormInput placeholder='ex: Software Engineer'
                      required
                      type='text'
                      onChange={(event) => setJobTitle(event.target.value)}/>
          <CFormFeedback invalid>Must be 1 or more characters long.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Start Date</CFormLabel>
          <CFormInput required
                      type='date'
                      onChange={(event) => setStartDate(event.target.value)}/>
          <CFormFeedback invalid>Invalid start date selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Country</CFormLabel>
          <CFormSelect defaultValue={''}
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
          <CFormInput placeholder='ex: Beirut'
                      required
                      type='text'
                      onChange={(event) => setCity(event.target.value)}/>
          <CFormFeedback invalid>Must be 1 or more characters long.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Workplace Type</CFormLabel>
          <CFormSelect defaultValue=''
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
          <CFormSelect defaultValue=''
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
          <CFormTextarea rows='5'
                         onChange={(event) => setNotes(event.target.value)}>
          </CFormTextarea>
        </CCol>

        <CCol>
          <center>
            <button className="form-button"
                    type='submit'
                    onClick={handleSubmit}>Submit</button>
          </center>
        </CCol>
      </CForm>

      <CModal alignment='center'
              backdrop='static'
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalBody>{jobTitle + ' has been successfully added.'}</CModalBody>
        <CModalFooter>
          <button className="form-button"
                   onClick={() => {
                     setVisible(false);
                     window.location.reload();
                   }}>Close</button>
          <button className="form-button" style={{width: "30%"}}
                   onClick={() => {
                     setVisible(false);
                     navigate('/job/all');
                     window.location.reload();
                   }}>View Jobs</button>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default JobForm;
