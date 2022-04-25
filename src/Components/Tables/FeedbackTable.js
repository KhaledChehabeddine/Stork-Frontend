import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import FeedbackRow from "./FeedbackRow";

const FeedbackTable = ({ feedbacks }) => {

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <CTable id="candidatesTable" align="middle" className="mb-0 candidatesTable" hover responsive>
          <CTableHead color="transparent">
            <CTableRow className="header-row">
              <CTableHeaderCell className="text-center header-cell">Notes</CTableHeaderCell>
              <CTableHeaderCell className="text-center feedback-cell">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="transparent" className="table-body">
            {feedbacks.map(action => <FeedbackRow feedback={action} /> )}
          </CTableBody>
        </CTable>
      </div>
    </>
  );
};

export default FeedbackTable;
