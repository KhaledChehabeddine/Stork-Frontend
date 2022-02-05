import React from 'react';
import Button from '../Utils/Button';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div align='center' id='home'>
      <h1>Welcome home!</h1>
      <Button onClick={() => { navigate('/employee/add') }}>Add Employees</Button>
      <Button onClick={() => { navigate('/employee/all') }}>View Employees</Button>
    </div>
  );
};

export default Home;
