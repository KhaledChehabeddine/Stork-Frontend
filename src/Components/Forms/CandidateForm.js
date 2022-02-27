import React, {useCallback, useState} from 'react';
import getApiClient from '../../api_client/getApiClient';
import {useNavigate} from 'react-router-dom';
import NavBar from '../Utils/Navbar';
import {
  CButton,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react';
import Header from '../Utils/Header';
import {candidateForm} from '../Utils/Styles';

const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina',
  'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
  'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo',
  'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus',
  'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji',
  'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany',
  'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea',
  'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
  'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands',
  'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway',
  'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russia', 'Rwanda',
  'Saint Pierre and Miquelon', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
  'St Kitts and Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden',
  'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L\'Este', 'Togo', 'Tonga',
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos', 'Uganda', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam',
  'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];
const sexes = ['Male', 'Female'];

const CandidateForm = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(null);
  const [sex, setSex] = useState(null);
  const [phone, setPhone] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } setValid(true);
  };

  const onSubmit = useCallback( () => {
    const nameRegex = new RegExp('^[A-Za-z]{2,26}$');
    const emailRegex = new RegExp('^[^ ].+@[^ ].+$');
    const phoneRegex = new RegExp('^\\d{10}$');
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) return;
    if (!emailRegex.test(email)) return;
    if (!country) return;
    if (!sex) return;
    if (!phoneRegex.test(phone)) return;
    if (!resume) return;
    getApiClient().addCandidate(firstName, lastName, email, phone, country, sex)
      .then(response => {
        getApiClient().addResume(resume, response.data.id)
          .then(response => {
            console.log(response.data);
          }).catch(error => console.log(error));
        alert('Your application has been successfully submitted!');
      }).catch(error => console.log(error));
    navigate('/home');
  }, [firstName, lastName, email, phone, country, sex, resume, navigate]);

  return (
    <div>
      <NavBar />
      <Header text='Candidate Form'/>
      <CForm
        className='row g-3 needs-validation'
        noValidate
        validated={valid}
        onSubmit={handleSubmit}
        style={candidateForm}
        encType="multipart/form-data"
      >
        <legend className='text-center' style={{fontWeight: 'bold'}}>Thank you for applying!</legend>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer01'>First Name</CFormLabel>
          <CFormInput type='text' placeholder='ex: Jonathon' id='validationServer01' required
                      onChange={(event) => {setFirstName(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid first name</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer02'>Last Name</CFormLabel>
          <CFormInput type='text' placeholder='ex: Walker' id='validationServer02' required
                      onChange={(event) => {setLastName(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid last name</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer05'>Country</CFormLabel>
          <CFormSelect id='validationServer05' required
                       onChange={(event) => {setCountry(event.target.value)}}
          >
            <option selected disabled value=''>Choose...</option>
            {countries.map(country => <option key={country}>{country}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid country</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={6} className="position-relative">
          <CFormLabel htmlFor='validationServer06'>Sex</CFormLabel>
          <CFormSelect id='validationServer06' required
                       onChange={(event) => {setSex(event.target.value)}}
          >
            <option selected disabled value=''>Choose...</option>
            {sexes.map(sex => <option key={sex}>{sex}</option>)}
          </CFormSelect>
          <CFormFeedback tooltip invalid>Invalid sex</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={7} className="position-relative">
          <CFormLabel htmlFor='validationServer03'>Email Address</CFormLabel>
          <CFormInput type='email' placeholder='ex: example@email.com' id='validationServer03' required
                      onChange={(event) => {setEmail(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid email address</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={5} className="position-relative">
          <CFormLabel htmlFor='validationServer04'>Phone Number</CFormLabel>
          <CFormInput type='tel' placeholder='ex: 1234567890' id='validationServer04' required
                      onChange={(event) => {setPhone(event.target.value)}}
          />
          <CFormFeedback tooltip invalid>Invalid phone number</CFormFeedback>
        </CCol>
        <CCol style={{marginBottom: "0.7rem"}} md={12} className="position-relative">
          <CFormLabel htmlFor='validationServer07'>Resume</CFormLabel>
          <CFormInput type='file' id='validationServer07' accept='.pdf' aria-label='file example' required
                      onChange={(event) => {setResume(event.target.files[0])}}
          />
          <CFormFeedback tooltip invalid>Invalid resume</CFormFeedback>
        </CCol>
        <CCol xs={12}>
          <center><CButton color='dark' type='submit' onClick={onSubmit}>Submit</CButton></center>
        </CCol>
      </CForm>
    </div>
  );
}

export default CandidateForm;
