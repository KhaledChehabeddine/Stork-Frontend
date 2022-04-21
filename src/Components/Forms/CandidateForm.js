import React, {useCallback, useEffect, useReducer} from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect, CModal, CModalBody, CModalFooter
} from '@coreui/react';
import {countries, genders} from '../Utils/utils';
import {formStyle} from '../Utils/Styles';
import {useNavigate} from 'react-router-dom';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import '../../Styles/Breadcrumbs.css'
import '../../Styles/FormStyle.css'

const emailRegex = new RegExp('^[^ ]+@[^ ]+$');
const nameRegex = new RegExp('^[A-Z][A-Za-z ]{1,25}$');
const phoneRegex = new RegExp('^\\d{5,12}$');

const initialState = {
  country: null,
  countryPhone: null,
  email: '',
  firstName: '',
  gender: null,
  jobPosition: null,
  jobPositions: [],
  lastName: '',
  pageLoaded: false,
  phone: '',
  resumeFile: null,
  valid: false,
  visible: false
};

const reducer = (state, action) => {
  switch(action.type) {
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
    case 'set-job-position':
      return {...state, jobPosition: action.jobPosition};
    case 'set-last-name':
      return {...state, lastName: action.lastName};
    case 'page-loaded':
      return {...state, jobPositions: action.jobPositions, pageLoaded: action.pageLoaded};
    case 'set-phone':
      return {...state, phone: action.phone};
    case 'set-resume-file':
      return {...state, resumeFile: action.resumeFile};
    case 'set-valid':
      return {...state, valid: true};
    case 'set-visible':
      return {...state, visible: action.visible};
    default:
      return {...state};
  }
};

const CandidateForm = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getApiClient().getAllVacancies().then(job_positions =>
      dispatch({
        type: 'page-loaded',
        jobPositions: job_positions.data
      })
    ).catch(error => console.log(error))
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    dispatch({type: 'set-valid'});
  }

  const onClose = useCallback(() => {
    dispatch({type: 'set-visible', visible: false})
    navigate('/interview/add');
  }, [navigate]);

  const onSubmit = useCallback( (event) => {
    event.preventDefault();
    if (!nameRegex.test(state.firstName)) return;
    if (!nameRegex.test(state.lastName)) return;
    if (!state.country) return;
    if (!state.countryPhone) return;
    if (!state.gender) return;
    if (!emailRegex.test(state.email)) return;
    if (!phoneRegex.test(state.phone)) return;
    if (!state.jobPosition) return;
    if (!state.resumeFile) return;
    getApiClient().addCandidate(state.firstName, state.lastName, state.country, state.countryPhone,
                                state.gender, state.email, state.phone, state.jobPosition, 'Pending')
      .then(response => {
          getApiClient().addResume(response.data.id, state.resumeFile).catch(error => console.log(error));
          getApiClient().addAction('Resume received', response.data.id).catch(error => console.log(error));
        }
      ).catch(error => console.log(error));
    dispatch({type: 'set-visible', visible: true});
  }, [state.firstName, state.lastName, state.country, state.countryPhone, state.gender,
            state.email, state.phone, state.jobPosition, state.resumeFile]);

  return (
    <div>
      <NavBar/>

      <h1 className='form-title' align='center'>Candidate Form</h1>

      <CForm
        className='form row g-3 needs-validation'
        encType='multipart/form-data'
        noValidate
        onSubmit={handleSubmit}
        style={formStyle}
        validated={state.valid}>
        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer01'>First Name</CFormLabel>
          <CFormInput
            id='validationServer01'
            type='text'
            placeholder='ex: Jonathon'
            required
            onChange={(event) => dispatch(
              {type: 'set-first-name', firstName: event.target.value}
            )}/>
          <CFormFeedback tooltip invalid>Invalid first name</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem', backgroundColor:"transparent"}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer02'>Last Name</CFormLabel>
          <CFormInput
            id='validationServer02'
            type='text'
            placeholder='ex: Walker'
            required
            onChange={(event) => dispatch(
              {type: 'set-last-name', lastName: event.target.value}
            )}/>
          <CFormFeedback tooltip invalid>Invalid last name</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer05'>Country</CFormLabel>
          <CFormSelect
            id='validationServer05'
            defaultValue={''}
            required
            onChange={(event) => dispatch(
              {type: 'set-country', country: event.target.value}
            )}>
            <option key='' value='' disabled>Choose...</option>
            <option key='Iraq' value='Iraq'>Iraq</option>
            <option key='Jordan' value='Jordan'>Jordan</option>
            <option key='Lebanon' value='Lebanon'>Lebanon</option>
            <option key='United Arab Emirates' value='United Arab Emirates'>United Arab Emirates</option>
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid country</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer06'>Gender</CFormLabel>
          <CFormSelect
            id='validationServer06'
            defaultValue={''}
            required
            onChange={(event) => dispatch(
              {type: 'set-gender', gender: event.target.value}
            )}>
            <option value='' disabled>Choose...</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid gender</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={6} className='position-relative'>
          <CFormLabel htmlFor='validationServer03'>Email Address</CFormLabel>
          <CFormInput
            id='validationServer03'
            type='email'
            placeholder='ex: example@email.com'
            required
            onChange={(event) => dispatch(
              {type: 'set-email', email: event.target.value}
            )}/>
          <CFormFeedback tooltip invalid>Invalid email address</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={2} className='position-relative'>
          <CFormLabel htmlFor='validationServer03'>Prefix</CFormLabel>
          <CFormSelect
            id='validationServer03'
            type='tel'
            defaultValue={''}
            required
            onChange={(event) => dispatch(
              {type: 'set-country-code', countryPhone: event.target.value}
            )}>
            <option value='' disabled>+</option>
            {Object.values(countries).filter((phoneCode, index) => {
                return Object.values(countries).indexOf(phoneCode) === index;}).sort().map(phoneCode =>
              <option key={phoneCode} value={phoneCode}>{phoneCode}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid prefix</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={4} className='position-relative'>
          <CFormLabel htmlFor='validationServer04'>Phone Number</CFormLabel>
          <CFormInput
            id='validationServer04'
            type='tel'
            placeholder='ex: 44521276'
            required
            onChange={(event) => dispatch(
              {type: 'set-phone', phone: event.target.value}
            )}/>
          <CFormFeedback tooltip invalid>Invalid phone number</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={12} className='position-relative'>
          <CFormLabel htmlFor='validationServer07'>Job Position</CFormLabel>
          <CFormSelect
            id='validationServer07'
            defaultValue={''}
            required
            onChange={(event) => dispatch(
              {type: 'set-job-position', jobPosition: event.target.value}
            )}>
            <option value='' disabled>Choose...</option>
            {state.jobPositions.map(jobPosition => <option key={jobPosition.id} value={jobPosition.id}>
              {jobPosition.jobTitle + ' (' + jobPosition.country + ')'}
            </option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid job position</CFormFeedback>
        </CCol>

        <CCol style={{marginBottom: '1rem'}} md={12} className='position-relative'>
          <CFormLabel htmlFor='validationServer08'>Resume</CFormLabel>
          <CFormInput
            id='validationServer08'
            type='file'
            accept='.pdf'
            required
            onChange={(event) => {dispatch(
                {type: 'set-resume-file', resumeFile: event.target.files[0]}
              )
            }}/>
          <CFormFeedback tooltip invalid>Invalid resume</CFormFeedback>
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

      <CModal alignment='center'
              visible={state.visible}
              onClose={onClose}>
        <CModalBody>
          {state.firstName + ' ' + state.lastName + ' has been successfully added.'}
        </CModalBody>
        <CModalFooter>
          <CButton color='info'
                   onClick={onClose}>Close</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default CandidateForm;
