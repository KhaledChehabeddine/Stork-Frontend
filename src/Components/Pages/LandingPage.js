import React, {useCallback} from 'react';
import { Navigate } from 'react-router-dom';
import LandingPageNavBar from "../Utils/LandingPageNavbar";
import Jumbotron from "../Utils/Jumbotron";
import Background from "../Utils/Background";

const LandingPage = () => {
  const isLoggedIn = useCallback(() => {
    return !!window.localStorage.getItem('email');
  }, []);
  return (
    <>
      {isLoggedIn()
        ?
        <Navigate to={'/home'} />
        :
        <div className="landing-page">
          <Background/>
          <LandingPageNavBar/>
          <Jumbotron/>
        </div>}
    </>
    );
}

export default LandingPage;