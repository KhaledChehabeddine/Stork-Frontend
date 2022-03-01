import React, { useCallback } from 'react';
import Button from '../Utils/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from "../Utils/Navbar";

const Home = (props) => {
  const navigate = useNavigate();
  const signOutHandler = useCallback(() => {
    window.localStorage.clear();
    navigate('/login');
    window.location.reload();
  }, [navigate]);
  return (
    <div align='center' id='home'>
      <NavBar/>
      <div className="form-header">
        <h1>Welcome {window.localStorage.getItem('username')}!</h1>
      </div>
      <Button onClick={() => { navigate('/candidate/add') }}>Add Candidate</Button>
      <Button onClick={() => { navigate('/candidate/all') }}>View Candidates</Button>
      <Button onClick={() => { navigate('/interview/schedule') }}>Schedule an interview</Button>
      <Button onClick={() => { navigate('/vacancy/post') }}>Post Vacancy</Button>
      <Button onClick={() => { navigate('/vacancy/all') }}>View Vacancies</Button>
      <Button onClick={signOutHandler}>Sign out</Button>
    </div>
  );
};

export default Home;
