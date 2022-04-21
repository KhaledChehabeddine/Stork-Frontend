import React, {useCallback, useState} from 'react';
import {CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTableDataCell, CTableRow} from "@coreui/react";
import '../../Styles/Table.css'
import CIcon from "@coreui/icons-react";
import {cilTrash, cilUserFollow} from "@coreui/icons";
import getApiClient from "../../api_client/getApiClient";
import {formatDate} from "../Utils/utils";

const VacancyRow = ({ vacancy, vacancies}) => {
  const [visible, setVisible] = useState(false);

  const deleteJobPosition = useCallback(() => {
    getApiClient().deleteVacancy(vacancy.id);
    setVisible(false);
    window.location.reload(false);
  }, [vacancy]);

  return (
    <CTableRow className="table-row" v-for="item in tableItems">
      <CTableDataCell className="text-center">
        {vacancies.indexOf(vacancy)+1}
      </CTableDataCell>
      <CTableDataCell>{vacancy.jobTitle}</CTableDataCell>
      <CTableDataCell className="text-center">{vacancy.country}</CTableDataCell>
      <CTableDataCell className="text-center">{vacancy.city}</CTableDataCell>
      <CTableDataCell className="text-center">{formatDate(vacancy.datePosted)}</CTableDataCell>
      <CTableDataCell className="text-center">
        <button className="view-button" style={{margin:0, padding: "10px"}}>
          <CIcon className="view-icon" icon={cilUserFollow}/>
        </button>
        <button className="view-button" onClick={() => setVisible(true)} style={{margin:0, padding: "10px"}}>
          <CIcon className="view-icon" icon={cilTrash}/>
        </button>
      </CTableDataCell>
      <CModal alignment="center"
              backdrop={"static"}
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{vacancy.jobTitle}</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this job position?</CModalBody>
        <CModalFooter>
          <button className="confirm-button" onClick={deleteJobPosition}>Confirm</button>
        </CModalFooter>
      </CModal>
    </CTableRow>
  );
};

export default VacancyRow;
