import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {formatDate, getHashCode} from "../Utils/utils";
import {useNavigate} from "react-router-dom";
import Button from "../Utils/Button";
import {cilUser} from "@coreui/icons";

const CandidateRow = ({ candidate }) => {
  const navigate = useNavigate();
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell className="text-center">
        <CIcon icon={cilUser} />
      </CTableDataCell>
      <CTableDataCell>
        <div>{candidate.firstName+' '+candidate.lastName}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">{candidate.email}</CTableDataCell>
      <CTableDataCell className="text-center">{formatDate(candidate.date)}</CTableDataCell>
      <CTableDataCell className="text-center">
        <Button className="view-button" style={{margin:0, padding: "10px"}} onClick={() => navigate(`/candidate/${getHashCode(candidate.id)}`)}>View</Button>
      </CTableDataCell>
    </CTableRow>
  );
};

export default CandidateRow;