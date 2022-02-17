import React, { useEffect, useState, useReducer } from "react";
import getApiClient from "../../api_client/getApiClient";
import CandidateCard from "./CandidateCard";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';

const reducer = (state, action) => {
  switch(action.type) {
    case 'page-loaded':
      return { pageLoaded: true };
    default:
      return { ...state };
  }
}

const CandidateCardWrapper = () => {
  const [state, dispatch] = useReducer(reducer, {
    pageLoaded: false
  });
  const [candidates, setCandidates] = useState([]);
  // eslint-disable-next-line
  const getAllCandidates = useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        setCandidates(response.data);
        dispatch({ type: 'page-loaded' });
      }).catch(error => {console.log(error)});
  }, []);
  return (
    <>
      {state.pageLoaded === true
        ? <div style={{ display: 'flex', flexDirection: 'column'}}>
          <NavBar/>
            <h1 align='center' style={{ padding: '2rem' }}>Applicants</h1>
            <div className='card_wrapper'>
              {candidates.map(candidate => <CandidateCard key={candidate.id} candidate={candidate} />)}
            </div>
          </div>
        : <Spinner /> }
    </>
  );
};

export default CandidateCardWrapper;
