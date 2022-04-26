import React, {useState} from 'react';
import {
  CButton,
  CCollapse,
  CContainer, CForm,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
} from "@coreui/react";
import '../../Styles/LandingPage.css';
import {useNavigate} from "react-router-dom";

const Navbar2 = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  return (
    <CNavbar className='custom-navbar'
             expand="lg">
      <CContainer fluid>
        <CNavbarBrand className='custom-navbar-logo-card me-5'>STOЯK</CNavbarBrand>
        <CNavbarToggler aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}/>
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className='me-auto mb-2 mb-lg-0'>
            <CNavItem>
              <CButton className='custom-inverse-navs-button me-4'>About Us</CButton>
            </CNavItem>
            <CNavItem>
              <CButton className='custom-inverse-navs-button me-4'>Help</CButton>
            </CNavItem>
          </CNavbarNav>
          <CNavbarNav>
            <CForm className='d-flex'>
              <CButton className='custom-navs-button me-4'
                       onClick={() => navigate('/signup')}>Sign-up</CButton>
              <CButton className='custom-navs-button custom-nav-button-inverse'>Log-in</CButton>
            </CForm>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}

export default Navbar2;
