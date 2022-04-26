import React, {useCallback, useState} from 'react';
import {CModal, CModalBody, CModalFooter, CTableDataCell, CTableRow} from "@coreui/react";
import '../../Styles/Table.css'
import CIcon from "@coreui/icons-react";
import {cilTrash} from "@coreui/icons";
import getApiClient from "../../api_client/getApiClient";
import {formatDate, formatDateTime} from "../Utils/utils";

const InterviewRow = ({interview, interviews}) => {
  const [visible, setVisible] = useState(false);

/*  const deleteInterview = useCallback(() => {
    getApiClient().deleteInterview(interview.id);
    setVisible(false);
    window.location.reload();
  }, [interview]);*/

  return (
    <CTableRow style={{backgroundColor:"white"}} className="table-row" v-for="item in tableItems">
      <CTableDataCell className="text-center">{interviews.indexOf(interview)+1}</CTableDataCell>
      <CTableDataCell>{formatDateTime(interview.dateTime)}</CTableDataCell>
      <CTableDataCell className="text-center">{interview.candidate.firstName + ' ' + interview.candidate.lastName}</CTableDataCell>
      <CTableDataCell className="text-center">{interview.manager.firstName + ' ' + interview.manager.lastName}</CTableDataCell>
      <CTableDataCell className="text-center">
        <button className="view-button" onClick={() => setVisible(true)} style={{margin:0, padding: "10px"}}>
          <CIcon className="view-icon" icon={cilTrash}/>
        </button>
      </CTableDataCell>
      <CModal alignment="center"
              backdrop={"static"}
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalBody>Are you sure you want to delete this interview?</CModalBody>
        <CModalFooter>
          <button className="form-button" onClick={() => setVisible(false)}>Cancel</button>
          {/*Add Delete OnClick Function Here*/}
          <button className="form-button">Confirm</button>
        </CModalFooter>
      </CModal>
    </CTableRow>
  );
};

export default InterviewRow;
