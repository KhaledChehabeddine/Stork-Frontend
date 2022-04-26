import React, {useCallback, useReducer, useState} from 'react';
import {CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTableDataCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPencil, cilTrash} from "@coreui/icons";
import getApiClient from "../../api_client/getApiClient";

const initialState = {
  editVisible: false,
  editText: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-edit-text':
      return {...state, editText: action.value};
    case 'set-edit-visible':
      return {...state, editVisible: action.value};
    default:
      return {...state}
  }
}

const FeedbackRow = ({ feedback }) => {
  const [visible, setVisible] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteFeedback = useCallback(() => {
    getApiClient().deleteFeedback(feedback.id)
      .then(response => {
        console.log(response);
        window.location.reload();
      }).catch(error => console.log(error));
    setVisible(false);
  }, [feedback.id]);

  const editFeedback = useCallback((editText) => {
    feedback.notes = editText;
    getApiClient().updateFeedback(feedback)
      .then(r => console.log(r))
      .catch(error => console.log(error));
    dispatch({ type: 'set-edit-visible', value: false });
  }, [feedback.id]);

  return (
    <>
      <CTableRow className="actions-table-rows">
        <CTableDataCell className="text-center" style={{textAlign: "left"}}>{feedback.notes}</CTableDataCell>
        <CTableDataCell className="text-center">
          <div>
            <button className="view-button" onClick={() => dispatch({ type: 'set-edit-visible', value: true })} style={{margin:0, padding: "10px"}}>
              <CIcon className="view-icon" icon={cilPencil}/>
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
          <button className="form-button" onClick={deleteFeedback}>Confirm</button>
        </CModalFooter>
      </CModal>
      <CModal alignment='center'
              backdrop={'static'}
              visible={state.editVisible}
              onClose={() => dispatch({type: 'set-edit-visible', value: false})}>
        <CModalHeader>
          <CModalTitle>Edit Your Feedback</CModalTitle>
        </CModalHeader>
        <CModalBody>
              <textarea
                placeholder={feedback.notes}
                style={{width: '100%', height: '250px'}}
                onChange={(event) => {
                  dispatch({ type: 'set-edit-text', value: event.target.value });
                }}/>
        </CModalBody>
        <CModalFooter>
          <button className='form-button' onClick={() => editFeedback(state.editText)}>Apply</button>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default FeedbackRow;