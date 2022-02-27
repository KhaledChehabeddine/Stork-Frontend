import React from 'react';
import DefaultProfile from '../../Components/Assets/Profile Picture.png';
import {CAvatar, CTableDataCell, CTableRow} from "@coreui/react";
import {getHashCode} from "../Utils/utils";
import {useNavigate} from "react-router-dom";
import Button from "../Utils/Button";

const CandidateRow = ({ candidate }) => {
  const navigate = useNavigate();
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell className="text-center">
        <CAvatar size="md" src={DefaultProfile}/>
      </CTableDataCell>
      <CTableDataCell>
        <div>{candidate.firstName+' '+candidate.lastName}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">{candidate.email}</CTableDataCell>
      <CTableDataCell className="text-center">{candidate.date}</CTableDataCell>
      <CTableDataCell>
        <Button style={{margin:0, padding: "10px"}} onClick={() => navigate(`/candidate/${getHashCode(candidate.id)}`)}>View</Button>
      </CTableDataCell>
    </CTableRow>
  );
};

export default CandidateRow;