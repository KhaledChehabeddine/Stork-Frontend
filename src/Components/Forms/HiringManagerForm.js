import React, {useState} from 'react';
import {
  CButton,
  CCol,
  CForm, CFormFeedback,
  CFormInput,
  CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter
} from '@coreui/react';
import {formStyle} from '../Utils/Styles';
import {countries, genders} from '../Utils/utils';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import '../../Styles/Breadcrumbs.css'
import '../../Styles/FormStyle.css'

const nameRegex = new RegExp('^[A-Z][A-Za-z ]{1,25}$');
const emailRegex = new RegExp('^[^ ]+@[^ ]+$');
const phoneRegex = new RegExp('^\\d{5,12}$');

const HiringManagerForm = () => {
  const [countryPhone, setCountryPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState(null);
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValid(true);
  }

  const onSubmit = () => {
    if (!nameRegex.test(firstName)) return;
    if (!nameRegex.test(lastName)) return;
    if (!gender) return;
    if (!emailRegex.test(email)) return;
    if (!phoneRegex.test(phone)) return;
    getApiClient().addManager(firstName, lastName, gender, countryPhone, phone, email)
      .catch(error => console.log(error));
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    window.location.reload(false);
  };

  return (
    <div>
      <NavBar/>

      <h1 className='form-title' align='center'>Hiring Manager Form</h1>

      <CForm className='form row g-3 needs-validation'
             noValidate
             onSubmit={handleSubmit}
             style={formStyle}
             validated={valid}>
        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>First Name</CFormLabel>
          <CFormInput placeholder='ex: Jonathon'
                      required
                      type='text'
                      onChange={(event) => setFirstName(event.target.value)}/>
          <CFormFeedback invalid>Must be 2-26 characters long and only consist of alphabetic letters.</CFormFeedback>
        </CCol>
        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput placeholder='ex: Walker'
                      required
                      type='text'
                      onChange={(event) => setLastName(event.target.value)}/>
          <CFormFeedback invalid>Must be 2-26 characters long and only consist of alphabetic letters.</CFormFeedback>
        </CCol>

        <CCol classname='position-relative'
              md={12}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Email</CFormLabel>
          <CFormInput placeholder='ex: example@email.com'
                      required
                      type='email'
                      onChange={(event) => setEmail(event.target.value)}/>
          <CFormFeedback invalid>Must not consist of a whitespace character before and after @.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={2}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Prefix</CFormLabel>
          <CFormSelect defaultValue=''
                       required
                       onChange={(event) => setCountryPhone(event.target.value)}>
            <option value='' disabled>+</option>
            {Object.values(countries).filter((phoneCode, index) => {
              return Object.values(countries).indexOf(phoneCode) === index;}).sort().map(phoneCode =>
              <option key={phoneCode} value={phoneCode}>{phoneCode}</option>)}
          </CFormSelect>
          <CFormFeedback invalid>Invalid prefix.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Phone Number</CFormLabel>
          <CFormInput placeholder='ex: 78679034'
                      required
                      type='tel'
                      onChange={(event) => setPhone(event.target.value)}/>
          <CFormFeedback invalid>Must be 5 to 12 characters long and only consist of digits.</CFormFeedback>
        </CCol>

        <CCol classname='position-relative'
              md={4}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Gender</CFormLabel>
          <CFormSelect defaultValue=''
                       required
                       onChange={(event) => setGender(event.target.value)}>
            <option value='' disabled>Choose...</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </CFormSelect>
          <CFormFeedback invalid>Invalid Gender.</CFormFeedback>
        </CCol>

        <CCol xs={12}>
          <center>
            <CButton color='dark'
                     type='submit'
                     onClick={onSubmit}>Submit</CButton>
          </center>
        </CCol>
      </CForm>

      <CModal alignment='center'
              visible={visible}
              onClose={onClose}>
        <CModalBody>Hiring manager successfully added.</CModalBody>
        <CModalFooter>
          <CButton color='info'
                   onClick={onClose}>Close</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default HiringManagerForm;
