import React, {useState} from 'react';
import {
  CButton,
  CCol,
  CForm, CFormFeedback,
  CFormInput,
  CFormLabel, CFormSelect, CHeader, CInputGroup, CModal, CModalBody, CModalFooter, CRow
} from '@coreui/react';
import {countries, genders} from '../Utils/utils';
import getApiClient from '../../api_client/getApiClient';
import NavBar from '../Utils/Navbar';
import {useData} from "../../Context/Use";
import {useNavigate} from "react-router-dom";
import '../../Styles/Breadcrumbs.css'
import '../../Styles/Form.css'

const nameRegex = new RegExp('^[A-Z][A-Za-z ]{1,25}$');
const emailRegex = new RegExp('^[^ ]+@[^ ]+$');
const phoneRegex = new RegExp('^\\d{5,12}$');

const ManagerForm = () => {
  const { values: { managers }, actions: { setManagers } } = useData();
  const [countryPhone, setCountryPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState(null);
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [valid, setValid] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setVisible(false);
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValid(true);
    if (!countryPhone) return;
    if (!emailRegex.test(email)) return;
    if (!gender) return;
    if (!nameRegex.test(firstName)) return;
    if (!nameRegex.test(lastName)) return;
    if (!phoneRegex.test(phone)) return;
    getApiClient().addManager(firstName, lastName, gender, countryPhone, phone, email)
      .then(response => {
        if (response.status === 200) {
          managers.add(response.data);
          setManagers(managers);
        }
      }).catch(error => console.log(error));
    setVisible(true);
  };

  return (
    <div>
      <NavBar/>
      <CForm className='form form-background g-3 row'
             validated={valid}>

        <CHeader className='form-background form-title'>Hiring Manager Form</CHeader>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>First Name</CFormLabel>
          <CFormInput className='form-background form-input'
                      placeholder='ex: Jonathon'
                      required
                      type='text'
                      onChange={(event) => setFirstName(event.target.value)}/>
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
                      onChange={(event) => setLastName(event.target.value)}/>
          <CFormFeedback invalid>Must be 2-26 characters long and only consist of alphabetic letters.</CFormFeedback>
        </CCol>

        <CCol classname='position-relative'
              md={12}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Email</CFormLabel>
          <CFormInput className='form-background form-input'
                      placeholder='ex: example@email.com'
                      required
                      type='email'
                      onChange={(event) => setEmail(event.target.value)}/>
          <CFormFeedback invalid>Must not consist of a whitespace character before and after @.</CFormFeedback>
        </CCol>

        <CCol className='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Phone Number</CFormLabel>
          <CInputGroup>
            <CFormSelect className='form-background form-select-group'
                         defaultValue=''
                         required
                         type='tel'
                         onChange={(event) => setCountryPhone(event.target.value)}>
              <option disabled value=''>+</option>
              {Object.values(countries).filter((phoneCode, index) => {
                return Object.values(countries).indexOf(phoneCode) === index;}).sort().map(phoneCode =>
                <option key={phoneCode} value={phoneCode}>{phoneCode}</option>)}
            </CFormSelect>
            <CFormInput className='form-background form-input-group'
                        placeholder='ex: 44521276'
                        required
                        type='tel'
                        onChange={(event) => setPhone(event.target.value)}/>
            <CFormFeedback invalid>
              Must be 5-12 characters long and only consist of digits and a valid prefix.
            </CFormFeedback>
          </CInputGroup>
        </CCol>

        <CCol classname='position-relative'
              md={6}
              style={{marginBottom: '1rem'}}>
          <CFormLabel>Gender</CFormLabel>
          <CFormSelect className='form-background form-input'
                       defaultValue=''
                       required
                       onChange={(event) => setGender(event.target.value)}>
            <option value='' disabled>Choose...</option>
            {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
          </CFormSelect>
          <CFormFeedback invalid>Invalid gender selected.</CFormFeedback>
        </CCol>

        <CCol>
          <CButton className='form-button'
                   shape='rounded-pill'
                   onClick={handleSubmit}>Submit</CButton>
        </CCol>
      </CForm>

      <CModal alignment='center'
              visible={visible}
              onClose={handleClose}>
        <CModalBody>{firstName + ' ' + lastName + ' successfully added.'}</CModalBody>
        <CModalFooter>
          <button className="form-button"
                   onClick={() => {navigate("/manager/all"); window.location.reload();}}>Close</button>
        </CModalFooter>
      </CModal>

      <CRow className='mt-3'/>
    </div>
  );
}

export default ManagerForm;
