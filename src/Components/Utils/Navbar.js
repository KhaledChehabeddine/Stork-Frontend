import React, {useCallback} from 'react';
import {Navbar, Container, Nav, Dropdown} from "react-bootstrap";
import '../../Styles/NavbarStyle.css'
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {cilHamburgerMenu} from "@coreui/icons";
import {useNavigate} from "react-router";
import DropdownItem from "react-bootstrap/DropdownItem";
import Background from "./Background";

const NavBar = () => {
  const navigate = useNavigate();

  const signOutHandler = useCallback(() => {
    window.localStorage.clear();
    navigate('/login');
    window.location.reload();
  }, [navigate]);

  return (
    <Navbar className="navbar" sticky="top" style={{backgroundColor:"#2e2e2e",padding:"2%"}} expand="lg">
      <Background styling={'background navbar-background'}/>
      <Container>
        <Nav className="navbar-brand">
          <Navbar.Brand as={Link} to="/home">STOЯK</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-firstlink">
            <Nav.Link as={Link} to="/job/add">Add Job Position</Nav.Link>
          </Nav>
          <Nav className="navbar-link link2">
            <Nav.Link as={Link} to="/job/all">View Job Positions</Nav.Link>
          </Nav>
          <Nav className="navbar-link link3">
            <Nav.Link as={Link} to="/candidate/add">Add Candidate</Nav.Link>
          </Nav>
          <Nav className="navbar-link link4">
            <Nav.Link as={Link} to="/candidate/all">View Candidates</Nav.Link>
          </Nav>
          {/*<Nav style={{marginLeft:"auto"}} className="navbar-profile">*/}
          {/*  <Nav.Link style={{color:"white",width: 100}} as={Link} to="#">Profile</Nav.Link>*/}
          {/*</Nav>*/}
          <Nav style={{marginLeft:"auto", float: "left"}} className="nav-hamburger">
            <Dropdown  align="end" id="dropdown-menu-align-end">
              <Dropdown.Toggle className="hamburger-dropdown">
                <CIcon className="hamburger-icon" icon={cilHamburgerMenu}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <DropdownItem onClick={() => navigate("/aboutus/2")}>About Us</DropdownItem>
                <Dropdown.Divider />
                <Dropdown.Item onClick={signOutHandler}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;