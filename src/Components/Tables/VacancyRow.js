import React from 'react';
import {CTableDataCell, CTableHeaderCell, CTableRow} from "@coreui/react";

const VacancyRow = ({ vacancy }) => {
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{vacancy.id}</CTableHeaderCell>
      <CTableDataCell>{vacancy.jobTitle}</CTableDataCell>
      <CTableDataCell>{vacancy.country}</CTableDataCell>
      <CTableDataCell>{vacancy.city}</CTableDataCell>
      <CTableDataCell>
        <a href={'https://storkrecruit.herokuapp.com/vacancy/' + vacancy.id}>View {vacancy.jobTitle}</a>
      </CTableDataCell>
    </CTableRow>
  );
};

export default VacancyRow;
