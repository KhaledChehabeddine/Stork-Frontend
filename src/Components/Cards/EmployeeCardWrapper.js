import React, {useEffect, useReducer, useState} from "react";
import EmployeeCard from "./EmployeeCard";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';

const reducer = (state, action) => {
  switch(action.type) {
    case 'page-loaded':
      return { pageLoaded: true };
    default:
      return { ...state };
  }
}

const EmployeeCardWrapper = () => {
  const [state, dispatch] = useReducer(reducer, {
    pageLoaded: false
  });
  const [employees, setEmployees] = useState([]);
  const getAllEmployees = useEffect(() => {
    getApiClient().getAllEmployees()
      .then(response => {
        setEmployees(response.data);
        dispatch({ type: 'page-loaded' });
      }).catch(error => {console.log(error)});
  }, []);
  return (
    <>
      {state.pageLoaded === true
        ? <div style={{ display: 'flex', flexDirection: 'column'}}>
          <NavBar/>
            <h1 align='center' style={{ padding: '2rem' }}>Employees</h1>
            <div className='card_wrapper'>
              {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
            </div>
          </div>
        : <Spinner />}
    </>
  )
}

export default EmployeeCardWrapper;
