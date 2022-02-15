import React from 'react';
import '../../Styles/HamburgerStyle.css'

const Hamburger = () => {
  return (
    <>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" id = "navbarDropdownMenu" href='#' />
      </li>
      <div className="hamburger">
        <div className="burger burger1" />
        <div className="burger burger2" />
        <div className="burger burger3" />
      </div>
    </>
  );
}

export default Hamburger;