import React, {useCallback, useState} from 'react';
import '../../Styles/ProfilePage.css'
import Navbar from '../Utils/Navbar';
import CIcon from '@coreui/icons-react';
import {cilBriefcase, cilBuilding, cilGlobeAlt, cilHome} from '@coreui/icons';
import {cilCalendarEvent, cilCity, cilRemoteControl} from '@coreui/icons-pro';
import {countries, formatDate} from '../Utils/utils';
import {useNavigate} from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CHeader,
  CModal, CModalBody, CModalFooter,
  CRow
} from '@coreui/react';
import getApiClient from '../../api_client/getApiClient';

const VacancyPage = ({vacancy}) => {
  const navigate = useNavigate();
  const [city, setCity] = useState(vacancy.city);
  const [country, setCountry] = useState(vacancy.country);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [employmentType, setEmploymentType] = useState(vacancy.employmentType);
  const [editVisible, setEditVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState(vacancy.jobTitle);
  const [notes, setNotes] = useState(vacancy.notes);
  const [startDate, setStartDate] = useState(vacancy.expectedStartDate);
  const [valid, setValid] = useState(false);
  const [visible, setVisible] = useState(false);
  const [workType, setWorkType] = useState(vacancy.workType);

  const setWorkTypeIcon = () => {
    if (workType === 'On-site') return <CIcon className='me-3' icon={cilBuilding}/>;
    if (workType === 'Hybrid') return <CIcon className='me-3' icon={cilHome}/>;
    return <CIcon className='me-3' icon={cilRemoteControl}/>;
  }

  const getCandidates = () => {
    /* Implement backend support to get all candidates of a job position id */
    return 0 ? <div/>/*<CandidatesTable candidates=''/>*/ :
      <h1 className='profile-name'>No candidates assigned to this job position.</h1>;
  }

  const addCandidate = useCallback(() => {
    navigate('/candidate/add', {state: {jobPosition: vacancy}});
  }, [navigate, vacancy]);

  const deleteJobPosition = useCallback(() => {
    getApiClient().deleteVacancy(vacancy.id);
    setDeleteVisible(false);
    navigate('/job/all');
  }, [navigate, vacancy.id]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setValid(true);
    if (!city) return;
    if (!country) return;
    if (!employmentType) return;
    if (!jobTitle) return;
    if (!startDate) return;
    if (!workType) return;
    setEditVisible(false);
  }, [city, country, employmentType, jobTitle, startDate, workType]);

  return (
    <div className='full-height page-background'>
      <div>
        <Navbar/>
        
        <CCard className='m-auto mt-5 w-75 p-5'
               style={{borderRadius: '2rem'}}>
          <CCardBody>
            <CRow>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardTitle className='mb-4 fw-bold fs-2'>{jobTitle}</CCardTitle>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CCardTitle className='mb-4 fw-bold fs-2'>Actions</CCardTitle>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-2'>
                  <CIcon className='me-3' icon={cilGlobeAlt}/>
                  {country}
                </CCardText>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CButton className='w-50'
                         color='dark'
                         shape='rounded-pill'
                         variant='outline'
                         onClick={addCandidate}>Add Candidate</CButton>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-2'>
                  <CIcon className='me-3' icon={cilCity}/>
                  {city}
                </CCardText>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CButton className='w-50'
                         color='dark'
                         shape='rounded-pill'
                         variant='outline'
                         onClick={() => setEditVisible(true)}>Edit Job Position</CButton>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-2'>
                  <CIcon className='me-3' icon={cilBriefcase}/>
                  {employmentType}
                </CCardText>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CButton className='w-50'
                         color='dark'
                         shape='rounded-pill'
                         variant='outline'
                         onClick={() => setDeleteVisible(true)}>Delete Job Position</CButton>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-2'>
                  {setWorkTypeIcon()}
                  {workType}
                </CCardText>
              </CCol>
            </CRow>

            <CRow>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText>
                  <CIcon className='me-3' icon={cilCalendarEvent}/>
                  {formatDate(startDate)}
                </CCardText>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        
        <CModal alignment='center'
                backdrop='static'
                visible={deleteVisible}>
          <CModalBody>Are you sure you want to delete this job position?</CModalBody>
          <CModalFooter>
            <CButton color='dark'
                     shape='rounded-pill'
                     variant='outline'
                     onClick={() => setDeleteVisible(false)}>Close</CButton>
            <CButton color='dark'
                     shape='rounded-pill'
                     variant='outline'
                     onClick={deleteJobPosition}>Confirm</CButton>
          </CModalFooter>
        </CModal>

        <CModal size='lg'
                alignment='center'
                backdrop='static'
                visible={editVisible}>
          <CModalBody>
            <div>
              <CForm noValidate
                     validated={valid}>
                <CHeader>
                  <h1 className='form-title'>{jobTitle}</h1>
                </CHeader>

                <CRow className='mb-3 mt-3'>
                  <CCol>
                    <CFormLabel>Job Title</CFormLabel>
                    <CFormInput defaultValue={jobTitle}
                                placeholder='ex: Software Engineer'
                                required
                                type='text'
                                onChange={(event) => setJobTitle(event.target.value)}/>
                    <CFormFeedback invalid>Must be 1 or more characters long.</CFormFeedback>
                  </CCol>

                  <CCol>
                    <CFormLabel>Start Date</CFormLabel>
                    <CFormInput value={formatDate(startDate)}
                                required
                                type='date'
                                onChange={(event) => setStartDate(event.target.value)}/>
                    <CFormFeedback invalid>Invalid start date selected.</CFormFeedback>
                  </CCol>
                </CRow>

                <CRow className='mb-3 mt-3'>
                  <CCol>
                    <CFormLabel>Country</CFormLabel>
                    <CFormSelect defaultValue={country}
                                 required
                                 onChange={(event) => {setCountry(event.target.value)}}>
                      <option disabled value=''>Choose...</option>
                      {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
                    </CFormSelect>
                    <CFormFeedback invalid>Invalid country selected.</CFormFeedback>
                  </CCol>

                  <CCol>
                    <CFormLabel>City</CFormLabel>
                    <CFormInput defaultValue={city}
                                placeholder='ex: Beirut'
                                required
                                type='text'
                                onChange={(event) => setCity(event.target.value)}/>
                    <CFormFeedback invalid>Must be 1 or more characters long.</CFormFeedback>
                  </CCol>
                </CRow>

                <CRow className='mb-3 mt-3'>
                  <CCol>
                    <CFormLabel>Workplace Type</CFormLabel>
                    <CFormSelect defaultValue={workType}
                                 required
                                 onChange={(event) => setWorkType(event.target.value)}>
                      <option disabled value=''>Choose...</option>
                      <option key='On-site' value='On-site'>On-site</option>
                      <option key='Hybrid' value='Hybrid'>Hybrid</option>
                      <option key='Remote' value='Remote'>Remote</option>
                    </CFormSelect>
                    <CFormFeedback invalid>Invalid workplace type selected.</CFormFeedback>
                  </CCol>

                  <CCol>
                    <CFormLabel>Employment Type</CFormLabel>
                    <CFormSelect defaultValue={employmentType}
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
                </CRow>

                <CRow>
                  <CCol>
                    <CFormLabel>Notes</CFormLabel>
                    <CFormTextarea defaultValue={notes}
                                   rows='5'
                                   onChange={(event) => setNotes(event.target.value)}>
                    </CFormTextarea>
                  </CCol>
                </CRow>
              </CForm>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color='dark'
                     shape='rounded-pill'
                     variant='outline'
                     onClick={() => setEditVisible(false)}>Close</CButton>
            <CButton color='dark'
                     shape='rounded-pill'
                     variant='outline'
                     onClick={handleSubmit}>Confirm</CButton>
          </CModalFooter>
        </CModal>
        </div>
    </div>
  );
};

export default VacancyPage;
