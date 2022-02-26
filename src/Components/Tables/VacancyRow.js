import React from 'react';
import {CTableDataCell, CTableHeaderCell, CTableRow} from "@coreui/react";

const VacancyRow = ({ vacancy, id }) => {
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{vacancy.id}</CTableHeaderCell>
      <CTableDataCell>{vacancy.jobTitle}</CTableDataCell>
      <CTableDataCell>{vacancy.country}</CTableDataCell>
      <CTableDataCell>{vacancy.city}</CTableDataCell>
      <CTableDataCell>
        <a href={`${document.location.origin}/vacancy/post?id=${id}`}>Apply to {vacancy.jobTitle}</a>
      </CTableDataCell>
    </CTableRow>
  );
};

export default VacancyRow;
