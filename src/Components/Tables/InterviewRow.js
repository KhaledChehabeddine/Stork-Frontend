import React, {useCallback, useState} from 'react';
import {CModal, CModalBody, CModalFooter, CTableDataCell, CTableRow} from '@coreui/react';
import '../../Styles/Table.css'
import CIcon from '@coreui/icons-react';
import {cilArrowCircleRight, cilTrash} from '@coreui/icons';
import getApiClient from '../../api_client/getApiClient';
import {formatDate, formatDateTime, getHashCode} from '../Utils/utils';
import {useNavigate} from "react-router-dom";

const InterviewRow = ({interview, interviews}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

/*  const deleteInterview = useCallback(() => {
    getApiClient().deleteInterview(interview.id);
    setVisible(false);
    window.location.reload();
  }, [interview]);*/

  return (
    <CTableRow className='table-row'
               style={{backgroundColor:'#ECF0F3'}}
               v-for='item in tableItems'>
      <CTableDataCell className='text-center'>{interviews.indexOf(interview) + 1}</CTableDataCell>
      <CTableDataCell className='text-center'>{formatDateTime(interview.dateTime)}</CTableDataCell>
      <CTableDataCell className='text-center'>{interview.candidate.firstName + ' ' + interview.candidate.lastName}</CTableDataCell>
      <CTableDataCell className='text-center'>{interview.manager.firstName + ' ' + interview.manager.lastName}</CTableDataCell>
      <CTableDataCell className='text-center'>
        <button className='view-table-button-icon'
                style={{margin:0, padding: '10px'}}
                onClick={() => navigate(`/interview/${getHashCode(interview.id)}`)}>
          <CIcon className='view-icon' icon={cilArrowCircleRight}/>
        </button>
        {/*<button className='view-button'*/}
        {/*        style={{margin:0, padding: '10px'}}*/}
        {/*        onClick={() => setVisible(true)}>*/}
        {/*  <CIcon className='view-icon' icon={cilTrash}/>*/}
        {/*</button>*/}
      </CTableDataCell>

      <CModal alignment='center'
              backdrop={'static'}
              visible={visible}
              onClose={() => setVisible(false)}>
        <CModalBody>Are you sure you want to delete this interview?</CModalBody>
        <CModalFooter>
          <button className='form-button' onClick={() => setVisible(false)}>Cancel</button>
          {/*Add Delete OnClick Function Here*/}
          <button className='form-button'>Confirm</button>
        </CModalFooter>
      </CModal>
    </CTableRow>
  );
};

export default InterviewRow;
