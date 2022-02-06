import React, { useEffect, useState, useReducer } from "react";
import getApiClient from "../../api_client/getApiClient";
import ApplicantCard from "./ApplicantCard";

const reducer = (state, action) => {
  switch(action.type) {
    case 'page-loaded':
      return { pageLoaded: true };
    default:
      return { ...state };
  }
}

const ApplicantCardWrapper = () => {
  const [state, dispatch] = useReducer(reducer, {
    pageLoaded: false
  });
  const [applicants, setApplicants] = useState([]);
  const getAllApplicants = useEffect(() => {
    getApiClient().getAllApplicants()
      .then(response => {
        setApplicants(response.data);
        dispatch({ type: 'page-loaded' });
      }).catch(error => {console.log(error)});
  }, []);
  return (
    <>
      {state.pageLoaded === true
        ? <div style={{ display: 'flex', flexDirection: 'column'}}>
            <h1 align='center' style={{ padding: '2rem' }}>Applicants</h1>
            <div className='card_wrapper'>
              {applicants.map(applicant => <ApplicantCard key={applicant.id} applicant={applicant} />)}
            </div>
          </div>
        : <h1 align='center'>Loading...</h1>}
    </>

  )
}



export default ApplicantCardWrapper;
