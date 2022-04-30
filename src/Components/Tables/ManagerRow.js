import React, {useCallback, useState} from 'react';
import {CModal, CModalBody, CModalFooter, CTableDataCell, CTableRow} from "@coreui/react";
import '../../Styles/Table.css'
import CIcon from "@coreui/icons-react";
import {cilArrowCircleRight, cilTrash} from "@coreui/icons";
import getApiClient from "../../api_client/getApiClient";
import {getHashCode} from "../Utils/utils";
import {useNavigate} from "react-router-dom";

const ManagerRow = ({manager, managers}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const deleteManager = useCallback(() => {
    getApiClient().deleteManager(manager.id);
    setVisible(false);
    window.location.reload();
  }, [manager]);

  return (
    <CTableRow className="table-row"
               style={{backgroundColor:'#ECF0F3'}}
               v-for="item in tableItems">
      <CTableDataCell className="text-center">{managers.indexOf(manager)+1}</CTableDataCell>
      <CTableDataCell>{manager.firstName + ' ' + manager.lastName}</CTableDataCell>
      <CTableDataCell className="text-center">{manager.email}</CTableDataCell>
      <CTableDataCell className="text-center">{manager.phone}</CTableDataCell>
      <CTableDataCell className="text-center">{manager.gender}</CTableDataCell>
      <CTableDataCell className='text-center'>
        <button className='view-table-button-icon'
                style={{margin:0, padding: '10px'}}
                onClick={() => navigate(`/manager/${getHashCode(manager.id)}`)}>
          <CIcon className='view-icon' icon={cilArrowCircleRight}/>
        </button>
        {/*<button className='view-button'*/}
        {/*        style={{margin:0, padding: '10px'}}*/}
        {/*        onClick={() => setVisible(true)}>*/}
        {/*  <CIcon className='view-icon' icon={cilTrash}/>*/}
        {/*</button>*/}
      </CTableDataCell>

      <CModal alignment="center"
              backdrop={"static"}
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalBody>Are you sure you want to delete this manager?</CModalBody>
        <CModalFooter>
          <button className="form-button" onClick={() => setVisible(false)}>Cancel</button>
          <button className="form-button" onClick={deleteManager}>Confirm</button>
        </CModalFooter>
      </CModal>
    </CTableRow>
  );
};

export default ManagerRow;
