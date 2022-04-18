import React from 'react';
import {CTableDataCell, CTableRow} from "@coreui/react";
import {formatDate} from "../Utils/utils";

const ActionRow = ({ action }) => {
  return (
    <CTableRow className="actions-table-rows">
      <CTableDataCell className="text-center">{action.title}</CTableDataCell>
      <CTableDataCell className="text-center">{formatDate(action.date)}</CTableDataCell>
    </CTableRow>
  );
};

export default ActionRow;
