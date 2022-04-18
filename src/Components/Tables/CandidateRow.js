import React, {useCallback, useState} from 'react';
import {
  CButton,
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
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const deleteCandidate = useCallback(() => {
    getApiClient().deleteCandidate(candidate.id);
    setVisible(false);
  }, [candidate]);

  return (
    <CTableRow v-for="item in tableItems">
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
          <CButton color='info'
                   onClick={deleteCandidate}>Confirm</CButton>
        </CModalFooter>
      </CModal>
    </CTableRow>
  );
};

export default CandidateRow;
