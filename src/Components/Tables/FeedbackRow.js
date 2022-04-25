import React, {useCallback, useState} from 'react';
import {CModal, CModalBody, CModalFooter, CTableDataCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilArrowCircleRight, cilTrash} from "@coreui/icons";
import getApiClient from "../../api_client/getApiClient";

const FeedbackRow = ({ feedback }) => {
  const [visible, setVisible] = useState();

  const deleteFeedback = useCallback((feedback) => {
    feedback.preventDefault();
    getApiClient().deleteFeedbackByCandidateId(feedback.candidateID)
      .then(r => console.log(r))
      .catch(error => console.log(error));
    setVisible(false);
    window.location.reload();
  }, [feedback]);

  return (
    <>
      <CTableRow className="actions-table-rows">
        <CTableDataCell className="text-center">{feedback.notes}</CTableDataCell>
        <CTableDataCell className="text-center">
          <div>
            <button className="view-button" style={{margin:0, padding: "10px"}}>
              <CIcon className="view-icon" icon={cilArrowCircleRight}/>
            </button>
            <button className="view-button"
                    style={{margin:0, padding: "10px"}}
                    onClick={() => setVisible(true)}>
              <CIcon className="view-icon" icon={cilTrash}/>
            </button>
          </div>
        </CTableDataCell>
      </CTableRow>
      <CModal alignment="center"
              backdrop={"static"}
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalBody>Are you sure you want to delete this feedback?</CModalBody>
        <CModalFooter>
          <button className="form-button" onClick={() => setVisible(false)}>Cancel</button>
          <button className="form-button" onClick={() => deleteFeedback(feedback)}>Confirm</button>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default FeedbackRow;