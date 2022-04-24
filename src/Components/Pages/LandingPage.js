import React, {useCallback} from 'react';
import { Navigate } from 'react-router-dom';
import LandingPageNavBar from "../Utils/LandingPageNavbar";
import Jumbotron from "../Utils/Jumbotron";

const LandingPage = (props) => {
  const isLoggedIn = useCallback(() => {
    if (window.localStorage.getItem('email')) return true; else return false;
  }, []);
  return (
    <>
      {isLoggedIn()
        ?
        <Navigate to={'/home'} />
        :
        <div className="landing-page">
          <LandingPageNavBar/>
          <Jumbotron/>
        </div>}
    </>
    );
}

export default LandingPage;