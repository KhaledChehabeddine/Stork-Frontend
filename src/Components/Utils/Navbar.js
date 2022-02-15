import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import '../../Styles/NavbarStyle.css'
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";

const NavBar = () => {
  return (
    <Navbar className="navbar" sticky="top" style={{backgroundColor:"#D9E3FB",marginBottom:"50px"}} expand="lg">
      <Container>
        <Nav className="navbar-brand">
          <Navbar.Brand as={Link} to="/home">STOЯK</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-firstlink">
            <Nav.Link as={Link} to="#">Recruit</Nav.Link>
          </Nav>
          <Nav className="navbar-link link2">
            <Nav.Link as={Link} to="/applicant/all">Applicants</Nav.Link>
          </Nav>
          <Nav className="navbar-link link3">
            <Nav.Link as={Link} to="/employee/all">Employees</Nav.Link>
          </Nav>
          <Nav className="navbar-link link4">
            <Nav.Link as={Link} to="#">Help</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link style={{color:"white",width: 100}} as={Link} to="#">Profile</Nav.Link>
          </Nav>
          <Nav className="nav-hamburger dropdown">
            <div className = "nav-link dropdown-toggle" id = "navbarDropdownMenuLink-4" data-toggle = "dropdown" aria-haspopup="true" aria-expanded="false">
              <Hamburger/>
            </div>
            <div className = "dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
              <Nav.Link className="dropdown-item" href="#">Sign Out</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;