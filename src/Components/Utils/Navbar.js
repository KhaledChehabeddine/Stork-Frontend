import React, {useCallback} from 'react';
import {
  CButton,
  CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
} from "@coreui/react";
import '../../Styles/Navbar.css';
import {useNavigate} from "react-router-dom";
import {cilChevronBottom, cilHamburgerMenu} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Navbar = () => {
  const navigate = useNavigate();

  const signOutHandler = useCallback(() => {
    window.localStorage.clear();
    navigate('/login');
    window.location.reload();
  }, [navigate]);

  return (
    <CNavbar className='navbar'
             expand='lg'>
      <CContainer fluid>
        <CNavbarBrand className='navbar-logo me-5'
                      href='/'>
          STO
          <span>Я</span>
          K
        </CNavbarBrand>
        <CNavbarToggler/>
        <CNavbarNav className='mb-2 mb-lg-0 me-auto'>
          <CNavItem className='me-3'>
            <CDropdown variant='nav-item'>
              <CDropdownToggle className='navbar-navs-dropdown'
                               caret={false}>
                JOBS
                <CIcon className='ms-sm-1 navbar-navs-dropdown-caret-animation'
                       icon={cilChevronBottom}
                       size='sm'/>
              </CDropdownToggle>
              <CDropdownMenu className='navbar-navs-dropdown-menu'>
                <CDropdownItem className='mt-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/job/add')}>Add job</CDropdownItem>
                <CDropdownItem className='mb-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/job/all')}>View jobs</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>

          <CNavItem className='me-3'>
            <CDropdown variant='nav-item'>
              <CDropdownToggle className='navbar-navs-dropdown'
                               caret={false}>
                CANDIDATES
                <CIcon className='ms-sm-1 navbar-navs-dropdown-caret-animation'
                       icon={cilChevronBottom}
                       size='sm'/>
              </CDropdownToggle>
              <CDropdownMenu className='navbar-navs-dropdown-menu'>
                <CDropdownItem className='mt-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/candidate/add')}>Add candidate</CDropdownItem>
                <CDropdownItem className='mb-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/candidate/all')}>View candidates</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>

          <CNavItem className='me-3'>
            <CDropdown variant='nav-item'>
              <CDropdownToggle className='navbar-navs-dropdown'
                               caret={false}>
                MANAGERS
                <CIcon className='ms-sm-1 navbar-navs-dropdown-caret-animation'
                       icon={cilChevronBottom}
                       size='sm'/>
              </CDropdownToggle>
              <CDropdownMenu className='navbar-navs-dropdown-menu'>
                <CDropdownItem className='mt-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/manager/add')}>Add manager</CDropdownItem>
                <CDropdownItem className='mb-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/manager/all')}>View managers</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>

          <CNavItem className='me-3'>
            <CDropdown variant='nav-item'>
              <CDropdownToggle className='navbar-navs-dropdown'
                               caret={false}>
                INTERVIEWS
                <CIcon className='ms-sm-1 navbar-navs-dropdown-caret-animation'
                       icon={cilChevronBottom}
                       size='sm'/>
              </CDropdownToggle>
              <CDropdownMenu className='navbar-navs-dropdown-menu'>
                <CDropdownItem className='mt-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/interview/add')}>Add interview</CDropdownItem>
                <CDropdownItem className='mb-2 navbar-navs-dropdown-item'
                               onClick={() => navigate('/interview/all')}>View interview</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>
        </CNavbarNav>

        <CNavbarNav className='d-flex'>
          <CDropdown alignment='end'
                     variant='nav-item'>
            <CDropdownToggle className='navbar-navs-dropdown-hamburger'
                             caret={false}>
              <CIcon icon={cilHamburgerMenu} size='xxl'/>
            </CDropdownToggle>
            <CDropdownMenu className='navbar-navs-dropdown-menu'>
              <CDropdownItem className='navbar-navs-dropdown-item'
                             onClick={signOutHandler}>Sign-out</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CNavbarNav>
      </CContainer>
    </CNavbar>
  );
}

export default Navbar;
