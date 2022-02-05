import React from "react";
import '../../Styles/Employee.css';
import Button from "../Utils/Button";

const EmployeeCard = ({ employee }) => {
  return (
    <div className='card'>
      <div className='card_body'>
        <img className='card_image' src={employee.imageUrl} alt='' />
        <h2 className='card_name'>{employee.name}</h2>
      </div>
      <Button className='button' onClick={() => alert('Feature not implemented yet')}>View Employee</Button>
    </div>
  );
};

export default EmployeeCard;
