import React, {useCallback, useState} from 'react';
import '../../Styles/ProfilePage.css'
import Navbar from '../Utils/Navbar';
import CIcon from '@coreui/icons-react';
import {
  cilArrowCircleLeft,
  cilPhone,
  cilUser, cilUserFemale, cilX
} from '@coreui/icons';
import {cilMail} from '@coreui/icons-pro';
import {countries, genders} from '../Utils/utils';
import {useNavigate} from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CHeader, CInputGroup, CInputGroupText,
  CModal, CModalBody, CModalFooter, CModalHeader,
  CRow
} from '@coreui/react';
import getApiClient from '../../api_client/getApiClient';
import '../../Styles/ViewPage.css';
import '../../Styles/Form.css';

const nameRegex = new RegExp('^[A-Za-z][A-Za-z ]{1,25}$');
const emailRegex = new RegExp('^[^ ]+@[^ ]+$');
const phoneRegex = new RegExp('^\\d{5,12}$');

const ManagerPage = ({manager}) => {
  const navigate = useNavigate();
  const [countryPhone, setCountryPhone] = useState(manager.countryPhone);
  const [email, setEmail] = useState(manager.email);
  const [firstName, setFirstName] = useState(manager.firstName);
  const [gender, setGender] = useState(manager.gender);
  const [lastName, setLastName] = useState(manager.lastName);
  const [phone, setPhone] = useState(manager.phone);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [valid, setValid] = useState(false);

  const editManager = useCallback((event) => {
    event.preventDefault();
    setValid(true);
    if (!countryPhone) return;
    if (!emailRegex.test(email)) return;
    if (!gender) return;
    if (!nameRegex.test(firstName)) return;
    if (!nameRegex.test(lastName)) return;
    if (!phoneRegex.test(phone)) return;
    setEditVisible(false);
    manager.country = countryPhone;
    manager.email = email;
    manager.gender = gender;
    manager.firstName = firstName;
    manager.lastName = lastName;
    manager.phone = phone;
    getApiClient().updateManager(manager);
    setEditVisible(false);
  }, [countryPhone, email, firstName, gender, lastName, manager, phone]);

  const setGenderIcon = () => {
    return manager.gender === 'Male' ? <CIcon className='me-3'
                                             icon={cilUser}/> : <CIcon className='me-3'
                                                                       icon={cilUserFemale}/>;
  }

  const deleteManager = useCallback(() => {
    getApiClient().deleteManager(manager.id);
    setDeleteVisible(false);
    navigate('/manager/all');
  }, [navigate, manager.id]);

  return (
    <>
      <Navbar/>

      <div style={{height: '5px'}}>
        <CIcon className='view-back-button view-back-cursor'
               icon={cilArrowCircleLeft}
               size='xxl'
               onClick={() => {navigate('/manager/all')}}/>
      </div>

      <div className='full-height'>
        <CCard className='m-auto mt-5 mb-5 p-5 view-card'
               style={{borderRadius: '2rem'}}>
          <CCardBody>
            <CRow>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardTitle className='mb-4 fw-bold fs-2 profile-name'>
                  {manager.firstName + ' ' + manager.lastName}
                </CCardTitle>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CCardTitle className='mb-4 fw-bold fs-2 profile-name'>Actions</CCardTitle>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-2'>
                  {setGenderIcon()}
                  {manager.gender}
                </CCardText>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CButton className='view-page-button'
                         shape='rounded-pill'
                         onClick={() => navigate('/interview/add', {state: {manager: manager}})}>
                  Schedule interview
                </CButton>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-2'>
                  <CIcon className='me-3' icon={cilPhone}/>
                  {'+' + manager.countryPhone + manager.phone}
                </CCardText>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CButton className='view-page-button'
                         shape='rounded-pill'
                         onClick={() => setEditVisible(true)}>Edit manager</CButton>
              </CCol>
            </CRow>

            <CRow className='mb-3'>
              <CCol className='position-relative'
                    style={{left: '10%'}}>
                <CCardText className='mb-4'>
                  <CIcon className='me-3'
                         icon={cilMail}/>
                  {manager.email}
                </CCardText>
              </CCol>
              <CCol className='d-sm-flex justify-content-sm-center'>
                <CButton className='view-page-button'
                         shape='rounded-pill'
                         onClick={() => setDeleteVisible(true)}>Delete manager</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <CModal alignment='center'
                backdrop='static'
                className='view-modal'
                size='lg'
                visible={editVisible}>
          <CModalBody className='form-background'>
            <div>
              <CForm validated={valid}>
                <CHeader className='form-background form-title'>Job Form</CHeader>

                <CRow className='mb-3 mt-3'>
                  <CCol>
                    <CFormLabel>First Name</CFormLabel>
                    <CFormInput className='form-background form-input'
                                defaultValue={manager.firstName}
                                placeholder='ex: Software Engineer'
                                required
                                type='text'
                                onChange={(event) => setFirstName(event.target.value)}/>
                    <CFormFeedback invalid>
                      Must be 2-26 characters long and only consist of alphabetic letters.
                    </CFormFeedback>
                  </CCol>

                  <CCol>
                    <CFormLabel>Last Name</CFormLabel>
                    <CFormInput className='form-background form-input'
                                defaultValue={manager.lastName}
                                required
                                type='text'
                                onChange={(event) => setLastName(event.target.value)}/>
                    <CFormFeedback invalid>
                      Must be 2-26 characters long and only consist of alphabetic letters.
                    </CFormFeedback>
                  </CCol>
                </CRow>

                <CRow className='mb-3 mt-3'>
                  <CCol>
                    <CFormLabel>Email</CFormLabel>
                    <CFormInput className='form-background form-input'
                                defaultValue={manager.email}
                                required
                                type='text'
                                onChange={(event) => {setEmail(event.target.value)}}/>
                    <CFormFeedback invalid>
                      Must not consist of a whitespace character before and after @.
                    </CFormFeedback>
                  </CCol>
                </CRow>

                <CRow className='mb-3 mt-3'>
                  <CCol>
                    <CFormLabel>Phone Number</CFormLabel>
                    <CInputGroup>
                      <CFormSelect className='form-background form-select-group form-input-cursor'
                                   defaultValue={manager.countryPhone}
                                   required
                                   type='tel'
                                   onChange={(event) => setCountryPhone(event.target.value)}>
                        <option disabled value=''>+</option>
                        {Object.values(countries).filter((phoneCode, index) => {
                          return Object.values(countries).indexOf(phoneCode) === index;}).sort().map(phoneCode =>
                          <option key={phoneCode} value={phoneCode}>{phoneCode}</option>)}
                      </CFormSelect>
                      <CFormInput className='form-background form-input-group'
                                  defaultValue={manager.phone}
                                  placeholder='ex: 44521276'
                                  required
                                  type='tel'
                                  onChange={(event) => setPhone(event.target.value)}/>
                      <CFormFeedback invalid>
                        Must be 5-12 characters long and only consist of digits and a valid prefix.
                      </CFormFeedback>
                    </CInputGroup>
                  </CCol>

                  <CCol>
                    <CFormLabel>Gender</CFormLabel>
                    <CFormSelect className='form-background form-input form-input-cursor'
                                 defaultValue={manager.gender}
                                 required
                                 onChange={(event) => setGender(event.target.value)}>
                      <option value='' disabled>Choose...</option>
                      {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
                    </CFormSelect>
                    <CFormFeedback invalid>Invalid gender selected.</CFormFeedback>
                  </CCol>
                </CRow>
              </CForm>
            </div>
          </CModalBody>
          <CModalFooter className='form-background'>
            <CButton className='view-form-button me-3'
                     shape='rounded-pill'
                     onClick={() => setEditVisible(false)}>Close</CButton>
            <CButton className='view-form-button'
                     shape='rounded-pill'
                     onClick={editManager}>Confirm</CButton>
          </CModalFooter>
        </CModal>

        <CModal alignment='center'
                backdrop='static'
                visible={deleteVisible}>
          <CModalHeader className='form-background'
                        closeButton={false}>
            {manager.firstName + ' ' + manager.lastName}
            <CIcon className='modal-close-icon'
                   icon={cilX}
                   size='xl'
                   onClick={() => setDeleteVisible(false)}/>
          </CModalHeader>
          <CModalBody className='form-background'>
            Are you sure you want to delete this hiring manager?
          </CModalBody>
          <CModalFooter className='form-background'>
            <CButton className='modal-button'
                     shape='rounded-pill'
                     onClick={deleteManager}>Confirm</CButton>
          </CModalFooter>
        </CModal>
      </div>
    </>
  );
};

export default ManagerPage;
