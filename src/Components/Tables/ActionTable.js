import React, {useEffect, useReducer} from 'react';
import getApiClient from "../../api_client/getApiClient";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import Spinner from "../Utils/Spinner";
import ActionRow from "./ActionRow";

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-actions':
      return { ...state, actions: action.actions, actionsLoaded: true };
    default:
      return { ...state }
  }
}

const ActionTable = ({ candidate }) => {
  const [state, dispatch] = useReducer(reducer, {
    actions: [],
    actionsLoaded: false
  });

  useEffect(() => {
    getApiClient().getActionsByCandidateId(candidate.id)
      .then(response => {
        dispatch({ type: 'set-actions', actions: response.data });
      }).catch(error => console.log(error));
  }, [candidate]);
  return (
    <>
      {state.actionsLoaded === true
        ?
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h1 align="center">Action History</h1>
          <CTable id="candidatesTable" align="middle" className="mb-0 candidatesTable" hover responsive>
            <CTableHead color="light">
              <CTableRow className="header-row">
                <CTableHeaderCell style={{width: "2%"}}></CTableHeaderCell>
                <CTableHeaderCell className="header-cell">#</CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">Action</CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="table-body">
              {state.actions.map(action => <ActionRow key={action.id} action={action} /> )}
            </CTableBody>
          </CTable>
        </div>
        : <Spinner />}
      </>
  );
};

export default ActionTable;
