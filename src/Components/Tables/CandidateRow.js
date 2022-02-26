import React from 'react';
import DefaultProfile from '../../Components/Assets/Profile Picture.png';
import {CAvatar, CTableDataCell, CTableHeaderCell, CTableRow} from "@coreui/react";

const CandidateRow = ({ candidate }) => {
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell className="text-center">
        <CAvatar size="md" src={DefaultProfile}/>
      </CTableDataCell>
      <CTableDataCell>
        <div>{candidate.firstName+' '+candidate.lastName}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">{candidate.email}</CTableDataCell>
      <CTableDataCell>
        <a href={'https://storkrecruit.herokuapp.com/candidate/' + candidate.id}>View</a>
      </CTableDataCell>
    </CTableRow>
  );
};

export default CandidateRow;