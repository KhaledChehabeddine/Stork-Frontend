import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import '../../Styles/Table.css'
import CIcon from "@coreui/icons-react";
import {cilTrash} from "@coreui/icons";

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
        <button className="view-button" style={{margin:0, width: "10%", height: "10%", marginRight: "20%", float: "right"}}>
          <CIcon className="view-icon" icon={cilTrash}/>
        </button>
      </CTableDataCell>
    </CTableRow>
  );
};

export default VacancyRow;
