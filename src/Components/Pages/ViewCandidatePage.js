import React, { useCallback, useReducer } from 'react';
import Button from '../Utils/Button';
import getApiClient from "../../api_client/getApiClient";
import {useNavigate} from "react-router-dom";
import Spinner from "../Utils/Spinner";

const reducer = (state, action) => {
  switch(action.type) {
    case 'deleting-candidate':
      return { ...state, deletingCandidate: true };
    default:
      return { ...state };
  }
}

const ViewCandidatePage = ({ candidate }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    deletingCandidate: false
  });
  const deleteEmployeeHandler = useCallback(() => {
    dispatch({ type: 'deleting-candidate' });
    getApiClient().deleteCandidate(candidate.id)
      .then(response => {
        navigate('/candidate/all');
      }).catch(error => console.log(error));
  }, [navigate, candidate]);
  return (
    <>
      {state.deletingEmployee ? <Spinner />
        :
        <div align='center'>
          <h1>{candidate.id}</h1>
          <h1>{candidate.name}</h1>
          <h1>{candidate.email}</h1>
          <h1>{candidate.phone}</h1>
          <Button onClick={deleteEmployeeHandler}>Delete Candidate</Button>
        </div>}
    </>
  );
};

export default ViewCandidatePage;
