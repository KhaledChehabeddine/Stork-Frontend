import React from 'react';
import {CTableDataCell, CTableHeaderCell, CTableRow} from "@coreui/react";

const EmployeeRow = ({ employee }) => {
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{employee.id}</CTableHeaderCell>
      <CTableDataCell>{employee.firstName}</CTableDataCell>
      <CTableDataCell>{employee.lastName}</CTableDataCell>
      <CTableDataCell>{employee.email}</CTableDataCell>
      <CTableDataCell>{employee.jobTitle}</CTableDataCell>
      <CTableDataCell>
        <a href={'https://storkrecruit.herokuapp.com/employee/' + employee.id}>View</a>
      </CTableDataCell>
    </CTableRow>
  );
};

export default EmployeeRow;
