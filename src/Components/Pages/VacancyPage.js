import React, {useCallback, useEffect, useState} from 'react';
import '../../Styles/ProfilePage.css'
import Navbar from '../Utils/Navbar';
import CIcon from '@coreui/icons-react';
import {
  cilArrowBottom,
  cilArrowTop,
  cilBriefcase,
  cilBuilding,
  cilGlobeAlt,
  cilHome,
  cilPeople,
  cilSearch
} from '@coreui/icons';
import {cilCalendarEvent, cilCity, cilRemoteControl} from '@coreui/icons-pro';
import {countries, formatDate} from '../Utils/utils';
import {useNavigate} from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CHeader, CInputGroup,
  CModal, CModalBody, CModalFooter,
  CRow, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react';
import getApiClient from '../../api_client/getApiClient';
import {useData} from "../../Context/Use";
import CandidateRow from "../Tables/CandidateRow";
import Input from "../Utils/Input";

const statusValue = (status) => {
  switch(status.toLowerCase()) {
    case 'pending': return 1;
    case 'interview': return 2;
    case 'offer': return 3;
    case 'accepted': return 4;
    case 'rejected': return 5;
    default: return 100;
  }
};

// const

const VacancyPage = ({vacancy}) => {
  const {values: {candidates}, actions: {setCandidates}} = useData();

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

  useEffect(() => filterCandidates());

  const sortByDate = (candidates) => candidates.sort((a, b) => {
    return a.id - b.id;
  });

  const rSortByDate = (candidates) => candidates.sort((a, b) => {
    return b.id - a.id;
  });

  const sortByName = (candidates) => candidates.sort((a, b) => {
    const result = a.firstName.localeCompare(b.firstName);
    return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
  });

  const rSortByName = (candidates) => candidates.sort((a, b) => {
    const result = b.firstName.localeCompare(a.firstName);
    return result !== 0 ? result : b.lastName.localeCompare(a.lastName);
  });

  const sortByEmail = (candidates) => candidates.sort((a,b) => {
    return a.email.localeCompare(b.email);
  });

  const rSortByEmail = (candidates) => candidates.sort((a, b) => {
    return b.email.localeCompare(a.email);
  });

  const sortByPhone = (candidates) => candidates.sort((a, b) => {
    return parseInt((a.phone).substring(1, a.phone.length)) -
           parseInt((b.phone).substring(1, b.phone.length));
  });

  const rSortByPhone = (candidates) => candidates.sort((a, b) => {
    return parseInt((b.phone).substring(1, b.phone.length)) -
           parseInt((a.phone).substring(1, a.phone.length));
  });

  const sortByStatus = (candidates) => candidates.sort((a,b) => {
    return statusValue(a.status) - statusValue(b.status);
  });

  const rSortByStatus = (candidates) => candidates.sort((a, b) => {
    return statusValue(b.status) - statusValue(a.status);
  });

  const setWorkTypeIcon = () => {
    if (workType === 'On-site') return <CIcon className='me-3' icon={cilBuilding}/>;
    if (workType === 'Hybrid') return <CIcon className='me-3' icon={cilHome}/>;
    return <CIcon className='me-3' icon={cilRemoteControl}/>;
  }

  const addCandidate = useCallback(() => {
    navigate('/candidate/add', {state: {jobPosition: vacancy}});
  }, [navigate, vacancy]);

  const deleteJobPosition = useCallback(() => {
    getApiClient().deleteVacancy(vacancy.id);
    setDeleteVisible(false);
    navigate('/job/all');
  }, [navigate, vacancy.id]);

  const editJobPosition = useCallback((event) => {
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

  const filterCandidates = () => {
    candidates.filter((candidate) => {return candidate.jobPositionId === vacancy.id;});
  }

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

        {/*<div style={{ display: 'flex', flexDirection: 'column', alignItems: "center"}}>*/}
        {/*  <CTable style={{width: "100%"}} align="middle" className="mb-0 table" hover responsive>*/}
        {/*    <CTableHead style={{backgroundColor: "transparent"}}>*/}
        {/*      <CTableRow className="header-row">*/}
        {/*        <CTableHeaderCell className="text-center icon-cell">*/}
        {/*          <CIcon className="header-container" icon={cilPeople}/>*/}
        {/*        </CTableHeaderCell>*/}
        {/*        <CTableHeaderCell className="header-cell">*/}
        {/*          <div className="header-container" style={{display:"flex",  alignItems:"center"}}>*/}
        {/*            <button className="sort-button-top">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowTop}/>*/}
        {/*            </button>*/}
        {/*            Candidates*/}
        {/*            <button className="sort-button-bottom">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowBottom}/>*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </CTableHeaderCell>*/}
        {/*        <CTableHeaderCell className="text-center header-cell">*/}
        {/*          <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>*/}
        {/*            <button className="sort-button-top">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowTop}/>*/}
        {/*            </button>*/}
        {/*            Email*/}
        {/*            <button className="sort-button-bottom">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowBottom}/>*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </CTableHeaderCell>*/}
        {/*        <CTableHeaderCell className="text-center header-cell">*/}
        {/*          <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>*/}
        {/*            <button className="sort-button-top">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowTop}/>*/}
        {/*            </button>*/}
        {/*            Phone Number*/}
        {/*            <button className="sort-button-bottom">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowBottom}/>*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </CTableHeaderCell>*/}
        {/*        <CTableHeaderCell className="text-center header-cell">*/}
        {/*          <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>*/}
        {/*            <button className="sort-button-top">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowTop}/>*/}
        {/*            </button>*/}
        {/*            Date Applied*/}
        {/*            <button className="sort-button-bottom">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowBottom}/>*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </CTableHeaderCell>*/}
        {/*        <CTableHeaderCell className="text-center header-cell">*/}
        {/*          <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>*/}
        {/*            <button className="sort-button-top">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowTop}/>*/}
        {/*            </button>*/}
        {/*            Status*/}
        {/*            <button className="sort-button-bottom">*/}
        {/*              <CIcon className="sort-icon" icon={cilArrowBottom}/>*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </CTableHeaderCell>*/}
        {/*        <CTableHeaderCell className="text-center search-cell">*/}
        {/*          <div style={{display:"flex",  alignItems:"center"}}>*/}
        {/*            <CIcon className="search-icon" icon={cilSearch} />*/}
        {/*            <Input className="search-bar" type="text" id="searchInput" placeholder="Search For Candidates.."/>*/}
        {/*          </div>*/}
        {/*        </CTableHeaderCell>*/}
        {/*      </CTableRow>*/}
        {/*    </CTableHead>*/}
        {/*    <CTableBody className="table-body">*/}
        {/*      {candidates.map(candidate => <CandidateRow key={candidate.id} candidate={candidate} candidates={candidates} />)}*/}
        {/*    </CTableBody>*/}
        {/*  </CTable>*/}
        {/*</div>*/}

        <CTable className='align-items-center d-lg-flex flex-lg-column mt-5' hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='text-center icon-cell'
                                scope='col'>
                <CIcon icon={cilPeople}/>
              </CTableHeaderCell>

              <CTableHeaderCell className=''
                                scope='col'>
                <CInputGroup className='d-sm-flex align-items-sm-center'>
                  <CButton><CIcon icon={cilArrowTop}/></CButton>
                  <CButton>Candidates</CButton>
                  <CButton><CIcon icon={cilArrowBottom}/></CButton>
                </CInputGroup>
              </CTableHeaderCell>

              <CTableHeaderCell className='text-center header-cell'
                                scope='col'>
                <CInputGroup className='d-sm-flex align-items-sm-center'>
                  <CButton><CIcon icon={cilArrowTop}/></CButton>
                  <CButton>Email</CButton>
                  <CButton><CIcon icon={cilArrowBottom}/></CButton>
                </CInputGroup>
              </CTableHeaderCell>

              <CTableHeaderCell className='header-cell'
                                scope='col'>
                <CInputGroup>
                  <CButton><CIcon icon={cilArrowTop}/></CButton>
                  <CButton>Phone Number</CButton>
                  <CButton><CIcon icon={cilArrowBottom}/></CButton>
                </CInputGroup>
              </CTableHeaderCell>

              <CTableHeaderCell className='header-cell'
                                scope='col'>
                <CInputGroup>
                  <CButton><CIcon icon={cilArrowTop}/></CButton>
                  <CButton>Date Applied</CButton>
                  <CButton><CIcon icon={cilArrowBottom}/></CButton>
                </CInputGroup>
              </CTableHeaderCell>

              <CTableHeaderCell className='header-cell'
                                scope='col'>
                <CInputGroup>
                  <CButton><CIcon icon={cilArrowTop}/></CButton>
                  <CButton>Status</CButton>
                  <CButton><CIcon icon={cilArrowBottom}/></CButton>
                </CInputGroup>
              </CTableHeaderCell>

              <CTableHeaderCell className='header-cell'
                                scope='col'/>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {candidates.map(candidate =>
              <CandidateRow key={candidate.id} candidate={candidate} candidates={candidates}/>
            )}
          </CTableBody>
        </CTable>

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
                     onClick={editJobPosition}>Confirm</CButton>
          </CModalFooter>
        </CModal>
        </div>
    </div>
  );
};

export default VacancyPage;
