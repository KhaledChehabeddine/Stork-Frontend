import React, { useEffect, useState, useReducer } from "react";
import getApiClient from "../../api_client/getApiClient";
import CandidateCard from "./CandidateCard";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {Breadcrumb} from "react-bootstrap";

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
          <Breadcrumb className="form-breadcrumb">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/candidates">Candidates</Breadcrumb.Item>
            <Breadcrumb.Item active>View Candidates</Breadcrumb.Item>
          </Breadcrumb>
            <h1 className="form-header" style={{ padding: '1rem' }}>All Candidates</h1>
            <div className='card_wrapper'>
              {candidates.map(candidate => <CandidateCard key={candidate.id} candidate={candidate} />)}
            </div>
          </div>
        : <Spinner /> }
    </>
  );
};

export default CandidateCardWrapper;
