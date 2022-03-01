import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilUser} from "@coreui/icons";

const VacancyRow = ({ vacancy, id }) => {
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell className="text-center">
        <CIcon icon={cilUser} />
      </CTableDataCell>
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
