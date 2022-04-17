import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import '../../Styles/NavbarStyle.css'
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";

const NavBar = () => {
  return (
    <Navbar className="navbar" sticky="top" style={{backgroundColor:"#2e2e2e",marginBottom:"5px"}} expand="lg">
      <Container>
        <Nav className="navbar-brand">
          <Navbar.Brand as={Link} to="/home">STOЯK</Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-firstlink">
            <Nav.Link as={Link} to="/candidate/all">Candidates</Nav.Link>
          </Nav>
          <Nav className="navbar-link link2">
            <Nav.Link as={Link} to="/vacancy/all">Vacancies</Nav.Link>
          </Nav>
          <Nav className="navbar-link link4">
            <Nav.Link as={Link} to="#">Help</Nav.Link>
          </Nav>
          <Nav style={{marginLeft:"auto"}} className="navbar-profile">
            <Nav.Link style={{color:"white",width: 100}} as={Link} to="#">Profile</Nav.Link>
          </Nav>
          <Nav className="nav-hamburger">
              <Hamburger />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;