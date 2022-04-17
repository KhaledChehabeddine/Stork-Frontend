import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import '../../Styles/Table.css'

const VacancyRow = ({ vacancy, vacancies}) => {
  return (
    <CTableRow className="table-row" v-for="item in tableItems">
      <CTableDataCell className="text-center">
        {vacancies.indexOf(vacancy)+1}
      </CTableDataCell>
      <CTableDataCell>{vacancy.jobTitle}</CTableDataCell>
      <CTableDataCell>{vacancy.country}</CTableDataCell>
      <CTableDataCell>{vacancy.city}</CTableDataCell>
      <CTableDataCell>
      </CTableDataCell>
    </CTableRow>
  );
};

export default VacancyRow;
