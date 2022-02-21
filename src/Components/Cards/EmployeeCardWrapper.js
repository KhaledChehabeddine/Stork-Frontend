import React, {useEffect, useReducer, useState} from "react";
import EmployeeCard from "./EmployeeCard";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {Breadcrumb} from "react-bootstrap";

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
  // eslint-disable-next-line
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
          <Breadcrumb className="form-breadcrumb">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/employees">Employees</Breadcrumb.Item>
            <Breadcrumb.Item active>View Employees</Breadcrumb.Item>
          </Breadcrumb>
            <h1 className="form-header" style={{ padding: '1rem' }}>All Employees</h1>
            <div className='card_wrapper'>
              {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
            </div>
          </div>
        : <Spinner />}
    </>
  )
}

export default EmployeeCardWrapper;
