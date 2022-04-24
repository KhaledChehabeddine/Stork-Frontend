import React, {useCallback, useState} from 'react';
import '../../Styles/ProfilePage.css'
import Navbar from '../Utils/Navbar';
import CIcon from '@coreui/icons-react';
import {cilBriefcase, cilBuilding, cilGlobeAlt, cilHome} from '@coreui/icons';
import {cilCalendarEvent, cilCity, cilRemoteControl} from '@coreui/icons-pro';
import {formatDate} from '../Utils/utils';
import {useNavigate} from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CListGroup,
  CListGroupItem, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow
} from '@coreui/react';
import getApiClient from '../../api_client/getApiClient';
import JobForm from "../Forms/JobForm";

const VacancyPage = ({vacancy}) => {
  const navigate = useNavigate();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const setWorkTypeIcon = () => {
    if (vacancy.workType === 'On-site') return <CIcon className='me-3' icon={cilBuilding}/>;
    if (vacancy.workType === 'Hybrid') return <CIcon className='me-3' icon={cilHome}/>;
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

  const getJobDetails = useCallback(() => {
    setEditVisible(true);
  });

  const editJobPosition = useCallback(() => {

  });

  const deleteJobPosition = useCallback(() => {
    getApiClient().deleteVacancy(vacancy.id);
    setDeleteVisible(false);
    navigate('/job/all');
  }, [navigate, vacancy.id]);

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
                <CCardTitle className='mb-4 fw-bold fs-2'>{vacancy.jobTitle}</CCardTitle>
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
                  {vacancy.country}
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
                  {vacancy.city}
                </CCardText>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CButton className='w-50'
                         color='dark'
                         shape='rounded-pill'
                         variant='outline'
                         onClick={getJobDetails}>Edit Job Position</CButton>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-2'>
                  <CIcon className='me-3' icon={cilBriefcase}/>
                  {vacancy.employmentType}
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
                  {vacancy.workType}
                </CCardText>
              </CCol>
            </CRow>

            <CRow>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText>
                  <CIcon className='me-3' icon={cilCalendarEvent}/>
                  {formatDate(vacancy.expectedStartDate)}
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

        <CModal alignment='center'
                backdrop='static'
                visible={editVisible}>
          <CModalBody><JobForm/></CModalBody>
          <CModalFooter>
            <CButton color='dark'
                     shape='rounded-pill'
                     variant='outline'
                     onClick={() => setEditVisible(false)}>Close</CButton>
            <CButton color='dark'
                     shape='rounded-pill'
                     variant='outline'
                     onClick={editJobPosition}>Confirm</CButton>
          </CModalFooter>
        </CModal>
        </div>
    </div>
  );
};

export default VacancyPage;
