import CIcon from "@coreui/icons-react";
import React, {useCallback, useEffect, useReducer} from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect, CHeader, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CRow
} from '@coreui/react';
import {cilX} from "@coreui/icons";
import {countries, genders} from '../Utils/utils';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import {useData} from "../../Context/Use";
import {useLocation, useNavigate} from 'react-router-dom';
import '../../Styles/Form.css'
import '../../Styles/Modal.css';

const emailRegex = new RegExp('^[^ ]+@[^ ]+$');
const nameRegex = new RegExp('^[A-Za-z][A-Za-z ]{1,25}$');
const phoneRegex = new RegExp('^\\d{5,12}$');

const initialState = {
  candidate: null,
  country: null,
  countryPhone: null,
  email: '',
  firstName: '',
  gender: null,
  jobPositionId: null,
  jobPositions: [],
  jobTitle: '',
  lastName: '',
  managerId: null,
  managers: [],
  phone: '',
  redirected: false,
  resumeFile: null,
  valid: false,
  visible: false,
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'load-page':
      return {...state, jobPositions: action.jobPositions, managers: action.managers};
    case 'set-candidate':
      return {...state, candidate: action.candidate};
    case 'set-country':
      return {...state, country: action.country};
    case 'set-country-code':
      return {...state, countryPhone: action.countryPhone}
    case 'set-email':
      return {...state, email: action.email};
    case 'set-first-name':
      return {...state, firstName: action.firstName};
    case 'set-gender':
      return {...state, gender: action.gender};
    case 'set-job-position-id':
      return {...state, jobPositionId: action.jobPositionId};
    case 'set-job-title':
      return {...state, jobTitle: action.jobTitle};
    case 'set-last-name':
      return {...state, lastName: action.lastName};
    case 'set-manager-id':
      return {...state, managerId: action.managerId};
    case 'set-phone':
      return {...state, phone: action.phone};
    case 'set-resume-file':
      return {...state, resumeFile: action.resumeFile};
    case 'set-valid':
      return {...state, valid: true};
    case 'set-visible':
      return {...state, visible: action.visible};
    case 'set-redirected':
      return { ...state, redirected: true };
    default:
      return {...state};
  }
};

const CandidateForm = () => {
  const {values: {candidates, jobPositions, managers}, actions: {setCandidates}} = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'load-page',
      jobPositions: jobPositions,
      managers: managers
    })
    if (location.state)
      if (location.state.jobPosition) {
        dispatch({type: 'set-job-position-id', jobPositionId: location.state.jobPosition.id});
        dispatch({
          type: 'set-job-title',
          jobTitle: location.state.jobPosition.jobTitle + ' (' + location.state.jobPosition.country + ')'
        });
        dispatch({type: 'set-redirected'});
      }
  }, [jobPositions, location.state, managers]);

  const handleSubmit = useCallback( (event) => {
    event.preventDefault();
    dispatch({type: 'set-valid'});
    if (!state.country) return;
    if (!state.countryPhone) return;
    if (!emailRegex.test(state.email)) return;
    if (!nameRegex.test(state.firstName)) return;
    if (!nameRegex.test(state.lastName)) return;
    if (!phoneRegex.test(state.phone)) return;
    if (!state.gender) return;
    if (!state.jobPositionId) return;
    if (!state.resumeFile) return;
    getApiClient().findVacancy(state.jobPositionId)
      .then(job => {
        getApiClient().addCandidate(state.firstName, state.lastName, state.country, state.countryPhone, state.gender,
          state.email, state.phone, job.data, 'Pending')
          .then(response => {
            dispatch({type: 'set-candidate', candidate: response.data});
            getApiClient().addResume(response.data.id, state.resumeFile).catch(error => console.log(error));
            getApiClient().addAction('Resume received', response.data).catch(error => console.log(error));
            candidates.push(response.data);
            setCandidates(candidates);
          }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    dispatch({type: 'set-visible', visible: true});
  }, [candidates, setCandidates, state.country, state.countryPhone, state.email, state.firstName,
            state.gender, state.jobPositionId, state.lastName, state.phone, state.resumeFile]);

  return (
    <div>
      <NavBar/>

      <CForm className='form form-background g-3 row'
             validated={state.valid}>
        <CHeader className='form-background form-title'>Candidate Form</CHeader>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>First Name</CFormLabel>
          <CFormInput className='form-background form-input'
                      placeholder='ex: Jonathon'
                      required
                      type='text'
                      onChange={(event) => dispatch(
                        {type: 'set-first-name', firstName: event.target.value}
                      )}/>
          <CFormFeedback invalid>Must be 2-26 characters long and only consist of alphabetic letters.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput className='form-background form-input'
                      placeholder='ex: Walker'
                      required
                      type='text'
                      onChange={(event) => dispatch(
                        {type: 'set-last-name', lastName: event.target.value}
                      )}/>
          <CFormFeedback invalid>Must be 2-26 characters long and only consist of alphabetic letters.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Country</CFormLabel>
          <CFormSelect className='form-background form-input form-input-cursor'
                       defaultValue=''
                       required
                       onChange={(event) => dispatch(
                         {type: 'set-country', country: event.target.value}
                       )}>
            <option disabled key='' value=''>Choose...</option>
            {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
          </CFormSelect>
          <CFormFeedback invalid>Invalid country selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Gender</CFormLabel>
          <CFormSelect className='form-background form-input form-input-cursor'
                       defaultValue=''
                       required
                       onChange={(event) => dispatch(
                         {type: 'set-gender', gender: event.target.value}
                       )}>
            <option disabled value=''>Choose...</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </CFormSelect>
          <CFormFeedback invalid>Invalid gender selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={12}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Email Address</CFormLabel>
          <CFormInput className='form-background form-input'
                      placeholder='ex: example@email.com'
                      required
                      type='email'
                      onChange={(event) => dispatch(
                        {type: 'set-email', email: event.target.value}
                      )}/>
          <CFormFeedback invalid>Must not consist of a whitespace character before and after @.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Phone Number</CFormLabel>
          <CInputGroup>
            <CFormSelect className='form-background form-select-group form-input-cursor'
                         defaultValue=''
                         required
                         type='tel'
                         onChange={(event) => dispatch(
                           {type: 'set-country-code', countryPhone: event.target.value}
                         )}>
              <option disabled value=''>+</option>
              {Object.values(countries).filter((phoneCode, index) => {
                return Object.values(countries).indexOf(phoneCode) === index;}).sort().map(phoneCode =>
                <option key={phoneCode} value={phoneCode}>{phoneCode}</option>)}
            </CFormSelect>
            <CFormInput className='form-background form-input-group'
                        placeholder='ex: 44521276'
                        required
                        type='tel'
                        onChange={(event) => dispatch(
                          {type: 'set-phone', phone: event.target.value}
                        )}/>
            <CFormFeedback invalid>
              Must be 5-12 characters long and only consist of digits and a valid prefix.
            </CFormFeedback>
          </CInputGroup>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Job Position</CFormLabel>
          {state.redirected ?
            <CFormInput className='form-background form-input'
                        defaultValue={state.jobTitle}
                        plainText
                        readOnly
                        type='text'/> :
            <CFormSelect className='form-background form-input form-input-cursor'
                         defaultValue=''
                         required
                         onChange={(event) => dispatch(
                           {type: 'set-job-position-id', jobPositionId: event.target.value}
                         )}>
              <option disabled value=''>Choose...</option>
              {state.jobPositions.map(jobPosition => <option key={jobPosition.id} value={jobPosition.id}>
                {jobPosition.jobTitle + ' (' + jobPosition.country + ')'}
              </option>)}
            </CFormSelect>}
          <CFormFeedback invalid>Invalid job position selected.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={12}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Resume</CFormLabel>
          <CFormInput accept='.pdf'
                      className='form-background form-input'
                      required
                      type='file'
                      onChange={(event) => dispatch(
                        {type: 'set-resume-file', resumeFile: event.target.files[0]}
                      )}/>
          <CFormFeedback invalid>Invalid resume uploaded.</CFormFeedback>
        </CCol>

        <CCol>
          <CButton className='form-button'
                   shape='rounded-pill'
                   onClick={handleSubmit}>Submit</CButton>
        </CCol>
      </CForm>

      <CModal alignment='center'
              backdrop='static'
              visible={state.visible}>
        <CModalHeader className='modal-background modal-header'
                      closeButton={false}>
          {state.firstName + ' ' + state.lastName}
          <CIcon className='modal-close-icon'
                 icon={cilX}
                 size='xl'
                 onClick={() => window.location.reload()}/>
        </CModalHeader>
        <CModalBody className='modal-background'>Candidate has been successfully added.</CModalBody>
        <CModalFooter className='modal-background'>
          <CButton className='me-2 modal-button'
                   shape='rounded-pill'
                   onClick={() => navigate('/candidate/all')}>View candidates</CButton>
          <CButton className='modal-button'
                   shape='rounded-pill'
                   onClick={() =>
                     navigate('/interview/add', {state: {candidate: state.candidate}})
                   }>Schedule interview</CButton>
        </CModalFooter>
      </CModal>

      <CRow className='mt-3'/>
    </div>
  );
};

export default CandidateForm;
