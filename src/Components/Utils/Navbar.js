import React, {useCallback} from 'react';
import {Navbar, Container, Nav, Dropdown, NavDropdown} from "react-bootstrap";
import '../../Styles/NavbarStyle.css'
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {cilHamburgerMenu} from "@coreui/icons";
import {useNavigate} from "react-router";
import DropdownItem from "react-bootstrap/DropdownItem";

const NavBar = () => {
  const navigate = useNavigate();

  const signOutHandler = useCallback(() => {
    window.localStorage.clear();
    navigate('/login');
    window.location.reload();
  }, [navigate]);

  return (
    <Navbar className="navbar" sticky="top" style={{backgroundColor:"#2e2e2e",padding:"2%"}} expand="lg">
      <Container>
        <Nav className="navbar-brand">
          <Navbar.Brand as={Link} to="/home">STOЯK</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-firstlink">
            <NavDropdown title="Job Positions" id="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-item" onClick={() => navigate("/job/add")}><h1 className="navbar-item">Add Job Position</h1></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="navbar-item" onClick={() => navigate("/job/all")}><h1 className="navbar-item">View Job Positions</h1></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="navbar-link link2">
            <NavDropdown title="Candidates" id="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-item" onClick={() => navigate("/candidate/add")}><h1 className="navbar-item">Add Candidate</h1></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="navbar-item" onClick={() => navigate("/candidate/all")}><h1 className="navbar-item">View Candidates</h1></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="navbar-link link3">
            <NavDropdown title="Managers" id="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-item" onClick={() => navigate("/manager/add")}><h1 className="navbar-item">Add Manager</h1></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="navbar-item" onClick={() => navigate("/manager/all")}><h1 className="navbar-item">View Managers</h1></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="navbar-link link4">
            <Nav.Link as={Link} to="/interview/all">Interviews</Nav.Link>
          </Nav>
          <Nav style={{marginLeft:"auto", float: "left"}} className="nav-hamburger">
            <Dropdown  align="end" id="dropdown-menu-align-end">
              <Dropdown.Toggle className="hamburger-dropdown">
                <CIcon className="hamburger-icon" icon={cilHamburgerMenu}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <DropdownItem className="navbar-item" onClick={() => navigate("/aboutus/2")}><h1 className="navbar-item">About Us</h1></DropdownItem>
                <Dropdown.Divider />
                <Dropdown.Item className="navbar-item" onClick={signOutHandler}><h1 className="navbar-item">Sign Out</h1></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;