import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import {formatDate} from "../Utils/utils";

var index = 1;

const ActionRow = ({ action }) => {
  return (
    <CTableRow>
      <CTableDataCell></CTableDataCell>
      <CTableDataCell>{index++ / 2}</CTableDataCell>
      <CTableDataCell className="text-center">{action.title}</CTableDataCell>
      <CTableDataCell className="text-center">{formatDate(action.date)}</CTableDataCell>
    </CTableRow>
  );
};

export default ActionRow;
