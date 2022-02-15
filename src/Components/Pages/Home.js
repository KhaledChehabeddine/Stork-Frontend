import React from 'react';
import Button from '../Utils/Button';
import { useNavigate } from 'react-router-dom';
import NavBar from "../Utils/Navbar";

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div align='center' id='home'>
      <NavBar/>
      <h1>Welcome home!</h1>
      <Button onClick={() => { navigate('/employee/add') }}>Add Employees</Button>
      <Button onClick={() => { navigate('/employee/all') }}>View Employees</Button>
      <Button onClick={() => { navigate('/applicant/add') }}>Add Applicants</Button>
      <Button onClick={() => { navigate('/applicant/all') }}>View Applicants</Button>
    </div>
  );
};

export default Home;
