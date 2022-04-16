import React, { useCallback } from 'react';
import Button from '../Utils/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from "../Utils/Navbar";
import '../../Styles/Breadcrumbs.css'

const Home = () => {
  const navigate = useNavigate();
  const signOutHandler = useCallback(() => {
    window.localStorage.clear();
    navigate('/login');
    window.location.reload();
  }, [navigate]);
  return (
    <div align='center' id='home'>
      <NavBar/>
      <div className="form-header" style={{ marginTop:"50px"}}>
        <h1>Welcome {window.localStorage.getItem('username')}!</h1>
      </div>
      <div> 
        <div style={{display: "flex"}}>
          <div style={{width: "50%"}}>
          <p>
            1a
          </p>
          </div>
          <div style={{width: "50%"}}>
          <p>
            1b
          </p>
          </div>
        </div>

        <div>
          <p>
            2
          </p>
        </div>

        <div>
          <p>
            3
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
