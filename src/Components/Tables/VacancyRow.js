import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilBriefcase} from "@coreui/icons";
import '../../Styles/CandidateTable.css'
import Button from "../Utils/Button";

const VacancyRow = ({ vacancy, id }) => {
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell className="text-center">
        <CIcon icon={cilBriefcase} />
      </CTableDataCell>
      <CTableDataCell>{vacancy.jobTitle}</CTableDataCell>
      <CTableDataCell>{vacancy.country}</CTableDataCell>
      <CTableDataCell>{vacancy.city}</CTableDataCell>
      <CTableDataCell>
        <Button className="view-button" style={{margin:0, padding: "10px"}} href={`${document.location.origin}/vacancy/post?id=${id}`}>Apply to {vacancy.jobTitle}</Button>
      </CTableDataCell>
    </CTableRow>
  );
};

export default VacancyRow;
