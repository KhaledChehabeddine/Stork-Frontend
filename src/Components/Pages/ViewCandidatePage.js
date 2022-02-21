import React, { useCallback, useReducer } from 'react';
import Button from '../Utils/Button';
import getApiClient from "../../api_client/getApiClient";
import {useNavigate} from "react-router-dom";
import Spinner from "../Utils/Spinner";
import Navbar from '../Utils/Navbar';

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
    <div>
      <Navbar />
      <div className='form-container'>
        {state.deletingEmployee ? <Spinner />
          :
          <div className='form'>
            <h1>Id: {candidate.id}</h1>
            <h1>Name: {candidate.firstName + ' ' + candidate.lastName}</h1>
            <h1>Email: {candidate.email}</h1>
            <h1>Phone: {candidate.phone}</h1>
            <Button onClick={deleteEmployeeHandler}>Delete Candidate</Button>
          </div>}
      </div>
    </div>
  );
};

export default ViewCandidatePage;
