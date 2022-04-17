import React from 'react';
import '../../Styles/HamburgerStyle.css'

const menuIsActive = event => {
  event.target.classList.toggle('active');
};

const Hamburger = () => {
  return (
    <div className="dropdown">
      <button onClick={menuIsActive} type="button" className="btn btn-secondary dropdown-toggle hamburger" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="line"/>
        <div className="line"/>
        <div className="line"/>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">Action</a>
      </div>
    </div>
  );
}

export default Hamburger;