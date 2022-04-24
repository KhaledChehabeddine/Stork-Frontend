import React, {useCallback, useState} from 'react';
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTableDataCell,
  CTableRow
} from "@coreui/react";
import {cilArrowCircleRight, cilTrash} from "@coreui/icons";
import {formatDate, getHashCode} from "../Utils/utils";
import {useNavigate} from "react-router-dom";
import CIcon from "@coreui/icons-react";
import getApiClient from "../../api_client/getApiClient";

const CandidateRow = ({candidate, candidates}) => {

  const getRowColor = (candidate) => {
    let status = (candidate.status).toLowerCase();
    if (status.includes("pending")) return "pending-row";
    else if (status.includes("interview")) return "interview-row";
    else if (status.includes("sent")) return "offer-row";
    else if (status.includes("accepted")) return "accepted-row";
    else if (status.includes("rejected")) return "rejected-row";
    else return "default-row"
  }
  const navigate = useNavigate();
  const [visible, setVisible] = useState();

  const deleteCandidate = useCallback(() => {
    getApiClient().deleteCandidate(candidate.id);
    setVisible(false);
    window.location.reload(false);
  }, [candidate]);

  return (
    <CTableRow className={getRowColor(candidate)} v-for="item in tableItems">
      <CTableDataCell className="text-center">
        {candidates.indexOf(candidate) + 1}
      </CTableDataCell>
      <CTableDataCell>
        <div>{candidate.firstName + ' ' + candidate.lastName}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">{candidate.email}</CTableDataCell>
      <CTableDataCell className="text-center">{candidate.phone}</CTableDataCell>
      <CTableDataCell className="text-center">{formatDate(candidate.date)}</CTableDataCell>
      <CTableDataCell className="text-center">{candidate.status}</CTableDataCell>
      <CTableDataCell className="text-center">
        <button className="view-button" style={{margin:0, padding: "10px"}}
                onClick={() => navigate(`/candidate/${getHashCode(candidate.id)}`)}>
          <CIcon className="view-icon" icon={cilArrowCircleRight}/>
        </button>
        <button className="view-button"
                style={{margin:0, padding: "10px"}}
                onClick={() => setVisible(true)}>
          <CIcon className="view-icon" icon={cilTrash}/>
        </button>
      </CTableDataCell>
      <CModal alignment="center"
              backdrop={"static"}
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{candidate.firstName + ' ' + candidate.lastName}</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this candidate?</CModalBody>
        <CModalFooter>
          <button className="form-button" onClick={deleteCandidate}>Confirm</button>
        </CModalFooter>
      </CModal>
    </CTableRow>
  );
};

export default CandidateRow;
