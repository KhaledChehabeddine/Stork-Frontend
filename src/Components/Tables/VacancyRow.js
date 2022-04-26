import React, {useCallback, useState} from 'react';
import {CModal, CModalBody, CModalFooter, CTableDataCell, CTableRow} from "@coreui/react";
import '../../Styles/Table.css'
import CIcon from "@coreui/icons-react";
import {cilArrowCircleRight, cilTrash, cilUserFollow} from "@coreui/icons";
import getApiClient from "../../api_client/getApiClient";
import {formatDate, getHashCode} from "../Utils/utils";
import {useNavigate} from "react-router-dom";

const VacancyRow = ({vacancy, vacancies}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const addCandidateForJobPosition = useCallback(() => {
    navigate('/candidate/add', {state: {jobPosition: vacancy}});
  }, [navigate, vacancy]);

  const deleteJobPosition = useCallback(() => {
    getApiClient().deleteVacancy(vacancy.id);
    setVisible(false);
    window.location.reload();
  }, [vacancy]);

  return (
    <CTableRow style={{backgroundColor:"white"}} className="table-row" v-for="item in tableItems">
      <CTableDataCell className="text-center">{vacancies.indexOf(vacancy)+1}</CTableDataCell>
      <CTableDataCell>{vacancy.jobTitle}</CTableDataCell>
      <CTableDataCell className="text-center">{vacancy.country}</CTableDataCell>
      <CTableDataCell className="text-center">{vacancy.city}</CTableDataCell>
      <CTableDataCell className="text-center">{formatDate(vacancy.datePosted)}</CTableDataCell>
      <CTableDataCell className="text-center">
        <button className="view-button" style={{margin:0, padding: "10px"}}
                onClick={() => navigate(`/job/${getHashCode(vacancy.id)}`)}>
          <CIcon className="view-icon" icon={cilArrowCircleRight}/>
        </button>
        <button onClick={addCandidateForJobPosition} className="view-button" style={{margin:0, padding: "10px"}}>
          <CIcon className="view-icon" icon={cilUserFollow}/>
        </button>
        {/*<button className="view-button" onClick={() => setVisible(true)} style={{margin:0, padding: "10px"}}>*/}
        {/*  <CIcon className="view-icon" icon={cilTrash}/>*/}
        {/*</button>*/}
      </CTableDataCell>
      <CModal alignment="center"
              backdrop={"static"}
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalBody>Are you sure you want to delete this job position?</CModalBody>
        <CModalFooter>
          <button className="form-button" onClick={() => setVisible(false)}>Cancel</button>
          <button className="form-button" onClick={deleteJobPosition}>Confirm</button>
        </CModalFooter>
      </CModal>
    </CTableRow>
  );
};

export default VacancyRow;
