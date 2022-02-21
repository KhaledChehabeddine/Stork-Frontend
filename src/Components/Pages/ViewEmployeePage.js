import React, { useCallback, useReducer } from 'react';
import Button from '../Utils/Button';
import getApiClient from "../../api_client/getApiClient";
import {useNavigate} from "react-router-dom";
import Spinner from "../Utils/Spinner";
import Navbar from '../Utils/Navbar';

const reducer = (state, action) => {
  switch(action.type) {
    case 'deleting-employee':
      return { ...state, deletingEmployee: true };
    default:
      return { ...state };
  }
}

const ViewEmployeePage = ({ employee }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    deletingEmployee: false
  });
  const deleteEmployeeHandler = useCallback(() => {
    dispatch({ type: 'deleting-employee' });
    getApiClient().deleteEmployee(employee.id)
      .then(response => {
        navigate('/employee/all');
      }).catch(error => console.log(error));
  }, [navigate, employee]);
  return (
    <>
      <Navbar />
      <div className='form-container'>
        {state.deletingEmployee ? <Spinner />
          :
          <div className='form'>
            <h1>{employee.id}</h1>
            <h1>{employee.firstName + ' ' + employee.lastName}</h1>
            <h1>{employee.email}</h1>
            <h1>{employee.jobTitle}</h1>
            <h1>{employee.phone}</h1>
            <Button onClick={deleteEmployeeHandler}>Delete Employee</Button>
          </div>}
      </div>
    </>
  );
};

export default ViewEmployeePage;
