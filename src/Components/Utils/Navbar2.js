import React, {useCallback, useState} from 'react';
import {
  CButton, CCollapse,
  CContainer,
  CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem
} from '@coreui/react';
import {cilHamburgerMenu} from '@coreui/icons';
import {useNavigate} from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import '../../Styles/NavbarStyle.css'

const NavBar2 = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const signOutHandler = useCallback(() => {
    window.localStorage.clear();
    navigate('/login');
    window.location.reload();
  }, [navigate]);

  return (
    <CNavbar expand='lg' colorScheme='dark' className='bg-dark'>
      <CContainer fluid>
        <CNavbarToggler
          aria-label='Toggle navigation'
          aria-expanded={visible}
          onClick={() => setVisible(!visible)}
        />
        <CNavbarBrand href='/home'>STOЯK</CNavbarBrand>
        <CCollapse className='navbar-collapse' visible={visible}>
          <CNavbarNav className='me-auto mb-2 mb-lg-0'>
            <CNavItem>
              <CDropdown dark variant='nav-item'>
                <CDropdownToggle>Candidates</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href='/candidate/add'>Add Candidate</CDropdownItem>
                  <CDropdownDivider/>
                  <CDropdownItem href='/candidate/all'>View Candidates</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavItem>
            <CNavItem>
              <CDropdown dark variant='nav-item'>
                <CDropdownToggle>Job Positions</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href='/vacancy/add'>Add Job Position</CDropdownItem>
                  <CDropdownDivider/>
                  <CDropdownItem href='/vacancy/all'>View Job Positions</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavItem>
          </CNavbarNav>
          <CNavbarNav>
            <CForm className='d-flex'>
              <CButton
                type='button'
                color='light'
                variant='outline'
                href='#'
                className='me-2'>Profile</CButton>
            </CForm>
          </CNavbarNav>
          <CNavbarNav>
            <CForm className='d-flex'>
              <CDropdown dark variant='nav-item'>
                <CDropdownToggle>
                  <CIcon icon={cilHamburgerMenu} size='xxl'/>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={signOutHandler}>Sign out</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CForm>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}
export default NavBar2;
