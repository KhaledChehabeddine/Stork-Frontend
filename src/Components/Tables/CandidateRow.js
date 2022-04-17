import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import {formatDate, getHashCode} from "../Utils/utils";
import {useNavigate} from "react-router-dom";
import CIcon from "@coreui/icons-react";
import {cilArrowCircleRight} from "@coreui/icons";

const CandidateRow = ({ candidate, candidates}) => {
  const navigate = useNavigate();
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell className="text-center">
        {candidates.indexOf(candidate)+1}
      </CTableDataCell>
      <CTableDataCell>
        <div>{candidate.firstName+' '+candidate.lastName}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">{candidate.email}</CTableDataCell>
      <CTableDataCell className="text-center">{candidate.phone}</CTableDataCell>
      <CTableDataCell className="text-center">{formatDate(candidate.date)}</CTableDataCell>
      <CTableDataCell className="text-center">{candidate.status}</CTableDataCell>
      <CTableDataCell className="text-center">
        <button className="view-button" style={{margin:0, padding: "10px"}} onClick={() => navigate(`/candidate/${getHashCode(candidate.id)}`)}>
          <CIcon className="view-icon" icon={cilArrowCircleRight}/>
        </button>
      </CTableDataCell>
    </CTableRow>
  );
};

export default CandidateRow;