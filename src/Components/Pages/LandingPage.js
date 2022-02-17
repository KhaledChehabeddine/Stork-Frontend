import React from 'react';
import LandingPageNavBar from "../Utils/LandingPageNavbar";
import Jumbotron from "../Utils/Jumbotron";

const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <LandingPageNavBar/>
      <Jumbotron/>
    </div>
    );
}

export default LandingPage;