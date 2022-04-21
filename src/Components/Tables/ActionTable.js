import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import ActionRow from "./ActionRow";


const ActionTable = ({ actions }) => {

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h1 className="profile-name" align="center">Action History</h1>
        <CTable id="candidatesTable" align="middle" className="mb-0 candidatesTable" hover responsive>
          <CTableHead color="transparent">
            <CTableRow className="header-row">
              <CTableHeaderCell className="text-center header-cell">Action</CTableHeaderCell>
              <CTableHeaderCell className="text-center header-cell">Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="transparent" className="table-body">
            {actions.map(action => <ActionRow key={action.id} action={action} /> )}
          </CTableBody>
        </CTable>
      </div>
      </>
  );
};

export default ActionTable;
