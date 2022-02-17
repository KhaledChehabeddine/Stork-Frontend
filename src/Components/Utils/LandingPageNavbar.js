import React from 'react';
import "../../Styles/LandingPageNavbarStyle.css"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPageNavBar = () => {
  return (
    <Navbar className="landing-navbar" style={{marginBottom:"50px"}} expand="lg">
      <Container>
        <Nav color="white" className="landing-navbar-brand">
          <Navbar.Brand as={Link} to="/home">STOЯK</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="landing-navbar-firstlink">
            <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
          </Nav>
          <Nav className="landing-navbar-link link2">
            <Nav.Link as={Link} to="/home">Recruit</Nav.Link>
          </Nav>
          <Nav className="landing-navbar-link link3">
            <Nav.Link as={Link} to="/help">Help</Nav.Link>
          </Nav>
          <Nav style = {{marginLeft:"auto"}} className="landing-navbar-login">
            <Nav.Link as={Link} to="/login">Log In</Nav.Link>
          </Nav>
          <Nav style = {{paddingRight:"60px"}} className="landing-navbar-register">
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default LandingPageNavBar;