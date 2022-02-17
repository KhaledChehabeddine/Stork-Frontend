import React from 'react';
import '../../Styles/Employee.css';
import Button from '../Utils/Button';
import DefaultProfile from '../../Components/Assets/Profile Picture.png';
import {useNavigate} from "react-router-dom";

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();
  return (
    <div className='card'>
      <div className='card_body'>
        <img className='card_image' src={DefaultProfile} alt='' />
        <h2 className='card_name'>{employee.firstName + ' ' + employee.lastName}</h2>
        <h3 className='card-name'>{employee.id}</h3>
      </div>
      <Button className='button' onClick={() => navigate(`/employee/${employee.id}`)}>View Employee</Button>
    </div>
  );
};

export default EmployeeCard;
