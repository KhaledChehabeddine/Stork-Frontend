import React, {useEffect, useReducer, useState} from "react";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {Breadcrumb} from "react-bootstrap";
import EmployeeRow from "../Tables/EmployeeRow";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import {tableStyle} from "../Utils/Styles";

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
      <NavBar/>
      {state.pageLoaded === true
        ? <div style={{ display: 'flex', flexDirection: 'column'}}>
          <Breadcrumb className="form-breadcrumb">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Employees</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="form-header" style={{ padding: '1%' }}>Employees</h1>
          <div>
            <CTable style={tableStyle}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {employees.map(employee => <EmployeeRow key={employee.id} employee={employee} />)}
              </CTableBody>
            </CTable>
          </div>
        </div>
        : <Spinner />}
    </>
  )
}

export default EmployeeCardWrapper;
